from flask import Flask
from sqlalchemy import and_, or_

from alchemyClasses import db
from cryptoUtils.CryptoUtils import cipher
from hashlib import sha256

from alchemyClasses.Pelicula import Pelicula
from alchemyClasses.Renta import Renta
from alchemyClasses.Usuario import Usuario
from model.model_pelicula import *
from model.model_usuario import *
from model.model_renta import *


#mysql+pymysql://ferfong:Developer123!@localhost:3306/ing_soft
#<dialecto>+<driver>://<usuario>:<passwd>@localhost:3306/<db>
#mysql+pymysql://lab:Developer123!@localhost:3306/lab_ing_soft
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://lab:Developer123!@localhost:3306/lab_ing_software'
app.config.from_mapping(
    SECRET_KEY='dev'
)
db.init_app(app)

def selecciona_opcion():
    return "\n\nSelecciona una opcion (introduce el numero de la opcion deseada): "

def entrada_fuera_de_rango():
    return "La opcion no existe, intentalo de nuevo."

def imprime_menu_principal():
    print("----MENU PRINCIPAL----")
    print("1. Mostrar Registros.")
    print("2. Actualizar Registro.")
    print("3. Busqueda de Registro por ID.")
    print("4. Eliminar Registro.")
    print("5. Salir.")

def menu_registros():
    while True:
        
        print("1. Mostrar Registros De Todas Las Peliculas.")
        print("2. Mostrar Registros De Todos Los Usuarios.")
        print("3. Mostrar Registros De Todas Las Rentas.")
        print("4. Regresar\n")
        try:
            seleccion = int(input(selecciona_opcion()))
            if seleccion == 1:
                muestra_todas_las_peliculas()
            elif seleccion == 2:
                muestra_todos_los_usuarios()
            elif seleccion == 3:
                muestra_todas_las_rentas()
            elif seleccion == 4:
                break
            else:
                entrada_fuera_de_rango()
        except ValueError:
            print("Error: Debes ingresar un número entero. Intenta de nuevo.")

def menu_actualizaciones():
    while True:
        print("1. Actualiza Nombre De Peliculas")
        print("2. Actualiza Nombre De Usuarios")
        print("3. Actualiza Fecha De Renta")
        print("4. Regresar")
        try:
            seleccion = int(input(selecciona_opcion()))
            if seleccion == 1:
                id = int(input("Introduce el Id de la Pelicula: "))
                nombre = input("Introduce el nuevo nombre de la Pelicula: ")
                actualiza_nombre_de_pelicula(id,nombre)
            elif seleccion == 2:
                id = int(input("Introduce el Id del Usuario: "))
                nombre = input("Introduce el nuevo nombre del Usuario: ")
                actualiza_nombre_de_usuario(id,nombre)
            elif seleccion == 3:
                id = int(input("Introduce el Id de la Renta: "))
                fecha = input("Introduce la nueva fecha en formato YYYY-MM-DDTHH:MM:SS: ")
                actualiza_fecha_de_renta(id,fecha)
            elif seleccion == 4:
                break
            else:
                entrada_fuera_de_rango()
        except ValueError:
            print("Error: Debes ingresar un número entero. Intenta de nuevo.")

def menu_busquedas():
    while True:
        print("1. Busca Pelicula Por ID")
        print("2. Busca Usuario Por ID")
        print("3. Busca Renta Por ID")
        print("4. Regresar")
        try:
            seleccion = int(input(selecciona_opcion()))
            if seleccion == 1:
                id = int(input("Introduce el Id de la Pelicula: "))
                filtar_pelicula_por_id(id)
            elif seleccion == 2:
                id = int(input("Introduce el Id del Usuario: "))
                filtra_usuario_por_id(id)
            elif seleccion == 3:
                id = int(input("Introduce el Id de la Renta: "))
                filtra_renta_por_id(id)
            elif seleccion == 4:
                break
            else:
                entrada_fuera_de_rango()
        except ValueError:
            print("Error: Debes ingresar un número entero. Intenta de nuevo.")

def menu_eliminarPrincipal():
    while True:
        print("1. Elimina Registro Por ID")
        print("2. Eliminar Todos Los Registros De Una Seccion")
        print("3. Regresar")
        try:
            seleccion = int(input(selecciona_opcion()))
            if seleccion == 1:
                menu_elimina_por_id()
            elif seleccion == 2:
                menu_elimina_todo()    
            elif seleccion == 3:
                break
            else:
                entrada_fuera_de_rango()
        except ValueError:
            print("Error: Debes ingresar un número entero. Intenta de nuevo.")

def menu_elimina_todo():
    while True:
        print("1. Elimina Todos Los Registros de Peliculas")
        print("2. Elimina Todos Los Registros de Usuarios")
        print("3. Elimina Todos Los Registros de Rentas")
        print("4. Regresar")
        try:
            seleccion = int(input(selecciona_opcion()))
            if seleccion == 1:
                eliminar_todas_las_peliculas()
            elif seleccion == 2:
                eliminar_todos_los_usuarios()
            elif seleccion == 3:
                eliminar_todas_las_rentas()
            elif seleccion == 4:
                break
            else:
                entrada_fuera_de_rango()
        except ValueError:
            print("Error: Debes ingresar un número entero. Intenta de nuevo.")


def menu_elimina_por_id():
    while True:
        print("1. Elimina UN Registro de Pelicula")
        print("2. Elimina UN Registro de Usuario")
        print("3. Elimina UN Registro de Renta")
        print("4. Regresar")
        try:
            seleccion = int(input(selecciona_opcion()))
            if seleccion == 1:
                id = int(input("Introduce el Id de la Pelicula: "))
                eliminar_pelicula_por_id(id)
            elif seleccion == 2:
                id = int(input("Introduce el Id del Usuario: "))
                eliminar_usuario_por_id(id)
            elif seleccion == 3:
                id = int(input("Introduce el Id de la Renta: "))
                eliminar_renta_por_id(id)
            elif seleccion == 4:
                break
            else:
                entrada_fuera_de_rango()
        except ValueError:
            print("Error: Debes ingresar un número entero. Intenta de nuevo.")


def imprime_despedida():
        print("---------------------------")
        print("Gracias por usar ClonBuster, \n ****Hasta Pronto!!!****")
        print("---------------------------")



if __name__ == '__main__':
    with app.app_context():
        print("-----------------------")
        print("Bienvenido a ClonBuster")
        print("-----------------------")
        while True:
            try:
                imprime_menu_principal()
                seleccion = int(input(selecciona_opcion()))
                if(seleccion == 1):
                    menu_registros()
                if(seleccion == 2):
                    menu_actualizaciones()
                if(seleccion == 3):
                    menu_busquedas()
                if(seleccion == 4):
                    menu_eliminarPrincipal()
                if(seleccion == 5):
                    imprime_despedida()
                    break
                else:
                    entrada_fuera_de_rango()
                
            except ValueError:
                print("Error: Debes ingresar un número entero. Intenta de nuevo.")

