<div id="offpage" class="popup">
  <div class='popuptitle'>Spectacle Off </div>
  <div class='popupcontent'>
  <?php
    $page = get_page_by_title('off');
    $post = $page->post_content;
    echo $post;
  ?>
  </div>
<br><br>
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
