
var endGame1 = function(){
    if (Game.dificultad>1){Game.dificultad--}; 
    Game.setBoard(2,new TitleScreen("Perdiste!!!!", 
                                    "Has bajado un nivel!",
                                    playGame1));
}
var nextLvl = function(){
    if (Game.dificultad<4){Game.dificultad++};
    Game.setBoard(2,new TitleScreen("Ganaste el nivel!!!!", 
                                    "Aprieta espacio para pasar al siguiente!",
                                    playGame1));
}

var play1Player = function(){
	  Game.setBoard(3,new Reloj(false));
	  playGame1();
}

var playGame1 = function() {
    Game.setBoard(4,new GamePoints(0));

    var board = new GameBoard();


    // PALAS DE JUGADORES             Si se modifica el orden de las palas se modifican las referencias.
    board.add(new Pala1PlayerA());
    board.add(new Pala2PlayerA());
    board.add(new Pala3PlayerA());
    
    board.add(new Pala1Maquina());
    board.add(new Pala2Maquina());
    board.add(new Pala3Maquina());
    

    switch(Game.dificultad){
        
        case 1:
          board.add(new Pelota());
          break;
        case 2:
          board.add(new Goku(0,Game.width/2,Game.height/2));
          board.add(new Pelota());
          break;
        case 3:
          board.add(new Goku(0,3*Game.width/9,0));
          board.add(new Goku(0,7*Game.width/9,Game.height));
          board.add(new Pelota());
          break;
        case 4:
          board.add(new PalauxA());
          board.add(new PalauxB());
          board.add(new Pelota());
          break; 
   }
    Game.setBoard(2,board);
    
}


////////// PLAYER MAQUINA
var Pala1Maquina = function() { //Parte central de la pala derecha
    this.setup('pala1B', { vx: 0, frame: 0, reloadTime: 0.25, maxVel: 200 });

    this.reload = this.reloadTime;
    this.x = Game.width - 10 - this.w;
    this.y = Game.height/2 - this.h/2;

    this.step = function(dt) {

    var percent = false;
    var rand = Math.floor(Math.random() * (100));

    if(rand > 20) {  percent = true }

  
  
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
    this.x = Game.width - 10 - this.w;
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
