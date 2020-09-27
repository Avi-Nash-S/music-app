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