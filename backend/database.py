import sqlite3

def create_database():
    conn = sqlite3.connect("construction.db")
    cursor = conn.cursor()

    # Sites Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS sites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        site_name TEXT NOT NULL,
        location TEXT,
        budget REAL
    )
    """)

    # Expenses Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        site_id INTEGER,
        category TEXT,
        amount REAL,
        expense_date TEXT
    )
    """)

    # Labour Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS labour (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        worker_name TEXT,
        daily_wage REAL,
        days_worked INTEGER
    )
    """)

    conn.commit()
    conn.close()

    print("Database Created Successfully!")

create_database()