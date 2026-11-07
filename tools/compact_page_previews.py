"""Keep newly rendered facsimile previews within the existing hosting budget.

Only generated AVIF previews are touched; original source files and preserved
site assets are never modified. Full extracted text remains available separately.
"""
from pathlib import Path
from concurrent.futures import ProcessPoolExecutor
from PIL import Image

ROOT=Path(__file__).resolve().parents[1]
def compact(path):
    with Image.open(path) as image:
        if image.width<=900:return 0
        image=image.convert('RGB')
        image.thumbnail((900,1800))
        temporary=path.with_suffix('.compact.avif')
        image.save(temporary,quality=20,speed=8)
        temporary.replace(path)
    return 1
if __name__=='__main__':
    paths=list((ROOT/'assets/library/expanded/pages').rglob('*.avif'))
    with ProcessPoolExecutor(max_workers=3) as pool:
        count=sum(pool.map(compact,paths,chunksize=20))
    print('Compacted page previews:',count,flush=True)
