<?php get_header();?>
<section id="mastcontainer" class="typo">
    <div id="overlay"></div>
    <section id="posts-container">

        <?php
        if ( have_posts()) {
        ?>
        <div class="posts-cate-title">
            <?php
            if (is_category()) {
                if (in_category(1)) {
                    echo single_cat_title() . __("文章", 'mingof');
                } else {
                    echo '「 ';
                    echo single_cat_title();
                    echo ' 」';
                    echo __("分类中的文章", 'mingof');

                }
            } else if (is_tag()) {
                echo '「 ';
                echo single_tag_title();
                echo ' 」';
                echo __("标签中的文章", 'mingof');
            } else if (is_date() && !is_day()) {
                echo '「 ';
                echo single_month_title();
                echo ' 」';
                echo __("的文章", 'mingof');
            } else if (is_day()) {
                echo get_the_date().__("的文章",'mingof');
            }
            ?>
        </div>
        <?php
            while( have_posts()) {
//                    获取日志信息，并且将信息存入全局变量 $post 中
                the_post();
        ?>
            <div class="post-item">
                <div class="post-title"><h2><a href="<? the_permalink(); ?>"><? the_title(); ?></a></h2></div>
                <div class="post-meta">
                    <span class="post-meta-opt post-meta-auth"><?php _e("作者","mingof")?>：<? the_author(); ?></span>
                    <span class="post-meta-opt post-meta-time"><?php _e("时间","mingof")?>：<? the_time('Y-m-d'); ?></span>
                    <span class="post-meta-edit"><? edit_post_link(__("编辑","mingof")) ?></span>
                </div>
                <div class="post-excerpt">
                    <?php
                    the_excerpt();
                    ?>
                </div>
                <div class="divider"></div>
            </div>
        <?php
            }
        } else {
            echo "没有文章";
        }
        ?>
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
    </section>
    <?php get_sidebar("侧边栏") ?>
</section>
<?php wp_footer() ?>

