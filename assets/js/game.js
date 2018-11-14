
//############################## Global Variables ################//
var baseAttack = 0; //first attack strngth
var player; //Holds player object
var defender; //Holds the defender object
var charArray = []; //Array that stores the game characters
var playerSelected = false; //flag for picked player
var defenderSelected = false; // flag for picked defender

//############################## Character Objects ##############//     
var characters = {  //characters is the object
    charArray: [  //array of players to be selected
        chewbacca = {
            name: "Chewbacca",
            attackPower: 40,
            healthPoints: 150,
            counterAttackPower: 15,
            healthText: $("#chewHealth")
        },
        luke = {
            name: "Luke Skywalker",
            attackPower: 50,
            healthPoints: 160,
            counterAttackPower: 20,
            healthText: $("#lukeHealth")
        },
        obi = {
            name: "Obi-Wan-Kanobi",
            attackPower: 30,
            healthPoints: 120,
            counterAttackPower: 10,
            healthText: $("#obiHealth")
        },
        darth = {
            name: "Darth Vader",
            attackPower: 35,
            healthPoints: 130,
            counterAttackPower: 5,
            healthText: $("#vaderHealth")
        }
    ],
    player: " ", //placeholder for values of selected player
    opponent: " ", //placeholder for values of selected opponent
};
//#################### Misc Functions ##############################
function playAudio() {
    var audio = new Audio("assets/themeSongSmall.mp3");
    audio.play();
}
function restart() {
    location.reload();
}
//#################### Click Event to select Player ################
function init() {
    for (var i = 0; i < characters.charArray.length; i++) {
        characters.charArray[i].healthText.text(characters.charArray[i].healthPoints)
    }
}
$(document).ready(function () {
    init();
    $(".card").on("click", function () {
        var charIndex = $(".card").index(this) //returns index of card clicked (0-3)
        if (!playerSelected) {
            playAudio(); // starts theme song
            $("#jedi").append(this); //this is the body of what we are clicking
            playerSelected = true;  // crucial, otherwise the if will be repeated
            characters.player = characters.charArray[charIndex]; //pulls index of array into player placeholder
            characters.charArray.splice(charIndex, 1) //lets array know it got smaller for an accurate count
            console.log(characters.player.name);
        }
        else if (playerSelected && !defenderSelected) { //determines both conditions to end code
            $("#opponent").append(this);  //this is the body of what we are clicking
            defenderSelected = true; //once this is set code stops running
            characters.opponent = characters.charArray[charIndex]; //pulls index of array into 
            characters.charArray.splice(charIndex, 1) //lets array know it got smaller for an accurate count
            $(".upper").children().hide(); // remove div holding players
            console.log(characters.opponent.name);
        }
        /*     else if (playerSelected && defenderSelected){
                
            } */
    });

    //################### Function to score battle ###########################
    $("#button").on("click", function () {
        if (playerSelected && defenderSelected) {
            characters.opponent.healthPoints -= characters.player.attackPower
            characters.player.healthPoints -= characters.opponent.attackPower
            characters.player.healthText.text(characters.player.healthPoints) /* pulls health value and inserts to bottom of card */
            if (characters.opponent.healthPoints <= 0) {
                $("#opponent").children().hide();// hides everything in opponent div
                $(".upper").children().toggle();// shows the remaining players in the opponent div
                defenderSelected = false;
                restart();
            }
        }
    });

});