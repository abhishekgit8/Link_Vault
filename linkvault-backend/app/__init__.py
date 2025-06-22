from flask import Flask
from flask_cors import CORS
from .extensions import db, jwt
from .routes import auth, links
from .routes.home import bp as home_bp  # ✅ correct import

def create_app():
    app = Flask(__name__)
    app.config.from_object("config.Config")

    CORS(app)
    db.init_app(app)
    jwt.init_app(app)

    app.register_blueprint(auth.bp, url_prefix="/auth")
    app.register_blueprint(links.bp, url_prefix="/links")
    app.register_blueprint(home_bp)  # ✅ correct registration

    with app.app_context():
        db.create_all()

    return app
