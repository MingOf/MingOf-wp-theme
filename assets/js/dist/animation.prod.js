"use strict";var timer=1,timer=1;function debounce(e,t){void 0===e&&(e=500),clearTimeout(timer),timer=setTimeout(function(){t&&t()},e)}function mingofIsMobile(){if(document.body.clientWidth<=1200)return!0;for(var e=navigator.userAgent,t=["Android","iPhone","SymbianOS","Windows Phone","iPod","iPad"],n=0;n<t.length;n++)if(0<=e.indexOf(t[n]))return!0;return!1}var a_idx=0;function toggleHandler(e){var n=e.toggle,o=e.event,l=e.targets,s=e.force,a=e.once,t=e.targetOpenedClass,r=e.targetClosedClass,i=e.cbOnOpen,c=e.cbOnClose;if(!n)throw"toggle is necessary";var d=t||"target-opened",m=r||"target-closed";n.addEventListener(o,function e(){for(var t=0;t<l.length;t++)"close"===s&&(l[t].isOpen=!0),"open"===s&&(l[t].isOpen=!1),l[t].isOpen?(l[t].classList.remove(d),l[t].classList.add(m),l[t].isOpen=!1,c&&c()):(l[t].classList.add(d),l[t].classList.remove(m),l[t].isOpen=!0,i&&i());a&&n.removeEventListener(o,e)})}function initializeHeader(){var e,t,n;mingofIsMobile()&&(e=document.getElementsByClassName("mobile")[0],t=document.getElementsByClassName("nav-toggle")[0],n=document.getElementById("mastcontainer"),e.isOpen=!1,toggleHandler({toggle:t,event:"touchend",targets:[e],once:!1,cbOnOpen:function(){toggleHandler({toggle:n,event:"touchend",targets:[e],once:!0,force:"close"})}}))}document.addEventListener("DOMContentLoaded",function(){var s;mingofIsMobile()||(s=document.body).addEventListener("click",function(e){var t=["富强","民主","文明","和谐","自由","平等","公正","法治","爱国","敬业","诚信","友善"],n=document.createElement("span");n.innerHTML=t[a_idx],a_idx=(a_idx+1)%t.length;var o=e.pageX,l=e.pageY;n.style.zIndex=9999,n.style.top=l-20+"px",n.style.left=o+"px",n.style.position="absolute",n.style.fontWeight="bold",n.style.color="#ff6651",n.style.opacity=1,s.appendChild(n),requestAnimationFrame(function e(){n.style.top=parseInt(n.style.top)-1+"px",n.style.opacity=n.style.opacity-.05,parseInt(n.style.top)<=l-180||n.style.opacity<=0?s.removeChild(n):requestAnimationFrame(e)})})}),document.addEventListener("DOMContentLoaded",initializeHeader);var lastPos=0,mbHeader=document.getElementsByClassName("mb-header-toggle-bar")[0];function autoHideHeader(){var e=document.documentElement.scrollTop||document.body.scrollTop,t=e-lastPos;20<=t?mbHeader.classList.add("hide"):t<-20&&mbHeader.classList.remove("hide"),lastPos=e}function toggleSubMenu(){var e=document.getElementsByClassName("menu-item-has-children")||document.getElementsByClassName("menu-with-children");if(!(e.length<=0))for(var t=0;t<e.length;t++){e[t].isOpen=!1;var n=Array.prototype.slice.call(e,0,t),o=Array.prototype.slice.call(e,t+1),l=Array.prototype.concat.call(n,o);toggleHandler({toggle:e[t],event:"click",targets:[e[t]],targetOpenedClass:"menu-opened",targetClosedClass:"menu-closed",cbOnOpen:function(){toggleHandler({toggle:window,event:"scroll",targets:e,force:"close",once:!0,targetOpenedClass:"menu-opened",targetClosedClass:"menu-closed"})}}),toggleHandler({toggle:e[t],event:"click",targets:l,force:"close",targetOpenedClass:"menu-opened",targetClosedClass:"menu-closed"})}}document.addEventListener("touchmove",function(){debounce(0,autoHideHeader)}),document.addEventListener("DOMContentLoaded",toggleSubMenu);var topButton=document.getElementsByClassName("go-top-container")[0],goTopTimer=0;function getScrollPercent(){var e,t,n,o,l,s,a,r;mingofIsMobile()?window.removeEventListener("scroll",getScrollPercent):(e=document.documentElement.scrollTop,t=document.documentElement.scrollHeight,window.innerHeight,n=e/(t-innerHeight)*100,l=(o=Math.round(n))+100+"%",s=document.getElementsByClassName("percent")[0],a=document.getElementsByClassName("go-top-inner1")[0],r=document.getElementsByClassName("go-top-inner2")[0],s.innerHTML=String(o),a.style.top="-"+l,r.style.top="-"+l)}function goTop(){goTopTimer=setInterval(function(){var e=document.documentElement.scrollTop,t=e/5;0!==e?document.documentElement.scrollTop-=t:clearInterval(goTopTimer)},17)}topButton.addEventListener("click",goTop),window.addEventListener("scroll",getScrollPercent);