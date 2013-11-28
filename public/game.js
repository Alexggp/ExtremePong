var sprites = {
    pala1A:   { sx: 0, sy: 32, w: 24, h: 68, frames: 1 },
    pala2A:   { sx: 29, sy: 100, w: 24, h: 32, frames: 1 },
    pala3A:   { sx: 29, sy: 0, w: 24, h: 32, frames: 1 },
    pala1B:   { sx: 29, sy: 32, w: 24, h: 68, frames: 1 },
    pala2B:   { sx: 0, sy: 100, w: 24, h: 32, frames: 1 },
    pala3B:   { sx: 0, sy: 0, w: 24, h: 32, frames: 1 },
    pelota:   { sx: 56, sy: 0, w: 26, h: 26, frames: 1 },
    pNegra:   { sx: 90, sy: 0, w: 50, h: 45, frames: 1 },
    pAzul:    { sx: 55, sy: 53, w: 29, h: 29, frames: 1 },
    pDB:      { sx: 56, sy: 25, w: 28, h: 28, frames: 1 },
	  pPokeball:{ sx: 58, sy: 84, w: 27, h: 26, frames: 1 },
	  pflor:    { sx: 100, sy: 46, w: 30, h: 30, frames: 1 },
    Goku1:    { sx: 14, sy: 157, w: 57, h: 80, frames: 1 },
    Goku2:    { sx: 67, sy: 157, w: 57, h: 80, frames: 1 },
    corazon:  { sx: 142, sy:0, w: 30, h: 28, frames: 1 },
    snorlax:  { sx: 6, sy:277, w: 101, h: 82, frames: 1 },
    cetas:    { sx: 0, sy:133, w: 30, h: 8, frames:4},
    explosion: { sx: 0, sy: 372, w: 48, h: 48, frames: 1 },
    cajaMagica: { sx: 175, sy:0, w: 60, h: 60, frames: 1 },
    cajaMagica2: { sx: 175, sy:0, w: 120, h: 120, frames: 1 }
};

var playMenu =function(){
    Game.dificultad=1;
    Game.vidas=3;
    Game.segundos=60;
    Game.duracion= Game.segundos*1000;
    Game.setBoard(0,new capaClear(true));
    Game.setBoard(2, new MenuScreen(startGame));
    Game.setBoard(4,new capaClear(false)); //Para que no nos quede pintado el reloj 
    Game.setBoard(3,new capaClear(false));  //o el marcador si volvemos al Menu
   
}

var startGame = function() {
    if (Game.jugadores==2){
      Game.setBoard(2,new TitleScreen("Alex extreme pong", 
                                      "Aprieta espacio para jugar!",
                                      playGame));
    }else{
      Game.setBoard(2,new TitleScreen("Alex extreme pong", 
                                      "Aprieta espacio para jugar!",
                                      play1Player));
    }
}
var OBJETO_PALA1        =   1,
    OBJETO_PALA2        =   2,
    OBJETO_PELOTA       =   4,
    OBJETO_PELOTA_NEGRA =   8,
    OBJETO_PELOTA_AZUL  =  16,
    OBJETO_PELOTA_DB    =  32,
    OBJETO_PALAUX       =  64,
    OBJETO_SNORLAX      = 128;
	  OBJETO_PELOTA_POKE  = 256;
	  OBJETO_PELOTA_FLOR  = 512;
	  OBJETO_GOKU         =1024;
	  OBJETO_CAJAMAGICA   =2048;


var endGame = function(){
    Game.setBoard(2,new TitleScreen("Fin del juego!!!!", 
                                    "Aprieta espacio para jugar otra vez!",
                                    playGame));
}

var playGame = function() {
	  Game.setBoard(4,new GamePoints(0));
	  Game.setBoard(3,new Reloj(true));
    var board = new GameBoard();


    // PALAS DE JUGADORES             Si se modifica el orden de las palas se modifican las referencias.
    board.add(new Pala1PlayerA());
    board.add(new Pala2PlayerA());
    board.add(new Pala3PlayerA());
    board.add(new Pala1PlayerB());
    board.add(new Pala2PlayerB());
    board.add(new Pala3PlayerB());

    
    // PELOTAS

    

    switch(Game.dificultad){
        

        case 6:
            
            board.add(new PalauxA());
            board.add(new PalauxB());                 
              

        case 5:

          	rand= Math.floor((Math.random()*(Game.duracion)));
            setTimeout(function(){(board.add(new Pelota_Poke()))},rand);
            rand= Math.floor((Math.random()*Game.duracion));
            setTimeout(function(){(board.add(new Pelota_Poke()))},rand);
            setTimeout(function(){(board.add(new Pelota()))},Game.duracion/20*3);
            rand= Math.floor((Math.random()*(Game.duracion)));
            setTimeout(function(){(board.add(new Pelota_Flor()))},rand);
             
        case 3:  
            for (var i=1;i<2;i++){
                rand= Math.floor((Math.random()*(Game.duracion)));
                setTimeout(function(){(board.add(new Pelota_Flor()))},rand*i);
            };
            rand= Math.floor((Math.random()*(Game.duracion)));
            setTimeout(function(){(board.add(new Pelota_Poke()))},rand);
            
            for (var i=1;i<2;i++){
                setTimeout(function(){(board.add(new Pelota()))},Game.duracion/20*i);
	          };
            setInterval(function(){(board.add(new Pelota_Negra()))},Game.duracion/6);
            setInterval(function(){(board.add(new Pelota_Azul()))},Game.duracion/5);
            setInterval(function(){(board.add(new Pelota_DB()))},Game.duracion/4);
        
        case 4:
            if (Game.dificultad == 4){
            board.add(new cajaMagica(Game.width/2,Game.height/2));
            board.add(new cajaMagica(Game.width/3,Game.height));
            board.add(new cajaMagica(2*Game.width/3,0));
            }  
        case 2:
            if (Game.dificultad == 2){
                  board.add(new PalauxA());
                  board.add(new PalauxB());
            }   
        case 1:
            board.add(new Pelota());

    }
    Game.setBoard(2,board);
    setTimeout(function(){endGame()},Game.duracion);
}



///////////////////////////////////////////////////////////////////////////////////////////////////////// PALAS!!


/////// PLAYER A
var Pala1PlayerA = function() { //Parte central de la pala izquierda
    this.setup('pala1A', { vx: 0, frame: 0, reloadTime: 0.25, maxVel: 200 });

    this.reload = this.reloadTime;
    this.x =  10;
    this.y = Game.height/2 - this.h/2;
    this.step = function(dt) {
    

      if(Game.keys['down1']) { this.vy = this.maxVel; }
      else if(Game.keys['up1']) { this.vy = -this.maxVel; }
      
      else if(Game.keys['down2'] && Game.jugadores==1) { this.vy = this.maxVel; }
      else if(Game.keys['up2'] && Game.jugadores==1) { this.vy = -this.maxVel; }
      else { this.vy = 0; }
      
      

	    this.y += this.vy * dt;

	    if(this.y < 32) { this.y = 32; }
	    else if(this.y > Game.height - 32 - this.h) { 
	        this.y = Game.height -32 - this.h
	    }

	    this.reload-=dt;

    }
}
// Heredamos del prototipo new Sprite()
Pala1PlayerA.prototype = new Sprite();
Pala1PlayerA.prototype.type = OBJETO_PALA1;

var Pala2PlayerA = function() { //Parte de abajo de la pala izquierda
    this.setup('pala2A', { vx: 0, frame: 0, reloadTime: 0.25, maxVel: 200 });

    this.reload = this.reloadTime;
    this.x =  10;
    this.y = Game.height/2 + 100/2 - this.h/2;

    this.step = function(dt) {
        this.y= this.board.objects[0].y + this.board.objects[0].h;
	    this.reload-=dt;
    }
}

Pala2PlayerA.prototype = new Sprite();
Pala2PlayerA.prototype.type = OBJETO_PALA2;


var Pala3PlayerA = function() { // Parte de arriba de la pala izquierda
    this.setup('pala3A', { vx: 0, frame: 0, reloadTime: 0.25, maxVel: 200 });

    this.reload = this.reloadTime;
    this.x =  10;
    this.y = Game.height/2 - 100/2 - this.h/2;

    this.step = function(dt) {
        this.y= this.board.objects[0].y - this.h;
	      this.reload-=dt;
  }
}

Pala3PlayerA.prototype = new Sprite();
Pala3PlayerA.prototype.type = OBJETO_PALA2;


var PalauxA =function(){ // Pala auxiliar de la pala izquierda (en la derecha)
    this.setup('pala1A', { vx: 0, frame: 0, reloadTime: 0.25, maxVel: 200 });
    
    this.reload = this.reloadTime;
    this.x= Game.width - Game.width/3;
    this.step = function(dt) {
      this.y= this.board.objects[0].y;
	    this.reload-=dt;
  }
    
}
PalauxA.prototype = new Sprite();
PalauxA.prototype.type = OBJETO_PALAUX;



////////// PLAYER B
var Pala1PlayerB = function() { //Parte central de la pala derecha
  this.setup('pala1B', { vx: 0, frame: 0, reloadTime: 0.25, maxVel: 200 });

  this.reload = this.reloadTime;
  this.x = Game.width - 10 - this.w;
  this.y = Game.height/2 - this.h/2;

  this.step = function(dt) {

    if(Game.keys['down2']) { this.vy = this.maxVel; }
    else if(Game.keys['up2']) { this.vy = -this.maxVel; }
    else { this.vy = 0; }
      
    this.y += this.vy * dt;

    if(this.y < 32) { this.y = 32; }
    else if(this.y > Game.height - 32 - this.h) { 
        this.y = Game.height -32 - this.h
    }

    this.reload-=dt;

  }
}

// Heredamos del prototipo new Sprite()
Pala1PlayerB.prototype = new Sprite();
Pala1PlayerB.prototype.type = OBJETO_PALA1;

var Pala2PlayerB = function() { //Parte de abajo de la pala derecha
    this.setup('pala2B', { vx: 0, frame: 0, reloadTime: 0.25, maxVel: 200 });

    this.reload = this.reloadTime;
    this.x = Game.width - 10 - this.w;
    this.y = Game.height/2 + 100/2 - this.h/2;

    this.step = function(dt) {
      this.y= this.board.objects[3].y + this.board.objects[3].h;
	    this.reload-=dt;
    }
}

Pala2PlayerB.prototype = new Sprite();
Pala2PlayerB.prototype.type = OBJETO_PALA2;


var Pala3PlayerB = function() {  //Parte de arriba de la pala derecha
    this.setup('pala3B', { vx: 0, frame: 0, reloadTime: 0.25, maxVel: 200 });

    this.reload = this.reloadTime;
    this.x = Game.width - 10 - this.w;
    this.y = Game.height/2 - 100/2 - this.h/2;

    this.step = function(dt) {
      this.y= this.board.objects[3].y - this.h;
	    this.reload-=dt;
    }
}

Pala3PlayerB.prototype = new Sprite();
Pala3PlayerB.prototype.type = OBJETO_PALA2;

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


////////////////////////////////////////////////////////////////////////////////////////////////////////////// PELOTAS


//////////////// PELOTA NORMAL
var Pelota = function(){
    this.setup('pelota', {vx:110, vy:100,frame: 0, reloadTime: 0.25, maxVel: 500 });
    
    randx= Math.floor((Math.random()*this.vx)+(this.vx-10));
    randy= Math.floor((Math.random()*this.vy)+(this.vy-20));
    var rand = Math.random() < 0.5 ? -1 : 1;
    this.vx=randx *rand;
    rand = Math.random() < 0.5 ? -1 : 1;
    this.vy=randy* rand;
    this.reload = this.reloadTime;
    this.x = Game.width/2 - this.w/2;
    this.y = Game.height/2 - this.h/2;
    this.change = false;
}

Pelota.prototype = new Sprite();
Pelota.prototype.type = OBJETO_PELOTA;

    
Pelota.prototype.step = function(dt) {
    

    
    this.x += this.vx * dt;
    this.y += this.vy * dt;


    if(this.y < 0) { this.y = 0, this.vy = -this.vy; }
    else if(this.y > Game.height - this.h) { 
        this.y = Game.height - this.h
        this.vy = -this.vy;
        } 

    var collision = this.board.collide(this,OBJETO_PALA1);
    if(collision) {
        if (this.vx<0){this.x = collision.x+collision.w}
        else{this.x=collision.x-this.w};
        this.vx = -this.vx;
        if (this.vx<= this.maxVel){this.vx=this.vx*1.05};
    }
    
    collision = this.board.collide(this,OBJETO_PALA2);
    if(collision) {
        if (this.vx<0){this.x = collision.x+collision.w}
        else{this.x=collision.x-this.w};
        this.vy = -this.vy;
        this.vx = -this.vx;
        if (this.vx<= this.maxVel){this.vx=this.vx*1.05};
    }
    
    collision = this.board.collide(this,OBJETO_PALAUX);
    if(collision) {
        if (this.vx<0){this.x = collision.x+collision.w}
        else{this.x=collision.x-this.w};
        this.vy = this.vy;
        this.vx = -this.vx;
        if (this.vx<= this.maxVel){this.vx=this.vx*1.05};
    }
    
    collision = this.board.collide(this,OBJETO_GOKU);
    if(collision) {
        if (this.vx<0){this.x = collision.x+collision.w}
        else{this.x=collision.x-this.w};
        this.vy = -this.vy;
        this.vx = -this.vx;
        if (this.vx<= this.maxVel){this.vx=this.vx*1.05};
    }
    
    
    collision = this.board.collide(this,OBJETO_CAJAMAGICA);
    if(collision) {
       this.change = true;
    }
    if (!collision && this.change){ 
        this.vy = -this.vy;
        this.vx = this.vx;
        this.change = false;
    }
    
    
    
    if(this.x < 0 - this.w) {
       this.board.remove(this);
       Game.points1++;
       this.board.add(new Pelota());
       
    }
	  else if(this.x > Game.width) {  
	     this.board.remove(this);
	     Game.points2++;
	     
	     this.board.add(new Pelota());   
	  }

}
     
///////////// PELOTA NEGRA
var Pelota_Negra = function(){
    this.setup('pNegra', {vx:80, vy:80,frame: 0, reloadTime: 0.25, maxVel: 500 });
    
    randx= Math.floor((Math.random()*this.vx)+(this.vx-10));
    randy= Math.floor((Math.random()*this.vy)+(this.vy-20));
    var rand = Math.random() < 0.5 ? -1 : 1;
    this.vx=randx *rand;
    rand = Math.random() < 0.5 ? -1 : 1;
    this.vy=randy* rand;
    this.reload = this.reloadTime;
    this.x = Game.width/2 - this.w/2;
    this.y = Game.height/2 - this.h/2;
}

Pelota_Negra.prototype = new Sprite();
Pelota_Negra.prototype.type = OBJETO_PELOTA_NEGRA;

    
Pelota_Negra.prototype.step = function(dt) {
    

    
    this.x += this.vx * dt;
    this.y += this.vy * dt;


    if(this.y < 0) { this.y = 0, this.vy = -this.vy; }
    else if(this.y > Game.height - this.h) { 
        this.y = Game.height - this.h
        this.vy = -this.vy;
        } 

    var collision = this.board.collide(this,OBJETO_PALA1);
    if(collision) {
        if (this.vx<0){this.x = collision.x+collision.w}
        else{this.x=collision.x-this.w};
        this.vx = -this.vx;
        if (this.vx<= this.maxVel){this.vx=this.vx*1.05};
    }
    
    collision = this.board.collide(this,OBJETO_PALA2);
    if(collision) {
        if (this.vx<0){this.x = collision.x+collision.w}
        else{this.x=collision.x-this.w};
        this.vy = -this.vy;
        this.vx = -this.vx;
        if (this.vx<= this.maxVel){this.vx=this.vx*1.05};
    }
    
    collision = this.board.collide(this,OBJETO_PALAUX);
    if(collision) {
        if (this.vx<0){this.x = collision.x+collision.w}
        else{this.x=collision.x-this.w};
        this.vy = this.vy;
        this.vx = -this.vx;
        if (this.vx<= this.maxVel){this.vx=this.vx*1.05};
    }
    
    collision = this.board.collide(this,OBJETO_GOKU);
    if(collision) {
        if (this.vx<0){this.x = collision.x+collision.w}
        else{this.x=collision.x-this.w};
        this.vy = -this.vy;
        this.vx = -this.vx;
        if (this.vx<= this.maxVel){this.vx=this.vx*1.05};
    }
    
    if(this.x < 0 - this.w) {
       this.board.remove(this);
       Game.points1= Game.points1 + 10;       
    }
	  else if(this.x > Game.width) {  
	     this.board.remove(this);
	     Game.points2= Game.points2 + 10; 
	      
	  }

}

//////////////// PELOTA AZUL

var Pelota_Azul = function(){
    this.setup('pAzul', {vx:100, vy:100,frame: 0, reloadTime: 0.25, maxVel: 500 });
    
    randx= Math.floor((Math.random()*this.vx)+(this.vx-10));
    randy= Math.floor((Math.random()*this.vy)+(this.vy-20));
    var rand = Math.random() < 0.5 ? -1 : 1;
    this.vx=randx *rand;
    rand = Math.random() < 0.5 ? -1 : 1;
    this.vy=randy* rand;
    this.reload = this.reloadTime;
    this.x = Game.width/2 - this.w/2;
    this.y = Game.height/2 - this.h/2;
}

Pelota_Azul.prototype = new Sprite();
Pelota_Azul.prototype.type = OBJETO_PELOTA_AZUL;

    
Pelota_Azul.prototype.step = function(dt) {
    

    
    this.x += this.vx * dt;
    this.y += this.vy * dt;


    if(this.y < 0) { this.y = 0, this.vy = -this.vy; }
    else if(this.y > Game.height - this.h) { 
        this.y = Game.height - this.h
        this.vy = -this.vy;
        } 

    var collision = this.board.collide(this,OBJETO_PALA1);
    if(collision) {
       if (this.x < Game.width/2){
			Game.points1= Game.points1 - 10;
			this.board.add(new Corazon(this.x, this.y));
        }else {Game.points2= Game.points2 - 10;};
			this.board.add(new Corazon(this.x, this.y));
        this.board.remove(this);
    }
    
    collision = this.board.collide(this,OBJETO_PALA2);
    if(collision) {
       if (this.x < Game.width/2){
			Game.points1= Game.points1 - 10;
			this.board.add(new Corazon(this.x, this.y));
        }else {Game.points2= Game.points2 - 10;};
			this.board.add(new Corazon(this.x, this.y));
        this.board.remove(this);
    }
    
    collision = this.board.collide(this,OBJETO_PALAUX);
    if(collision) {
        if (this.vx<0){this.x = collision.x+collision.w}
        else{this.x=collision.x-this.w};
        this.vy = this.vy;
        this.vx = -this.vx;
        if (this.vx<= this.maxVel){this.vx=this.vx*1.05};
    }
    
    collision = this.board.collide(this,OBJETO_GOKU);
    if(collision) {
        if (this.vx<0){this.x = collision.x+collision.w}
        else{this.x=collision.x-this.w};
        this.vy = -this.vy;
        this.vx = -this.vx;
        if (this.vx<= this.maxVel){this.vx=this.vx*1.05};
    }
    
    if(this.x < 0 - this.w) {
       this.board.remove(this);      
    }
	  else if(this.x > Game.width) {  
	     this.board.remove(this);
	      
	  }

}     
 
////////////// DRAGON BALL


var Pelota_DB = function(){
    this.setup('pDB', {vx:90, vy:90,frame: 0, reloadTime: 0.25, maxVel: 500 });
    
    randx= Math.floor((Math.random()*this.vx)+(this.vx-10));
    randy= Math.floor((Math.random()*this.vy)+(this.vy-20));
    var rand = Math.random() < 0.5 ? -1 : 1;
    this.vx=randx *rand;
    rand = Math.random() < 0.5 ? -1 : 1;
    this.vy=randy* rand;
    this.reload = this.reloadTime;
    this.x = Game.width/2 - this.w/2;
    this.y = Game.height/2 - this.h/2;
}

Pelota_DB.prototype = new Sprite();
Pelota_DB.prototype.type = OBJETO_PELOTA_DB;

    
Pelota_DB.prototype.step = function(dt) {
    

    
    this.x += this.vx * dt;
    this.y += this.vy * dt;


    if(this.y < 0) { this.y = 0, this.vy = -this.vy; }
    else if(this.y > Game.height - this.h) { 
        this.y = Game.height - this.h
        this.vy = -this.vy;
        } 

    var collision = this.board.collide(this,OBJETO_PALA1);
    if(collision) {
       if (this.x < Game.width/2){
          this.board.add(new Goku(1));
        }else {this.board.add(new Goku(2))};
        this.board.remove(this);
    }
    
    collision = this.board.collide(this,OBJETO_PALA2);
    if(collision) {
       if (this.x < Game.width/2){
          this.board.add(new Goku(1));
        }else {this.board.add(new Goku(2))};
        this.board.remove(this);
    }
    
    collision = this.board.collide(this,OBJETO_PALAUX);
    if(collision) {
        if (this.vx<0){this.x = collision.x+collision.w}
        else{this.x=collision.x-this.w};
        this.vy = this.vy;
        this.vx = -this.vx;
        if (this.vx<= this.maxVel){this.vx=this.vx*1.05};
    }
    
    collision = this.board.collide(this,OBJETO_GOKU);
    if(collision) {
        if (this.vx<0){this.x = collision.x+collision.w}
        else{this.x=collision.x-this.w};
        this.vy = -this.vy;
        this.vx = -this.vx;
        if (this.vx<= this.maxVel){this.vx=this.vx*1.05};
    }
    
    if(this.x < 0 - this.w) {
       this.board.remove(this);      
    }
	  else if(this.x > Game.width) {  
	     this.board.remove(this);
	      
	  }

}

///////////////////// PELOTA POKEMON
var Pelota_Poke = function(){
    this.setup('pPokeball', {vx:80, vy:80,frame: 0, reloadTime: 0.25, maxVel: 500 });
    randx= Math.floor((Math.random()*this.vx)+(this.vx-10));
    randy= Math.floor((Math.random()*this.vy)+(this.vy-20));
    var rand = Math.random() < 0.5 ? -1 : 1;
    this.vx=randx *rand;
    rand = Math.random() < 0.5 ? -1 : 1;
    this.vy=randy* rand;
    this.reload = this.reloadTime;
    this.x = Game.width/2 - this.w/2;
    this.y = Game.height/2 - this.h/2;
    this.borrar=0;
}

Pelota_Poke.prototype = new Sprite();
Pelota_Poke.prototype.type = OBJETO_PELOTA_POKE;

    
Pelota_Poke.prototype.step = function(dt) {
    

    
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    this.borrar++;
    if(this.borrar >= 600) {
      this.board.add(new Explosion(this.x, this.y));
      this.board.remove(this);
    }


    if(this.y < 0) { this.y = 0, this.vy = -this.vy; }
    else if(this.y > Game.height - this.h) { 
        this.y = Game.height - this.h
        this.vy = -this.vy;
        } 
    if(this.x < (0)) {
      this.x=0;
      this.vx=-this.vx;
      
      if (this.vx<= this.maxVel){this.vx=this.vx*1.05};       
    }
	  else if(this.x > Game.width - this.w) {  
      this.vx=-this.vx;
      this.x= Game.width - this.w
	    if (this.vx<= this.maxVel){this.vx=this.vx*1.05};  
	  }

    var coll = this.board.collide(this,OBJETO_PALA1);
    var coll2 = this.board.collide(this,OBJETO_PALA2);
    if(coll || coll2) {

        var oy= Math.floor((Math.random()*(Game.height - 82 ))+(10));
        

        if (coll.sprite == "pala1A" || coll2.sprite =="pala2A" || coll2.sprite=="pala3A"){

          this.board.add(new Snorlax(0,oy));
          this.board.add(new Cetas(37,oy - 20));
        }
        else if(coll.sprite == "pala1B" || coll2.sprite =="pala2B"|| coll2.sprite=="pala3B"){
           this.board.add(new Snorlax(Game.width - 101,oy));
           this.board.add(new Cetas(Game.width - 101+37,oy - 20));
        }
        this.board.remove(this);
      
    }
    
    collision = this.board.collide(this,OBJETO_PALAUX);
    if(collision) {
        if (this.vx<0){this.x = collision.x+collision.w}
        else{this.x=collision.x-this.w};
        this.vy = this.vy;
        this.vx = -this.vx;
        if (this.vx<= this.maxVel){this.vx=this.vx*1.05};
    }
    
    collision = this.board.collide(this,OBJETO_GOKU);
    if(collision) {
        if (this.vx<0){this.x = collision.x+collision.w}
        else{this.x=collision.x-this.w};
        this.vy = -this.vy;
        this.vx = -this.vx;
        if (this.vx<= this.maxVel){this.vx=this.vx*1.05};
    }
}


//////////////////////////PELOTA FLOR
var Pelota_Flor = function(){
    this.setup('pflor', {vx:80, vy:80,frame: 0, reloadTime: 0.25, maxVel: 500 });
    
    randx= Math.floor((Math.random()*this.vx)+(this.vx-10));
    randy= Math.floor((Math.random()*this.vy)+(this.vy-20));
    var rand = Math.random() < 0.5 ? -1 : 1;
    this.vx=randx *rand;
    rand = Math.random() < 0.5 ? -1 : 1;
    this.vy=randy* rand;
    this.reload = this.reloadTime;
    this.x = Game.width/2 - this.w/2;
    this.y = Game.height/2 - this.h/2;
    this.borrar=0;
}

Pelota_Flor.prototype = new Sprite();
Pelota_Flor.prototype.type = OBJETO_PELOTA_FLOR;

    
Pelota_Flor.prototype.step = function(dt) {
    

    
    this.x += this.vx * dt;
    this.y += this.vy * dt;


    this.borrar++;
    if(this.borrar >= 700) {
      this.board.add(new Explosion(this.x, this.y));
      this.board.remove(this);
    }

    if(this.y < 0) { this.y = 0, this.vy = -this.vy; }
    else if(this.y > Game.height - this.h) { 
        this.y = Game.height - this.h
        this.vy = -this.vy;
        } 
    if(this.x < (0)) {
      this.x=0;
      this.vx=-this.vx;
      
      if (this.vx<= this.maxVel){this.vx=this.vx*1.08};       
    }
	  else if(this.x > Game.width - this.w) {  
      this.vx=-this.vx;
      this.x= Game.width - this.w
	    if (this.vx<= this.maxVel){this.vx=this.vx*1.08};  
	  }

    var coll = this.board.collide(this,OBJETO_PALA1);
    var coll2 = this.board.collide(this,OBJETO_PALA2);
    if(coll || coll2) {
        var tablero = this.board;
        if (coll.sprite == "pala1A" || coll2.sprite =="pala2A" || coll2.sprite=="pala3A"){
          this.board.objects[0].maxVel=-this.board.objects[0].maxVel;
          setTimeout(function(){tablero.objects[0].maxVel=-tablero.objects[0].maxVel;},7000);
        }
        else if(coll.sprite == "pala1B" || coll2.sprite =="pala2B"|| coll2.sprite=="pala3B"){
          this.board.objects[3].maxVel=-this.board.objects[3].maxVel;
          setTimeout(function(){tablero.objects[3].maxVel=-tablero.objects[3].maxVel;},7000);
        };
        this.board.remove(this);
        
      }   
    
    collision = this.board.collide(this,OBJETO_PALAUX);
    if(collision) {
        if (this.vx<0){this.x = collision.x+collision.w}
        else{this.x=collision.x-this.w};
        this.vy = this.vy;
        this.vx = -this.vx;
        if (this.vx<= this.maxVel){this.vx=this.vx*1.05};
    }
    
    collision = this.board.collide(this,OBJETO_GOKU);
    if(collision) {
        if (this.vx<0){this.x = collision.x+collision.w}
        else{this.x=collision.x-this.w};
        this.vy = -this.vy;
        this.vx = -this.vx;
        if (this.vx<= this.maxVel){this.vx=this.vx*1.08};
    }

}
////////////////////////////////////////////////////////////////////////////////////////// COMPLEMENTOS
var Goku = function(player,ox,oy){
    var cont=0;
    if(player==2){
      this.setup('Goku2', {vy:100,frame: 0, reloadTime: 0.25, maxVel: 300 });
      this.y = Game.height/2 - this.h/2;
      this.x = Game.width - 54 - this.w ;
    }else if (player==1){
      this.setup('Goku1', {vy:100,frame: 0, reloadTime: 0.25, maxVel: 300 });
      this.y = Game.height/2 - this.h/2;
      this.x = this.w;
    }
    else{
      this.setup('Goku2', {vy:100,frame: 0, reloadTime: 0.25, maxVel: 300 });
      this.x=ox - this.w/2;
      this.y=oy - this.h/2
      }
    this.reload = this.reloadTime;
    

    this.step = function(dt) {

	this.y += this.vy * dt;

	if(this.y < 0) { 
	  this.y = 0; 
	  cont++;
	  this.vy= -this.vy
	}
	else if(this.y > Game.height - this.h) { 
	    this.y = Game.height - this.h;
	    this.vy= -this.vy;
	}
  if (cont>5 && player!=0){
    this.board.remove(this);
  }
	this.reload-=dt;
  
    }

}
// Heredamos del prototipo new Sprite()
Goku.prototype = new Sprite();
Goku.prototype.type = OBJETO_GOKU;



var Corazon = function(ox, oy, ov){
    
    this.setup('corazon', {vy:60, frame: 0, reloadTime: 0.25});

    this.reload = this.reloadTime;
    this.y = oy;
  	this.x = ox;
  	if (ov==undefined) ov=1;

    this.step = function(dt) {

	  this.y -= this.vy * dt*ov;

	  if(this.y < 0) { 
	    this.board.remove(this);
	}
	this.reload-=dt;

    }
  
}
Corazon.prototype = new Sprite();


var Snorlax = function(ox,oy){
    this.setup('snorlax', {frame: 0, reloadTime: 0.25});
    
    this.reload = this.reloadTime;
    this.x=ox;
    this.y=oy;
  	  	
  	this.borrar=0;
    this.step = function(dt) {
    
    
    //Restricciones de movimiento de las palas al chocar con snorlax
    if (this.x==0 && this.board.objects[0].y > this.y-100 && this.board.objects[0].y < this.y+this.h/2){

        this.board.objects[0].y= this.y-100;
        this.board.objects[1].y= this.y-32;
        this.board.objects[2].y= this.y-132;
    }
    if (this.x==0 && this.board.objects[0].y < this.y +this.h +32 && this.board.objects[0].y > this.y+this.h/2){
        this.board.objects[0].y= this.y+this.h+32;
        this.board.objects[1].y= this.y+this.h+100;
        this.board.objects[2].y= this.y+this.h;
    }
    
    if (this.x==Game.width-this.w && this.board.objects[3].y > this.y-100 && this.board.objects[3].y < this.y+this.h/2){

        this.board.objects[3].y= this.y-100;
        this.board.objects[4].y= this.y-32;
        this.board.objects[5].y= this.y-132;
    }
    if (this.x==Game.width-this.w && this.board.objects[3].y < this.y +this.h +32 && this.board.objects[3].y > this.y+this.h/2){
        this.board.objects[3].y= this.y+this.h+32;
        this.board.objects[4].y= this.y+this.h+100;
        this.board.objects[5].y= this.y+this.h;
    }
    

    this.borrar++;
    if(this.borrar >= 300) {
      this.board.remove(this);
    }
	
	    this.reload-=dt;

    }

}
// Heredamos del prototipo new Sprite()
Snorlax.prototype = new Sprite();
Snorlax.prototype.type = OBJETO_SNORLAX;

var Cetas = function(ox,oy){
    this.setup('cetas', {frame:0, reloadTime:0.25});
    this.y=oy;
    this.x=ox;
    this.subFrame = 0;
    this.step = function(dt) {
    this.frame = Math.floor(this.subFrame++ /75);
      if(this.subFrame >= 300) {
      this.board.remove(this);
    }

    }
}
Cetas.prototype = new Sprite();

var Explosion = function(centerX,centerY) {
    this.setup('explosion', { frame: 0 });
          
    this.x = centerX - this.w/2;
    this.y = centerY - this.h/2;

    this.subFrame = 0;
}

Explosion.prototype = new Sprite();

Explosion.prototype.step = function(dt) {
    this.frame = Math.floor(this.subFrame++ / 3);
    if(this.subFrame >= 36) {
	this.board.remove(this);
    }
}



$(function() {
    Game.initialize("game",sprites,playMenu);
});


