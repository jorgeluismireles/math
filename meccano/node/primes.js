// https://stackoverflow.com/questions/39899072/how-to-find-prime-factors-using-a-for-loop-in-javascript
// The answer above is inefficient with O(N^2) complexity. Here is a better answer with O(N) complexity.
const primes = (n)=> 
{
    n = Math.abs(n)
    const factors = [ ]
    let divisor = 2
    while (n >= 2) { // stackoverflow was on error (was n > 2)
        if (n % divisor == 0) {
            factors.push(divisor)
            n = n / divisor
        } else {
            divisor++
        }     
    }
    return factors
}

const rational = (num, den)=> {
    const n = primes(num)
    const d = primes(den)
    for (let i=0; i < d.length; i++) {
        for (let j=0; j < n.length; j++) {
            if (d[i] == n[j]) {
                d[i] = 1
                n[j] = 1
            }
        }
    }
    const r = {
        num: n.filter(i => i > 1), 
        den: d.filter(i => i > 1) 
    }
    if (num < 0 ? den >= 0 : den < 0) // xor
        r.negative = true
    return r
}

const decimal = (rational)=> {
    const num = rational.num
    const den = rational.den
    let decimal = rational.negative ? -1.0 : 1.0
    for (let i=0; i < num.length; i++) decimal *= num[i];
    for (let j=0; j < den.length; j++) decimal /= den[j];
    return decimal
}

const cosC = (a, b, c) => {
    return rational(a*a + b*b - c*c, 2*a*b )
}

const t = [ 7,8,9 ]

const cosines = [
    cosC(t[0], t[1], t[2]),
    cosC(t[1], t[2], t[0]),
    cosC(t[2], t[0], t[1])
]
console.log("cosines", JSON.stringify(cosines))

const decimals = [
    decimal(cosines[0]),
    decimal(cosines[1]),
    decimal(cosines[2]),
]
console.log("decimals", JSON.stringify(decimals))

const arcs = [
    Math.acos(decimals[0]),
    Math.acos(decimals[1]),
    Math.acos(decimals[2])
]
console.log("arcs", JSON.stringify(arcs))

console.log("interior", arcs[0] + arcs[1] + arcs[2])


