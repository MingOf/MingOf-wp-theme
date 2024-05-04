<!--移动端专用 Header-->
<header class="mb-header-toggle-bar">
    <div id="headering">
        <h1 id="name"><a href="<?php echo get_option('home');?>"><?php bloginfo('name');?></a></h1>
        <div class="nav-toggle nav-close"><span class="nav-touch-area"></span></div>
    </div>
</header>
<section class="mb-header-side">
    <nav class="mb-nav">
        <?php wp_nav_menu(array(
            'theme_location'=>'main_menus',
            'menu_class'=>"nav-menu",
            'container_class'=>"nav-menu-container"
        )); ?>
    </nav>
    <aside id="catalog" class="mb-catalog"></aside>
</section>