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
const xmlLine = (x1, y1, x2, y2)=> {
	return xml("line", { x1: x1, y1: y1, x2: x2, y2: y2 })
}

const xmlText = (x, y, text, R, a)=> {
	return xml("text", { 
		x: (x + R*Math.sin(+a*Math.PI/180)).toFixed(4), 
		y: (y + R*Math.cos(-a*Math.PI/180)).toFixed(4)
	}, text)
}

const S = 333
const M = 140

const sin = (x)=> { return (M*Math.sin(x*Math.PI)).toFixed(4) }
const cos = (y)=> { return (M*Math.cos(y*Math.PI)).toFixed(4) }

const A = { x: -sin(1/7), y: +cos(1/7) }
const B = { x: +sin(1/7), y: +cos(1/7) }
const C = { x: +sin(3/7), y: +cos(3/7) }
const D = { x: +sin(5/7), y: +cos(5/7) }
const E = { x: +sin(7/7), y: +cos(7/7) }
const F = { x: -sin(5/7), y: +cos(5/7) }
const G = { x: -sin(3/7), y: +cos(3/7) }
const H = { x: +sin(7/7), y: -cos(3/7) }

const heptagon = [
	xmlLine(A.x, A.y, B.x, B.y),
	xmlLine(B.x, B.y, C.x, C.y),
	xmlLine(C.x, C.y, D.x, D.y),
	xmlLine(D.x, D.y, E.x, E.y),
	xmlLine(E.x, E.y, F.x, F.y),
	xmlLine(F.x, F.y, G.x, G.y),
	xmlLine(G.x, G.y, A.x, A.y)
]
const up = [
	xml("line", { x1: D.x, y1: D.y, x2: H.x, y2: H.y }),
	xml("line", { x1: H.x, y1: H.y, x2: F.x, y2: F.y }),
]

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

const arc = (x, y, radius, startAngle, endAngle) => {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ")
}

const orto = [
	xmlLine(A.x, A.y, A.x, G.y),
	xmlLine(A.x, G.y, G.x-100, G.y),
	xmlLine(F.x, G.y, F.x, F.y),
	xmlLine(F.x, H.y, H.x, H.y),
	xmlLine(H.x, H.y, H.x, A.y),
	xml("path", { d: arc(H.x, H.y, 40, 270, 270 + 1*180/7) }), // arc A
	xml("path", { d: arc(G.x, G.y, 30,  90,  90 + 2*180/7) }), // arc B
	xml("path", { d: arc(G.x, G.y, 20, 270, 270 + 4*180/7) })  // arc C
]

const texts = [
	xmlText(H.x, H.y, "A", 50, -90 - 1*180/14),
	xmlText(G.x, G.y, "B", 40,  90 - 2*180/14),
	xmlText(G.x, G.y, "C", 30, 270 - 4*180/14),


	xmlText(A.x, A.y, "p1", 12, 180 - 4*360/7),
	xmlText(B.x, B.y, "p2", 12, 180 - 3*360/7),
	xmlText(C.x, C.y, "p3", 12, 180 - 2*360/7),
	xmlText(D.x, D.y, "p4", 12, 180 - 1*360/7),
	xmlText(E.x, E.y, "p5", 12, 180),
	xmlText(F.x, F.y, "p6", 12, 180 + 1*360/7),
	xmlText(G.x, G.y, "p7", 15, -30),
	xmlText(H.x, H.y, "q1", 12, 180),
	xmlText(A.x, G.y, "q2", 12, 125),
	xmlText(F.x, G.y, "q3", 15, 125),
	xmlText(F.x, H.y, "q4", 15, 45),
	xmlText(H.x, A.y, "r1", 15, 0),
	xmlText(3*A.x/4, A.y, "r2", 15, 0),
]


const diagonal = [
	xmlLine(H.x, H.y, 3*A.x/4, A.y),
]

const groups = [
	xml("g", { stroke:"#08f", "stroke-width":5 }, heptagon),
	xml("g", { stroke:"#0a6", "stroke-width":5 }, up),
	xml("g", { stroke:"#888", "stroke-width":1, fill:"none" }, orto),
	xml("g", { stroke:"none", fill:"#888", "dominant-baseline":"middle", "text-anchor":"middle" }, texts),
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