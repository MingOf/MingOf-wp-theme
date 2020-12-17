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
wp_enqueue_script("jquery");

/*添加CSS和脚本*/
function add_theme_scripts() {
//    wp_enqueue_style('animation', get_template_directory_uri().'/assets/css/animation.min.css');
//    wp_enqueue_style("typo", get_template_directory_uri()."/assets/css/typo.min.css", [], null);
    wp_enqueue_style('style', get_stylesheet_uri());
    wp_enqueue_script('animation',get_template_directory_uri().'/assets/js/mingofAnimation.js',[],null,true);
    wp_enqueue_script('changeMode',get_template_directory_uri().'/assets/js/mingofChangeMode.js',[],null,false);
    wp_enqueue_script('catalog',get_template_directory_uri().'/assets/js/mingofCatalog.js',[],null,true);
//    wp_enqueue_script('iconfont','https://at.alicdn.com/t/font_1475483_cvza2re0xfb.js',[],null,true);
}
add_action('wp_enqueue_scripts', 'add_theme_scripts');

/*设置摘要*/
function new_excerpt_length () {
    return 400;
}
function excerpt_read_more_link( $output ) {
    // 根据标点符号智能断句的摘要
    $have_punctuation = preg_match_all('/[。：！!:？?]/u',$output,$matches);  //匹配摘要的标点符号
    if($have_punctuation) {
        $pos = mb_strrpos($output, $matches[0][count($matches[0])-1]); //最后一个满足条件的标点符号最后出现的位置
        $output = mb_substr($output,0,$pos+1,"utf8"); //截取摘要，从头到最后一个满足条件的标点符号最后出现的位置。
        $link = get_permalink();
    }
    $more = '  <button class="read-more"><a href='
        .$link
        .'>'.__("阅读全文", "mingof").'  →  '
        .'</a></button>';
    return $output.$more;
}

add_filter('excerpt_length', 'new_excerpt_length');
add_filter('the_excerpt', 'excerpt_read_more_link');
register_nav_menus([
    'header-menu' => __('导航菜单','mingof')
]);

/**
 * thumbnail image supported
 */
function catch_post_img() {
    /*
     * use preg to match the img_url of the post
     * if  missed then return NULL
     */
    global $post;
    $first_img_url='';
    $output = preg_match_all('/(\s+src\s?\=)\s?[\'|"]([^\'|"]*)/is', $post->post_content, $matches);
    $tmp_url = $matches[0][0];
    if ($tmp_url !== NULL) {
        $first_img_url = $matches[0][0].'"';
    } else {
        $first_img_url = NULL;
    }
    return $first_img_url;
}
function get_thumbnail_img($post_id) {
    /*
     * return correct url for img src
     * if has thumbnail then use default thumbnail
     */
    $catched_img_url = catch_post_img();
    $usable_img_url = $catched_img_url;
    if ( has_post_thumbnail()) {
        $thumbnail_image_url = wp_get_attachment_image_src( get_post_thumbnail_id($post_id), 'thumbnail');
        $usable_img_url = 'src="'.$thumbnail_image_url[0].'"';
    } else if ($catched_img_url == NULL) {
        $usable_img_url = "";
    }
    return $usable_img_url;
}

function theme_setup() {
    add_theme_support('custom-logo', array(
        'width'          => 500,
        'height'         => 500,
        'flex-width'     => false,
        'flex-height'    => false
    ));
    add_theme_support( 'post-thumbnails', array('post'));
    add_theme_support( 'title-tag' );
}
add_action('after_setup_theme', 'theme_setup');

/*注册自定义功能*/
function mingof_customize_register( $wp_customize ) {
    $wp_customize->add_setting( 'mingof_style_options[highlight_color]', array(
        'default'        => '#ff6651',
        'type'           => 'option',
        'capability'     => 'edit_theme_options',
        'transport'      => 'refresh'
    ));
    $wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'highlight_color', array(
        /*名字*/
        'label'        => __( 'Highlight Color', 'mingof' ),
        /*section属于……*/
        'section'    => 'colors',
        /*对弈的settings*/
        'settings'   => 'mingof_style_options[highlight_color]',
    )));

    $wp_customize->add_section ('mingof_set_header_section', array(
        'title'=>__('Change Header Mode', 'mingof')
    ));
    $wp_customize->add_setting('mingof_header_mode', array(
        'default'=>'vertical',
        'type'=>'option',
        'capability'=>'edit_theme_options',
        'transport'=>'refresh'
    ));
    $wp_customize->add_control(new WP_Customize_Control($wp_customize, 'header_mode', array(
       'label'=>__('Header Mode', 'mingof'),
       'section'=>'mingof_set_header_section',
       'settings'=>'mingof_header_mode',
        'type'=>'radio',
        'choices'=>array(
            'vertical'=>__('vertical','mingof'),
            'horizontal'=>__('horizontal','mingof')
        )
    )));
}
add_action( 'customize_register', 'mingof_customize_register' );

function real_header_mode () {
    if(wp_is_mobile()) {
        return "vertical";
    } else {
        return get_option('mingof_header_mode','vertical');
    }
}