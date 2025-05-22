const buttons = document.querySelectorAll(".box");
const reset = document.querySelector("#reset");

const win = document.querySelector("#winner");
let turnO = true;

const newgame = document.querySelector("#newgame");

const winnerMsg = document.querySelector(".winner-msg");



winPattern = [
    [0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]
];



for(let i=0;i<buttons.length;i++){
    buttons[i].addEventListener("click",()=>{
        
        if(turnO ){
            buttons[i].innerText ="O"
            turnO = false;
        }
        else{
            buttons[i].innerText ="X"
            turnO = true;
        }
        buttons[i].disabled = true;
        checkwinner();
    })
}

function disableButtons() {
    for(let box of buttons){
        box.disabled = true;
    }
}

function enableButtons() {
    for(let box of buttons){
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor="";
        box.classList.remove("light");
    }
    win.innerText = "";
}

function checkwinner() {
    let draw = true; 
    for (pattern of winPattern) {
        let pos1 = buttons[pattern[0]].innerText;
        let pos2 = buttons[pattern[1]].innerText;
        let pos3 = buttons[pattern[2]].innerText;
            
        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                winner(pos1);
                buttons[pattern[0]].style.backgroundColor = "rgb(32, 175, 218)";
                buttons[pattern[1]].style.backgroundColor = "rgb(0, 145, 255)";    
                buttons[pattern[2]].style.backgroundColor = "rgb(218, 32, 147)";
                buttons[pattern[0]].classList.add("light");
                buttons[pattern[1]].classList.add("light");
                buttons[pattern[2]].classList.add("light");
                return;
            }
        }
    }
    
    
    for (let button of buttons) {
        if (button.innerText === "") {
            draw = false; 
            break;
        }
    }
    
    if (draw) {
        winner(null);
    }
}


function winner(result){
    if(result){
        win.innerText = `Congratulations winner is ${result}`;
        console.log("winner is ",result)
    }
    else{
        win.innerText = `Match is draw`;
        console.log("Draw");
    }
    newgame.classList.remove("hide");
    newgame.classList.add("newgame");
    newgame.innerText = "New Game";
    
    winnerMsg.style.display = "block";
    disableButtons();
    
}


function resetgame(){
    turnO = true
    enableButtons();
    newgame.classList.add("hide");
    document.querySelector(".winner-msg").style.display = "none";
}

newgame.addEventListener("click",resetgame);
reset.addEventListener("click",resetgame);