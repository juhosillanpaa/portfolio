import {
    vector_add,
    distance,
    get_unit_vector,
    get_free_direction_vector,
    checkForBounces
} from './vector_math.js'

const gravity = 0.5
const CLOSE_D = 0.05

const gravity_r = 0.02
const gravity_n = 20

const BLUE = 'rgb(79,134,139)'
const WHITE = 'rgb(255,255,255)'
const W_STROKE = 'rgba(255,255,255,0.5)'

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
        this.orbitting = false
        this.orbitPoint = [0,0]
        this.orbitAngle = 0
        this.orbitR = 0
        this.connected = []
        this.maxY = 0
        this.pixelTrail = []
        this.trailLength = 3
        this.extra = false
    }
    setDirection(dir){
        this.direction = dir
    }
    setExtra(){
        this.extra = true
    }
    setNormal(){
        this.extra = false
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
    setTrailLength(length){
        this.trailLength = length
    }
    startOrbitting(point, angle, radius){
        this.orbitting = true
        this.orbitPoint = point
        this.orbitAngle = angle
        this.orbitR = radius
    }
    stopOrbitting(){
        this.orbitting = false
    }
    setVelocity(velocity){
        this.velocity = velocity
    }
    setPosition(x,y){
        this.x = x
        this.y = y
    }
    setYMax(yMax){
        this.yMax = yMax
    }
    setColor(color){
        this.color = color
    }
    setSize(size){
        this.size = size
    }
    connectTo(connected){
        this.connected = connected
    
    }


    draw(ctx) {
        if (this.extra && this.stop){ 
            return
        }
        let color = this.color
        ctx.fillStyle = color
        ctx.strokeStyle= color
        let x = Math.round(this.x)
        let y = Math.round(this.y)
        ctx.fillRect(x, y, this.size, this.size)
    }

    drawConnection(ctx, point){
        ctx.strokeStyle = W_STROKE
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(point.x, point.y)
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
    /*
    fadeTrail(){
        if (this.trail.length > 0){
            this.trail.pop()
        }
    }
    addToTrail(point){
        this.pixelTrail.unshift(point)
        if (this.pixelTrail.length > this.trailLength){
            this.pixelTrail.pop()
        }

    }
    updateTrail(){
        this.trail.unshift([this.x, this.y])
        if (this.trail.length > this.trailLength){
            this.trail.pop()
        }

    }*/

    updateOrbitPosition(){
        //return
        let d_angle = this.velocity / this.orbitR
        let rad = this.orbitAngle + d_angle      
        this.x = this.orbitPoint[0] + this.orbitR * Math.cos(rad)
        this.y = this.orbitPoint[1] + this.orbitR * Math.sin(rad)
        this.orbitAngle = rad
    }
    get_free_direction_vector(){
        let d_vec = get_free_direction_vector(this)
        return d_vec
    }


    updatePosition(width, height){
        //Calculate the new direction vector for the point
        if (this.stop){
            //this.fadeTrail()
            return
        }
        if (this.orbitting){
            this.updateOrbitPosition()
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
        //this.updateTrail()

        //Assign new values
        this.x = x
        this.y = y
        this.direction = get_unit_vector(vec)
        this.velocity = Math.sqrt(vec[0]**2 + vec[1]**2)
    }

    testStopFunction(){
        if (this.stopFunction(this)){
            this.stop = true
            if (this.useTargetGravity){
                this.x = this.target[0]
                this.y = this.target[1]
            }
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