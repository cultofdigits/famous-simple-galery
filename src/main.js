define(function(require, exports, module) {
    var Engine = require('famous/core/Engine');
    var Surface = require("famous/core/Surface");
    var StateModifier = require('famous/modifiers/StateModifier');
    var Transform = require('famous/core/Transform');
    var Easing = require("famous/transitions/Easing");

    var mainContext = Engine.createContext();

    var Surface       = require('famous/core/Surface');
    var firstSurface = new Surface({
        size: [100, 50],
        content: 'Привет!!',
        properties: {
          color: 'white',
          textAlign: 'center',
          backgroundColor: '#FA5C4F'
        }
    });

    var updown = 1;
    var translate = new StateModifier({
        origin: [.5,.5], //выполняем трансформацию относительно центра
    })

    var angle = 0;

    var rotate = new StateModifier({
        transform: Transform.rotateZ(angle)
    })

    firstSurface.on("click", function(){
        angle = angle + Math.PI;
        rotate.setTransform(Transform.rotateZ(angle), {duration: 500});      
        updown = updown * -1;
        translate.setTransform(Transform.translate(0, 100 * updown, 0), {duration: 500, curve: Easing.inCubic })
    })

    mainContext.add(translate).add(rotate).add(firstSurface);
});