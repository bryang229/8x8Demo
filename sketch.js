
function displayBinary() {
    let imgAfmt = getImages(seconds, true);
    let imgA = new Img(8, 8, [imgAfmt, imgAfmt, imgAfmt, imgAfmt, imgAfmt, imgAfmt, imgAfmt, imgAfmt]);
    ledMatrixA.setLEDS(imgA, 8, 8);
    ledMatrixA.drawMatrix();

    let imgBfmt = getImages(seconds, false);
    let imgB = new Img(8, 8, [imgBfmt, imgBfmt, imgBfmt, imgBfmt, imgBfmt, imgBfmt, imgBfmt, imgBfmt]);
    // console.log(imgA);
    // console.log(imgB);
    ledMatrixB.setLEDS(imgB, 8, 8);
    ledMatrixB.drawMatrix();
}

function displayDecimal() {
    let left = Math.floor(seconds / 10);
    ledMatrixA.setLEDS(numsImages[`led${left}`], 8, 8);
    ledMatrixA.drawMatrix();
    let right = seconds % 10;
    ledMatrixB.setLEDS(numsImages[`led${right}`], 8, 8);
    ledMatrixB.drawMatrix();
}

function displayHMS(){
    let hour = updateHour();
    let minute = updateMinutes(true);
    let second = updateSeconds(true);
    let imgA = new Img(8,8,[hour[0],hour[0],hour[0],emptyRow,minute,minute,emptyRow,second]);
    ledMatrixA.setLEDS(imgA,8,8);
    ledMatrixA.drawMatrix();
    minute = updateMinutes(false);
    second = updateSeconds(false);
    let imgB = new Img(8,8,[hour[1],hour[1],hour[1],emptyRow,minute,minute,emptyRow,second]);
    ledMatrixB.setLEDS(imgB,8,8);
    ledMatrixB.drawMatrix();
    
}


const handleModeChange = () => {
    binaryMode += 1;
    if(binaryMode == 3)
        binaryMode = 0;
    setModeText()
}
let lcd; 

function setup() {
    createCanvas(400, 400);
    numsImages = {};
    for (let i = 0; i < nums.length; i++) {
        numsImages[`led${i}`] = new Img(8, 8, nums[i]);
    }
    tempS = clockTime.s;
    lcd = new LCD(30,50,350,150);
}
var tempS;
const days = ["0", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th", "16th", "17th",
 "18th", "19th", "20th", "21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th", "29th", "30th", "31st"]
const months =  ["N/A", "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug",
"Sep", "Oct", "Nov", "Dec"];
const weekDays = ["Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function updateLCD(){
    lcd.show();
    let topRow = `${weekDays[getWeekIndex(clockTime.month,clockTime.d,clockTime.y)]} ${clockTime.y}`
    let bottomRow = `${months[clockTime.month]} ${days[clockTime.d]}`
    lcd.setRow(1,topRow);
    lcd.setRow(0,bottomRow);
    
}
let modeText = document.getElementById("modes");
let title = document.querySelector("title");
function setModeText(){
    let txt;
    switch(binaryMode){
        case 0:
            txt = "Binary Mode"; break;
        case 1:
            txt = "Decimal Mode"; break;
        case 2:
            txt = "Hours Minutes Seconds Mode"; break;
        default:
            txt = "Error: Bryan messed up please let him know at bryang229@gmail.com"
    }
    modeText.innerText = txt;
    title.innerText = txt;
}

function draw() {
    background(255);
    if (binaryMode == 0)
        displayBinary();
    else if (binaryMode == 1)
        displayDecimal();
    else if(binaryMode == 2)
        displayHMS();
    clockTime.updateTime();
    if (tempS != clockTime.s) {
        seconds = clockTime.s;
    }
    tempS = clockTime.s;
    ellipse(mouseX, mouseY, 10, 10);
    updateLCD();
}



setModeText()
