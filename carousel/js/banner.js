function $(ele) {
    return document.querySelector(ele);
}

function $a(ele) {
    return document.querySelectorAll(ele);
}

function Switchable(config) {
    //图片所在的元素
    this.element = config.element;
    //轮播图容器
    this.container = $(".container");
    //记录图片数量
    this.imgNum = config.element.getElementsByTagName("img").length;
    //计时器
    this.timer = null;
    //设置循环播放间隔
    this.delay = config.delay;
}

Switchable.prototype = {
    init: function() {
        //渲染切换按钮
        this.renderButton();

        //循环播放
        this.play();

        //初始化全部事件
        this.initEVent();
    },

    play: function() {
        var that = this;
        this.timer = setInterval(function() {
            console.log(that);
            that.slider(-100)
        }, this.delay);
    },

    stop: function() {
        clearInterval(this.timer);
    },

    //切换逻辑
    slider: function(offset) {
        var currtOffset =  parseInt(this.element.style.left) + offset;
        //根据图像处于list最左端和最右端来重新计算偏移量
        if (currtOffset > 0) {
            currtOffset = -400;
        }
        if (currtOffset < -400) {
            currtOffset = 0;
        }
        this.renderBtnColor(currtOffset);
        this.element.style.left = currtOffset + "%";
    },

    //根据图片数量初始化小按钮
    renderButton: function() {
        var text = "";
        creatUl = document.createElement("ul");
        creatUl.className = "control";
        for (var i = 0, len = this.imgNum; i < len; i++) {
            text += "<li></li>"; 
        }
        creatUl.innerHTML = text;
        this.container.insertBefore(creatUl, $("#to-left"));
    },

    //渲染当前轮播按钮
    renderBtnColor: function(offset) {
        var deliverBtns = this.container.getElementsByTagName("li");
        //重置按钮颜色
        for (var i = 0, len = deliverBtns.length; i < len; i++) {
            if (deliverBtns[i].className == "active") {
                deliverBtns[i].className = "";
            }
        }
        //根据偏移量判断按钮索引
        var index = -offset/100;
        deliverBtns[index].className = "active"
    },

    //绑定事件
    initEVent: function() {
        var that = this;
        var deliverBtns = this.container.getElementsByTagName("li");
        //绑定小按钮切换事件
        for (var i = 0, len = deliverBtns.length; i < len; i++) {
            addEvent(deliverBtns[i], "click", (function(i) {
                return function() {
                    var offset = -(i * 100);
                    that.element.style.left = offset + "%";
                    that.renderBtnColor(offset);
                }
            })(i))
        }

        //委托事件，绑定向左向右切换事件
        addEvent(this.container, "click", function(event) {
            switch(event.target.id) {
                case "to-left":
                    that.slider(100);
                    break;
                case "to-right":
                    that.slider(-100);
                    break;
            }
        })

        //当鼠标位于图片上时，暂停自动切换；离开则开始循环
        addEvent(this.element, "mouseover", this.stop.bind(this));
        addEvent(this.element, "mouseout", this.play.bind(this));
    },
}

//设置自定义配置数据
var config = {
    element: $(".img-list"),
    delay: 5000
}

var creatBanner = new Switchable(config);
creatBanner.init();

//事件绑定函数，兼容浏览器差异
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    }
    else {
        element["on" + event] = listener;
    }
}