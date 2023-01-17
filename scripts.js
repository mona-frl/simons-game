// colours of the buttons
buttonColours = ["red", "blue", "green", "yellow"];

// creates the buttons pattern
var gamePattern = [];

// creates the user pattern
var userClickedPattern = [];

// starting the game
var started = false;
var level = 0;

//starts the game
$(document).on("keydown", function () {
    if (!started) {
        nextSequence();
        started = true;
    }
});

//User's button of choice behavior handler
$(".btn").on('click', function () {
    //variable to getter the id of the chosen button clicked
    var userChosenColour = $(this).attr("id");

    //add the contect of the userChosenColour to the end of the userClickedPattern
    userClickedPattern.push(userChosenColour);

    //call the functions
    animatedPressedButton(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})

//checks the answer function
function checkAnswer(currentLevel) {
    //compares the gamePattern vs the user
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success!")
        //if they are the same after 1 sec, the enxt round starts
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
        //else it stops the game
    } else {
        gameOver()
    }
}

//game over function
function gameOver() {
    $("body").addClass('game-over')
    $("h1").html("Game over! <br>Press any key to restart...")

    setTimeout(function () {
        playSound("wrong")
        $("body").removeClass('game-over')
    }, 300)

    //restart the game after pressing a key
    started = false;
    gamePattern = [];
    level = 0;
}


//generate a random number and assigns to the button using the id
function nextSequence() {
    //changes the title of the level, everytime the function is called
    level++
    $("#level-title").text("Level " + (level));

    userClickedPattern = [];
    //generates the number
    randomNumber = Math.floor(Math.random() * 4);

    //assigns the number generated to the array of buttons
    randomChosenColour = buttonColours[randomNumber];

    //adds the number generated to the new array of buttons
    gamePattern.push(randomChosenColour)

    //select the button with the same id as the randomChosenColour and animate + play sound
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //call the functions
    playSound(randomChosenColour);
}


//Functions for animation and sound
function animatedPressedButton(currentColor) {
    $("#" + currentColor).addClass("pressed");

    //timeout to remove class after 100ms
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    audio = new Audio("./sounds/" + name + ".mp3");
    audio.volume = 0.3;
    audio.play();
}

