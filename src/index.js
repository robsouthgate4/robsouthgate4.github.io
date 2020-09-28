import 'three/examples/js/loaders/LoaderSupport'
import 'three/examples/js/loaders/OBJLoader2'
import hexagonObj from './models/hexagon/hexagon.obj'
import translucentPBR from './materials/translucentPBR'
import translucentPhong from './materials/translucentPhong'
import Webgl from './Webgl'

import plexusVideo          from './assets/videos/lab/compressedx2/plexus.mp4';
import sunVideo             from './assets/videos/lab/compressedx2/sun3.mp4';
import bubbleVideo          from './assets/videos/lab/compressedx2/bubble.mp4';
import motionVideo          from './assets/videos/lab/compressedx2/motionFlow2.mp4';
import hamiltonVideo        from './assets/videos/portfolio/compressedx2/hamilton.mp4';
import fangioVideo          from './assets/videos/portfolio/compressedx2/fangio.mp4';
import caracciolaVideo      from './assets/videos/portfolio/compressedx2/caracciola.mp4';
import hazardVideo          from './assets/videos/portfolio/compressedx2/hazard.mp4';
import tomorrowLandVideo    from './assets/videos/portfolio/compressedx2/tomorrowland.mp4';
import fifa21               from './assets/videos/portfolio/compressed/fifa.mp4';
import flocking             from './assets/videos/lab/compressed/swarm.mp4'

import plexusGif            from './assets/videos/lab/gif_small/plexus.gif';
import sunGif               from './assets/videos/lab/gif_small/sun3.gif';
import bubbleGif            from './assets/videos/lab/gif_small/bubble.gif';
import hamiltonGif          from './assets/videos/portfolio/gif_small/hamilton.gif';
import fangioGif            from './assets/videos/portfolio/gif_small/fangio.gif';
import caracciolaGif        from './assets/videos/portfolio/gif_small/caracciola.gif';
import hazardGif            from './assets/videos/portfolio/gif_small/hazard.gif';
import tomorrowLandGif      from './assets/videos/portfolio/gif_small/tomorrowland.gif';


import './styles.css'

import profileIcon from './assets/images/cv/mini-profile.png';
import { Linear } from 'gsap'

var cvimg = document.querySelector('.cv-profile');
cvimg.src = profileIcon;


const name = document.querySelector('.site .name');
const title = document.querySelector('.site .name .title');

const Stats = require('stats.js')
// const stats = new Stats()
//stats.showPanel( 0 ) // 0: fps, 1: ms, 2: mb, 3+: custom

const container = document.querySelector('.webgl-hero')
const webgl = new Webgl(container.clientWidth, container.clientHeight)
webgl.dom.style.width = window.innerWidth
webgl.dom.style.height = window.innerHeight
container.appendChild(webgl.dom)

//document.body.appendChild( stats.dom )

var now, delta, then = Date.now()
var interval = 1000 / 60

const animate = (time) => {
    requestAnimationFrame(animate)
    now = Date.now()
    delta = now - then
    //update time dependent animations here at 30 fps
    if (delta > interval) {
        webgl.update(time)
        then = now - (delta % interval)
    }
}


const loader = new THREE.OBJLoader2()
let mesh;
let mobile = false;

if (window.innerWidth <= 600) {
    mobile = true;
}

function onResize() {
    if (window.innerWidth <= 600) {
        mobile = true;
    }
    webgl.resize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onResize)
window.addEventListener('orientationchange', onResize)



const callbackOnLoad = (event) => {

    const geo = event.detail.loaderRootNode
    webgl.init(geo)

    animate()

};

loader.load(hexagonObj, callbackOnLoad, null, null, null, false)

const experiments = [
    {
        name: "Web flocking",
        tech: "WebGL",
        languages: "Javascript / GLSL Shaders / PostProcessing / GPGPU",
        videoSrc: flocking,
        posterFrame: 4,
        gifSrc: null,
        filter: false
    },
    {
        name: "WebGL Bubble",
        tech: "WebGL",
        languages: "Javascript / GLSL Shaders / PostProcessing",
        videoSrc: bubbleVideo,
        posterFrame: 3,
        gifSrc: bubbleGif,
        filter: false
    },
    {
        name: "Plexus statue",
        tech: "WebGL, Houdini",
        languages: "Javascript / GLSL Shaders / PostProcessing",
        videoSrc: plexusVideo,
        posterFrame: 3,
        gifSrc: plexusGif,
        filter: false
    },
    {
        name: "Sun",
        tech: "WebGL / GPGPU / Particles",
        languages: "Javascript / GLSL Shaders / PostProcessing",
        videoSrc: sunVideo,
        posterFrame: 3,
        gifSrc: sunGif,
        filter: false
    }

];

const projects = [

    {
        name: "EA Sports FIFA 21",
        tech: "Instagram / Facebook",
        languages: "Javascript / GLSL Shaders / PostProcessing / Render passes",
        videoSrc: fifa21,
        posterFrame: 5,
        gifSrc: null,
        filter: true,
    },
    {
        name: "Mercedes Roar Hamilton",
        tech: "Instagram / Facebook",
        languages: "Javascript / GLSL Shaders / PostProcessing",
        videoSrc: hamiltonVideo,
        posterFrame: 3,
        gifSrc: hamiltonGif,
        filter: true,
    },
    {
        name: "Mercedes Roar Fangio",
        tech: "Instagram / Facebook",
        languages: "Javascript / GLSL Shaders / PostProcessing",
        videoSrc: fangioVideo,
        posterFrame: 3,
        gifSrc: fangioGif,
        filter: true
    },
    {
        name: "Mercedes Roar Caracciola",
        tech: "Instagram / Facebook",
        languages: "Javascript / GLSL Shaders / PostProcessing",
        videoSrc: caracciolaVideo,
        posterFrame: 3,
        gifSrc: caracciolaGif,
        filter: true
    }, {
        name: "Fifa ultimate team 2020",
        tech: "Instagram / Facebook",
        languages: "Javascript / GLSL Shaders / PostProcessing / Houdini",
        videoSrc: hazardVideo,
        posterFrame: 3,
        gifSrc: hazardGif,
        filter: true,
    }, {
        name: "Tomorrowland 2019",
        tech: "Instagram / Facebook",
        languages: "Javascript / GLSL Shaders",
        videoSrc: tomorrowLandVideo,
        posterFrame: 3,
        gifSrc: tomorrowLandGif,
        filter: true,
    }

];


// Generate HTML

const lab = document.createElement('ul');
lab.className = "lab content"

const portfolio = document.createElement('ul');
portfolio.className = "portfolio content"



document.body.appendChild(lab);
document.body.appendChild(portfolio);

let currentVideoId;

function createItemVideo( project ) {

    const li = document.createElement('li');
    const title = document.createElement('h2');

    title.innerText = project.name;
    title.className = "title";

    const tech = document.createElement('p');
    tech.innerText = project.tech;

    const languages = document.createElement('p');
    languages.innerText = project.languages;

    const video = document.createElement('video');
    video.id = `video-${project.name}`
    video.src = `${ project.videoSrc }#t=${project.posterFrame || 0}`;
    video.autoplay = false;
    video.loop = true;
    video.controls = false;
    video.currentTime = 0;
    video.muted = true;

    video.setAttribute('webkit-playsinline', 'webkit-playsinline');

    if ( mobile ) {

        requestAnimationFrame(update);

    }

    

    async function playVideo() {
        try {
            await video.play();
        } catch (err) {

        }
    }

    function handlePlay() {

        let videoId = currentVideoId;

        if (video.paused) {
            playVideo();
        } else {
            video.pause();
        }
    }


    function update() {

        const bounding = video.getBoundingClientRect();       

        //if ( mobile ) {
        if (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        ) {

            currentVideoId = video.id;

            console.log( currentVideoId );

            //handlePlay( video );

        } else {

            video.pause();

        }
        // }


        requestAnimationFrame(update);

    }

    document.body.addEventListener('scroll', () => {

        const video = document.getElementById( currentVideoId );
        video.play();

    })





    li.append(video);


    const text = document.createElement('div');
    text.classList.add('text');
    text.appendChild(title);

    text.appendChild(tech);

    text.appendChild(languages);

    li.appendChild(text);

    li.addEventListener('mouseenter', () => {

        video.play();

    })

    li.addEventListener('touchstart', () => {

        //video.play();

    });

    li.addEventListener('mouseleave', () => {

        video.pause();

    })

    if (project.filter) {

        li.classList.add('mobile-display');

    } else {

        li.classList.add('full-display');

    }



    return li;

}

function createItemGif( project ) {

    const li = document.createElement('li');
    const title = document.createElement('h2');

    title.innerText = project.name;
    title.className = "title";

    const tech = document.createElement('p');
    tech.innerText = project.tech;

    const languages = document.createElement('p');
    languages.innerText = project.languages;

    const gif = document.createElement('img');
    gif.id = `gif-${project.name}`
    gif.src = project.gifSrc;

    li.append(gif);


    const text = document.createElement('div');
    text.classList.add('text');
    text.appendChild(title);

    text.appendChild(tech);

    text.appendChild(languages);

    li.appendChild(text);

    if (project.filter) {

        li.classList.add('mobile-display');

    } else {

        li.classList.add('full-display');

    }



    return li;

}


experiments.forEach((project) => {

    if ( getMobileOperatingSystem() != "iOS" ) {

        lab.appendChild(createItemVideo(project));

    } else {

        if ( ! project.gifSrc ) return;

        lab.appendChild(createItemGif(project));

    }

    

});

projects.forEach((project) => {

    console.log( getMobileOperatingSystem() );

    if ( getMobileOperatingSystem() != "iOS" ) {

        portfolio.appendChild(createItemVideo(project));

    } else {

        lab.appendChild(createItemGif(project));

    }
    

});


const mainMenuItems = document.querySelectorAll('.main-menu li a');

mainMenuItems.forEach((item) => {

    item.addEventListener('click', (e) => {

        // lab.classList.remove( 'show' );
        // portfolio.classList.remove( 'show' );

        if (e.target.id === "lab") {

            lab.classList.contains('show') ? lab.classList.remove('show') : lab.classList.add('show');

            portfolio.classList.remove('show');
        }

        if (e.target.id === "portfolio") {

            portfolio.classList.contains('show') ? portfolio.classList.remove('show') : portfolio.classList.add('show');

            lab.classList.remove('show');

        }

    });

})






window.addEventListener('load', () => {

    setTimeout(() => {

        document.body.classList.add('show');

        name.classList.add('show');

    }, 300);

    setTimeout(() => {

        document.querySelector('.spinner').classList.add('hide');

    }, 2000);

    setTimeout(() => {

        title.classList.add('show');

    }, 500);

});



//portfolio.addEventListener( 'wheel', applyScrollPortfolio );

//lab.addEventListener( 'wheel', applyScrollLab );

const startPosPortfolio = portfolio.offsetTop;
const startPosLab = lab.offsetTop;

function applyScrollPortfolio(event) {

    scrollDiv(event, portfolio, startPosPortfolio);

}

function applyScrollLab(event) {

    scrollDiv(event, lab, startPosLab);

}

function scrollDiv(event, el, startPos) {

    if (!event) event = window.event;

    // normalize the delta

    if (event.wheelDelta) {

        // IE and Opera

        delta = event.wheelDelta / 60;

    } else if (event.detail) {

        // W3C

        delta = -event.detail / 2;

    }

    var currPos = el.offsetTop;

    // calculating the next position of the object

    currPos = parseInt(currPos) + (delta * 10);

    if (currPos > startPos) return;

    el.style.top = currPos + 'px'

}


function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
        // Windows Phone must come first because its UA also contains "Android"
      if (/windows phone/i.test(userAgent)) {
          return "Windows Phone";
      }
  
      if (/android/i.test(userAgent)) {
          return "Android";
      }
  
      // iOS detection from: http://stackoverflow.com/a/9039885/177710
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          return "iOS";
      }
  
      return "unknown";
  }