from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Link
from app.extensions import db


bp = Blueprint("links", __name__, url_prefix="/api")

@bp.route("/links", methods=["POST"])
@jwt_required()
def add_link():
    data = request.get_json()
    user_id = get_jwt_identity()
    link = Link(
        title=data["title"],
        url=data["url"],
        tags=data.get("tags", ""),
        notes=data.get("notes", ""),
        user_id=user_id
    )
    db.session.add(link)
    db.session.commit()
    return jsonify({"message": "Link saved"}), 201

@bp.route("/links", methods=["GET"])
@jwt_required()
def get_links():
    user_id = get_jwt_identity()
    links = Link.query.filter_by(user_id=user_id).all()
    return jsonify([{
        "id": l.id,
        "title": l.title,
        "url": l.url,
        "tags": l.tags,
        "notes": l.notes,
        "created_at": l.created_at.isoformat()
    } for l in links])


@bp.route("/links/<int:link_id>", methods=["DELETE"])
@jwt_required()
def delete_link(link_id):
    user_id = get_jwt_identity()
    link = Link.query.filter_by(id=link_id, user_id=user_id).first()
    if not link:
        return jsonify({"message": "Link not found"}), 404

    db.session.delete(link)
    db.session.commit()
    return jsonify({"message": "Link deleted"}), 200
