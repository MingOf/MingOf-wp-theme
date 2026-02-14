<?php get_header();?>
<section id="mastcontainer" class="typo <?php echo real_header_mode();?> row-direction">
    <section id="posts-container">
        <?php
        if ( have_posts()) {
            while( have_posts()) {
//                    获取日志信息，并且将信息存入全局变量 $post 中
                the_post();
        ?>
         <?php $tb_url=get_thumbnail_img(get_the_ID());?>
        <div class="post-item <?php empty($tb_url) && _e('no-thumbnail')?>">
            <div class="post-title"><h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2></div>
            <div class="post-meta">
                <span class="post-meta-opt post-meta-cate"><?php the_category(','); ?></span>
                <span class="post-meta-opt post-meta-time"><?php the_time('Y-m-d'); ?></span>
                <span class="post-meta-edit"><?php edit_post_link(__("编辑","mingof")) ?></span>
            </div>
            <article class="post-excerpt">
                <?php if($tb_url!==""):?>
                <a class="thumb-link" href="<?php the_permalink();?>">
                    <div class="post-thumbnail" style='background-image: url(<?php echo $tb_url?>)' alt="" onerror="thumbnail_error(this)">
                        <span>☕图片在火星，正在赶来...</span>
                    </div>
                </a>
                <?php endif;?>
                <?php
                the_excerpt();
                ?>
            </article>
            <!-- <div class="divider $post_"></div> -->
        </div>
        <?php
            }
        } else {
            echo '[・ヘ・?]';
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
<?php get_template_part('templates/go-top')?>
<?php wp_footer(); ?>
