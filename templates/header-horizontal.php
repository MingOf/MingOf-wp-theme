<!--横向 Header-->
<header class="horizontal-header">
    <div class="header-wrapper">
        <div class="header-left">
            <h1 class="horizontal-name"><a href="<?php echo get_option('home');?>"><?php bloginfo('name');?></a></h1>
            <div class="description"><?php bloginfo("description");?></div>
        </div>
        <div class="header-right">
            <?php wp_nav_menu(array(
                'theme_location'=>'main_menus',
                'menu_class'=>"hz-nav-menu",
                'container_class'=>"hz-nav-menu-container"
            )); ?>
        </div>
    </div>
</header>