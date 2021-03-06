/*
* 检测夜间模式
* */
(function () {
  let html = document.documentElement;

  function getRGB(str:string) {
      let match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
      return match ? {
          r: match[1],
          g: match[2],
          b: match[3]
      } : {};
  }

  function checkDarkMode() {
      let matches = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark').matches;
      if (matches) return matches;
      let tmpColor = window.getComputedStyle(document.documentElement).backgroundColor;
      let color = getRGB(tmpColor) as {r:string,g:string,b:string};
      if (parseInt(color.r) * 0.299 + parseInt(color.g) * 0.578 + parseInt(color.b) * 0.114 >= 192) { //浅色
          matches = false;
      } else {  //深色
          matches = true;
      }
      return matches;
  }

  function changeMode(el:HTMLElement, isDark:boolean) {
      isDark ? el.classList.add("dark") : el.classList.remove("dark");
  }

  window.matchMedia('(prefers-color-scheme: dark').addEventListener('change', (event) => {
      if (event.matches) {
          changeMode(html, true);
      } else {
          changeMode(html, false);
      }
  })
  changeMode(html, checkDarkMode());
})();