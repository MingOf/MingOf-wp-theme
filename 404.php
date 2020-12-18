<?php /*404*/?>
<?php get_header();?>
<section id="mastcontainer" class="typo <?php echo real_header_mode();?>">
    <div id="overlay"></div>
    <div id="not-found" class="center-align">
        <p class="not-found-icon">
            <svg class="icon icon-yiwen" aria-hidden="true">
                <use xlink:href="#icon-yiwen"></use>
            </svg>
        </p>
        <p class="not-found-title">404</p>
        <p class="not-found-desc"><?php _e("这里没得东西",'mingof')?></p>
    </div>
</section>
<?php get_template_part('footer', 'm');?>
<?php wp_footer() ?>

