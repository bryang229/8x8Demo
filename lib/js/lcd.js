class LCD{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.chars = this.genChars();
    }

    genChars(){
        let {x,y,w,h} =  this;
        //         rect(x+w*.1, y+h*.2, w * .8, h * .5);
        let charArr = [];
        let loadingArr = " Loading          "
        for(let j = 2; j <= 3; j++){
            let tempCharArr = [];
            for(let i = 1; i <= 16; i++){
                let tempChar = new LCDLetter(x+ 35 + w*.05*i, y+h*.4* (j/2),loadingArr[i]);
                tempCharArr.push(tempChar);
            }
            charArr.push(tempCharArr)
        }
        return charArr;
    }


    show(){
        let {x,y,w,h} =  this;
        //background
        fill(5,200,6)
        noStroke();
        rect(x,y,w,h);
        
        stroke(25);
        strokeWeight(15);
        fill(10,10,200);
        rect(x+w*.1, y+h*.2, w * .8, h * .55);
        
        noStroke();
        fill(245);
        this.showText();
        
        //mounting holes
        stroke(127,127,10);
        strokeWeight(7);
        let mhW = w*.04;
        circle(x+mhW,y+mhW,mhW);  
        circle(x+w-mhW,y+mhW,mhW);  
        circle(x+w-mhW,y+h-mhW,mhW);  
        circle(x+mhW,y+h-mhW,mhW);  
        noStroke();
        //pins
        fill(127);
        for(let i = 1; i <= 14; i++){
            rect( x + 20 + 20*i,y,15,15);
        }
    }


    //Goal make this a true 2 row 16 char LCD 

    showText(){
        for(let arr of this.chars){
            for(let charL of arr){
                charL.show(30);
            }
        }
        // let {x,y,w,h} =  this;
        // textSize(30);
        // text("hey",x + w *.2, y + h * .4);
    } 
    
    setRow(row,text){
        for(let i = 0; i < 16; i++){
            this.chars[row][i].changeChar(text[i]);
        }
    }


}


class LCDLetter {
    constructor(x,y,char){
        this.x = x;
        this.y = y;
        this.char = char;
    }

    show(size){
        // fill(240,70)
        // ellipse(this.x,this.y,size,size);
        fill(220)
        textSize(size);
        text(this.char,this.x,this.y)
    }
    
    changeChar(char){
        this.char = char;
    }


}

function getWeekIndex(m,d,y){
  let monthKeys = [0, 1, 4, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6];
  let index = parseInt(y.toString().substring(2));
  index = Math.floor(index / 4);
  index += d;
  index += monthKeys[m];
  if ( m == 0 || ( m == 1 && y % 4 == 0 && (y % 100 != 0 || y % 400 == 0 && y % 100 == 0)))
    index--;
  let topTwo = Math.floor(y / 100);
  while (topTwo < 20)
    topTwo += 4;
  if ((topTwo - 17) % 4 == 0)
    index += 4;
  else if ((topTwo - 18) % 4 == 0)
    index += 2;
  else if ((topTwo - 19) % 4 == 0)
    index += 0;
  else if ((topTwo - 20) % 4 == 0)
    index += 6;
  index +=  parseInt(y.toString().substring(2));;
  index %= 7;
    return index;
}
