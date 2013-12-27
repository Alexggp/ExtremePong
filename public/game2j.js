/*
    Alex Extreme Pong
    Copyright (C) 2013  Alejandro García-Gasco Pérez
*/

var endGame1 = function(){
    if(Game.mobile) {
	    Game.setBoard(6,new TouchControlsMenu());
	  }
    if (Game.vidas>0){
      Game.vidas--;
      if(Music.extension){Music.niveles.rewind.Miplay()}
      Game.setBoard(2,new TitleScreen("\u00a1\u00a1\u00a1Perdiste!!! Prueba otra vez...", 
                                      "Te quedan "+ (Game.vidas+1) + " intentos",
                                      playGame1));
    }else{
      if (Game.dificultad>1){
        Game.dificultad-- ;
        Game.vidas++;
        if(Music.extension){Music.niveles.bajar.Miplay()};    //SONIDO: bajar nivel
        Game.setBoard(2,new TitleScreen("\u00a1\u00a1\u00a1Perdiste!!!", 
                                        "Has bajado un nivel",
                                        playGame1));
      }else{
        if(Music.extension){Music.niveles.over.Miplay()};    //SONIDO: Fin del juego
        if(Music.extension){Music.niveles.aplauso.Miplay()}
        Game.setBoard(2,new TitleScreen("aaayyy Inutil... \u00a1No pasas del nivel 1!", 
                                        "hay que entrenar un poquito",
                                        playMenu));
      }
    }
}
var nextLvl = function(){
    if(Game.mobile) {
	    Game.setBoard(6,new TouchControlsMenu());
	  }
    if (Game.dificultad<8){
      Game.dificultad++;
      Game.vidas++;
      if(Music.extension){Music.niveles.subir.Miplay()};    //SONIDO: subir nivel
      Game.setBoard(2,new TitleScreen("\u00a1\u00a1\u00a1Ganaste el nivel!!!", 
                                      "Aprieta espacio para pasar al siguiente!",
                                      playGame1));
    }else{
      if(Music.extension){Music.niveles.winner.Miplay()};    //SONIDO: juego ganado
      Game.setBoard(2,new TitleScreen("\u00a1\u00a1\u00a1Campeon!!! \u00a1\u00a1\u00a1Ganaste!!!", 
                                      "\u00c9ste es tu tiempo: "+(Game.duracion-1),
                                      playMenu));
    }
}



var playGame1 = function() {
    
    if(Game.mobile) {
	    Game.setBoard(6,new TouchControlsGame());
	  }

    if(!Music.menu.background.paused && Music.extension){
                  Music.menu.background.pause();
                  Music.menu.background.currentTime = 0};
    if(Music.niveles.background.paused && Music.extension){Music.niveles.background.Miplay()};


    Game.setBoard(4,new GamePoints(0));
    Game.setBoard(3,new Reloj(false,Game.duracion));
    

    var board = new GameBoard();


    // PALAS DE JUGADORES             Si se modifica el orden de las palas se modifican las referencias.
    board.add(new Pala1PlayerA());
    board.add(new Pala2PlayerA());
    board.add(new Pala3PlayerA());
    
    board.add(new Pala1Maquina(40));
    board.add(new Pala2Maquina());
    board.add(new Pala3Maquina());
    
    
     if(Music.extension){Music.niveles.pitido.Miplay()};    //SONIDO: PITIDO INICIAL
    
 
    switch(Game.dificultad){
        
        case 1:
          board.add(new Pelota());
          break;
        
        case 2:
          board.add(new cajaMagica2(Game.width/2,0));
          board.add(new Pelota());
          break;
        case 3:
          board.objects[3].factor=30;
          board.add(new PalauxA());
          board.add(new PalauxB());
          board.add(new Pelota());
          break; 
        case 4:
          board.objects[3].factor=30;
          board.add(new Goku(0,Game.width/2,Game.height/2));
          board.add(new Pelota());
          break;
        case 5:
          board.objects[3].factor=30;
          board.add(new cajaMagica(Game.width/2,Game.height/2));
          board.add(new cajaMagica(Game.width/3,Game.height));
          board.add(new cajaMagica(2*Game.width/3,0));
          board.add(new Pelota());
          break;
        case 6:
          board.objects[3].factor=25;
          board.add(new Goku(0,3*Game.width/9,0));
          board.add(new Goku(0,7*Game.width/9,Game.height));
          board.add(new Pelota());
          break;       
        case 7:
          board.objects[3].factor=0;
          board.add(new Pelota());
          break;  
        case 8:
          board.objects[3].factor=30;
          board.add(new Goku(0,2*Game.width/9,0));
          board.add(new Goku(0,7*Game.width/9,Game.height));
          board.add(new cajaMagica2(Game.width/2,Game.height/2));
          board.add(new Pelota());
          break;

   }
    for (var i =0;i<Game.vidas;i++){
      board.add(new Corazon(Game.canvas.width-35 -35*i, Game.canvas.height-32,0));
    }
    Game.setBoard(2,board);
    
}


////////// PLAYER MAQUINA
var Pala1Maquina = function(factor) { //Parte central de la pala derecha
    this.setup('pala1B', { vx: 0, frame: 0, reloadTime: 0.25, maxVel: 200 });

    this.reload = this.reloadTime;
    this.x = Game.canvas.width - 10 - this.w;
    this.y = Game.height/2 - this.h/2;
    
    this.factor =factor;
    this.step = function(dt) {

    var percent = false;
    var rand = Math.floor(Math.random() * (100));
  

    if(rand > this.factor) {  percent = true }

  
  
    pelota = ( _.find(this.board.objects,function(obj){return obj.sprite=="pelota"}));



    if(pelota.vx > 0 && pelota.x>Game.width/4 && pelota.y>this.y+this.h/2 && percent) { 
      this.vy = this.maxVel;
    }
    else if(pelota.vx > 0 && pelota.x>Game.width/4 && pelota.y<this.y+this.h/2 && percent) { 
      this.vy = -this.maxVel;
    }
    else if(pelota.vx < 0 && pelota.x>Game.width/2 && pelota.y>this.y+this.h/2 && percent) { 
      this.vy = this.maxVel;
    }
    else if(pelota.vx < 0 && pelota.x>Game.width/2 && pelota.y<this.y+this.h/2 && percent) { 
      this.vy = -this.maxVel;
    }
    
    else { this.vy = 0; }
     
   
    this.y += this.vy * dt;


    if(this.y < 32) { this.y = 32; }
    else if(this.y > Game.height - 32 - this.h) { 
        this.y = Game.height -32 - this.h
    }
    
    
    if (Game.points2 ==3){nextLvl()};
    if (Game.points1 ==3){endGame1()};
    

    this.reload-=dt;

  }
}

// Heredamos del prototipo new Sprite()
Pala1Maquina.prototype = new Sprite();
Pala1Maquina.prototype.type = OBJETO_PALA1;

var Pala2Maquina = function() { //Parte de abajo de la pala derecha
    this.setup('pala2B', { vx: 0, frame: 0, reloadTime: 0.25, maxVel: 200 });

    this.reload = this.reloadTime;
    this.x = Game.canvas.width - 10 - this.w;
    this.y = Game.height/2 + 100/2 - this.h/2;

    this.step = function(dt) {
      this.y= this.board.objects[3].y + this.board.objects[3].h;
	    this.reload-=dt;
    }
}

Pala2Maquina.prototype = new Sprite();
Pala2Maquina.prototype.type = OBJETO_PALA2;


var Pala3Maquina = function() {  //Parte de arriba de la pala derecha
    this.setup('pala3B', { vx: 0, frame: 0, reloadTime: 0.25, maxVel: 200 });

    this.reload = this.reloadTime;
    this.x = Game.width - 10 - this.w;
    this.y = Game.height/2 - 100/2 - this.h/2;

    this.step = function(dt) {
      this.y= this.board.objects[3].y - this.h;
	    this.reload-=dt;
    }
}

Pala3Maquina.prototype = new Sprite();
Pala3Maquina.prototype.type = OBJETO_PALA2;

var PalauxB =function(){ // Pala auxiliar de la pala derecha (en la izquierda)
    this.setup('pala1B', { vx: 0, frame: 0, reloadTime: 0.25, maxVel: 200 });
    
    this.reload = this.reloadTime;
    this.x= Game.width/3 - this.w;
    this.step = function(dt) {
      this.y= this.board.objects[3].y;
	    this.reload-=dt;
  }
    
}
PalauxB.prototype = new Sprite();
PalauxB.prototype.type = OBJETO_PALAUX;


var cajaMagica = function(ox,oy){
    this.setup('cajaMagica', {vy:50,frame: 0, reloadTime: 0.25});
    this.x=ox - this.w/2;
    this.y=oy - this.h/2
    
    this.reload = this.reloadTime;
    

    this.step = function(dt) {

	  this.y += this.vy * dt;

	  if(this.y < 0) { 
	    this.y = 0; 
	    this.vy= -this.vy
	  }
	  else if(this.y > Game.height - this.h) { 
	      this.y = Game.height - this.h;
	      this.vy= -this.vy;
	  }
	  this.reload-=dt;
  
    }

}
// Heredamos del prototipo new Sprite()
cajaMagica.prototype = new Sprite();
cajaMagica.prototype.type = OBJETO_CAJAMAGICA;

var cajaMagica2 = function(ox,oy){
    this.setup('cajaMagica2', {vy:80,frame: 0, reloadTime: 0.25});
    this.x=ox - this.w/2;
    this.y=oy - this.h/2;
    
    this.reload = this.reloadTime;
    

    this.step = function(dt) {

	  this.y += this.vy * dt;

	  if(this.y < 0) { 
	    this.y = 0; 
	    this.vy= -this.vy
	  }
	  else if(this.y > Game.height - this.h) { 
	      this.y = Game.height - this.h;
	      this.vy= -this.vy;
	  }
	  this.reload-=dt;
  
    }

}
// Heredamos del prototipo new Sprite()
cajaMagica2.prototype = new Sprite();
cajaMagica2.prototype.type = OBJETO_CAJAMAGICA;




