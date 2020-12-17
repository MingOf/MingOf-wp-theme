/*
* 检测夜间模式
* */
(function () {
    let html = document.documentElement;
    function isMobile(){
        let info = navigator.userAgent;
        let agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPod", "iPad"];
        for(let i = 0; i < agents.length; i++){
            if(info.indexOf(agents[i]) >= 0) return true;
        }
        return false;
    }
    function getRGB(str){
        let match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
        return match ? {
            r: match[1],
            g: match[2],
            b: match[3]
        } : {};
    }
    function checkDarkMode () {
        let matches = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark').matches;
        if(matches) return matches;
        let color = window.getComputedStyle(document.documentElement).backgroundColor;
        color = getRGB(color);
        if(color.r*0.299 + color.g*0.578 + color.b*0.114 >= 192){ //浅色
            matches = false;
        }else{  //深色
            matches = true;
        }
        return matches;
    }
    function changeMode (el, isDark) {
        isDark ? el.classList.add("dark") : el.classList.remove("dark");
    }
    window.matchMedia('(prefers-color-scheme: dark').addEventListener('change', (event) => {
        if(event.matches) {
            changeMode(html, true);
        } else {
            changeMode(html, false);
        }
    })
    changeMode(html, checkDarkMode());
})();
