var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var userClickedPattern = [];
var started = false;
var level = 0;

function startOver() {
   level = 0;
   gamePattern = [];
   started = false;
}

function checkAnswer(currentLevel) {
   if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length) {
         setTimeout(() => {
            nextSequence();
         }, 1000);
      }
   } else {
      $("body").addClass("game-over");
      setTimeout(() => {
         $("body").removeClass("game-over")
      }, 200);
      playSound("wrong");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
   }
}

$(document).keypress(function () {
   if (!started) {
      $("#level-title").text("level " + level);
      nextSequence();
      started = true;
   }
});

$(".btn").click(function () {
   var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length - 1);
})

function nextSequence() {
   userClickedPattern = [];
   level++;
   $("#level-title").text("level " + level)
   var randomNumber = Math.floor(Math.random() * 4);
   var randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);
   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
}

function playSound(name) {
   var audio = new Audio("sounds/" + name + ".mp3");
   audio.play();
}

function animatePress(currentColour) {
   $("#" + currentColour).addClass("pressed");
   setTimeout(function () {
      $("#" + currentColour).removeClass("pressed");
   }, 100)
}