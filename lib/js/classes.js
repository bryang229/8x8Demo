//A simple function converting a number from one range of numbers to another range
//i.e 1 from [1,10] => [10,20] becomes 11
const mapNumber = (x, inMin, inMax, outMin, outMax) => {
    return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

//A class of rowsXcol sized array based on the users input upon constucting
//Main use is for the setLEDS() function of the LedMatrix Class
class Img {
    constructor(rows, cols, values) {
        this.img = [];
        if (typeof(values) == typeof(1)) {
            console.log("Number")
            for (let i = 0; i < rows; i++) {
                this.img.push([]);
                for (let j = 0; j < cols; j++) {
                    this.img[i].push(values);
                }
            }
        } else if (typeof(values) == typeof([])) {
            // console.log("Arr")
            for (let i = 0; i < rows; i++) {
                this.img.push(values[i]);


            }
        }
    }
}

//The Grid class deals with the user location, main purpose is for the LedMatrix Class, using the check() function of the grid class
//important information of the user can be found such as the location based off the quadarents of the grid (which read as the center of the grid being (0,0))
class Grid {
    constructor(start, end, size) {
        this.start = start;
        this.end = end;
        this.size = size;
        this.xValues = [];
        this.yValues = [];
        this.setVals();
    }

    setVals = () => {
        for (let i = 0; i < 8; i++) {
            this.yValues.push(this.start.y + i * this.size);
            for (let j = 0; j < 8; j++) {
                this.xValues[j] = this.start.x + j * this.size;
            }
        }
        this.xValues.push(this.end.x);
        this.yValues.push(this.end.y);
    }

    drawGrid() {
        line(this.start.x, this.start.y, this.end.x, this.end.y);
        line(this.start.x, this.end.y, this.end.x, this.start.y);
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let centerCheck = [(i == 3 || i == 4), (j == 3 || j == 4)];
                if (!centerCheck[0] || !centerCheck[1]) {
                    rect(this.xValues[j], this.yValues[i], this.size, this.size);
                }
            }
        }
    }


    check(mousex, mousey) {
        let location = {};
        let userX = mousex;
        let userY = mousey;

        if (userX > this.xValues[0] && userX < this.xValues[1]) {
            location.x = 0;
        } else if (userX > this.xValues[1] && userX < this.xValues[2])
            location.x = 1;
        else if (userX > this.xValues[2] && userX < this.xValues[3])
            location.x = 2;
        else if (userX > this.xValues[3] && userX < this.xValues[4])
            location.x = 30;
        else if (userX > this.xValues[4] && userX < this.xValues[5])
            location.x = 40;
        else if (userX > this.xValues[5] && userX < this.xValues[6])
            location.x = 5;
        else if (userX > this.xValues[6] && userX < this.xValues[7])
            location.x = 6;
        else if (userX > this.xValues[7] && userX < this.xValues[8])
            location.x = 7;
        else {
            location.x = -1;
        }
        if (userY > this.yValues[0] && userY < this.yValues[1])
            location.y = 0;
        else if (userY > this.yValues[1] && userY < this.yValues[2])
            location.y = 1;
        else if (userY > this.yValues[2] && userY < this.yValues[3])
            location.y = 2;
        else if (userY > this.yValues[3] && userY < this.yValues[4])
            location.y = 30;
        else if (userY > this.yValues[4] && userY < this.yValues[5])
            location.y = 40;
        else if (userY > this.yValues[5] && userY < this.yValues[6])
            location.y = 5;
        else if (userY > this.yValues[6] && userY < this.yValues[7])
            location.y = 6;
        else if (userY > this.yValues[7] && userY < this.yValues[8])
            location.y = 7;
        else
            location.y = -1;

        if (location.x >= 0 && location.y >= 0) {
            if (location.x > 10 && location.y > 10) {
                return { result: [true, true], location: location };
            } else {
                location.x = location.x > 10 ? location.x / 10 : location.x;
                location.y = location.y > 10 ? location.y / 10 : location.y;
                return { result: [true, false], location: location, userPos: { x: userX, y: userY } };
            }
        } else {
            location.x = location.x > 10 ? location.x / 10 : location.x;
            location.y = location.y > 10 ? location.y / 10 : location.y;
            return { result: [false, false], location };
        }
        // console.log([location,userX,userY])
    }
}

//A LED of the LedMatrix, allows for easy turning on and off of indivual lights of it's respective LedMatrix
class LED {
    constructor(x, y, brightness, size) {
        this.x = x;
        this.y = y;
        this.brightness = brightness;
        this.size = size;
    }

    drawLED = () => {
        fill(`rgb(${this.brightness},0,0)`);
        let margin = this.size > 10 ? 6 : 7;
        let space = this.size > 10 ? 3 : 2;
        rect(this.x - margin, this.y - margin, this.size - space, this.size - space, 3.5);
        noFill();
    }

    setLED = (brightness) => {
        this.brightness = Math.floor(brightness);
        this.drawLED();
    }
}



const emptyRow = [0, 0, 0, 0, 0, 0, 0, 0];
let matrixRow = [0, 0, 0, 255, 255, 0, 0, 0];
let normalMode = new Img(8, 8, [emptyRow, emptyRow, emptyRow, matrixRow, matrixRow, emptyRow, emptyRow, emptyRow]);
let uhOH = new Img(8, 8, 255);


//The LedMatrix class allows for a LedMatrix to be drawn at any reasonible x,y or size
class LedMatrix {
    constructor(xVal, yVal, matrixSize, sens = 100) {
        this.ledMatrixPos = { x: xVal, y: yVal };
        this.sens = sens;
        this.grid = new Grid({ x: xVal - sens * 3 / 2, y: yVal - sens * 3 / 2 }, { x: xVal + matrixSize + sens * 3 / 2, y: yVal + matrixSize + sens * 3 / 2 }, sens / 2)
        this.LEDS = [];
        this.matrixSize = matrixSize;
        this.matrixStartX = this.ledMatrixPos.x + 7.5;
        this.matrixStartY = this.ledMatrixPos.y + 7.5;
        this.ledSize = this.matrixSize / 8;

        for (let i = 0; i < 8; i++) {
            this.LEDS.push([]);
            for (let j = 0; j < 8; j++) {
                let centerLogic = [(i == 3 || i == 4), (j == 3 || j == 4)];
                //logic for tempLED is using the matrixStart to have a "orgin" of some sort, j is used for X and i for Y
                //the ledSize is multplied to have proper spacing, center logic is to light up the center as it is the LED matrix itself
                let tempLED = new LED(this.matrixStartX + this.ledSize * j, this.matrixStartY + this.ledSize * i, (centerLogic[0] && centerLogic[1]) ? 255 : 51, this.ledSize);
                this.LEDS[i].push(tempLED);
            }
        }
    }

    setLED(x, y, brightness) {
        this.LEDS[y][x].setLED(brightness);
    }

    setLEDS(img, rows, cols) {
        // console.log(['setting leds',img])
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                this.setLED(i, j, img.img[j][i]);
            }
        }
    }

    getLEDPos = () => {
        positions = { xVals: [], yVals: [] }
        for (let i = 0; i < 8; i++) {
            for (let led of this.LEDS) {
                positions.xVals.push(led.x);
                positions.yVals.push(led.y);
            }
        }
        return positions
    }

    getMarginForMove = () => {
        // let positions = this.getLEDPos();
        // let tempPos = {};
        // for(let i = 0; i < positions.xVals.length-1; i++){
        //     if(this.check.userPos.x > positions.xVals[i] && this.check.userPos.y < positions.xVals[i+1])
        //         tempPos.x = 

        // }
        let tempPos = { xMargin: mouseX - this.ledMatrixPos.x, yMargin: mouseY - this.ledMatrixPos.y };
        return tempPos;
    }

    getQuad = () => {
        if (this.check.location.x >= 0 && this.check.location.y >= 0) {
            if (this.check.location.x >= 4 && this.check.location.y < 4)
                return 1;
            else if (this.check.location.x < 4 && this.check.location.y < 4)
                return 2;
            else if (this.check.location.x < 4 && this.check.location.y >= 4)
                return 3;
            else if (this.check.location.x >= 4 && this.check.location.y >= 4)
                return 4;
        } else if (this.check.location.x < 0 || this.check.location.y < 0)
            return -1;
        return -1;
    }

    getDistance = () => {
        let quadd = this.getQuad();
        let distance;
        switch (quadd) {
            case 1:
                distance = sqrt((this.check.userPos.x - this.grid.xValues[this.check.location.x + 1]) ** 2 + (this.check.userPos.y - this.grid.yValues[this.check.location.y]) ** 2);
                break;
            case 2:
                distance = sqrt((this.check.userPos.x - this.grid.xValues[this.check.location.x]) ** 2 + (this.check.userPos.y - this.grid.yValues[this.check.location.y]) ** 2);
                break;
            case 3:
                distance = sqrt((this.check.userPos.x - this.grid.xValues[this.check.location.x]) ** 2 + (this.check.userPos.y - this.grid.yValues[this.check.location.y + 1]) ** 2);
                break;
            case 4:
                distance = sqrt((this.check.userPos.x - this.grid.xValues[this.check.location.x + 1]) ** 2 + (this.check.userPos.y - this.grid.yValues[this.check.location.y + 1]) ** 2);
                break;
            default:
                distance = -1;
                break;
        }
        return Math.floor(distance);
    }



    drawMatrix = () => {
        fill(51);
        rect(this.ledMatrixPos.x, this.ledMatrixPos.y, this.matrixSize, this.matrixSize);
        noFill();
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++)
                this.LEDS[i][j].drawLED();
        }
    }

    drawMatrixWithCheck(mousex, mousey) {
        this.check = this.grid.check(mousex, mousey);
        let check = this.check;
        // console.log(check)

        if (check.result[0] && check.result[1]) {
            this.setLEDS(uhOH, 8, 8);
        } else if (check.result[0] & !check.result[1]) {
            this.setLEDS(normalMode, 8, 8);
            // let distance = sqrt((check.user.x-grid.xValues[check.location.x+1])**2+(check.user.y-grid.yValues[check.location.y+1])**2);
            this.setLED(check.location.x, check.location.y, Math.floor(mapNumber(this.getDistance(), 0, 50, 0, 255)));
        } else if (!check.result[0] && !check.result[1]) {
            this.setLEDS(normalMode, 8, 8);
        }
        this.drawMatrix();
    }
}

//wolfrose gave up this information on arduino good guy
//He gave all the hex values for each row to display a certain number
//very useful
//https://forum.arduino.cc/t/solved-how-to-convert-string-to-8x8-dot-matrix-bytes/515440/9


let zero = [
    [0, 0, 255, 255, 0, 0, 0, 0],
    [0, 255, 255, 255, 255, 255, 0, 0],
    [255, 255, 0, 0, 0, 255, 255, 0],
    [255, 255, 0, 0, 255, 255, 255, 0],
    [255, 255, 0, 255, 255, 255, 255, 0],
    [255, 255, 255, 255, 0, 255, 255, 0],
    [255, 255, 255, 0, 0, 255, 255, 0],
    [0, 255, 255, 255, 255, 255, 0, 0],
];
let one = [
    [0, 0, 255, 255, 0, 0, 0, 255],
    [0, 0, 255, 255, 0, 0, 0, 0],
    [0, 255, 255, 255, 0, 0, 0, 0],
    [0, 0, 255, 255, 0, 0, 0, 0],
    [0, 0, 255, 255, 0, 0, 0, 0],
    [0, 0, 255, 255, 0, 0, 0, 0],
    [0, 0, 255, 255, 0, 0, 0, 0],
    [255, 255, 255, 255, 255, 255, 0, 0]
];
let two = [
    [0, 0, 255, 255, 0, 0, 255, 0],
    [0, 255, 255, 255, 255, 0, 0, 0],
    [255, 255, 0, 0, 255, 255, 0, 0],
    [0, 0, 0, 0, 255, 255, 0, 0],
    [0, 0, 255, 255, 255, 0, 0, 0],
    [0, 255, 255, 0, 0, 0, 0, 0],
    [255, 255, 0, 0, 255, 255, 0, 0],
    [255, 255, 255, 255, 255, 255, 0, 0]
];
let three = [
    [0, 0, 255, 255, 0, 0, 255, 255],
    [0, 255, 255, 255, 255, 0, 0, 0],
    [255, 255, 0, 0, 255, 255, 0, 0],
    [0, 0, 0, 0, 255, 255, 0, 0],
    [0, 0, 255, 255, 255, 0, 0, 0],
    [0, 0, 0, 0, 255, 255, 0, 0],
    [255, 255, 0, 0, 255, 255, 0, 0],
    [0, 255, 255, 255, 255, 0, 0, 0],
];
let four = [
    [0, 0, 255, 255, 0, 255, 0, 0],
    [0, 0, 0, 255, 255, 255, 0, 0],
    [0, 0, 255, 255, 255, 255, 0, 0],
    [0, 255, 255, 0, 255, 255, 0, 0],
    [255, 255, 0, 0, 255, 255, 0, 0],
    [255, 255, 255, 255, 255, 255, 255, 0],
    [0, 0, 0, 0, 255, 255, 0, 0],
    [0, 0, 0, 255, 255, 255, 255, 0]
];
let five = [
    [0, 0, 255, 255, 0, 255, 0, 255],
    [255, 255, 255, 255, 255, 255, 0, 0],
    [255, 255, 0, 0, 0, 0, 0, 0],
    [255, 255, 255, 255, 255, 0, 0, 0],
    [0, 0, 0, 0, 255, 255, 0, 0],
    [0, 0, 0, 0, 255, 255, 0, 0],
    [255, 255, 0, 0, 255, 255, 0, 0],
    [0, 255, 255, 255, 255, 0, 0, 0]
];
let six = [
    [0, 0, 255, 255, 0, 255, 255, 0],
    [0, 0, 255, 255, 255, 0, 0, 0],
    [0, 255, 255, 0, 0, 0, 0, 0],
    [255, 255, 0, 0, 0, 0, 0, 0],
    [255, 255, 255, 255, 255, 0, 0, 0],
    [255, 255, 0, 0, 255, 255, 0, 0],
    [255, 255, 0, 0, 255, 255, 0, 0],
    [0, 255, 255, 255, 255, 0, 0, 0]
];
let seven = [
    [0, 0, 255, 255, 0, 255, 255, 255],
    [255, 255, 255, 255, 255, 255, 0, 0],
    [255, 255, 0, 0, 255, 255, 0, 0],
    [0, 0, 0, 0, 255, 255, 0, 0],
    [0, 0, 0, 255, 255, 0, 0, 0],
    [0, 0, 255, 255, 0, 0, 0, 0],
    [0, 0, 255, 255, 0, 0, 0, 0],
    [0, 0, 255, 255, 0, 0, 0, 0],
];
let eight = [
    [0, 0, 255, 255, 255, 0, 0, 0],
    [0, 255, 255, 255, 255, 0, 0, 0],
    [255, 255, 0, 0, 255, 255, 0, 0],
    [255, 255, 0, 0, 255, 255, 0, 0],
    [0, 255, 255, 255, 255, 0, 0, 0],
    [255, 255, 0, 0, 255, 255, 0, 0],
    [255, 255, 0, 0, 255, 255, 0, 0],
    [0, 255, 255, 255, 255, 0, 0, 0],
];
let nine = [
    [0, 0, 255, 255, 255, 0, 0, 255],
    [0, 255, 255, 255, 255, 0, 0, 0],
    [255, 255, 0, 0, 255, 255, 0, 0],
    [255, 255, 0, 0, 255, 255, 0, 0],
    [0, 255, 255, 255, 255, 255, 0, 0],
    [0, 0, 0, 0, 255, 255, 0, 0],
    [0, 0, 0, 255, 255, 0, 0, 0],
    [0, 255, 255, 255, 0, 0, 0, 0]
];
var nums = [zero, one, two, three, four, five, six, seven, eight, nine];
var numImages;
// for (let i = 0; i < nums.length; i++) {
//     numsImages[`led${i}`] = new Img(8, 8, nums[i]);
// }

// var ledMatrixA = new LedMatrix(800,300,300,300);
// var ledMatrixA = new LedMatrix(1100,300,300,300);




var binaryMode = 0;
var currentMillis;
var lastMillis;
var ledMatrixA = new LedMatrix(50, 225, 150, 150);
var ledMatrixB = new LedMatrix(200, 225, 150, 150);
var seconds = 0;


const numToBits = (num, bits) => {
    var numArr = [];
    for (let i = 0; i < bits; i++)
        numArr[i] = num >> i & 1;
    return numArr;
}

function formatImage(arr) {
    let imgArr = [...emptyRow];
    imgArr[6] = 255 * arr[0];
    imgArr[3] = 255 * arr[1];
    imgArr[4] = 255 * arr[1];
    imgArr[1] = 255 * arr[2];
    // console.log(arr);
    // console.log(imgArr);
    return imgArr;
}

function formatImageHour(arr){
    let imgArr = [...emptyRow];
    // console.log(arr)
    imgArr[6] = 255 * arr[0];
    imgArr[5] = 255 * arr[0];
    imgArr[2] = 255 * arr[1];
    imgArr[1] = 255 * arr[1];
    // console.log(imgArr)
    return imgArr;

}


function getImages(num, isA) {
    // console.log(num);
    let numArr = numToBits(num, 6);
    if (isA) {
        let imgA = [numArr[3], numArr[4], numArr[5]];
        imgA = formatImage(imgA);
        return imgA;
    } else {
        let imgB = [numArr[0], numArr[1], numArr[2]];
        imgB = formatImage([imgB[0], imgB[1], imgB[2]]);
        return imgB
    }
}

class ClockTime{
    constructor(){
        let date = new Date();
        this.month = date.getMonth() + 1;
        this.d = date.getDate();
        this.y = date.getFullYear();
        this.s = date.getSeconds();
        this.m = date.getMinutes();
        this.h = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    }

    //This function just updates the seconds if it's changed and then minutes if that changed and the hours if that changed
    updateTime(){
        let date = new Date();
        let tempS = date.getSeconds();
        if(tempS != this.s){
            this.s = tempS;
            let tempM = date.getMinutes();
            if(tempM != this.m){
                this.m = tempM;
                let tempH = date.getHours();
                if(tempH != this.h){
                    this.h = tempH >12 ? tempH -12 : tempH;
                }
            }
        }
    }
    
}