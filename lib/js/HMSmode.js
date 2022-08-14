let clockTime = new ClockTime();

const updateHour = (isA) => {
    let binImg = numToBits(clockTime.h,4);
    let tempArrL = formatImageHour([binImg[2],binImg[3]]);
    
    let tempArrR = formatImageHour([binImg[0],binImg[1]]);
    
    return [tempArrL,tempArrR];
}

const updateMinutes = (isA) => {
    return isA ? getImages(clockTime.m,true) : getImages(clockTime.m,false)
}

const updateSeconds = (isA) => {
    return isA ? getImages(clockTime.s,true) : getImages(clockTime.s,false)
}

