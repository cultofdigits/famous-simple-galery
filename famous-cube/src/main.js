define(function (require, exports, module) {

  var txt ='';
  txt = '<div class="col-lg-12">    <div class="pull-left cultArticle">    <span class="plugin_picture"><img src="http://cultofdigits.com/media/cms_page_media/102/logo.png" alt=""></span>  </div>   <h1 class="text-center">       Знакомство с famo.us js     </h1>  <p class="text-right">    <em>5 July 2014 г. 22:32:05</em>  </p>                   <p>Пришло время написать статью об одном интересном фреймворке который позволяет создавать интерактивные веб приложения, который работает во всех современных браузерах и мобильных платформах. Этот фреймворк называется <a rel="noref" href="https://famo.us">famo.us</a>.</p><p><span><span>Что же он позволяет делать? Он позволяет создавать приложения нового поколения, которые одинаково хорошо работают во всех браузерах и мобильных устройствах. Для вывода графики он использует 3d трансформации используюя CSS, WebGL или Canvas.&nbsp;</span></span><span>&nbsp;</span></p><p class="hidden" style="text-align: right;"><span></span></p><h2 id="">Введение</h2><p>Как ни странно но на сайте достаточно мало информации о том как создавать приложения. Документация автоматически сгенерирована из исходных кодов и не сильно помогает разобраться в многообразии фич доступных из библиотеки. Однако меня очень порадовал раздел <a rel="noref" href="https://famo.us/university">university</a> в котором в виде гайдов приведены основные подходы к разработке. От вывода простейших примитивов до проектирования интерфейсов. Стоит отметить, что на момент написания статьи не все разделы были доступны, однако для начала этого более чем достаточно. Сами гайды выполнены достаточно оригинально. Интерфейс разбит на 3 колонки, слева описание главы, посередине интерпритатор кода, который внешне очень напоминает мой любимый Sublime. И справа можно посмотреть что же получается в результате выполнения кода. Несмотря на то что сами уроки совсем короткие, я провел не мало времени играясь с кодом.</p><h2 id="_1">В бой.</h2><p>В данной статье я разработаю простую галерею изображений, исходный код можно найти в <a href="https://github.com/cultofdigits/famous-simple-galery">гитхабе</a>, а финальный пример <a href="http://cultofdigits.com:10002/famous-simple-galery/index.html">тут</a>. Все примеры приведенные в статье можно найти в истории гитхба.</p><p>Приступим. На сайте можно скачать архив <em>famous-starter-kit</em>, в котором вы найдете документацию и примеры как вывода примитивов, так и примеры интерфейсов и анимации. Код примеров достаточно прост и результат действительно впечатляет. Так же в папке Boilerplate Вы найдете шаблон в кортом подключены все необходимые для работы библиотеки и как раз в нем нам и предстоит разрабатывать наше первое приложение.</p><p>Начнем с вывода простейшего примитива - прямоугольника</p><p>создание любого приложения на famous начинается с создания контекста, контекст в свою очередь соединяется с контекстом документа и выводит в браузер результат, таким образом все примитивы и модификаторы будут добавляться в контекст</p><pre>var Engine = require(\'famous/core/Engine\'); var mainContext = Engine.createContext();</pre><p>далее импортируем модуль для вывода простейшего примитива - поверхности. В конструктор Surface передаем размер поверхности, текст содержания, а так же некоторые свойства, которые очень напоминают CSS. Размер прямоугольника задается в пикселях</p><pre><code>var Surface       = require(\'famous/core/Surface\');var firstSurface = new Surface({    size: [200, 100],    content: \'Hello Famo.us\',    properties: {      color: \'white\',      textAlign: \'center\',      backgroundColor: \'#FA5C4F\'    }});</code></pre><p>Теперь добавим первую поверхность в контекст и можно любоваться результатом</p><pre><code>mainContext.add(firstSurface);</code></pre><p><span class="plugin_picture"><img src="http://cultofdigits.com/media/cms_page_media/102/first-step.png" alt=""></span></p><p>Пока впечатляет не очень. Но теперь попробуем вывести прямоугольник не в левом верхнем углу, а в произвольной точке. Для этого познакомимся с модификаторами. Модификаторы в famous могут выполнять различные функции, но наиболее часто используются модификаторы перемещения и вращения.</p><p>Для работы с модификаторами выполним импорт</p><pre><code>var StateModifier = require(\'famous/modifiers/StateModifier\');</code></pre><p>И создадим новый модификатор. В параметре origin указывается точка, относительно которой будет произведена трансформация, допустимые значения от 0 до 1 где 0 это самая верхняя/левая точка, а 1 нижняя/правая.</p><p>В параметре transfotm указывает, тип трансформации, в данном случае перемещение, и указываем значение перемещения и координаты на которые надо сдвинуть относительно точки origin</p><pre><code>var translate = new StateModifier({      origin: [.5,.5], //выполняем трансформацию относительно центра      transform: Transform.translate(100,100)    })</code></pre>';


  var Engine = require('famous/core/Engine');
  var Modifier = require('famous/core/Modifier');
  var Transform = require('famous/core/Transform');
  var Surface = require("famous/core/Surface");
  var StateModifier = require('famous/modifiers/StateModifier');
  var Easing           = require("famous/transitions/Easing");
  var RenderNode = require('famous/core/RenderNode');

  var mainContext = Engine.createContext();
  mainContext.setPerspective(1000);


  var Cube = function(){
    var DEFAULT_WIDTH = window.innerWidth;
    var DEFAULT_HEIGH = window.innerHeight;

    var box = new RenderNode();

    var scale = new Modifier();
    var translate = new Modifier({origin:[.5,.5]});
    var animate = new Modifier({origin:[.5,.5]});
    var angle =   0;


    var createSurface = function(param){
      var surface =  new Surface({
        size: [DEFAULT_WIDTH,DEFAULT_HEIGH],
        content: txt,
        properties:{
          backgroundColor: "gray",
          cssText: "background: radial-gradient(#eee 10%, #ddd 60%, #bbb)",
          overflow: "auto"
        }
      });

      var modifier = new Modifier(param.modifier);
      box.add(modifier).add(surface)
    }

    createSurface({
      modifier: {transform : Transform.translate(0, 0, DEFAULT_WIDTH / 2)}
    });
    createSurface({
      modifier: {transform : Transform.multiply(Transform.translate(DEFAULT_WIDTH / 2, 0, 0),Transform.rotateY(Math.PI/2) ) }
    });
    createSurface({
      modifier: {transform : Transform.multiply(Transform.translate(0, 0, -DEFAULT_WIDTH / 2),Transform.rotateY(Math.PI) )  }
    });
    createSurface({
      modifier: {transform : Transform.multiply( Transform.translate(-DEFAULT_WIDTH / 2, 0, 0), Transform.rotateY(-Math.PI/2) ) }
    });

    var setScale = function(){
      var x = (window.innerWidth) / DEFAULT_WIDTH;
      var y = (window.innerHeight)/ DEFAULT_HEIGH;
      scale.setTransform( Transform.scale(x,y,x));
      translate.setTransform( Transform.translate(0, 0, -(window.innerWidth) / 2));
    }

    var rotate = new Modifier({
        origin: [0.5, 0.5],
        transform : function(){
          return quaternion.getTransform();
        }
    });

    return {
      box: box,
      setScale: setScale,
      scale: scale,
      translate: translate,
      animate: animate,
      angle: angle
    }

  }

  var cube = new Cube();


  Engine.on('resize', function(){
    cube.setScale();
  })

  Engine.on('click', function(){
    cube.angle += 90;
    cube.animate.setTransform(
      Transform.multiply(Transform.translate(0, 0, -1000), Transform.rotateY(cube.angle / 180 * Math.PI)),
      {duration: 1500, curve: Easing.inOutBack}
    );
    cube.animate.setTransform(
      Transform.multiply(Transform.translate(0, 0, 0), Transform.rotateY(cube.angle / 180 * Math.PI)),
      {duration: 500, curve: Easing.inOutBack}
    );
  })
  cube.setScale();
  mainContext.add(cube.translate).add(cube.animate).add(cube.scale).add(cube.box);
});
