<?php /*文章模板*/?>
<?php get_header();?>
<?php if(has_post_thumbnail()): ?>
<div id="banner"  style="background-image: url('<?php
if(has_post_thumbnail()) {
    echo wp_get_attachment_image_src( get_post_thumbnail_id(get_the_ID()), 'custom-tb-size')[0];
}
?>')">
    <?php include("banner-m.php"); ?>
</div>
<?php endif;?>
<section id="mastcontainer" class="typo <?php echo real_header_mode();?>">
<!--    <div id="overlay"></div>-->
    <section id="posts-container">
        <section class="post-wrapper <?php has_post_thumbnail() && _e('has-thumbnail')?>">
        <?php
        the_post();
        ?>
        <?php
        $visited_count = get_post_meta($post->ID,'_visited', true) ?  get_post_meta($post->ID,'_visited', true) : 0;
        update_post_meta($post->ID,'_visited', ++$visited_count);
        ?>
        <div class="post-item post-single">
            <div class="post-title"><h2><a href="<? the_permalink(); ?>"><? the_title(); ?></a></h2></div>
            <div class="post-meta">
<!--                <span class="post-meta-opt post-meta-auth">--><?php //_e("作者","mingof")?><!--：--><?// the_author(); ?><!--</span>-->
                <span class="post-meta-opt post-meta-time"><?php _e("时间","mingof")?>：<? the_time('Y-m-d'); ?></span>
<!--                <span class="post-meta-opt post-meta-visited">--><?php //_e("访问次数","mingof")?><!--：--><?php //echo get_post_meta($post->ID,'_visited', true) ?><!--</span>-->
                <span class="post-meta-edit"><? edit_post_link(__("编辑","mingof")) ?></span>
            </div>
            <div class="post-content">
                <?php
                the_content();
                ?>
            </div>
        </div>
        <ul class="post-switch">
            <li class="post-prev">
                <?php
                previous_post_link(
                    '<div class="previous">'
                    .'<span>'
                    .__("上一篇","mingof")
                    .'</span>'
                    . '%link'
                    .'</div>'
                )
                ?>
            </li>
            <li class="post-next">
                <?php
                next_post_link(
                    '<div class="next">'
                    .'<span>'
                    .__("下一篇","mingof")
                    .'</span>'
                    . '%link'
                    .'</div>'
                )
                ?>
            </li>
        </ul>
        <?php comments_template(); ?>
        </section>
    </section>
    <?php get_sidebar("侧边栏") ?>
    <?php if(real_header_mode()==="horizontal" || mingof_is_mobile()):?>
    <?php get_template_part('footer', 'm');?>
    <?php endif; ?>
</section>
<?php wp_footer() ?>


