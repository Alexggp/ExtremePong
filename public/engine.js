/*
    Alex Extreme Pong
    Copyright (C) 2013  Alejandro García-Gasco Pérez
*/

var Game = new function() { 
    
    
    this.segundos=60;
    this.duracion= this.segundos*1000;
    this.dificultad=1;   
    this.jugadores=1;   
    this.vidas=3;                                                        

    // Inicializa el juego
  this.initialize = function(canvasElementId,sprite_data,callback) {
	      this.canvas = document.getElementById(canvasElementId);
	      
	      
        this.width = this.canvas.width;
        this.height= this.canvas.height;

	      this.ctx = this.canvas.getContext && this.canvas.getContext('2d');
	      if(!this.ctx) { return alert("Please upgrade your browser to play"); }




	    	// Propiedades para pantallas táctiles
	      this.canvasMultiplier =1;
	      this.playerOffset = 10;
        this.setupMobile();
	      this.setupInput();

	      // Añadimos como un nuevo tablero al juego el panel con los
	      // botones para pantalla táctil
	      if(this.mobile) {
	          alert("Desliza el dedo por la parte superior de la pantalla para activar la pantalla completa");
	          this.setBoard(6,new TouchControlsMenu());
	      }
	      
	              //canvas a tamaño de ventana

	      else{
	        alert("Haz doble click en la pantalla para activar la pantalla completa");
	        this.canvasMultiplier = window.innerHeight/this.canvas.height;
	        this.canvas.width  *= this.canvasMultiplier;
          this.canvas.height *= this.canvasMultiplier;
	        
	        this.width = this.canvas.width;
	        this.height= this.canvas.height;
        }
	      
	      this.fullscreen= function(){
           var el = document.getElementById(canvasElementId);
 
           if(el.webkitRequestFullScreen) {
               el.webkitRequestFullScreen();
           }
          else {
             el.mozRequestFullScreen();
          }            
        }
	      this.canvas.addEventListener("dblclick",Game.fullscreen);

	      

	    this.loop(); 
	    

      Music.cargar();
      
	    SpriteSheet.load(sprite_data,callback);
   };

    // Gestión de la entrada (teclas para izda/derecha y disparo)
    var KEY_CODES = { 38:'up2', 40:'down2', 87:'up1', 83:'down1', 32 :'fire', 39:'dcha', 37:'izda',81:'esc',77:'mute' };  
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
    this.boards = [];

    this.loop = function() { 
	    // segundos transcurridos
	    var dt = 1/10;

	    // Para cada board, de 0 en adelante, se 
	    // llama a su método step() y luego a draw()
	    for(var i=0,len = Game.boards.length;i<len;i++) {
	        if(Game.boards[i]) { 
		    Game.boards[i].step(dt);
		    Game.boards[i].draw(Game.ctx);
	        }
	    }

	    setTimeout(Game.loop,30);
    };
    
   this.setBoard = function(num,board) { this.boards[num] = board; };
   
   
   this.setupMobile = function() {
 	      var container = document.getElementById("container"),
            // Comprobar si el browser soporta eventos táctiles
            hasTouch =  !!('ontouchstart' in window),
      // Ancho y alto de la ventana del browser
            w = window.innerWidth, h = window.innerHeight;

	      if(hasTouch) { this.mobile = true; }

	      // Salir si la pantalla es mayor que cierto tamaño máximo o si no
	      // tiene soporte para eventos táctiles
	      if(screen.width >= 1280 || !hasTouch) { return false; }
	      
	      
        
          	      //  Poner el canvas en una posición absoluta en la esquina
	        //  superior izquierda de la ventana
        
        if (w<h){
        
          this.canvas.style.position='absolute';
          this.canvas.style.left="0px";
          this.canvas.style.top="0px";
          this.canvasMultiplier=w/this.canvas.width;
          
          this.canvas.width=this.width*this.canvasMultiplier;
          this.width=this.canvas.width;
        
          this.canvas.height=this.height*this.canvasMultiplier;
          this.height=this.canvas.height;
          
          
        }
        else{
          this.canvasMultiplier=w/this.canvas.width;
          this.canvas.height=h*1.2;
          this.canvas.width=w;
          Game.width=this.canvas.width;
          Game.height=this.canvas.height;
        }


    };
   
   
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
                        s.w*Game.canvasMultiplier, s.h*Game.canvasMultiplier);
    };
}

var MenuScreen = function MenuScreen(callback) {
    var up = false;
    
    var updcha= false;
    var upizda= false;
    
    var n_jugadores= "ARCADE";
	  
    this.step = function(dt) {
        if(!Game.keys['fire']) up = true;
        if(!Game.keys['dcha']) updcha = true;
        if(!Game.keys['izda']) upizda = true;
        
        if(up && Game.keys['fire'] && callback) callback();
        
        if (updcha && Game.keys['dcha']){
            
            if (Game.jugadores==1){Game.jugadores=2}
            else{Game.jugadores=1}
            updcha=false;
            if(Music.extension){Music.pelota.pop3.Miplay()}
        }
        if (upizda && Game.keys['izda']){
            if (Game.jugadores==1){Game.jugadores=2}
            else{Game.jugadores=1}
            upizda=false;
            if(Music.extension){Music.pelota.pop3.Miplay()}
        }
        
        if (Game.jugadores ==1){n_jugadores= "ARCADE"}
        else{n_jugadores= "VS"}
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
      var Max=6;
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
        if (up && Game.keys['esc']){
                if(Music.extension){Music.menu.chmod.Miplay()}
                playMenu();
            
        };
        
        
        if (upup && Game.keys['up2'] && Game.dificultad<Max){
            Game.dificultad++;
            upup= false;
            if(Music.extension){Music.pelota.pop3.Miplay()}
        }
        if (updown && Game.keys['down2'] && Game.dificultad>Min){
            Game.dificultad--;
            updown=false;
            if(Music.extension){Music.pelota.pop3.Miplay()}
        }
        if (updcha && Game.keys['dcha'] && Game.segundos<120 && Game.jugadores==2){
            Game.segundos+=30;
            Game.duracion= Game.segundos*1000;
            updcha= false;
            if(Music.extension){Music.pelota.pop3.Miplay()}
        }
        if (upizda && Game.keys['izda'] && Game.segundos>30 && Game.jugadores==2){
            Game.segundos-=30;
            Game.duracion= Game.segundos*1000;
            upizda=false;
            if(Music.extension){Music.pelota.pop3.Miplay()}
        }
    };
    
    

    this.draw = function(ctx) {
        ctx.fillStyle = "#FFFFFF";
        
        
        ctx.font = "20px";
        ctx.fillText("Q para volver al men\u00Fa",80,20);
        
        
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

var Reloj = function(reg,segundos) {     //si reg = true cuenta regresiva
  
  
  var cuenta= function(){
    if (reg){
      seg--;
      if (seg>0) {setTimeout(function(){cuenta()},1000)};
    }
    else{  
      if (Game.points1!=3 && Game.points2!=3){
        setTimeout(function(){cuenta()},1000);
        seg=Game.duracion++;
        
      }    
    }
  }
    var seg;
  if (reg){seg = (Game.duracion/1000)-1;
  setTimeout(function(){cuenta()},1000);
  }
  else{Game.duracion=segundos; seg=Game.duracion;cuenta()}
  

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

 
	  capaCtx.fillStyle = "#101010";
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

var MuteScreen = function(){
    var up = false;
    var mute= false;
    var extension;	  
    this.step = function(dt) {
        if(!Game.keys['mute']) up = true;
        
       
        if (up && Game.keys['mute']){
            
            if (!mute){
              if(!Music.niveles.background.paused && Music.extension){
                   Music.niveles.background.pause();                  
              };
              if(!Music.menu.background.paused && Music.extension){
                   Music.menu.background.pause();                  
              };
              extension= Music.extension;
              Music.extension=undefined;
              mute=true;
            }
            else{
              Music.extension=extension;
              if (Game.points1==undefined && Music.extension){Music.menu.background.play()} 
              else{Music.niveles.background.play()} 
              mute=false;
            }
         up=false;
           
        }
       
    };
    
    

    this.draw = function(ctx) {
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "center";

        ctx.font = "10px";
        ctx.fillText("M : mute",50,Game.height-20);

      
    };
};
	      
var Music = {
        loaded:true,
        loadedCount:0, // Assets that have been loaded so far
        totalCount:0, // Total number of assets that need to be loaded
        
        init:function(){
                // check for sound support
                var mp3Support,oggSupport;
                var audio = document.createElement('audio');
                if (audio.canPlayType) {
                         // Currently canPlayType() returns: "", "maybe" or "probably"
                         mp3Support = "" != audio.canPlayType('audio/mpeg');
                         oggSupport = "" != audio.canPlayType('audio/ogg; codecs="vorbis"');
                } else {
                        //The audio tag is not supported
                        mp3Support = false;
                        oggSupport = false;        
                }
                // Check for ogg, then mp3, and finally set extension to undefined
                Music.extension = oggSupport ? "ogg" : mp3Support ? "mp3" : undefined;                
        },
        loadSound:function(url){
                this.totalCount++;
                this.loaded = false;
                var audio = new Audio();
                audio.src = 'audio/'+Music.extension+'/'+url+'.'+Music.extension;
                audio.Miplay=function(){
                      this.load();    // Todo esto para que no se solapen los plays y suene siempre
                      this.play();
                      
                      }
                return audio;
        },
        cargar:function(){
            
            this.init();
            
            

            
            
            this.niveles = {
                    pitido:this.loadSound("pitido_inicial"),
                    subir:this.loadSound("subir_nivel"),
                    bajar:this.loadSound("bajar_nivel"),
                    over:this.loadSound("game_over"),
                    winner:this.loadSound("winner"),
                    rewind:this.loadSound("cartoon_up"),
                    aplauso:this.loadSound("aplauso"),
                    background:this.loadSound("get_your_groove_on")
            },
            this.pelota = {
                    pop1:this.loadSound("pop"),
                    pop2:this.loadSound("pop2"),
                    pop3:this.loadSound("pop_palas"),
                    pop4:this.loadSound("pop_tenis"), 
                    pop5:this.loadSound("pop_tenis_2")     
            },
            this.goku = {
                    salir:this.loadSound("kung_fu"),
                    desvio:this.loadSound("woosh")
            },
            this.cajaMagica=this.loadSound("caja_magica");
            this.snorlax=this.loadSound("snorlax");
            this.grito=this.loadSound("lady_scream");
            this.vida=this.loadSound("vida");
            this.explosion=this.loadSound("explosion");
            this.menu={
                    chmod:this.loadSound("opciones_menu"),
                    background:this.loadSound("emotional_orchestra")                 
            };
            
            
            this.menu.background.loop=true;
            this.niveles.background.loop=true;
                        
        }
        
}




var TouchControlsMenu = function() {

    
    
    var unitWidth = Game.width/10;
    
    // Separación entre columnas
    var gutterWidth = 10;

    // Ancho de cada columna
    var blockWidth = unitWidth-gutterWidth;

    // Dibuja un rectángulo con un carácter dentro. Usado para representar
    // los botones. 
    // Los botones de las flechas izquierda y derecha usan los
    // caracteres Unicode UTF-8 \u25C0 y \u25B6 respectivamente, que
    // corresponden a sendos triángulos
    this.drawSquare = function(ctx,x,y,txt,on) {
	    // Usamos un nivel de opacidad del fondo (globalAlpha)
	    // diferente para que cambie la apariencia del botón en
	    // función de si está presionado (opaco) o no (más
	    // transparente)
	    //ctx.globalAlpha = on ? 0.9 : 0.6;
        ctx.globalAlpha = 0;
	      //ctx.fillStyle =  "#CCC";
	      ctx.fillRect(x,y,blockWidth,blockWidth);

	      ctx.fillStyle = "#FFF";
	      ctx.textAlign = "center";
	      ctx.globalAlpha = 1.0;
	      var tFuente = on ? (3*unitWidth/4)+4 : (3*unitWidth/4);
	      ctx.font = "bold "+ tFuente + "px arial";
	      


	    ctx.fillText(txt, 
                         x+blockWidth/2,
                         y+3*blockWidth/4+5);
    };



    this.draw = function(ctx) {
	      // Guarda las propiedades del contexto actual para evitar que
	      // los siguientes cambios que se hacen a la opacidad del fondo
	      // y al font dentro de drawSquare() afecten a otras llamadas
	      // del canvas
	      ctx.save();

	      var yLoc = Game.height - unitWidth;
	      this.drawSquare(ctx,unitWidth,yLoc,"\u2718", Game.keys['esc']);
	      this.drawSquare(ctx,3*unitWidth,yLoc,"\u25C0", Game.keys['izda']);
	      this.drawSquare(ctx,4*unitWidth,yLoc,"\u25B2", Game.keys['up2']);
	      this.drawSquare(ctx,5*unitWidth,yLoc,"\u25Bc", Game.keys['down2']);
	      this.drawSquare(ctx,6*unitWidth,yLoc,"\u25B6", Game.keys['dcha']);
	      this.drawSquare(ctx,8*unitWidth,yLoc,"\u2714",Game.keys['fire']);

	      // Recupera el estado salvado al principio del método
	      ctx.restore();
    };

    this.step = function(dt) { };

    // Manejador para eventos de la pantalla táctil
    this.trackTouch = function(e) {
	      var touch, x, y;
	
	      // Elimina comportamiento por defecto para este evento, como
	      // scrolling, clicking, zooming, etc.
	      e.preventDefault();
	      

	      if (e.type == 'touchmove'){
	       for(var i=0;i<e.targetTouches.length;i++) {
	          touch = e.targetTouches[i];

	          y = touch.pageY / Game.canvasMultiplier;
	          
	          if (y < Game.height/9){Game.fullscreen()}
	      
	        }
	      }

	      // Detección de eventos sobre franja de la derecha: disparo
	      if(e.type == 'touchstart' || e.type == 'touchend') {
	          for(i=0;i<e.changedTouches.length;i++) {
		          // Sólo consideramos dedos que han intervenido en el
		          // evento actual (touchstart o touchend), por lo que 
                          // miramos en changedTouches
		          touch = e.changedTouches[i];

		          // Al fijarnos sólo en las coordenadas X hacemos que toda
		          // la franja vertical de cada botón sea activa.
		          x = touch.pageX / Game.canvasMultiplier - Game.canvas.offsetLeft;
		          y = touch.pageY / Game.canvasMultiplier;
		          
		          if(x > unitWidth && x < 2 * unitWidth && y > (Game.height-unitWidth)) {
		              Game.keys['esc'] = (e.type == 'touchstart');
		          }
		          else if(x > 3 * unitWidth && x < 4 * unitWidth && y > (Game.height- unitWidth) ) {
		              Game.keys['izda'] = (e.type == 'touchstart'); 
		          }
		          else if(x > 4 * unitWidth && x < 5 * unitWidth && y > (Game.height- unitWidth)) {
		              Game.keys['up2'] = (e.type == 'touchstart'); 
		          }
		          else if(x > 5 * unitWidth && x < 6 * unitWidth && y > (Game.height- unitWidth)) {
		              Game.keys['down2'] = (e.type == 'touchstart'); 
		          }
		          else if(x > 6 * unitWidth && x < 7 * unitWidth && y > (Game.height- unitWidth)) {
		              Game.keys['dcha'] = (e.type == 'touchstart'); 
		          }
		          else if(x > 8 * unitWidth && x < 9 * unitWidth && y > (Game.height- unitWidth)) {
		              Game.keys['fire'] = (e.type == 'touchstart'); 
		          }
	         }
	      }
    };

    // Registra los manejadores para los eventos táctiles asociados al
    // elemento Game.canvas del DOM
    Game.canvas.addEventListener('touchstart',this.trackTouch,true);
    Game.canvas.addEventListener('touchmove',this.trackTouch,true);
    Game.canvas.addEventListener('touchend',this.trackTouch,true);

};


var TouchControlsGame = function() {

    

    var unitWidth = Game.width/3;
    var unitHeight = Game.height/2;




    this.step = function(dt) { };
    this.draw = function(ctx){};

    // Manejador para eventos de la pantalla táctil
    this.trackTouch = function(e) {
	      var touch, x,y;
	
	      // Elimina comportamiento por defecto para este evento, como
	      // scrolling, clicking, zooming, etc.
	      e.preventDefault();

	      
	      Game.keys['up1'] = false;
	      Game.keys['down1'] = false;
	      Game.keys['up2'] = false;
	      Game.keys['down2'] = false;

	      for(var i=0;i<e.targetTouches.length;i++) {
	          touch = e.targetTouches[i];

	          
	          x = touch.pageX / Game.canvasMultiplier - Game.canvas.offsetLeft;
	          y = touch.pageY / Game.canvasMultiplier;
	          
	          if(x < unitWidth && y < unitHeight) {
		           Game.keys['up1'] = true;
	          } 
	          
	          if(x < unitWidth && y > unitHeight) {
		           Game.keys['down1'] = true;
	          }
	          if(x > 2 *unitWidth && y < unitHeight) {
		           Game.keys['up2'] = true;
	          } 
	          if(x > 2 *unitWidth && y > unitHeight) {
		           Game.keys['down2'] = true;
	          } 
	      }
	      
    };

    // Registra los manejadores para los eventos táctiles asociados al
    // elemento Game.canvas del DOM
    Game.canvas.addEventListener('touchstart',this.trackTouch,true);
    Game.canvas.addEventListener('touchmove',this.trackTouch,true);
    Game.canvas.addEventListener('touchend',this.trackTouch,true);

};


 


