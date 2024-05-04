<!--竖向 Header-->
<div class="wrapper">
    <header id="header" class="vertical-header">
        <div id="headering">
            <h1 id="name"><a href="<?php echo get_option('home');?>"><?php bloginfo('name');?></a></h1>
            <div class="description"><?php bloginfo("description");?></div>
        </div>
        <?php get_template_part('templates/nav')?>
        <?php get_template_part('templates/footer');?>
    </header>