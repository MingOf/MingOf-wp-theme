/**
 * 动画相关 js
 * */

/**
 * 入场动画
 **/
function enterAnimation () {
    var overlay = document.getElementById('overlay');
    var mastContainer = document.getElementById('mastcontainer');

    overlay.classList.add('fadeOut');
    mastContainer.classList.add('pageShow');

    // 动画执行完毕后执行该函数
    function animationCompleted (...doms) {
        return function () {
            for(let i = 0, l = doms.length; i < l; i++ ) {
                doms[i].style.transform = 'none';
                doms[i].classList.remove('pageShow');
            }
        }
    }
    // overlay 动画完成后隐藏遮罩
    overlay.addEventListener("animationend", function () {
        this.style.display = "none";
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

/**
 * 鼠标点击动画
 **/
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

/**
* mobile header 初始化
**/
function initializeHeader () {
    let toggle = document.getElementsByClassName('nav-toggle')[0];
    // let nav = document.getElementById('nav');
    let header = document.getElementById('header');

    header.addEventListener("touchmove", (e)=> {e.preventDefault();e.stopPropagation();});
    header.addEventListener("touchstart", (e)=> {e.stopPropagation();});
    header.addEventListener("touchend", (e)=> {e.stopPropagation();});
    header.addEventListener("scroll",(e)=>{e.preventDefault();e.stopPropagation();});

    var lastPos = 0;
    /*移动端 header 导航折叠*/
    function unfoldHeader () {
        // nav.style.display = "block";
        toggle.classList.remove("nav-close");
        toggle.classList.add("nav-open");
        header.style.overflow = 'auto';
        header.style.height = '100%';
    }
    function foldHeader () {
        // nav.style.display = "none";
        toggle.classList.remove("nav-open");
        toggle.classList.add("nav-close");
        header.style.overflow = 'hidden';
        header.style.height = '3em';
    }
    if(document.documentElement.clientWidth <= 1000) {
        foldHeader();
    } else {
        unfoldHeader();
    }
    header.addEventListener("click", (e)=> {
        let event = e || window.event;
        let target = event.target || event.srcElement;
        if(document.querySelectorAll(".nav-open"))
        if(target.className.toLocaleLowerCase()=="nav-touch-area") {
            if(header.style.height === "3em") {
                unfoldHeader();
            } else {
                foldHeader();
            }
        }
    });
    window.addEventListener("resize", () => {
        if(document.body.clientWidth > 1000) {
            unfoldHeader();
        } else {
            foldHeader();
        }
    });
    document.addEventListener("touchmove", ()=> {
        /*auto hide header*/
        let toggle = document.getElementsByClassName('nav-open');
        if(toggle.length>0) return;
        let scrollTop       = document.documentElement.scrollTop || document.body.scrollTop;
        let delta = scrollTop - lastPos;
        if(delta >= 20) {
            header.classList.add("hide");
        } else if (delta < -20) {
            header.classList.remove("hide");
        }
        lastPos = scrollTop;
    });
}

document.addEventListener('DOMContentLoaded', initializeHeader);

/**
 * 动态设置 PC 端 footer 的宽度，避免溢出 header 的包裹
 **/
function initializeFooter() {
    let footer = document.getElementsByClassName('footer')[0];
    let header = document.getElementById('header');
    function setFooter () {
        footer.style.width = header.clientWidth + 'px';
    }
    function unsetFooter () {
        footer.style.width = '';
    }
    setFooter();
    /*响应resize事件*/
    window.addEventListener("resize", () => {
        if(document.body.clientWidth > 1000) {
            setFooter();
        } else {
            unsetFooter();
        }
    });
}
window.addEventListener("load", initializeFooter);

/**
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
            lbContainer.classList.remove('out');
            lbContainer.classList.remove('light-box');
            mastContainer.removeChild(lbContainer);
            lbContainer.removeEventListener('animationend', removeLightBox);
        }
        function addLightBox(imgSrc) {
            img.src = imgSrc;
            lbContainer.classList.add('light-box');
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
            lbContainer.classList.add('out');
            lbContainer.addEventListener('animationend', removeLightBox);
        };

    }
    document.addEventListener('DOMContentLoaded', lightBox);
}());

/**
 * thumbnail加载失败则不显示
 */

function thumbnail_error(thumbnailImg) {
    thumbnailImg.parentNode.style.display = "none";
}