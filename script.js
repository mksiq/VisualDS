var board;
var linearSearchButton;
var removeDuplicatesButton;
var bubbleSortButton;
var binarySearchButton;
var generateButton;
window.addEventListener("load", loadJavaScript, false);
var randomArray = [];

function loadJavaScript(){
    board = document.getElementById("board");
    let array = [1,2,3,4,5];
    fillBoardWithBar(array, board);
    generateButton = document.getElementById("bGenerate");
    generateButton.addEventListener("click", generateBars);
    linearSearchButton = document.getElementById("bLinearSearch");
    linearSearchButton.addEventListener("click", linearSearch);
    removeDuplicatesButton = document.getElementById("bRemoveDuplicates");
    removeDuplicatesButton.addEventListener("click", removeDuplicates);
    selectionSortButton = document.getElementById("bSelectionSort");
    selectionSortButton.addEventListener("click", selectionSort);
    bubbleSortButton = document.getElementById("bBubbleSort");
    bubbleSortButton.addEventListener("click", bubbleSort);
    binarySearchButton = document.getElementById("bBinarySearch");
    binarySearchButton.addEventListener("click", binarySearch);    
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
    removeBars();
    while(randomArray.length < 10)
        randomArray.push(Math.floor(Math.random() * 16));
    fillBoardWithBar(randomArray, board)
    enableButtons();
    document.getElementById("inputNumber").style.display = "block";
    document.getElementById("foundIndex").innerHTML = "";
}

function enableButtons(){
    linearSearchButton.disabled = false;
    bRemoveDuplicates.disabled = false;
    bubbleSortButton.disabled = false;
    binarySearchButton.disabled = false;
    selectionSortButton.disabled = false;
}

function linearSearch(){
    if(document.getElementById("inputNumber").value){
        let numberOfIterations = 0;
        for(let i = 0; i<randomArray.length; i++){
            numberOfIterations++;
            if(randomArray[i] == document.getElementById("inputNumber").value){
                setFoundText(i, numberOfIterations);
                return;
            }    
        }    
        document.getElementById("foundIndex").innerHTML = `Not Found. Number of iterations: ${numberOfIterations}. Θ(n) `;
        
    } else {
        document.getElementById("foundIndex").innerHTML = `Put a number`;
    }
}

function binarySearch(){
    let min = 0;
    let max = randomArray.length-1;
    let guess;
    let found = -1;
    let numberOfIterations = 0;
    if(document.getElementById("inputNumber").value){
        while(min <= max){
            guess = Math.floor((min + max)/2);
            numberOfIterations++;
            if(randomArray[guess] == document.getElementById("inputNumber").value){
                found = guess;
                break;
            } else {
                if(randomArray[guess] < document.getElementById("inputNumber").value){
                    min =  guess + 1;
                } else {
                    max = guess -1;
                }
            }
            if(numberOfIterations == 1000) break;
        }
        if(found == -1){
            document.getElementById("foundIndex").innerHTML = `Not found. Number of iterations: ${numberOfIterations}. <b>Only works after sorted.</b>`;
        }
        if(randomArray[guess] == document.getElementById("inputNumber").value){
            setFoundText(guess, numberOfIterations);
            return;
        }
    } else {
        document.getElementById("foundIndex").innerHTML = `Put a number`;
    }
}

function setFoundText(i, numberOfIterations){
    document.getElementById("foundIndex").innerHTML = `Found at ${i}. Number of iterations: ${numberOfIterations}`;
    document.getElementById(`bar${document.getElementById("inputNumber").value}`).style.backgroundColor = `rgb(78, 28, 28)`;
}

function removeDuplicates(){
    let removedCount = 0;
    removeBars();
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

function selectionSort(){
    let iterations = 0;
    let valuesChanges = 0;
    let indexOfMinimum = 0;
    for(let i = 0; i < randomArray.length-1; i++){
        indexOfMinimum = i;
        for(let j = i+1; j < randomArray.length; j++){
            if(randomArray[j] < randomArray[indexOfMinimum]){
                indexOfMinimum = j;
                valuesChanges++;
            }            
            iterations++;   
        }
        swap(indexOfMinimum, i);
    }
    removeBars();
    document.getElementById("foundIndex").innerHTML = "Times iterated to sort: " + iterations + ". Numbers changed: " + valuesChanges;
    fillBoardWithBar(randomArray, board);
}

function swap(source, destination){
    let temp = randomArray[source];
    randomArray[source] = randomArray[destination];
    randomArray[destination] = temp;
}

function bubbleSort(){
    let iterations = 0;
    let valuesChanges = 0;
    for (let i = 0; i < randomArray.length; i++) {
        for (let j = 0; j < randomArray.length; j++) {
            if(randomArray[i] < randomArray[j]){
                swap(j, i);
                valuesChanges++;
            }
            iterations++;         
        }
    }
    removeBars();
    document.getElementById("foundIndex").innerHTML = "Times iterated to sort: " + iterations + ". Numbers changed: " + valuesChanges;
    fillBoardWithBar(randomArray, board);
}

function removeBars(){
    while(board.hasChildNodes()){
        board.removeChild(board.lastChild);
    }
}