import subprocess
from pathlib import Path

wavs = list(Path(".").glob("**/*.wav"))
for wav in wavs:
    out = wav.parent/Path("norm")/wav.name
    out.parent.mkdir(parents=True, exist_ok=True)
    print(out)
    subprocess.run(["ffmpeg", "-i", str(wav), "-filter:a", "loudnorm", str(out)])
