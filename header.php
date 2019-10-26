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
</head>
<body>
    <header id="header">
        <div id="headering">
            <div id="logo"><img src="<?php echo get_template_directory_uri().'/assets/image/logo.jpg'?>" alt="logo"></div>
<!--            <h1><a href="--><?php //echo get_option('home');?><!--">--><?php //bloginfo('name');?><!--</a></h1>-->
            <h1 id="name"><a href="<?php echo get_option('home');?>">MingOf</a></h1>
            <div class="description"><?php bloginfo("description");?></div>
        </div>
        <nav id="nav"><?php wp_nav_menu()?></nav>
<!--        --><?php //get_sidebar();?>
        <?php get_footer();?>
    </header>

