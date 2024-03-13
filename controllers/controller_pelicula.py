from flask import Blueprint, request, render_template, flash, url_for, redirect
from model.model_pelicula import *

pelicula_blueprint = Blueprint("peliculas", __name__, url_prefix="/peliculas")


# Rutas
@pelicula_blueprint.route("/", methods=["GET", "POST"])
def peliculas_opciones():
    return render_template("peliculas.html")


# CREATE
@pelicula_blueprint.route("/insertar", methods=["GET", "POST"])
def insertar_pelicula():
    if request.method == "POST":
        nombre = request.form["nombre"]
        genero = request.form.get("genero", None)
        duracion = request.form["duracion"]
        inventario = request.form["inventario"]

        # Validar que duracion sea un valor numérico
        try:
            duracion = int(duracion) if duracion.strip() else None
        except ValueError as ve:
            flash(f"Error en el valor de duración: {ve}", "danger")
            return render_template("insertarPelicula.html")

        insercionCorrecta = inserta_pelicula(nombre, genero, inventario, duracion)

        if not insercionCorrecta:
            flash("Error al insertar película", "danger")
        else:
            flash("Película agregada con éxito", "success")

    return render_template("insertarPelicula.html")


# READ
@pelicula_blueprint.route("/consultar", methods=["GET", "POST"])
def consultar_peliculas():
    peliculas = muestra_todas_las_peliculas()
    return render_template("mostrarPeliculas.html", peliculas=peliculas)


# Verificamos el ID
@pelicula_blueprint.route("/solicitarID", methods=["GET", "POST"])
def solicitar_id_pelicula():
    if request.method == "POST":
        idPelicula = request.form["idPelicula"]
        pelicula = verificar_pelicula_actualizar(idPelicula)
        if pelicula:
            return render_template("actualizarPelicula.html", pelicula=pelicula)
        else:
            flash("No se encontro la pelicula con el id: " + pelicula, "danger")
            return render_template("solicitudIdPelicula.html")
    else:
        return render_template("solicitudIdPelicula.html")


# UPDATE
@pelicula_blueprint.route("/actualizar", methods=["GET", "POST"])
def actualizar_peliculas():
    pelicula = None
    if request.method == "POST":
        idUsuario = request.form["idPelicula"]
        nombre = request.form["nombre"]
        genero = request.form["genero"]
        inventario = request.form["inventario"]
        duracion = request.form["duracion"]

        try:
            # Validar que duracion e inventario sean valores numéricos
            duracion = int(duracion) if duracion else None
            inventario = int(inventario)

            pelicula = actualiza_pelicula(
                idUsuario, nombre, genero, inventario, duracion
            )
            flash("Pelicula actualizada con éxito", "success")
        except ValueError as ve:
            flash(f"Error en los valores de duración o inventario: {ve}", "danger")
        except Exception as e:
            flash(f"Error al actualizar la película: {e}", "danger")

    return render_template("actualizarPelicula.html", pelicula=pelicula)


# DELETE
@pelicula_blueprint.route("/eliminar", methods=["GET", "POST"])
def eliminar_pelicula_por_id():
    if request.method == "POST":
        idPelicula = request.form["idPelicula"]
        eliminacionCorrecta = eliminar_pelicula(idPelicula)
        if not eliminacionCorrecta:
            flash("Error al eliminar la pelicula", "danger")
        else:
            flash("Pelicula eliminado con exito", "success")
    return render_template("eliminarPelicula.html")
