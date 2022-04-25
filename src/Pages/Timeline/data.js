export const data = [
    {
        text: 'Portfolio', x: 100, height: 75, pad: 0, dir: 'up',
        time: '2022 Spring', description: "I made this portfolio to impress you. I have wanted to tinker with pixel animations for a while \
        and this was the perfect opportunity to do so. I also wanted to stand out from the crowd and do something different when it comes to \
        CV's and job applications.\n \
        This page is made with React. The pixel animations are done with requestAnimationFrame and Canvas and the chart above is made with SVG.\
        ",
        github: 'https://github.com/juhosillanpaa/portfolio', github_text: 'Portfolio'
    },{
        text: 'Dungeon game', x: 250, height: 75, pad: 0, time: '2021 Fall', dir: 'up',
        description: "I quitted my job at Innocode Oy and decided to focus on my studies and figure out what direction to take in my master's studies. \
        During the fall I still wanted to code something and decided to start tinkering with procedural map generation algorithms. \
        I went with simple dungeon game where the world is procedurally generated as the user roams in it. I also \
        created some enemies and let the user shoot them, which involved figuring out interesting shooter game-related mathematics.",
        github: 'https://github.com/juhosillanpaa/dungeon_game', github_text: 'Dungeon game'
    },{
        text: 'Portfolio', x: 615, height: 75, pad: 0, dir: 'up',
        time: '2019 Fall', description: "My last portfolio website that I created after I took some courses about web development. \
        The page itself is pretty awful, but it did its job helping me secure interviews and a job.",
        github: 'https://github.com/juhosillanpaa/Portfolio-website', github_text: 'Portfolio-website',
        link: 'https://bit.ly/juhosillanpaa_old', link_text: 'My old portfolio'
    },{
        text: 'React project', x: 700, height: 50, pad: 0, dir: 'up',
        time: '2019 Fall', description: "After the FullStack course I wanted to try building something myself. My goal was to create \
        Tinder-like app, but where you can find new friends. I believe that there are a lot of people who, for example, are \
        starting new hobby, but have no friends who are interested in it, and therefore they could use app like this for finding new buddies. \
        The project never got finished because I started working at Innocode Oy and had no more time to work with it. However, it was nice \
        learning experience."
    },{
        text: 'MOOC: Fullstack', x: 770, height: 125, pad: 0, dir: 'up',
        time: '2019 Spring', description: "I took the Fullstack course from MOOC. \
        The course sparked my interest towards web development.",
        link: 'https://fullstackopen.com/', link_text: 'https://fullstackopen.com',
        github: 'https://github.com/juhosillanpaa/FullStack-MOOC', github_text:'Fullstack-MOOC'
    },{
        text: 'Tower defence', x: 1150, height: 75, pad: 0, time: '2017 Spring', dir: 'up',
        description: "My first programming project! I made a tower defence game as part of one of my first Python programming courses. \
        Since I started my studies I have been somewhat obsessed with programming. In a way it has lead to some difficulties \
        along the road, as I used to select next year programming courses to my calendar, instead of the more boring basic studies.\
        And as the saying goes: what goes around, comes around, which I learned the hard way.",
        github: 'https://github.com/juhosillanpaa/Tower-Defence-game', github_text: 'Tower-Defence-game'
    },{
        text: 'Innocode Oy', x1: 600, x2: 250, dir:'down', time: '2020 Spring - 2021 Fall', height: 75,
        description: "I worked in Innocode Oy for one and half years. I worked mainly with their predictive maintenance system \
        and I was the only Frontend developer in that project. It was a great learning experience and shaped my attitude towards programming. \
        When facing a new problem that I don not know how to solve, I will google it, copypaste someone's shitty solution that does not work in real life, \
        tinker with it, learn something from it and finally do it better myself. In the project we often needed to plot custom graphs for complex data \
        and that was how I learned to work with tools like D3.js, canvas, SVG and WebGL. I also got a lot of experience about organizing and structuring information \
        in an organized manner."
    },{
        text: 'Jysk Oy', x1: 895, x2: 700, dir:'down', time: '2018 Summer - 2019 Fall', height: 75,
        description: 'I worked in Jysk Oy as part time employer along with school.'
    },{
        text: 'Military service', x1: 1100, x2: 905, dir:'down', time: '2017 Summer - 2018 Summer', height: 75,
        description: 'I served one year in military and went through Reserve officer training.'
    },{
        text: 'Jysk Oy', x1: 1351, x2: 1110, dir: 'down', time: '2015 Fall - 2017 Summer', height: 75,
        description: 'I worked in Jysk Oy as part time employer along with school.'
    }

]

export const timeline = [
    {text: '', x: 100},
    {text: '2022', x: 200, },
    {text: '2021', x: 400, },
    {text: '2020', x: 600, },
    {text: '2019', x: 800, },
    {text: '2018', x: 1000,},
    {text: '2017', x: 1200, },
    {text: '', x: 1300}
]