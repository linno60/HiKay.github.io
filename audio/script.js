
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

function playPause() {
if (song.paused) {
	song.play();
   document.getElementById('play').style.display = "none";
   document.getElementById('pause').style.display = "";
   albumCover.style.width = "100%";
   albumCover.style.height = "100%";
   albumCover.style.marginTop = "0px";
   albumCover.style.marginBottom = "0px";
   albumCover.style["boxShadow"] = shadow;

} else {
   song.pause();
   document.getElementById('pause').style.display = "none";
   document.getElementById('play').style.display = "";
   albumCover.style.width = "80%";
   albumCover.style.height = "80%";
   albumCover.style.marginTop = pageWidth * 0.1 + "px";
   albumCover.style.marginBottom = pageWidth * 0.1 + "px";
   albumCover.style["boxShadow"] = noShadow;
}
}
function seek() {
	song.currentTime = song.currentTime + 15;
}
function back() {
	song.currentTime = song.currentTime - 15;
}
function setVolume() {
   var volume = document.getElementById("volume-slider");
   audio.volume = volume.value;
	   volume.style.backgroundImage = "-webkit-gradient(linear,left top,right top,color-stop(" + volume.value + ", #909191),color-stop(" + volume.value + ", #ddd))";
}
function previewProgress() {
	prev(function() {
		// isAdjustingBar = false;
	});
}

function prev(callback) {
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