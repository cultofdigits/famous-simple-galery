define(function(require, exports, module) {
    var Engine = require('famous/core/Engine');
    var Surface = require("famous/core/Surface");

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

    mainContext.add(firstSurface);
});