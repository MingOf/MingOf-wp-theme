<?php /*时间线归档页面*/?>
<?php get_header();?>
<section id="mastcontainer" class="typo">
    <div id="overlay"></div>
    <section class="timeline-container">
    <?php
    /*设置默认 page 为1*/
    /*$paged 就是 test.com/?page_id&paged=1 的paged*/
    $paged = $paged ? $paged : 1;

    $numberposts = 15; //每次查询文章的数量


//        global $wp;
//        $current_url = home_url(add_query_arg(array($_GET), $wp->request)); // 获取当前页面的链接
    $posts_count = wp_count_posts(); // 文章总数
    $posts_count = $posts_count->publish;
    $pages_count = ceil($posts_count / $numberposts); // 文章的页数
    $paged = $paged > $pages_count ? $pages_count : $paged;
    $paged = $paged < 1 ? 1 : $paged;
    $ellipsis = $paged <= ($pages_count / 2); // 如果为 true 则分页省略号在当前页号右边，如果 false 左边


    $args = array(
        'numberposts'   => $numberposts,
        'offset'           => ($paged-1) * $numberposts,
        'cat'         => '',
        'category_name'    => '',
        'orderby'          => 'date',
        'order'            => 'DESC',
        'include'          => '',
        'exclude'          => '',
        'meta_key'         => '',
        'meta_value'       => '',
        'post_type'        => 'post',
        'post_mime_type'   => '',
        'post_parent'      => '',
        'author'	   => '',
        'author_name'	   => '',
        'post_status'      => 'publish',
        'suppress_filters' => true,
        'fields'           => '',
    );

    $tl_posts = get_posts($args); //查询文章
    ?>

    <?php
    /*
     * post_groupby_year结构如下
     * array [
     *      '2019' => [
     *          'a post ID' => $post
     *      ]
     * ]
     *
     * */
    $post_groupby_year = array(); // 根据年份来组织文章
    foreach ($tl_posts as $post) {
        setup_postdata($post);
        $year = date('Y',strtotime(get_the_date('y-m-d')));
        $post_groupby_year[$year][get_the_ID()] = $post;
    }

    ?>
    <?php
    foreach ($post_groupby_year as $year => $year_value):
    ?>
        <h2 class="tl-year-title">
            <?php echo $year;?>
        </h2>
        <article class="tl-posts-container">
            <?php foreach ($year_value as $post): setup_postdata($post);?>
                <section class="tl-post-item">
                    <h5 class="tl-post">
                        <a href="<?php echo get_permalink(get_the_ID())?>">
                            <span class="tl-post-date"><?php echo get_the_date('m-d');?></span>
                            <span class="tl-post-title"><?php the_title();?></span>
                        </a>
                    </h5>
                </section>
            <?php endforeach;?>
        </article>

    <?php endforeach;?>
    </section>
    <div class="page-nav">
    <?php if($paged > 1):?>
        <a class="tl-prev-page" href="<?php echo get_previous_posts_page_link();?>">&lt;</a>
    <?php endif;?>
    <?php for($i = 1; $i <= $pages_count; $i++):?>
        <?php
            if($ellipsis) {
                /*
                 * 如果 当前页面 $paged <= 页面总数的一半，则 ellipsis 为 true , 表示省略号在页面总数一半的右边, 反之在
                 * 比如： 当前页面是 $paged == 4 , 页面总数 $pages_count = 13。那么 $ellipsis = (4 <= 13/2)
                 *
                 * 当省略号应该在右边时：
                 * */
                if($i == $pages_count - 1) {
                    /*
                     *  把页面数的最大值的前一个换成省略号。
                     * 如： 最大值是 $pages_count = 13, 则第 12 个button 换成 省略号
                     * */
                    echo '<button class="tl-page-num">...</button>';
                    continue;
                }
                elseif ($i > $paged + 1 && $i < $pages_count ) {
                    /*
                     * i 值遍历到当前页数的下一个就直接跳过遍历
                     * 如： 当前页面 $paged = 4, 则结果应该为 1 2 3 4 5 ... 13
                     * */
                    continue;
                }
            }
            else {
                /*
                 * 当省略号在左边时：
                 * */
                if($i === 2 ) {
                    /*
                     * 把第二个 button 变为 省略号
                     * */
                    echo '<button class="tl-page-num">...</button>';
                    continue;
                } elseif ( $i > 2 && $i < $paged - 1 ) {
                    /*
                     *  从 i 值 为 3 开始直接跳过 创建button的循环, 直到当前页的前一页
                     * 如：1 ... 7 8 9 10 11 12 13
                    */
                    continue;
                }
            }
            ?>
            <a class="page-numbers <?php if($paged === $i) { echo 'current';} ?>" href="<?php
            if($paged !== $i) {
                echo get_pagenum_link($i);
            } else {
                echo "javascript:";
            }
            ?>"><?php echo $i; ?></a>

    <?php endfor;?>
    <?php if($paged < $pages_count):?>
        <a class="tl-next-page" href="<?php echo get_next_posts_page_link();?>">&gt;</a>
    <?php endif;?>
    </div>
</section>
<?php get_template_part('footer', 'm');?>
<?php wp_footer() ?>

