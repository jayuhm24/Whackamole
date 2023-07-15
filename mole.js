let currMoletime;//will help is to keep track on which tile is the mole currently
let currplanttime;//will help is to keep track on which tile is the plant currently
let score = 0;
let gameover = false;


window.onload = function () {
    document.getElementById("startButton").addEventListener("click", startGame);
};

function startGame() {
    setGame();
    document.getElementById("startButton").disabled = true; // Disable the start button once the game starts
}

function setGame() {
    for (i = 0; i < 9; i++) { //0-8 //creating 9 div elements
        let tile = document.createElement("div")
        tile.id = i.toString() //This code assumes that you have a variable tile representing the tile element, and i is a numeric value that you want to set as the ID. The toString() method is used to convert the numeric value i into a string before assigning it to the id property.
        tile.addEventListener("click", selectTile);//on click will call selecttile function. tile is id
        document.getElementById("board").appendChild(tile)
    }
    setInterval(setMole, 1000/*generate mole every 1 seconds*/) //called  a function setMole()
    setInterval(setplant, 2000/*generate plant every 2 seconds*/) //called  a function setplant()
}

function randomtile() {
    let num = Math.floor(Math.random() * 9) //generates random decimal number bet (0-1)*9 =(0-9 range excluding 9) and round num using floor(0-8 integer)
    return num.toString(); //returns numbr as a string so that can be used as id
}

function setMole() {

    if (gameover) { //stops the count value if game is over
        return
    }

    if (currMoletime) { //remove mole and print new mole
        currMoletime.innerHTML = "";
    }
    let mole = document.createElement("img")
    mole.src = "./monty-mole.png" //taking mole img

    //Now to randomly place the mole in any tile
    let num = randomtile();

    //Now we check if both do not come at same tile and avoid override
    if (currplanttime && currplanttime.id == num) {
        return
    }

    //now it will take random tile as a div tag and place mole to it
    currMoletime = document.getElementById(num)
    currMoletime.appendChild(mole)
}

function setplant() {

    if (gameover) {
        return
    }

    if (currplanttime) {
        currplanttime.innerHTML = "";
    }
    let plant = document.createElement("img")
    plant.src = "./piranha-plant.png" //taking plant img

    //Now to randomly place the mole in any tile
    let num = randomtile();

    //Now we check if both do not come at same tile and avoid override
    if (currMoletime && currMoletime.id == num) {
        return
    }


    //now it will take random tile as a div tag and place mole to it
    currplanttime = document.getElementById(num)
    currplanttime.appendChild(plant)
}


function selectTile() {

    if (gameover) {
        return
    }

    if (this == currMoletime) { //this refers to tile which is clicked and its an mole  
        score += 10
        document.getElementById("score").innerText = score.toString() //will update score
    }
    else if (this == currplanttime) {
        document.getElementById("score").innerHTML = "GAME OVER!YOUR SCORE IS: " + score.toString() + " Refresh to restart";
        gameover = true;
    }
}