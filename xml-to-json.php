<?php
header('Content-Type: application/json; charset=utf-8');
// Obtain Feed Url From POST
$feed_url = $_GET['url'];

if(!$_GET['url'])
$feed_url = 'http://news.yahoo.com/rss';

$xml = @simplexml_load_file($feed_url, 'SimpleXMLElement', LIBXML_NOCDATA);

$json = json_encode($xml);
// jsonP callback
//$json = $_GET['callback']. '(' . json_encode($xml) . ');';

echo $json;

/*

jQuery Example:

$.getJSON('http://mywebsite.com/xml-to-json.php', function(data) { 
	//do something
});

*/
?>
