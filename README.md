# Juego de la Vida

Es una app que simula el juego de la vida de Conway hecha en react.
Las celulas blancas se encuentran muertas mientras que las rojas se encuentan vivas. Originalmente todas las celulas se encuentran muertas. Haciendo click sobre una celula la misma cobra vida. Al hacer click comienza a iterar la simulacion, cada 300 ms mata o revive una celula y aumenta el contador de generaciones en 1. Al hacer click en detener la simulacio se pone en pausa y puede ser reanudada al hacer click en iniciar. Reiniciar para la simulacion, mata todas las ceculas vivas y resetea el contador de Generacion. 

Haciendo click en el boton step se realiza un turno de la simulacion.

Se puede cambiar el tamaño de la grilla  o el tiempo entre cada ejecucion haciendo click en los botones de "Cambiar tamaño" y "Cambiar tiempo" respectivamente.

Se puede guardar la configuracion actual en la memoria haciendo click en "Guardar Configuracion".

Se puede cargar una configuracion predeterminada o una que este en la memoria haciendo click en "Cargar Configuracion". 

Actualmente se tiene un par de configuraciones basicas predeterminadas:

### Flor
Crea un tablero de 10x10 con una "flor" viva en el centro.

### Diagonal
Crea un tablero de 10x10 con la diagonal mas la segunda celula de la primera fila vivas.

### Medio vertical
Crea un tablero de 10x10 con una columna vertical viva

### Medio y Diagonal
Crea un tablero de 10x10 con una columna vertical y la diagonal viva

### Vivos
Crea un tablero de 10x10 con todas las celulas vivas

El proyecto esta disponible para interactuar en https://juego-de-la-vida.herokuapp.com/.
