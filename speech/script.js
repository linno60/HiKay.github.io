
var pageWidth = document.getElementById('page').offsetWidth;
document.getElementById('image-wrapper').style.width = pageWidth + "px";
document.getElementById('image-wrapper').style.height = pageWidth + "px";
document.getElementById('play').style.display = "none";

var song = document.getElementsByTagName('audio')[0];
var audio = document.getElementById('audio');
var currentCode = document.getElementById('starting-time');
var remainingCode = document.getElementById('ending-time');
var imageWrapper = document.getElementById('image-wrapper');
var albumCover = document.getElementById('album-cover');
var timeSliderBG = document.getElementById('timecode');
var isAdjustingBar = false;
var shadow = albumCover.style["boxShadow"];
var noShadow = "0 0 0px white"
var firstRun = true;
var volume = document.getElementById("volume-slider");

// alert(song.paused);

setTimeout(
    function(){
		if (song.paused == true) {
		   document.getElementById('pause').style.display = "none";
		   document.getElementById('play').style.display = "";
		}
    },
    500
); 


function playPause() {
if (song.paused == true || firstRun) {
	play();
	firstRun = false;
} else {
   pause();
}
}

function play() {
   song.play();
   document.getElementById('play').style.display = "none";
   document.getElementById('pause').style.display = "";
   albumCover.style.width = "100%";
   albumCover.style.height = "100%";
   albumCover.style.marginTop = "0px";
   albumCover.style.marginBottom = "0px";
   albumCover.style["boxShadow"] = shadow;
}

function pause() {
   song.pause();
   document.getElementById('pause').style.display = "none";
   document.getElementById('play').style.display = "";
   albumCover.style.width = "80%";
   albumCover.style.height = "80%";
   albumCover.style.marginTop = pageWidth * 0.1 + "px";
   albumCover.style.marginBottom = pageWidth * 0.1 + "px";
   albumCover.style["boxShadow"] = noShadow;
}

function seek() {
	song.currentTime = song.currentTime + 15;
	play();
}
function back() {
	song.currentTime = song.currentTime - 15;
	play();
}
function setVolume() {
   audio.playbackRate = volume.value;
   var gradientCut = volume.value/2;
   volume.style.backgroundImage = "-webkit-gradient(linear,left top,right top,color-stop(" + gradientCut + ", #909191),color-stop(" + gradientCut + ", #ddd))";
}
function previewSpeed() {
   var gradientCut = volume.value/2;
   volume.style.backgroundImage = "-webkit-gradient(linear,left top,right top,color-stop(" + gradientCut + ", #909191),color-stop(" + gradientCut + ", #ddd))";
}
function previewProgress() {
   isAdjustingBar = true;
   albumCover.style.width = "80%";
   albumCover.style.height = "80%";
   albumCover.style.marginTop = pageWidth * 0.1 + "px";
   albumCover.style.marginBottom = pageWidth * 0.1 + "px";
   albumCover.style["boxShadow"] = noShadow;
   var progress = document.getElementById("timecode");
   if (progress.value <= 0.1) {
   	currentCode.style["paddingTop"] = "13px";
   } else if (progress.value >= 0.9) {
   	remainingCode.style["paddingTop"] = "13px";
   } else {
   	remainingCode.style["paddingTop"] = "";
   	currentCode.style["paddingTop"] = "";
   }
   timecode.style.backgroundImage = "-webkit-gradient(linear,left top,right top,color-stop(" + progress.value + ", #ED4852),color-stop(" + progress.value + ", #ddd))";
   currentCode.style.color = "#ED4852";
   currentCode.innerHTML = getViewableTime(audio.duration * progress.value);
   remainingCode.innerHTML = "-" + getViewableTime(audio.duration - audio.duration * progress.value);
}

function setProgress() {
   var progress = document.getElementById("timecode");
   audio.currentTime = progress.value * audio.duration;
   albumCover.style.width = "100%";
   albumCover.style.height = "100%";
   albumCover.style.marginTop = "";
   albumCover.style.marginBottom = "";
   albumCover.style["boxShadow"] = shadow;
   currentCode.style.color = "#797D85";
   isAdjustingBar = false;
   play();
}

audio.addEventListener("timeupdate", updateProgress, false);
function updateProgress() {
   if (isAdjustingBar == false) {
			   var value = 0;
   if (audio.currentTime > 0) {
		value = audio.currentTime / audio.duration;
		currentCode.innerHTML = getViewableTime(audio.currentTime);
		remainingCode.innerHTML = "-" + getViewableTime(audio.duration - audio.currentTime);
   }
   var progressbar = document.getElementById("timecode");
   timecode.value = value;
	   timecode.style.backgroundImage = "-webkit-gradient(linear,left top,right top,color-stop(" + value + ", #909191),color-stop(" + value + ", #ddd))";
	   remainingCode.style["paddingTop"] = "";
   currentCode.style["paddingTop"] = "";

	}
}

function resetSpeed() {
   audio.playbackRate = 1;
   volume.value = 1;
   var gradientCut = volume.value/2;
   volume.style.backgroundImage = "-webkit-gradient(linear,left top,right top,color-stop(" + gradientCut + ", #909191),color-stop(" + gradientCut + ", #ddd))";

}

function getViewableTime(time) {
	var returnedString;
	var hasMinute = time / 60 >= 1;
	var min = truncate((time / 60), 0);
	var n = truncate(time - 60 * min, 0);
	var sec = n > 9 ? "" + n: "0" + n;
	returnedString = min + ":" + sec;
	return returnedString;
}
function truncate (num, places) {
  return Math.trunc(num * Math.pow(10, places)) / Math.pow(10, places);
}

    (function() {
        function log(info) {
            console.log(info);
        }
        function forceSafariPlayAudio() {
            audioEl.load();
            audioEl.play();
            // may cause problems
            // document.getElementById('play').click();
        }
        var audioEl = document.getElementById('audio');
        audioEl.addEventListener('loadstart', function() {
            log('loadstart');
        }, false);
        audioEl.addEventListener('loadeddata', function() {
            log('loadeddata');
        }, false);
        audioEl.addEventListener('loadedmetadata', function() {
            log('loadedmetadata');
        }, false);
        audioEl.addEventListener('canplay', function() {
            log('canplay');
        }, false);
        audioEl.addEventListener('play', function() {
            log('play');
            window.removeEventListener('touchstart', forceSafariPlayAudio, false);
        }, false);
        audioEl.addEventListener('playing', function() {
            log('playing');
        }, false);
        audioEl.addEventListener('pause', function() {
            log('pause');
        }, false);
        window.addEventListener('touchstart', forceSafariPlayAudio, false);
    })();
