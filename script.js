var board;
window.addEventListener("load", loadJavaScript, false);



function loadJavaScript(){
    board = document.getElementById("board");
    var array = [1,2,3,4,5];
    fillBoardWithBar(array, board)
    var generateButton = document.getElementById("bGenerate");
    generateButton.addEventListener("click", generateBars);
    

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
    var randomArray = [];
    while(board.hasChildNodes()){
        board.removeChild(board.lastChild);
    }
    while(randomArray.length < 10)
        randomArray.push(Math.floor(Math.random() * 16));
    fillBoardWithBar(randomArray, board)


}
