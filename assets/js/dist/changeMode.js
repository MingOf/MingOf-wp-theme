"use strict";
/*
* 检测夜间模式
* */
(function () {
    var html = document.documentElement;
    function getRGB(str) {
        var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
        return match ? {
            r: match[1],
            g: match[2],
            b: match[3]
        } : {};
    }
    function checkDarkMode() {
        var matches = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark').matches;
        if (matches)
            return matches;
        var tmpColor = window.getComputedStyle(document.documentElement).backgroundColor;
        var color = getRGB(tmpColor);
        if (parseInt(color.r) * 0.299 + parseInt(color.g) * 0.578 + parseInt(color.b) * 0.114 >= 192) { //浅色
            matches = false;
        }
        else { //深色
            matches = true;
        }
        return matches;
    }
    function changeMode(el, isDark) {
        isDark ? el.classList.add("dark") : el.classList.remove("dark");
    }
    window.matchMedia('(prefers-color-scheme: dark').addEventListener('change', function (event) {
        if (event.matches) {
            changeMode(html, true);
        }
        else {
            changeMode(html, false);
        }
    });
    changeMode(html, checkDarkMode());
})();
