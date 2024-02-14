#Contador de valles
def contadorValles(caminata):
    altura = 0  # Altura a la que estoy
    valles = 0  # Valles contados
    if len(caminata) == 0:
        return 0
    posibleValle = False
    for x in caminata:
        if x == "U":
            altura += 1
        if x == "D":
            altura -= 1
        if altura < 0:
            posibleValle = True
        if altura >= 0 and posibleValle == True:
            valles += 1
            posibleValle = False
    print("Valles: ", valles)
    return valles

#Comeinzan clases para arbol binario y sus métodos
class Nodo:
    def __init__(self, valor):
        self.valor = valor
        self.izquierda = None
        self.derecha = None

class ArbolBinario:
    def __init__(self):
        self.raiz = None

    def agregar(self, valor):
        self.raiz = self._agregar(self.raiz, valor)

    def _agregar(self, nodo, valor):
        if nodo is None:
            return Nodo(valor)
        if valor < nodo.valor:
            nodo.izquierda = self._agregar(nodo.izquierda, valor)
        elif valor > nodo.valor:
            nodo.derecha = self._agregar(nodo.derecha, valor)
        return nodo

    def _pre_orden(self, nodo, lista):
        if nodo is not None:
            lista.append(nodo.valor)
            lista = self._pre_orden(nodo.izquierda, lista)
            lista = self._pre_orden(nodo.derecha, lista)
        return lista

    def _in_orden(self, nodo, lista):
        if nodo is not None:
            lista = self._in_orden(nodo.izquierda, lista)
            lista.append(nodo.valor)
            lista = self._in_orden(nodo.derecha, lista)
        return lista

    def _post_orden(self, nodo, lista):
        if nodo is not None:
            lista = self._post_orden(nodo.izquierda, lista)
            lista = self._post_orden(nodo.derecha, lista)
            lista.append(nodo.valor)
        return lista




#if __name__ == '__main__':
    #contadorValles("UUDDDDUDUDUUU")
    # Ejemplo de uso
    #arbol = ArbolBinario()
    #arbol.agregar(5)
    #arbol.agregar(3)
    #arbol.agregar(7)
    #arbol.agregar(2)
    #arbol.agregar(4)
    #arbol.agregar(6)
    #arbol.agregar(8)


