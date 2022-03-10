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

export const get_unit_vector = (vec) => {
    let l = Math.sqrt(vec[0]**2 + vec[1]**2)             //length of vec
    if (l < 0.001){
        //if direction vector is 0 => we end up with NaN-values
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