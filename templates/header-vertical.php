<!--竖向 Header-->
<div class="wrapper">
    <header id="header" class="vertical-header">
        <div id="headering">
            <?php get_template_part('templates/logo')?>
            <h1 id="name"><a href="<?php echo get_option('home');?>"><?php bloginfo('name');?></a></h1>
            <div class="description"><?php bloginfo("description");?></div>
        </div>
        <?php get_template_part('templates/nav')?>
        <!-- 此处依然需要绝对路径'templates/' 不能使用相对论路径 -->
        <?php get_template_part('templates/footer');?>
    </header>