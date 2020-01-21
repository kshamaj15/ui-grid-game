let num ;
let arr = [];
let currArr = [];
let sortedArr = [];
let numOfMoves = 0;

//timer
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);
function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = totalSeconds % 60;
  minutesLabel.innerHTML = Math.floor(totalSeconds / 60);
}

//default grid of 3 elements
createGrid(3);


function createGrid(n){
    if(document.querySelectorAll('.grid-item').length>0){
        $("#grid-container").empty();
        $("#rightPanel").empty();
    }
    
    arr = [];
    sortedArr = [];
    currArr = [];
    num = n;
    for(let i=1; i<=num*num; i++){
        arr.push(i);
    }
    
    for(let i=0; i<num; i++){
        let sArr = [];
        for(let j=0; j<num; j++) {
            sArr.push(i*num + j +1);
        }
        sortedArr.push(sArr);
    }


//random array genrator
for(let i=0; i<num; i++){
    let arrR = [];
    let sArr= [];
    for(let j=0; j<num; j++) {
        let rand = Math.abs(Math.floor(Math.random()*(num*num-(i)*num-j)));
        console.log(rand);
        arrR.push(arr[rand]);
        arr.splice(rand, 1);
    }
    currArr.push(arrR);
}

document.getElementById('moves').innerHTML = 'MOVES: '+ numOfMoves;

//grid
for(let i=0; i<currArr.length; i++) {
    for(let j=0; j<currArr.length; j++) {
        if(currArr[i][j]!==num*num) {
            let gridel = document.createElement("div"); 
            gridel.innerHTML = currArr[i][j];
            gridel.className = 'grid-item';
            gridel.rowIndex = i;
            gridel.colIndex = j;
            document.getElementById('grid-container').appendChild(gridel);
        }
    
        else {
            let blank = document.createElement("div");    
            blank.className = 'blank-item';
            blank.rowIndex = i;
            blank.colIndex = j;
            document.getElementById('grid-container').appendChild(blank);
        }
    }
}
}

function gridClicked(e){
    if(e.target.className === 'grid-item') {
        let value = e.target.innerHTML;
        let el = document.getElementsByClassName('blank-item');
        // console.log(e[0].index);
        let i = e.target.rowIndex;
        let j = e.target.colIndex;
        let bi = el[0].rowIndex;
        let bj = el[0].colIndex;
        // console.log(currArr)
        if((i+1 ==bi && bj==j) || (i ==bi && bj+1==j) || (i-1 ==bi && bj==j) ||(i ==bi && bj-1==j)) {
            numOfMoves++;
            document.getElementById('moves').innerHTML = 'MOVES: ' +numOfMoves;
            el[0].innerHTML = value;
            el[0].className = 'grid-item';
            e.target.className = 'blank-item';
            e.target.innerHTML = '';
            currArr[bi][bj] = Number(value);
            currArr[i][j] = num*num;

            let move = document.createElement('p');
            move.innerHTML = 'MOVE ' + numOfMoves + ' ' + Math.floor(totalSeconds / 60) + ':' + totalSeconds % 60;
            move.className = 'move';
            document.getElementById('rightPanel').appendChild(move);
        }
        // console.log(JSON.stringify(currArr.sort()) )
        if(JSON.stringify(currArr) == JSON.stringify(sortedArr)) 
        alert('You won'); 
    }
}

function undo(){

}

function easy(){
    num=3;
    createGrid(3);  
    document.getElementById('grid-container').className = 'easy';
    totalSeconds = 0;
    numOfMoves = 0;
}

function medium(){
    num=4;
    createGrid(4);
    document.getElementById('grid-container').className = 'medium';
    totalSeconds = 0;
    numOfMoves = 0;

}

function hard(){
    num=5;
    createGrid(5);
    document.getElementById('grid-container').className = 'hard';
    totalSeconds = 0;
    numOfMoves = 0
}