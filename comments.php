<?php
if(post_password_required()) return;
if(!comments_open()) return;
?>
<div id="comments" class="comments-area">

    <?php if ( have_comments() ) : ?>
        <h2 class="comments-title">
            <?php
            printf( _nx( '%1$s 条评论', '%1$s 条评论', get_comments_number(), 'comments title', 'mingof' ),
                number_format_i18n( get_comments_number() ), '<span>' . get_the_title() . '</span>' );
            ?>
        </h2>

        <ol class="comment-list">
            <?php
            wp_list_comments( array(
                'style'       => 'ol',
                'short_ping'  => true,
                'avatar_size' => 40,
                'type'        => 'comment',
                'reverse_top_level' => true
            ) );
            ?>
        </ol><!-- .comment-list -->

        <?php
        // Are there comments to navigate through?
        if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) :
            ?>
            <nav class="navigation comment-navigation" role="navigation">
                <h1 class="screen-reader-text section-heading"><?php _e( 'Comment navigation', 'mingof' ); ?></h1>
                <div class="nav-previous"><?php previous_comments_link( __( '&larr; Older Comments', 'mingof' ) ); ?></div>
                <div class="nav-next"><?php next_comments_link( __( 'Newer Comments &rarr;', 'mingof' ) ); ?></div>
            </nav><!-- .comment-navigation -->
        <?php endif; // Check for comment navigation ?>

    <?php endif; // have_comments() ?>
    <?php $form_args = array(
        // change the title of send button
        'label_submit'=>'提交评论',
        // change the title of the reply section
        'title_reply'=>'写下评论或回复',
        // remove "Text or HTML to be displayed after the set of comment fields"
        'comment_notes_after' => '',
        // redefine your own textarea (the comment body)
        'comment_field' => '<p class="comment-form-comment">
<label for="comment">' . _x('Comment', 'noun' ) . '</label><br />
<textarea id="comment" name="comment" aria-required="true"></textarea>

</p>',
    );
    comment_form($form_args);
    ?>
</div><!-- #comments -->