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
    Pour vivre le spectacle de manière interactive, merci de nous fournir votre numéro de téléphone portable.
    Il ne sera utilisé que pendant la durée du festival et sera supprimé ensuite. <br><br>
    Gens équipés de smartphones: lien vers appli <br>
    Gens équipés de dumbphones: inscrivez vous ici<br>
    <span id="telcomments" class="telcomments">Veuillez entrer un numéro de protable au format 06XXXXXXXX ou 07XXXXXXXX</span><br>
    <input type="tel" id="telinput" value="06XXXXXXXX" maxlength="10" onClick="this.select();"></input><br>
    <select name="eventselector" id="eventselector" class="dropdown big"></select> <br>
    <input id="sendtel" type="submit" value="Envoyer"></input>
  </div>
</div>
