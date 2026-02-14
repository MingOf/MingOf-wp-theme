<!--竖向 Header-->
<div class="wrapper">
    <header id="header" class="vertical-header">
        <div id="headering">
            <h1 id="name"><a href="<?php echo esc_url(home_url('/')); ?>"><?php echo esc_html(get_bloginfo('name')); ?></a></h1>
            <div class="description"><?php echo esc_html(get_bloginfo('description', 'display')); ?></div>
        </div>
        <?php get_template_part('templates/nav')?>
        <?php get_template_part('templates/footer');?>
    </header>
