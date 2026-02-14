<style>
<?php
$styles = (get_option('mingof_style_options'));
if (!function_exists('mingof_sanitize_css_color')) {
    function mingof_sanitize_css_color($value, $default) {
        $value = trim((string) $value);
        if (preg_match('/^#(?:[0-9a-fA-F]{3}){1,2}$/', $value)) {
            return $value;
        }
        if (preg_match('/^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}(?:\s*,\s*(?:0|1|0?\.\d+))?\s*\)$/', $value)) {
            return $value;
        }
        return $default;
    }
}

$subFontColor             = mingof_sanitize_css_color($styles['font_color'] ?? '', '#333');
$bgColorBase              = mingof_sanitize_css_color($styles['bg_color_base'] ?? '', '#f3f3f3');
$highlightColor           = mingof_sanitize_css_color($styles['highlight_color'] ?? '', '#738fa3');
$subColor                 = mingof_sanitize_css_color($styles['sub_color'] ?? '', '#b3b3b3');
$bgColorHeader            = mingof_sanitize_css_color($styles['bg_color_header'] ?? '', 'rgba(255,255,255,0.8)');
$highlightColorInDarkMode = mingof_sanitize_css_color($styles['highlight_color_in_dark_mode'] ?? '', '#b18983');
$bgColorBaseInDarkMode    = mingof_sanitize_css_color($styles['bg_color_base_in_dark_mode'] ?? '', '#252d38');
$bgColorHeaderInDarkMode  = mingof_sanitize_css_color($styles['bg_color_header_in_dark_mode'] ?? '', '#252d38');
$FontColorInDarkMode      = mingof_sanitize_css_color($styles['font_color_in_dark_mode'] ?? '', '#c6c6c6');
$titleColorInDarkMode     = mingof_sanitize_css_color($styles['title_color_in_dark_mode'] ?? '', '#727d87');
$backgroundImage          = sanitize_text_field(get_bg());
$backgroundImageBlur      = sanitize_text_field(get_bg_blur());

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

  /*背景图片*/
  --backgroundImage: $backgroundImage;

  /*背景图片模糊半径*/
  --backgroundImageBlur: $backgroundImageBlur;
}
EOT;
?>
</style>
