/*
* 初始化文章目录， 使用遍历节点的方式
* */
interface catalogElement {
  el: HTMLElement | Element;
}
interface catalogReturns {
  length: number;
  [index:number] : { $1th: any, $2th: any}
}
function initCatalog(el:catalogElement['el']):catalogReturns {
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
  let hArr = [];
  let els;
  if (!el.querySelectorAll) {
      els = el.querySelectorAll("h1, h2, h3, h4, h5, h6");
  } else {
      els = el.children;
  }
  for (let i = 0; i < els.length; i++) {
      // 遍历所给元素el 的所有子节点中是标题标签的节点
      if (els[i].nodeType === 1 && /H\d/i.test(els[i].nodeName)) {
          // let name = els[i].getElementsByTagName('a')[0].getAttribute('name');
          let name = els[i].getAttribute('name');
          hArr.push({tag: els[i].nodeName.toLowerCase(), text: els[i].innerText, name: name, el: els[i]});
      }
  }
  if (hArr.length <= 0) {
      return []
  }
  let titles = []; // 存放目录的数组，包含1级和2级目录
  let level1tag = hArr[0].tag; // 第一次出现的h标签就是第一层标题对应的标签: 比如第一次出现的是<h3>
  let level2tag = '';          // 第二层级的标题对应的标签; 比如可能是任何大于h3的标签，如<h4>,<h5>,<h6>
  let $2th:any = []; // 二级标题数组
  for (let i = 0; i < hArr.length; i++) {
      let obj = { // 每一个第一级标题下面对应了一组第二级标题
          $1th: {}, // 第一级标题
          $2th: [] //  第二级标题
      };
      if (hArr[i].tag === level2tag) {
          $2th.push(hArr[i]); // 如果当前标题2级标题， 那么将该2级标题push 到 $2th, 并且跳过后面的代码；如果下一个标题还是2级标题， 则继续push并跳过
          hArr[i].el.classList.add('catalog-title');
          hArr[i].el.classList.add('ct-level2');
          continue
      } else if (hArr[i].tag === level1tag) {
          // 动态确定第二层标题对应的标签 level2Tag； 可能是任何大于<h3>的标签， 如h4, h5, h6
          for (let j = i + 1; j < hArr.length; j++) {
              if (hArr[j].tag > level1tag) {
                  level2tag = hArr[j].tag;
                  break
              }
          }
          obj.$1th = hArr[i];
          hArr[i].el.classList.add('catalog-title');
          hArr[i].el.classList.add('ct-level1');
          $2th = []; // 如果检测到1级的标题， 则置$2th 为空
      } else {
          // 第三级 及 深层次的目录标题直接忽略
          continue
      }
      obj.$2th = $2th;
      titles.push(obj);
  }
  return titles
}

document.addEventListener("DOMContentLoaded", function () {
  let el = document.getElementsByClassName("post-content") && document.getElementsByClassName("post-content")[0];
  let catalog = document.getElementById('catalog'); //目录
  if(!catalog) return;
  if (!el) {
      catalog.style.display = "none";
      return;
  }

  let navTitles = document.getElementsByClassName('nav-title'); // 导航类别，如"文章目录"，"导航"
  let titles = initCatalog(el);

  if (titles.length === 0) {
      catalog.style.display = "none";
      return;
  }


  catalog.style.display = 'block'; // 如果有目录则显示"文章目录"类别

  let catalogItems:any = [];
  let isCenter = true;
  for (let i = 0, l = titles.length; i < l; i++) {
      let p = document.createElement('p');
      if (titles[i].$1th.el.innerText.length >= 10) {
          isCenter = false;
      }
      // 点击文章目录滚动到相应标题
      p.classList.add("catalog-item");
      p.innerHTML = "<span>" + (i + 1) + "." + "</span>" + " " + "<div>" + titles[i].$1th.el.innerText + "</div>";
      p.onclick = function () {
          titles[i].$1th.el.scrollIntoView({
              behavior: "smooth"
          });
      };
      catalog.appendChild(p);
      catalogItems.push({el: p, title: titles[i].$1th.el});
  }
  isCenter && catalog.classList.add("text-center");
  if(document.body.clientWidth <= 1200) return;
  /*
  * 监听滚动事件，实现滚动时与文章目录动态关联
  * */
 function autoScrollToCat () {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      for (let i = 0, l = catalogItems.length; i < l; i++) {
          if (scrollTop >= catalogItems[i].title.offsetTop - 10 || scrollTop + clientHeight === scrollHeight) {
              catalogItems[i].el.classList.add('catalog-item-active');
          } else {
              catalogItems[i].el.classList.remove('catalog-item-active');
          }
      }
 }
  document.addEventListener('scroll', function () {
      requestAnimationFrame(autoScrollToCat);
  });
});
