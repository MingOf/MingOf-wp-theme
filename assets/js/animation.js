/*动画相关 js*/
var tools = {
    addClass: function (className) {
        if(typeof this ==="object" && this.nodeType === 1 && typeof this.nodeName === "string") {
            this.classList.add(className);
        }
    },
    removeClass: function (className) {
        if(typeof this ==="object" && this.nodeType === 1 && typeof this.nodeName === "string") {
            this.classList.remove(className);
        }
    },
    hide: function () {
        this.style.display = "none";
    }
};

Object.prototype.addClass = tools.addClass;
Object.prototype.removeClass = tools.removeClass;
Object.prototype.hide = tools.hide;

// 入场动画
function enterAnimation () {
    var overlay = document.getElementById('overlay');
    var mastContainer = document.getElementById('mastcontainer');

    overlay.addClass('fadeOut');
    mastContainer.addClass('pageShow');

    // 动画执行完毕后执行该函数
    function animationCompleted (...doms) {
        return function () {
            for(let i = 0, l = doms.length; i < l; i++ ) {
                doms[i].style.transform = 'none';
                doms[i].removeClass('pageShow');
            }
        }
    }
    // overlay 动画完成后隐藏遮罩
    overlay.addEventListener("animationend", function () {
        this.hide();
    });

    mastContainer.addEventListener("animationend", function () {
        requestAnimationFrame(animationCompleted(mastContainer));
    });

    // 用户滚动则停止动画;
    window.addEventListener('scroll', function () {
        requestAnimationFrame(animationCompleted(mastContainer));
    });
}

document.addEventListener('DOMContentLoaded', enterAnimation);


/*
* 图片预加载 防止闪烁
* */
function loadImg(url, cb) {
    var img = new Image();
    img.src = url;
    if(img.complete) {
        cb.call(img);
    }
    img.onload = function () {
        console.log(img);
        cb.call(img,img);
    }
}
