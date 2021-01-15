<?php /*归档界面，按照日期、标签*/?>
<?php get_header();?>
<section id="mastcontainer" class="typo <?php echo real_header_mode();?> row-direction">
<!--    <div id="overlay"></div>-->
    <section id="posts-container" class="archive-container">

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
            <div class="post-item <?php empty($tb_url) && _e('no-thumbnail')?>">
                <div class="post-title"><h2><a href="<? the_permalink(); ?>"><? the_title(); ?></a></h2></div>
                <div class="post-meta">
<!--                    <span class="post-meta-opt post-meta-auth">--><?php //_e("作者","mingof")?><!--：--><?// the_author(); ?><!--</span>-->
                    <span class="post-meta-opt post-meta-time"><? the_time('Y-m-d'); ?></span>
                    <span class="post-meta-edit"><? edit_post_link(__("编辑","mingof")) ?></span>
                </div>
                <article class="post-excerpt">
                    <?php if(has_post_thumbnail()):?>
                        <div class="post-thumbnail"><?php the_post_thumbnail();?></div>
                    <?php endif;?>
                    <div>
                        <?php
                        the_excerpt();
                        ?>
                    </div>
                </article>
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
    <?php include('templates/go-top.php')?>
</section>
<?php if(real_header_mode()==="horizontal" || mingof_is_mobile()):?>
<?php get_template_part('templates/footer', 'm');?>
<?php endif; ?>
<?php wp_footer() ?>
