<?php get_header(); ?>
<script>
    theme_directory = "<?php echo get_template_directory_uri() ?>";
</script>

	<main role="main">
		<!-- section -->
		<section>
			page


		<?php if (have_posts()): while (have_posts()) : the_post(); ?>
			<!-- article -->
			<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
				PAGE
				<!-- <?php the_content(); ?> -->


				<div id="comments" class="popup" style="display:block">
			    <div id="closecomments" class='closebtn'><img src="<?php echo get_template_directory_uri(); ?>/img/buttons/close.png"></div>
			    <div class='popuptitle'>COMMENTAIRES</div>
						<!-- <?php comments_template( '', true );?> -->

						$comments = get_comments(array('post_id'=> get_the_ID()));
						wp_list_comments('',$comments);
			  </div>


				<br class="clear">


			</article>
			<!-- /article -->

		<?php endwhile; ?>

		<?php else: ?>

		<?php endif; ?>

		</section>
		<!-- /section -->
	</main>
