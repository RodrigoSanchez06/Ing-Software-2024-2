import random

def juegoTenis():
    jugadorUno = verificaNombre('primer')
    jugadorDos = verificaNombre('segundo')
    jugadorUno = 'Jugador 1: '+ jugadorUno
    jugadorDos = 'Jugador 2: ' + jugadorDos
    print('Jugadores Registrados Exitosamente.')
    imprimeNombres(jugadorUno, jugadorDos)
    print("Recuerda que para registrar el punto, solo hace falta escribir el numero del jugador")

    setsJugadorUno = 0  # Conteo de sets ganados del jugador 1
    setsJugadorDos = 0  # Conteo de sets ganados del jugador 2

    juegosJugadorDos = 0  # Conteo de juegos ganados del jugador 2
    juegosJugadorUno = 0  # Conteo de juegos ganados del jugador 1

    setsGlobales = 0

    while not ganadorExist(setsJugadorUno, setsJugadorDos):
        setsGlobales += 1
        print("Comienza el set #" + str(setsGlobales))
        juegosJugadorUno = 0
        juegosJugadorDos = 0
        while not ganadorSetExist(juegosJugadorUno, juegosJugadorDos):
            puntosJugadorUno = 0
            puntosJugadorDos = 0
            print("Comienza nuevo Juego")
            saques = random.randint(1, 2)
            if saques == 1:
                print("Saca " + jugadorUno)
            else:
                print("Saca " + jugadorDos)
            while not ganadorJuegoExist(puntosJugadorUno, puntosJugadorDos):
                if solicitaGanadorPunto() == 1:
                    puntosJugadorUno += 1
                else:
                    puntosJugadorDos += 1
                if puntosJugadorUno == 4 and puntosJugadorDos == 4: #Si los dos tienen ADV se regresan a 40 pts
                    puntosJugadorUno -= 1
                    puntosJugadorDos -= 1
                if  not ganadorJuegoExist(puntosJugadorUno, puntosJugadorDos):
                    imprimePuntos(puntosJugadorUno, puntosJugadorDos, jugadorUno, jugadorDos)
            print("El ganador de este juego es " + devuelveGanadorJuego(puntosJugadorUno, puntosJugadorDos, jugadorUno, jugadorDos))
            if puntosJugadorUno > puntosJugadorDos: #Aumentamos el contador de juegos de cada uno
                juegosJugadorUno += 1
                print("Saca " + jugadorDos)
            elif puntosJugadorDos > puntosJugadorUno:
                juegosJugadorDos += 1
                print("Saca " + jugadorUno)
            imprimeJuegos(juegosJugadorUno, juegosJugadorDos, jugadorUno, jugadorDos)
            if esJuegoImpar(juegosJugadorUno, juegosJugadorDos):
                cambioCancha()
        print("El ganador de este set es " + devuelveGanadorSet(juegosJugadorUno, juegosJugadorDos, jugadorUno, jugadorDos))
        if juegosJugadorUno > juegosJugadorDos:
            setsJugadorUno += 1
        elif puntosJugadorDos > puntosJugadorUno:
            setsJugadorDos += 1
        imprimesets(setsJugadorUno, setsJugadorDos, jugadorUno, jugadorDos)
    print("El ganador de la partida es *****" + devuelveGanadorJuego(setsJugadorUno, setsJugadorDos, jugadorUno, jugadorDos) + "*****")

    print("Felicidades")

def esJuegoImpar(juegosJugadorUno, juegosJugadorDos):
    numero = juegosJugadorUno + juegosJugadorDos
    if numero % 2 == 0:
        return False
    else:
        return True


def cambioCancha():
    print("### Cambio de cancha###")

def ganadorSetExist(juegosJugadorUno, juegosJugadorDos):
    if (juegosJugadorUno >= 6 or juegosJugadorDos >= 6) and (abs(juegosJugadorUno - juegosJugadorDos) >= 2):
        return True
    else:
        return False

def ganadorJuegoExist(puntosJugadorUno, puntosJugadorDos):
    if puntosJugadorUno == puntosJugadorDos:
        return False
    if puntosJugadorUno > 4 or puntosJugadorDos > 4:
        return True
    if (puntosJugadorUno == 4 and puntosJugadorDos <= 2) or (puntosJugadorDos == 4 and puntosJugadorUno <= 2):
        return True
    else:
        return False
# Determina si existe un ganador en la partida

def ganadorExist(setsJugadorUno, setsJugadorDos):
    if (setsJugadorUno >= 2 and setsJugadorDos <= 1):
        return True
    elif (setsJugadorDos >= 2 and setsJugadorUno <= 1):
        return True
    else:
        return False

def devuelveGanadorJuego(puntosJugadorUno, puntosJugadorDos, jugadorUno, jugadorDos):
    if puntosJugadorUno > puntosJugadorDos:
        return jugadorUno
    elif puntosJugadorDos > puntosJugadorUno:
        return jugadorDos
    else:
        print("Error en ganador juego")

def devuelveGanadorSet(juegosJugadorUno, juegosJugadorDos, jugadorUno, jugadorDos):
    if juegosJugadorUno > juegosJugadorDos:
        return jugadorUno
    if juegosJugadorDos > juegosJugadorUno:
        return jugadorDos
    else:
        return "ERROR EN DEVOLVER EL GANADOR DEL SET"

# Imprime al ganador en caso de que exista
def devuelveGanador(setsJugadorUno, setsJugadorDos, jugadorUno, jugadorDos):
    if (setsJugadorUno >= 2 and setsJugadorDos <= 1):
        return jugadorUno  # Si jugador1 tiene al menos 2 sets y el 2 tiene 1, o si el uno tiene 3 sets
    elif (setsJugadorDos >= 2 and setsJugadorUno <= 1):
        return jugadorDos  # Si jugador2 tiene al menos 2 sets y el 2 tiene 1, o si el dos tiene 3 sets
    else:
        return 'aun no hay ganador existente'

# imprime nombres de dos jugadores
def imprimeNombres(jugadorUno, jugadorDos):
    print( jugadorUno)
    print( jugadorDos)

def imprimePuntos(puntosJugadorUno, puntosJugadorDos, jugadorUno, jugadorDos):
    arreglo_puntos = [0, 15, 30, 40, 'ADV']
    print(jugadorUno + ' --- Puntos: ' + str(arreglo_puntos[puntosJugadorUno]))
    print(jugadorDos + ' --- Puntos: ' + str(arreglo_puntos[puntosJugadorDos]))

def imprimeJuegos(juegosJugadorUno, juegosJugadorDos, jugadorUno, jugadorDos):
    print(jugadorUno + ' --- Juegos: ' + str(juegosJugadorUno))
    print(jugadorDos + ' --- Juegos: ' + str(juegosJugadorDos))

def imprimesets(setsJugadorUno, setsJugadorDos, jugadorUno, jugadorDos):
    print(jugadorUno + ' --- sets: ' + str(setsJugadorUno))
    print(jugadorDos + ' --- sets: ' + str(setsJugadorDos))

# Verifica que el formato del nombre de un jugador sea correcto
def verificaNombre(numeroJugador):
    while True:
        try:
            nombre = input("Introduce el nombre del " + numeroJugador + " jugador: ")
            if not nombre.isalpha():
                raise ValueError
            else:
                return nombre
        except ValueError:
            print("La entrada del jugador es invalido, intentalo de nuevo")

def solicitaGanadorPunto():
    while True:
        try:
            entradaPunto = input("¿Que jugador se lleva el punto: ")
            etradaPuntoEntera = int(entradaPunto)
            if etradaPuntoEntera == 1:
                return 1
            elif etradaPuntoEntera == 2:
                return 2
            else:
                raise ValueError("El jugador no existe")
        except ValueError:
            print("Unicamente debes escribir el número de jugador")

if __name__ == '__main__':
    juegoTenis()
