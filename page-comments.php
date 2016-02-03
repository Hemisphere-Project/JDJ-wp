<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<?php

	$comments = get_comments(array('post_id'=> get_the_ID() ));
	$comments2 = array_reverse($comments);
	wp_list_comments('',$comments2);


	?>

<?php comment_form(); ?>

</article>
