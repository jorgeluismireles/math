const Braced = function(rtr, svgParams)
{
	this.add = (map)=> {
		Object.keys(objects).forEach(key => {
			const name = `braced_${key}`
			map[name] = ()=> {
				objects[key](svgParams(), name)
			}
		})
	}

const objects = 
{
	decagon: (p, name)=> {
		p.center_x = 4.5
		p.center_y = 1.7
		const S = 12
		const N = 8, N1=8.1, N2=8.2, N3=8.3
		const extremes = true

		const colors = {}
		colors[N1] = "#f00"
		colors[N2] = "#abc"
		colors[N3] = "#0f0"
		const G = new Polygon(p, name, S, colors, false, extremes)
		const C = S*N*Math.sqrt((5-Math.sqrt(5))/10)
		const TR = r=> `translate(0 ${S*N}) rotate(${r})`
		G.rods(5, (i, rod)=> {
			rod((i%5 == 0) ? N1 : N2, rtr(72*i, -C, +18))
			const t1 = rtr(72*i, -C, 180+54)
			if (i == 0)           rod(N1, t1);
			if (i == 1 || i == 2) rod(N2, t1);

			if (i == 3)		      rod(N1, rtr(72*i, -C, 180-54))
			if (i == 1)           rod(N2, rtr(72*i, -C, 180-54))
			if (i == 2)           rod(N3, rtr(72*i, -C, 180-54))

			if (i == 0)           rod(N2, `${t1} ${TR(+72)}`)
			if (i == 1)           rod(N2, `${t1} ${TR(-108)}`)
			
			if (i == 3) { // up
				const ta = rtr(72*i, -C, 90)
				rod(N2, ta)
				rod(N2, `${ta} ${TR(-72)}`)
				rod(N2, `${ta} ${TR(+36)}`)

				const tb = `${rtr(72*i, -C, 180-54)} ${TR(-36)}`
				rod(N1, `${tb}`)
				rod(N1, `${tb} ${TR(-36)}`)
				rod(N1, `${tb} ${TR(-36)} ${TR(-36)}`)
				rod(N2, `${tb} ${TR(-72)}`)
				rod(N2, `${tb} ${TR(-72)} ${TR(+36)}`)
				rod(N2, `${tb} ${TR(-72)} ${TR(-72)}`)
			}

			if (i == 2) {
				const tc = rtr(72*i, -C, 180-54)
				rod(N3, `${tc} ${TR(0)}`)
				rod(N2, `${tc} ${TR(0)} ${TR(+72)}`)
				rod(N1, `${tc} ${TR(0)} ${TR(+72)} ${TR(-144)}`)
				rod(N2, `${tc} ${TR(0)} ${TR(-72)}`)
				rod(N1, `${tc} ${TR(0)} ${TR(-72)} ${TR(+144)}`)
				rod(N1, `${tc} ${TR(0)} ${TR(-72)} ${TR(-72)}`)
				rod(N2, `${tc} ${TR(0)} ${TR(-72)} ${TR(-108)}`)
				rod(N1, `${tc} ${TR(0)} ${TR(-72)} ${TR(-72)} ${TR(-36)}`)
			}
		})
		G.end()
	},

	tetradecagon: (p, name)=> {
		const S = 9
		const N = 8, N1=8.1, N2=8.2, N3=8.3
		const extremes = true
		const G = new Polygon(p, name, S, {
			 "8.1": "#f00",
			 "8.2": "#abc",
			 "8.3": "#0f0"
		}, false, extremes)
		const C = N*S / (2*Math.sin(Math.PI/14))
		const R = 180*(Math.PI/14)/Math.PI
		const a1 = +90+3*R
		const a4 = 180*Math.atan(1/8)/Math.PI
		const T = (s, r)=> `translate(0 ${N*S}) rotate(${s*R + (r||0)})`
		const TR = r=> `translate(0 ${S*N}) rotate(${r})`

		const pair = [ 1, -1 ]
		G.rods(14, (i, rod)=> {
			rod(8.1, rtr(-2*R*i, C, 90+R)) // perimeter
			if (i==0 || i==7) {
				pair.forEach(j => {
					const r1 = rtr(-2*R*i, C, 180+j*4*R)
					rod(8.2, r1)
					const t1 = TR(+j*2*R)
					rod(8.2, `${r1} ${t1}`)
					rod(8.2, `${r1} ${t1} ${TR(-j*6*R)}`)
					
					const t2 = TR(-j*4*R)
					rod(8.2, `${r1} ${t2}`)
					rod(8.2, `${r1} ${t2} ${TR(+j*6*R)}`)
					rod(8.2, `${r1} ${t2} ${TR(+j*4*R)}`)
					rod(8.3, `${r1} ${t2} ${TR(-j*4*R)}`)

					const t3 = TR(-j*8*R)
					rod(8.2, `${r1} ${t3}`)
					if (j==1)
						rod(8.3, `${r1} ${t3} ${TR(j*4*R)}`)
				})
			}
			if (i==3 || i==10) {
				const r = rtr(-2*R*i, C, -10*R)
				const t = TR(+12*R)
				rod(8.2, r)
				rod(8.2, `${r} ${t}`)
				rod(8.2, `${r} ${t} ${t}`)
				rod(8.2, `${r} ${t} ${t} ${t}`)
				rod(8.2, `${r} ${t} ${t} ${t} ${t}`)
				rod(8.2, `${r} ${t} ${t} ${t} ${t} ${t}`)
			}
		})
		G.end()
	},

	nonagon: (p, name)=> {
		p.center_y = 2.3
		p.center_x = 5.5
		const S = 13
		const N = 8, N1 = 8.1, N2 = 8.2
		const extremes = true
		const colors = {}
		colors[N1] = "#f00"
		colors[N2] = "#abc"
		const G = new Polygon(p, name, S, colors, false, extremes)
		const C = S*N/(2*Math.cos(Math.PI/18))
		const A = 360/9.0
		const TR = r=> `translate(0 ${S*N}) rotate(${r})`
		const tb = n => TR(n * A / 4)

		G.rods(9, (i, rod)=> {
			const RTR = (a)=> rtr(A*i, -C, a)
			const t1 = RTR(+180 + 3*A/4) 

			rod((i==4)?N1:N2, RTR(A/4))
			
			if (i==0)         rod(N1, t1)
			if (i>=1 && i<=3) rod(N2, t1)
			if (i>=1 && i<=3) rod(N2, RTR(+180 - 3*A/4))
			if (i==4)         rod(N1, RTR(+180 - 3*A/4))

			if (i==0)         rod(N1, `${t1} ${tb(-1+5)}`)
			if (i>=1 && i<=2) rod(N2, `${t1} ${tb(-1+5)}`)
			if (i>=1 && i<=2) rod(N2, `${t1} ${tb(-1-5)}`)
			if (i==3)         rod(N1, `${t1} ${tb(-1-5)}`)

			if (i==0)         rod(N1, `${t1} ${tb(-1+5)} ${tb(-3+7)}`)
			if (i==1)         rod(N2, `${t1} ${tb(-1+5)} ${tb(-3+7)}`)
			if (i==1)         rod(N2, `${t1} ${tb(-1+5)} ${tb(-3-7)}`)
			if (i==2)         rod(N1, `${t1} ${tb(-1+5)} ${tb(-3-7)}`)
			
			if (i==0)	      rod(N1, `${t1} ${tb(-1+5)} ${tb(-3+7)} ${tb(-5+9)}`)
			if (i==1)	      rod(N1, `${t1} ${tb(-1+5)} ${tb(-3+7)} ${tb(-5-9)}`)
		})
		G.end()
	},


	enneagram_94: (p, name)=> {
		p.center_y = 1.9
		const S = 8
		const N = 8, N1 = 8.1, N2 = 8.2, N3 = 8.3, N4 = 8.4, N5 = 8.5
		const extremes = true
		const colors = {}
		colors[N1] = "#f00"
		colors[N2] = "#f80"
		colors[N3] = "#08f"
		colors[N4] = "#80f"
		colors[N5] = "#abc"
		const G = new Polygon(p, name, S, colors, false, extremes)
		const C = S*N/(2*Math.cos(Math.PI/18))
		const A = 360/9.0
		const TR = r=> `translate(0 ${S*N}) rotate(${r})`
		G.rods(9, (i, rod)=> {
			const RTR = (a)=> rtr(A*i, -C, a)
			rod(N1, RTR(A/4))
			const t1 = RTR(+180 + 3*A/4) 
			const t2 = TR(-1*A/4 + 5*A/4)
			const t3 = TR(-3*A/4 + 7*A/4)

			rod(N2, t1)
			rod(N2, RTR(+180 - 3*A/4))
			rod(N3, `${t1} ${t2}`)
			rod(N3, `${t1} ${TR(-A/4 - 5*A/4)}`)
			rod(N4, `${t1} ${t2} ${TR(-3*A/4 - 7*A/4)}`)
			rod(N4, `${t1} ${t2} ${t3}`)

			rod(N5, `${t1} ${t2} ${t3} ${TR(-5*A/4 + 9*A/4)}`)
			rod(N5, `${t1} ${t2} ${t3} ${TR(-5*A/4 - 9*A/4)}`)
		})
		G.end()
	},


	heptagon: (p, name)=> {
		p.center_y = 2.3
		p.center_x = 4.5
		const S = 16
		const N = 8, N1 = 8.1, N2 = 8.2
		const extremes = true
		const colors = {}
		colors[N1] = "#f00"
		colors[N2] = "#abc"
		const G = new Polygon(p, name, S, colors, false, extremes)
		const C = S*N/(2*Math.cos(Math.PI/14))
		const A = 360/7.0
		const TR = r=> `translate(0 ${S*N}) rotate(${r})`
		G.rods(7, (i, rod)=> {
			const RTR = (a)=> rtr(A*i, -C, a)
			const t1 = RTR(+180 + 3*A/4) 
			const t2 = TR(-1*A/4 + 5*A/4)

			rod((i==3)?N1:N2, RTR(A/4))
			if (i==0)         rod(N1, t1)
			if (i==1 || i==2) rod(N2, t1)
			if (i==1 || i==2) rod(N2, RTR(+180 - 3*A/4))

			if (i==3)         rod(N1, RTR(+180 - 3*A/4))
			if (i==0)         rod(N1, `${t1} ${t2}`)
			
			if (i==1)         rod(N2, `${t1} ${t2}`)
			if (i==1)         rod(N2, `${t1} ${TR(-A/4 - 5*A/4)}`)

			if (i==2)         rod(N1, `${t1} ${TR(-A/4 - 5*A/4)}`)
			if (i==1)	      rod(N1, `${t1} ${t2} ${TR(-3*A/4 - 7*A/4)}`)
			if (i==0)	      rod(N1, `${t1} ${t2} ${TR(-3*A/4 + 7*A/4)}`)
		})
		G.end()
	},


	heptagram_73: (p, name)=> {
		p.center_y = 1.9
		const S = 10
		const N = 8, N1 = 8.1, N2 = 8.2, N3 = 8.3, N4 = 8.4
		const extremes = true
		const colors = {}
		colors[N1] = "#f00"
		colors[N2] = "#f80"
		colors[N3] = "#08f"
		colors[N4] = "#80f"
		const G = new Polygon(p, name, S, colors, false, extremes)
		const C = S*N/(2*Math.cos(Math.PI/14))
		const A = 360/7.0
		const TR = r=> `translate(0 ${S*N}) rotate(${r})`
		G.rods(7, (i, rod)=> {
			const RTR = (a)=> rtr(A*i, -C, a)
			rod(N1, RTR(A/4))
			const t1 = RTR(+180 + 3*A/4) 
			rod(N2, t1)
			rod(N2, RTR(+180 - 3*A/4))
			const t2 = TR(-A/4 + 5*A/4)
			rod(N3, `${t1} ${t2}`)
			rod(N3, `${t1} ${TR(-A/4 - 5*A/4)}`)
			rod(N4, `${t1} ${t2} ${TR(-3*A/4 - 7*A/4)}`)
			rod(N4, `${t1} ${t2} ${TR(-3*A/4 + 7*A/4)}`)
		})
		G.end()
	},

	pentagram: (p, name)=> {
		p.center_y = 1.8
		const S = 14
		const N = 8, N1 = 8.1, N2 = 8.2, N3 = 8.3
		const extremes = true

		const colors = {}
		colors[N1] = "#f00"
		colors[N2] = "#f80"
		colors[N3] = "#08f"
		const G = new Polygon(p, name, S, colors, false, extremes)
		const C = S*N/(2*Math.cos(Math.PI/10))
		const A = 360/5
		const TR = r=> `translate(0 ${S*N}) rotate(${r})`
		G.rods(5, (i, rod)=> {
			const RTR = (a)=> rtr(180+A*i, -C, a)
			rod(N1, RTR(A/4))
			rod(N2, RTR(+180+54))
			rod(N2, RTR(+180-54))
			rod(N3, `${RTR(180-54)} ${TR(18+90)}`)
			rod(N3, `${RTR(180-54)} ${TR(18-90)}`)
		})
		G.end()
	},

	pentadecagon_0: (p, name)=> {
		const S = 10
		const N = 7
		const N1=7.1, N2=7.2, N3=7.3, N4=7.4
		const extremes = true
		const colors = {}
		colors[N1] = "#f00"
		colors[N2] = "#abc"
		colors[N3] = "#ff0"
		colors[N4] = "#0f0"
		const G = new Polygon(p, name, S, colors, false, extremes)
		const C = N*S / (2*Math.sin(Math.PI/15))

		const R = 180*(Math.PI/15)/Math.PI
		const TR = r=> `translate(0 ${S*N}) rotate(${r})`

		G.rods(15, (i, rod)=> {
			const RTR = a => rtr(-2*R*i, C, a)
			rod(N1, RTR(90+R)) // perimeter
			if (i == 0) {
				rod(N2, RTR(90+R+24))
				rod(N2, `${RTR(90+R+24)} ${TR(-24)}`)
				rod(N2, `${RTR(90+R+24)} ${TR(+120)}`)
				rod(N2, `${RTR(90+R+24)} ${TR(+120)} ${TR(+120)}`)

				rod(N2, `${RTR(90+R+24)} ${TR(36)}`)
				rod(N2, `${RTR(90+R+24)} ${TR(36)} ${TR(-120)}`)
			}
		})
		G.end()
	},

	pentadecagon_2: (p, name)=> {
		const S = 10
		const N = 7
		const N1=7.1, N2=7.2, N3=7.3, N4=7.4
		const extremes = true
		const colors = {}
		colors[N1] = "#f00"
		colors[N2] = "#abc"
		colors[N3] = "#ff0"
		colors[N4] = "#0f0"
		const G = new Polygon(p, name, S, colors, false, extremes)
		const C = N*S / (2*Math.sin(Math.PI/15))

		const R = 180*(Math.PI/15)/Math.PI
		const TR = r=> `translate(0 ${S*N}) rotate(${r})`

		G.rods(15, (i, rod)=> {
			const RTR = a => rtr(-2*R*i, C, a)
			rod(N1, RTR(90+R)) // perimeter
			if (i == 0 || i==3 || i==6 || i==9 || i==12) {
				const t1 = RTR(-102-36)
				const t2 = TR(144)

				// pentagram-1
				rod(N2, t1)
				rod(N2, `${t1} ${t2}`)
				rod(N2, `${t1} ${t2} ${t2}`)
				rod(N2, `${t1} ${t2} ${t2} ${t2}`)

				rod(N3, `${t1} ${TR(-120)}`)
				rod(N3, `${t1} ${TR(-120)} ${TR(-120)}`)
				rod(N3, `${t1} ${t2} ${t2} ${TR(84)}`)
				rod(N3, `${t1} ${t2} ${t2} ${TR(84)} ${TR(120)}`)

				rod(N4, `${t1} ${TR(-72)}`)
				rod(N4, `${t1} ${t2} ${t2} ${TR(36)}`)


				// pentagram-2
				//rod(N3, `${RTR(90+R+60)} ${TR(+12)}`)
				//rod(N3, `${RTR(90+R+60)} ${TR(+72)}`)

				//const t3 = RTR(90+R+60)
				//rod(N3, `${t3} ${TR(+12)} ${TR(120)}`)
				//rod(N3, `${t3} ${TR(+12)} ${TR(84)}`)
				//rod(N3, `${t3} ${TR(+12)} ${TR(84)} ${TR(144)}`)
				//rod(N3, `${t3} ${TR(+12)} ${TR(84)} ${TR(144)} ${TR(144)}`)
				//rod(N3, `${t3} ${TR(+12)} ${TR(84)} ${TR(144)} ${TR(144)} ${TR(144)}`)
				//rod(N3, `${RTR(90+R+60)} ${TR(+12)} ${TR(84)} ${TR(84)}`)
				//rod(N3, `${RTR(90+R+60)} ${TR(+12)} ${TR(84)} ${TR(84)} ${TR(120)}`)
			}
			/*if (i == 2) {
				const t4 = RTR(90+R+60)
				rod(N2, t4)
				rod(N2, RTR(90+R+120))
				rod(N2, `${RTR(90+R+120)} ${TR(-120)}`)
			}*/
			/*if (i == 3) {
				const t4 = RTR(90+R+84)
				rod(N2, t4)
				rod(N2, `${t4} ${TR(-84)}`)
			}
			if (i == 4) {
				const t4 = RTR(90+R+108)
				rod(N2, t4)
				rod(N2, `${t4} ${TR(-108)}`)
			}*/
		})
		G.end()
	},

	square_1: (p, name)=> {
		p.center_x = 1.75
		p.center_y = 2.5
		const S = 10
		const N = 20
		const extremes = true

		const colors = [ ".1",".2",".3",".4" ]

		const G = new Polygon(p, name, S, {
			 "20.1": "#abc",
			 "20.2": "#bcd",
			 "20.3": "#cde",
			 "20.4": "#f00"
		}, false, extremes)
		
		const T = S*N
		const _1_m_s2 = S*N*(1 - Math.sqrt(2)/2)
		const _1_p_s2 = S*N*(1 + Math.sqrt(2)/2)
		const atan = 180*Math.atan(_1_m_s2/_1_p_s2)/Math.PI

		const tr = a => `translate(0 ${T}) rotate(${a})`

		const OA = rtr(-45)
		const AD = rtr(-45,T,-135)
		const AF = rtr(-45,T,+135)

		const OB = rtr(-180)
		const BE = rtr(-180,T,-90)
		const BD = rtr(-180,T,+135)

		const OC = rtr(-270)
		const CE = rtr(-270,T,+90)
		const CF = rtr(-270,T,-135)


		const DI = `${AD} ${tr(-90-atan-30)}`
		const DJ = `${AD} ${tr(-90-atan+30)}`

		const IC = `${DI} ${tr( +60)}`
		const JI = `${DJ} ${tr(-120)}`
		const JC = `${DJ} ${tr( -60)}`

		const FG = `${AF} ${tr(90+atan+30)}`
		const FH = `${AF} ${tr(90+atan-30)}`

		const GB = `${FG} ${tr( -60)}`
		const HG = `${FH} ${tr(+120)}`
		const HB = `${FH} ${tr( +60)}`

		const rods = {
			".1": [ FG, FH, HB, HG, GB ],
			".2": [ OA,	AD, BD, CF, AF ],
			".3": [ DI, DJ, IC, JI, JC ],
			".4": [ OB, OC, BE, CE ]
		}

		colors.forEach(c => {
			G.rods(rods[c].length, (i, rod)=> {
				rod(N + c, rods[c][i])
			})
		})
		G.end()
	},

	square_2: (p, name)=> {
		p.center_x = 2
		p.center_y = 2.5
		const S = 18
		const N = 6
		const T = S*N
		const extremes = true
		colors = [ ".1", ".2" ]
		const G = new Polygon(p, name, S, {
			"6.1": "#abc",
			"6.2": "#f00"
		}, false, extremes)

		const angle = 180*Math.atan(1/Math.sqrt(2))/Math.PI
		const tr = a => `translate(0 ${T}) rotate(${a})`

		const AD = rtr(0)

		const rods = {
			".1": [ AD ],
			".2": [ ],
		}
		const pair = [ +1, -1 ]
		pair.forEach(i => {
			rods[".2"].push(...[
				rtr(i*(-180+45)), // AB
				rtr(i*(-180+45), T, i*-90) // BC
			])
			const BE = rtr((-180+45)*i, T, (-90+60)*i)
			const BG = rtr((-180+45)*i, T, (-90+180)*i)
			const GH = `${BG} ${tr((135-angle-30)*i)}`
			const ID = `${GH} ${tr(+60*i)}`

			rods[".1"].push(...[
				BE,
				rtr((-180+45)*i, T, (-90+120)*i), // BF
				BG,
				`${BE} ${tr(-120*i)}`, // EC
				`${BE} ${tr(+120*i)}`, // EF
				`${BG} ${tr(-120*i)}`, // GF
				`${BG} ${tr((135-angle+30)*i)}`, // GI
				GH,
				`${GH} ${tr(+120*i)}`, // HI
				ID,
				`${ID} ${tr(+120*i)}` // DH
			])
		})
		colors.forEach(c => {
			G.rods(rods[c].length, (i, rod)=> {
				rod(N + c, rods[c][i])
			})
		})
		G.end()
	},

	nonagon_1: (p, name)=> {
		const S = 20
		const extremes = true
		const G = new Polygon(p, name, S, {
			"6.1": "#06e",
			"6.2": "#abc"
		}, false, extremes)
		const C = 6*S / (2*Math.sin(Math.PI/9))
		G.rods(9, (i, rod)=> {
			rod(6.1, rtr(-40*i, C, 110))
			rod(6.2, rtr(-40*i, C, 150))
			rod(6.2, rtr(-40*i, C, 210))
			rod(6.2, `${rtr(-40*i, C, 210)} translate(0 ${6*S}) rotate(-120)`)
		})
		G.end()
	},

	pentagon: (p, name)=> {
		p.center_x = 3.5
		p.center_y = 2.5
		const S = 20
		const N = 8, N1=8.1, N2=8.2
		const extremes = true

		const colors = {}
		colors[N1] = "#06e"
		colors[N2] = "#abc"
		const G = new Polygon(p, name, S, colors, false, extremes)
		const C = S*N*Math.sqrt((5-Math.sqrt(5))/10)
		const TR = (a)=> `translate(0 ${S*N}) rotate(${a})`

		G.rods(5, (i, rod)=> {
			rod((i == 2) ? N1 : N2, rtr(72*i, -C, +18))
			
			const t1 = rtr(72*i, -C, 180+54)
			const t2 = rtr(72*i, -C, 180-54)

			if (i == 0) rod(N1, t1)
			if (i == 1) rod(N2, t1)

			if (i == 1) rod(N2, t2)
			if (i == 2) rod(N1, t2)
			
			if (i == 0) rod(N1, `${t1} ${TR(72)}`)
			if (i == 1) rod(N1, `${t1} ${TR(-108)}`)
		})
		G.end()
	},

	pentadecagon: (p, name)=> {
		const S = 10
		const N = 7
		const N1=7.1, N2=7.2, N3=7.3
		const extremes = true
		const colors = {}
		colors[N1] = "#f00"
		colors[N2] = "#abc"
		colors[N3] = "#0f0"
		const G = new Polygon(p, name, S, colors, false, extremes)
		const C = N*S / (2*Math.sin(Math.PI/15))

		const R = 180*(Math.PI/15)/Math.PI
		const TR = r=> `translate(0 ${S*N}) rotate(${r})`

		G.rods(15, (i, rod)=> {
			const RTR = a => rtr(-2*R*i, C, a)
			rod(N1, RTR(90+R)) // perimeter
			if (i % 5 == 0 || i % 5 == 2) {
				const t1 = RTR(-102-36), t2 = TR(144)
				rod(N2, t1)
				rod(N2, `${t1} ${t2}`)
				rod(N2, `${t1} ${t2} ${t2}`)
				rod(N2, `${t1} ${t2} ${t2} ${t2}`)

				const Nz = (i%5==2) ? N3 : N2
				rod(Nz, `${t1} ${TR(-120)}`)
				rod(N2, `${t1} ${TR(-120)} ${TR(-120)}`)

				const Nx = (i%5==0) ? N3 : N2
				rod(Nx, `${t1} ${t2} ${t2} ${TR(84)}`)
				rod(N2, `${t1} ${t2} ${t2} ${TR(84)} ${TR(120)}`)
			}
			if (i % 5 == 4) {
				rod(N2, RTR(180-18))
				rod(N2, RTR(180+18))
			}
		})
		G.end()
	},

	decagon_irregular_1: (p, name)=> {
		const S = 5.5
		const N = 20, N1=20.1, N2=20.2, N3=20.3, N4=20.4, N5=20.5
		const extremes = true

		const colors = {}
		colors[N1] = "#f00"
		colors[N2] = "#f80"
		colors[N3] = "#ff0"
		colors[N4] = "#0f0"
		colors[N5] = "#08f"
		const G = new Polygon(p, name, S, colors, false, extremes)
		const C = S*N*Math.sqrt((5-Math.sqrt(5))/10)
		const TR = r=> `translate(0 ${S*N}) rotate(${r})`

		G.rods(5, (i, rod)=> {
			const a = (a)=> rtr(72*i, -C, a)
			rod(N1, a(+18))
			rod(N2, a(+78))
			rod(N2, a(-78))

			rod(N3, `${a(+78)} ${TR(+120)}`)
			rod(N3, `${a(+78)} ${TR(+120)} ${TR(120)}`)
			rod(N4, `${a(+78)} ${TR(+120)} ${TR(120-36)}`)
			rod(N4, `${a(+78)} ${TR(+120)} ${TR(120-36)} ${TR(+36)}`)

			rod(N5, `${a(+78)} ${TR(+120)} ${TR(-46-93)}`)
			rod(N5, `${a(+78)} ${TR(+120)} ${TR(-46+93)}`)
		})
		G.end()
	},

	decagon_irregular_2: (p, name)=> {
		const S = 14
		const N = 8
		const N1 = 8.1, N2 = 8.2, N3 = 8.3, N4 = 8.4
		const extremes = true

		const colors = {}
		colors[N1] = "#f00"
		colors[N2] = "#f80"
		colors[N3] = "#dd0"
		colors[N4] = "#0c0"
		const G = new Polygon(p, name, S, colors, false, extremes)
		const C = S*N*Math.sqrt((5-Math.sqrt(5))/10)
		const TR = r=> `translate(0 ${S*N}) rotate(${r})`

		G.rods(5, (i, rod)=> {
			const a = (a)=> rtr(72*i, -C, a)
			rod(N1, a(+18))
			rod(N2, a(+78))
			rod(N2, a(-78))
			const b = `${a(+78)} ${TR(30+73)}`
			const c = `${a(+78)} ${TR(30-73)}`
			rod(N3, b)
			rod(N3, c)

			rod(N4, `${b} ${TR(-37+109)}`)
			rod(N4, `${b} ${TR(-37-109)}`)
		})
		G.end()
	}
}
}
