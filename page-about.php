<?php get_header();?>
<section id="mastcontainer">
    <div id="overlay"></div>
    <div id="about">
        <h1>About</h1>
        <?php
        while(have_posts()) {
            the_post();
            the_content();
        }
        ?>
    </div>
</section>
<?php wp_footer() ?>


