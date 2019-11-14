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
    wp_enqueue_script('iconfont','https://at.alicdn.com/t/font_1475483_cvza2re0xfb.js',[],null,true);
}
add_action('wp_enqueue_scripts', 'add_theme_scripts');

/*设置摘要*/
function new_excerpt_length () {
    return 500;
}
function new_excerpt_more($more) {
    $link = get_permalink();
    $more = '  <button class="read-more"><a href='
        .$link
        .'>'.__("阅读全文", "mingof").'  ->  '
        .'</a></button>';
    return $more;
}
add_filter('excerpt_length', 'new_excerpt_length');
add_filter('excerpt_more', 'new_excerpt_more');

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