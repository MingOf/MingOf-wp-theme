"use strict";
/**
 * 动画相关 js
 * */

/**
 * 防抖
 * @param {number} delay 延迟时间
 * @param {function} fn 回调函数
 * @param {HTMLElement} el 用于挂上 timer 的元素 
 */
var timer = 1;

var timer = 1;
function debounce(delay: number = 500, fn: () => any) {
  clearTimeout(timer);
  timer = setTimeout(() => {
    fn && fn();
  }, delay);
}
/**
 * 判断是否为移动端
 * @returns {boolean}
 */
function mingofIsMobile(): boolean {
  if (document.body.clientWidth <= 1200) return true;
  var info = navigator.userAgent;
  var agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPod", "iPad"];

  for (var i = 0; i < agents.length; i++) {
    if (info.indexOf(agents[i]) >= 0) return true;
  }

  return false;
}

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

var a_idx: number = 0;
document.addEventListener("DOMContentLoaded", function (): void {
  if (mingofIsMobile()) return;
  var body = document.body;
  body.addEventListener("click", function (e): void {
    var a: Array<string> = ["富强", "民主", "文明", "和谐", "自由", "平等", "公正", "法治", "爱国", "敬业", "诚信", "友善"];
    var i: HTMLElement = document.createElement('span');
    i.innerHTML = a[a_idx];
    a_idx = (a_idx + 1) % a.length;
    var x: number = e.pageX,
      y: number = e.pageY;
    i.style.zIndex = 9999;
    i.style.top = y - 20 + 'px';
    i.style.left = x + 'px';
    i.style.position = "absolute";
    i.style.fontWeight = "bold";
    i.style.color = "#ff6651";
    i.style.opacity = 1;
    body.appendChild(i);

    function animate(): void {
      i.style.top = parseInt(i.style.top) - 1 + 'px';
      i.style.opacity = i.style.opacity - 0.05;

      if (parseInt(i.style.top) <= y - 180 || i.style.opacity <= 0) {
        body.removeChild(i);
        return;
      }

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  });
});

interface toggleParams {
  toggle: HTMLElement | Element | Window;
  event: string;
  targets: HTMLElement[] | Element[] | Window | HTMLCollectionOf<Element>;
  force?: string;
  once?: boolean;
  targetOpenedClass?: string;
  targetClosedClass?: string;
  cbOnOpen?: () => void;
  cbOnClose?: () => void;
}
/**
 * 开关函数
 * @param {*} Object
 * @param {HTMLElement} Object.toggle  开关元素
 * @param {Event} Object.event  开关元素监听的事件
 * @param {Array[HTMLElement]} Object.targets 开关所影响到的目标。targets[i].isOpen 为挂靠在某个目标元素上的开关状态,用于判断目标是开启还是关闭的，默认false
 * @param {string} Object.force 强制开、关
 * @param {boolean} Object.once  是否只执行一次开关
 * @param {string}  Object.targetOpenedClass 目标状态置为开启后，在目标元素上添加的类名
 * @param {string}  Object.targetClosedClass 目标状态置为关闭后，在目标元素上添加的类名
 * @param {function} Object.cbOnOpen 目标打开后的回调函数
 * @param {function} Object.cbOnClose 目标关闭后的回调函数
 * @returns {Object} Object.targets
 */
function toggleHandler({
  toggle,
  event,
  targets,
  force,
  once,
  targetOpenedClass,
  targetClosedClass,
  cbOnOpen,
  cbOnClose
}: toggleParams): void {
  if (!toggle) throw "toggle is necessary";
  let openedClass = targetOpenedClass || "target-opened";
  let closedClass = targetClosedClass || "target-closed";

  function handler() {
    for (let i = 0; i < targets.length; i++) {
      if (force === "close") {
        (<Element>targets[i]).isOpen = true;
      }
      if (force === "open") {
        (<Element>targets[i]).isOpen = false;
      }
      if (!(<Element>targets[i]).isOpen) {
        (<Element>targets[i]).classList.add(openedClass);
        (<Element>targets[i]).classList.remove(closedClass);
        (<Element>targets[i]).isOpen = true;
        cbOnOpen && cbOnOpen();
      } else {
        (<Element>targets[i]).classList.remove(openedClass);
        (<Element>targets[i]).classList.add(closedClass);
        (<Element>targets[i]).isOpen = false;
        cbOnClose && cbOnClose();

      }
    }
    if (once) {
      toggle.removeEventListener(event, handler);
    }
  }
  toggle.addEventListener(event, handler);
  return;
}


/**
* mobile header 的一系列操作。
*/
interface params {
  mast: HTMLElement | null;
}
function initializeHeader() {
  if (!mingofIsMobile()) return;
  let doc: any = document.getElementsByClassName("mobile")[0];
  let toggle: any = document.getElementsByClassName('nav-toggle')[0];
  let mast: any = document.getElementById('mastcontainer');
  doc.isOpen = false;
  // 汉堡包按钮的点击事件，开关打开后开始套娃，开启mastcontainer的监听，并设置只监听一次
  toggleHandler({
    toggle: toggle,
    event: 'touchend',
    targets: [doc],
    once: false,
    cbOnOpen: function () {
      toggleHandler({
        toggle: mast,
        event: 'touchend',
        targets: [doc],
        once: true,
        force: 'close'
      });
    }
  });
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
let mbHeader = document.getElementsByClassName('mb-header-toggle-bar')[0];

function autoHideHeader(): void {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let delta = scrollTop - lastPos;
  if (delta >= 20) {
    mbHeader.classList.add("hide");
  } else if (delta < -20) {
    mbHeader.classList.remove("hide");
  }
  lastPos = scrollTop;
}
/*监听滑动，自动隐藏mb header*/
document.addEventListener("touchmove", () => {
  debounce(0, autoHideHeader);
});

/**
* 二级菜单点击展开
*/
function toggleSubMenu() {
  let depth1 = document.getElementsByClassName('menu-item-has-children') || document.getElementsByClassName('menu-with-children');
  if (depth1.length <= 0) return;

  for (let i = 0; i < depth1.length; i++) {
    depth1[i].isOpen = false;
    let tmp = Array.prototype.slice.call(depth1, 0, i)
    let tmp2 = Array.prototype.slice.call(depth1, i + 1);
    let targets = Array.prototype.concat.call(tmp, tmp2);
    // 打开自身
    toggleHandler({
      toggle: depth1[i],
      event: 'click',
      targets: [depth1[i]],
      targetOpenedClass: 'menu-opened',
      targetClosedClass: 'menu-closed',
      // 滚动时自动隐藏
      cbOnOpen: function () {
        toggleHandler({
          toggle: window,
          event: 'scroll',
          targets: depth1,
          force: 'close',
          once: true,
          targetOpenedClass: 'menu-opened',
          targetClosedClass: 'menu-closed'
        });
      }
    })
    // 关闭其他已经展开的二级菜单
    toggleHandler({
      toggle: depth1[i],
      event: 'click',
      targets: targets,
      force: 'close',
      targetOpenedClass: 'menu-opened',
      targetClosedClass: 'menu-closed'
    })
  }
}
document.addEventListener("DOMContentLoaded", toggleSubMenu);
/**
* 图片灯箱效果
* */
(function(){
    if(document.body.clientWidth <= 1200) return;
    function lightBox() {
        const postContent   = document.getElementsByClassName('post-content')[0]; if(!postContent) return;
        const imgs          = postContent.getElementsByTagName('img'); if(imgs.length <= 0) return;
        const body          = document.body;
        const img           = document.createElement('img');
        const lbContainer   = document.createElement('div');
        lbContainer.appendChild(img);

        function removeLightBox() {
            lbContainer.classList.remove('out');
            lbContainer.classList.remove('light-box');
            body.removeChild(lbContainer);
            lbContainer.removeEventListener('animationend', removeLightBox);
        }
        function addLightBox(imgSrc:string) {
            img.src = imgSrc;
            lbContainer.classList.add('light-box');
            body.appendChild(lbContainer);
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

(function() {
  let topButton = document.getElementsByClassName('go-top-container')[0];
  if (!topButton) return;
  let goTopTimer = 0;
  function getScrollPercent() {
    if (mingofIsMobile()) {
      window.removeEventListener('scroll', getScrollPercent);
      return;
    }
    let scrollTop: number = document.documentElement.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight;
    let innerHight: number = window.innerHeight;
    let tmp = scrollTop / (scrollHeight - innerHeight) * 100;
    let percent = Math.round(tmp);
    let top = (percent + 100) + '%';
    let cent = document.getElementsByClassName('percent')[0];
    let wave1 = document.getElementsByClassName('go-top-inner1')[0] as Element;
    let wave2 = document.getElementsByClassName('go-top-inner2')[0] as Element;
    cent.innerHTML = String(percent);
    wave1.style.top = '-' + top;
    wave2.style.top = '-' + top;
  }
  function goTop() {
    if (document.body.scrollIntoView) {
      document.body.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      return;
    }
    let scrollTop: number = document.documentElement.scrollTop;
    let speed = scrollTop / 10;
    if (scrollTop !== 0) {
      document.documentElement.scrollTop -= speed;
    } else {
      return
    }
    requestAnimationFrame(goTop)
  }
  topButton.addEventListener('click', goTop);
  window.addEventListener('scroll', getScrollPercent);
})()
