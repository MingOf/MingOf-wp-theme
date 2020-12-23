<?php
/**
 * 检测是否为移动端，配合 real_header_mode 函数
 * @return bool
 */
function mingof_is_mobile () {
    if(wp_is_mobile()) {
        return true;
    }
    if (
        strpos($_SERVER['HTTP_USER_AGENT'], 'Mobile') !== false
        || strpos($_SERVER['HTTP_USER_AGENT'], 'Android') !== false
        || strpos($_SERVER['HTTP_USER_AGENT'], 'Silk/') !== false
        || strpos($_SERVER['HTTP_USER_AGENT'], 'Kindle') !== false
        || strpos($_SERVER['HTTP_USER_AGENT'], 'BlackBerry') !== false
        || strpos($_SERVER['HTTP_USER_AGENT'], 'Opera Mini') !== false
        || strpos($_SERVER['HTTP_USER_AGENT'], 'Opera Mobi') !== false
    ) {
        return true;
    }
    return false;
}

/**
 * 注册 sidebar
 */
register_sidebar([
    'id'    => 'sidebar-1',
    'name'  => '侧边栏',
    'before_widget' => '<div class="sidebar-widget">',
    'after_widget'  => '</div>',
    'before_title'  => '<h2>',
    'after_title'   => '</h2>'
]);
/**
 * 注册自定义菜单
 */
register_nav_menus(array(
    'main_menus'=>'主菜单',
    'mobile_menus'=>'移动端banner菜单'
));
wp_enqueue_script("jquery");

/**
 * 添加 js 或者 css
 */
function add_theme_scripts() {
    wp_enqueue_style('style', get_stylesheet_uri());
    if(!is_admin()) {
        wp_deregister_script( 'jquery' );
        wp_register_script( 'jquery', 'https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js', '', '3.5.1', false );
        wp_enqueue_script('jquery');
        wp_deregister_script('jquery-migrate');
        wp_register_script('jquery-migrate','https://cdn.bootcdn.net/ajax/libs/jquery-migrate/3.3.2/jquery-migrate.min.js','','3.3.2',false);
        wp_enqueue_script('jquery-migrate');
    }
    wp_enqueue_script('animation',get_template_directory_uri().'/assets/js/mingofAnimation.prod.js',[],null,true);
    wp_enqueue_script('changeMode',get_template_directory_uri().'/assets/js/mingofChangeMode.prod.js',[],null,false);
    wp_enqueue_script('catalog',get_template_directory_uri().'/assets/js/mingofCatalog.prod.js',[],null,true);
}
add_action('wp_enqueue_scripts', 'add_theme_scripts');

/**
 * 设置摘要的文字数量，配合 expert_read_more_link 函数
 * @return int
 */
function new_excerpt_length () {
    if (mingof_is_mobile()) {
        return 100;
    }
    return 300;
}

/**
 * @param $output
 * @return string 真正的摘要文本
 */
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
 * 匹配第一个图像作为文章的 thumbnail，配合 get_thumbnail_img 函数
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
        $first_img_url = $matches[2][0].'';
    } else {
        $first_img_url = NULL;
    }
//    var_dump($first_img_url);
    return $first_img_url;
}

/**
 * 如果有自己上传的特色图像，则使用特色图像作为 thumbnail，否则默认使用文章中出现的第一个图像（因为markdown的图像一般使用外链，所以很少使用自定义特色图像）
 * @param $post_id  文章的ID
 * @return string|null  返回真正的 thumbnail img src
 */
function get_thumbnail_img($post_id) {
    /*
     * return correct url for img src
     * if has thumbnail then use default thumbnail
     */
    $catched_img_url = catch_post_img();
    $usable_img_url = $catched_img_url;
    if ( has_post_thumbnail()) {
        $thumbnail_image_url = wp_get_attachment_image_src( get_post_thumbnail_id($post_id), 'custom-tb-size');
        $usable_img_url = '"'.$thumbnail_image_url[0].'"';
    } else if ($catched_img_url == NULL) {
        $usable_img_url = "";
    }
    return $usable_img_url;
}

/**
 * 判断 Header 是横向排版还是纵向排版，移动端强制使用纵向
 * @return string
 */
function real_header_mode () {
    if(mingof_is_mobile()) {
        return "vertical";
    } else {
        return get_option('mingof_header_mode','vertical');
    }
}

/**
 * 设置图片上传的质量，wordpress 默认会将上传图像压缩至 90%
 * @return number
 */
function set_img_quality() {
    return get_option('mingof_img_quality', 100);
}
add_filter( 'jpg_quality', 'set_img_quality' );

/**
 * 打开友情链接
 */
add_filter('pre_option_link_manager_enabled', '__return_true');

/**
 * 添加主题支持
 */
function theme_setup() {
    add_theme_support('custom-logo', array(
        'width'          => 500,
        'height'         => 500,
        'flex-width'     => false,
        'flex-height'    => false
    ));
    add_theme_support( 'post-thumbnails', array('post'));
    add_theme_support( 'title-tag' );
    add_image_size( 'custom-tb-size', get_option('mingof_tb_img_width',600), get_option('mingof_tb_img_height',400));
}
add_action('after_setup_theme', 'theme_setup');


/**
 * 注册自定义功能
 * @param $wp_customize
 */
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
        /*对应的settings*/
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


    $wp_customize->add_section('mingof_set_img_section',array(
        'title'=>__('Set Image','mingof')
    ));
    $wp_customize->add_setting('mingof_img_quality',array(
       'default'=>100,
       'type'=>'option',
       'capability'=>'edit_theme_options',
       'transport'=>'refresh'
    ));
    $wp_customize->add_control(new WP_Customize_Control($wp_customize,'img_quality',array(
        'label'=>__('Upload Image Quality(%)'),
        'section'=>'mingof_set_img_section',
        'settings'=>'mingof_img_quality',
        'type'=>'number'
    )));
    $wp_customize->add_setting('mingof_tb_img_width',array(
        'default'=>600,
        'type'=>'option',
        'capability'=>'edit_theme_options',
        'transport'=>'refresh'
    ));
    $wp_customize->add_setting('mingof_tb_img_height',array(
        'default'=>400,
        'type'=>'option',
        'capability'=>'edit_theme_options',
        'transport'=>'refresh'
    ));
    $wp_customize->add_control(new WP_Customize_Control($wp_customize,'tb_img_width',array(
        'label'=>__('set max-width(px) of thumbnail image','mingof'),
        'section'=>'mingof_set_img_section',
        'settings'=> 'mingof_tb_img_width',
        'type'=>'number'
    )));
    $wp_customize->add_control(new WP_Customize_Control($wp_customize,'tb_img_height',array(
        'label'=>__('set max-height(px) of thumbnail image','mingof'),
        'section'=>'mingof_set_img_section',
        'settings'=> 'mingof_tb_img_height',
        'type'=>'number'
    )));

}
add_action( 'customize_register', 'mingof_customize_register');

