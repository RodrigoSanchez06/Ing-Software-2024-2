from alchemyClasses.Pelicula import Pelicula
from alchemyClasses import db
from alchemyClasses.Renta import Renta


# Inserta una pelicula CREATE
def inserta_pelicula(nombre, genero, inventario, duracion):
    try:
        pelicula = Pelicula(
            nombre=nombre, genero=genero, inventario=inventario, duracion=duracion
        )
        db.session.add(pelicula)
        db.session.commit()
        return True  # Indicador de éxito
    except Exception as e:
        db.session.rollback()
        print(f"Error al insertar la película: {e}")
        return False  # Indicador de fallo


# Muestra todas las peliculas READ
def muestra_todas_las_peliculas():
    return Pelicula.query.all()


# Actualiza la pelicula Update
def actualiza_pelicula(id, nombre, genero, inventario, duracion):
    pelicula = Pelicula.query.filter(Pelicula.idPelicula == id).first()
    if pelicula:
        pelicula.nombre = nombre  # Actualiza
        pelicula.genero = genero
        pelicula.inventario = inventario
        pelicula.duracion = duracion
        db.session.commit()
        print("La actualizacion del nombre fue exitosa!!")
        return True
    else:
        print("La pelicula con el id: " + str(id) + " No existe")
        return False


# Dado un id elimina el registro de esa pelicula DELETE
def eliminar_pelicula(id):
    pelicula = Pelicula.query.filter(Pelicula.idPelicula == id).first()
    if pelicula:
        Renta.query.filter(
            Renta.idPelicula == id
        ).delete()  # Elimino las rentas en las que esta
        db.session.delete(pelicula)
        db.session.commit()
        print("La pelicula y todas sus rentas se eliminaron con exito")
        return True
    else:
        print("La pelicula con el id: " + str(id) + " no existe")
        return False


def verificar_pelicula_actualizar(id):
    return Pelicula.query.filter(Pelicula.idPelicula == id).first()
