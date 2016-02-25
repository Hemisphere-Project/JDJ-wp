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

  // print_r($tweet);
  echo '<div class="tweet">';

  $profileurl = $tweet->user->profile_image_url;
  // echo '<img class="twitter_profilepic" src='.$profileurl.'>';
  echo '<a target="blank" href="http://twitter.com/'.$tweet->user->screen_name.'"><img class="twitter_profilepic" src='.$profileurl.'></a>';

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
