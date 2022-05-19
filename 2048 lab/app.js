var colorMap = new Map();
var gameArray;
var mergeArray; //keeps track of cells that has merged
var size = 4;
var scoreTracker;

function create2dArray(size, defaultVal){
    var newArray = new Array(size);
    for(let i = 0; i< size; i++)
    {
        temp = new Array(size);

        for(let n =0; n<size; n++)
        {
            temp[n] = defaultVal;
        }
        newArray[i] = temp;
    }

    return newArray;
}

function init(){
    gameArray = create2dArray(size, 0);
    mergeArray = create2dArray(size, false);
    scoreTracker = 0;
    initColorMap();
    generateRandomCell();
    display2darray();
}
function initColorMap(){
    colorMap.set(2, "#eee3da");
    colorMap.set(4, "#eddfc7");
    colorMap.set(8, "#f1b178");
    colorMap.set(16, "#f59463");
    colorMap.set(32, "#f67b60");
    colorMap.set(64, "#edcf73");
    colorMap.set(128, "#edcf73");
    colorMap.set(256, "#eccc62");
    colorMap.set(512, "#edc751");
    colorMap.set(1024, "#ecc43f");
    colorMap.set(2048, "#edc12e");
}
function clearMemory(){
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            mergeArray[i][j] = false;
        }   
    }
    console.log(mergeArray);
}

function display2darray(){
    for(let row = 0;  row < size; row++){
        for(let col = 0;  col < gameArray.length; col++){
            $(`#${row+""+col}`).html("");
            $(`#${row+""+col}`).css("background", "#cdbfb4");
            if(gameArray[row][col] > 0){
                $(`#${row+""+col}`).html(`<span class="number">${gameArray[row][col]}</span>`);
                $(`#${row+""+col}`).css("background", colorMap.get(gameArray[row][col]));

            }
        }
    }
}
function generateRandomCell(){
    let emptyCell = false;
    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            if(gameArray[i][j] === 0){
                emptyCell = true;
                break;
            }
        }
    }
    if(emptyCell){
        do{
            var row = generateRand(4)
            var col = generateRand(4);
        }while(gameArray[row][col] !== 0)
        gameArray[row][col] = 2;
    }
}
function generateRand(max){
    min = 0;
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
function calculateScore(value){
    scoreTracker += value;
    $("#score").text(scoreTracker);
}
function moveLeft(){
    var score = 0;
    for(let row = 0;  row < size; row++){
        for(let col = 1;  col < size; col++){
            // $(`#${row+""+col}`).html(gameArray[row][col]);
            if(gameArray[row][col] > 0){
                let col2 = col;
                let row2 = row;
                while(gameArray[row2][col2-1] === 0 && col2 >= 0){
                    col2--;
                }
                if(col2 !== col){
                    gameArray[row2][col2] = gameArray[row][col];
                    gameArray[row][col] = 0;
                }
                if(gameArray[row2][col2 - 1] === gameArray[row2][col2] && mergeArray[row2][col2 - 1] === false){
                    gameArray[row2][col2 - 1] = gameArray[row2][col2] * 2;
                    score += gameArray[row2][col2 - 1];
                    gameArray[row2][col2] = 0;
                    mergeArray[row2][col2-1] = true;
                }
            }
        }
    }
    calculateScore(score);
}
function moveRight(){
    var score = 0;
    for(let col = 2;  col >= 0; col--){
        for(let row = 0;  row < size; row++){
            if(gameArray[row][col] > 0){
                let row2 = row;
                let col2 = col;
                while(gameArray[row2][col2+1] === 0){
                    col2++;
                }
                if(col2 !== col){
                    gameArray[row2][col2] = gameArray[row][col];
                    gameArray[row][col] = 0;
                }
                if(gameArray[row2][col2 + 1] === gameArray[row2][col2] && mergeArray[row2][col2 + 1] === false){
                    gameArray[row2][col2 + 1] = gameArray[row2][col2] * 2;
                    score += gameArray[row2][col2 + 1];
                    gameArray[row2][col2] = 0;
                    mergeArray[row2][col2+1] = true;
                }
            }
        }
    }
    calculateScore(score);
}
function moveDown(){
    var score = 0;
    for(let col = 0;  col < size; col++){
        for(let row = 2;  row >= 0; row--){
            if(gameArray[row][col] > 0){
                let row2 = row;
                let col2 = col;
                while(gameArray[row2+1][col2] === 0 && row2 < size){
                    row2++;
                    if(row2 === size - 1){
                        break;
                    }
                }
                if(row2 !== row){
                    gameArray[row2][col2] = gameArray[row][col];
                    gameArray[row][col] = 0;
                }
                if(row2 < size-1 && gameArray[row2 + 1][col2] === gameArray[row2][col2] && mergeArray[row2 + 1][col2] === false){
                    gameArray[row2 + 1][col2] = gameArray[row2][col2] * 2;
                    score += gameArray[row2 + 1][col2];
                    gameArray[row2][col2] = 0;
                    mergeArray[row2 + 1][col2] = true;
                }
            }
        }
    }
    calculateScore(score);
}
function moveUp(){
    var score = 0;
    for(let col = 0;  col < size; col++){
        for(let row = 1;  row < size; row++){
            if(gameArray[row][col] > 0){
                let row2 = row;
                let col2 = col;
                while(gameArray[row2-1][col2] === 0 && row2 >= 0){
                    row2--;
                    if(row2 <= 0){
                        row2 = 0;
                        break;
                    }
                }
                if(row2 !== row){
                    gameArray[row2][col2] = gameArray[row][col];
                    gameArray[row][col] = 0;
                }
                if(row2 > 0 && 
                gameArray[row2 - 1][col2] === gameArray[row2][col2] && 
                mergeArray[row2 - 1][col2] === false){

                    gameArray[row2 - 1][col2] = gameArray[row2][col2] * 2;
                    score += gameArray[row2 - 1][col2];
                    gameArray[row2][col2] = 0;
                    mergeArray[row2 - 1][col2] = true;

                }
            }
        }
    }
    calculateScore(score);
}
