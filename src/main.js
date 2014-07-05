define(function(require, exports, module) {
    var Engine = require('famous/core/Engine');
    var Surface = require("famous/core/Surface");
    var StateModifier = require('famous/modifiers/StateModifier');
    var Transform = require('famous/core/Transform');
    var Easing = require("famous/transitions/Easing");

    var mainContext = Engine.createContext();
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
    }

    var c = new Card({
        x: 0,
        y: 0,
        z: 0,
        w: 500,
        h: 500,
        angle: 0
    })

    mainContext.add(c.translate).add(c.rotate).add(c.surface);
});