<?php get_header(); ?>


<script>
    theme_directory = "<?php echo get_template_directory_uri() ?>";
</script>

	<main role="main">
		<!-- section -->

		<section class="elevator">
		</section>


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
        $text=types_render_field( "text", array( ) );
        $pos=types_render_field( "position", array( ) );

				if($image){ $post_type='imagepost'; }
				elseif ($audio){ $post_type='audiopost'; }
				elseif ($video){ $post_type='videopost'; }

				 ?>

				<div class="post <?php echo $post_type; if ($header==1){ echo ' headerpost';} else echo ' timepost'; ?>"
              hour="<?php echo types_render_field( "time", array("format"=>"G\hi")); ?>"
              id="<?php the_ID(); ?>">
					<h2 class='posttitle'>  <?php echo types_render_field( "time", array("format"=>"G\hi")); ?></h2>

          <?php if ($pos){ ?> <div class="pos_link" value="<?php echo $pos ?>"><img src="<?php echo get_template_directory_uri(); ?>/img/buttons/place_small_orange.png"></div> <?php } ?>

          <div class="<?php echo $post_type; if ($header==1){ echo ' headercontent';} else echo ' postcontent'; ?>">

  						<?php	if ($text){ ?> <div class="text"><?php echo types_render_field("text") ?></div> <?php } ?>

  						<?php if ($image && $header==1){ ?> <div class="headerimage"><?php echo types_render_field( "image", array("width" => "1200", "height" => "1200", "proportional" => "true" ) ) ; ?></div> <?php } ?>

  						<?php if ($image && $header==0){ ?> <div class="image"><?php echo types_render_field( "image", array("width" => "1200", "height" => "1200", "proportional" => "true" ) ) ; ?></div> <?php } ?>

  						<?php if ($audio){ ?> <div class="audio"><?php echo types_render_field("audio") ?></div> <?php } ?>

  						<?php if ($video){ ?> <div class="video"><?php echo types_render_field("video") ?></div> <?php } ?>

            </div>


				</div>


				<?php endwhile; ?>

  		</section>
  		<!-- /section -->

	</main>

  <div id="map">
    <div id="gmap">
      <div id="carte" style="width:100%; height:100%"></div>
    </div>

    <div id="rmap">
      <div id="slidemap"><img id="togglemap" src="<?php echo get_template_directory_uri(); ?>/img/buttons/map_close.png"></div>
      <div id="map_post">
      <!-- <?php
        $infospage = get_page_by_title('infos');
        $post = $infospage->post_content;
        echo $post;
      ?> -->
      </div>
    </div>
  </div>


  <div id="postoverlay">
    <div id="postdetails">
      <div id="closepost" class='closebtn'><img src="<?php echo get_template_directory_uri(); ?>/img/buttons/close.png"></div>
      POST
      <div id="viewpostmap" class=''><img src="<?php echo get_template_directory_uri(); ?>/img/buttons/place_orange.png"></div>
    </div>
  </div>

  <div id="infos">
    <div id="closeinfos" class='closebtn'><img src="<?php echo get_template_directory_uri(); ?>/img/buttons/close.png"></div>
    <div class='infostitle'>A Propos</div>
    <?php
      $infospage = get_page_by_title('infos');
      $post = $infospage->post_content;
      echo $post;
    ?>
  </div>
