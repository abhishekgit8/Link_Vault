from flask import Blueprint, request, jsonify
from app.models import User
from flask_jwt_extended import create_access_token
from app.extensions import db


bp = Blueprint("auth", __name__)

@bp.route("/signup", methods=["POST"])
def signup():
    try:
        data = request.get_json()
        if not data or "email" not in data or "password" not in data:
            return jsonify({"error": "Email and password are required."}), 400
        user = User(email=data["email"])
        user.set_password(data["password"])
        db.session.add(user)
        db.session.commit()
        return jsonify({"message": "User created"}), 201
    except Exception as e:
        print(f"Signup error: {e}")  # You can replace this with logging if desired
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

@bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data["email"]).first()
    if user and user.check_password(data["password"]):
        print("User ID:", user.id, type(user.id))  # <--- LOG THIS
        token = create_access_token(identity=str(user.id))  # force string
        return jsonify(access_token=token)
    return jsonify({"message": "Invalid credentials"}), 401
