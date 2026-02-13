<!doctype html>
<html lang="<?php language_attributes()?>" class="<?php echo real_header_mode().'-header-mode' ?> <?php mingof_is_mobile() && _e('mobile');?>">
<head>
    <meta charset="<?php bloginfo('charset');?>">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="<?php bloginfo("description"); ?>">
    <!-- <title><?php  //bloginfo("name");?></title> -->
    <?php get_template_part('templates/style-variable') ?>
    <?php wp_head(); ?>
</head>
<body