"use strict";

/*
* 初始化文章目录， 使用遍历节点的方式
* */
function initCatalog(el) {
  /**
   * 假定处理过后的hArr 如下：
   * [
   *    {tag: "h3", text: "一级1"},
   *    {tag: "h5", text: "二级1-1"},
   *    {tag: "h5", text: "二级1-2"}
   *    {tag: "h3", text: "一级2"},
   *    {tag: "h6", text: "二级2-1"},
   *    {tag: "h6", text: "二级2-2"},
   *    {tag: "h3", text: "一级3"},
   *    {tag: "h3", text: "一级4"}
   * ]
   *
   */
  if (!el) throw "el is not a HTMLElement";
  var hArr = [];
  var els;

  if (!el.querySelectorAll) {
    els = el.querySelectorAll("h1, h2, h3, h4, h5, h6");
  } else {
    els = el.children;
  }

  for (var i = 0; i < els.length; i++) {
    // 遍历所给元素el 的所有子节点中是标题标签的节点
    if (els[i].nodeType === 1 && /H\d/i.test(els[i].nodeName)) {
      // let name = els[i].getElementsByTagName('a')[0].getAttribute('name');
      var name = els[i].getAttribute('name');
      hArr.push({
        tag: els[i].nodeName.toLowerCase(),
        text: els[i].innerText,
        name: name,
        el: els[i]
      });
    }
  }

  if (hArr.length <= 0) {
    return [];
  }

  var titles = []; // 存放目录的数组，包含1级和2级目录

  var level1tag = hArr[0].tag; // 第一次出现的h标签就是第一层标题对应的标签: 比如第一次出现的是<h3>

  var level2tag = ''; // 第二层级的标题对应的标签; 比如可能是任何大于h3的标签，如<h4>,<h5>,<h6>

  var $2th = []; // 二级标题数组

  for (var _i = 0; _i < hArr.length; _i++) {
    var obj = {
      // 每一个第一级标题下面对应了一组第二级标题
      $1th: '',
      // 第一级标题
      $2th: [] //  第二级标题

    };

    if (hArr[_i].tag === level2tag) {
      $2th.push(hArr[_i]); // 如果当前标题2级标题， 那么将该2级标题push 到 $2th, 并且跳过后面的代码；如果下一个标题还是2级标题， 则继续push并跳过

      hArr[_i].el.classList.add('catalog-title');

      hArr[_i].el.classList.add('ct-level2');

      continue;
    } else if (hArr[_i].tag === level1tag) {
      // 动态确定第二层标题对应的标签 level2Tag； 可能是任何大于<h3>的标签， 如h4, h5, h6
      for (var j = _i + 1; j < hArr.length; j++) {
        if (hArr[j].tag > level1tag) {
          level2tag = hArr[j].tag;
          break;
        }
      }

      obj.$1th = hArr[_i];

      hArr[_i].el.classList.add('catalog-title');

      hArr[_i].el.classList.add('ct-level1');

      $2th = []; // 如果检测到1级的标题， 则置$2th 为空
    } else {
      // 第三级 及 深层次的目录标题直接忽略
      continue;
    }

    obj.$2th = $2th;
    titles.push(obj);
  }

  return titles;
}

document.addEventListener("DOMContentLoaded", function () {
  var el = document.getElementsByClassName("post-content") && document.getElementsByClassName("post-content")[0];
  var catalog = document.getElementById('catalog'); //目录

  if (!catalog) return;

  if (!el) {
    catalog.style.display = "none";
    return;
  }

  var navTitles = document.getElementsByClassName('nav-title'); // 导航类别，如"文章目录"，"导航"

  var titles = initCatalog(el);

  if (titles.length === 0) {
    catalog.style.display = "none";
    return;
  }

  catalog.style.display = 'block'; // 如果有目录则显示"文章目录"类别

  var catalogItems = [];
  var isCenter = true;

  var _loop = function _loop(i, l) {
    var p = document.createElement('p');

    if (titles[i].$1th.el.innerText.length >= 10) {
      isCenter = false;
    } // 点击文章目录滚动到相应标题


    p.classList.add("catalog-item");
    p.innerHTML = "<span>" + (i + 1) + "." + "</span>" + " " + "<div>" + titles[i].$1th.el.innerText + "</div>";

    p.onclick = function () {
      titles[i].$1th.el.scrollIntoView({
        behavior: "smooth"
      });
    };

    catalog.appendChild(p);
    catalogItems.push({
      el: p,
      title: titles[i].$1th.el
    });
  };

  for (var i = 0, l = titles.length; i < l; i++) {
    _loop(i, l);
  }

  isCenter && catalog.classList.add("text-center");
  if (document.body.clientWidth <= 1200) return;
  /*
  * 监听滚动事件，实现滚动时与文章目录动态关联
  * */

  function autoScrollToCat() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

    for (var _i2 = 0, _l = catalogItems.length; _i2 < _l; _i2++) {
      if (scrollTop >= catalogItems[_i2].title.offsetTop - 10 || scrollTop + clientHeight === scrollHeight) {
        catalogItems[_i2].el.classList.add('catalog-item-active');
      } else {
        catalogItems[_i2].el.classList.remove('catalog-item-active');
      }
    }
  }

  document.addEventListener('scroll', function () {
    requestAnimationFrame(autoScrollToCat);
  });
});