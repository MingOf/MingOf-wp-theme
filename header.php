<!doctype html>
<html lang="<?php language_attributes()?>" class="<?php echo real_header_mode().'-header-mode' ?>">
<head>
    <meta charset="<?php bloginfo('charset');?>">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="<?php bloginfo("description"); ?>">
    <title><?php bloginfo("name");?></title>
    <?php wp_head(); ?>
</head>
<body>

    <?php $header_mode = real_header_mode();?>
    <?php if($header_mode==="vertical" && !mingof_is_mobile()): ?>
    <!--竖向 Header-->
    <div class="wrapper">
        <header id="header" class="vertical-header">
            <div id="headering">
                <div id="logo">
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
                <h1 id="name"><a href="<?php echo get_option('home');?>"><?php bloginfo('name');?></a></h1>
                <div class="description"><?php bloginfo("description");?></div>
            </div>
            <nav id="nav">
                <h1 class="nav-title">导航</h1>
                <?php wp_nav_menu(array(
                    'menu_class'=>"nav-menu",
                    'container_class'=>"nav-menu-container"
                )); ?>
            </nav>
            <nav id="catalog">
                <h1 class="nav-title">文章目录</h1>
            </nav>
            <?php get_template_part('footer');?>
        </header>

    <?php elseif ($header_mode==="horizontal" && !mingof_is_mobile()): ?>
        <!--横向 Header-->
        <header class="horizontal-header">
            <div class="header-wrapper">
                <div class="header-left">
                    <h1 class="horizontal-name"><a href="<?php echo get_option('home');?>"><?php bloginfo('name');?></a></h1>
                    <div class="description"><?php bloginfo("description");?></div>
                </div>
                <div class="header-right">
                    <?php wp_nav_menu(array(
                        'menu_class'=>"hz-nav-menu",
                        'container_class'=>"hz-nav-menu-container"
                    )); ?>
                </div>
            </div>
        </header>

    <?php elseif (mingof_is_mobile()): ?>
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
                    'menu_class'=>"nav-menu",
                    'container_class'=>"nav-menu-container"
                )); ?>
            </nav>
            <aside id="catalog" class="mb-catalog"></aside>
        </section>
        <div class="mb-wrapper">
     <?php endif;?>

