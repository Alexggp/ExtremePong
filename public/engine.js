
var Game = new function() { 
    
    this.segundos=60;
    this.duracion= this.segundos*1000;
    this.dificultad=1;   
    this.jugadores=1;                                                           

    // Inicializa el juego
    this.initialize = function(canvasElementId,sprite_data,callback) {
	this.canvas = document.getElementById(canvasElementId)
	this.width = this.canvas.width;
	this.height= this.canvas.height;

	this.ctx = this.canvas.getContext && this.canvas.getContext('2d');
	if(!this.ctx) { return alert("Please upgrade your browser to play"); }

	this.setupInput();

	this.loop(); 

	SpriteSheet.load(sprite_data,callback);
    };

    // Gestión de la entrada (teclas para izda/derecha y disparo)
    var KEY_CODES = { 38:'up2', 40:'down2', 87:'up1', 83:'down1', 32 :'fire', 39:'dcha', 37:'izda',27:'esc' };  
    this.keys = {};

    this.setupInput = function() {
	$(window).keydown(function(event){
	    if (KEY_CODES[event.which]) {
		Game.keys[KEY_CODES[event.which]] = true;
		return false;
	    }
	});
	
	$(window).keyup(function(event){
	    if (KEY_CODES[event.which]) {
		Game.keys[KEY_CODES[event.which]] = false;
		return false;
	    }
	});
	
    }


    // Bucle del juego
    var boards = [];

    this.loop = function() { 
	// segundos transcurridos
	var dt = 1/10;

	// Para cada board, de 0 en adelante, se 
	// llama a su método step() y luego a draw()
	for(var i=0,len = boards.length;i<len;i++) {
	    if(boards[i]) { 
		boards[i].step(dt);
		boards[i].draw(Game.ctx);
	    }
	}

	setTimeout(Game.loop,30);
    };
    
   this.setBoard = function(num,board) { boards[num] = board; };
};


var SpriteSheet = new function() {

    this.map = { }; 

    this.load = function(spriteData,callback) { 
    this.map = spriteData;
    this.image = new Image();
    this.image.onload = callback;
    this.image.src = 'images/sprites.png';
    };

    
    this.draw = function(ctx,sprite,x,y,frame) {
    var s = this.map[sprite];
    if(!frame) frame = 0;
    ctx.drawImage(this.image,
                        s.sx + frame * s.w, 
                        s.sy, 
                        s.w, s.h, 
                        Math.floor(x), Math.floor(y),
                        s.w, s.h);
    };
}

var MenuScreen = function MenuScreen(callback) {
    var up = false;
    
    var updcha= false;
    var upizda= false;
    
    var n_jugadores= "1 Jugador";
	  
    this.step = function(dt) {
        if(!Game.keys['fire']) up = true;
        if(!Game.keys['dcha']) updcha = true;
        if(!Game.keys['izda']) upizda = true;
        
        if(up && Game.keys['fire'] && callback) callback();
        
        if (updcha && Game.keys['dcha']){
            
        if (Game.jugadores==1){Game.jugadores=2}
        else{Game.jugadores=1}
        updcha=false;
        }
        if (upizda && Game.keys['izda']){
            if (Game.jugadores==1){Game.jugadores=2}
            else{Game.jugadores=1}
            upizda=false;
        }
        
        if (Game.jugadores ==1){n_jugadores= "1 Jugador"}
        else{n_jugadores= "2 Jugadores"}
    };
    
    

    this.draw = function(ctx) {
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "center";

        ctx.font = "90px bangers";
        ctx.fillText("Alex Extreme Pong",Game.width/2,Game.height/2);

        ctx.font = "20px bangers";
        ctx.fillText('< '+n_jugadores+' >',Game.width/2,Game.height/2 + 80);
    };
};

var TitleScreen = function TitleScreen(title,subtitle,callback) {
    var up = false;
    var updown = false;
    var upup = false;
    var updcha= false;
    var upizda= false;
    var upesc= false;
    
    
    if (Game.points1<Game.points2){
        var A = "GANADOR";
        var B = "PERDEDOR";
    }
    else if(Game.points1>Game.points2){
        var B = "GANADOR";
        var A = "PERDEDOR";
    }
    else if(Game.points1==Game.points2 && Game.points1!=undefined){
        var B = "EMPATE";
        var A = "EMPATE";
    }
    else{
        var A="";
        var B="";
    }
	  
	  if (Game.jugadores==2){
      var Max=5;
	    var Min=1;
    }else{
      var Max=1;
	    var Min=1;
    }
	  
	  
    this.step = function(dt) {
        if(!Game.keys['fire']) up = true;
        if(!Game.keys['down2']) updown = true;
        if(!Game.keys['up2']) upup = true;
        if(!Game.keys['dcha']) updcha = true;
        if(!Game.keys['izda']) upizda = true;
        if(!Game.keys['esc']) upizda = true;
        
        if (up && Game.keys['fire'] && callback) callback();
        if (up && Game.keys['esc']) playMenu();
        
        
        if (upup && Game.keys['up2'] && Game.dificultad<Max){
            Game.dificultad++;
            upup= false;
        }
        if (updown && Game.keys['down2'] && Game.dificultad>Min){
            Game.dificultad--;
            updown=false;
        }
        if (updcha && Game.keys['dcha'] && Game.segundos<120 && Game.jugadores==2){
            Game.segundos+=30;
            Game.duracion= Game.segundos*1000;
            updcha= false;
        }
        if (upizda && Game.keys['izda'] && Game.segundos>30 && Game.jugadores==2){
            Game.segundos-=30;
            Game.duracion= Game.segundos*1000;
            upizda=false;
        }
    };
    
    

    this.draw = function(ctx) {
        ctx.fillStyle = "#FFFFFF";
        
        
        ctx.font = "20px";
        ctx.fillText("Esc para volver al menu",80,20);
        
        
        ctx.textAlign = "center";

        ctx.font = "bold 40px bangers";
        ctx.fillText(title,Game.width/2,Game.height/2);

        ctx.font = "bold 20px bangers";
        ctx.fillText(subtitle,Game.width/2,Game.height/2 + 40);

        ctx.fillStyle = "#2E2E2E";
        ctx.textAlign = "center";

        ctx.font = "bold 30px bangers";
        ctx.fillText(A,Game.width/4,Game.height - Game.height/4);

        ctx.font = "bold 30px bangers";
        ctx.fillText(B,Game.width - Game.width/4,Game.height - Game.height/4);
        
        ctx.fillStyle = "Grey";
        ctx.textAlign = "center";
        
        
        ctx.fillText(Game.dificultad,Game.width/2,Game.height - Game.height/4);
        
        if (Game.jugadores==2){
          ctx.fillText(Game.segundos+"\'\'",Game.width/2,Game.height - Game.height/4 +80);
          ctx.font = "bold 15px bangers";
          ctx.fillText("dificultad:",Game.width/2,Game.height - Game.height/4 - 40);
          ctx.fillText("duracion:",Game.width/2,Game.height - Game.height/4 + 40);
        }else{
          ctx.font = "bold 15px bangers";
          ctx.fillText("Nivel:",Game.width/2,Game.height - Game.height/4 - 40);
        }
        
    };
};



var GameBoard = function() {
    var board = this;

    this.objects = [];


    this.add = function(obj) { 
	    obj.board=this; 
	    this.objects.push(obj); 
	    return obj; 
    };

    this.remove = function(obj) { 
	      this.removed.push(obj); 
    };

    // Inicializar la lista de objetos pendientes de ser borrados
    this.resetRemoved = function() { this.removed = []; }

    // Elimina de objects los objetos pendientes de ser borrados
    this.finalizeRemoved = function() {
	      for(var i=0, len=this.removed.length; i<len;i++) {  
	          var idx = this.objects.indexOf(this.removed[i]);
	          if(idx != -1) this.objects.splice(idx,1); 
	      }
    }


    
    this.iterate = function(funcName) {
	    var args = Array.prototype.slice.call(arguments,1);

	    for(var i=0, len=this.objects.length; i<len;i++) {
	        var obj = this.objects[i];
	        obj[funcName].apply(obj,args)
	    }

    };

    // Devuelve el primer objeto de objects para el que func es true
    this.detect = function(func) {
	      for(var i = 0,val=null, len=this.objects.length; i < len; i++) {
	          if(func.call(this.objects[i])) return this.objects[i];
	      }
	      return false;
    };

    this.step = function(dt) { 
	      this.resetRemoved();
	      this.iterate('step',dt);
	      this.finalizeRemoved();
    };

    this.draw= function(ctx) {
	      this.iterate('draw',ctx);
    };

    
    this.overlap = function(o1,o2) {
	  return !((o1.y+o1.h-1<o2.y) || (o1.y>o2.y+o2.h-1) ||
		 (o1.x+o1.w-1<o2.x) || (o1.x>o2.x+o2.w-1));
    };

    this.collide = function(obj,type) {
	      return this.detect(function() {
	          if(obj != this) {
		            var col = (!type || this.type & type) && board.overlap(obj,this)
		            return col ? this : false;
	          }
	      });
    };


};


// Constructor Sprite 
var Sprite = function() { }

Sprite.prototype.setup = function(sprite,props) {
    this.sprite = sprite;
    this.merge(props);
    this.frame = this.frame || 0;
    this.w =  SpriteSheet.map[sprite].w;
    this.h =  SpriteSheet.map[sprite].h;
}

Sprite.prototype.merge = function(props) {
    if(props) {
	      for (var prop in props) {
	          this[prop] = props[prop];
	      }
    }
}

Sprite.prototype.draw = function(ctx) {
    SpriteSheet.draw(ctx,this.sprite,this.x,this.y,this.frame);
}

Sprite.prototype.hit = function(damage) {
    this.board.remove(this);
}


var GamePoints = function(x) {
  Game.points1 = x;
  Game.points2 = x;


  this.draw = function(ctx) {
    ctx.save();
    ctx.font = "bold 30px arial";
    ctx.fillStyle= "#FFFFFF";

    var txt = Game.points1 + " | " + Game.points2;


    ctx.fillText(txt,Game.width/2,50 - 10);
    ctx.restore();

  };

  this.step = function(dt) { };
};

var Reloj = function(reg) {     //si reg = true cuenta regresiva
  var seg;
  if (reg){seg = (Game.duracion/1000)-1;}
  else{Game.duracion=1; seg=1;}
  

  
  var cuenta= function(){
    if (reg){
      seg--;
      if (seg>0) {setTimeout(function(){cuenta()},1000)};
    }
    else{
      setTimeout(function(){cuenta()},1000);
      if (Game.points1!=3 && Game.points2!=3){
        seg=Game.duracion++;
        
      }
    }
  }
  setTimeout(function(){cuenta()},1000);

  this.draw = function(ctx) {
    ctx.save();
    var oy= 90;
    if (seg <6 && reg){
        ctx.font = "bold 100px arial";
        ctx.fillStyle= "red";
        oy= 130;
    }else if (seg<11 && reg){  
        ctx.font = "bold 30px arial";
        ctx.fillStyle= "red";
    }else {
        ctx.font = "bold 30px arial";
        ctx.fillStyle= "#FFFFFF";
    }
    

    var txt =  seg + "\'\'" ;

    ctx.fillText(txt,Game.width/2,oy);
    ctx.restore();

  };

  this.step = function(dt) {};
};



var capaClear = function() {

    var capa = $('<canvas/>')
	.attr('width', Game.width)
	.attr('height', Game.height)[0];



    var capaCtx = capa.getContext("2d");

 
	capaCtx.fillStyle = "#000";
	capaCtx.fillRect(0,0,capa.width,capa.height);
    
    this.draw = function(ctx) {
		ctx.drawImage(capa,
			  0, 0,
			  capa.width, capa.height,
			  0, 0,
			  capa.width, capa.height);
    }

    this.step = function(dt) {}
}
