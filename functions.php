<?php
/*注册sidebar*/
register_sidebar([
    'id'    => 'sidebar-1',
    'name'  => '侧边栏',
    'before_widget' => '<div class="sidebar-widget">',
    'after_widget'  => '</div>',
    'before_title'  => '<h2>',
    'after_title'   => '</h2>'
]);

/*添加CSS和脚本*/
function add_theme_scripts() {
    wp_enqueue_style('animation', get_template_directory_uri().'/assets/css/animation.css');
    wp_enqueue_style("typo", get_template_directory_uri()."/assets/css/typo.css", [], null);
    wp_enqueue_style('style', get_stylesheet_uri());
//    wp_enqueue_script('canvas-nest', get_template_directory_uri().'/assets/js/canvas-nest.js',[], null, true);
    wp_enqueue_script('animation',get_template_directory_uri().'/assets/js/animation.js',[],null,true);
    wp_enqueue_script('catalog',get_template_directory_uri().'/assets/js/catalog.js',[],null,true);
    wp_enqueue_script('iconfont','https://at.alicdn.com/t/font_1475483_cvza2re0xfb.js',[],null,true);
}
add_action('wp_enqueue_scripts', 'add_theme_scripts');

/*设置摘要*/
function new_excerpt_length () {
    return 600;
}
function excerpt_read_more_link( $output ) {
    // 根据标点符号智能断句的摘要
    preg_match_all('/[。：！!:？?]/u',$output,$matches);  //匹配摘要的标点符号
    $pos = mb_strrpos($output, $matches[0][count($matches[0])-1]); //最后一个满足条件的标点符号最后出现的位置
    $output = mb_substr($output,0,$pos+1,"utf8"); //截取摘要，从头到最后一个满足条件的标点符号最后出现的位置。
    $link = get_permalink();
    $more = '  <button class="read-more"><a href='
        .$link
        .'>'.__("阅读全文", "mingof").'  ->  '
        .'</a></button>';
    return $output.$more;
}
//function new_excerpt_more($more) {
//    $link = get_permalink();
//    $more = '  <button class="read-more"><a href='
//        .$link
//        .'>'.__("阅读全文", "mingof").'  ->  '
//        .'</a></button>';
//    return $more;
//}

add_filter('excerpt_length', 'new_excerpt_length');
//add_filter('excerpt_more', 'new_excerpt_more');
add_filter('the_excerpt', 'excerpt_read_more_link');
register_nav_menus([
    'header-menu' => __('导航菜单','mingof')
]);

function theme_setup() {
    add_theme_support('custom-logo', array(
        'width'          => 380,
        'height'         => 150,
        'flex-width'     => true,
        'flex-height'    => true
    ));
    add_theme_support( 'post-thumbnails', array('post'));
    add_theme_support( 'title-tag' );
}
add_action('after_setup_theme', 'theme_setup');