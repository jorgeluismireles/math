const $ = (i,t)=> { document.getElementById(i).innerHTML = t }
const dt = (id, d, t)=> {
    if (d) document.getElementById(id).setAttribute("d", d);
    if (t) document.getElementById(id).setAttribute("transform", t)     
}

const rod = (R, n, skip, extremes)=> {
    const r = R/2
    const L = 2 * n * r
    const d  = [ 
        "m", -r, 0,
        "a", r, r, 0, 0, 1, +2*r, 0, "l", 0, +L,
        "a", r, r, 0, 0, 1, -2*r, 0, "l", 0, -L,
        "z", "m", r/2, -2*r
    ]   
    for (let i=0; i <= n; i++) { // holes
        d.push(...["m", 0, 2*r])
        if (extremes) {
            if (i==0 || i == n) {
            d.push(...["a", r/2, r/2, 0, 0, 0, r, 0, r/2, r/2, 0, 0, 0, -r, 0])
            }
        } else {
        if (skip && (i % 2 == 1))
            continue
        d.push(...["a", r/2, r/2, 0, 0, 0, r, 0, r/2, r/2, 0, 0, 0, -r, 0])
      }
    }
    return d.join(" ")
}

const pp = (i,a) => a.map(m => `<path id="${i}${m}"></path>`).join("")


