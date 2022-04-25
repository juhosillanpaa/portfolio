const desktop_1024 = [1024, 768]
const desktop_1366 = [1366, 768]
const desktop_large = [1920, 1080]
const dekstop_1440 = [1440, 900]


const imageHeight = 800
const imageWidth = 600

const default_1024 = {
    imageH: 400, imageW: 300, imagePad: 25,			                        //conf for Me slide
    skillBoxH: 150, skillBoxW: 200, skillBoxPad: 25, skillBoxText: 2,		// conf for skills section
    timelineW: 800, timelineH: 250,										// conf for timeline section
    factor: 3
}


export const getConfig = (width) => {
    let temp = {...default_1024}
    if (width > 1300){
        temp = {...temp,
            skillBoxH:200, skillBoxW:250, skillBoxPad: 50,
            timelineW: 1000, 
        }
    }

    if (width >= dekstop_1440[0]){
        temp = {
            ...temp,
            imageH: 500, imageW: 375, imagePad: 25,
            skillBoxH: 200, skillBoxW: 250, skillBoxPad: 50,
            timelineH: 250, timelineW: 1200,
            factor: 3
        }
    }


    if (width >= desktop_large[0]){
        temp = {...temp, imageH: 700, imageW: 525, imagePad: 75,
            timelineH:400, timelineW: 1400,
            factor: 4
        }
    }
    
    return temp

}