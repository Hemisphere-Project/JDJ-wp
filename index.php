<?php get_header(); ?>


<script>
    theme_directory = "<?php echo get_template_directory_uri() ?>";
</script>

	<main role="main">
    <div id="startoverlay"><img src="<?php echo get_template_directory_uri(); ?>/img/gif/rolling.svg"> </div>
		<section class="elevator"></section>
		<section class="timeline">

      <!-- //////////////// AFTERPOSTS  //////////// -->

      <?php
       $args = array(
         'post_type' => 'afterpost',
         'posts_per_page'=> -1);
       $loop = new WP_Query( $args );
       while ( $loop->have_posts() ) : $loop->the_post();
       $image=types_render_field( "image");
       $audio=types_render_field( "audio");
       $video=types_render_field( "video");
       $text=types_render_field( "text", array( ) );
       $pos=types_render_field( "position", array( ) );
       $sub=types_render_field( "soustitre");
       if($image){ $post_type='imagepost'; }
       elseif ($audio){ $post_type='audiopost'; }
       elseif ($video){ $post_type='videopost'; }
       ?>
       <div class="post afterpost <?php if($image){echo 'imagepost';} if($audio){echo 'audiopost';} if($video){echo 'videopost';} if($text && !$image && !$audio){echo 'textpost';}?>"
         hour="<?php echo types_render_field( "time", array("format"=>"G\hi")); ?>" id="<?php the_ID(); ?>">
         <div class='postsubtitle'><?php echo types_render_field("soustitre"); ?></div>
         <div class='posttitle'><?php echo types_render_field("time", array("format"=>"G\hi"));?></div>
         <?php if ($pos){ ?> <div class="pos_link" value="<?php echo $pos ?>"><img src="<?php echo get_template_directory_uri(); ?>/img/buttons/place_small_orange.png"></div> <?php } ?>
         <div class="postcontent">
             <?php if ($image){ ?> <div class="imagepost_content"><?php echo types_render_field( "image") ; ?></div>
               <?php	if ($text){ ?> <div class="littletext"><?php echo types_render_field("text") ?></div> <?php } ?>
             <?php } ?>
             <?php if ($audio){ ?> <div class="audiopost_content"><?php echo types_render_field("audio") ?></div>
               <?php	if ($text){ ?> <div class="littletext"><?php echo types_render_field("text") ?></div> <?php } ?>
             <?php } ?>
             <?php if ($video){ ?>
               <div class="playvid"><img src="<?php echo get_template_directory_uri(); ?>/img/buttons/play2.png"></div>
               <div class="videopost_content"><?php echo types_render_field("video") ?></div>
             <?php } ?>
             <?php	if ($text && !$image && !$audio){ ?> <div class="onlytextpost"><?php echo types_render_field("text") ?></div> <?php } ?>
           </div>
       </div>
       <?php endwhile; ?>


      <br><br>

      <!-- //////////////// TIMEPOSTS  //////////// -->

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
        $sub=types_render_field( "soustitre");
				if($image){ $post_type='imagepost'; }
				elseif ($audio){ $post_type='audiopost'; }
				elseif ($video){ $post_type='videopost'; }

        if($header==1){ ?>
          <div class="post headerpost" hour="<?php echo types_render_field( "time", array("format"=>"G\hi")); ?>" id="<?php the_ID(); ?>">
            <div class='headertitle'><?php echo types_render_field("time", array("format"=>"G\hi"));?></div>
            <div class="commentslink">Voir les commentaires</div>
            <div class='headersubtitle'></div>
            <?php if ($image){ ?> <div class="headerimage"><?php echo types_render_field( "image") ; ?></div> <?php } ?>
          </div>
        <?php }

        if($header==0){ ?>
				<div class="post timepost <?php if($image){echo 'imagepost';} if($audio){echo 'audiopost';} if($video){echo 'videopost';} if($text && !$image && !$audio){echo 'textpost';}?>"
          hour="<?php echo types_render_field( "time", array("format"=>"G\hi")); ?>" id="<?php the_ID(); ?>">
          <!-- <?php if($sub){?><div class='postsubtitle'><?php echo types_render_field("soustitre"); ?></div> <?php } ?> -->
          <div class='postsubtitle'><?php echo types_render_field("soustitre"); ?></div>
          <div class='posttitle'><?php echo types_render_field("time", array("format"=>"G\hi"));?></div>
          <?php if ($pos){ ?> <div class="pos_link" value="<?php echo $pos ?>"><img src="<?php echo get_template_directory_uri(); ?>/img/buttons/place_small_orange.png"></div> <?php } ?>
          <div class="postcontent">
  						<?php if ($image){ ?> <div class="imagepost_content"><?php echo types_render_field( "image") ; ?></div>
                <?php	if ($text){ ?> <div class="littletext"><?php echo types_render_field("text") ?></div> <?php } ?>
              <?php } ?>
  						<?php if ($audio){ ?> <div class="audiopost_content"><?php echo types_render_field("audio") ?></div>
                <?php	if ($text){ ?> <div class="littletext"><?php echo types_render_field("text") ?></div> <?php } ?>
              <?php } ?>
  						<?php if ($video){ ?>
                <div class="playvid"><img src="<?php echo get_template_directory_uri(); ?>/img/buttons/play2.png"></div>
                <div class="videopost_content"><?php echo types_render_field("video") ?></div>
              <?php } ?>
  						<?php	if ($text && !$image && !$audio){ ?> <div class="onlytextpost"><?php echo types_render_field("text") ?></div> <?php } ?>
            </div>
				</div>
        <?php } ?>

				<?php endwhile; ?>

        <br><br>

         <!-- //////////////// PREPOSTS  //////////// -->

        <?php
  				$args = array(
  					'post_type' => 'prepost',
  					'posts_per_page'=> -1);
  				$loop = new WP_Query( $args );
  				while ( $loop->have_posts() ) : $loop->the_post();
  				$image=types_render_field( "image");
  				$audio=types_render_field( "audio");
   				$video=types_render_field( "video");
          $text=types_render_field( "text", array( ) );
          $pos=types_render_field( "position", array( ) );
          $sub=types_render_field( "soustitre");
  				if($image){ $post_type='imagepost'; }
  				elseif ($audio){ $post_type='audiopost'; }
  				elseif ($video){ $post_type='videopost'; }
          ?>
  				<div class="post prepost <?php if($image){echo 'imagepost';} if($audio){echo 'audiopost';} if($video){echo 'videopost';} if($text && !$image && !$audio){echo 'textpost';}?>"
            hour="<?php echo types_render_field( "time", array("format"=>"G\hi")); ?>" id="<?php the_ID(); ?>">
            <div class='postsubtitle'><?php echo types_render_field("soustitre"); ?></div>
            <div class='posttitle'><?php echo types_render_field("time", array("format"=>"G\hi"));?></div>
            <?php if ($pos){ ?> <div class="pos_link" value="<?php echo $pos ?>"><img src="<?php echo get_template_directory_uri(); ?>/img/buttons/place_small_orange.png"></div> <?php } ?>
            <div class="postcontent">
    						<?php if ($image){ ?> <div class="imagepost_content"><?php echo types_render_field( "image") ; ?></div>
                  <?php	if ($text){ ?> <div class="littletext"><?php echo types_render_field("text") ?></div> <?php } ?>
                <?php } ?>
    						<?php if ($audio){ ?> <div class="audiopost_content"><?php echo types_render_field("audio") ?></div>
                  <?php	if ($text){ ?> <div class="littletext"><?php echo types_render_field("text") ?></div> <?php } ?>
                <?php } ?>
    						<?php if ($video){ ?>
                  <div class="playvid"><img src="<?php echo get_template_directory_uri(); ?>/img/buttons/play2.png"></div>
                  <div class="videopost_content"><?php echo types_render_field("video") ?></div>
                <?php } ?>
    						<?php	if ($text && !$image && !$audio){ ?> <div class="onlytextpost"><?php echo types_render_field("text") ?></div> <?php } ?>
              </div>
  				</div>
  				<?php endwhile; ?>


  		</section>

	</main>


  <div id="map">
    <div id="gmap">
      <div id="carte" style="width:100%; height:100%"></div>
    </div>
    <div id="rmap">
      <div id="slidemap"><img id="togglemap" src="<?php echo get_template_directory_uri(); ?>/img/buttons/map_open.png"></div>
      <div id="map_post">
        <div id="map_post_title" class="geopost_title"></div>
        <div id="map_post_adress" class="geopost_content"></div>
        <div id="map_post_content" class="geopost_content"></div>
      </div>
    </div>
  </div>


  <div id="postoverlay">
    <div id="postdetails">
    	<h2 id='timepost_title' class='timepost_title'></h2>
      <div id="viewpostmap" class=''><img src="<?php echo get_template_directory_uri(); ?>/img/buttons/place_orange.png"></div>
      <div id="closepost" class='closebtn'><img src="<?php echo get_template_directory_uri(); ?>/img/buttons/close.png"></div>
      <div id="postdetails_content" class='fullpostcontent'></div>
    </div>
  </div>

  <div id="infos" class="popup">
    <div id="closeinfos" class='closebtn'><img src="<?php echo get_template_directory_uri(); ?>/img/buttons/close.png"></div>
    <div class='popuptitle'>A Propos</div>
    <div class='popupcontent'>
    <?php
      $infospage = get_page_by_title('infos');
      $post = $infospage->post_content;
      echo $post;
    ?>
    </div>
  </div>

  <div id="tweets" class="popup">
    <div id="closetweets" class='closebtn'><img src="<?php echo get_template_directory_uri(); ?>/img/buttons/close.png"></div>
    <div class='popuptitle'>Au #bordumonde</div>
    <div class='popupcontent'>
      <?php

      require_once('twitter-api-php-master/TwitterAPIExchange.php');

      $settings = array(
          'oauth_access_token' => "3131098684-fB5vUDKy7MYoSgPsl6cHwm0gMOiFKl1VHgHe9mw",
          'oauth_access_token_secret' => "tAphACM55IdmAywQXCb3fcHpxxD3xnakiGSLO1e0iurjs",
          'consumer_key' => "6ycyOdjLlV9Q4k5nhdNtqVRCM",
          'consumer_secret' => "c1hhAvuQgqBGNTBXG525RgR2crWCfqSnnJcGLnDv5LdKimEnk5"
      );
      $url = 'https://api.twitter.com/1.1/search/tweets.json';
      $getfield = '?q=%23bordumonde&count=100';

      $requestMethod = 'GET';
      $twitter = new TwitterAPIExchange($settings);
      $data = $twitter->setGetfield($getfield)
               ->buildOauth($url, $requestMethod)
               ->performRequest();
      $data = json_decode($data);
      $data_hashtag = $data->statuses;

      foreach ($data_hashtag as $tweet) {

        echo '<div class="tweet">';

        $profileurl = $tweet->user->profile_image_url;
        echo '<img class="twitter_profilepic" src='.$profileurl.'>';

        echo '<div class="twitter_content">';
          echo '<div class="twitter_id">'.$tweet->user->screen_name.'</div>';
          $datetime = new DateTime($tweet->created_at);
          echo '<div class="twitter_date"> le '.$datetime->format('d/m/Y').' à '.$datetime->format('G\hi').'</div>';

          echo '<div class="twitter_text">'.$tweet->text.'</div>';

          $img = $tweet->entities->media[0]->media_url;
          if ($img) {
            echo '<img class="twitter_image" src='.$img.'>';
          }

          $url = $tweet->entities->urls[0]->expanded_url;
          $shorturl = $tweet->entities->urls[0]->display_url;
          echo '<a class="twitter_link" target="_blank" href='.$url.'>'.$shorturl.'</a>';

        echo '</div>';
        echo '</div>';

        echo '<br>';
      }
      ?>

    </div>
  </div>

  <div id="comments" class="popup">
    <div id="closecomments" class='closebtn'><img src="<?php echo get_template_directory_uri(); ?>/img/buttons/close.png"></div>
    <div class='popuptitle'>COMMENTAIRES</div>
    <?php $commentspage = new WP_Query('pagename=commentaires'); while ($commentspage->have_posts()) : $commentspage->the_post();?>
      <?php
      // $comments = get_comments(array('post_id'=> get_the_ID() ));
      // wp_list_comments('',$comments);
      // comment_form();
      get_template_part('page-comments');
      ?>

    <?php endwhile; ?>
  </div>



  <?php get_footer(); ?>
