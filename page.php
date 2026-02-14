<?php get_header();?>
<section id="mastcontainer" class="typo <?php echo esc_attr(real_header_mode()); ?>">
<!--    <div id="overlay"></div>-->
    <div class=custom-page-wrapper>
        <div class="custom-page">
            <?php
            while(have_posts()) {
                the_post();
            ?>
            <h1 class='custom-page-title'><?php the_title(); ?></h1>
            <article class='custom-page-content'><?php the_content();?></article>
            <?php 
            }
            ?>

        </div>
    </div>
</section>
<?php include('templates/go-top.php')?>
<?php wp_footer() ?>
