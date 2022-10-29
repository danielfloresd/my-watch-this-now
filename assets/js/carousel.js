var model = {};
var view = {};
var handlers = {};
var timer;

model.state = {
  imgSrcs: ['../assets/images/rocks.jpg', '../assets/images/lark.jpg', '../assets/images/christian.jpg'],
  imgIndx: 0,
  transitionSpeed: 500,
  imgTransSpeed: 5000
};

model.next = function () {
  var imgSrcs = model.state.imgSrcs;
  var i;
  model.state.imgIndx += 1;
  i = model.state.imgIndx % imgSrcs.length;

  if (model.state.imgIndx < 0) {
    i += imgSrcs.length;
  }

  view.drawImg(model.state.imgSrcs[i]);
  view.colorDot(i);
};

model.previous = function () {
  var imgSrcs = model.state.imgSrcs;
  var i;
  model.state.imgIndx -= 1;
  i = model.state.imgIndx % imgSrcs.length;

  if (model.state.imgIndx < 0) {
    i += imgSrcs.length;
  }

  view.drawImg(this.state.imgSrcs[i]);
  view.colorDot(i);
};

view.drawDots = function () {
  var i;
  var imgSrcs = model.state.imgSrcs;
  var $nav = $('#nav');
  var $dots = $(document.createDocumentFragment());
  var dot;
  for (i = 0; i < imgSrcs.length; i += 1) {
    dot = $('<li><div class="dots"></div></li>');
    dot.attr('id', i);
    dot.css({ "margin-right": "3rem" });
    $dots.append(dot);
  }
  $nav.append($dots);
  $('#' + (imgSrcs.length - 1)).css({ "margin-right": 0 });
};

view.drawImg = function (src) {
  var transSpeed = model.state.transitionSpeed;
  $('#carousel-wrapper').css({ "background-image": "url(" + src + ")" }).hide().fadeIn(transSpeed);
};

view.colorDot = function (i) {
  $('.dots').removeClass('active');
  $('#' + i + ' .dots').addClass('active');
};

handlers.mouseOnArrows = function () {
  var drawArrows = function () {
    $('.arrows i').fadeIn(500);
  };
  var hideArrows = function () {
    $('.arrows i').fadeOut(400);
  };

  hideArrows();
  $('#carousel-wrapper').on('mouseleave', hideArrows);
  $('.arrows').on('mouseover', drawArrows);
};

handlers.setTimer = function (speed) {
  timer = setInterval(model.next, speed);
};

handlers.clickDot = function () {
  var imgTransSpeed = model.state.imgTransSpeed;
  var dotClicked = function (e) {
    clearInterval(timer);
    model.state.imgIndx = parseInt(e.target.parentNode.id, 10);
    view.drawImg(model.state.imgSrcs[model.state.imgIndx]);
    view.colorDot(model.state.imgIndx);
    timer = setInterval(model.next, imgTransSpeed);
  };

  $('#nav .dots').on('click', dotClicked);
};

handlers.clickNext = function () {
  var imgTransSpeed = model.state.imgTransSpeed;
  $('#right i').on('click', function () {
    clearInterval(timer);
    model.next();
    timer = setInterval(model.next, imgTransSpeed);
  });
};

handlers.clickPrev = function () {
  var imgTransSpeed = model.state.imgTransSpeed;
  $('#left i').on('click', function () {
    clearInterval(timer);
    model.previous();
    timer = setInterval(model.next, imgTransSpeed);
  });
};

handlers.init = function () {
  view.drawDots();
  view.drawImg(model.state.imgSrcs[model.state.imgIndx]);
  view.colorDot(0);
  this.mouseOnArrows();
  this.setTimer(model.state.imgTransSpeed);
  this.clickNext();
  this.clickPrev();
  this.clickDot();
};

$(document).ready(handlers.init.bind(handlers));
