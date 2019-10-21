const sqrt5 = (int, rad, den)=> (int + rad*Math.sqrt(5)) / den

function MeccanoPentagonI(sols)
{
	this.find = (max)=> {
		for (let a=1; a < max; a++)
			for (let b=1; b <= max; b++)
				for (let c=0; c <= a; c++)
					if ((a + c)*b == a*c)
						mZero(a, b, c)
	}
	const mZero = (a, b, c)=> {
		const d = Math.sqrt(a*a + b*b + c*c - a*c)
		if (d > 0 && d % 1 === 0)
			dInteger(a, b, c, d)
	}
	const dInteger = (a, b, c, d) => {
		for (let i=0; i < sols.length; i++) {
			const s = sols[i]
			if (a % s.a == 0) {
				const f = a / s.a
				const bS = (b % s.b == 0) && b / s.b == f
				const cS = (c % s.c == 0) && c / s.c == f
				const dS = (d % s.d == 0) && d / s.d == f
				if (bS && cS && dS)
					return // scaled solution already
			}
		}
		sols.push({ a:a, b:b, c:c, d:d }) // solution!
	}
}


//this.R = (a,b,c,d) => ( (a - b)*(c - d) + a*b - c*d ) / 2
// const self = this
function MeccanoPentagonII(sols)
{
	const Z = (a,b,c,d) => a*a + b*b + c*c + d*d - ( (a + b)*(c+d) + a*b + c*d ) / 2
	this.find = (max) => {
		for (let a=1; a < max; a++) {
			for (let b=1; b < a; b++)
				for (let c=1; c < a; c++)
					for (let d=1; d < a; d++)
						if (((a - b)*(c - b) + a*b) == c*d)
							mZero(a, b, c, d)
		}
	}
	const mZero = (a, b, c, d)=> {
		//const e = Math.sqrt(Z(a,b,c,d))
		const e = Math.sqrt(a*a + b*b + c*c + d*d - a*d - b*c - c*d)
		if (e > 0 && e % 1 === 0)
			eInteger(a, b, c, d, e)
	}
	const eInteger = (a, b, c, d, e)=> {
		for (let i=0; i < sols.length; i++) {
			const sol = sols[i]
			if (a % sol.a == 0) {
				const f = a / sol.a
				const bS = (b % sol.b == 0) && b / sol.b == f
				const cS = (c % sol.c == 0) && c / sol.c == f
				const dS = (d % sol.d == 0) && d / sol.d == f
				const eS = (e % sol.e == 0) && e / sol.e == f
				if (bS && cS && dS && eS)
					return // scaled solution already
			}
		}
		sols.push( { a:a, b:b, c:c, d:d, e:e }) // solution
	}
}
