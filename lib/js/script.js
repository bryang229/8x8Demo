let idP = "option";
let idH = "header";
let idImg = "img";
let idP1 = "opt";
let idH1  = 'head';
let idImg1 = 'image';
let idP2 = "op";
let idH2  = 'h';
let idImg2 = 'im';
let idP3 = "o";
let idH3  = 'he';
let idImg3 = 'i';
let ids = [idP,idH,idImg]
let ids1 = [idP1,idH1,idImg1];
let ids2 = [idP2,idH2,idImg2];
let ids3 = [idP3,idH3,idImg3];
let state = 0;
let state1 = 0;
let state2 = 0;
let state3 = 0;
function hideOtherState(){
    if(state == 0){
        for(let id of ids){
            let tempDoc = document.getElementById(`${id}1`);
            tempDoc.style.display = "none";
            let tempDoc2 = document.getElementById(`${id}0`);
            tempDoc2.style.display = "block";
        }
    }
    if(state == 1){
        for(let id of ids){
            let tempDoc = document.getElementById(`${id}0`);
            tempDoc.style.display = "none";
            let tempDoc2 = document.getElementById(`${id}1`);
            tempDoc2.style.display = "block";
        }
    }
       
}

function hideOtherState1(){
    for(let id of ids1){
        for(let i = 0; i < 5; i++){
            if(i != state1){
                document.getElementById(id+i).style.display = 'none'
            }
            else{
                document.getElementById(id+i).style.display = 'block';
            }
        }
    }
}
function hideOtherState2(){
    for(let id of ids2){
        for(let i = 0; i < 4; i++){
            if(i != state2){
                document.getElementById(id+i).style.display = 'none'
            }
            else{
                document.getElementById(id+i).style.display = 'block';
            }
        }
    }
}
function hideOtherState3(){
    for(let id of ids3){
        for(let i = 0; i < 3; i++){
            if(i != state3){
                document.getElementById(id+i).style.display = 'none'
            }
            else{
                document.getElementById(id+i).style.display = 'block';
            }
        }
    }
}



hideOtherState();
hideOtherState1();
hideOtherState2();
hideOtherState3();


let nextBtn = document.getElementById("next");
let prevBtn = document.getElementById("prev");
let nextBtn1 = document.getElementById("next1");
let prevBtn1 = document.getElementById("prev1");
let nextBtn2 = document.getElementById("next2");
let prevBtn2 = document.getElementById("prev2");
let nextBtn3 = document.getElementById("next3");
let prevBtn3 = document.getElementById("prev3");
//since only two options prev and next work the same but with more it would be different
function nextOnClick () {
    state = state == 0 ? 1 : 0;
    hideOtherState();
}


function prevOnClick () {
    state = state == 0 ? 1 : 0;
    hideOtherState();
}

function nextOnClick1(){
    state1 += state1 < 4 ? 1 : -4;
    hideOtherState1();

}


function prevOnClick1(){
    state1 -= state1 > 0 ? 1 : -4;
    hideOtherState1();
}
function nextOnClick2(){
    state2 += state2 < 3 ? 1 : -3;
    hideOtherState2();
}
function prevOnClick2(){
    state2 -= state2 > 0 ? 1 : -3;
    hideOtherState2();
}
function nextOnClick3(){
    state3 += state3 < 2 ? 1 : -2;
    hideOtherState3();
}
function prevOnClick3(){
    state3 -= state3 > 0 ? 1 : -2;
    hideOtherState3();
}

nextBtn.onclick = nextOnClick;
prevBtn.onclick = prevOnClick;
nextBtn1.onclick = nextOnClick1;
prevBtn1.onclick = prevOnClick1;
nextBtn2.onclick = nextOnClick2;
prevBtn2.onclick = prevOnClick2;
nextBtn3.onclick = nextOnClick3;
prevBtn3.onclick = prevOnClick3;