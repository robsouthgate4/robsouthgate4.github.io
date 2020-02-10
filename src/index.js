import 'three/examples/js/loaders/LoaderSupport'
import 'three/examples/js/loaders/OBJLoader2'
import hexagonObj from './models/hexagon/hexagon.obj'
import translucentPBR from './materials/translucentPBR'
import translucentPhong from './materials/translucentPhong'
import Webgl from './Webgl'

import plexusVideo from './assets/videos/lab/compressedx2/plexus.mp4';
import sunVideo from './assets/videos/lab/compressedx2/sun3.mp4';
import bubbleVideo from './assets/videos/lab/compressedx2/bubble.mp4';

import hamiltonVideo from './assets/videos/portfolio/compressedx2/hamilton.mp4';
import fangioVideo from './assets/videos/portfolio/compressedx2/fangio.mp4';
import caracciolaVideo from './assets/videos/portfolio/compressedx2/caracciola.mp4';
import hazardVideo from './assets/videos/portfolio/compressedx2/hazard.mp4';
import tomorrowLandVideo from './assets/videos/portfolio/compressedx2/tomorrowland.mp4';


import './styles.css'

import profileIcon from './assets/images/cv/mini-profile.png';
import { Linear } from 'gsap'

var cvimg = document.querySelector('.cv-profile');
cvimg.src = profileIcon;


const name = document.querySelector( '.site .name' );
const title = document.querySelector( '.site .name .title' );

const Stats = require('stats.js')
// const stats = new Stats()
//stats.showPanel( 0 ) // 0: fps, 1: ms, 2: mb, 3+: custom

const container = document.querySelector('.webgl-hero')
const webgl = new Webgl(container.clientWidth, container.clientHeight)
webgl.dom.style.width = window.innerWidth
webgl.dom.style.height = window.innerHeight
container.appendChild(webgl.dom)

//document.body.appendChild( stats.dom )

var now,delta,then = Date.now()
var interval = 1000/60

const animate = (time) => {
    requestAnimationFrame (animate)
    now = Date.now()
    delta = now - then
    //update time dependent animations here at 30 fps
    if (delta > interval) {        
        webgl.update(time)
        then = now - (delta % interval)    }
}


const loader = new THREE.OBJLoader2()
let mesh

function onResize() {
    webgl.resize(window.innerWidth, window.innerHeight)
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
        name: "WebGL Bubble",
        tech: "WebGL",
        languages: "Javascript / GLSL Shaders / PostProcessing",
        videoSrc: bubbleVideo,
        filter: false
    },
    {
        name: "Plexus statue",
        tech: "WebGL, Houdini",
        languages: "Javascript / GLSL Shaders / PostProcessing",
        videoSrc: plexusVideo,
        filter: false
    },
    {
        name: "Sun",
        tech: "WebGL / GPGPU / Particles",
        languages: "Javascript / GLSL Shaders / PostProcessing",
        videoSrc: sunVideo,
        filter: false
    }

];

const projects = [

    {
        name: "Mercedes Roar Hamilton",
        tech: "Instagram / Facebook",
        languages: "Javascript / GLSL Shaders / PostProcessing",
        videoSrc: hamiltonVideo,
        filter: true,
    },
    {
        name: "Mercedes Roar Fangio",
        tech: "Instagram / Facebook",
        languages: "Javascript / GLSL Shaders / PostProcessing",
        videoSrc: fangioVideo,
        filter: true
    },
    {
        name: "Mercedes Roar Caracciola",
        tech: "Instagram / Facebook",
        languages: "Javascript / GLSL Shaders / PostProcessing",
        videoSrc: caracciolaVideo,
        filter: true
    },{
        name: "Fifa ultimate team 2020",
        tech: "Instagram / Facebook",
        languages: "Javascript / GLSL Shaders / PostProcessing / Houdini",
        videoSrc: hazardVideo,
        filter: true,
    },{
        name: "Tomorrowland 2019",
        tech: "Instagram / Facebook",
        languages: "Javascript / GLSL Shaders",
        videoSrc: tomorrowLandVideo,
        filter: true,
    }
    
];


// Generate HTML

const lab = document.createElement( 'ul' );
lab.className = "lab content"

const portfolio = document.createElement( 'ul' );
portfolio.className = "portfolio content"



document.body.appendChild( lab );
document.body.appendChild( portfolio );

function createItem ( project ) {

    const li = document.createElement( 'li' );   
    const title = document.createElement( 'h2' );   

    title.innerText = project.name;
    title.className = "title";    

   const tech = document.createElement( 'p' );
   tech.innerText = project.tech;

   const languages = document.createElement( 'p' );
   languages.innerText = project.languages;

   const video = document.createElement( 'video' );
   video.src = project.videoSrc;
   video.autoplay = false;
   video.loop = true;
   video.controls = false;
   li.append( video );


   const text = document.createElement( 'div' );
   text.classList.add( 'text' );
   text.appendChild(title);

   text.appendChild( tech );

   text.appendChild( languages );

   li.appendChild( text );

   li.addEventListener( 'mouseenter', ()  => {

       video.play();
       
   })

   li.addEventListener( 'touchstart', ()  => {

    video.play();
    
    });

   li.addEventListener( 'mouseleave', ()  => {

       video.pause();
       
   })

    if ( project.filter ) {
       
        li.classList.add( 'mobile-display' );

    } else {

        li.classList.add( 'full-display' );
        
    }
    


    return li;

}


experiments.forEach( ( project ) => {

    lab.appendChild( createItem( project ) );
    
} );

projects.forEach( ( project ) => {

    portfolio.appendChild( createItem( project ) );
    
} );


const mainMenuItems = document.querySelectorAll( '.main-menu li a' );

mainMenuItems.forEach( ( item )  => {

    item.addEventListener( 'click', ( e ) => {

        // lab.classList.remove( 'show' );
        // portfolio.classList.remove( 'show' );

        if ( e.target.id === "lab" ) {
        
            lab.classList.contains( 'show') ? lab.classList.remove( 'show' ) : lab.classList.add( 'show' );

            portfolio.classList.remove( 'show' );
        }

        if ( e.target.id === "portfolio" ) {
        
            portfolio.classList.contains( 'show') ? portfolio.classList.remove( 'show' ) : portfolio.classList.add( 'show' );

            lab.classList.remove( 'show' );

        }
        
    } );

})






window.addEventListener( 'load', (  ) => {

    setTimeout(() => {

        document.body.classList.add( 'show' );

        name.classList.add( 'show' );

    }, 300);

    setTimeout(() => {

        document.querySelector( '.spinner' ).classList.add( 'hide' );

    }, 2000);

    setTimeout(() => {

        title.classList.add( 'show' );

    }, 500);

} );



//portfolio.addEventListener( 'wheel', applyScrollPortfolio );

//lab.addEventListener( 'wheel', applyScrollLab );

const startPosPortfolio = portfolio.offsetTop;
const startPosLab = lab.offsetTop;

function applyScrollPortfolio( event ) {

    scrollDiv( event, portfolio, startPosPortfolio );

}

function applyScrollLab( event ) {

    scrollDiv( event, lab, startPosLab );

}

function scrollDiv( event, el, startPos ) {

    if ( ! event ) event = window.event;

    // normalize the delta

    if ( event.wheelDelta ) {

        // IE and Opera

        delta = event.wheelDelta / 60;

    } else if (event.detail) {

        // W3C

        delta = -event.detail / 2;

    }

    var currPos = el.offsetTop;    

    // calculating the next position of the object

    currPos = parseInt( currPos ) + ( delta * 10 );

    if ( currPos > startPos ) return;

    el.style.top = currPos + 'px'

}