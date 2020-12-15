/*
* 检测夜间模式
* */
(function () {
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
