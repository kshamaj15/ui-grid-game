'use strict';

let num;
let arr = [];
let currArr = [];
let sortedArr = [];
let numOfMoves = 0;

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

function gridClicked(e) {
    if (e.target.className === 'grid-item') {
        let value = e.target.innerHTML;
        let el = document.getElementsByClassName('blank-item');

        let i = e.target.rowIndex;
        let j = e.target.colIndex;
        let bi = el[0].rowIndex;
        let bj = el[0].colIndex;

        if ((i + 1 == bi && bj == j) || (i == bi && bj + 1 == j) || (i - 1 == bi && bj == j) || (i == bi && bj - 1 == j)) {
            el[0].innerHTML = value;
            el[0].className = 'grid-item';
            e.target.className = 'blank-item';
            e.target.innerHTML = '';
            currArr[bi][bj] = Number(value);
            currArr[i][j] = num * num;
            addMove(totalSeconds);
        }

        if (JSON.stringify(currArr) == JSON.stringify(sortedArr))
            alert('You won');
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

        let value = currArr[bi][bj - 1];
        currArr[bi][bj] = value;
        currArr[bi][bj - 1] = num * num;
        el[0].innerHTML = value;
        el[0].className = 'grid-item';

        node.className = 'blank-item';
        node.innerHTML = '';

    }
}

let right = () => {
    let el = document.getElementsByClassName('blank-item');
    let bi = el[0].rowIndex;
    let bj = el[0].colIndex;
    if (bj < num - 1) {
        let items = document.getElementsByClassName('grid-item');
        const node = items[bi * num + bj];
        let value = currArr[bi][bj + 1];
        currArr[bi][bj] = value;
        currArr[bi][bj + 1] = num * num;
        el[0].innerHTML = value;
        el[0].className = 'grid-item';

        node.className = 'blank-item';
        node.innerHTML = '';

    }
}

let up = () => {
    let el = document.getElementsByClassName('blank-item');
    let bi = el[0].rowIndex;
    let bj = el[0].colIndex;
    if (bi > 0) {
        let items = document.getElementsByClassName('grid-item');
        const node = items[(bi - 1) * num + bj];
        let value = currArr[bi - 1][bj];
        currArr[bi][bj] = value;
        currArr[bi - 1][bj] = num * num;
        el[0].innerHTML = value;
        el[0].className = 'grid-item';

        node.className = 'blank-item';
        node.innerHTML = '';

    }
}

let down = () => {
    let el = document.getElementsByClassName('blank-item');
    let bi = el[0].rowIndex;
    let bj = el[0].colIndex;
    if (bi < num - 1) {
        let items = document.getElementsByClassName('grid-item');
        const node = items[(bi + 1) * num + bj - 1];
        let value = currArr[bi + 1][bj];
        currArr[bi][bj] = value;
        currArr[bi + 1][bj] = num * num;
        el[0].innerHTML = value;
        el[0].className = 'grid-item';

        node.className = 'blank-item';
        node.innerHTML = '';

    }
}

function undo() {

}

function easy() {
    num = 3;
    createGrid(3);
    document.getElementById('grid-container').className = 'easy';
    totalSeconds = 0;
    numOfMoves = 0;
}

function medium() {
    num = 4;
    createGrid(4);
    document.getElementById('grid-container').className = 'medium';
    totalSeconds = 0;
    numOfMoves = 0;

}

function hard() {
    num = 5;
    createGrid(5);
    document.getElementById('grid-container').className = 'hard';
    totalSeconds = 0;
    numOfMoves = 0
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
