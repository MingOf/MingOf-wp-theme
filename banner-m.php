<div id="banner"  style="background-image: url('<?php
if(has_post_thumbnail()) {
    echo wp_get_attachment_image_src( get_post_thumbnail_id(get_the_ID()), 'thumbnail')[0];
} else {
    echo get_template_directory_uri().'/assets/image/banner.jpg';
}
?>')">
    <div id="banner-headering">
        <h1 id="banner-name"><a href="<?php echo get_option('home');?>"><?php bloginfo('name');?></a></h1>
    </div>
    <div id="banner-logo">
        <?php
        if(has_custom_logo()) {
            the_custom_logo();
        } else {
            echo '<a href='.'"'.get_bloginfo("url").'"'.' class="custom-logo-link" rel="home">'.
                '<img src='.'"'.get_template_directory_uri().'/assets/image/logo.png'.'"'.'alt="logo"/>'.
                '</a>';
        }
        ?>
    </div>
    <div id="banner-nav">
        <?php wp_nav_menu(array(
            'menu_class'=>"banner-menu",
            'container_class'=>"banner-nav-container"
        )); ?>
    </div>
    <div class="description"><?php bloginfo("description");?></div>
</div>
