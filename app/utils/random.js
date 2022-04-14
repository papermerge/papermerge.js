
export default function randrange(min, max) {
    /*
    Gerates a random integer number between min and max;
    */
    return Math.floor(
        Math.random() * (max - min + 1) + min
    );
}
