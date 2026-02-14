<!doctype html>
<html <?php language_attributes(); ?> class="<?php echo esc_attr(real_header_mode() . '-header-mode' . (mingof_is_mobile() ? ' mobile' : '')); ?>">
<head>
    <meta charset="<?php echo esc_attr(get_bloginfo('charset')); ?>">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="<?php echo esc_attr(get_bloginfo('description', 'display')); ?>">
    <!-- <title><?php  //bloginfo("name");?></title> -->
    <?php get_template_part('templates/style-variable') ?>
    <?php wp_head(); ?>
</head>
<body
