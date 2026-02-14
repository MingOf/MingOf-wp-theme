<?php get_header();?>
<section id="mastcontainer" class="typo <?php echo esc_attr(real_header_mode()); ?>">
<!--    <div id="overlay"></div>-->
    <div class="custom-page-wrapper">
        <div id="about">
            <?php
            while(have_posts()) {
                the_post();
                the_content();
            }
            ?>
        </div>
    </div>
</section>
<?php include('templates/go-top.php')?>
<?php if(real_header_mode()==="horizontal" || mingof_is_mobile()):?>
<?php get_template_part('templates/footer', 'm');?>
<?php endif; ?>
<?php wp_footer() ?>

