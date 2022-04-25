import {
    get_unit_vector,
} from './vector_math.js'

import {
    multiply, add, subtract, sqrt, pow, norm,sin,max
} from 'mathjs'
import * as PIXI from 'pixi.js'
//import bezier from 'bezier-easing'

import bezier from 'bezier-easing'

const WHITE_HEX = '0xffffff'
const G = 800               // gravity constant
const R_mot = 0.15         //motion_resistance
const MAX_V = 1000
const MIN_V = 10

const SLOW = 1
const FAST = 2

const slow_coef = [500, 30]
const fast_coef = [1500, 30]


const stopFunction = (p) => {
    return norm(subtract(p.pos, p.target)) < p.size ? true: false
}

const bezier_out_cubic = bezier(0.33, 1, 0.68, 1)


const calculate_v_sin = ( l, l_total, mode ) => {
    if (l_total < 0.01 ){ return 1}
    let x = l / l_total
    let y = bezier_out_cubic(x)
    let [a , b] = mode === SLOW ? slow_coef : fast_coef
    let v = y * a + b
    return v > a ? a : v
}

class PixiPoint { 
    constructor(id, size){
        this.id = id
        this.pos = [0,0]
        this.stopFunction = stopFunction
        this.target = [0,0]
        this.stop = false
        this.active = true
        this.extra = false
        this.size = size
        
        let sprite = new PIXI.Sprite(PIXI.Texture.WHITE)
        sprite.width = size
        sprite.height = size
        sprite.tint = WHITE_HEX
        this.sprite = sprite
        this.mass = 0.75
        this.v = [0,0]
        this.a = [0,0]
        this.d_total = 0
      
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

    setPosition(pos){
        this.pos = pos
    }

    setSize(size){
        this.size = size
        this.sprite.width = size
        this.sprite.height = size
    }

    updateTarget(new_target){
        this.activate()
        this.target = new_target
        this.d_total= norm(subtract( new_target, this.pos,))
    }

    updateSprite(){
        this.sprite.x = this.pos[0]
        this.sprite.y = this.pos[1]
    }
    updateRect(){
        this.rect.position.x = this.pos[0]
        this.rect.position.y = this.pos[1]
    }

    /*updateWithGravity(t){
        //calculate the location after travelling delta time
        // dx = vt + 0.5*at^2
        let dist = add( multiply(this.v, t), multiply(this.a, 0.5*pow(t,2)) )  
        this.pos = add(this.pos, dist)

        // calculate end velocity and take "motion resistance" into account (or points will never find targets)
        // v = v0 + at
        this.v = add(this.v, multiply(this.a, t))
        this.v = multiply(this.v, 1 - R_mot)

        //Calculate forces and accelerations
        // F = X * m/r^2       , where X is constant and m is the mass of item
        // here we use reverse  => r^2 => 1 / sqrt(r)
        let vec = subtract(this.target, this.pos)
        this.a = multiply(get_unit_vector(vec), G * this.mass * sqrt( norm(vec) ) )
    }*/

    updateSine(t, mode){
        let vec = subtract( this.target, this.pos )
        let u_vec = get_unit_vector(vec)
        let d = norm(vec)
  
        let v_sin = calculate_v_sin(d, this.d_total, mode)
        if (v_sin*t > d){
            this.pos = this.target
        }else{
            let v = multiply(u_vec, v_sin * t )
            this.pos = add(this.pos, v)
        }
    
        
    }

    
    testStopFunction(){
        if (this.stopFunction(this)){
            this.stop = true
            this.setPosition(this.target)
            this.d_total = 0
        }
    } 
    shift(dist){
        this.pos = add(this.pos, dist)
    }

    update(delta, mode){
        if (!this.stop){
            this.updateSine(delta, mode)
            this.testStopFunction()
            this.updateSprite()
        }
    }
}

export default PixiPoint