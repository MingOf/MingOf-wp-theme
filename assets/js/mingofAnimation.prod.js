"use strict";var timer=1;function debounce(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:500,t=1<arguments.length?arguments[1]:void 0;clearTimeout(timer),console.log(timer),timer=setTimeout(function(){t&&t()},e)}function isMobile(){for(var e=navigator.userAgent,t=["Android","iPhone","SymbianOS","Windows Phone","iPod","iPad"],n=0;n<t.length;n++)if(0<=e.indexOf(t[n]))return!0;return!1}window.mingofIsMobile=isMobile;var a_idx=0;function toggleHandler(e){var n=e.toggle,o=e.event,s=e.targets,a=e.force,l=e.once,t=e.targetOpenedClass,i=e.targetClosedClass,r=e.cbOnOpen,d=e.cbOnClose;if(!n)throw"toggle is necessary";var c=t||"target-opened",g=i||"target-closed";n.addEventListener(o,function e(){for(var t=0;t<s.length;t++)"close"===a&&(s[t].isOpen=!0),"open"===a&&(s[t].isOpen=!1),s[t].isOpen?(s[t].classList.remove(c),s[t].classList.add(g),s[t].isOpen=!1,d&&d()):(s[t].classList.add(c),s[t].classList.remove(g),s[t].isOpen=!0,r&&r());l&&n.removeEventListener(o,e)})}function initializeHeader(){var e,t,n;mingofIsMobile()&&(e=document.getElementsByClassName("mobile")[0],t=document.getElementsByClassName("nav-toggle")[0],n=document.getElementById("mastcontainer"),e.isOpen=!1,toggleHandler({toggle:t,event:"touchend",targets:[e],once:!1,cbOnOpen:function(){toggleHandler({toggle:n,event:"touchend",targets:[e],once:!0,force:"close"})}}))}document.addEventListener("DOMContentLoaded",function(){var a=document.body;a.clientWidth<=1200||a.addEventListener("click",function(e){var t=["富强","民主","文明","和谐","自由","平等","公正","法治","爱国","敬业","诚信","友善"],n=document.createElement("span");n.innerHTML=t[a_idx],a_idx=(a_idx+1)%t.length;var o=e.pageX,s=e.pageY;n.style.zIndex=9999,n.style.top=s-20+"px",n.style.left=o+"px",n.style.position="absolute",n.style.fontWeight="bold",n.style.color="#ff6651",n.style.opacity=1,a.appendChild(n),requestAnimationFrame(function e(){n.style.top=parseInt(n.style.top)-1+"px",n.style.opacity-=.05,parseInt(n.style.top)<=s-180||n.style.opacity<=0?a.removeChild(n):requestAnimationFrame(e)})})}),document.addEventListener("DOMContentLoaded",initializeHeader);var lastPos=0,mbHeader=document.getElementsByClassName("mb-header-toggle-bar")[0];function autoHideHeader(){var e=document.documentElement.scrollTop||document.body.scrollTop,t=e-lastPos;20<=t?mbHeader.classList.add("hide"):t<-20&&mbHeader.classList.remove("hide"),lastPos=e}function toggleSubMenu(){var e=document.getElementsByClassName("menu-item-has-children")||document.getElementsByClassName("menu-with-children");if(!(e.length<=0))for(var t=0;t<e.length;t++){e[t].isOpen=!1;var n=Array.prototype.slice.call(e,0,t),o=Array.prototype.slice.call(e,t+1),s=Array.prototype.concat.call(n,o);toggleHandler({toggle:e[t],event:"click",targets:[e[t]],targetOpenedClass:"menu-opened",targetClosedClass:"menu-closed",cbOnOpen:function(){toggleHandler({toggle:window,event:"scroll",targets:e,force:"close",once:!0,targetOpenedClass:"menu-opened",targetClosedClass:"menu-closed"})}}),toggleHandler({toggle:e[t],event:"click",targets:s,force:"close",targetOpenedClass:"menu-opened",targetClosedClass:"menu-closed"})}}document.addEventListener("touchmove",function(){debounce(0,autoHideHeader)}),document.addEventListener("DOMContentLoaded",toggleSubMenu);