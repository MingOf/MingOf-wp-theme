<!-- 竖向 Header LOGO -->
<div id="logo">
    <?php
    if(has_custom_logo()) {
        the_custom_logo();
    } else {
        echo '<a href="' . esc_url(home_url('/')) . '" class="custom-logo-link" rel="home">' .
                '<img src="' . esc_url(get_template_directory_uri() . '/assets/image/logo.png') . '" alt="logo"/>' .
            '</a>';
    }
    ?>
</div>
