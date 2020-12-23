"use strict";function isMobile(){for(var e=navigator.userAgent,t=["Android","iPhone","SymbianOS","Windows Phone","iPod","iPad"],n=0;n<t.length;n++)if(0<=e.indexOf(t[n]))return!0;return!1}window.mingofIsMobile=isMobile;var a_idx=0;function toggleHandler(e,t){e.toggle;for(var n=e.targets,o=0;o<n.length;o++)t?(n[o].classList.remove("target-opened"),n[o].classList.add("target-closed")):(n[o].classList.add("target-opened"),n[o].classList.remove("target-closed"));return!t}function initializeHeader(){var t,n,e,o,a;mingofIsMobile()&&(t=document.getElementsByClassName("mobile")[0],n=document.getElementsByClassName("nav-toggle")[0],e=document.getElementById("mastcontainer"),o=document.getElementsByClassName("mb-header-side")[0],a=!1,n.addEventListener("touchend",function(){a=toggleHandler({toggle:n,targets:[t]},a)}),o.addEventListener("touchmove",function(e){e.stopPropagation()}),e.addEventListener("touchend",function(e){a=toggleHandler({toggle:n,targets:[t]},!0)},!1))}document.addEventListener("DOMContentLoaded",function(){var s=document.body;s.clientWidth<=1e3||s.addEventListener("click",function(e){var t=["富强","民主","文明","和谐","自由","平等","公正","法治","爱国","敬业","诚信","友善"],n=document.createElement("span");n.innerHTML=t[a_idx],a_idx=(a_idx+1)%t.length;var o=e.pageX,a=e.pageY;n.style.zIndex=9999,n.style.top=a-20+"px",n.style.left=o+"px",n.style.position="absolute",n.style.fontWeight="bold",n.style.color="#ff6651",n.style.opacity=1,s.appendChild(n),requestAnimationFrame(function e(){n.style.top=parseInt(n.style.top)-1+"px",n.style.opacity-=.05,parseInt(n.style.top)<=a-180||n.style.opacity<=0?s.removeChild(n):requestAnimationFrame(e)})})}),document.addEventListener("DOMContentLoaded",initializeHeader);var lastPos=0;function autoHideHeader(){var o=document.getElementsByClassName("mb-header-toggle-bar")[0];document.addEventListener("touchmove",function(e){var t=document.documentElement.scrollTop||document.body.scrollTop,n=t-lastPos;20<=n?o.classList.add("hide"):n<-20&&o.classList.remove("hide"),lastPos=t})}function thumbnail_error(e){e.classList.add("error")}function toggleSubMenuHandler(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:this.isOpen;return t?(e.classList.add("menu-closed"),e.classList.remove("menu-opened")):(e.classList.add("menu-opened"),e.classList.remove("menu-closed")),e.isOpen=!t,!t}function autoHideSubMenu(){var e=document.getElementsByClassName("menu-item-has-children")||document.getElementsByClassName("menu-with-children");if(!(e.length<=0)){for(var t=0;t<e.length;t++)toggleSubMenuHandler(e[t],!0);window.removeEventListener("scroll",autoHideSubMenu)}}function toggleSubMenu(){var o=document.getElementsByClassName("menu-item-has-children")||document.getElementsByClassName("menu-with-children");if(!(o.length<=0))for(var e=0;e<o.length;e++)!function(n){o[n].isOpen=!1,o[n].toggleSubMenuHandler=toggleSubMenuHandler,o[n].onclick=function(e){for(var t=0;t<o.length;t++)t!==n&&toggleSubMenuHandler(o[t],!0);toggleSubMenuHandler(this,this.isOpen),window.addEventListener("scroll",autoHideSubMenu)}}(e)}document.addEventListener("DOMContentLoaded",autoHideHeader),document.addEventListener("DOMContentLoaded",toggleSubMenu);