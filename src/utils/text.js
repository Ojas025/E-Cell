export const displayString = (setValue , str, speed) => {
    return new Promise(resolve => {
        let index = 0;

        const interval = setInterval(() => {
            if (index < str.length){
                const curr = str.slice(0, index + 1);
                setValue(curr + '|');
                index++;
            }
            else {
                setValue(str);
                clearInterval(interval);
                resolve();
            }
        },speed);
    });
}