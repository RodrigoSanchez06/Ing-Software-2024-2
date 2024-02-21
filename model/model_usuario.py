from alchemyClasses.Usuario import Usuario
from alchemyClasses import db
from alchemyClasses.Renta import Renta

#Muestra todos los usuarios existentes
def muestra_todos_los_usuarios():
    for usuario in Usuario.query.all():
        print(usuario)
        print("--------------------------------")

#Dado un id busca a un usuario
def filtra_usuario_por_id(id):
    flag = False
    for usuario in Usuario.query.filter(Usuario.idUsuario == id):#Busca al usuario
        flag = True
        print (usuario)
    if(not flag):
        print("El ID del usuario no existe.")

#Dado un id actualiza el nombre del usuario al nombre dado
def actualiza_nombre_de_usuario(id,nombre):
    usuario = Usuario.query.filter(Usuario.idUsuario == id).first()
    if(usuario):
        usuario.nombre = nombre #Cambia el nombre
        db.session.commit()
        print("La actualizacion del nombre fue exitosa!!")
    else:
        print("El usuario con el id: " + str(id) + " No existe")

#Dado un id, elimina al usuario con ese id
def eliminar_usuario_por_id(id):
    usuario = Usuario.query.filter(Usuario.idUsuario == id).first()
    if(usuario):
        Renta.query.filter(Renta.idUsuario == id).delete()#Elimino las rentas que tenga 
        db.session.delete(usuario)  
        db.session.commit()
        print("El usuario se eliminò con exito")
    else:
        print("El usuario con el id: " + str(id) + " no existe")
#Elimina todos los usuarios existentes
def eliminar_todos_los_usuarios():
    usuarios = Usuario.query.all()
    for usuario in usuarios:
            # Elimina los registros en la tabla rentar que hacen referencia al usuario
            rentas_usuario = Renta.query.filter_by(idUsuario=usuario.idUsuario).all()
            for renta in rentas_usuario:
                db.session.delete(renta)

            # Elimina el usuario
            db.session.delete(usuario)

        # Confirma los cambios
    db.session.commit()
    print("Todos los registros de los usuarios se eliminaron correctamente")