'use strict';

let num;
let arr = [];
let currArr = [];
let sortedArr = [];
let numOfMoves = 0;
let prev, curr;

// timer
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);
function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = totalSeconds % 60;
    minutesLabel.innerHTML = Math.floor(totalSeconds / 60);
}

// default grid of 3 elements
createGrid(3);


function createGrid(n) {
    if (document.querySelectorAll('.grid-item').length > 0) {
        $("#grid-container").empty();
    }

    arr = [];
    sortedArr = [];
    currArr = [];
    num = n;
    for (let i = 1; i <= num * num; i++) {
        arr.push(i);
    }

    for (let i = 0; i < num; i++) {
        let sArr = [];
        for (let j = 0; j < num; j++) {
            sArr.push(i * num + j + 1);
        }
        sortedArr.push(sArr);
    }

    // random array genrator
    for (let i = 0; i < num; i++) {
        let arrR = [];
        let sArr = [];
        for (let j = 0; j < num; j++) {
            let rand = Math.abs(Math.floor(Math.random() * (num * num - (i) * num - j)));
            // console.log(rand);
            arrR.push(arr[rand]);
            arr.splice(rand, 1);
        }
        currArr.push(arrR);
    }

    document.getElementById('moves').innerHTML = 'Moves: ' + numOfMoves;

    // grid
    for (let i = 0; i < currArr.length; i++) {
        for (let j = 0; j < currArr.length; j++) {
            if (currArr[i][j] !== num * num) {
                let gridel = document.createElement("p");
                gridel.innerHTML = currArr[i][j];
                gridel.className = 'grid-item';
                gridel.rowIndex = i;
                gridel.colIndex = j;
                document.getElementById('grid-container').appendChild(gridel);
            }

            else {
                let blank = document.createElement("p");
                blank.className = 'blank-item';
                blank.rowIndex = i;
                blank.colIndex = j;
                document.getElementById('grid-container').appendChild(blank);
            }
        }
    }
}

function swapBlocks(block1, block2, isUnduDisable) {
    let value = block2.innerHTML;
    let bi = block1.rowIndex;
    let bj = block1.colIndex;
    let i = block2.rowIndex;
    let j = block2.colIndex;
    block1.innerHTML = value;
    block1.className = 'grid-item';
    block2.className = 'blank-item';
    block2.innerHTML = '';
    currArr[bi][bj] = Number(value);
    currArr[i][j] = num * num;
    addMove(totalSeconds);
    prev = block1;
    curr = block2;
    document.getElementById('undo').disabled = isUnduDisable;

    if (JSON.stringify(currArr) == JSON.stringify(sortedArr)) {
        const lotti = document.getElementById('success');
        const header = document.getElementById('welcome');
        setTimeout(() => {
            lotti.style.display = 'block';
            header.innerHTML = 'Congrats, You Won';
        })
        setTimeout(() => {
            lotti.style.display = 'none';
            window.location.reload();
        }, 5000)
    }

}

function undo() {
    swapBlocks(curr, prev, true);
}

function gridClicked(e) {
    if (e.target.className === 'grid-item') {
        let el = document.getElementsByClassName('blank-item');

        let i = e.target.rowIndex;
        let j = e.target.colIndex;
        let bi = el[0].rowIndex;
        let bj = el[0].colIndex;

        if ((i + 1 == bi && bj == j) || (i == bi && bj + 1 == j) || (i - 1 == bi && bj == j) || (i == bi && bj - 1 == j)) {
            swapBlocks(el[0], e.target)
        }
    }
}

let addMove = (totalSeconds) => {
    numOfMoves++;
    document.getElementById('moves').innerHTML = 'Moves: ' + numOfMoves;
}
let left = () => {
    let el = document.getElementsByClassName('blank-item');
    let bi = el[0].rowIndex;
    let bj = el[0].colIndex;
    if (bj > 0) {
        let items = document.getElementsByClassName('grid-item');
        const node = items[bi * num + bj - 1];
        swapBlocks(el[0], node)
    }
}

let right = () => {
    let el = document.getElementsByClassName('blank-item');
    let bi = el[0].rowIndex;
    let bj = el[0].colIndex;
    if (bj < num - 1) {
        let items = document.getElementsByClassName('grid-item');
        const node = items[bi * num + bj];
        swapBlocks(el[0], node)
    }
}

let up = () => {
    let el = document.getElementsByClassName('blank-item');
    let bi = el[0].rowIndex;
    let bj = el[0].colIndex;
    if (bi > 0) {
        let items = document.getElementsByClassName('grid-item');
        const node = items[(bi - 1) * num + bj];
        swapBlocks(el[0], node)
    }
}

let down = () => {
    let el = document.getElementsByClassName('blank-item');
    let bi = el[0].rowIndex;
    let bj = el[0].colIndex;
    if (bi < num - 1) {
        let items = document.getElementsByClassName('grid-item');
        const node = items[(bi + 1) * num + bj - 1];
        swapBlocks(el[0], node)
    }
}

function gotoCompexity(n, text) {
    createGrid(n);
    document.getElementById('grid-container').className = text;
    totalSeconds = 0;
    numOfMoves = 0;
}

document.onkeydown = function (e) {
    switch (e.keyCode) {
        case 37 || 38:
            left();
            break;
        case 38:
            up();
            break;
        case 39:
            right();
            break;
        case 40:
            down();
            break;
    }
};
