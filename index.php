<?php
$is_mobile = function_exists('mingof_is_mobile') ? mingof_is_mobile() : wp_is_mobile();

if ($is_mobile) {
    get_template_part('templates/index', 'mobile');
} else {
    get_template_part('templates/index', 'pc');
}
