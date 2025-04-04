<?php 

$anilistID = $_POST['anilistID'];
$episodeID = $_POST['episodeID'];


$anilistInfo = file_get_contents("https://api.consumet.org/meta/anilist/info/$anilistID");
$anilistInfo = json_decode($anilistInfo, true);

foreach($anilistInfo['episodes'] as $anilistEp) {
    if($anilistEp['id'] == $episodeID){
		
        
    };
}

		echo json_encode([
			'episodeName'=> $anilistEp['title'],
		]);





?>