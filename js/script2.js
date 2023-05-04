import "../css/station.css"
import "../css/style2.css"
import * as THREE from "three";
// import ThreeGlobe from "three-globe";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"

import map from "/free/earth.jpg"

let globe

const locations1 = {
    "locations": [
        {
            "country": "Somalia",
            "city": "Afmadow"
        },
        {
            "country": "India",
            "city": "New Town"
        },
        {
            "country": "India",
            "city": "Sonegaon"
        },
        {
            "country": "India",
            "city": "Chennai"
        },
        {
            "country": "India",
            "city": "Noida"
        },
        {
            "country": "India",
            "city": "Nava Raipur"
        },
        {
            "country": "India",
            "city": "Penha de França"
        },
        {
            "country": "United States",
            "city": "West Virginia"
        },
        {
            "country": "United States",
            "city": "Nevada"
        },
        {
            "country": "United States",
            "city": "Albuquerque"
        },
        {
            "country": "Australia",
            "city": "Adelaide"
        },
        {
            "country": "Australia",
            "city": "Northern Territory"
        },
        {
            "country": "Japan",
            "city": "Nagano"
        },
        {
            "country": "Japan",
            "city": "Nagano"
        },
        {
            "country": "Nepal",
            "city": "Pokhara"
        },
        {
            "country": "Nepal",
            "city": "Kathmandu"
        }
    ]
}

const coordinates1 = {
    "chargingZones": [
        {
            "coordinates": [
                1.121496,
                41.150258
            ]
        },
        {
            "coordinates": [
                22.5796534,
                88.459843
            ]
        },
        {
            "coordinates": [
                21.0868801,
                79.0635586
            ]
        },
        {
            "coordinates": [
                12.9959222,
                80.2102867
            ]
        },
        {
            "coordinates": [
                28.611892,
                77.3762261
            ]
        },
        {
            "coordinates": [
                15.510800,
                73.836800
            ]
        },
        {
            "coordinates": [
                15.510800,
                73.836800
            ]
        },
        {
            "coordinates": [
                38.90435361056969,
                -79.26589386230779
            ]
        },
        {
            "coordinates": [
                40.722345687349005,
                -116.10686770807915
            ]
        },
        {
            "coordinates": [
                35.03357766526502,
                -106.95257677869758
            ]
        },
        {
            "coordinates": [
                -23.713931924813064,
                133.87663081736218
            ]
        },
        {
            "coordinates": [
                -23.699571156681056,
                133.89305166648197
            ]
        },
        {
            "coordinates": [
                36.23553280364579,
                138.21102906406907
            ]
        },
        {
            "coordinates": [
                36.263092993927735,
                138.47222090443938
            ]
        },
        {
            "coordinates": [
                28.239081777470005,
                83.94797350601327
            ]
        },
        {
            "coordinates": [
                27.720236839588697,
                85.33867250776514
            ]
        }
    ]
}



let lat, lng;
const container = document.querySelector(".stations")
init();
initGlobe();

var orbit, renderer, scene, camera;

function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.offsetWidth, 650);
    container.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    ambientLight.position.set(-800, 2000, 400)
    scene.add(ambientLight);
    scene.background = new THREE.Color(0x040d21)

    camera = new THREE.PerspectiveCamera();
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    const dLight = new THREE.DirectionalLight(0xffffff, 1);
    dLight.position.set(-800, 2000, 400)
    camera.add(dLight);

    // const dLight1 = new THREE.DirectionalLight(0x7982f6,1);
    // dLight1.position.set(-200,500,200)
    // camera.add(dLight1);

    // const dLight2 = new THREE.PointLight(0x8566cc,0.5);
    // dLight2.position.set(-200,500,200);
    // camera.add(dLight2);

    // const globe= new ThreeGlobe()

    // const renderPass = new RenderPass(scene,camera);
    // const bloomPass = new UnrealBloomPass(
    //     new THREE.Vector2(window.innerWidth,window.innerHeight),
    //     1.5,
    //     0.4,
    //     0.85
    // );
    // bloomPass.threshold = 0;
    // bloomPass.strength = 3;
    // bloomPass.radius = 0;

    // const bloomComposer = new EffectComposer(renderer);
    // bloomComposer.setSize(window.innerWidth,window.innerHeight);
    // bloomComposer.renderToScreen = true;
    // bloomComposer.addPass(renderPass)
    // bloomComposer.addPass(bloomPass);

    camera.position.z = 400;
    camera.position.x = 0;
    camera.position.y = 0;

    scene.add(camera);

    scene.fog = new THREE.Fog(0x535ef3, 400, 2000);

    orbit = new OrbitControls(camera, renderer.domElement);
    orbit.enableDamping = true;
    orbit.dampingFactor = 0.01;
    orbit.enablePan = false;
    orbit.minDistance = 200;
    orbit.maxDistance = 500;
    orbit.rotateSpeed = 0.8;
    orbit.zoomSpeed = 1;
    orbit.enableZoom = false;
    orbit.autoRotate = false;

    orbit.minPolarAngle = Math.PI / 3.5;
    orbit.maxPolarAngle = Math.PI - Math.PI / 3;

    // orbit.update();
    // window.addEventListener("resize",onWindowResize,false);

}

function LatLngtoCartesian(lat, lng) {
    let phi = (90 - lat) * Math.PI / 180;
    let theta = (180 + lng) * Math.PI / 180;

    let x = 100 * (-(Math.sin(phi) * Math.cos(theta)))
    let z = 100 * (Math.sin(phi) * Math.sin(theta))
    let y = 100 * (Math.cos(phi))

    return {
        x, y, z
    }
}

// function getCurve(p1,p2)
// {
//     let v1 = new THREE.Vector3(p1.x,p1.y,p1.z)
//     let v2 = new THREE.Vector3(p2.x,p2.y,p2.z)
//     let points = []
//     for(let i=0;i<=20;i++)
//     {
//         let p = new THREE.Vector3().lerpVectors(v1,v2,i/20)
//         p.normalize();
//         p.multiplyScalar(100 + 20*Math.sin(Math.PI*i/20));
//         points.push(p);
//     }

//     let path = new THREE.CatmullRomCurve3(points)

//     const geometry = new THREE.TubeGeometry(path, 20,0.5,8,false);
//     const material = new THREE.MeshBasicMaterial({color: 0x0000ff});
//     const mesh = new THREE.Mesh(geometry,material);
//     scene.add(mesh);
// }
function initGlobe() {
    const globeG = new THREE.SphereGeometry(100, 30, 30);
    const globeM = new THREE.MeshStandardMaterial({
        // color: 0x0000ff,
        map: new THREE.TextureLoader().load(map)
    })
    globe = new THREE.Mesh(globeG, globeM);
    scene.add(globe);

    for (let i = 0; i < 15; i++) {
        const line1 = new THREE.Mesh(
            new THREE.SphereGeometry(3, 20, 20),
            new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
        )

        // console.log(coordinates1.chargingZones)
        let pos1 = LatLngtoCartesian(coordinates1.chargingZones[i].coordinates[0], coordinates1.chargingZones[i].coordinates[1]);
        line1.position.set(pos1.x, pos1.y, pos1.z);
        scene.add(line1);
    }

    // const line1 = new THREE.Mesh(
    //     new THREE.SphereGeometry(3,20,20),
    //     new THREE.MeshBasicMaterial({color: 0x00ff00}),
    // )

    let point2 = {
        lat: 19.0760,
        lng: 72.8777
    }




    // getCurve(pos,pos1)
}

function animate() {
    // globe.rotation.y += 0.03
    orbit.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate)
}

const table = document.querySelector(".tableBody");

for (let i = 0; i < 16; i++) {
    table.innerHTML +=
        `<tr>
            <td>${i + 1}</td>
            <td>${locations1.locations[i].country}</td>
            <td>${locations1.locations[i].city}</td>
            <td>${coordinates1.chargingZones[i].coordinates[0]}</td>
            <td>${coordinates1.chargingZones[i].coordinates[1]}</td>
        </tr>`
}

animate();