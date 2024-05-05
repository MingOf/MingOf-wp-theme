/*
* 初始化文章目录， 使用遍历节点的方式
* */
interface catalogElement {
    el: HTMLElement | Element;
}
interface catalogReturns {
    length: number;
    [index: number]: { $1th: any, $2th: any }
}


document.addEventListener("DOMContentLoaded", function () {

    // 如果屏幕宽度小于1200， 则终止，不显示目录
    if (document.body.clientWidth <= 1200) return;

    let el = document.getElementsByClassName("post-content") && document.getElementsByClassName("post-content")[0];
    let headering = document.getElementById("headering")

    // 如果没有 文章内容则终止
    if (!el) {
        return;
    }

    let header = document.getElementById("header");
    if (!header) {
        return;
    }

    /**
     * 初始化目录
     * @param el 目录元素的引用，类型为catalogElement['el']
     * @returns 返回一个目录结构数组，数组中包含了整理后的各级标题信息
     * 
     * 该函数主要用于解析给定元素内的标题（h1-h6），生成一个树状的目录结构。
     * 每个目录项包含标签名、文本内容、可选的name属性和原始HTML元素的引用。
     * 具体操作包括：
     * - 遍历元素的子节点，筛选出标题标签，并收集它们的信息；
     * - 根据标题标签的级别组织目录结构，区分一级和二级标题；
     * - 为相应的HTML元素添加类名以做标记。
     */
    function initCatalog(el: catalogElement['el']): catalogReturns {
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
            els = el.children;
        } else {
            els = el.querySelectorAll("h1, h2, h3, h4, h5, h6");
        }
        for (let i = 0; i < els.length; i++) {
            // 遍历所给元素el 的所有子节点中是标题标签的节点
            if (els[i].nodeType === 1 && /H\d/i.test(els[i].nodeName)) {
                // let name = els[i].getElementsByTagName('a')[0].getAttribute('name');
                let name = els[i].getAttribute('name');
                hArr.push({ tag: els[i].nodeName.toLowerCase(), text: els[i].innerText, name: name, el: els[i] });
            }
        }
        if (hArr.length <= 0) {
            return []
        }
        let titles = []; // 存放目录的数组，包含1级和2级目录
        let level1tag = hArr[0].tag; // 第一次出现的h标签就是第一层标题对应的标签: 比如第一次出现的是<h3>
        let level2tag = '';          // 第二层级的标题对应的标签; 比如可能是任何大于h3的标签，如<h4>,<h5>,<h6>
        let $2th: any = []; // 二级标题数组
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

    let titles = initCatalog(el);
    console.log(titles)
    // 如果文章内容没有标题则终止
    if (titles.length === 0) {
        return;
    }


    /**
     * 生成目录列表单元
     * @param listElementsName - 创建的列表元素的类型（如'li'）
     * @param innerHTML - 列表元素的内部HTML内容
     * @returns 返回创建并已填充内容的列表元素
     */
    function generateCatalogList(listElementsName: string, innerHTML: string, index: Number) {
        // 创建一个指定类型的列表元素
        let list = document.createElement(listElementsName);
        // 添加一个名为'catalog-item'的CSS类
        list.classList.add("catalog-item");
        list.id = `catalog-item-${index}`;
        // 设置列表元素的内部HTML为传入的内容
        list.innerHTML = innerHTML;
        return list; // 返回已配置的列表元素
    }

    // 如果有目录则显示"文章目录"类别
    let catalog = document.createElement("ol");
    catalog.id = "catalog";
    header.appendChild(catalog);
    let lists: any = [];

    for (let i = 0, l = titles.length; i < l; i++) {
        let list = generateCatalogList("li", titles[i].$1th.el.innerText, i)
        list.onclick = function () {
            titles[i].$1th.el.scrollIntoView({
                behavior: "smooth"
            });
        };
        for (let j = 0, k = titles[i].$2th.length; j < k; j++) {
            titles[i].$2th[j].el.onclick = function () {
                titles[i].$2th[j].el.scrollIntoView({
                    behavior: "smooth"
                });
            };
        }
        catalog.appendChild(list);
        lists.push(list);
    }

    /*
    * 监听滚动事件，实现滚动时与文章目录动态关联
    * */
    function autoScrollToCatalog() {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        for (let i = 0, l = titles.length; i < l; i++) {
            if (scrollTop >= titles[i].$1th.el.offsetTop - 10 || scrollTop + clientHeight === scrollHeight) {
                lists[i].classList.add('catalog-item-active');
            } else {
                lists[i].classList.remove('catalog-item-active');
            }
        }
    }
    document.addEventListener('scroll', function () {
        requestAnimationFrame(() => {
            debounce(100, () => {
                autoScrollToCatalog();
                if (document.documentElement.scrollTop === 0) {
                    headering && headering.scrollIntoView({ behavior: "smooth" });
                } else {
                    // behavior:"smooth" 存在滚动问题, 采用防抖后可以消除影响
                    catalog.scrollIntoView({ behavior: "smooth" })
                }
            })
        });
    });
});
