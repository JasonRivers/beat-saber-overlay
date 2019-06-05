<?php

require __DIR__ . '/vendor/autoload.php';

$uri=$_SERVER['REQUEST_URI'];

list(,$page,$steamID) = explode("/", $uri);
$steamID = filter_var($steamID, FILTER_VALIDATE_INT)? $steamID : substr($steamID,0,strpos($steamID, '&'));

if ($page == "stats")
{
  $page= file_get_contents('https://scoresaber.com/u/'.$steamID);
  $dom = \HTMLDomParser\DomFactory::load($page);
  $s = $dom->findOne('.box div')->innerHtml();
  unset($dom);

  $dom = \HTMLDomParser\DomFactory::load($s);
  $image = $dom->findOne('.column');
  $_countryStart = strpos($dom->findOne('.column ul>li')->text(), '(') + 3;
  $countryRank = str_replace(',','',substr($dom->findOne('.column ul>li')->text(),$_countryStart,(strpos($dom->findOne('.column ul>li')->text(), ')') - ($_countryStart +1))));
  $worldRank = str_replace(',','',substr($dom->findOne('.column ul>li')->text(),17,(strpos($dom->findOne('.column ul>li')->text(), ' / #')-16)));
  $pp = str_replace(',','',substr($dom->findOne('.column ul>li',1)->text(),20,-2));

  print_r(json_encode(Array(
  "countryRank" => $countryRank,
  "worldRank" => $worldRank,
  "pp" => $pp)));
}

?>
