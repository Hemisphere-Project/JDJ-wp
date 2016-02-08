<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<?php

	$comments = get_comments(array('post_id'=> get_the_ID() ));
	$comments2 = array_reverse($comments);
	wp_list_comments('',$comments2);

  // $comments_args = array(
	// 	'comment_field' => '<p class="comment-form-comment"><label for="comment">' . _x( 'Partagez votre expérience', 'noun' ) . '</label><textarea id="comment" name="comment" cols="45" rows="8" aria-required="true"></textarea></p>'
	// );
	// comment_form($comments_args);
	comment_form();
	?>



</article>
