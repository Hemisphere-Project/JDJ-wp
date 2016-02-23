<?php get_header(); ?>

<script>
    theme_directory = "<?php echo get_template_directory_uri() ?>";
</script>

	<main role="main">
    <div id="startoverlay"><img src="<?php echo get_template_directory_uri(); ?>/img/gif/rolling.svg"> </div>
		<section class="elevator"></section>
		<section class="timeline">
      <?php if(get_event_state()!='off'): get_template_part('loop'); ?>
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
      <?php  get_template_part('tweets'); ?>
    </div>
  </div>

  <div id="comments" class="popup">
    <div id="closecomments" class='closebtn'><img src="<?php echo get_template_directory_uri(); ?>/img/buttons/close.png"></div>
    <span id="gotobottom">Laisser votre commentaire</span>
    <div class='popuptitle'>COMMENTAIRES</div>
    <?php $commentspage = new WP_Query('pagename=commentaires'); while ($commentspage->have_posts()) : $commentspage->the_post();?>
      <?php get_template_part('page-comments'); ?>
    <?php endwhile; ?>
  </div>

  <?php elseif(get_event_state()=='off'): get_template_part('index-off');
  endif; ?>


  <?php get_footer(); ?>
