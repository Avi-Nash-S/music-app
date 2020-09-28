// Add commom function for App

/* 
    @Props - debounceFunc
    func => required to apply debounce
    delay => time period/delay after main event/function invoke
*/
export const debounceFunc = (func, delay) => {
    let timer;
    return function () {
        let context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(context, args);
        }, delay)
    }
}

/* Randomize array in-place using Durstenfeld shuffle 
algorithm from: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm */

export const shuffleArray = (array) => {
    let tempArr = array || [];
    for (var i = tempArr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = tempArr[i];
        tempArr[i] = tempArr[j];
        tempArr[j] = temp;
    }
    return tempArr;
}

export const calculateRowHeight = (width, height) => {
    if (width < 1000 && width > 700) {
        return (height - 218) / (3 * width * 0.00101);
    } else if (width < 700) {
        return (height - 218) / (3 * width * 0.0012);
    } else {
        return (height - 218) / Math.min(3 * width * 0.0009, 3);
    }
};