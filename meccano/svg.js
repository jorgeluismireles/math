const SVG = function()
{
	const SVG = 'http://www.w3.org/2000/svg'

	const create = (elem)=> {
		return document.createElementNS(SVG, elem);
	}

	this.svg = (width, height, obj)=> {
	    var svg = create('svg')
		svg.setAttribute("xmlns", "http://www.w3.org/2000/svg")
		svg.setAttribute("width", width)
		svg.setAttribute("height", height)
	    for (prop in obj)
	        svg.setAttribute(prop, obj[prop])  
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
}

