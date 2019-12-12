<!doctype html>
<html lang="<?php language_attributes()?>">
<head>
    <meta charset="<?php bloginfo('charset');?>">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="<?php bloginfo("description"); ?>">
    <title><?php bloginfo("name");?></title>
    <?php wp_head(); ?>
<!--    <script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.js"></script>-->
</head>
<body>
    <header id="header">
        <div id="headering">
            <div id="logo"><?php if(has_custom_logo()) { the_custom_logo();} else { echo '<img src='.'"'.get_template_directory_uri().'/assets/image/logo.jpg'.'"'.'alt="logo"/>';}?></div>
            <h1 id="name"><a href="<?php echo get_option('home');?>"><?php bloginfo('name');?></a></h1>
            <div class="description"><?php bloginfo("description");?></div>
            <div class="nav-toggle nav-close"><span></span></div>
        </div>
        <nav id="catalog">
            <h1 class="nav-title">文章目录</h1>
        </nav>
        <nav id="nav">
            <h1 class="nav-title">导航</h1>
            <?php wp_nav_menu()?>
        </nav>
        <?php get_template_part('footer');?>
    </header>

