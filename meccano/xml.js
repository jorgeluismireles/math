const fs = require('fs')

module.exports = function()
{
	const polarToCartesian = (c, r, degrees)=> {
	  	const rad = (degrees-90) * Math.PI / 180.0
	  	return {
	    	x: c.x + (r * Math.cos(rad)),
	    	y: c.y + (r * Math.sin(rad))
	  	}
	}

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
	this.line = (p1, p2)=> {
		return xml("line", { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y })
	}

	this.text = (c, text, R, A)=> {
		const r = R || 0
		const a = A || 0
		return xml("text", polarToCartesian(c, r, a), text)
	}

	this.pathArc = (c, r, startAngle, angle) => {
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

	this.g = (style, members)=> {
		return xml("g", style, members)
	}

	this.svg = (width, height, members)=> {
		const svg = xml("svg", { 
			xmlns:"http://www.w3.org/2000/svg",
			width: width,
			height: width
		}, members) 
		return {
			save: (filename)=> {
				fs.writeFile(filename, svg.join("\n"), function (err) {
				    if (err)
				        return console.log(err);
				    console.log(`saved: ${filename}`)
				})
			}
		}
	}
}
