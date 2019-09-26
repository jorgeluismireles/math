const XML = require('./xml')
const xml = new XML()

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
	xml.line(p1, p2),
	xml.line(p2, p3),
	xml.line(p3, p4),
	xml.line(p4, p5),
	xml.line(p5, p6),
	xml.line(p6, p7),
	xml.line(p7, p1)
]
const up = [
	xml.line(p4, q1),
	xml.line(q1, p6)
]

const orto = [
	xml.line(p1, q2),
	xml.line(q2, p8),
	xml.line(q3, p6),
	xml.line(q4, q1),
	xml.line(q1, r1),
	xml.pathArc(q1, 40, 270, 180*1/7), // arc A
	xml.pathArc(p7, 30,  90, 180*2/7), // arc B
	xml.pathArc(p7, 20, 270, 180*4/7)  // arc C
]

const texts = [
	xml.text(q1, "A", 50, 270 + 1*180/14),
	xml.text(p7, "B", 40,  90 + 2*180/14),
	xml.text(p7, "C", 30, 270 + 4*180/14),

	xml.text(p1, "p1", 18, 4*360/7),
	xml.text(p2, "p2", 18, 3*360/7),
	xml.text(p3, "p3", 18, 2*360/7),
	xml.text(p4, "p4", 18, 1*360/7),
	xml.text(p5, "p5", 18),
	xml.text(p6, "p6", 18, -1*360/7),
	xml.text(p7, "p7", 18, 225),
	xml.text(q1, "q1", 18), // at north
	xml.text(q2, "q2", 18,  45),
	xml.text(q3, "q3", 18,  45),
	xml.text(q4, "q4", 18, 135),
	xml.text(r1, "r1", 18, 180),
	xml.text(r2, "r2", 18, 180),
]

const diagonal = [
	xml.line(q1, r2),
]

const groups = [
	xml.g({ stroke:"#08f", "stroke-width":5 }, heptagon),
	xml.g({ stroke:"#0a6", "stroke-width":5 }, up),
	xml.g({ stroke:"#888", "stroke-width":1, fill:"none" }, orto),
	xml.g({ "font-family":"Verdana", "font-size":16, stroke:"none", fill:"#888", "dominant-baseline":"middle", "text-anchor":"middle" }, texts),
	xml.g({ stroke:"#f80", "stroke-width":5 }, diagonal),
]

xml.svg(S, S, [
	xml.g({ 
		transform:`translate(${S/2},${S/2}) scale(1 1)` 
	}, groups)
]).save("automatic/heptagon_construction_js.svg")


