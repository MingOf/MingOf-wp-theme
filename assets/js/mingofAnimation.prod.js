"use strict";var timer=1;function debounce(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:500,t=1<arguments.length?arguments[1]:void 0;clearTimeout(timer),console.log(timer),timer=setTimeout(function(){t&&t()},e)}function isMobile(){for(var e=navigator.userAgent,t=["Android","iPhone","SymbianOS","Windows Phone","iPod","iPad"],n=0;n<t.length;n++)if(0<=e.indexOf(t[n]))return!0;return!1}function toggleHandler(e){var o=e.toggle,s=e.event,a=e.targets,l=e.force,r=e.once,t=e.targetOpenedClass,n=e.targetClosedClass,d=e.cbOnOpen,i=e.cbOnClose;if(!o)throw"toggle is necessary";var c=t||"target-opened",g=n||"target-closed";o.addEventListener(s,function e(t){t.preventDefault();for(var n=0;n<a.length;n++)"close"===l&&(a[n].isOpen=!0),"open"===l&&(a[n].isOpen=!1),a[n].isOpen?(a[n].classList.remove(c),a[n].classList.add(g),a[n].isOpen=!1,i&&i()):(a[n].classList.add(c),a[n].classList.remove(g),a[n].isOpen=!0,d&&d());r&&o.removeEventListener(s,e)})}function initializeHeader(){var e,t,n;mingofIsMobile()&&(e=document.getElementsByClassName("mobile")[0],t=document.getElementsByClassName("nav-toggle")[0],n=document.getElementById("mastcontainer"),e.isOpen=!1,toggleHandler({toggle:t,event:"touchend",targets:[e],once:!1,cbOnOpen:function(){toggleHandler({toggle:n,event:"touchend",targets:[e],once:!0,force:"close"})}}))}window.mingofIsMobile=isMobile,document.addEventListener("DOMContentLoaded",initializeHeader);var lastPos=0,mbHeader=document.getElementsByClassName("mb-header-toggle-bar")[0];function autoHideHeader(){var e=document.documentElement.scrollTop||document.body.scrollTop,t=e-lastPos;20<=t?mbHeader.classList.add("hide"):t<-20&&mbHeader.classList.remove("hide"),lastPos=e}function toggleSubMenu(){var e=document.getElementsByClassName("menu-item-has-children")||document.getElementsByClassName("menu-with-children");if(!(e.length<=0))for(var t=0;t<e.length;t++){e[t].isOpen=!1;var n=Array.prototype.slice.call(e,0,t),o=Array.prototype.slice.call(e,t+1),s=Array.prototype.concat.call(n,o);toggleHandler({toggle:e[t],event:"click",targets:[e[t]],targetOpenedClass:"menu-opened",targetClosedClass:"menu-closed",cbOnOpen:function(){toggleHandler({toggle:window,event:"scroll",targets:e,force:"close",once:!0,targetOpenedClass:"menu-opened",targetClosedClass:"menu-closed"})}}),toggleHandler({toggle:e[t],event:"click",targets:s,force:"close",targetOpenedClass:"menu-opened",targetClosedClass:"menu-closed"})}}document.addEventListener("touchmove",function(){debounce(0,autoHideHeader)}),document.addEventListener("DOMContentLoaded",toggleSubMenu);