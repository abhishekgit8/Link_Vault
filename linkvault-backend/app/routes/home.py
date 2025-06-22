from flask import Blueprint, jsonify

bp = Blueprint("home", __name__)  # ✅ This is your Blueprint

@bp.route("/")
def home():
    return jsonify({"message": "Welcome to LinkVault Backend!"})
