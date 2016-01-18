<?php if (have_posts()): while (have_posts()) : the_post(); ?>
	SINGLE GEO POST
	<!-- article -->
	<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

SINGLE-GEOPOST.PHP 
		<!-- post title -->
		<h2>
			<a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a>
		</h2>
		<!-- /post title -->



	</article>
	<!-- /article -->

<?php endwhile; ?>


<?php endif; ?>
