/**
 * 动画相关 js
 * */

/**
 * 判断是否为移动端
 * @returns {boolean}
 */
function isMobile(){
    let info = navigator.userAgent;
    let agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPod", "iPad"];
    for(let i = 0; i < agents.length; i++){
        if(info.indexOf(agents[i]) >= 0) return true;
    }
    return false;
}
window.mingofIsMobile = isMobile;

/**
 * 入场动画
 **/
// function enterAnimation () {
//     // var overlay = document.getElementById('overlay');
//     var mastContainer = document.getElementById('mastcontainer');
//
//     // overlay.classList.add('fadeOut');
//     mastContainer.classList.add('pageShow');
//
//     // 动画执行完毕后执行该函数
//     function animationCompleted (...doms) {
//         return function () {
//             for(let i = 0, l = doms.length; i < l; i++ ) {
//                 // doms[i].style.transform = 'translate3d(0,0,0)';
//                 doms[i].classList.remove('pageShow');
//             }
//         }
//     }
//     // overlay 动画完成后隐藏遮罩
//     // overlay.addEventListener("animationend", function () {
//     //     this.style.display = "none";
//     // });
//
//     mastContainer.addEventListener("animationend", function () {
//         requestAnimationFrame(animationCompleted(mastContainer));
//     });
//
//     // 用户滚动则停止动画;
//     // window.addEventListener('scroll', function () {
//     //     requestAnimationFrame(animationCompleted(mastContainer));
//     // });
// }
// window.addEventListener('load', enterAnimation);

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
/**
 * 移动端 header 的 toggle 按钮的事件处理
 * @param toggle    {DOM} toggle自身
 * @param targets   {Array} 事件需要影响到的目标
 * @param isOpen    {Boolean} 开关是否为打开，不是则打开，是则关闭
 * @returns {boolean}
 */
function toggleHandler ({toggle, targets},isOpen) {

    for (let i = 0; i<targets.length; i++) {
        if (!isOpen) {
            targets[i].classList.add("target-opened");
            targets[i].classList.remove("target-closed")
        } else {
            targets[i].classList.remove("target-opened");
            targets[i].classList.add("target-closed");
        }
    }
    if(!isOpen) {
        toggle.classList.remove("nav-close");
        toggle.classList.add("nav-open");
    } else {
        toggle.classList.remove("nav-open");
        toggle.classList.add("nav-close");
    }
    return !isOpen;
}

/**
 * mobile header 的一系列DOM操作。
 */
function initializeHeader () {
    if(!mingofIsMobile()) return;
    let doc = document.getElementsByClassName("mobile")[0];
    let toggle = document.getElementsByClassName('nav-toggle')[0];
    let mast = document.getElementById('mastcontainer');
    let side = document.getElementsByClassName("mb-header-side")[0];
    let isOpen = false;

    toggle.addEventListener("touchend", ()=> {
        isOpen = toggleHandler({toggle:toggle,targets: [doc]},isOpen);
    });
    side.addEventListener("touchstart", (e)=> {console.log("haha");e.stopPropagation()});
    mast.addEventListener("touchend", (e)=> {
        console.log(isOpen);
        console.log(e.target)

        isOpen = toggleHandler({toggle:toggle, targets:[doc]},true);
    },false);

}
document.addEventListener('DOMContentLoaded', initializeHeader);
/**
 * 记住上次滑动的位置，用来判断滑动距离的delta值
 * @type {number}
 */
var lastPos = 0;

/**
 * 自动隐藏mb header
 */
function autoHideHeader () {
    let mbHeader = document.getElementsByClassName('mb-header-toggle-bar')[0];
    document.addEventListener("touchmove", (e)=> {
        /*auto hide header*/
        let scrollTop       = document.documentElement.scrollTop || document.body.scrollTop;
        let delta = scrollTop - lastPos;
        if(delta >= 20) {
            mbHeader.classList.add("hide");
        } else if (delta < -20) {
            mbHeader.classList.remove("hide");
        }
        lastPos = scrollTop;
    });
}
document.addEventListener('DOMContentLoaded', autoHideHeader);


/**
 * 动态设置 PC 端 vertical header mode 下 footer 的宽度，避免溢出 vertical-header 的包裹
 **/
function initializeFooter() {
    let footer = document.getElementsByClassName('footer')[0];
    let header = document.getElementById('header');
    if(!footer || !header) return;
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
// (function(){
//     if(document.body.clientWidth <= 1200) return;
//     function lightBox() {
//         const postContent   = document.getElementsByClassName('post-content')[0]; if(!postContent) return;
//         const imgs          = postContent.getElementsByTagName('img'); if(imgs.length <= 0) return;
//         const mastContainer = document.getElementById('mastcontainer');
//
//         const img           = document.createElement('img');
//         const lbContainer   = document.createElement('div');
//         lbContainer.appendChild(img);
//
//         function removeLightBox() {
//             lbContainer.classList.remove('out');
//             lbContainer.classList.remove('light-box');
//             mastContainer.removeChild(lbContainer);
//             lbContainer.removeEventListener('animationend', removeLightBox);
//         }
//         function addLightBox(imgSrc) {
//             img.src = imgSrc;
//             lbContainer.classList.add('light-box');
//             mastContainer.appendChild(lbContainer);
//         }
//
//         for(let i = 0, len = imgs.length; i < len; i++) {
//             imgs[i].onclick = function (e) {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 addLightBox(this.src);
//             }
//         }
//
//         lbContainer.onclick = (e) => {
//             e.preventDefault();
//             e.stopPropagation();
//             lbContainer.classList.add('out');
//             lbContainer.addEventListener('animationend', removeLightBox);
//         };
//
//     }
//     document.addEventListener('DOMContentLoaded', lightBox);
// }());

/**
 * thumbnail加载失败
 */

function thumbnail_error(thumbnailImg) {
    thumbnailImg.classList.add("error");
}
