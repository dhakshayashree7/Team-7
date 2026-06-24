from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

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

if __name__ == "__main__":
    app.run(debug=True)