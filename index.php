<?php get_header(); ?>

<script>
    theme_directory = "<?php echo get_template_directory_uri() ?>";
</script>

	<main role="main">
		<!-- section -->

		<section class="elevator">
		</section>

		<div class="elevator-items-list">
		</div>



		<section class="timeline">
			<?php
				$args = array(
					'post_type' => 'timepost',
					'posts_per_page'=> -1);
				$loop = new WP_Query( $args );

				while ( $loop->have_posts() ) : $loop->the_post();

				$header=types_render_field( "hourheader");
				$image=types_render_field( "image");
				$audio=types_render_field( "audio");
 				$video=types_render_field( "video");

				if($image){ $post_type='imagepost'; }
				elseif ($audio){ $post_type='audiopost'; }
				elseif ($video){ $post_type='videopost'; }

				 ?>

				<div class="post <?php echo $post_type; if ($header==1){ echo ' headerpost';} else echo ' timepost'; ?>" hour="<?php echo types_render_field( "time", array("format"=>"G\hi")); ?>">
					<h2 class='posttitle'>  <?php echo types_render_field( "time", array("format"=>"G\hi")); ?></h2>


						<?php $text=types_render_field( "text", array( ) );
						if ($text){ ?> <div class="text"><?php echo types_render_field("text") ?></div> <?php } ?>

						<?php if ($image && $header==1){ ?> <div class="headerimage"><?php echo types_render_field( "image", array("width" => "1200", "height" => "1200", "proportional" => "true" ) ) ; ?></div> <?php } ?>

						<?php if ($image && $header==0){ ?> <div class="image"><?php echo types_render_field( "image", array("width" => "1200", "height" => "1200", "proportional" => "true" ) ) ; ?></div> <?php } ?>


						<?php if ($audio){ ?> <div class="audio"><?php echo types_render_field("audio") ?></div> <?php } ?>


						<?php if ($video){ ?> <div class="video"><?php echo types_render_field("video") ?></div> <?php } ?>

						<?php $pos=types_render_field( "position", array( ) );
						if ($pos){ ?> <div class="pos_link"> <a href='' <?php echo types_render_field("position") ?> >VIEW POSITION</a> </div> <?php } ?>

				</div>


				<?php endwhile; ?>






		</section>
		<!-- /section -->
	</main>


<?php get_footer(); ?>
