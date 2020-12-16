<?php get_header();?>
<section id="mastcontainer" class="typo <?php echo real_header_mode();?>">
    <div id="overlay"></div>
    <div id="about">
        <?php
        while(have_posts()) {
            the_post();
            the_content();
        }
        ?>
    </div>
</section>
<?php get_template_part('footer', 'm');?>
<?php wp_footer() ?>


