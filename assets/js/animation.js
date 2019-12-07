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

/* 鼠标点击动画 */
var a_idx = 0;
document.addEventListener("DOMContentLoaded", function () {
    var body = document.body;
    if(body.clientWidth <= 1000) return;
    body.addEventListener("click", (e)=> {
       var a = ["富强", "民主", "文明", "和谐", "自由", "平等", "公正" ,"法治", "爱国", "敬业", "诚信", "友善"];

       var i = document.createElement('span');
       i.innerHTML = a[a_idx];

       a_idx = (a_idx + 1) % a.length;
       var x = e.pageX,
           y = e.pageY;

       i.style.zIndex = 9999;
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
           if(parseInt(i.style.top) <= y - 180 || i.style.opacity <= 0) {
               body.removeChild(i);
               return;
           }
           requestAnimationFrame(animate);
       }
       requestAnimationFrame(animate);
    });
});

/*
* header 初始化
* */
function initializeHeader () {
    var toggle = document.getElementsByClassName('nav-toggle')[0];
    var nav = document.getElementById('nav');
    var header = document.getElementById('header');
    var footer = document.getElementsByClassName('footer')[0];

    /*移动端 header 导航折叠*/
    function unfoldHeader () {
        nav.style.display = "block";
        toggle.removeClass("nav-close");
        toggle.addClass("nav-open");
        header.style.overflow = 'auto';
        header.style.height = '100%';
    }
    function foldHeader () {
        nav.style.display = "none";
        toggle.removeClass("nav-open");
        toggle.addClass("nav-close");
        header.style.overflow = '';
        header.style.height = 'auto';
    }

    /*动态设置 PC 端 footer 的宽度，避免溢出 header 的包裹*/
    function setFooter () {
        footer.style.width = header.clientWidth + 'px';
    }
    function unsetFooter () {
        footer.style.width = '';
    }
    toggle.addEventListener("click", () => {
        if(window.getComputedStyle(nav).display === "block") {
            foldHeader();
        } else {
            unfoldHeader();
        }
    });

    /*响应resize事件*/
    window.addEventListener("resize", () => {
       if(document.body.clientWidth > 1000) {
           unfoldHeader();
           setFooter();
       } else {
           foldHeader();
           unsetFooter();
       }
    });
    setFooter();
}

document.addEventListener('DOMContentLoaded', initializeHeader);

/*
* 图片灯箱效果
* */
(function(){
    if(document.body.clientWidth <= 1200) return;
    function lightBox() {
        const postContent   = document.getElementsByClassName('post-content')[0]; if(!postContent) return;
        const imgs          = postContent.getElementsByTagName('img'); if(imgs.length <= 0) return;
        const mastContainer = document.getElementById('mastcontainer');

        const img           = document.createElement('img');
        const lbContainer   = document.createElement('div');
        lbContainer.appendChild(img);

        function removeLightBox() {
            lbContainer.removeClass('out');
            lbContainer.removeClass('light-box');
            mastContainer.removeChild(lbContainer);
            lbContainer.removeEventListener('animationend', removeLightBox);
        }
        function addLightBox(imgSrc) {
            img.src = imgSrc;
            lbContainer.addClass('light-box');
            mastContainer.appendChild(lbContainer);
        }

        for(let i = 0, len = imgs.length; i < len; i++) {
            imgs[i].onclick = function (e) {
                e.preventDefault();
                e.stopPropagation();
                addLightBox(this.src);
            }
        }

        lbContainer.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            lbContainer.addClass('out');
            lbContainer.addEventListener('animationend', removeLightBox);
        };

    }
    document.addEventListener('DOMContentLoaded', lightBox);
}());