<?php get_template_part('templates/doctype') ?>
<?php 
if(!mingof_is_mobile()) {/*只针对pc端有效*/body_class();}
?>
>
    <div class="custom-bg"></div>

    <?php if( !mingof_is_mobile()): ?>
        <!--竖向 Header-->
        <?php get_template_part('templates/header-vertical-single');?>

    <?php elseif (mingof_is_mobile()): ?>
        <!--移动端专用 Header-->
        <?php get_template_part('templates/header-mobile');?>
     <?php endif;?>