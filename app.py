from flask import Flask, render_template
from sqlalchemy import and_, or_

from alchemyClasses import db
from cryptoUtils.CryptoUtils import cipher
from hashlib import sha256

from alchemyClasses.Pelicula import Pelicula
from alchemyClasses.Renta import Renta
from alchemyClasses.Usuario import Usuario
from model.model_pelicula import *
from model.model_usuario import *
from model.model_renta import *

from controllers.controller_usuario import usuario_blueprint
from controllers.controller_renta import renta_blueprint
from controllers.controller_pelicula import pelicula_blueprint

# mysql+pymysql://ferfong:Developer123!@localhost:3306/ing_soft
# <dialecto>+<driver>://<usuario>:<passwd>@localhost:3306/<db>
# mysql+pymysql://lab:Developer123!@localhost:3306/lab_ing_soft
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = (
    "mysql+pymysql://lab:Developer123!@localhost:3306/lab_ing_software"
)
app.config.from_mapping(SECRET_KEY="dev")
db.init_app(app)

app.register_blueprint(usuario_blueprint)
app.register_blueprint(renta_blueprint)
app.register_blueprint(pelicula_blueprint)


@app.route("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    with app.app_context():
        app.run(debug=True, port=5000)
