var UTIL = (function($) {
  var resize, windowWidth;

  var wait;
  resize = function(cb) {
    window.onresize = function() {
      clearTimeout(wait);
      wait = setTimeout(cb, 200);
    };
  };

  windowWidth = function() {
    return $(window).width();
  };

  return {
    resize: resize,
    windowWidth: windowWidth
  };
})(jQuery);


var MAJDAL = function () {
  var stateMap = {};
  var domMap = {};

  var setupDomMap = function setupDomMap() {
    var $body = document.querySelector('body');
    var $menuBtn = document.querySelector('.nav--mobile');
    var $menu = document.querySelector('.nav-bar');

    domMap.$body = $body;
    domMap.$menuBtn = $menuBtn;
    domMap.$menu = $menu;
  };

  var onMenuClick = function(event) {
    if (domMap.$body.classList.contains('js-menu-active')) {
      hideMenu();
    } else {
      showMenu();
    }
  };

  var showMenu = function(event) {
    domMap.$body.classList.add('js-menu-active');
    domMap.$menu.classList.add('js-nav-bar--active');
  };

  var hideMenu = function(event) {
    domMap.$body.classList.remove('js-menu-active');
    domMap.$menu.classList.remove('js-nav-bar--active');
  };

  var initEvents = function() {
    domMap.$menuBtn.addEventListener('click', onMenuClick);
    UTIL.resize(function() {
      if (UTIL.windowWidth() > 920) {
        hideMenu();
      }
    });
  };

  var initModule = function initModule() {
    setupDomMap();
    initEvents();
  };

  return {
    initModule: initModule,
  };
}();

MAJDAL.initModule();
