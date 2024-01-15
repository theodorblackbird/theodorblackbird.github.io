import polars as pl

df = pl.read_json("metadata.json")
df.with_row_count().write_json("metadata_demo.json", row_oriented=True)
print(df)
