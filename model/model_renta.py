from alchemyClasses.Renta import Renta
from alchemyClasses import db

#Muestra todas las rentas 
def muestra_todas_las_rentas():
    for renta in Renta.query.all():
        print(renta)
        print("----------------------------")

#Dado un id busca una renta
def filtra_renta_por_id(id):
    flag = False
    for renta in Renta.query.filter(Renta.idRentar == id):#Busca rentas con mismo id
        flag = True
        print(renta)

    if(not flag):
        print("El ID de la renta no existe.")

#Dada un id actualiza la fecha de renta a la fecha dada
def actualiza_fecha_de_renta(id, fecha):
    renta = Renta.query.filter(Renta.idRentar == id).first() 
    if(renta):
        renta.fecha_renta = fecha #Actualiza fecha
        db.session.commit()
        print("La actualizacion de la fecha fue exitosa!!")
    else:
        print("La renta con ID: " + str(id) + " No existe")

#Dado un id elimina la renta que tenga asociado ese id
def eliminar_renta_por_id(id):
    renta = Renta.query.filter(Renta.idRentar == id).first()
    if(renta):
        db.session.delete(renta)  
        db.session.commit()
        print("La renta se eliminò con exito")
    else:
        print("La renta con el id: " + str(id) + " no existe")

#Elimina todas las rentas existentes
def eliminar_todas_las_rentas():
    rentas = Renta.query.all()
    for renta in rentas:     
            db.session.delete(renta)

        # Confirma los cambios
    db.session.commit()
    print("Todos los registros de las rentas se eliminaron correctamente")