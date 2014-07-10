define(function (require, exports, module) {

  var FamousGallery = (function(){
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var Surface = require("famous/core/Surface");
    var StateModifier = require('famous/modifiers/StateModifier');
    var Easing           = require("famous/transitions/Easing");
  
    var mainContext = Engine.createContext();
    mainContext.setPerspective(1000);
  
    var calc = function(x){
      return window.innerWidth * x / 1300;
    }
  
    var Card = function(params){
      var self = this;
      this.getAngle     = (function(){ return params.angle })();
      this.getX         = (function(){ return params.x })();
      this.getY         = (function(){ return params.y })();
      this.getZ         = (function(){ return params.z })();
      this.getW         = (function(){ return params.w })();
      this.getH         = (function(){ return params.h })();
      this.getMouseover = (function(){ return params.mouseover })();
      this.getMouseout  = (function(){ return params.mouseout })();
  
      this.surface = new Surface({
        size: [this.getW, this.getW],
        properties:{
          backgroundColor: '#bbb',
          boxShadow: "0 0 50px rgba(0,0,0,0.5)",
          cursor: 'pointer',
          backgroundImage: "url('img/logo500.jpg')",
          backgroundSize: "cover"
        }
      });
  
      this.translate = new StateModifier({
        origin: [.5,.5],
        transform: Transform.translate(this.getX,this.getY,this.getZ)
      })
  
      this.rotate = new StateModifier({
        transform: Transform.rotateY(-this.getAngle)
      })
  
      this.wind = new StateModifier();
      this.windDirect = Math.random() > 0.5? -1: 1;
  
      (function wind(){
        self.windDirect = - self.windDirect;
        var duration = 1000 + Math.random() * 2000;
        self.wind.setTransform(Transform.rotateY(Math.random()*self.windDirect * Math.PI / 36), {duration: duration})
        setTimeout(function(){
          wind()
        } , duration + Math.random() * 5000);
      })();
  
      this.surface.on('mouseover', function(){self.getMouseover()});
      this.surface.on('mouseout', function(){self.getMouseout()});
      this.surface.on('touchmove', function(){self.getMouseover()});
      this.surface.on('touchend', function(){self.getMouseout()});
    }
  
    var GaleryCard = function (number){
      this.prototype = Object.create(Card);
  
      var level = Math.round(number / 2);
      var lr = (number   % 2) == 0?-1:1;
      var x, y = 0, z = -level * 70, angle, mouseover = function(){}, w = 400, h = 400;
      var mouseout = function(){
        var self = this;
        this.isMouseOver = false;
  
        setTimeout(function() {
          if (self.isMouseOver) return;
          self.rotate.setTransform(Transform.rotateY(-self.getAngle), { duration: 500, curve: Easing.inCubic });
          self.translate.setTransform(Transform.translate(self.getX, self.getY, self.getZ), { duration: 500, curve: Easing.inCubic })
        }, 500)
  
      }
      if (level == 0){
        x = 0; y = 0; z = 0; angle = 0;w = 500; h =500;
        mouseover = function() {
          var self = this;
          self.isMouseOver = true;
          setTimeout(function () {
            if (!self.isMouseOver) return;
  
            self.translate.setTransform(Transform.translate(self.getX, self.getY, self.getZ + 50), {duration: 500, curve: Easing.inCubic });
          }, 500);
        }
      }
      else{
        x = (lr * level * 100) + (lr * 70);
        angle = Math.PI/6* lr;
        mouseover = function(data){
          var self = this;
          self.isMouseOver = true;
          setTimeout(function() {
            if (!self.isMouseOver) return;
            var sign = self.getAngle < 0 ? -1 : 1;
            self.translate.setTransform(
              Transform.translate(self.getX + (sign * calc(150)), self.getY, self.getZ + calc(90)),
              {duration: 500, curve: Easing.inCubic }
            );
            self.rotate.setTransform(Transform.rotateY(-sign * Math.PI / 12), { duration: 500, curve: Easing.inCubic })
          }, 500);
        }
      }
  
      return new Card({
        x: calc(x),
        y: calc(y),
        z: calc(z),
        angle:angle,
        w: calc(w),
        h: calc(h),
        mouseover: mouseover,
        mouseout: mouseout
        });
    }

    var cards = [];

    var draw = function(cardsCount){
        for (var i = 0; i < cardsCount; i++)
            cards.push(new GaleryCard(i));
        for (i in cards)
          mainContext.add(cards[i].translate).add(cards[i].wind).add(cards[i].rotate).add(cards[i].surface);
    }

    return {
      draw: draw
    }
  })()
  FamousGallery.draw(7);
});
