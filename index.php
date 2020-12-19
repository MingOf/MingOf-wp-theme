<?php get_header();?>
<div id="banner"  style="background-image: url('<?php
echo get_template_directory_uri().'/assets/image/banner.jpg';
?>')">
<?php include('banner-m.php');?>
</div>
<section id="mastcontainer" class="typo <?php echo real_header_mode();?>">
    <section id="posts-container">
        <?php
        if ( have_posts()) {
            while( have_posts()) {
//                    获取日志信息，并且将信息存入全局变量 $post 中
                the_post();
        ?>
        <div class="post-item">
            <div class="post-title"><h2><a href="<? the_permalink(); ?>"><? the_title(); ?></a></h2></div>
            <div class="post-meta">
                <span class="post-meta-opt post-meta-cate"><?php _e("分类","mingof")?>：<? the_category(','); ?></span>
<!--                <span class="post-meta-opt post-meta-auth">--><?php //_e("作者","mingof")?><!--：--><?// the_author(); ?><!--</span>-->
                <span class="post-meta-opt post-meta-time"><?php _e("时间","mingof")?>：<? the_time('Y-m-d'); ?></span>
                <span class="post-meta-edit"><? edit_post_link(__("编辑","mingof")) ?></span>
            </div>
            <article class="post-excerpt">
                <?php if(get_thumbnail_img(get_the_ID())!==""):?>
                <a class="thumb-link" href="<?php the_permalink();?>">
                    <img class="post-thumbnail" <?php echo get_thumbnail_img(get_the_ID());?> alt="" onerror="thumbnail_error(this)">
                </a>
                <?php endif;?>
                <div>
                    <?php
                    the_excerpt();
                    ?>
                </div>
            </article>
            <div class="divider $post_"></div>
        </div>
        <?php
            }
        } else {
            echo 'nothing';
        }
        rewind_posts();
        ?>
        <div class="page-nav-wrapper">
            <div class="page-nav">
                <?php
                global $wp_query;
                echo paginate_links([
                    'format' => '?paged=%#%',
                    'current' => max( 1, get_query_var('paged') ),
                    'total' => $wp_query->max_num_pages,
                    'prev_text' => __('<', 'mingof'),
                    'next_text' => __('>', 'mingof')
                ]);?>
            </div>
        </div>
    </section>
    <?php get_sidebar("侧边栏"); ?>
</section>
<?php get_template_part('footer', 'm');?>
<?php wp_footer(); ?>

