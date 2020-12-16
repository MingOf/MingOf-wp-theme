/*
* 检测夜间模式
* */
(function () {
    function isMobile(){
        let info = navigator.userAgent;
        let agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPod", "iPad"];
        for(let i = 0; i < agents.length; i++){
            if(info.indexOf(agents[i]) >= 0) return true;
        }
        return false;
    }
    function checkDarkMode () {
        let matches = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark').matches;
        if(matches) {
            document.getElementsByTagName("html")[0].classList.add('dark');
        }
    }
    function unCheckDarkMode () {
        document.getElementsByTagName("html")[0].classList.remove('dark');
    }
    window.matchMedia('(prefers-color-scheme: dark').addEventListener('change', (event) => {
        if(event.matches) {
            checkDarkMode();
        } else {
            unCheckDarkMode();
        }
    })
    checkDarkMode();
})()
