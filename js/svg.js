const SVG = function()
{
	const SVG = 'http://www.w3.org/2000/svg'

	const create = (elem)=> {
		return document.createElementNS(SVG, elem);
	}

	const xml = (elem)=> {
		return document.createElement(elem)
	}

	this.svg = (width, height, obj, style)=> {
	    var svg = create('svg')
		svg.setAttribute("xmlns", "http://www.w3.org/2000/svg")
		svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink")
		svg.setAttribute("width", width)
		svg.setAttribute("height", height)
	    for (prop in obj)
	        svg.setAttribute(prop, obj[prop])  
	    if (style) {
	    	const s = xml("style")
	    	for (a in style.attrs)
	    		s.setAttribute(a, style.attrs[a])
	    	s.innerHTML = style.text
	    	svg.appendChild(s)
	    }
	    return svg
	}

	this.g = (obj)=> {
	    var g = create('g')
	    for(prop in obj)
	        g.setAttribute(prop, obj[prop])  
	    return g
	}

	this.line = (obj)=> {
	    var e = create('line')
	    for (prop in obj)
	        e.setAttribute(prop, obj[prop])  
	    return e
	}

	this.path = (d, transform, obj)=> {
	    var e = create('path')
	    if (d) e.setAttribute("d", d);
	    if (transform) e.setAttribute("transform", transform);
	    if (obj) {
		    for (prop in obj)
		        e.setAttribute(prop, obj[prop])  
	    }
	    return e
	}

	this.circle = (obj)=> {
	    var e = create('circle')
	    for (prop in obj)
	        e.setAttribute(prop, obj[prop])  
	    return e
	}

	this.polygon = (points)=> {
		const e = create('polygon')
		e.setAttribute('points', points.map(p => `${p.x},${p.y}`).join(" "))
		return e
	}

	this.text = (obj)=> {
	    var e = create('text')
	    for (prop in obj)
	        e.setAttribute(prop, obj[prop])  
	    return e
	}

	const self = this

	const append = (g, elem)=> {
		g.appendChild(elem)
		return elem
	}

	this.point = (g, p)=> {
		return {
			line: {
				point: (p2, clazz)=> {
					return append(g,
					self.line({
						x1: p.x, y1: p.y, 
						x2: p2.x, y2: p2.y, 
						"class":clazz
					})
				)}
			},
			circle: {
				radius: (r, clazz)=> {
					return append(g, 
						self.circle({ 
							cx:p.x, cy:p.y, 
							r:r, "class":clazz
						})
				)}
			},
			text: {
				center: (text, clazz)=> {
					const t = self.text({
						x: p.x, 
						y: p.y,
						"class":clazz
					})
					t.innerHTML = text
					return append(g, t)
				},
				arc: (text, clazz, r, a)=> {
					const t = self.text({
						x: p.x + r * Math.cos(Math.PI * a / 180), 
						y: p.y + r * Math.sin(Math.PI * a / 180),
						"class":clazz
					})
					t.innerHTML = text
					return append(g, t)
				}
			}
		}
	}
}

const Geometry = function()
{
	this.avgPoint = (points)=> {
		let n = 0
		const avg = { x:0, y:0 }
		points.forEach(p => {
			avg.x += p.x
			avg.y += p.y
			n++
		})
		avg.x /= (n || 1)
		avg.y /= (n || 1)
		return avg
	}

	this.nearestPoint = (point, points)=> {
		const x1 = point.x
		const y1 = point.y
		const L = { d:1e6, i:-1 }
		for (let i=0; i < points.length; i++) {
			const p2 = points[i]
			const dx = Math.abs(p2.x - x1)
			const dy = Math.abs(p2.y - y1)
			const diff = Math.sqrt(dx*dx + dy*dy)
			if (L.d > diff) {
				L.d = diff
				L.i = i
			}
		}
		if (L.i >= 0 && L.i < points.length)
			return points[L.i]
	}

	this.line = (p1, p2)=> {
		const x2x1 = p2.x - p1.x
		const y2y1 = p2.y - p1.y
		return {
			a: - y2y1,
			b: + x2x1,
			c: + y2y1*p1.x - x2x1*p1.y
		}
	}

	const self = this

	this.lineCircleIntersection = (p1, p2, r)=> {
		const EPS = 0.000001
		const L = self.line(p1, p2)
		const aa_bb = L.a*L.a + L.b*L.b
		const x0 = -L.a * L.c / aa_bb
		const y0 = -L.b * L.c / aa_bb
		const cc = L.c * L.c

		if (cc > r*r*aa_bb + EPS) {
			// no points
			return []
		} else
		if (Math.abs(cc - r*r*aa_bb) < EPS) {
			// one point
			return [
				{
					x:x0,
					y:y0 
				}
			]
		} else {
			// two points
			const d = r*r - cc / aa_bb
			const m = Math.sqrt( d / aa_bb )
			return [
				{
					x: x0 + L.b * m,
					y: y0 - L.a * m
				}, {
					x: x0 - L.b * m,
					y: y0 + L.a * m
				}
			]
		}
	}

	this.lineLineIntersection = (L1, L2)=> {
		const x = [ L1[0].x, L1[1].x, L2[0].x, L2[1].x ]
		const y = [ L1[0].y, L1[1].y, L2[0].y, L2[1].y ]
		const d = (x[0]-x[1])*(y[2]-y[3]) - (y[0]-y[1])*(x[2]-x[3])
		if (d == 0)
			return null
		const x1y2_y1x2 = x[0]*y[1] - y[0]*x[1]
		const x3y4_y3x4 = x[2]*y[3] - y[2]*x[3]
		return {
			x: ( x1y2_y1x2*(x[2]-x[3]) - (x[0]-x[1])*x3y4_y3x4 ) / d,
			y: ( x1y2_y1x2*(y[2]-y[3]) - (y[0]-y[1])*x3y4_y3x4 ) / d
		}
	}

	this.order = (p1, p2, segment, diagonal)=> {
		if (!p1) return;
		if (!p2) return;
		if (!segment || segment.length != 2) return;
		const s1 = segment[0]
		const s2 = segment[1]
		const points = [ p1, p2, s1, s2 ]
		if (diagonal)
			points.push(diagonal)
		for (let p=0; p < points.length; p++) {
			const P = points[p]
			if (P.x == undefined || P.y == undefined)
				return
		}
		const dx = Math.abs(p1.x - p2.x)
		const dy = Math.abs(p1.y - p2.y)
		if (dx >= dy) {
			return (p1.x < p2.x) 
				? points.sort((a,b) => a.x - b.x)
				: points.sort((a,b) => b.x - a.x)
		} else {
			return (p1.y < p2.y)
				? points.sort((a,b) => a.y - b.y)
				: points.sort((a,b) => b.y - a.y)
		}
	}
}

