<style>
<?php
$styles = (get_option('mingof_style_options'));
$subFontColor             = !empty($styles['font_color']) ? $styles['font_color'] : '#333';
$bgColorBase              = !empty($styles['bg_color_base']) ? $styles['bg_color_base'] : '#f3f3f3';
$highlightColor           = !empty($styles['highlight_color']) ? $styles['highlight_color'] : '#738fa3';
$subColor                 = !empty($styles['sub_color']) ? $styles['sub_color'] : '#b3b3b3';
$bgColorHeader            = !empty($styles['bg_color_header']) ? $styles['bg_color_header'] : 'rgba(255,255,255,0.8)';

$highlightColorInDarkMode = !empty($styles['$highlight_color_in_dark_mode']) ? $styles['$highlight_color_in_dark_mode'] : '#b18983';
$bgColorBaseInDarkMode    = !empty($styles['bg_color_base_in_dark_mode']) ? $styles['bg_color_base_in_dark_mode'] : '#252d38';
$bgColorHeaderInDarkMode  = !empty($styles['bg_color_header_in_dark_mode']) ? $styles['bg_color_header_in_dark_mode'] : '#252d38';
$FontColorInDarkMode      = !empty($styles['font_color_in_dark_mode']) ? $styles['font_color_in_dark_mode'] : '#c6c6c6';
$titleColorInDarkMode     = !empty($styles['title_color_in_dark_mode']) ? $styles['title_color_in_dark_mode'] : '#727d87';

echo <<<EOT
:root {
  /*字体颜色*/
  --subFontColor: $subFontColor;

/*基本的背景颜色*/
  --bgColorBase: $bgColorBase;

/*强调色*/
  --highlightColor: $highlightColor;

/*非强调的局部颜色*/
  --subColor: $subColor;

/*Header背景颜色*/
  --bgColorHeader: $bgColorHeader;

  /*夜间模式 高亮色*/
  --highlightColorInDarkMode: $highlightColorInDarkMode;

/*夜间模式 基本背景颜色*/
  --bgColorBaseInDarkMode: $bgColorBaseInDarkMode;

/*夜间模式 Header背景颜色*/
  --bgColorHeaderInDarkMode: $bgColorHeaderInDarkMode;

/*夜间模式 字体颜色*/
  --FontColorInDarkMode: $FontColorInDarkMode;

/*夜间模式 “近文期章”，“文章归档”等标题颜色*/
  --titleColorInDarkMode: $titleColorInDarkMode;
}
EOT;
?>
</style>