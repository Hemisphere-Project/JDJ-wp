
<?php
$image=types_render_field( "image");
$audio=types_render_field( "audio");
$video=types_render_field( "video");
$text=types_render_field( "text", array( ) );
?>


<div class="geopost">

	<?php	if ($text){ ?> <div class="timetext"><?php echo types_render_field("text") ?></div> <img src="<?php echo get_template_directory_uri();?>/img/buttons/guill1.png"></div><img src="<?php echo get_template_directory_uri();?>/img/buttons/guill2.png"></div> <?php } ?>

	<?php if ($image){ ?> <div class="timeimage"><?php echo types_render_field( "image", array("width" => "1200", "height" => "1200", "proportional" => "true" ) ) ; ?></div> <?php } ?>

	<?php if ($audio){ ?> <div class="timeaudio"><?php echo types_render_field("audio") ?></div> <?php } ?>

	<?php if ($video){ ?> <div class="timevideo"><?php echo types_render_field("video") ?></div> <?php } ?>

</div>
