import os

# class Config:
#     SECRET_KEY = os.environ.get("SECRET_KEY", "super-secret-key")
#     SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL", "postgresql://postgres:yourpassword@localhost/linkvault")
#     SQLALCHEMY_TRACK_MODIFICATIONS = False
#     JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "jwt-secret")
class Config:
    SQLALCHEMY_DATABASE_URI = "postgresql://link123:link123@localhost:5432/linkvault"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = "supersecretkey"
    JWT_SECRET_KEY = "jwt-secret"
