export const animate = (points, positions, pos, size, factor, setPos = false) => {
    let i = 0
    let [ x0, y0 ] = pos
    points.forEach(point => {
        point.setSize(size)
        let index = i
        if (i >= positions.length - 1){
            index = i * 2 % positions.length
            point.setExtra()
        }else{
            point.setNormal()
        }
        let target = positions[index]
        let x = target[0]*factor + x0
        let y =  target[1]*factor + y0
        if (setPos){
            point.setPosition([x,y])
            point.updateTarget([x,y])
            
        }else{
            point.updateTarget([x,y])
        }
        i++
    })
}