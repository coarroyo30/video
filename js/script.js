(function(){

  "use strict";

  // Video

  var $video = $("#video");
  var $video_container = $("#video_container");

  // Video Control Elements

  var $video_controlbar = $("#controlbar");
  var $control_elements = $("#control_elements");
  var $progressbar = $("#progressbar");
  var $progress = $("#progress");
  var $play_button = $("#play_button");
  var $mute_button = $("#mute_button");
  var $cc_button = $("#cc");
  var $volumeslider = $("#volumeslider");
  var $fullscreen_button = $("#fullscreen_button");
  var $duration = $("#duration");
  var $fwd_button = $("#fwd_button");

  $(function () {

    // Play/pause on video click

    $video.click(function() {
    	playVideo();
    });

    // Play/pause on spacebar

    $("body").on("keydown", function(e) {
    	if(e.keyCode === 32 ) {
    		e.preventDefault();
    		playVideo();
    	}
    });

    // Mute/sound on m key

    $("body").on("keydown", function(e) {
    	if(e.keyCode === 77 ) {
    		e.preventDefault();
    		muteVideo();
    	}
    });

    // Video duration timer

    $video.on("timeupdate", function() {
    	var $videoTime = $video[0].currentTime;
    	if ($videoTime < 9.5) {
    		$duration.html("00:0" + Math.round($videoTime) + " / 00:59");
    	} else {
    		$duration.html("00:" + Math.round($videoTime) + " / 00:59");
    	}
    });

    // Hide button controls when video is playing

    $video_container.on("mouseleave", function() {
    	if($video[0].paused === false) {
    		$control_elements.hide();
    		$video_controlbar.css("margin-top", "5%");
    	}
    });

    // Show button controls on hover

    $video_container.on("mouseover", function() {
    		$control_elements.show();
    		$video_controlbar.css("margin-top", "0");
    });

    // Progress bar

    $progressbar[0].addEventListener("change", function() {
    	var time = $video[0].duration * ($progressbar[0].value / 100);
    	$video[0].currentTime = time;
    });

    // Update progress bar as video plays

    $video[0].addEventListener("timeupdate", function() {
    	var value = (100 / $video[0].duration) * $video[0].currentTime;
    	$progress.css("width", value+"%");
    });
    
    // Load progress///
    /******************************************
    $video.on('progress', function() {
    	updateLoadProgress();
    });
    
    $video.on('loadeddata', function() {
    	updateLoadProgress();
    });
    
    $video.on('canplaythrough', function() {
    	updateLoadProgress();
    });
    
    $video.on('playing', function() {
    	updateLoadProgress();
    });
    
    function updateLoadProgress() {
    	if ($video.buffered.length > 0) {
    		var percent = ($video.buffered.end(0) / $video.duration) * 100;
    		$progressbar.css({width: percent + "%"});
    	}
    }
    ***********************************************************/
    // Play/pause on button click

    $play_button.click(function() {
    	playVideo();
    });

    // 2x speed with right arrow

    $("body").on("keydown", function(e) {
    	if(e.keyCode === 39) {
    		e.preventDefault();
    		changeSpeed();
    	}
    });

    // Normal Speed

    $("body").on("keydown", function(e) {
    	if(e.keyCode === 37) {
    		e.preventDefault();
    		changeSpeed();
    	}
    });

    // Fast Forward Button

    $fwd_button.click(function() {
    	changeSpeed();
    });

    // Mute video on button click

    $mute_button.click(function() {
    	muteVideo();
    });

	// Toggle the Captions
	
	$cc_button.click(function(){
		$("#track").toggle();
	});

    // Volume slider

    $volumeslider.on("change", function(){
    	$video[0].volume = $volumeslider[0].value;
    });

    $fullscreen_button.click(function() {
    	launchFullscreen();
    });

    $('header').hover(function(){
      $('#controlbar').addClass('show');
    }, function(){
        $('#controlbar').removeClass('show');
    });

    // Highlight current span when video plays

  	$video.on("timeupdate", function() {
  		var $videoTime = $video[0].currentTime;

      function addHighlight(n) {
  			$('span[data-start]').removeClass("highlight");
  			$('span[data-start="' + n + '"]').addClass("highlight");
  		}

  		if ($videoTime > 0.240 && $videoTime < 4.130) {
  			addHighlight(0);
  		} else if ($videoTime > 4.130 && $videoTime < 7.535) {
  			addHighlight(4.130);
  		} else if ($videoTime > 7.535 && $videoTime < 11.270) {
  			addHighlight(7.535);
  		} else if ($videoTime > 11.270 && $videoTime < 13.960) {
  			addHighlight(11.270);
  		} else if ($videoTime > 13.960 && $videoTime < 17.940) {
  			addHighlight(13.960);
  		} else if ($videoTime > 17.940 && $videoTime < 22.370) {
  			addHighlight(17.940);
  		} else if ($videoTime > 22.370 && $videoTime < 26.880) {
  			addHighlight(22.370);
  		} else if ($videoTime > 26.880 && $videoTime < 30.920) {
  			addHighlight(26.880);
  		} else if ($videoTime > 32.100 && $videoTime < 34.730) {
  			addHighlight(32.100);
  		} else if ($videoTime > 34.730 && $videoTime < 39.430) {
  			addHighlight(34.730 );
  		} else if ($videoTime > 39.430 && $videoTime < 41.190) {
  			addHighlight(39.430);
  		} else if ($videoTime > 42.350 && $videoTime < 46.300) {
  			addHighlight(42.350);
  		} else if ($videoTime > 46.300 && $videoTime < 49.270) {
  			addHighlight(46.300);
  		} else if ($videoTime > 49.270 && $videoTime < 53.760) {
  			addHighlight(49.270);
  		} else if ($videoTime > 53.760 && $videoTime < 57.780 ) {
  			addHighlight(53.760);
  		} else if ($videoTime > 57.780) {
  			addHighlight(57.780);
  		}

  	});

    // Click on transcript to be taken to that time in the video

    $("span").click(function() {
    	var transcriptTime = $(this).attr("data-start");
    	$video[0].currentTime = transcriptTime;
    });

  }); // End of jQuery Ready

  // Toggles play/pause for the video

  function playVideo() {
  	if($video[0].paused) {
  		$video[0].play();
  		$play_button.find("img").attr("src", "icons/pause-icon.png");
  		$control_elements.hide();
  		$video_controlbar.css("margin-top", "5%");
  	} else {
  		$video[0].pause();
  		$play_button.find("img").attr("src", "icons/play-icon.png");
  	}
  }

  // Mutes the video

  function muteVideo() {
  	if ($video[0].muted === false) {
  		$video[0].muted = true;
  		$mute_button.find("img").attr("src", "icons/volume-off-icon.png");
  	} else {
  		$video[0].muted = false;
  		$mute_button.find("img").attr("src", "icons/volume-on-icon.png");
  	}
  }

  // Changes video playback rate

  function changeSpeed() {
  	if($video[0].playbackRate === 1) {
  		$video[0].playbackRate = 2;
  		$fwd_button.text("2x Speed");
  	} else if ($video[0].playbackRate === 2) {
  		$video[0].playbackRate = 1;
  		$fwd_button.text("1x Speed");
  	}
  }

  function launchFullscreen() {
    if($video[0].requestFullscreen) {
      $video[0].requestFullscreen();
    } else if($video[0].mozRequestFullScreen) {
      $video[0].mozRequestFullScreen();
    } else if($video[0].webkitRequestFullscreen) {
      $video[0].webkitRequestFullscreen();
    } else if($video[0].msRequestFullscreen) {
      $video[0].msRequestFullscreen();
    }
  }

})();