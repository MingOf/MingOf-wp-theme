<!-- 竖向 Header LOGO -->
<div id="logo">
    <?php
    if(has_custom_logo()) {
        the_custom_logo();
    } else {
        echo '<a href='.'"'.get_bloginfo("url").'"'.' class="custom-logo-link" rel="home">'.
                '<img src='.'"'.get_template_directory_uri().'/assets/image/logo.png'.'"'.'alt="logo"/>'.
            '</a>';
    }
    ?>
</div>