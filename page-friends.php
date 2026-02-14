<?php get_header();?>
<section id="mastcontainer" class="typo <?php echo esc_attr(real_header_mode()); ?>">
    <div class="custom-page-wrapper">
    <section class="links">
        <?php
        while(have_posts()) {
            the_post();
        }
        ?>
        <h1 class="links-main-title"><?php the_title();?></h1>
        <p class="link-main-desc"><?php the_content();?></p>
        <?php
        function get_friends_links ($term_id=null) {
            $bookmarks = get_bookmarks(array(
                'orderby'   => 'name',
                'order'     => 'ASC',
                'category'  => $term_id ? absint($term_id) : 0,
            ));
            $output = '';
            if(!empty($bookmarks)) {
                $output .= '<ul class="links-list">';
                foreach($bookmarks as $bookmark) {
                    $link_image = $bookmark->link_image;
                    if($link_image == '') {
                        $link_image = trailingslashit($bookmark->link_url) . 'favicon.ico';
                    }
                    $output .= sprintf(
                        '<a href="%1$s" target="%2$s" title="%3$s" rel="noopener noreferrer"><li class="links-item"><div class="links-item-fav" style="background-image:url(\'%4$s\')"></div><div class="links-item-detail"><div class="links-item-href">%5$s</div><div class="links-item-desc">%6$s</div></div></li></a>',
                        esc_url($bookmark->link_url),
                        esc_attr($bookmark->link_target ?: '_blank'),
                        esc_attr($bookmark->link_url),
                        esc_url($link_image),
                        esc_html($bookmark->link_name),
                        esc_html($bookmark->link_description)
                    );
                }
                $output .= '</ul>';
            }
            return $output;
        }

        $linkcats = get_terms('link_category');
        $result = '';
        if (!empty($linkcats)) {
            foreach ($linkcats as $linkcat) {
                $result .= '<h3 class="links-cat-title">' . esc_html($linkcat->name) . '</h3>';
                $result .= '<div class="links-cat-desc">' . wp_kses_post($linkcat->description) . '</div>';
                $result .= get_friends_links($linkcat->term_id);
            }
        } else {
            $result = get_friends_links();
        }
        echo $result;
        ?>
        <?php comments_template();?>
    </section>
    </div>
</section>
<?php include('templates/go-top.php')?>
<?php wp_footer(); ?>
