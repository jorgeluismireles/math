const factor5  = (a,c,d)=> (a + c)*d - a*c
const diagonal = (a,c,d)=> (a-c)*(a-c) + 3*a*c/2 - (a+c)*d/2 + d*d

const saved = []

const find = function() {
	const save = (a,c,d)=> {
		const f5 = factor5(a, c, d)
		if (f5 != 0)
			return
		const sqrt = Math.sqrt(diagonal(a,c,d))
		if (parseInt(sqrt) != sqrt)
			return
		for (let i=0; i < saved.length; i++) {
			const d = saved[i]
			if (sqrt % d == 0)
				return
		}
		saved.push(sqrt)
		console.log(`factor5=0 for a=${a} c=${c} d=${d} diagonal=${sqrt}`)
	}

	for (let a=3; a < 5000; a++) {
		for (let c=1; c < a; c++) {
			for (let d=0; d < a; d++) {
				save(a,c,d)
			}
		}
		if (a % 1000 == 0)
			console.log(a)
	}
}

find()
