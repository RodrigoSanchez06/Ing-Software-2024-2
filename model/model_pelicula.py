from alchemyClasses.Pelicula import Pelicula
from alchemyClasses import db
from alchemyClasses.Renta import Renta

#Muestra todas las peliculas
def muestra_todas_las_peliculas():
    for pelicula in Pelicula.query.all():
        print(pelicula)
        print("--------------------------")

#Dado un ID busca una pelicula 
def filtar_pelicula_por_id(id):
    flag = False
    for pelicula in Pelicula.query.filter(Pelicula.idPelicula == id): #Busca el id
        flag = True
        print(pelicula)
    
    if (not flag):
        print("El ID de la pelicula no existe.")

#Dado un id actualiza el nombre actual con el nombre dado
def actualiza_nombre_de_pelicula(id, nombre):
    pelicula = Pelicula.query.filter(Pelicula.idPelicula == id).first()
    if(pelicula):
        pelicula.nombre = nombre #Actualiza
        db.session.commit()
        print("La actualizacion del nombre fue exitosa!!")
    else:
        print("La pelicula con el id: " + str(id) + " No existe")

#Dado un id elimina el registro de esa pelicula 
def eliminar_pelicula_por_id(id):
    pelicula = Pelicula.query.filter(Pelicula.idPelicula == id).first()
    if(pelicula):
        Renta.query.filter(Renta.idPelicula == id).delete()#Elimino las rentas en las que esta 
        db.session.delete(pelicula)  
        db.session.commit()
        print("La pelicula se eliminò con exito")
    else:
        print("La pelicula con el id: " + str(id) + " no existe")

#Elimina todas las peliculas
def eliminar_todas_las_peliculas():
    peliculas = Pelicula.query.all()
    for pelicula in peliculas:
        # Elimina los registros en la tabla rentar que hacen referencia a la película
        rentas_pelicula = Renta.query.filter_by(idPelicula=pelicula.idPelicula).all()
        for renta in rentas_pelicula:
            db.session.delete(renta)
        db.session.commit()
            # Elimina la película
        db.session.delete(pelicula)
        # Confirma los cambios
    db.session.commit()
    print("Todos los registros de las peliculas se eliminaron correctamente")


