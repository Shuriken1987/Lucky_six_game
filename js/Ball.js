class Ball {
    constructor(image, value) {
        this.image = image;
        this.value = value;
    }
}

let balls = [];

for (let i = 1; i < 49; i++) {
    let path = `img/${i}.png`;
    let value = i;
    balls.push(new Ball(path, value));
}



