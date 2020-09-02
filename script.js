var board;
var linearSearchButton;
window.addEventListener("load", loadJavaScript, false);
var randomArray = [];


function loadJavaScript(){
    board = document.getElementById("board");
    var array = [1,2,3,4,5];
    fillBoardWithBar(array, board)
    var generateButton = document.getElementById("bGenerate");
    generateButton.addEventListener("click", generateBars);
    linearSearchButton = document.getElementById("bLinearSearch");
    linearSearchButton.addEventListener("click", linearSearch);
}

function fillBoardWithBar(someArray, board){
    someArray.forEach((num) => {
        var bar = document.createElement("div");
        bar.className = "bar";
        bar.id = `bar${num}`;
        var numberNode = document.createTextNode(`${num}`);
        bar.appendChild(numberNode);
        var size = num*25;
        if(size == 0) size = 13;
        bar.style.height=`${size}px`;
        board.appendChild(bar);
    });

}

function generateBars(){
    randomArray = [];
    while(board.hasChildNodes()){
        board.removeChild(board.lastChild);
    }
    while(randomArray.length < 10)
        randomArray.push(Math.floor(Math.random() * 14));
    fillBoardWithBar(randomArray, board)
    linearSearchButton.disabled = false;
    document.getElementById("inputNumber").style.display = "block";
}

function linearSearch(){
    var numberOfIterations = 1;
    for(var i = 0; i<randomArray.length; i++){
        if(randomArray[i] == document.getElementById("inputNumber").value){
            document.getElementById("foundIndex").innerHTML = `Found at ${i}. Number of iterations: ${numberOfIterations}`;
            document.getElementById(`bar${document.getElementById("inputNumber").value}`).style.backgroundColor = `rgb(78, 28, 28)`;
            return;
        }
        numberOfIterations++;
    }
    document.getElementById("foundIndex").innerHTML = "Not Found. Number of iterations: " + numberOfIterations;
}
