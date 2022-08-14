let idP = "option";
let idH = "header";
let idImg = "img";
let idP1 = "opt";
let idH1  = 'head';
let idImg1 = 'image';
let ids = [idP,idH,idImg]
let ids1 = [idP1,idH1,idImg1];
let state = 0;
let state1 = 0;
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


hideOtherState();
hideOtherState1();

let nextBtn = document.getElementById("next");
let prevBtn = document.getElementById("prev");
let nextBtn1 = document.getElementById("next1");
let prevBtn1 = document.getElementById("prev1");
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

nextBtn.onclick = nextOnClick;
prevBtn.onclick = prevOnClick;
nextBtn1.onclick = nextOnClick1;
prevBtn1.onclick = prevOnClick1;