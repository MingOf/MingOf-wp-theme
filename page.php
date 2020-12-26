<?php get_header();?>
<section id="mastcontainer" class="typo <?php echo real_header_mode();?>">
<!--    <div id="overlay"></div>-->
    <div class=custom-page-wrapper>
        <div class="custom-page">
            <?php
            while(have_posts()) {
                the_post();
            ?>
            <h1 class='custom-page-title'><? the_title(); ?></h1>
            <article class='custom-page-content'><? the_content();?></article>
            <?}?>

        </div>
    </div>
    <?php include('templates/go-top.php')?>
</section>
<?php wp_footer() ?>