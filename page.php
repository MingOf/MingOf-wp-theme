<?php get_header();?>
<section id="mastcontainer" class="typo <?php echo real_header_mode();?>">
<!--    <div id="overlay"></div>-->
    <div class=page-wrapper>
        <div class="page">
            <?php
            while(have_posts()) {
                the_post();
            ?>
            <h1 class='page-title'><? the_title(); ?></h1>
            <article class='page-content'><? the_content();?></article>
            <?}?>

        </div>
    </div>
</section>
<?php if(real_header_mode()==="horizontal" || mingof_is_mobile()):?>
<?php get_template_part('footer', 'm');?>
<?php endif; ?>
<?php wp_footer() ?>