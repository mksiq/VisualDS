var board;
var linearSearchButton;
var removeDuplicatesButton;
window.addEventListener("load", loadJavaScript, false);
var randomArray = [];


function loadJavaScript(){
    board = document.getElementById("board");
    let array = [1,2,3,4,5];
    fillBoardWithBar(array, board)
    var generateButton = document.getElementById("bGenerate");
    generateButton.addEventListener("click", generateBars);
    linearSearchButton = document.getElementById("bLinearSearch");
    linearSearchButton.addEventListener("click", linearSearch);
    removeDuplicatesButton = document.getElementById("bRemoveDuplicates");
    removeDuplicatesButton.addEventListener("click", removeDuplicates);
}

function fillBoardWithBar(someArray, board){
    someArray.forEach((num) => {
        let bar = document.createElement("div");
        bar.className = "bar";
        bar.id = `bar${num}`;
        let numberNode = document.createTextNode(`${num}`);
        bar.appendChild(numberNode);
        let size = num*20;
        if(size == 0) size = 10;
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
        randomArray.push(Math.floor(Math.random() * 16));
    fillBoardWithBar(randomArray, board)
    linearSearchButton.disabled = false;
    bRemoveDuplicates.disabled = false;
    document.getElementById("inputNumber").style.display = "block";
}

function linearSearch(){
    let numberOfIterations = 1;
    for(let i = 0; i<randomArray.length; i++){
        if(randomArray[i] == document.getElementById("inputNumber").value){
            document.getElementById("foundIndex").innerHTML = `Found at ${i}. Number of iterations: ${numberOfIterations}`;
            document.getElementById(`bar${document.getElementById("inputNumber").value}`).style.backgroundColor = `rgb(78, 28, 28)`;
            return;
        }
        numberOfIterations++;
    }
    
}

function removeDuplicates(){
    
    let removedCount = 0;
    while(board.hasChildNodes()){
        board.removeChild(board.lastChild);
    }
    for (let i = 0; i < randomArray.length; i++) {
        for(let k = i+1; k < randomArray.length; k++){
            if(randomArray[i] == randomArray[k]){
                removedCount++;
                randomArray.splice(k,1);
            } 
        }
    }
    fillBoardWithBar(randomArray, board);
    document.getElementById("foundIndex").innerHTML = "Number of bars removed: " + removedCount;
}