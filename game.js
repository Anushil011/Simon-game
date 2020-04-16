
var color = ["red", "blue", "green", "yellow"];             //color array

//initialize variables
var gameSequence = [];
var userSequence = [];
var started = false;
var level = 1;




//*************** game chooses a color *************************/ 
$(document).keypress(function() {

    if(!started){
    started = true;
    nextSequence();
    }
});


/**************** next sequence ********************************/ 
function nextSequence(){

    $("#level-title").text("Level " + level);     //game header
    level++;

    //game selects random colour
    var randomNum  = Math.floor(Math.random()*4);
    var nextColor = color[randomNum];

    //add the game chosen colour to game array
    gameSequence.push(nextColor);

    //select new colour with an interval so that it will be visible to the player
    setTimeout(function () {
        buttonSound(nextColor);
      }, 1000);

      //clear the player array after every level
    userSequence = [];
}



/***************** player selected button **********************/ 
$(".btn").click(function(){

    //select the id of the colour selected 
    var userClicked = $(this).attr("id");    
    userSequence.push(userClicked);
    buttonSound(userClicked);

    var index = userSequence.length-1;   //index of the last colour clicked

    //if user selected wrong colour in the game sequence
    if(userSequence[index] != gameSequence[index])
    {
        
        $("#level-title").text("Game Over, Press Any Key to Restart");      //game title
        $("body").addClass("game-over");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();

        setTimeout(function(){
            $("body").removeClass("game-over");
        },1000)
        gameSequence=[];
        started = false;
        level = 1;

    }
    
    //if the user selects the correct colour sequence, game selects another random colour
    else if(gameSequence[gameSequence.length-1]==userSequence[gameSequence.length-1])
    {
        nextSequence();
    }
});




/****************** make sound and button animate *****************************/
function buttonSound(selectedButton){

    //adding class to manipulate css for selected colour block
    $("#"+selectedButton).addClass("pressed");  

    //play sound of selected button
    var audio = new Audio("sounds/" + selectedButton + ".mp3");         
    audio.play();

    //remove added class from the selected colour block after 0.1 second
    setTimeout(function () {
        $("#" + selectedButton).removeClass("pressed");
      }, 100);
}




