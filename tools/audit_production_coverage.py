"""Verify deployed reader assets against the exact committed release.

No local preview is treated as production evidence. Every readable source JSON
and full-text search shard is compared byte-for-byte with its committed version.
"""
import json, subprocess, urllib.request, hashlib, argparse
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone

ROOT=Path(__file__).resolve().parents[1]
args=argparse.ArgumentParser()
args.add_argument('--ref',default='HEAD')
args.add_argument('--output',default='/tmp/ceramics-production-coverage-audit.json')
options=args.parse_args()
commit=subprocess.check_output(['git','rev-parse',options.ref],cwd=ROOT,text=True).strip()
def blob(path):return subprocess.check_output(['git','show',commit+':'+path],cwd=ROOT,stderr=subprocess.DEVNULL)
base='assets/library/expanded/'
books=json.loads(blob(base+'catalogue.json'))
parts=json.loads(blob(base+'search-parts.json'))
paths=['reading.html','learn.html','masters.html','kiln.html','materials.html','restoration.html','recipes.html',
       'source-library.js','knowledge-library.js','reading-room.css','v2.css',base+'catalogue.json',
       base+'coverage.json',base+'knowledge-paths.json',base+'visuals/index.json',base+'recipe-search.json',base+'search-parts.json']
try:
    blob(base+'chapters.json')
    paths.append(base+'chapters.json')
except subprocess.CalledProcessError:
    pass
paths += [base+p for p in parts]
paths += [base+b['id']+'.json' for b in books if b['status']!='unreadable' and not b.get('duplicateOf')]
def check(path):
    try:
        expected=blob(path)
        request=urllib.request.Request('https://ceramicscathedral.com/'+path+'?coverage='+commit[:10],headers={'User-Agent':'CeramicsCathedral-source-audit'})
        with urllib.request.urlopen(request,timeout=60) as response:
            actual=response.read()
        return dict(path=path,match=actual==expected,bytes=len(actual),sha256=hashlib.sha256(actual).hexdigest())
    except Exception as error:return dict(path=path,match=False,error=str(error))
with ThreadPoolExecutor(max_workers=6) as pool:
    results=list(pool.map(check,paths))
report=dict(date=datetime.now(timezone.utc).isoformat(),production='https://ceramicscathedral.com',commit=commit,
            checked=len(results),failures=[r for r in results if not r['match']],results=results)
Path(options.output).write_text(json.dumps(report,indent=2))
print(json.dumps({k:v for k,v in report.items() if k!='results'},indent=2))
if report['failures']:raise SystemExit(1)
