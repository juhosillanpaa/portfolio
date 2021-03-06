export const random_n = () => {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    num = num / 10.0; 
    if (num > 0.5 || num < -0.5) return random_n() // resample between 0 and 1
    return num
}

export const vector_add = (a,b) => {
    let c = []
    for (let i = 0; i < a.length; i++){
        c.push(a[i] + b[i])
    }
    return c
}


export const addNoise = (val, count = 0) => {
    if (count > 0){
        console.log('count: ', count)
    }
    let n = random_n() / 10
    let num = val + n

    if (num > 1 || num < -1){
        let i = count++
        return addNoise(val, i)
    }
    return num
}


export const multiply = (a, b) => {
    //multiply vector a with scalar b
    return a.map(item => (item * b))
}
export const vector_multiply = (a, b) => {
    //multiply vector a with scalar b
    let i = ( a[0] * b[0] )
    let j = ( a[1] * b[1] )
    return [ i, j ]
}

export const distance = (a,b) => {
    // calculate distance between points a and b
    // If only 1 argument is given, calculates the distance of that vector
    let vec = [b[0] - a[0], b[1] - a[1]]
    return Math.sqrt(vec[0]**2 + vec[1]**2)
}
export const length = (a) => {
    //calculates the length of given vec
    return Math.sqrt(a[0]**2 + a[1]**2)
}


export const get_unit_vector = (vec) => {
    let l = Math.sqrt(vec[0]**2 + vec[1]**2)             //length of vec
    if (l < 0.001){
        //if length is close to zero, this can lead to NaN
        return [0,0]
    }
    let u_vec = [ vec[0]/l, vec[1]/l]              //unit vector
    return u_vec
}



export const get_noised_unit_direction_vector = (p) => {
    let noised_d_vec = [addNoise(p.direction[0]), addNoise(p.direction[1])]
    let d_vec = get_unit_vector(noised_d_vec)
    return d_vec
}

export const get_free_direction_vector = (p) => {
    let d_vec = get_noised_unit_direction_vector(p)
    d_vec = [p.velocity*d_vec[0], p.velocity*d_vec[1]]
    return d_vec
}


const bounceMultiplier = 0.6

export const checkForBounces = (pos, distance, min, max) => {
    let x0 = pos
    let x1 = pos + distance
    if (x1 > max){
        let x_to_max = max - x0             //distance from current pos to max
        let x_overflow = x1 - max           //distance of overflow => bounce back
        let dx = x_to_max - x_overflow *bounceMultiplier     // final dx
        return dx
    }else if (x1 < min){
        let x_to_min = pos - min            //distance from current position to min
        let x_overflow = min - x1           //distance of overflow => bounce back
        let dx = - x_to_min + x_overflow * bounceMultiplier    //final dx
        return dx
    }
    else{
        return distance
    }
}


