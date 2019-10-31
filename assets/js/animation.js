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

/* 鼠标点击动画 */
var a_idx = 0;
document.addEventListener("DOMContentLoaded", function () {
   var body = document.body;
   body.addEventListener("click", (e)=> {
       var a = ["富强", "民主", "文明", "和谐", "自由", "平等", "公正" ,"法治", "爱国", "敬业", "诚信", "友善"];

       var i = document.createElement('span');
       i.innerHTML = a[a_idx];

       a_idx = (a_idx + 1) % a.length;
       var x = e.pageX,
           y = e.pageY;

       i.style.zIndex = 9999999999999999999999999999999999999;
       i.style.top = (y - 20) + 'px';
       i.style.left = x + 'px';
       i.style.position = "absolute";
       i.style.fontWeight = "bold";
       i.style.color = "#ff6651";
       i.style.opacity = 1;

       body.appendChild(i);

       function animate () {
           i.style.top = parseInt(i.style.top) - 1 + 'px';
           i.style.opacity -= 0.05;

           requestAnimationFrame(animate);
           if(parseInt(i.style.top) <= y - 180 || i.style.opacity <= 0) {
               body.removeChild(i);
           }
       }
       requestAnimationFrame(animate);
   });
});