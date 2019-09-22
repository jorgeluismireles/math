const XML = require('./xml')
const xml = new XML()

const S = 333
const M = 140

const sin = (x)=> { return (M*Math.sin(x*Math.PI)).toFixed(4) }
const cos = (y)=> { return (M*Math.cos(y*Math.PI)).toFixed(4) }

const A = 1/9, B = 3/9, C = 5/9, D = 7/9, E = 9/9

const p1 = { x: -sin(A), y: +cos(A) }
const p2 = { x: +sin(A), y: +cos(A) }
const p3 = { x: +sin(B), y: +cos(B) }
const p4 = { x: +sin(C), y: +cos(C) }
const p5 = { x: +sin(D), y: +cos(D) }
const p6 = { x: +sin(E), y: +cos(E) }
const p7 = { x: -sin(D), y: +cos(D) }
const p8 = { x: -sin(C), y: +cos(C) }
const p9 = { x: -sin(B), y: +cos(B) }

const p10 = { x:p9.x-100, y:p9.y } // p9 little bit left
const p11 = { x:p8.x-100, y:p8.y } // p9 little bit left

const q1 = { x:p6.x, y:-cos(B) }
const q2 = { x:p1.x, y:p9.y }
const q3 = { x:p9.x, y:p8.y }
const q4 = { x:p7.x, y:p8.y }
const q5 = { x:p7.x, y:q1.y }

const r1 = { x:q1.x, y:p1.y }
const r2 = { x:q1.x-30, y:p1.y }

const nonagon = [
	xml.line(p1, p2),
	xml.line(p2, p3),
	xml.line(p3, p4),
	xml.line(p4, p5),
	xml.line(p5, p6),
	xml.line(p6, p7),
	xml.line(p7, p8),
	xml.line(p8, p9),
	xml.line(p9, p1),
]
const up = [
	xml.line(p5, q1),
	xml.line(q1, p7)
]
const orto = [
	xml.line(p1, q2), xml.line(q2, p10),
	xml.line(p9, q3), xml.line(q3, p11),
	xml.line(p8, q4), xml.line(q4, p7),
	xml.line(q5, q1), xml.line(q1, r1),

	xml.pathArc(q1, 40, 270, 1*180/9), // arc A
	xml.pathArc(p9, 30,  90, 2*180/9), // arc B
	xml.pathArc(p9, 20, 270, 4*180/9), // arc C
	xml.pathArc(p8, 15, 270, 6*180/9)  // arc D
]


const texts = [
	xml.text(p1, "p1", 18, 5*360/9),
	xml.text(p2, "p2", 18, 4*360/9),
	xml.text(p3, "p3", 18, 3*360/9),
	xml.text(p4, "p4", 18, 2*360/9),
	xml.text(p5, "p5", 18, 1*360/9),
	xml.text(p6, "p6", 18),
	xml.text(p7, "p7", 18, -1*360/9),
	xml.text(p8, "p8", 18, 225),
	xml.text(p9, "p9", 18, 225),

	xml.text(q1, "q1", 18), // at north
	xml.text(q2, "q2", 18,   0),
	xml.text(q3, "q3", 18, 135),
	xml.text(q4, "q4", 18, 135),
	xml.text(q5, "q5", 18, 135),
	xml.text(r1, "r1", 18, 180),
	xml.text(r2, "r2", 18, 180),

	xml.text(q1, "A", 50, 270 + 1*180/18),
	xml.text(p9, "B", 40,  90 + 2*180/18),
	xml.text(p9, "C", 30, 270 + 4*180/18),
	xml.text(p8, "D", 25, 270 + 6*180/18),


]
const diagonal = [
	xml.line(q1, r2),
]
const groups = [
	xml.g({ stroke:"#08f", "stroke-width":5 }, nonagon),
	xml.g({ stroke:"#0a6", "stroke-width":5 }, up),
	xml.g({ stroke:"#888", "stroke-width":1, fill:"none" }, orto),
	xml.g({ "font-family":"Verdana", "font-size":16, stroke:"none", fill:"#888", "dominant-baseline":"middle", "text-anchor":"middle" }, texts),
	xml.g({ stroke:"#f80", "stroke-width":5 }, diagonal),
]

xml.svg(S, S, [
	xml.g({ 
		transform:`translate(${S/2},${S/2}) scale(1 1)` 
	}, groups)
]).save("automatic/nonagon_construction_js.svg")


