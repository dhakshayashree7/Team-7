from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
@app.route("/")
def home():
    return "Construction Expense Tracker Backend Running"


@app.route("/site", methods=["POST"])
def create_site():
    data = request.get_json()

    site_name = data["site_name"]
    location = data["location"]
    budget = data["budget"]

    conn = sqlite3.connect("construction.db")
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO sites (site_name, location, budget) VALUES (?, ?, ?)",
        (site_name, location, budget)
    )

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Site Created Successfully!"
    })

@app.route("/sites", methods=["GET"])
def get_sites():

    conn = sqlite3.connect("construction.db")
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()
    cursor.execute("SELECT * FROM sites")

    sites = [dict(row) for row in cursor.fetchall()]

    conn.close()

    return jsonify(sites)

@app.route("/expense", methods=["POST"])
def add_expense():

    data = request.get_json()

    site_id = data["site_id"]
    category = data["category"]
    amount = data["amount"]
    expense_date = data["expense_date"]

    conn = sqlite3.connect("construction.db")
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO expenses (site_id, category, amount, expense_date) VALUES (?, ?, ?, ?)",
        (site_id, category, amount, expense_date)
    )

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Expense Added Successfully!"
    })

@app.route("/expenses", methods=["GET"])
def get_expenses():

    conn = sqlite3.connect("construction.db")
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()
    cursor.execute("SELECT * FROM expenses")

    expenses = [dict(row) for row in cursor.fetchall()]

    conn.close()

    return jsonify(expenses)

@app.route("/labour", methods=["POST"])
def add_labour():

    data = request.get_json()

    worker_name = data["worker_name"]
    daily_wage = data["daily_wage"]
    days_worked = data["days_worked"]

    conn = sqlite3.connect("construction.db")
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO labour (worker_name, daily_wage, days_worked) VALUES (?, ?, ?)",
        (worker_name, daily_wage, days_worked)
    )

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Labour Added Successfully!"
    })

@app.route("/labours", methods=["GET"])
def get_labours():

    conn = sqlite3.connect("construction.db")
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()
    cursor.execute("SELECT * FROM labour")

    labours = [dict(row) for row in cursor.fetchall()]

    conn.close()

    return jsonify(labours)

@app.route("/report/<int:site_id>", methods=["GET"])
def budget_report(site_id):

    conn = sqlite3.connect("construction.db")
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    # Site Budget
    cursor.execute(
        "SELECT budget FROM sites WHERE id = ?",
        (site_id,)
    )

    site = cursor.fetchone()

    if not site:
        return jsonify({"error": "Site not found"})

    budget = site["budget"]

    # Total Expense
    cursor.execute(
        "SELECT SUM(amount) as total_expense FROM expenses WHERE site_id = ?",
        (site_id,)
    )

    expense = cursor.fetchone()

    total_expense = expense["total_expense"] or 0

    remaining = budget - total_expense

    conn.close()

    return jsonify({
        "budget": budget,
        "total_expense": total_expense,
        "remaining_budget": remaining
    })
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)