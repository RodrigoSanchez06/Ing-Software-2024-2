import random
import pymysql.cursors
from datetime import datetime, timedelta
from faker import Faker

# Connect to the database
connection = pymysql.connect(host='localhost',
                             user='lab',
                             password='Developer123!',
                             database='lab_ing_software',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)
fake = Faker()

def insertarElementoEnTablasc():
    with connection.cursor() as cursor:
        # Iniciar transacción
        connection.begin()

        try:
            # Generar datos aleatorios
            nombre = fake.name()
            genero = fake.random_element(elements=('Drama', 'Comedia', 'Acción', 'Ciencia Ficción', 'Romance'))
            duracion = random.randint(90, 180)
            inventario = random.randint(1, 30)
            apPat = fake.last_name()
            apMat = fake.last_name()
            password = fake.password()
            email = fake.email()
            profilePicture = fake.image_url()
            superUser = random.choice(['0', '1'])
            idUsuario = random.randint(1, 100)
            idPelicula = random.randint(1, 100)
            fecha_renta = fake.date_this_year()
            dias_de_renta = random.randint(1, 7)
            estatus = random.choice([0, 1])

            # Consultas de inserción
            insertarUsuario(nombre, apPat, apMat, password, email, profilePicture, superUser)
            insertarPelicula(nombre, genero, duracion, inventario)
            insertarRenta(idUsuario, idPelicula, fecha_renta, dias_de_renta, estatus)

            # Commit de la transacción
            connection.commit()
            print("Inserciones realizadas con éxito")

        except Exception as e:
            # Rollback en caso de error
            connection.rollback()
            print(f"Error al insertar: {e}")


def filtraApellido(terminacion_apellido):
    with connection.cursor() as cursor:
            # Utilizamos la cláusula LIKE para buscar apellidos que terminen con la cadena proporcionada
            sql = "SELECT * FROM `usuarios` WHERE apPat LIKE %s OR apMat LIKE %s"
            cursor.execute(sql, (f'%{terminacion_apellido}', f'%{terminacion_apellido}'))
            
            # Obtener todos los resultados
            results = cursor.fetchall()

            return results
    
def cambiarGeneroDePelicula(nombrePelicula, nuevoGemero):
    with connection.cursor() as cursor:
        # Verificar si la película existe
        sql_buscar_pelicula = "SELECT * FROM `peliculas` WHERE nombre = %s"
        cursor.execute(sql_buscar_pelicula, (nombrePelicula,))
        resultado = cursor.fetchone()

        if resultado:
            # La película existe, entonces actualizamos el género
            sql_actualizar_genero = "UPDATE `peliculas` SET genero = %s WHERE nombre = %s"
            cursor.execute(sql_actualizar_genero, (nuevoGemero, nombrePelicula))

            connection.commit()
            print(f"El género de la película '{nombrePelicula}' se ha actualizado a '{nuevoGemero}'")
        else:
            print(f"La película '{nombrePelicula}' no existe")

def eliminarRentasAntiguas():
    with connection.cursor() as cursor:
        # Calcular la fecha límite (hoy - 3 días)
        fecha_limite = datetime.now() - timedelta(days=3)

        # Convertir la fecha límite al formato de tu base de datos
        fecha_limite_str = fecha_limite.strftime('%Y-%m-%d %H:%M:%S')

        # Eliminar las rentas antiguas
        sql_eliminar_rentas = "DELETE FROM `rentar` WHERE fecha_renta <= %s"
        cursor.execute(sql_eliminar_rentas, (fecha_limite_str,))

        # connection is not autocommit by default. So you must commit to save
        # your changes.
        connection.commit()

        print(f"Se eliminaron las rentas anteriores a {fecha_limite_str}")


#Metodo auxiliar que inserta pelicula
def insertarPelicula(nombre, genero, duracion, inventario):
     with connection.cursor() as cursor:

        sql = "INSERT INTO `peliculas` (`nombre`, `genero`, `duracion`, `inventario`) VALUES (%s, %s, %s, %s)"
        cursor.execute(sql, (nombre, genero, duracion, inventario))

        connection.commit() 
        print("La pelicula se inserto con exito")

#Metodo auxiliar que inserta usuario
def insertarUsuario(nombre,apPat,apMat,password,email,profilePicture,superUser):
     with connection.cursor() as cursor:

        sql = "INSERT INTO `usuarios` (`nombre`, `apPat`, `apMat`, `password`, `email`, `profilePicture`, `superUser`) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        cursor.execute(sql, (nombre, apPat, apMat, password,email,profilePicture,superUser))

        connection.commit() 
        print("El usuario se inserto con exito!!!")

#Metodo auxiliar que inserta renta
def insertarRenta(idUsuario, idPelicula, fecha_renta, dias_de_renta, estatus):
    with connection.cursor() as cursor:

        sqlUsuario = "SELECT * FROM `usuarios` WHERE idUsuario = %s"
        cursor.execute(sqlUsuario, (idUsuario))
        resultUsuario = cursor.fetchone()

        sqlPelicula ="SELECT * FROM `peliculas` WHERE idPelicula = %s"
        cursor.execute(sqlPelicula, (idPelicula))
        resultPelicula = cursor.fetchone()

        if resultUsuario and resultPelicula:
            
            sql = "INSERT INTO `rentar` (`idUsuario`, `idPelicula`, `fecha_renta`, `dias_de_renta`, `estatus`) VALUES (%s, %s, %s, %s, %s)"
            cursor.execute(sql, (idUsuario, idPelicula, fecha_renta, dias_de_renta,estatus))

            connection.commit() 
            print("Renta con exito")
        else:
            print("El usuario o la pelicula no existen")
