const sqrt5 = (int, rad, den)=> (int + rad*Math.sqrt(5)) / den

function MeccanoPentagonI(sols)
{
	this.find = (max)=> {
		for (let a=1; a < max; a++)
			for (let b=1; b <= max; b++)
				for (let c=0; c <= a; c++)
					if (a*c == (a + c)*b)
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

function MeccanoPentagonII(sols)
{
	this.find = (max) => {
		for (let a=1; a < max; a++) {
			for (let b=1; b < a; b++)
				for (let c=1; c < a; c++)
					for (let d=1; d < a; d++)
						if ((a - b)*(c - d) + a*b == c*d)
							mZero(a, b, c, d)
		}
	}
	const mZero = (a, b, c, d)=> {
		const e = Math.sqrt(a*a + b*b + c*c + d*d - a*d - b*c - c*d)
		if (e > 0 && e % 1 === 0)
			eInteger(a, b, c, d, e)
	}
	const eInteger = (a, b, c, d, e)=> {
		for (let i=0; i < sols.length; i++) {
			const s = sols[i]
			if (a % s.a == 0) {
				const f = a / s.a
				const bS = (b % s.b == 0) && b / s.b == f
				const cS = (c % s.c == 0) && c / s.c == f
				const dS = (d % s.d == 0) && d / s.d == f
				const eS = (e % s.e == 0) && e / s.e == f
				if (bS && cS && dS && eS)
					return // scaled solution already
			}
		}
		sols.push( { a:a, b:b, c:c, d:d, e:e }) // solution
	}
}

function MeccanoPentagonIISvg(Svg, parent)
{
	const W = 300, H = 300, S = 1, R=0
	const s = Svg.svg(W, H)
	parent.appendChild(s)
	const g0 = Svg.g({
		transform:`translate(${W/2} ${H/2}) scale(${S} ${-S}) rotate(${R})`,
		"stroke-width":`${1}px`,
		"stroke-linecap": "round",
		"stroke":"#000"
	})
	s.appendChild(g0)
	const gc = Svg.g({ fill:"blue" })
	g0.appendChild(gc)

	const L = W*0.4
	
	const c1 = L*Math.cos(2*Math.PI/5)
	const c2 = L*Math.cos(Math.PI/5)
	const s1 = L*Math.sin(2*Math.PI/5)
	const s2 = L*Math.sin(Math.PI/5)
    
    const A = { x:  0, y:  L }
	const B = { x: s1, y: c1 }
	const C = { x: s2, y:-c2 }
    const D = { x:-s2, y:-c2 }
    const E = { x:-s1, y: c1 }
	
  	const objects = 
  	{
	  	circles: [ 
	  		A, B, C, D, E,      // A,B,C,D,E
	  		A, A, A, A, A, A, A // F,G,H,I,J,K,L
	    ],
	    lines: [
      	    { x1: A.x, y1: A.y, x2: B.x, y2: B.y }, // AB
    	    { x1: B.x, y1: B.y, x2: C.x, y2: C.y }, // BC
    	    { x1: C.x, y1: C.y, x2: D.x, y2: D.y }, // CD
    	    { x1: D.x, y1: D.y, x2: E.x, y2: E.y }, // DE
    	    { x1: E.x, y1: E.y, x2: A.x, y2: A.y }, // EF
	    	{ x1:0, y1:L, x2:0, y2:L }, // 
	    	{ x1:0, y1:L, x2:0, y2:L },
	    	{ x1:0, y1:L, x2:0, y2:L },
	    	{ x1:0, y1:L, x2:0, y2:L },
	    ]
  	}

  	const circles = objects.circles.map(c => {
  		const circle = Svg.circle({ cx:c.x, cy:c.y, r:3 })
  		gc.appendChild(circle)
  		return circle
  	})
  	const lines = objects.lines.map(l => {
  		const line = Svg.line(l)
  		gc.appendChild(line)
  		return line
  	})

  	const updateCircle = (pos, p) => {
  		circles[pos].setAttribute("cx", p.x)
  		circles[pos].setAttribute("cy", p.y)
  	}
  	const updateLine = (pos, p1, p2) => {
  		lines[pos].setAttribute("x1", p1.x)
  		lines[pos].setAttribute("y1", p1.y)
  		lines[pos].setAttribute("x2", p2.x)
  		lines[pos].setAttribute("y2", p2.y)
  	}

  	const point = (scale, from, to)=> {
  		return {
  			x: from.x - scale*(from.x - to.x),
  			y: from.y - scale*(from.y - to.y)

  		}
  	}

  	const update = (a, b, c, d, e)=> 
  	{
  		console.log(a, b, c, d, e)
  		const ba = b / a
  		const F = {
  			x: B.x - ba*(B.x - A.x),
  			y: B.y - ba*(B.y - A.y)
  		}
  		const G = {
  			x: E.x + ba*(A.x - E.x),
  			y: E.y + ba*(A.y - E.y)
  		}
  		const H = {
  			x: A.x,
  			y: A.y - 2*(A.y - G.y)
  		}

  		const ac = c / a
  		const J = {
  			x: C.x - ac*(C.x - D.x),
  			y: C.y - ac*(C.y - D.y)
  		}
  		const K = {
  			x: D.x - ac*(D.x - C.x),
  			y: D.y - ac*(D.y - C.y)
  		}


  		updateCircle(5, F)
  		updateCircle(6, G)
  		updateCircle(7, H)
  		updateCircle(8, J)
  		updateCircle(9, K)
  		
  		updateLine  (5, F, H)
  		updateLine  (6, G, H)
  	}

  	this.update = update
  	update(12, 2, 9, 6, 11)
}
