<?php get_header(); ?>

	<main role="main">
		<!-- section -->



		<section class="timeline">
			<?php
				$args = array( 'post_type' => 'timepost',
								'key' => 'wpfc-date',
								'orderby' => 'meta_value',
								'order'   => 'ASC'
							);



				$loop = new WP_Query( $args );

				// echo $loop;


				while ( $loop->have_posts() ) : $loop->the_post(); ?>


				<div class="timepost">
					<h2 class='posttitle'>  <?php echo types_render_field( "time", array("format"=>"G:i")); ?></h2>
					<div>  <?php echo types_render_field( "position", array( ) ); ?></div>

						<?php $text=types_render_field( "text", array( ) );
						if ($text){ ?> <div class="text"><?php echo types_render_field("text") ?></div> <?php } ?>

						<?php echo types_render_field( "image", array("width" => "1200", "height" => "1200", "proportional" => "true" ) ) ;?>

						<?php $audio=types_render_field( "audio");
						if ($audio){ ?> <div class="audio"><?php echo types_render_field("audio") ?></div> <?php } ?>


						<?php $audio=types_render_field( "video");
						if ($audio){ ?> <div class="video"><?php echo types_render_field("video") ?></div> <?php } ?>

				</div>


				<?php endwhile; ?>






		</section>
		<!-- /section -->
	</main>


<?php get_footer(); ?>
