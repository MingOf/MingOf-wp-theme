<?php get_header();?>
<section id="mastcontainer" class="typo <?php echo real_header_mode();?>">
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
                'orderby'=>'data',
                'order'=>'asc',
            ));
            $output = '';
            if(!empty($bookmarks)) {
                $output .= '<ul class="links-list">';
                foreach($bookmarks as $bookmark) {
                    $link_image=$bookmark->link_image;
                    if($link_image == '') {
                        $link_image = $bookmark->link_url.'/favicon.ico';
                    }
                    $output .= <<<EOT
                        <a href="{$bookmark->link_url}" target="{$bookmark->link_target}" title="{$bookmark->link_url}">
                        <li class="links-item">
                            <div class="links-item-fav" style="background-image:url('{$link_image}')"></div>
                            <div class="links-item-detail">
                                    <div class="links-item-href">{$bookmark->link_name}</div>
<!--                                <a class="links-item-href" href="{$bookmark->link_url}" target="{$bookmark->link_target}" title="{$bookmark->link_url}">{$bookmark->link_name}</a>-->
                                <div class="links-item-desc">{$bookmark->link_description}</div>                           
                            </div>
                        </li>
                        </a>
EOT;
                }
                $output .= '</ul>';
            }
            return $output;
        }

        $linkcats = get_terms('link_category');
        $result = '';
        if (!empty($linkcats)) {
            foreach ($linkcats as $linkcat) {
                $result .= <<<EOT
                        <h3 class="links-cat-title">{$linkcat->name}</h3>
                        <div class="links-cat-desc">{$linkcat->description}</div>
EOT;
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
