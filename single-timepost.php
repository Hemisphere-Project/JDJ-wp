
<?php
$image=types_render_field( "image");
$audio=types_render_field( "audio");
$video=types_render_field( "video");
$text=types_render_field( "text", array( ) );
?>


<div class="geopost">

	<?php if ($image){ ?> <div class="mapimage"><?php echo types_render_field( "image") ; ?></div>
		<?php	if ($text){ ?> <div class="maplittletext"><?php echo types_render_field("text") ?></div> <?php } ?>
	<?php } ?>
	<?php if ($audio){ ?> <div class="mapaudio"><?php echo types_render_field("audio") ?></div>
		<?php	if ($text){ ?> <div class="maplittletext"><?php echo types_render_field("text") ?></div> <?php } ?>
	<?php } ?>

	<?php if ($video){ ?> <div class="mapvideo"><?php echo types_render_field("video") ?></div> <?php } ?>

	<?php	if ($text && !$image && !$audio){ ?> <div class="maponlytextpost"><?php echo types_render_field("text") ?></div> <?php } ?>


</div>
