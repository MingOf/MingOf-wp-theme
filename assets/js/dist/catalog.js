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
    if (!el)
        throw "el is not a HTMLElement";
    var hArr = [];
    var els;
    if (!el.querySelectorAll) {
        els = el.children;
    }
    else {
        els = el.querySelectorAll("h1, h2, h3, h4, h5, h6");
    }
    for (var i = 0; i < els.length; i++) {
        // 遍历所给元素el 的所有子节点中是标题标签的节点
        if (els[i].nodeType === 1 && /H\d/i.test(els[i].nodeName)) {
            // let name = els[i].getElementsByTagName('a')[0].getAttribute('name');
            var name = els[i].getAttribute('name');
            hArr.push({ tag: els[i].nodeName.toLowerCase(), text: els[i].innerText, name: name, el: els[i] });
        }
    }
    if (hArr.length <= 0) {
        return [];
    }
    var titles = []; // 存放目录的数组，包含1级和2级目录
    var level1tag = hArr[0].tag; // 第一次出现的h标签就是第一层标题对应的标签: 比如第一次出现的是<h3>
    var level2tag = ''; // 第二层级的标题对应的标签; 比如可能是任何大于h3的标签，如<h4>,<h5>,<h6>
    var $2th = []; // 二级标题数组
    for (var i = 0; i < hArr.length; i++) {
        var obj = {
            $1th: {},
            $2th: [] //  第二级标题
        };
        if (hArr[i].tag === level2tag) {
            $2th.push(hArr[i]); // 如果当前标题2级标题， 那么将该2级标题push 到 $2th, 并且跳过后面的代码；如果下一个标题还是2级标题， 则继续push并跳过
            hArr[i].el.classList.add('catalog-title');
            hArr[i].el.classList.add('ct-level2');
            continue;
        }
        else if (hArr[i].tag === level1tag) {
            // 动态确定第二层标题对应的标签 level2Tag； 可能是任何大于<h3>的标签， 如h4, h5, h6
            for (var j = i + 1; j < hArr.length; j++) {
                if (hArr[j].tag > level1tag) {
                    level2tag = hArr[j].tag;
                    break;
                }
            }
            obj.$1th = hArr[i];
            hArr[i].el.classList.add('catalog-title');
            hArr[i].el.classList.add('ct-level1');
            $2th = []; // 如果检测到1级的标题， 则置$2th 为空
        }
        else {
            // 第三级 及 深层次的目录标题直接忽略
            continue;
        }
        obj.$2th = $2th;
        titles.push(obj);
    }
    return titles;
}
function generateCatalogList(listElementsName, innerHTML) {
    var list = document.createElement(listElementsName);
    list.classList.add("catalog-item");
    list.innerHTML = innerHTML;
    return list;
}
document.addEventListener("DOMContentLoaded", function () {
    // 如果屏幕宽度小于1200， 则终止，不显示目录
    if (document.body.clientWidth <= 1200)
        return;
    var el = document.getElementsByClassName("post-content") && document.getElementsByClassName("post-content")[0];
    var headering = document.getElementById("headering");
    // 如果没有 文章内容则终止
    if (!el) {
        return;
    }
    var titles = initCatalog(el);
    // 如果文章内容没有标题则终止
    if (titles.length === 0) {
        return;
    }
    var header = document.getElementById("header");
    if (!header) {
        return;
    }
    // 如果有目录则显示"文章目录"类别
    var catalog = document.createElement("ol");
    catalog.id = "catalog";
    header.appendChild(catalog);
    // 每个标题的目录项
    var catalogItems = [];
    var _loop_1 = function (i, l) {
        var list = generateCatalogList("li", titles[i].$1th.el.innerText);
        // let p = document.createElement('p');
        // 点击文章目录滚动到相应标题
        // p.classList.add("catalog-item");
        // p.innerHTML = "<span>" + (i + 1) + "." + "</span>" + " " + "<div>" + titles[i].$1th.el.innerText + "</div>";
        list.onclick = function () {
            titles[i].$1th.el.scrollIntoView({
                behavior: "smooth"
            });
        };
        catalog.appendChild(list);
        catalogItems.push({ el: list, title: titles[i].$1th.el });
    };
    for (var i = 0, l = titles.length; i < l; i++) {
        _loop_1(i, l);
    }
    /*
    * 监听滚动事件，实现滚动时与文章目录动态关联
    * */
    function autoScrollToCatalog() {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        for (var i = 0, l = catalogItems.length; i < l; i++) {
            if (scrollTop >= catalogItems[i].title.offsetTop - 10 || scrollTop + clientHeight === scrollHeight) {
                catalogItems[i].el.classList.add('catalog-item-active');
            }
            else {
                catalogItems[i].el.classList.remove('catalog-item-active');
            }
        }
    }
    document.addEventListener('scroll', function () {
        requestAnimationFrame(function () {
            autoScrollToCatalog();
            if (document.documentElement.scrollTop === 0) {
                headering && headering.scrollIntoView({ behavior: "smooth" });
            }
            else {
                // behavior:"smooth" 存在滚动问题
                catalog.scrollIntoView({ behavior: "instant" });
            }
        });
    });
});
