from flask import Blueprint, request, jsonify
from app.models import User
from flask_jwt_extended import create_access_token
from app.extensions import db


bp = Blueprint("auth", __name__, url_prefix="/api")

@bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    user = User(email=data["email"])
    user.set_password(data["password"])
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User created"}), 201

@bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data["email"]).first()
    if user and user.check_password(data["password"]):
        token = create_access_token(identity=user.id)
        return jsonify(access_token=token)
    return jsonify({"message": "Invalid credentials"}), 401
