from flask import Blueprint, request, render_template, flash, url_for, redirect
from model.model_usuario import *

usuario_blueprint = Blueprint("usuarios", __name__, url_prefix="/usuarios")


# Rutas para el manejo de usuarios
@usuario_blueprint.route("/", methods=["GET", "POST"])
def usuarios_opciones():
    return render_template("usuarios.html")


# CREATE
@usuario_blueprint.route("/insertar", methods=["GET", "POST"])
def insertar_usuario():
    if request.method == "POST":
        nombre = request.form["nombre"]
        apPat = request.form["apPat"]
        apMat = request.form["apMat"]
        super_user = request.form.get("super_user") == "true"
        email = request.form["correo"]
        password = request.form["password"]
        insercionCorrecta = inserta_usuario(
            password, nombre, apPat, apMat, email, super_user
        )
        if not insercionCorrecta:
            flash(
                "Error al insertar usuario verifique si el correo ya esta registrado",
                "danger",
            )
        else:
            flash("Usuario insertado con exito", "success")
    return render_template("insertarUsuario.html")


# READ
@usuario_blueprint.route("/consultar", methods=["GET", "POST"])
def consultar_usuarios():
    usuarios = muestra_todos_los_usuarios()
    return render_template("mostrarUsuarios.html", usuarios=usuarios)


# Verificamos el ID
@usuario_blueprint.route("/solicitarID", methods=["GET", "POST"])
def solicitar_id_usuario():
    if request.method == "POST":
        idUsuario = request.form["idUsuario"]
        usuario = verificar_usuario_actualizar(idUsuario)
        if usuario:
            return render_template("actualizarUsuario.html", usuario=usuario)
        else:
            flash("No se encontro el usuario con el id: " + idUsuario, "danger")
            return render_template("solicitudIdUsuario.html")
    else:
        return render_template("solicitudIdUsuario.html")


# UPDATE
@usuario_blueprint.route("/actualizar", methods=["GET", "POST"])
def actualizar_usuarios():
    if request.method == "POST":
        idUsuario = request.form["idUsuario"]
        nombre = request.form["nombre"]
        apPat = request.form["apPat"]
        apMat = request.form["apMat"]
        super_user = request.form.get("super_user") == "true"
        email = request.form["correo"]
        password = request.form["password"]
        usuario = actualiza_usuario(
            idUsuario,
            nombre,
            apPat,
            password,
            super_user,
            apMat,
            email,
            profile_picture=None,
        )
        if not usuario:
            flash("Error al actualizar usuario", "danger")
        else:
            flash("Usuario actualizado con exito", "success")
    return render_template("actualizarUsuario.html", usuario=usuario)


# DELETE
@usuario_blueprint.route("/eliminar", methods=["GET", "POST"])
def eliminar_usuario_por_id():
    if request.method == "POST":
        idUsuario = request.form["idUsuario"]
        eliminacionCorrecta = eliminar_usuario(idUsuario)
        if not eliminacionCorrecta:
            flash("Error al eliminar usuario verifique el id ", "danger")
        else:
            flash("Usuario eliminado con exito", "success")
    return render_template("eliminarUsuario.html")
