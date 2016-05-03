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

  <div id="inscription" class="popup">
    <div id="closeinscription" class='closebtn'><img src="<?php echo get_template_directory_uri(); ?>/img/buttons/close.png"></div>
    <div class='popuptitle'>Inscription </div>
    <div class='popupcontent inscription'>
      Pour vivre le spectacle de manière interactive, vous êtes invités à télécharger une application pour votre smartphone.
      Divers médias viendront alors accompagner votre expérience en temps réel lors des différents épisodes du spectacle.<br>

      <div id="stores">
        <a class="" href="https://play.google.com/store/apps/details?id=com.hmsphr.jdj" target="blank">
          <img src="<?php echo get_template_directory_uri(); ?>/img/buttons/app_android.png" alt="Logo" class="appBtn">
        </a>
        <a class="" href="https://itunes.apple.com/us/app/journal-dun-seul-jour/id1094744906?ls=1&mt=8" target="blank">
          <img src="<?php echo get_template_directory_uri(); ?>/img/buttons/app_ios.png" alt="Logo" class="appBtn">
        </a>
      </div>
      <br>
      Les personnes qui ne disposent pas de smartphones peuvent également s'inscrire en indiquant ici leur numéro de téléphone portable,
      pour avoir accès à une partie du conte numérique par sms au cours du spectacle.
      Il ne sera utilisé que pendant la durée du spectacle et sera supprimé ensuite. <br>
      <span id="telcomments" class="telcomments">Veuillez entrer un numéro de protable au format 06XXXXXXXX ou 07XXXXXXXX</span><br>
      <input type="tel" id="telinput" value="06XXXXXXXX" maxlength="10" onClick="this.select();"></input><br>
      <select name="eventselector" id="eventselector" class="dropdown big"></select> <br>
      <input id="sendtel" type="submit" value="Envoyer"></input>
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
    <strong> © <a target="blank" href="http://hemisphere-project.com">Hémisphère, Atelier de dispositifs numériques</a></strong>
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
