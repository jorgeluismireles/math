const fs = require('fs');

const xml = (tag, attrs, text)=> {
	const rows = []
	const a = []
	if (attrs)
		Object.keys(attrs).forEach(k=> a.push(` ${k}="${attrs[k]}"`))
	if (text) {
		if (Array.isArray(text)) {
			rows.push(`<${tag}${a.join("")}>`)
			text.forEach(t => {
				rows.push(...t)
			})
			rows.push(`</${tag}>`)
		} else {
			rows.push(`<${tag}${a.join("")}>${text}</${tag}>`)
		}
	} else {
		rows.push(`<${tag}${a.join("")}/>`)
	}
	return rows
}
const xmlLine = (p1, p2)=> {
	return xml("line", { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y })
}

const polarToCartesian = (c, r, degrees)=> {
  	const rad = (degrees-90) * Math.PI / 180.0
  	return {
    	x: c.x + (r * Math.cos(rad)),
    	y: c.y + (r * Math.sin(rad))
  	}
}

const xmlText = (c, text, R, A)=> {
	const r = R || 0
	const a = A || 0
	return xml("text", polarToCartesian(c, r, a), text)
}

const xmlPathArc = (c, r, startAngle, angle) => {
	if (!angle)
		return ""
    const a1 = polarToCartesian(c, r, startAngle + angle)
    const a2 = polarToCartesian(c, r, startAngle)
    const largeArcFlag = angle <= 180 ? "0" : "1"
	return xml("path", { d: [
        "M", a1.x, a1.y, 
        "A", r, r, 0, largeArcFlag, 0, a2.x, a2.y
    ].join(" ") })
}

const S = 333
const M = 140

const sin = (x)=> { return (M*Math.sin(x*Math.PI)).toFixed(4) }
const cos = (y)=> { return (M*Math.cos(y*Math.PI)).toFixed(4) }

const p1 = { x: -sin(1/7), y: +cos(1/7) }
const p2 = { x: +sin(1/7), y: +cos(1/7) }
const p3 = { x: +sin(3/7), y: +cos(3/7) }
const p4 = { x: +sin(5/7), y: +cos(5/7) }
const p5 = { x: +sin(7/7), y: +cos(7/7) }
const p6 = { x: -sin(5/7), y: +cos(5/7) }
const p7 = { x: -sin(3/7), y: +cos(3/7) }

const p8 = { x:p7.x-100, y:p7.y } // p7 little bit left

const q1 = { x:p5.x, y:-cos(3/7) }
const q2 = { x:p1.x, y:p7.y }
const q3 = { x:p6.x, y:p7.y }
const q4 = { x:p6.x, y:q1.y }

const r1 = { x:q1.x, y:p1.y }
const r2 = { x:.75*p1.x, y:p1.y }

const heptagon = [
	xmlLine(p1, p2),
	xmlLine(p2, p3),
	xmlLine(p3, p4),
	xmlLine(p4, p5),
	xmlLine(p5, p6),
	xmlLine(p6, p7),
	xmlLine(p7, p1)
]
const up = [
	xmlLine(p4, q1),
	xmlLine(q1, p6)
]

const orto = [
	xmlLine(p1, q2),
	xmlLine(q2, p8),
	xmlLine(q3, p6),
	xmlLine(q4, q1),
	xmlLine(q1, r1),
	xmlPathArc(q1, 40, 270, 180*1/7), // arc A
	xmlPathArc(p7, 30,  90, 180*2/7), // arc B
	xmlPathArc(p7, 20, 270, 180*4/7)  // arc C
]

const texts = [
	xmlText(q1, "A", 50, 270 + 1*180/14),
	xmlText(p7, "B", 40,  90 + 2*180/14),
	xmlText(p7, "C", 30, 270 + 4*180/14),

	xmlText(p1, "p1", 18, 4*360/7),
	xmlText(p2, "p2", 18, 3*360/7),
	xmlText(p3, "p3", 18, 2*360/7),
	xmlText(p4, "p4", 18, 1*360/7),
	xmlText(p5, "p5", 18),
	xmlText(p6, "p6", 18, -1*360/7),
	xmlText(p7, "p7", 18, 225),
	xmlText(q1, "q1", 18), // at north
	xmlText(q2, "q2", 18,  45),
	xmlText(q3, "q3", 18,  45),
	xmlText(q4, "q4", 18, 135),
	xmlText(r1, "r1", 18, 180),
	xmlText(r2, "r2", 18, 180),
]

const diagonal = [
	xmlLine(q1, r2),
]

const groups = [
	xml("g", { stroke:"#08f", "stroke-width":5 }, heptagon),
	xml("g", { stroke:"#0a6", "stroke-width":5 }, up),
	xml("g", { stroke:"#888", "stroke-width":1, fill:"none" }, orto),
	xml("g", { "font-family":"Verdana", "font-size":16, stroke:"none", fill:"#888", "dominant-baseline":"middle", "text-anchor":"middle" }, texts),
	xml("g", { stroke:"#f80", "stroke-width":5 }, diagonal),
]

const svg = xml("svg", { 
	xmlns:"http://www.w3.org/2000/svg",
	width: S,
	height: S
}, [
	xml("g", { transform:`translate(${S/2},${S/2}) scale(1 1)` }, groups)
]) 
const filename = "automatic/heptagon_construction_js.svg"
fs.writeFile(filename, svg.join("\n"), function (err) {
    if (err)
        return console.log(err);
    console.log(`saved: ${filename}`)
})