import {
    vector_add,
    random_n,
    addNoise,
    get_unit_vector,
    get_free_direction_vector,
    get_noised_unit_direction_vector,
    checkForBounces
} from './vector_math.js'

const gravity = 0.5
const CLOSE_D = 0.05

const gravity_r = 0.01
const gravity_n = 20




const calculateGravityForceValue = (distance, mode) => {
    if (mode == 'reverse'){
        return gravity_r * Math.sqrt(distance)
    } else if ( mode == 'exp'){
        return (gravity_r * Math.sqrt(distance) + gravity_n / distance**2 ) * 3
    } else if (mode == 'linear'){
        let f =  Math.min(gravity_n /  distance, 50)
        return f
    }else return gravity_n
}

const calculateGravityForceVector = (point, mode) => {
    // Calculates the gravity to the target point of given point. returns the gravity vector
    let target_point = point.target
    let g_dir_vec = [target_point[0] - point.x, target_point[1]-point.y]
    let g_u_vec = get_unit_vector(g_dir_vec)
    let d = Math.sqrt((point.x - target_point[0])**2 + (point.y - target_point[1])**2)

    //let g_force = gravity*Math.sqrt(d)
    let g_force = calculateGravityForceValue(d, mode)
    let g_vec = [g_u_vec[0]*g_force, g_u_vec[1]*g_force]
    return g_vec
}




class Point { 
    constructor(id, x, y, velocity, direction, size, color){
        this.id = id
        this.x = x
        this.y = y
        this.velocity = velocity
        this.direction = direction
        this.size = size
        this.color = color
        this.stopFunction = () => {return false}
        this.target = [0,0]
        this.useTargetGravity = false
        this.trail = []
        this.forceVector = [0,0]
        this.stop = false
        this.iter = 0
        this.active = true
    }   
    activate(){
        this.active = true
        this.stop = false
    }
    activateTargetGravity(){
        this.useTargetGravity = true
    }
    deactivateTargetGravity(){
        this.useTargetGravity = false
    }
    slowVelocity(){
        this.velocity = this.velocity * 0.95
    }

    draw(ctx) {
        ctx.fillStyle = this.color
        ctx.strokeStyle= this.color
        ctx.fillRect(this.x, this.y, this.size, this.size)
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        this.trail.forEach(pos => {
            ctx.lineTo(pos[0], pos[1])
        })
        ctx.stroke()
    }

    updateStopFunction(new_stop_function){
        this.activate()
        this.stopFunction = new_stop_function
    } 

    updateForce(new_force_vector){
        this.activate()
        this.forceVector = new_force_vector
    }

    updateGravityToTarget(){
        let newForceVector = calculateGravityForceVector(this, 'reverse')
        this.updateForce(newForceVector)
    }

    updateTarget(new_target){
        this.activate()
        this.target = new_target
    }

    fadeTrail(){
        if (this.trail.length > 0){
            this.trail.pop()
        }
    }
    updateTrail(){
        this.trail.unshift([this.x, this.y])
        if (this.trail.length > 3){
            this.trail.pop()
        }

    }


    updatePosition(width, height){
        //Calculate the new direction vector for the point
        if (this.stop){
            this.fadeTrail()
            return
        }

        let d_vec = get_free_direction_vector(this)
        let vec = vector_add(d_vec, this.forceVector)
        let dx = checkForBounces(this.x, vec[0], 0, width)
        let dy = checkForBounces(this.y, vec[1], 0, height)

        vec = [dx, dy]
        let x = this.x + vec[0]
        let y = this.y + vec[1]

        //update trail
        this.updateTrail()

        //Assign new values
        this.x = x
        this.y = y
        this.direction = get_unit_vector(vec)
        this.velocity = Math.sqrt(vec[0]**2 + vec[1]**2)
    }

    testStopFunction(){
        if (this.stopFunction(this)){
            this.stop = true
        }
    } 
    
    isAnimationPlaying(){
        if (this.stop && this.trail.length === 0){
            this.active = false
            return false
        } else return true
    }

    update(width, height) {
        if (this.active){
            if (this.useTargetGravity){
                this.updateGravityToTarget()
                this.slowVelocity()
            }
            this.updatePosition(width, height)
            this.testStopFunction()
            return this.isAnimationPlaying()
        }
        return false
    }
}

export default Point