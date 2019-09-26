
const sin = (degrees) => { return Math.sin(degrees*Math.PI/180) }
const cos = (degrees) => { return Math.cos(degrees*Math.PI/180) }


const degrees = 8.22
console.log(5*sin(degrees) - Math.sqrt(3)*cos(degrees) + 1)