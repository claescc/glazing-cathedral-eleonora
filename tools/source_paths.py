"""One source-library location for all read-only import tools."""
import os
from pathlib import Path

LIB = Path(os.environ.get('CERAMICS_SOURCE_ROOT',
    '/Users/chloeclaes/Downloads/⚛︎ Complexity Nexus ⚛︎/𐃡 Ceramics Cathedral 𐃡'))
if not LIB.is_dir():
    raise FileNotFoundError('Set CERAMICS_SOURCE_ROOT to the supplied ceramic library')
