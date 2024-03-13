from alchemyClasses.Renta import Renta
from alchemyClasses import Pelicula, Usuario, db
from alchemyClasses.Pelicula import Pelicula
from alchemyClasses.Usuario import Usuario
from datetime import datetime, timedelta


# Inserta una pelicula CREATE
def inserta_Renta(idUsuario, idPelicula, fecha_renta, dias_de_renta, estatus):
    try:
        renta = Renta(
            idUsuario=idUsuario,
            idPelicula=idPelicula,
            fecha_renta=fecha_renta,
            dias_de_renta=dias_de_renta,
            estatus=estatus,
        )
        # Validamos si existen el id del usuario y la pelicula
        usuario = Usuario.query.filter(Usuario.idUsuario == idUsuario).first()
        pelicula = Pelicula.query.filter(Pelicula.idPelicula == idPelicula).first()
        if usuario and pelicula:
            db.session.add(renta)
            db.session.commit()
            return True  # Indicador de éxito
        else:
            print("El usuario o la pelicula no existen")
            return False
    except Exception as e:
        db.session.rollback()
        print(f"Error al insertar la renta: {e}")
        return False  # Indicador de fallo


# Muestra todas las rentas READ
def muestra_todas_las_rentas():
    rentas = Renta.query.all()
    for renta in rentas:
        # Convierte la fecha de renta a objeto datetime
        fecha_renta = renta.fecha_renta

        # Calcula la fecha de vencimiento sumando los días de renta
        fecha_vencimiento = fecha_renta + timedelta(days=int(renta.dias_de_renta))

        # Convierte la fecha de vencimiento a objeto date para la comparación
        fecha_vencimiento_date = fecha_vencimiento.date()

        # Compara con la fecha actual para determinar si está vencida
        renta.vencida = fecha_vencimiento_date < datetime.now().date()

    return rentas


# Dada un id actualiza el estatus de renta UPDATE
def actualiza_estatus_renta(id, estatus):
    renta = Renta.query.filter(Renta.idRentar == id).first()
    if renta:
        renta.estatus = estatus
        db.session.commit()
        print("La actualizacion del estatus fue exitosa!!")
        return renta
    else:
        print("La renta con ID: " + str(id) + " No existe")
        return renta


def verificar_renta_actualizar(id):
    renta = Renta.query.filter(Renta.idRentar == id).first()
    return renta


# Dado un id elimina la renta que tenga asociado ese id DELETE
"""
def eliminar_renta_por_id(id):
    renta = Renta.query.filter(Renta.idRentar == id).first()
    if renta:
        db.session.delete(renta)
        db.session.commit()
        print("La renta se eliminò con exito")
    else:
        print("La renta con el id: " + str(id) + " no existe")
"""
