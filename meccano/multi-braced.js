const MultiBraced = function(rtr, svgParams)
{
	this.add = (map)=> {
		Object.keys(objects).forEach(key => {
			const name = `meccano_${key}`
			map[name] = ()=> {
				objects[key](svgParams(), name)
			}
		})
	}

const objects = 
{
	triangle: (p, name)=> {
		const S = 30
		const extremes = true
		const G = new Polygon(p, name, S, {
			8: "#08f"
		}, false, extremes)
		const C = (8/2)*S / Math.sin(Math.PI/3)
		G.rods(3, (i, rod)=> {
			rod(8, rtr(-120*i, C, 150))
		})
		G.end()
	},

	square_4: (p, name)=> {
		const S = 25
		const skip = true
		const G = new Polygon(p, name, S, {
			 8: "#08f",
			10: "#f20"
		}, skip)
		const C = 8*S*Math.sqrt(2)/2 // circuncenter
		const acos4_5 = 180*Math.acos(4/5)/Math.PI

		G.rods(4, (i, rod)=> {
			rod(8, rtr(-90*i, C, -90-45))
			if (i==0)
				rod(10, rtr(-90*i, C, -90-45-acos4_5))
		})
		G.end()
	},

	pentagon_12_a: (p, name)=> {
		const S = 18
		const N = 12
		const G = new Polygon(p, name, S, {
			 9: "#08f",
			11: "#0d2",
			12: "#f20"
		})
		const C = N*S/(2*Math.sin(Math.PI/5))

		const sin18 = Math.sin(Math.PI/10)
		const cos18 = Math.cos(Math.PI/10)
		const a1 = -90-36
		const p1 = { x:N*S*sin18, y:N*S*cos18 }
		const p2 = { x:3*S,       y:0         }
		const p3 = { x:4*S*sin18, y:4*S*cos18 }
		const a3 = 180*Math.atan((p1.x + p2.x + p3.x)/(p1.y - p3.y))/Math.PI

		G.rods(5, (i, rod)=> {
			rod(12, rtr(-72*i, C, a1))
			if (i==1) {
				rod(11, rtr(-72*i, C, -90-18-a3))
			}
			if (i==4) {
				const t = rtr(-72*i, C, a1-36)
				rod( 9, `${t}`)
				rod(12, `${t} translate(0,${S*9}) rotate(-72)`)
				rod(11, `${t} translate(0,${S*9}) rotate(${-90+a3})`)
			}
		})
		G.end()
	},

	pentagon_12_z_wrong: (p, name)=> {
		const S = 16
		const G = new Polygon(p, name, S, {
			 9: "#08f",
			11: "#0f4",
			12: "#f20"
		})
		const C = 12*S/(2*Math.sin(Math.PI/5))

		G.rods(5, (i, rod)=> {
			const rt1 = `rotate(${-72*i}) translate(0 ${C})`
			const r2 = -90-36
			rod(12, `${rt1} rotate(${r2})`)
			if (i==4) {
				const rt2 = (m)=> `rotate(${-m*36}) translate(${m*4*S},0) rotate(${m*(90+72)})`
				rod( 9, `${rt1} ${rt2(-1)}`)
				rod( 9, `${rt1} ${rt2(+1)}`)
				rod(11, `${rt1} ${rt2(-1)} translate(0, ${9*S}) rotate(-64.4)`)
				rod(11, `${rt1} ${rt2(+1)} translate(0, ${9*S}) rotate(+64.4)`)
			}
		})
		G.end()
	},

	hexagon_1: (p, name)=> {
		const S = 70
		const skip = true
		const G = new Polygon(p, name, S, {
			2: "#08f",
			4: "#f20"
		}, skip)
		const C = 2*S
		G.rods(6, (i, rod)=> {
			const t1 = `rotate(${-60*i}) translate(0 ${C})`
			rod(2, `${t1} rotate(120)`)
			if (i==0 || i==1) {
				rod(4, `${t1} rotate(180)`)
			}
		})
		G.end()
	},

	heptagon_3: (p, name)=> {
		const S = 25
		const skip = true
		const G = new Polygon(p, name, S, {
			6: "#08f",
			8: "#f20"
		}, skip)
		const C = 6*S / (2*Math.sin(Math.PI/7))
		const R = 180*(Math.PI/7)/Math.PI
		const a1 = +90+3*R
		const a4 = 180*Math.atan(1/8)/Math.PI
		G.rods(7, (i, rod)=> {
			const t1 = `rotate(${-2*R*i}) translate(0 ${C})`
			rod(6, `${t1} rotate(${90+R})`)
			if (i==0 || i==2) {
				const t2 = `translate(0 ${6*S}) rotate(${-2*R})`
				rod(6, `${t1} rotate(${a1})`)
				rod(6, `${t1} rotate(${a1}) ${t2}`)
				rod(8, `${t1} rotate(${a1}) ${t2} rotate(${(9*R/2) + a4})`)
				rod(8, `${t1} rotate(${a1}) ${t2} rotate(${(9*R/2) - a4})`)
			}
		})
		G.end()
	},

	octagon_4: (p, name)=> {
		const S = 30
		const G = new Polygon(p, name, S, {
			4: "#08f",
			5: "#0f4",
			6: "#f20"
		})
		const C = 4*S*Math.sqrt(4 + 2*Math.sqrt(2))/2 // circumradius
		const r4 = [], r5 = [], r6 = []
		const acos4_5 = 180*Math.acos(4/5)/Math.PI
		const asin2_6 = 180*Math.asin(2/6)/Math.PI

		G.rods(8, (i, rod)=> {
			const rt1 = `rotate(${-45*i}) translate(0 ${C})`
			const r2 = -90-22.5
			rod(4, `${rt1} rotate(${r2})`)
			if (i==0) { // north
				rod(4, `${rt1} rotate(${r2 - 90})`)
				rod(5, `${rt1} rotate(${r2 - acos4_5})`)
			}
			if (i==1) { // north-east
				rod(4, `${rt1} rotate(${r2 - 45})`)
			}
			if (i==3) {
				const t3a = `${rt1} rotate(${r2 - 90})`
				const t3b = `translate(0 ${4*S}) rotate(${180 - acos4_5})`
				const t3c = `translate(0 ${4*S}) rotate(${180 - 45 - asin2_6})`
				rod(4, `${t3a}`)
				rod(5, `${t3a} ${t3b}`)
				rod(6, `${t3a} ${t3c}`)
			}
			if (i==6) {
				const t6a = `${rt1} rotate(${r2 - 45})`
				const t6b = `translate(0 ${4*S}) rotate(${180 + acos4_5})`
				const t6c = `translate(0 ${4*S}) rotate(${180 + 45 + asin2_6})`
				rod(4, `${t6a}`)
				rod(5, `${t6a} ${t6b}`)
				rod(6, `${t6a} ${t6c}`)
			}
		})
		G.end()
	},

	decagon_12: (p, name)=> {
		const S = 9
		const G = new Polygon(p, name, S, {
			 9: "#08f",
			11: "#0d2",
			12: "#f20"
		})
		const C = 12*S/(2*Math.sin(Math.PI/10))

		const a1 = -90-18
		const sin18 = Math.sin(Math.PI/10)
		const cos18 = Math.cos(Math.PI/10)
		const p1 = { x:12*S*sin18, y:12*S*cos18 }
		const p2 = { x: 3*S,       y: 0 }
		const p3 = { x: 4*S*sin18, y: 4*S*cos18 }
		const a3 = 180*Math.atan((p1.x + p2.x + p3.x)/(p1.y - p3.y))/Math.PI

		G.rods(10, (i, rod)=> {
			rod(12, rtr(-36*i, C, a1))
			if (i==0 || i==2 || i==6) {
				const t2 = rtr(-36*i, C, 2*a1)
				rod(12, t2)
				rod(12, `${t2} translate(0 ${12*S}) rotate(-36)`)
				rod(12, `${t2} translate(0 ${12*S}) rotate(+72)`)
			}
			if (i==3 || i==7) {
				rod( 9, `rotate(${-36*i})`)
				rod(12, rtr(-36*i, 9*S, +72))
				rod(12, rtr(-36*i, 9*S, -72))
				rod(11, rtr(-36*i, 9*S, +90-a3))
				rod(11, rtr(-36*i, 9*S, -90+a3))
				rod(11, rtr(-36*i,   C, +90+a3))
				rod(11, rtr(-36*i,   C, -90-a3))
			}
		})
		G.end()
	},
	
	dodecagon_3: (p, name)=> {
		const S = 15
		const skip = true
		const N = 6
		const G = new Polygon(p, name, S, {
			 6: "#08f",
			 8: "#0f2",
			10: "#f80",
		    12: "#f20",
		}, skip)
		const C = N*S / (2*Math.sin(Math.PI/12))
		const R = 180*(Math.PI/12)/Math.PI
		const TR = (a)=> `translate(0 ${N*S}) rotate(${a})`
		G.rods(12, (i, rod)=> {
			rod(6, rtr(-2*R*i, C, 90+R)) // perimeter
			if (i==2 || i==4 || i==6 || i==8 || i==10) {
				const t0 = rtr(-2*R*i, C, 90+5*R)
				rod(6, `${t0}`)
				rod(6, `${t0} ${TR(90)}`)
				if (i!=10) rod(6, `${t0} ${TR(90)} ${TR(90)}`)
				if (i==6 || i==8)
					rod(12, `${t0} ${TR(90)} ${TR(-120)}`)
			}
			if (i==11) {
				const t0 = rtr(-2*R*i, C, 90+7*R)
				rod( 8, `${t0}`)
				rod( 6, `${t0} ${TR(+30)}`)
				rod( 6, `${t0} ${TR(+30+90)}`)
				const acos4_5 = 180*Math.acos(4/5)/Math.PI
				rod(10, `${t0} translate(0 ${8*S}) rotate(${180+acos4_5})`)
			}
		})
		G.end()
	},

	tetradecagon_3: (p, name)=> {
		const S = 12
		const skip = true
		const G = new Polygon(p, name, S, {
			 6: "#08f",
			 8: "#0f2",
		    12: "#f20",
		}, skip)
		const C = 6*S / (2*Math.sin(Math.PI/14))
		const R = 180*(Math.PI/14)/Math.PI
		const a1 = +90+3*R
		const a4 = 180*Math.atan(1/8)/Math.PI
		const T = (s, r)=> `translate(0 ${6*S}) rotate(${s*R + (r||0)})`

		G.rods(14, (i, rod)=> {
			rod(6, rtr(-2*R*i, C, 90+R)) // perimeter
			const t3 = rtr(-2*R*i, 0, a1)
			if (i==0 || i==5 || i==10) {
				rod(12, `${t3} translate(0 ${-6*S})`)

				rod(6, `${t3} ${T(-4)}`)
				rod(6, `${t3} ${T(-4)} ${T(-4)}`)
				rod(6, `${t3} ${T(-4)} ${T(+8)}`)

				rod(6, `${t3} ${T(+4)}`)
				rod(6, `${t3} ${T(+4)} ${T(+4)}`)
				rod(6, `${t3} ${T(+4)} ${T(-8)}`)
			}
			if (i==0) { // mirror heptagons
				const t8  = (s)=> rtr(2*R*i, 0, s*4*R)
				const two = [ +1, -1 ]
				two.forEach(s => {
					rod(6, `${t8(1*s)} ${T(-4*s)}`)
					rod(8, `${t8(1*s)} ${T(+5*s, +a4)}`)
					rod(8, `${t8(1*s)} ${T(+5*s, -a4)}`)
					
					const t12 = `${t8(1*s)} ${T(-4*s)} ${T(+12*s)}`
					rod(6, `${t12}`)
					rod(6, `${t12} ${T(-4*s)}`)
					rod(8, `${t12} ${T(+5*s, +a4)}`)
					rod(8, `${t12} ${T(+5*s, -a4)}`)

					rod(6, `translate(0 ${-6*S}) rotate(${s*a1})`)

					//const ta = rtr(2*R*i, 0, -s*12*R)
					//rod(6, ta)
					//rod(8, `${ta} ${T(-5*s, -s*a4)}`)
					//rod(8, `${ta} ${T(-5*s, -a4)}`)

					//const tb = rtr(2*R*i, -C, s*6*R)
					//rod(6, `${tb} ${T(-4*s)}`)
					//rod(6, `${tb} ${T(-4*s)} ${T(2*s)}`)
					//rod(8, rtr(2*R*i, -6*S, s*9*R + a4))
					//rod(8, rtr(2*R*i, -6*S, s*9*R - a4))
				})
			}
		})
		G.end()
	},


	dodecagon_2: (p, name)=> {
		const S = 20
		const skip = true
		const G = new Polygon(p, name, S, {
			 4: "#08f",
			 8: "#0d2",
			10: "#f20"
		}, skip)
		const C = 8*S*Math.sqrt(2)/2 // circuncenter
		const acos4_5 = 180*Math.acos(4/5)/Math.PI

		G.rods(4, (i, rod)=> {
			const t1 = `rotate(${-90*i}) translate(0 ${C})`
			rod(8, `${t1} rotate(${-90-45})`)
			if (i==0) {
				rod(10, `${t1} rotate(${-90-45-acos4_5})`)
			}
			const t2 = rtr(-90*i, C, -45-30)
			rod(4, `${t2}`)
			rod(4, `${t2} translate(0 ${4*S}) rotate(150)`)
			rod(4, `${t2} translate(0 ${4*S}) rotate(-60)`)
			rod(4, `${t2} translate(0 ${4*S}) rotate(-120)`)
			rod(4, `${t2} translate(0 ${4*S}) rotate(-60) translate(0 ${4*S}) rotate(-120)`)
			rod(4, `${t2} translate(0 ${4*S}) rotate(-60) translate(0 ${4*S}) rotate(-60)`)
			rod(4, `${t2} translate(0 ${4*S}) rotate(-60) translate(0 ${4*S}) rotate(-30)`)
		})
		G.end()
	}
}

}
