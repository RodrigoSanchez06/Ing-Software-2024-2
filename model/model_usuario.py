from alchemyClasses.Usuario import Usuario
from alchemyClasses import db
from alchemyClasses.Renta import Renta


# Inserta un usuario CREATE
def inserta_usuario(
    password,
    nombre,
    apPat,
    apMat,
    email,
    super_user,
):
    try:
        if verifica_correo_usuario(email):
            print("El correo ya existe")
            return False
        usuario = Usuario(
            password=password,
            nombre=nombre,
            apPat=apPat,
            apMat=apMat,
            email=email,
            profile_picture=None,
            super_user=super_user,
        )
        db.session.add(usuario)
        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        print(f"Error al insertar el usuario: {e}")
        return False


# Muestra todos los usuarios existentes READ
def muestra_todos_los_usuarios():
    return Usuario.query.all()


# Dado un id actualiza el nombre del usuario al nombre dado UPDATE
def actualiza_usuario(
    id, nombre, apPat, password, super_user, apMat, email, profile_picture=None
):

    usuario = Usuario.query.filter(Usuario.idUsuario == id).first()
    if usuario:
        usuario.nombre = nombre  # Cambia el nombre
        usuario.apPat = apPat
        usuario.password = password
        usuario.superUser = super_user
        usuario.apMat = apMat
        usuario.email = email
        usuario.profilePicture = profile_picture
        db.session.commit()
        print("El usuario se actualizò con exito")
        return usuario
    else:
        print("El usuario con el id: " + str(id) + " no existe")
        return usuario


# Dado un id, elimina al usuario con ese id DELETE
def eliminar_usuario(id):
    usuario = Usuario.query.filter(Usuario.idUsuario == id).first()
    if usuario:
        Renta.query.filter(
            Renta.idUsuario == id
        ).delete()  # Elimino las rentas que tenga
        db.session.delete(usuario)
        db.session.commit()
        print("El usuario y todas sus rentas se eliminaron con exito")
        return True
    else:
        print("El usuario con el id: " + str(id) + " no existe")
        return False


def verifica_correo_usuario(correo):
    usuario = Usuario.query.filter(Usuario.email == correo).first()
    if correo is None or correo.strip() == "":
        return False
    if usuario:
        return True
    else:
        return False


def verificar_usuario_actualizar(id):
    usuario = Usuario.query.filter(Usuario.idUsuario == id).first()
    return usuario
