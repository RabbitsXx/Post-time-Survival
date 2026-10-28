"""series registry: which module holds the script, which cover/music scripts to use, where the release files live."""
SERIES={
 'lighthouse':dict(title='THE LIGHTHOUSE',ids=range(2,6),parts='parts_v3',cover='make_cover.py',music='music2.py',meta='meta',th=['th','th2'],release='releases/part{n}/the-lighthouse_part{n}.mp4'),
 'sunrise':dict(title='THE LAST SUNRISE',ids=range(11,16),parts='parts_sun',cover='make_cover_s.py',music='music3.py',meta='meta_s',th=['th_sun'],release='releases/sunrise/part{n}/the-last-sunrise_part{n}.mp4'),
}
def of(N):
    """internal part id -> (series key, public part number).  New series: add an entry here, give it its own id block (21-25, 31-35 ...)."""
    for k,v in SERIES.items():
        if N in v['ids']:return k,(N-v['ids'][0]+(2 if k=='lighthouse' else 1))
    raise SystemExit(f'part id {N} is not in any series (edit ser/series.py)')
