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
    <br>
    <input type="tel" id="telinput" value="0612345678" maxlength="10"></input><br>
    <!-- <input type='tel' name="numero" pattern='\d{10}' required title="Format: 0612345678" pattern="\d10" size=10 min=0 step=1 value="<?php echo $numero ?>"> -->
    <select name="eventselector" id="eventselector" class="dropdown big"></select>
    <input type="submit" value="Envoyer"></input>
  </div>
</div>
