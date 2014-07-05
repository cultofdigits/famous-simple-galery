define(function(require, exports, module) {
    var Engine = require('famous/core/Engine');
    var Surface = require("famous/core/Surface");
    var StateModifier = require('famous/modifiers/StateModifier');
    var Transform = require('famous/core/Transform');
    var Easing = require("famous/transitions/Easing");

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
          backgroundColor: '#FA5C4F',
          boxShadow: "0 0 50px rgba(0,0,0,0.5)",
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

    }

    var GaleryCard = function (number){
      this.prototype = Object.create(Card);

      var level = Math.round(number / 2);
      var lr = (number   % 2) == 0?-1:1;
      var x, y = 0, z = -level * 70, angle, w = 400, h = 400;

      if (level == 0){
        x = 0; y = 0; z = 0; angle = 0;w = 500; h =500;
      }
      else{
        x = (lr * level * 100) + (lr * 70);
        angle = Math.PI/6* lr;
      }

      return new Card({
        x: calc(x),
        y: calc(y),
        z: calc(z),
        angle:angle,
        w: calc(w),
        h: calc(h)
      });
    }

    var cards = [],
      cardsCount = 7;

    for (var i = 0; i < cardsCount; i++){
      cards.push(new GaleryCard(i));
    };

    for (i in cards)
      mainContext.add(cards[i].translate).add(cards[i].wind).add(cards[i].rotate).add(cards[i].surface);
});