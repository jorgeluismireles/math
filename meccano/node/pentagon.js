const sqrt5 = (int, rad, den)=> (int + rad*Math.sqrt(5)) / den

const Pentagon1 = function()
{
	this.R = (a,b,c)=> (a*b - a*c + c*b) / 2

	this.Z = (a,b,c)=> a*a + b*b + c*c - (a*b + a*c + c*b) / 2

	const self = this

	this.solutions = (aMax, message, list)=> { // b > a
		const sols = []
		const now = +new Date()
		for (let a=1; a < aMax; a++) {
			for (let b=1; b <= aMax; b++)
				for (let c=0; c <= a; c++)
					test(list, sols, a, b, c)
		}
		message(`Tested ${aMax} : ${+new Date() - now}ms`)
	}
	
	const test = (list, sols, a, b, c)=> {
		if (self.R(a, b, c) != 0)
			return
		const d = Math.sqrt(self.Z(a, b, c))
		if (d > 0 && d % 1 === 0) {
			const s = add(sols, a, b, c, d)
			if (s)
				list(s)
			//console.log(`a=${a} b=${b} c=${c} d=${d}`)
		}

	}
	const add = (sols, a, b, c, d) => {
		for (let i=0; i < sols.length; i++) {
			const sol = sols[i]
			if (a % sol.a == 0) {
				const f = a / sol.a
				const bS = (b % sol.b == 0) && b / sol.b == f
				const cS = (c % sol.c == 0) && c / sol.c == f
				const dS = (d % sol.d == 0) && d / sol.d == f
				if (bS && cS && dS)
					return null
			}
		}
		sols.push( { a:a, b:b, c:c, d:d })
		return `n=${sols.length} a=${a} b=${b} c=${c} d=${d}`
	}
}



const Pentagon2 = function()
{

	this.R = (a,b,c,d) => ( (a - b)*(c - d) + a*b - c*d ) / 2

	this.Z = (a,b,c,d) => a*a + b*b + c*c + d*d - ( (a + b)*(c+d) + a*b + c*d ) / 2

	const self = this

	this.solutions = (aMax, message, list)	=> {
		const sols = []
		const now = +new Date()
		for (let a=1; a < aMax; a++) {
			for (let b=1; b < a; b++)
				for (let c=1; c < a; c++)
					for (let d=1; d < a; d++)
						test(list, sols, a, b, c, d)
		}
		message(`Tested ${aMax} : ${+new Date() - now}ms`)
	}

	const test = (list, sols, a, b, c, d)=> {
		if (self.R(a,b,c,d) != 0)
			return
		const e2 = self.Z(a,b,c,d)
		const e = Math.sqrt(e2)
		if (e > 0 && e % 1 === 0) {
			const s = add(sols, a, b, c, d, e)
			if (s)
				list(s)
		}
	}

	const add = (sols, a, b, c, d, e)=> {
		for (let i=0; i < sols.length; i++) {
			const sol = sols[i]
			if (a % sol.a == 0) {
				const f = a / sol.a
				const bS = (b % sol.b == 0) && b / sol.b == f
				const cS = (c % sol.c == 0) && c / sol.c == f
				const dS = (d % sol.d == 0) && d / sol.d == f
				const eS = (e % sol.e == 0) && e / sol.e == f
				if (bS && cS && dS && eS)
					return null
			}
		}
		sols.push( { a:a, b:b, c:c, d:d, e:e })
		const n = sols.length
		console.log(`n=${n} e=${Math.sqrt(a*a + b*b + c*c + d*d - a*d - b*c - c*d) }`)
		return `n=${n} a=${a} b=${b} c=${c} d=${d} e=${e}`
	}

	/*
	const test1 = (a,b,c,d)=>
		a*a 
		+ (b + c)*(b + c) * sqrt5( 3, -1, 8) // cosA*cosA //
		+ d*d             * sqrt5( 3,  1, 8) // cosB*cosB // 
		+ 2*a*(b + c)     * sqrt5(-1,  1, 4) // cosA      // 
		- 2*a*d           * sqrt5( 1,  1, 4) // cosB      // 
		- 2*(b + c) * d   * sqrt5( 1,  0, 4) // cosA*cosB //  

		+ (c - b)*(c - b) * sqrt5( 5,  1, 8) // sinA*sinA // 
		+ d*d             * sqrt5( 5, -1, 8) // sinB*sinB 
		- 2*(c - b)*d     * sqrt5( 0,  1, 4) // sinA*sinB //


	const test2 = (a,b,c,d) => //( 8*a*a + 3*(b+c)*(b+c) + 3*d*d - 4*a*(b+c) - 4*a*d - 4*(b+c)*d + 5*(c-b)*(c-b) + 5*d*d ) / 8
                  // a*a + b*b + c*c + d*d - ( a*(b+c+d) + b*(c+d) + c*d  )/2
				  a*a + b*b + c*c + d*d - ( (a + b)*(c+d) + a*b + c*d ) / 2

	const test3 = (a,b,c,d)=> //-(b+c)*(b+c) + d*d + 4*a*(b+c) - 4*a*d + (c-b)*(c-b) - d*d - 4*(c-b)*d
	              //( a*(b + c - d) - b*(c - d) - c*d  ) / 2
	              ( (a - b)*(c - d) + a*b - c*d ) / 2
	*/
}

