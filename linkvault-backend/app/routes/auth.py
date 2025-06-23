from flask import Blueprint, request, jsonify
from app.models import User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.extensions import db
from flask_jwt_extended import create_refresh_token, set_access_cookies, set_refresh_cookies, unset_jwt_cookies


bp = Blueprint("auth", __name__)

@bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    return jsonify(access_token=access_token), 200

@bp.route("/logout", methods=["POST"])
def logout():
    resp = jsonify({"msg": "Logout successful"})
    unset_jwt_cookies(resp)
    return resp, 200

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
        access_token = create_access_token(identity=str(user.id))
        refresh_token = create_refresh_token(identity=str(user.id))
        resp = jsonify(access_token=access_token, refresh_token=refresh_token)
        set_access_cookies(resp, access_token)
        set_refresh_cookies(resp, refresh_token)
        return resp
    return jsonify({"message": "Invalid credentials"}), 401
