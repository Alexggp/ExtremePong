ALEX EXTREME PONG
=================

El clásico juego de palas llevado al extremo.
Mide tus habilidades contra la máquina en el modo arcade, o enfrentate a un amigo en un modo de dos jugadores 
lleno de sorpresas y posibilidades. 

PRUÉBALO!!!!
http://watson.gsyc.es/~alexggp/ExtremePong/public/index.html



JUGAR
=====

Para jugar hacer doble click en "public/index", el juego se abrirá en el navegador.
Si te pregunta si quieres desbloquear algún tipo de ejecucion de scripts,
acepta (depende del navegador que utilices).


Si quieres ponerlo como servidor (necesitas tener node instalado), en un terminal dentro
de la carpeta principal escribe, node "server.js". Se abrirá en el puerto 3000 (con el navegador
entra en la dirección "localhost:3000").


Para navegar por los diferentes menús pulsa las las Flechas de dirección para seleccionar y la barra
de espacio para confirmar.

Controles :

        Pala de la izquierda:
                arriba: W
                abajo: S

        Pala de la derecha:
                arriba: Flecha arriba
                abajo: Flecha abajo
  
Para partidas 1 jugador, ambos controles mueven la pala.




2 JUGADORES ( VS )    
==================


      Pelotas :
      ---------

        Verde: Pelota de tenis, penaliza 1 punto si traspasa tu meta.
        Gris: De mayor tamaño que el resto, penaliza 10 puntos si traspasa tu meta.
        Azul: Si la capturas, resta 10 de tus puntos de penalización.
        Bola de dragón: Naranja, si la capturas Goku vendrá en tu ayuda.
        Flor: Blanca, si la capturas, se invertirán tus controles. Si coges más de
              una se sumarán los efectos, y luego se desharán de uno en uno.
        Pokeball: Blanca y roja, si la capturas un Snorlax salvaje aparecerá y te
                  bloqueará el camino hasta que se despierte.

                  
      Dificultad:
      -----------
        
        Se selecciona en la pantalla principal, pulsando arriba o abajo en el teclado.
        
        1: Sólo una pelota Verde.
        2: Nivel 1 con dos palas por jugador.
        3: Todas las pelotas.
        4: Una pelota y tres cajas mágicas.
        5: Todas las pelotas en mayor numero.
        6: Nivel 5 con dos palas por jugador.
        
      Duración:
      ---------
      
        Se selecciona en la pantalla principal, pulsando derecha o izquierda en el teclado.
        Duraciones (en segundos): 30, 60, 90 y 120.
        
        
FUNCIONALIDAD TÁCTIL
====================

Incluye funcionalidad táctil para poder ser jugado tanto en moviles como tablets. (De momento testado
para Nexus7)

Para moverse por el menú tocar las flechas de dirección así como botones adicionales. A la hora de jugar, 
las palas responden al tocar la parte inferior o superior de la pantalla del lado de la pantalla correspondiente 
a la pala que se pretende accionar. NO FUNCIONA ARRASTRANDO LA PALA, ya que la velocidad de arrastrado es irregular 
y las palas se mueven con una velocidad constante. 

Cada vez que se realiza un reajuste de pantalla el juego saldrá al menú principal. 



PANTALLA COMPLETA
=================

Haciendo doble click con el ratón dentro del rectángulo de juego. En pantallas táctiles, deslizando el dedo por la
mitad horizontal del borde superior de la pantalla. 










