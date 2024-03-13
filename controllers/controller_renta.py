import datetime
from flask import Blueprint, request, render_template, flash
from model.model_renta import *


renta_blueprint = Blueprint("rentas", __name__, url_prefix="/rentas")


# Rutas
@renta_blueprint.route("/", methods=["GET", "POST"])
def rentas_opciones():
    return render_template("rentas.html")


# CREATE
@renta_blueprint.route("/insertar", methods=["GET", "POST"])
def insertar_renta():
    if request.method == "POST":
        idUsuario = request.form["idUsuario"]
        idPelicula = request.form["idPelicula"]
        fecha_renta = request.form["fecha_renta"]
        dias_de_renta = request.form["dias_de_renta"]
        estatus = request.form.get("estatus") == "true"
        insercionCorrecta = inserta_Renta(
            idUsuario, idPelicula, fecha_renta, dias_de_renta, estatus
        )
        if not insercionCorrecta:
            flash(
                "Error al insertar renta",
                "danger",
            )
        flash("Renta insertada con exito", "success")
    return render_template("insertarRenta.html")


# READ
@renta_blueprint.route("/consultar", methods=["GET", "POST"])
def consultar_rentas():
    rentas = muestra_todas_las_rentas()
    return render_template("mostrarRentas.html", rentas=rentas)


# Verificamos el ID
@renta_blueprint.route("/solicitarID", methods=["GET", "POST"])
def solicitar_id_renta():
    if request.method == "POST":
        idRentar = request.form["idRentar"]
        renta = verificar_renta_actualizar(idRentar)
        if renta:
            return render_template("actualizarRenta.html", renta=renta)
        else:
            flash("No se encontro la renta con el id: " + idRentar, "danger")
            return render_template("solicitudIdRenta.html")
    else:
        return render_template("solicitudIdRenta.html")


# UPDATE
@renta_blueprint.route("/actualizar", methods=["GET", "POST"])
def actualizar_rentas():
    if request.method == "POST":
        idRentar = request.form["idRentar"]
        estatus = request.form.get("estatus") == "true"
        renta = actualiza_estatus_renta(idRentar, estatus)
        if not renta:
            flash("Error al actualizar la renta", "danger")
            return render_template("actualizarRenta.html", renta=renta)
        else:
            flash("Renta actualizada con exito", "success")
            return render_template("actualizarRenta.html", renta=renta)


# DELETE PARTE QUE NO SE IMPLEMENTA EN RENTA
"""
# DELETE
@renta_blueprint.route("/eliminar", methods=["GET", "POST"])
def eliminar_usuario_por_id():
    if request.method == "POST":
        idUsuario = request.form["idUsuario"]
        eliminacionCorrecta = eliminar_usuario(idUsuario)
        if not eliminacionCorrecta:
            flash("Error al eliminar usuario", "danger")
        else:
            flash("Usuario eliminado con exito", "success")
    return render_template("eliminarUsuario.html")

"""
