const TEST = false

export const getTextPositions = (elementID, text, fontsize) => {
    const W = text.length * 25
    const H = 50
    const mid = W / 2
    let canvas = document.getElementById(elementID)
    const ctx = canvas.getContext('2d')
    ctx.fillstyle = 'black'
    ctx.font = `${fontsize}px Verdana`
    ctx.clearRect(0,0,W,H)
    ctx.textAlign = 'center'
    ctx.fillText(text, mid, 30)
    const imageData = ctx.getImageData(0,0,W,H)
    let positions = []
    let xn = W
    let yn = H
    for (let y = 0; y < yn; y++){
        for (let x = 0; x < xn; x++){
            let i = (y*xn + x) * 4
            let a = imageData.data[i + 3]
            if (a > 90 ){  
                positions.push([x - mid,y])     
            }
            if (TEST && (y == 0 || y == yn-1 || x == 0 || x == xn-1) ){
                positions.push([x - mid,y]) 
            }

        }
    }
    return positions
}

