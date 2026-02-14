<div id="banner-headering">
    <h1 id="banner-name"><a href="<?php echo esc_url(home_url('/')); ?>"><?php echo esc_html(get_bloginfo('name')); ?></a></h1>
</div>
<div id="banner-logo">
    <?php
    if(has_custom_logo()) {
        the_custom_logo();
    } else {
        echo '<a href="' . esc_url(home_url('/')) . '" class="custom-logo-link" rel="home">' .
            '<img src="' . esc_url(get_template_directory_uri() . '/assets/image/logo.png') . '" alt="logo"/>' .
            '</a>';
    }
    ?>
</div>
<div id="banner-nav">
    <?php wp_nav_menu(array(
        'theme_location'=>'mobile_menus',
        'menu_class'=>"banner-menu",
        'container_class'=>"banner-nav-container",
        'depth'=>1
    )); ?>
</div>
<div class="description"><?php echo esc_html(get_bloginfo('description', 'display')); ?></div>
