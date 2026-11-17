import json
import os
import sqlite3
from pathlib import Path

database_path = Path(os.environ.get("SQLITE_DB_PATH", "prisma/dev.db"))
if not database_path.is_file():
    raise SystemExit(f"SQLite database not found: {database_path}")

connection = sqlite3.connect(database_path)
connection.row_factory = sqlite3.Row
tables = [
    row[0]
    for row in connection.execute(
        "SELECT name FROM sqlite_master "
        "WHERE type = 'table' AND name NOT LIKE 'sqlite_%' ORDER BY name"
    )
]
data = {
    table: [
        dict(row)
        for row in connection.execute(f'SELECT * FROM "{table}"')
    ]
    for table in tables
}
json.dump(data, fp=os.sys.stdout, default=str)
connection.close()
