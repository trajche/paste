<?php

//Functions
function saveImage($base64img){
    //Change accordingly
    define('SITE_URL', 'http://p.mk/');
    define('UPLOAD_DIR', 'i/');
    
    $data = $base64img;
    list($type, $data) = explode(';', $data);
	list(, $data)      = explode(',', $data);
	$data = base64_decode($data);

    $file = UPLOAD_DIR . randName().'.png';
    file_put_contents($file, $data);
    $fullurl = SITE_URL . $file;
    return $fullurl;
}

function randName() {
	$rand = substr(md5(microtime()),rand(0,26),5);
	return $rand;
}

//Process image
$bytes = $_POST['bytes'];
echo saveImage($bytes);