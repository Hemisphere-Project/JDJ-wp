<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<?php

	$comments = get_comments(array('post_id'=> get_the_ID() ));
	wp_list_comments('',$comments);


	?>

<?php comment_form(); ?>

</article>
