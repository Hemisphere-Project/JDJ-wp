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
    > <a class="link" href="https://play.google.com/store/apps/details?id=com.hmsphr.jdj" target="blank">application pour android</a><br>
    > <a class="link" href="https://itunes.apple.com/fr/app/apple-store/id375380948?mt=8" target="blank">application pour ios</a><br><br><br>

    Les personnes qui ne disposent pas de smartphones peuvent également s'inscrire en indiquant ici leur numéro de téléphone portable,
    pour avoir accès à une partie du conte numérique par sms au cours du spectacle.
    Il ne sera utilisé que pendant la durée du spectacle et sera supprimé ensuite. <br>
    <span id="telcomments" class="telcomments">Veuillez entrer un numéro de protable au format 06XXXXXXXX ou 07XXXXXXXX</span><br>
    <input type="tel" id="telinput" value="06XXXXXXXX" maxlength="10" onClick="this.select();"></input><br>
    <select name="eventselector" id="eventselector" class="dropdown big"></select> <br>
    <input id="sendtel" type="submit" value="Envoyer"></input>
  </div>
</div>
