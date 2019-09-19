const fs = require('fs');

const xml = (tag, attrs, text)=> {
	const rows = []
	const a = []
	if (attrs)
		Object.keys(attrs).forEach(k=> a.push(` ${k}="${attrs[k]}"`))
	if (text) {
		rows.push(`<${tag}${a.join("")}>`)
		text.forEach(t => {
			rows.push(...t)
		})
		rows.push(`</${tag}>`)
	} else {
		rows.push(`<${tag}${a.join("")}/>`)
	}
	return rows
}

const S = 440
const M = 180

const sin = (x)=> { return M*Math.sin(x*Math.PI/7) }
const cos = (y)=> { return M*Math.cos(y*Math.PI/7) }

const A = { x: -sin(1), y: +cos(1) }
const B = { x: +sin(1), y: +cos(1) }
const C = { x: +sin(3), y: +cos(3) }
const D = { x: +sin(5), y: +cos(5) }
const E = { x: +sin(7), y: +cos(7) }
const F = { x: -sin(5), y: +cos(5) }
const G = { x: -sin(3), y: +cos(3) }
const H = { x: +sin(7), y: -cos(3) }

const heptagon = [
	xml("line", { x1: A.x, y1: A.y, x2: B.x, y2: B.y }),
	xml("line", { x1: B.x, y1: B.y, x2: C.x, y2: C.y }),
	xml("line", { x1: C.x, y1: C.y, x2: D.x, y2: D.y }),
	xml("line", { x1: D.x, y1: D.y, x2: E.x, y2: E.y }),
	xml("line", { x1: E.x, y1: E.y, x2: F.x, y2: F.y }),
	xml("line", { x1: F.x, y1: F.y, x2: G.x, y2: G.y }),
	xml("line", { x1: G.x, y1: G.y, x2: A.x, y2: A.y })
]
const up = [
	xml("line", { x1: D.x, y1: D.y, x2: H.x, y2: H.y }),
	xml("line", { x1: H.x, y1: H.y, x2: F.x, y2: F.y }),
]

const xmlText = (x, y, text, R, a)=> {
	return xml("text", { 
		x: x + R*Math.sin(+a*Math.PI/180), 
		y: y + R*Math.cos(-a*Math.PI/180), 
		"dominant-baseline":"middle", "text-anchor":"middle" 
	}, [ text ])
}

const orto = [
	xml("line", { x1: A.x, y1: A.y, x2: A.x, y2: G.y }),
	xml("line", { x1: A.x, y1: G.y, x2: G.x, y2: G.y }),
	xml("line", { x1: F.x, y1: G.y, x2: F.x, y2: F.y }),
	xml("line", { x1: F.x, y1: H.y, x2: H.x, y2: H.y }),
	xml("line", { x1: H.x, y1: H.y, x2: H.x, y2: A.y }),
	xmlText(A.x, A.y, "A", 12, 180 - 4*360/7),
	xmlText(B.x, B.y, "B", 12, 180 - 3*360/7),
	xmlText(C.x, C.y, "C", 12, 180 - 2*360/7),
	xmlText(D.x, D.y, "D", 12, 180 - 1*360/7),
	xmlText(E.x, E.y, "E", 12, 180),
]


const diagonal = [
	xml("line", { x1: H.x, y1: H.y, x2: 3*A.x/4, y2: A.y }),
]

const groups = [
	xml("g", { stroke:"#08f", "stroke-width":5, "stroke-line-join":"round" }, heptagon),
	xml("g", { stroke:"#0a6", "stroke-width":5 }, up),
	xml("g", { stroke:"#888", "stroke-width":1 }, orto),
	xml("g", { stroke:"#f80", "stroke-width":5 }, diagonal),
]

const svg = xml("svg", { 
	xmlns:"http://www.w3.org/2000/svg",
	width:S,
	height:S,
	style:"border:1px solid gray;"
}, [
	xml("g", { transform:`translate(${S/2},${S/2}) scale(1 1)` }, groups)
]) 


svg.forEach(r => {
	console.log(r)
})

fs.writeFile("heptagon_construction_js.svg", svg.join("\n"), function (err) {
    if (err)
        return console.log(err);
    console.log("The file was saved!");
})