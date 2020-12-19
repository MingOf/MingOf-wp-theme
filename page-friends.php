<?php get_header();?>
<section id="mastcontainer" class="typo <?php echo real_header_mode();?>">
    <section class="links">
        <?php
        while(have_posts()) {
            the_post();
        }
        ?>
        <h1><?php the_title();?></h1>
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
                    $output .= <<<EOT
                        <li class="links-item">
                            <img class="links-item-fav" src="{$bookmark->link_url}/favicon.ico" alt="favicon"/>
                            <a class="links-item-href" href="{$bookmark->link_url}" target="{$bookmark->link_target}">{$bookmark->link_name}</a>
                            <div class="links-item-desc">{$bookmark->link_description}</div>
                        </li>
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
    </section>
</section>
