<?php get_header();?>
<section id="mastcontainer" class="typo <?php echo real_header_mode();?>">
<!--    <div id="overlay"></div>-->
    <div class=page-wrapper>
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
<?php if(real_header_mode()==="horizontal" || mingof_is_mobile()):?>
<?php get_template_part('footer', 'm');?>
<?php endif; ?>
<?php wp_footer() ?>


