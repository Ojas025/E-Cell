export const getRandomIntegers = (min, max, count) => {
    const numbers = [];
    const range = max - min + 1;

    if (count > range) {
        throw new Error("Count exceeds available range");
    }

    while (numbers.length < count){
        const number = Math.floor(Math.random() * range) + min;
        if (!numbers.includes(number)){
            numbers.push(number);
        }
    }

    return numbers; 
}