import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

const CONFIG = {

    // ========================================================
    // FLORES INDIVIDUALES
    // ========================================================

    individualFlowers: {

        daisies: 15,
        sunflowers: 20,
        roses: 40

    },


    // ========================================================
    // RAMOS SECUNDARIOS
    // ========================================================

    bouquets: {

        sunflowers: 5,
        roses: 5,
        daisies: 5,
        mixed: 3

    },


    // ========================================================
    // RAMO PRINCIPAL
    // ========================================================

    mainBouquet: {

        roses: 60

    },


    // ========================================================
    // ESTRELLAS
    // ========================================================

    stars: 6500,
    goldStars: 2600,


    // ========================================================
    // MENSAJES
    // ========================================================

    messages: [

        "Nunca estarás sola,\nporque siempre habrá alguien allí para no dejarte caer,\ny esa persona soy yo",

        "Hay personas que hacen\nmás bonitos los días\ny tú eres una de ellas",

        "Me gustas, niña renegona,\ny me gustas mucho",

        "No te mereces una sola flor, te mereces infinitas",

        "Eres la flor más bonita de este universo",

        "Qué bonita coincidencia haberte encontrado en este universo",

        "Por más que pasen los años,\nmi cariño por ti nunca se marchitará al igual que estas flores",

        "Esta flor no se marchita,\nal igual que mis sentimientos por ti",

        "Flores para la chica más hermosa del mundo",

        "No solo los 21 de septiembre se regalan flores",

        "Aquí siempre habrá alguien que te cuide y te proteja,\ny esa persona soy yo",

        "te quiero tanto que no hay palabras\npara describir lo que siento por ti",

        "Te amo 3 millones",

        "Si no es en esta vida, será en la 19°",

        "Te amo en todos los universos",

        "Tu felicidad es primero",

        "Solo quiero que estés bien y ya",

        "No te ofendas, pero te equivocas en creer que estoy jugando\nporque no es cierto, quiero una hermosa historia a tu lado",

        "Amo lo que veo y lo que ocultas",

        "Amo lo que muestras o insinuas",

        "Amo lo que eres o imagino",

        "Te amo en lo ajeno y lo que es mío",

        "Amo lo que entregas, lo que escondes",

        "Amo tus preguntas, tus respuestas",

        "Yo amo tus dudas y certezas",

        "Te amo en lo simple y lo compleja",

        "Amo lo que dices, lo que callas",

        "Amo tus recuerdos, tus olvidos",
 
        "Amo tus olores, tus fragrancias",

        "Te amo en el beso y la distancia",

        "Te amo por amor sin doble filo",

        "Amo lo que seas y lo que puedas",

        "Amo lo que afirmas, lo que niegas",

        "Amo lo que dices, lo que piensas",

        "Te amo en lo que mides y lo que pesas",

        "Amo lo que atrapas, lo que dejas",

        "Amo tu alegría y tus tristeza",

        "Te amo en la carne y en el alma",

        "Te amo en tus crisis y en tus calmas",

        "Amo lo que pides y regalas",

        "Amo tus caricias, tus ofensas",

        "Amo tus instantes y lo eterno",
        
    ]

};

// ============================================================
// ESCENA
// ============================================================

const scene = new THREE.Scene();

scene.background =
    new THREE.Color(0x000000);

scene.fog =
    new THREE.FogExp2(
        0x000000,
        0.0023
    );


const camera =
    new THREE.PerspectiveCamera(
        62,
        innerWidth / innerHeight,
        0.1,
        2500
    );

camera.position.set(
    0,
    2,
    42
);


// ============================================================
// RENDERER
// ============================================================

const renderer =
    new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance"
    });

renderer.setPixelRatio(
    Math.min(
        devicePixelRatio,
        2
    )
);

renderer.setSize(
    innerWidth,
    innerHeight
);

renderer.outputColorSpace =
    THREE.SRGBColorSpace;

renderer.toneMapping =
    THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure =
    0.72;

document
    .getElementById("universe")
    .appendChild(
        renderer.domElement
    );


// ============================================================
// BLOOM
// ============================================================

const composer =
    new EffectComposer(renderer);

composer.addPass(
    new RenderPass(
        scene,
        camera
    )
);

const bloomPass =
    new UnrealBloomPass(
        new THREE.Vector2(
            innerWidth,
            innerHeight
        ),
        0.55,
        0.38,
        0.72
    );

composer.addPass(
    bloomPass
);


// ============================================================
// UNIVERSO
// ============================================================

const universe =
    new THREE.Group();

scene.add(
    universe
);


// ============================================================
// TEXTURA DE PARTÍCULAS
// ============================================================

function createParticleTexture() {

    const canvas =
        document.createElement("canvas");

    canvas.width =
        canvas.height =
        128;

    const ctx =
        canvas.getContext("2d");

    const gradient =
        ctx.createRadialGradient(
            64,
            64,
            0,
            64,
            64,
            64
        );

    gradient.addColorStop(
        0,
        "rgba(255,255,255,1)"
    );

    gradient.addColorStop(
        0.18,
        "rgba(255,245,180,.95)"
    );

    gradient.addColorStop(
        0.5,
        "rgba(255,190,0,.3)"
    );

    gradient.addColorStop(
        1,
        "rgba(255,170,0,0)"
    );

    ctx.fillStyle =
        gradient;

    ctx.fillRect(
        0,
        0,
        128,
        128
    );

    return new THREE.CanvasTexture(
        canvas
    );
}


const particleTexture =
    createParticleTexture();


// ============================================================
// ESTRELLAS
// ============================================================

function createStarField(
    count,
    color,
    size,
    radius
) {

    const geometry =
        new THREE.BufferGeometry();

    const positions =
        new Float32Array(
            count * 3
        );


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const i3 =
            i * 3;

        const r =
            25 +
            Math.random() *
            radius;

        const theta =
            Math.random() *
            Math.PI *
            2;

        const phi =
            Math.acos(
                2 *
                Math.random()
                -
                1
            );


        positions[i3] =
            r *
            Math.sin(phi) *
            Math.cos(theta);

        positions[i3 + 1] =
            r *
            Math.cos(phi);

        positions[i3 + 2] =
            r *
            Math.sin(phi) *
            Math.sin(theta);
    }


    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            positions,
            3
        )
    );


    const material =
        new THREE.PointsMaterial({

            color,

            size,

            map:
                particleTexture,

            transparent:
                true,

            opacity:
                0.85,

            blending:
                THREE.AdditiveBlending,

            depthWrite:
                false
        });


    const points =
        new THREE.Points(
            geometry,
            material
        );


    universe.add(
        points
    );


    return points;
}


const whiteStars =
    createStarField(
        CONFIG.stars,
        0xffffff,
        0.55,
        380
    );


const goldenStars =
    createStarField(
        CONFIG.goldStars,
        0xffc400,
        0.75,
        220
    );


// ============================================================
// AGUJERO NEGRO
// ============================================================

const portal =
    new THREE.Group();

universe.add(
    portal
);


const core =
    new THREE.Mesh(

        new THREE.SphereGeometry(
            4.2,
            72,
            72
        ),

        new THREE.MeshBasicMaterial({
            color:
                0x000000
        })
    );

portal.add(
    core
);


// ============================================================
// ANILLO FOTÓNICO
// ============================================================

const photonRing =
    new THREE.Mesh(

        new THREE.TorusGeometry(
            4.32,
            0.045,
            24,
            220
        ),

        new THREE.MeshBasicMaterial({

            color:
                0xffc84a,

            transparent:
                true,

            opacity:
                0.42,

            depthWrite:
                false
        })
    );

portal.add(
    photonRing
);


// ============================================================
// SHADER DEL DISCO
// ============================================================

const diskVertexShader = `

varying vec2 vUv;

void main() {

    vUv = uv;

    gl_Position =
        projectionMatrix *
        modelViewMatrix *
        vec4(
            position,
            1.0
        );
}

`;


const diskFragmentShader = `

uniform float uTime;

varying vec2 vUv;


float rand(vec2 p) {

    return fract(
        sin(
            dot(
                p,
                vec2(
                    12.9898,
                    78.233
                )
            )
        )
        *
        43758.5453
    );
}


float noise(vec2 p) {

    vec2 i =
        floor(p);

    vec2 f =
        fract(p);

    f =
        f *
        f *
        (
            3.0 -
            2.0 *
            f
        );

    float a =
        rand(i);

    float b =
        rand(
            i +
            vec2(
                1.0,
                0.0
            )
        );

    float c =
        rand(
            i +
            vec2(
                0.0,
                1.0
            )
        );

    float d =
        rand(
            i +
            vec2(
                1.0,
                1.0
            )
        );


    return
        mix(
            a,
            b,
            f.x
        )

        +

        (
            c -
            a
        )
        *
        f.y
        *
        (
            1.0 -
            f.x
        )

        +

        (
            d -
            b
        )
        *
        f.x
        *
        f.y;
}


float fbm(vec2 p) {

    float value =
        0.0;

    float amplitude =
        0.5;


    for (
        int i = 0;
        i < 5;
        i++
    ) {

        value +=
            amplitude *
            noise(p);

        p *=
            2.03;

        amplitude *=
            0.5;
    }


    return value;
}


void main() {

    vec2 p =
        vUv -
        0.5;


    float radius =
        length(p);


    float angle =
        atan(
            p.y,
            p.x
        );


    vec2 flow =
        vec2(

            angle *
            2.2

            -

            uTime *
            0.45,

            radius *
            18.0
        );


    float cloud =
        fbm(flow);


    float fineNoise =
        fbm(
            flow *
            2.5
            +
            uTime *
            0.08
        );


    float innerGlow =
        smoothstep(
            0.48,
            0.10,
            radius
        );


    float outerFade =
        smoothstep(
            0.52,
            0.22,
            radius
        );


    float ringMask =

        smoothstep(
            0.12,
            0.19,
            radius
        )

        *

        smoothstep(
            0.52,
            0.28,
            radius
        );


    float intensity =

        ringMask

        *

        (
            0.45

            +

            cloud *
            1.15

            +

            fineNoise *
            0.3
        );


    vec3 darkGold =
        vec3(
            0.8,
            0.18,
            0.0
        );


    vec3 gold =
        vec3(
            1.0,
            0.60,
            0.01
        );


    vec3 hot =
        vec3(
            1.0,
            0.98,
            0.58
        );


    vec3 color =
        mix(
            darkGold,
            gold,
            cloud
        );


    color =
        mix(
            color,
            hot,
            innerGlow
        );


    color *=

        0.68

        +

        fineNoise *
        0.55;


    float alpha =

        intensity

        *

        outerFade

        *

        0.58;


    gl_FragColor =
        vec4(
            color,
            alpha
        );
}

`;


// ============================================================
// DISCOS
// ============================================================

const diskMaterials =
    [];


function createAccretionLayer(
    size,
    tilt
) {

    const material =
        new THREE.ShaderMaterial({

            uniforms: {

                uTime: {
                    value:
                        0
                }

            },

            vertexShader:
                diskVertexShader,

            fragmentShader:
                diskFragmentShader,

            transparent:
                true,

            depthWrite:
                false,

            side:
                THREE.DoubleSide,

            blending:
                THREE.AdditiveBlending
        });


    const disk =
        new THREE.Mesh(

            new THREE.PlaneGeometry(
                size,
                size
            ),

            material
        );


    disk.rotation.x =
        tilt;


    portal.add(
        disk
    );


    diskMaterials.push(
        material
    );


    return disk;
}


const disk1 =
    createAccretionLayer(
        28,
        Math.PI /
        2.65
    );


const disk2 =
    createAccretionLayer(
        23,
        Math.PI /
        2.60
    );


disk2.rotation.z =
    0.15;


// ============================================================
// POLVO ORBITAL
// ============================================================

function createOrbitalDust() {

    const count =
        5000;


    const positions =
        new Float32Array(
            count *
            3
        );


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI *
            2;


        const radius =

            5

            +

            Math.pow(
                Math.random(),
                1.5
            )

            *

            13;


        positions[
            i * 3
        ] =

            Math.cos(
                angle
            )

            *

            radius;


        positions[
            i * 3 +
            1
        ] =

            (
                Math.random()
                -
                0.5
            )

            *

            0.7;


        positions[
            i * 3 +
            2
        ] =

            Math.sin(
                angle
            )

            *

            radius;
    }


    const geometry =
        new THREE.BufferGeometry();


    geometry.setAttribute(

        "position",

        new THREE.BufferAttribute(
            positions,
            3
        )
    );


    const material =
        new THREE.PointsMaterial({

            color:
                0xffc107,

            size:
                0.18,

            map:
                particleTexture,

            transparent:
                true,

            opacity:
                0.8,

            blending:
                THREE.AdditiveBlending,

            depthWrite:
                false
        });


    const dust =
        new THREE.Points(
            geometry,
            material
        );


    dust.rotation.x =
        Math.PI /
        2.62;


    portal.add(
        dust
    );


    return dust;
}


const orbitalDust =
    createOrbitalDust();


// ============================================================
// ILUMINACIÓN
// ============================================================

universe.add(

    new THREE.AmbientLight(
        0xffe6a0,
        1.25
    )

);


const portalLight =
    new THREE.PointLight(
        0xffb300,
        22,
        75,
        2
    );


portalLight.position.set(
    0,
    2,
    4
);


universe.add(
    portalLight
);


const fillLight =
    new THREE.DirectionalLight(
        0xfff3c4,
        1.4
    );


fillLight.position.set(
    -12,
    18,
    20
);


universe.add(
    fillLight
);


// ============================================================
// MATERIALES DE LAS FLORES
// ============================================================

const M = {

    stem:
        new THREE.MeshStandardMaterial({

            color:
                0x285c27,

            roughness:
                0.88

        }),


    leaf:
        new THREE.MeshStandardMaterial({

            color:
                0x3f7837,

            roughness:
                0.9,

            side:
                THREE.DoubleSide

        }),


    leafDark:
        new THREE.MeshStandardMaterial({

            color:
                0x1f4d25,

            roughness:
                0.95,

            side:
                THREE.DoubleSide

        }),


    sunPetal:
        new THREE.MeshStandardMaterial({

            color:
                0xffc928,

            roughness:
                0.72

        }),


    sunPetal2:
        new THREE.MeshStandardMaterial({

            color:
                0xffe15a,

            roughness:
                0.72

        }),


    sunCenter:
        new THREE.MeshStandardMaterial({

            color:
                0x4b250b,

            roughness:
                1

        }),


    seed:
        new THREE.MeshStandardMaterial({

            color:
                0xa15b17,

            roughness:
                1

        }),


    daisyPetal:
        new THREE.MeshStandardMaterial({

            color:
                0xffe85c,

            roughness:
                0.75

        }),


    daisyCenter:
        new THREE.MeshStandardMaterial({

            color:
                0xf4a900,

            roughness:
                0.9

        }),


    pollen:
        new THREE.MeshStandardMaterial({

            color:
                0xffdb55,

            roughness:
                0.85

        }),


    rose:
        new THREE.MeshStandardMaterial({

            color:
                0xffc82f,

            roughness:
                0.72,

            side:
                THREE.DoubleSide

        }),


    roseLight:
        new THREE.MeshStandardMaterial({

            color:
                0xffe36a,

            roughness:
                0.72,

            side:
                THREE.DoubleSide

        }),


    paperCream:
        new THREE.MeshStandardMaterial({

            color:
                0xf1e2bd,

            roughness:
                0.82,

            side:
                THREE.DoubleSide,

            transparent:
                true,

            opacity:
                0.92

        }),


    paperIvory:
        new THREE.MeshStandardMaterial({

            color:
                0xfff5d9,

            roughness:
                0.82,

            side:
                THREE.DoubleSide,

            transparent:
                true,

            opacity:
                0.90

        }),


    paperGold:
        new THREE.MeshStandardMaterial({

            color:
                0xcaa34c,

            roughness:
                0.72,

            side:
                THREE.DoubleSide,

            transparent:
                true,

            opacity:
                0.82

        }),


    ribbon:
        new THREE.MeshStandardMaterial({

            color:
                0xffdc63,

            roughness:
                0.62,

            side:
                THREE.DoubleSide

        })

};


// ============================================================
// GEOMETRÍA 3D BÁSICA
// ============================================================

function ellipsoid(
    width,
    height,
    depth,
    material,
    segments = 12
) {

    const geometry =
        new THREE.SphereGeometry(

            0.5,

            segments,

            Math.max(
                7,
                Math.floor(
                    segments *
                    0.7
                )
            )
        );


    geometry.scale(
        width,
        height,
        depth
    );


    return new THREE.Mesh(
        geometry,
        material
    );
}


// ============================================================
// HOJAS 3D
// ============================================================

function createLeaf(
    scale = 1,
    material = M.leaf
) {

    const leaf =
        ellipsoid(

            0.55 *
            scale,

            1.25 *
            scale,

            0.18 *
            scale,

            material,

            10
        );


    leaf.rotation.z =
        -0.35;


    return leaf;
}


// ============================================================
// TALLO 3D
// ============================================================

function createStem(
    length = 4,
    leaves = true
) {

    const group =
        new THREE.Group();


    const stem =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                0.055,
                0.075,
                length,
                8
            ),

            M.stem
        );


    stem.position.y =
        -length /
        2;


    group.add(
        stem
    );


    if (leaves) {

        const leaf1 =
            createLeaf(
                0.58
            );


        leaf1.position.set(
            -0.35,
            -length *
            0.42,
            0.02
        );


        leaf1.rotation.z =
            -1.0;


        leaf1.rotation.x =
            0.25;


        group.add(
            leaf1
        );


        const leaf2 =
            createLeaf(
                0.48
            );


        leaf2.position.set(
            0.31,
            -length *
            0.68,
            -0.03
        );


        leaf2.rotation.z =
            1.0;


        leaf2.rotation.x =
            -0.2;


        group.add(
            leaf2
        );
    }


    return group;
}


// ============================================================
// GIRASOL 3D
// ============================================================

function createSunflower(
    scale = 1,
    withStem = true
) {

    const flower =
        new THREE.Group();


    const head =
        new THREE.Group();


    function createPetalRing(
        count,
        radius,
        width,
        height,
        z,
        offset,
        inner = false
    ) {

        for (
            let i = 0;
            i < count;
            i++
        ) {

            const angle =

                i /
                count

                *

                Math.PI *
                2

                +

                offset;


            const petal =
                ellipsoid(

                    width,

                    height,

                    0.22,

                    i % 2

                        ? M.sunPetal

                        : M.sunPetal2,

                    10
                );


            petal.position.set(

                Math.cos(
                    angle
                ) *
                radius,

                Math.sin(
                    angle
                ) *
                radius,

                z
            );


            petal.rotation.z =

                angle

                -

                Math.PI /
                2;


            petal.rotation.x =

                (
                    inner
                        ? -0.12
                        : 0.12
                )

                +

                (
                    Math.random()
                    -
                    0.5
                )

                *

                0.12;


            head.add(
                petal
            );
        }
    }


    createPetalRing(
        22,
        1.08,
        0.43,
        1.20,
        -0.08,
        0
    );


    createPetalRing(
        18,
        0.84,
        0.34,
        0.92,
        0.02,
        Math.PI / 18,
        true
    );


    // Centro grueso y relleno.
    const center =
        ellipsoid(
            1.4,
            1.4,
            0.52,
            M.sunCenter,
            24
        );


    center.position.z =
        0.22;


    head.add(
        center
    );


    // Semillas en espiral.
    const seedGeometry =
        new THREE.SphereGeometry(
            0.038,
            5,
            4
        );


    const goldenAngle =
        Math.PI *
        (
            3 -
            Math.sqrt(5)
        );


    for (
        let i = 0;
        i < 72;
        i++
    ) {

        const radius =

            0.59

            *

            Math.sqrt(
                i /
                72
            );


        const angle =
            i *
            goldenAngle;


        const seed =
            new THREE.Mesh(
                seedGeometry,
                M.seed
            );


        seed.position.set(

            Math.cos(
                angle
            ) *
            radius,

            Math.sin(
                angle
            ) *
            radius,

            0.50

            -

            radius *
            radius *
            0.12
        );


        seed.scale.setScalar(

            0.75

            +

            Math.random() *
            0.4
        );


        head.add(
            seed
        );
    }


    flower.add(
        head
    );


    if (withStem) {

        const stem =
            createStem(
                4.2,
                true
            );


        stem.position.set(
            0,
            -0.45,
            -0.2
        );


        flower.add(
            stem
        );
    }


    flower.scale.setScalar(
        scale
    );


    return flower;
}


// ============================================================
// MARGARITA AMARILLA 3D
// ============================================================

function createDaisy(
    scale = 1,
    withStem = true
) {

    const flower =
        new THREE.Group();


    const head =
        new THREE.Group();


    function createPetalRing(
        count,
        radius,
        width,
        height,
        z,
        offset
    ) {

        for (
            let i = 0;
            i < count;
            i++
        ) {

            const angle =

                i /
                count

                *

                Math.PI *
                2

                +

                offset;


            const petal =
                ellipsoid(

                    width,

                    height,

                    0.16,

                    M.daisyPetal,

                    10
                );


            petal.position.set(

                Math.cos(
                    angle
                ) *
                radius,

                Math.sin(
                    angle
                ) *
                radius,

                z
            );


            petal.rotation.z =

                angle

                -

                Math.PI /
                2;


            petal.rotation.x =

                (
                    Math.random()
                    -
                    0.5
                )

                *

                0.14;


            head.add(
                petal
            );
        }
    }


    createPetalRing(
        20,
        0.72,
        0.27,
        0.86,
        -0.02,
        0
    );


    createPetalRing(
        16,
        0.54,
        0.22,
        0.67,
        0.04,
        Math.PI / 16
    );


    const center =
        ellipsoid(
            0.74,
            0.74,
            0.42,
            M.daisyCenter,
            20
        );


    center.position.z =
        0.22;


    head.add(
        center
    );


    const pollenGeometry =
        new THREE.SphereGeometry(
            0.027,
            5,
            4
        );


    for (
        let i = 0;
        i < 32;
        i++
    ) {

        const radius =

            Math.sqrt(
                Math.random()
            )

            *

            0.29;


        const angle =
            Math.random() *
            Math.PI *
            2;


        const pollen =
            new THREE.Mesh(
                pollenGeometry,
                M.pollen
            );


        pollen.position.set(

            Math.cos(
                angle
            ) *
            radius,

            Math.sin(
                angle
            ) *
            radius,

            0.45
        );


        head.add(
            pollen
        );
    }


    flower.add(
        head
    );


    if (withStem) {

        const stem =
            createStem(
                3.7,
                true
            );


        stem.position.set(
            0,
            -0.34,
            -0.16
        );


        flower.add(
            stem
        );
    }


    flower.scale.setScalar(
        scale
    );


    return flower;
}

// ============================================================
// ROSA AMARILLA 3D - FORMA DE COPA / MIRANDO HACIA ARRIBA
// ============================================================


// ============================================================
// MATERIAL AUXILIAR DEL INTERIOR
// ============================================================

const roseInnerMaterial =
    M.roseLight;


// ============================================================
// PÉTALO REALISTA DE ROSA
// ============================================================

function createRosePetalGeometry(
    width,
    height,
    depth,
    curl = 0.1,
    cup = 0.08
) {

    const shape =
        new THREE.Shape();


    // Base estrecha.
    shape.moveTo(
        0,
        -height * 0.52
    );


    // Lado izquierdo.
    shape.bezierCurveTo(

        -width * 0.13,
        -height * 0.45,

        -width * 0.43,
        -height * 0.20,

        -width * 0.50,
        height * 0.12
    );


    shape.bezierCurveTo(

        -width * 0.54,
        height * 0.34,

        -width * 0.39,
        height * 0.49,

        -width * 0.17,
        height * 0.51
    );


    // Pequeña ondulación superior.
    shape.bezierCurveTo(

        -width * 0.09,
        height * 0.52,

        -width * 0.035,
        height * 0.47,

        0,
        height * 0.46
    );


    shape.bezierCurveTo(

        width * 0.035,
        height * 0.47,

        width * 0.09,
        height * 0.52,

        width * 0.17,
        height * 0.51
    );


    // Lado derecho.
    shape.bezierCurveTo(

        width * 0.39,
        height * 0.49,

        width * 0.54,
        height * 0.34,

        width * 0.50,
        height * 0.12
    );


    shape.bezierCurveTo(

        width * 0.43,
        -height * 0.20,

        width * 0.13,
        -height * 0.45,

        0,
        -height * 0.52
    );


    const geometry =
        new THREE.ExtrudeGeometry(

            shape,

            {
                depth:
                    depth,

                bevelEnabled:
                    true,

                bevelSegments:
                    2,

                steps:
                    1,

                bevelSize:
                    0.018,

                bevelThickness:
                    0.012,

                curveSegments:
                    9
            }
        );


    geometry.center();


    // ========================================================
    // CURVATURA DEL PÉTALO
    // ========================================================

    const position =
        geometry.attributes.position;


    for (
        let i = 0;
        i < position.count;
        i++
    ) {

        const x =
            position.getX(i);

        const y =
            position.getY(i);

        let z =
            position.getZ(i);


        const ny =
            THREE.MathUtils.clamp(

                (
                    y +
                    height * 0.52
                )

                /

                (
                    height *
                    1.04
                ),

                0,
                1
            );


        const nx =
            THREE.MathUtils.clamp(

                Math.abs(x)

                /

                (
                    width *
                    0.55
                ),

                0,
                1
            );


        // Centro hundido:
        // crea la forma de cuchara/copa.
        const bowl =

            (
                1 -
                nx * nx
            )

            *

            cup

            *

            (
                0.3 +
                ny * 0.7
            );


        // Curvatura del borde superior.
        const topCurl =

            Math.pow(
                ny,
                3
            )

            *

            curl;


        // Ondulación muy pequeña del borde.
        const wave =

            Math.sin(
                x * 13
            )

            *

            Math.pow(
                ny,
                4
            )

            *

            0.012;


        z +=

            bowl

            +

            topCurl

            +

            wave;


        position.setZ(
            i,
            z
        );
    }


    position.needsUpdate =
        true;


    geometry.computeVertexNormals();


    return geometry;
}


// ============================================================
// CREAR PÉTALO
// ============================================================

function makeRosePetal(
    width,
    height,
    material,
    curl,
    cup
) {

    return new THREE.Mesh(

        createRosePetalGeometry(

            width,
            height,

            Math.max(
                0.035,
                width * 0.07
            ),

            curl,
            cup

        ),

        material
    );
}


// ============================================================
// AÑADIR CAPA DE PÉTALOS
// ============================================================
//
// IMPORTANTE:
//
// Los pétalos se colocan alrededor del eje Z.
//
// Z = altura de la rosa.
//
// Eso hace que la rosa tenga forma de copa,
// en lugar de parecer una margarita plana.
// ============================================================

function addRoseLayer(
    group,
    options
) {

    const {

        count,
        radius,
        z,
        width,
        height,
        tilt,
        curl,
        cup,
        offset = 0,
        variation = 0.04,
        material = M.rose

    } = options;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const angle =

            (
                i /
                count
            )

            *

            Math.PI *
            2

            +

            offset;


        const petal =
            makeRosePetal(

                width *
                (
                    1 +
                    (
                        Math.random() -
                        0.5
                    )
                    *
                    variation
                ),

                height *
                (
                    1 +
                    (
                        Math.random() -
                        0.5
                    )
                    *
                    variation
                ),

                (
                    i % 4 === 0
                )

                    ? M.roseLight

                    : material,

                curl *
                (
                    0.9 +
                    Math.random() *
                    0.2
                ),

                cup
            );


        // ====================================================
        // POSICIÓN RADIAL
        // ====================================================

        petal.position.set(

            Math.cos(
                angle
            )
            *
            radius,

            Math.sin(
                angle
            )
            *
            radius,

            z
        );


        // ====================================================
        // ORIENTACIÓN
        // ====================================================
        //
        // Primero hacemos que la cara del pétalo apunte
        // aproximadamente hacia el centro.
        //
        // Después inclinamos el pétalo.
        // Las capas interiores son verticales.
        // Las exteriores se abren progresivamente.
        // ====================================================

        petal.rotation.z =

            angle

            -

            Math.PI /
            2;


        petal.rotation.x =

            tilt

            +

            (
                Math.random() -
                0.5
            )

            *
            0.045;


        petal.rotation.y =

            (
                Math.random() -
                0.5
            )

            *
            0.035;


        group.add(
            petal
        );
    }
}


// ============================================================
// CENTRO ESPIRAL DE LA ROSA
// ============================================================

function createRoseSpiralCenter() {

    const center =
        new THREE.Group();


    // ========================================================
    // PÉTALOS MUY INTERNOS
    // ========================================================

    const count =
        9;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const angle =

            i *
            2.399963229728653;


        const radius =

            0.025

            +

            i *
            0.013;


        const petal =
            makeRosePetal(

                0.16 +
                i * 0.006,

                0.38 +
                i * 0.009,

                i % 3 === 0

                    ? M.roseLight

                    : M.rose,

                0.015,

                0.055
            );


        petal.position.set(

            Math.cos(
                angle
            )
            *
            radius,

            Math.sin(
                angle
            )
            *
            radius,

            0.51

            +

            i *
            0.006
        );


        petal.rotation.z =

            angle

            -

            Math.PI /
            2;


        // Muy cerrados.
        petal.rotation.x =

            0.02

            +

            i *
            0.006;


        center.add(
            petal
        );
    }


    // ========================================================
    // PEQUEÑO BOTÓN CENTRAL
    // ========================================================
    //
    // Muy pequeño. No debe parecer el centro de un girasol.
    // Solo tapa cualquier hueco geométrico.
    // ========================================================

    const tinyCore =
        ellipsoid(

            0.075,
            0.075,
            0.11,

            M.roseLight,

            10
        );


    tinyCore.position.z =
        0.60;


    center.add(
        tinyCore
    );


    return center;
}


// ============================================================
// SÉPALO
// ============================================================

function createRoseSepal() {

    const shape =
        new THREE.Shape();


    shape.moveTo(
        0,
        -0.30
    );


    shape.bezierCurveTo(

        -0.06,
        -0.12,

        -0.09,
        0.12,

        -0.065,
        0.28
    );


    shape.lineTo(
        0,
        0.62
    );


    shape.lineTo(
        0.065,
        0.28
    );


    shape.bezierCurveTo(

        0.09,
        0.12,

        0.06,
        -0.12,

        0,
        -0.30
    );


    const geometry =
        new THREE.ExtrudeGeometry(

            shape,

            {
                depth:
                    0.022,

                bevelEnabled:
                    true,

                bevelSegments:
                    1,

                bevelSize:
                    0.01,

                bevelThickness:
                    0.008,

                curveSegments:
                    6
            }
        );


    geometry.center();


    return new THREE.Mesh(

        geometry,

        M.leafDark
    );
}


// ============================================================
// ROSA AMARILLA REALISTA
// ============================================================

function createRose(
    scale = 1,
    withStem = true
) {

    const flower =
        new THREE.Group();


    const head =
        new THREE.Group();


    // ========================================================
    // CÁLIZ
    // ========================================================

    const calyx =
        ellipsoid(

            0.34,
            0.34,
            0.22,

            M.leafDark,

            12
        );


    calyx.position.z =
        -0.27;


    head.add(
        calyx
    );


    // ========================================================
    // SÉPALOS
    // ========================================================

    for (
        let i = 0;
        i < 5;
        i++
    ) {

        const angle =

            i /
            5

            *

            Math.PI *
            2;


        const sepal =
            createRoseSepal();


        sepal.position.set(

            Math.cos(
                angle
            )
            *
            0.31,

            Math.sin(
                angle
            )
            *
            0.31,

            -0.30
        );


        sepal.rotation.z =

            angle

            -

            Math.PI /
            2;


        sepal.rotation.x =
            0.22;


        head.add(
            sepal
        );
    }


    // ========================================================
    // CAPA EXTERIOR BAJA
    // ========================================================
    //
    // Estos son los pétalos grandes inferiores
    // que se ven en la fotografía de referencia.
    // ========================================================

    addRoseLayer(

        head,

        {
            count:
                7,

            radius:
                0.73,

            z:
                -0.08,

            width:
                0.74,

            height:
                0.76,

            tilt:
                0.73,

            curl:
                0.15,

            cup:
                0.095,

            offset:
                0.12,

            variation:
                0.10
        }
    );


    // ========================================================
    // SEGUNDA CAPA EXTERIOR
    // ========================================================

    addRoseLayer(

        head,

        {
            count:
                9,

            radius:
                0.60,

            z:
                0.02,

            width:
                0.64,

            height:
                0.75,

            tilt:
                0.57,

            curl:
                0.13,

            cup:
                0.105,

            offset:
                0.47,

            variation:
                0.08
        }
    );


    // ========================================================
    // CAPA MEDIA
    // ========================================================

    addRoseLayer(

        head,

        {
            count:
                8,

            radius:
                0.44,

            z:
                0.14,

            width:
                0.53,

            height:
                0.70,

            tilt:
                0.40,

            curl:
                0.105,

            cup:
                0.11,

            offset:
                0.18,

            variation:
                0.07
        }
    );


    // ========================================================
    // CAPA MEDIA INTERIOR
    // ========================================================

    addRoseLayer(

        head,

        {
            count:
                7,

            radius:
                0.30,

            z:
                0.26,

            width:
                0.43,

            height:
                0.63,

            tilt:
                0.25,

            curl:
                0.075,

            cup:
                0.105,

            offset:
                0.53,

            variation:
                0.06
        }
    );


    // ========================================================
    // CAPA CERRADA
    // ========================================================

    addRoseLayer(

        head,

        {
            count:
                6,

            radius:
                0.18,

            z:
                0.37,

            width:
                0.33,

            height:
                0.55,

            tilt:
                0.11,

            curl:
                0.045,

            cup:
                0.09,

            offset:
                0.24,

            variation:
                0.05
        }
    );


    // ========================================================
    // CENTRO ESPIRAL
    // ========================================================

    const spiral =
        createRoseSpiralCenter();


    head.add(
        spiral
    );


    // ========================================================
    // FORMA GENERAL DE LA CABEZA
    // ========================================================
    //
    // Un poco más alta que ancha.
    // Esto evita el aspecto de "flor plana".
    // ========================================================

    head.scale.set(

        0.92,

        0.92,

        1.14
    );


    // ========================================================
    // ORIENTACIÓN DE LA ROSA
    // ========================================================
    //
    // Antes la flor quedaba prácticamente de frente.
    //
    // Ahora la cabeza se inclina para que el eje de crecimiento
    // vaya HACIA ARRIBA.
    //
    // Como la rosa se construyó sobre Z, giramos la cabeza
    // aproximadamente 90 grados sobre X para convertir ese eje
    // en el eje vertical Y del tallo.
    // ========================================================

    head.rotation.x =
        -Math.PI /
        2;


    // Una inclinación mínima natural.
    head.rotation.z =

        (
            Math.random() -
            0.5
        )

        *
        0.07;


    head.position.set(

        0,

        0.08,

        0
    );


    flower.add(
        head
    );


    // ========================================================
    // TALLO
    // ========================================================

    if (
        withStem
    ) {

        const stem =
            createStem(

                4.1,

                true
            );


        // Ahora el tallo entra por DEBAJO de la rosa.
        stem.position.set(

            0,

            -0.40,

            0
        );


        flower.add(
            stem
        );
    }


    flower.scale.setScalar(
        scale
    );


    return flower;
}

// ============================================================
// FUNCIÓN UNIVERSAL
// ============================================================

function createFlower(
    type = "sunflower",
    scale = 1,
    withStem = true
) {

    if (
        type === "rose"
    ) {

        return createRose(
            scale,
            withStem
        );
    }


    if (
        type === "daisy"
    ) {

        return createDaisy(
            scale,
            withStem
        );
    }


    return createSunflower(
        scale,
        withStem
    );
}


// ============================================================
// PAPEL 3D DEL RAMO
// ============================================================

function createPaperPanel(
    material,
    angle,
    y = -1.15,
    scale = 1
) {

    const shape =
        new THREE.Shape();


    shape.moveTo(
        -1.0,
        -2.2
    );


    shape.lineTo(
        -2.65,
        1.15
    );


    shape.lineTo(
        -1.5,
        2.2
    );


    shape.lineTo(
        0,
        1.65
    );


    shape.lineTo(
        1.5,
        2.2
    );


    shape.lineTo(
        2.65,
        1.15
    );


    shape.lineTo(
        1.0,
        -2.2
    );


    shape.closePath();


    const geometry =
        new THREE.ShapeGeometry(
            shape
        );


    const mesh =
        new THREE.Mesh(
            geometry,
            material
        );


    mesh.position.set(
        0,
        y,
        -0.62
    );


    mesh.rotation.y =
        angle;


    mesh.scale.setScalar(
        scale
    );


    return mesh;
}


// ============================================================
// LAZO 3D
// ============================================================

function createBow() {

    const group =
        new THREE.Group();


    const knot =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                0.18,
                12,
                8
            ),

            M.ribbon
        );


    knot.scale.set(
        1.2,
        0.8,
        0.7
    );


    group.add(
        knot
    );


    for (
        const side of [
            -1,
            1
        ]
    ) {

        const loop =
            ellipsoid(
                0.7,
                0.32,
                0.10,
                M.ribbon,
                10
            );


        loop.position.set(
            side *
            0.48,
            0.05,
            0
        );


        loop.rotation.z =
            side *
            0.35;


        group.add(
            loop
        );


        const tail =
            ellipsoid(
                0.18,
                0.85,
                0.08,
                M.ribbon,
                9
            );


        tail.position.set(
            side *
            0.22,
            -0.68,
            0
        );


        tail.rotation.z =
            side *
            0.18;


        group.add(
            tail
        );
    }


    return group;
}


// ============================================================
// FOLLAJE PARA LOS RAMOS
// ============================================================

function addFoliage(
    bouquet,
    count = 12
) {

    for (
        let i = 0;
        i < count;
        i++
    ) {

        const angle =

            i /
            count

            *

            Math.PI *
            2

            +

            (
                Math.random()
                -
                0.5
            )

            *

            0.25;


        const radius =

            1.3

            +

            Math.random() *
            0.85;


        const leaf =
            createLeaf(

                0.48

                +

                Math.random() *
                0.28,

                i % 3 === 0

                    ? M.leafDark

                    : M.leaf
            );


        leaf.position.set(

            Math.cos(
                angle
            ) *
            radius,

            0.55

            +

            Math.sin(
                angle
            ) *
            0.9,

            -0.25

            +

            Math.random() *
            0.35
        );


        leaf.rotation.z =

            -angle

            +

            Math.PI /
            2;


        leaf.rotation.x =

            (
                Math.random()
                -
                0.5
            )

            *

            0.5;


        bouquet.add(
            leaf
        );
    }
}


// ============================================================
// FLORES PEQUEÑAS DE RELLENO
// ============================================================

function addBabyBreath(
    bouquet,
    count = 18
) {

    const material =
        new THREE.MeshStandardMaterial({

            color:
                0xfff8d8,

            roughness:
                0.9
        });


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const angle =
            Math.random() *
            Math.PI *
            2;


        const radius =

            1.0

            +

            Math.random() *
            1.45;


        const bud =
            new THREE.Mesh(

                new THREE.SphereGeometry(
                    0.055,
                    6,
                    5
                ),

                material
            );


        bud.position.set(

            Math.cos(
                angle
            ) *
            radius,

            0.35

            +

            Math.random() *
            2.1,

            -0.15

            +

            Math.random() *
            0.5
        );


        bouquet.add(
            bud
        );
    }
}


// ============================================================
// RAMO DE REGALO 3D
// ============================================================

function createBouquet(
    type = "mixed",
    customCount = null,
    withoutPaper = false
) {

    const bouquet =
        new THREE.Group();


    // ========================================================
    // PAPEL DEL RAMO
    // ========================================================

    if (!withoutPaper) {
    bouquet.add(

        createPaperPanel(
            M.paperCream,
            -0.42,
            -1.15,
            1
        )

    );


    bouquet.add(

        createPaperPanel(
            M.paperIvory,
            0.42,
            -1.12,
            0.96
        )

    );


    const backPaper =
        createPaperPanel(
            M.paperGold,
            0,
            -1,
            1.08
        );


    backPaper.position.z =
        -0.82;


    backPaper.rotation.z =
        0.05;


    bouquet.add(
        backPaper
    );
    }


    // ========================================================
    // DETERMINAR FLORES DEL RAMO
    // ========================================================

    let types = [];


    // --------------------------------------------------------
    // RAMO DE GIRASOLES
    // --------------------------------------------------------

    if (
        type === "sunflowers"
    ) {

        const count =
            customCount ??
            6;


        for (
            let i = 0;
            i < count;
            i++
        ) {

            types.push(
                "sunflower"
            );
        }
    }


    // --------------------------------------------------------
    // RAMO DE ROSAS
    // --------------------------------------------------------

    else if (
        type === "roses"
    ) {

        const count =
            customCount ??
            9;


        for (
            let i = 0;
            i < count;
            i++
        ) {

            types.push(
                "rose"
            );
        }
    }


    // --------------------------------------------------------
    // RAMO DE MARGARITAS
    // --------------------------------------------------------

    else if (
        type === "daisies"
    ) {

        const count =
            customCount ??
            9;


        for (
            let i = 0;
            i < count;
            i++
        ) {

            types.push(
                "daisy"
            );
        }
    }


    // --------------------------------------------------------
    // RAMO MIXTO EXACTO
    // 2 girasoles + 2 rosas + 2 margaritas
    // --------------------------------------------------------

    else {

        types = [

            "sunflower",
            "sunflower",

            "rose",
            "rose",

            "daisy",
            "daisy"

        ];
    }


    // ========================================================
    // DISTRIBUCIÓN DE LAS FLORES
    // ========================================================

    const total =
        types.length;


    types.forEach(
        (
            flowerType,
            index
        ) => {

            // Distribución en espiral.
            // Esto permite usar 6, 9, 12 o más flores
            // sin tener posiciones fijas.

            const angle =

                index *
                2.399963;


            const normalized =

                total <= 1

                    ? 0

                    : index /
                      (
                          total -
                          1
                      );


            const radius =

                0.25

                +

                Math.sqrt(
                    normalized
                )

                *

                1.35;


            const x =

                Math.cos(
                    angle
                )

                *

                radius;


            const y =

                0.55

                +

                Math.sin(
                    angle
                )

                *

                radius *
                0.62

                +

                (
                    1 -
                    normalized
                )

                *

                0.85;


            const z =

                0.18

                +

                (
                    1 -
                    normalized
                )

                *

                0.42

                +

                Math.sin(
                    angle *
                    0.7
                )

                *

                0.12;


            let flowerScale;


            if (
                flowerType ===
                "sunflower"
            ) {

                flowerScale =
                    0.40;

            }

            else if (
                flowerType ===
                "rose"
            ) {

                flowerScale =
                    0.44;

            }

            else {

                flowerScale =
                    0.48;
            }


            const flower =
                createFlower(
                    flowerType,
                    flowerScale,
                    true
                );


            flower.position.set(
                x,
                y,
                z
            );


// ============================================================
// ORIENTACIÓN DE LAS FLORES DEL RAMO
// ============================================================

if (
    flowerType === "rose"
) {

    // Las rosas crecen hacia ARRIBA.
    //
    // Solo damos una pequeña inclinación hacia los lados,
    // como un ramo real. No las hacemos mirar directamente
    // hacia la cámara.

    flower.rotation.x =

        (
            Math.random()
            -
            0.5
        )

        *
        0.045;


    flower.rotation.y =

        (
            Math.random()
            -
            0.5
        )

        *
        0.07;


    flower.rotation.z =

        -x *
        0.055

        +

        (
            Math.random()
            -
            0.5
        )

        *
        0.035;

}

else {

    // Girasoles y margaritas conservan
    // la orientación que ya tenían.

    flower.rotation.z =

        -x *
        0.11;


    flower.rotation.y =

        (
            Math.random()
            -
            0.5
        )

        *
        0.12;


    flower.rotation.x =

        (
            Math.random()
            -
            0.5
        )

        *
        0.08;
}


            bouquet.add(
                flower
            );
        }
    );


    // ========================================================
    // TALLOS ADICIONALES VISIBLES
    // ========================================================

    const stemCount =
        Math.max(
            8,
            types.length
        );


    for (
        let i = 0;
        i < stemCount;
        i++
    ) {

        const stem =
            new THREE.Mesh(

                new THREE.CylinderGeometry(
                    0.032,
                    0.045,
                    3.1,
                    7
                ),

                M.stem
            );


        stem.position.set(

            (
                Math.random()
                -
                0.5
            )
            *
            0.38,

            -2.48,

            (
                Math.random()
                -
                0.5
            )
            *
            0.20
        );


        stem.rotation.z =

            (
                Math.random()
                -
                0.5
            )

            *

            0.08;


        bouquet.add(
            stem
        );
    }


    // ========================================================
    // FOLLAJE
    // ========================================================

    addFoliage(

        bouquet,

        type === "roses"

            ? 16

            : 12

    );


    // ========================================================
    // FLORES PEQUEÑAS DE RELLENO
    // ========================================================

    if (
        type === "roses"
    ) {

        addBabyBreath(
            bouquet,
            20
        );

    }

    else if (
        type === "daisies"
    ) {

        addBabyBreath(
            bouquet,
            10
        );

    }

    else if (
        type === "mixed"
    ) {

        addBabyBreath(
            bouquet,
            12
        );

    }


    // ========================================================
    // LAZO
    // ========================================================

    if (!withoutPaper) {

    const bow =
        createBow();


    // AQUÍ CONSERVA EXACTAMENTE EL bow.position.set(...)
    // QUE YA TIENES EN TU ARCHIVO.


    bow.scale.setScalar(
        0.9
    );


    bouquet.add(
        bow
    );
}


    return bouquet;
}


// ============================================================
// FLORES INDIVIDUALES FLOTANTES
// CANTIDADES EXACTAS
// ============================================================

const floatingFlowers =
    [];


// ============================================================
// DISTRIBUCIÓN 3D UNIFORME
// ============================================================
//
// Devuelve puntos repartidos proporcionalmente
// por TODA la superficie de una esfera.
//
// A diferencia de Math.random(), esto evita:
// - acumulaciones en un lado
// - zonas completamente vacías
// - exceso de objetos delante
// - falta de objetos detrás
//
// Funciona bien desde:
// arriba / abajo
// izquierda / derecha
// delante / detrás
// ============================================================

function getUniformSpherePoint(
    index,
    total,
    radius,
    phase = 0
) {

    // Ángulo dorado.
    const goldenAngle =
        Math.PI *
        (
            3 -
            Math.sqrt(5)
        );


    // Posición vertical uniforme.
    const yNormalized =

        1

        -

        (
            (
                index +
                0.5
            )

            /

            total
        )

        *

        2;


    // Radio horizontal correspondiente.
    const horizontalRadius =

        Math.sqrt(

            Math.max(

                0,

                1 -
                yNormalized *
                yNormalized
            )
        );


    const angle =

        index *
        goldenAngle

        +

        phase;


    const x =

        Math.cos(angle)

        *

        horizontalRadius;


    const z =

        Math.sin(angle)

        *

        horizontalRadius;


    return new THREE.Vector3(

        x * radius,

        yNormalized * radius,

        z * radius
    );
}


// ============================================================
// PEQUEÑA VARIACIÓN 3D
// ============================================================
//
// La distribución base es uniforme.
// Esta variación evita que parezca una esfera matemática
// demasiado perfecta.
// ============================================================

function addNaturalPositionVariation(
    position,
    amount = 2
) {

    const direction =
        position
            .clone()
            .normalize();


    // Variación radial.
    position.addScaledVector(

        direction,

        (
            Math.random() -
            0.5
        )

        *

        amount
    );


    return position;
}


// ============================================================
// HACER QUE UNA FLOR TENGA UNA ORIENTACIÓN NATURAL
// ============================================================

function orientFloatingFlower(
    flower,
    position
) {

    // Mantener una orientación principalmente vertical.
    // Así las rosas siguen mirando hacia arriba.

    flower.rotation.set(

        (
            Math.random() -
            0.5
        )

        *
        0.18,

        Math.atan2(
            position.x,
            position.z
        )

        +

        (
            Math.random() -
            0.5
        )

        *
        0.25,

        (
            Math.random() -
            0.5
        )

        *
        0.22
    );
}


// ============================================================
// FLORES INDIVIDUALES FLOTANTES
// DISTRIBUCIÓN PROPORCIONAL 3D
// ============================================================

function addIndividualFlowers(
    type,
    count
) {

    // Cada tipo recibe una fase diferente.
    // Esto impide que rosas, margaritas y girasoles
    // aparezcan exactamente en los mismos puntos.

    let phase = 0;


    if (
        type === "daisy"
    ) {

        phase =
            0.35;
    }


    else if (
        type === "sunflower"
    ) {

        phase =
            2.15;
    }


    else if (
        type === "rose"
    ) {

        phase =
            4.30;
    }


    for (
        let i = 0;
        i < count;
        i++
    ) {

        // ====================================================
        // PROFUNDIDAD
        // ====================================================
        //
        // Mezclamos tres capas.
        //
        // Esto evita que todas las flores formen
        // una sola "cáscara" esférica.
        // ====================================================

        const layer =
            i % 3;


        let radius;
        let scale;


        if (
            layer === 0
        ) {

            // Capa interior.
            radius =

                21

                +

                Math.random() *
                7;


            scale =

                0.30

                +

                Math.random() *
                0.18;
        }


        else if (
            layer === 1
        ) {

            // Capa media.
            radius =

                31

                +

                Math.random() *
                8;


            scale =

                0.38

                +

                Math.random() *
                0.20;
        }


        else {

            // Capa exterior.
            radius =

                42

                +

                Math.random() *
                10;


            scale =

                0.45

                +

                Math.random() *
                0.23;
        }


        // ====================================================
        // CREAR FLOR
        // ====================================================

        const flower =
            createFlower(

                type,

                scale,

                true
            );


        // ====================================================
        // PUNTO UNIFORME EN LA ESFERA
        // ====================================================

        const position =
            getUniformSpherePoint(

                i,

                count,

                radius,

                phase
            );


        addNaturalPositionVariation(

            position,

            2.8
        );


        flower.position.copy(
            position
        );


        // ====================================================
        // ORIENTACIÓN
        // ====================================================

        orientFloatingFlower(

            flower,

            position
        );


        // ====================================================
        // DATOS PARA LA ANIMACIÓN ORIGINAL
        // ====================================================

        flower.userData = {

            baseY:
                flower.position.y,

            baseX:
                flower.position.x,

            baseZ:
                flower.position.z,

            baseRotY:
                flower.rotation.y,

            floatSpeed:

                0.35

                +

                Math.random() *
                0.7,

            offset:

                Math.random() *
                Math.PI *
                2

        };


        universe.add(
            flower
        );


        floatingFlowers.push(
            flower
        );
    }
}


// 15 MARGARITAS
addIndividualFlowers(

    "daisy",

    CONFIG
        .individualFlowers
        .daisies

);


// 20 GIRASOLES
addIndividualFlowers(

    "sunflower",

    CONFIG
        .individualFlowers
        .sunflowers

);


// 25 ROSAS
addIndividualFlowers(

    "rose",

    CONFIG
        .individualFlowers
        .roses

);

// ============================================================
// RAMOS SECUNDARIOS
// CANTIDADES EXACTAS
// ============================================================

const bouquets =
    [];

// ============================================================
// RAMOS SECUNDARIOS
// DISTRIBUCIÓN UNIFORME EN TODO EL ESPACIO 3D
// ============================================================

function addBouquets(
    type,
    count
) {

    // Fase distinta para cada clase de ramo.
    // Así no aparecen unos exactamente detrás de otros.

    let phase = 0;


    if (
        type === "sunflowers"
    ) {

        phase =
            0.15;
    }


    else if (
        type === "roses"
    ) {

        phase =
            1.75;
    }


    else if (
        type === "daisies"
    ) {

        phase =
            3.40;
    }


    else if (
        type === "mixed"
    ) {

        phase =
            5.05;
    }


    for (
        let i = 0;
        i < count;
        i++
    ) {

        const bouquet =
            createBouquet(
                type
            );


        // ====================================================
        // RADIO
        // ====================================================
        //
        // Los ramos quedan más alejados que la mayoría
        // de flores individuales para que no tapen
        // el agujero negro.
        // ====================================================

        const radius =

            31

            +

            (
                i % 3
            )

            *
            7

            +

            Math.random() *
            4;


        // ====================================================
        // POSICIÓN ESFÉRICA UNIFORME
        // ====================================================

        const position =
            getUniformSpherePoint(

                i,

                count,

                radius,

                phase
            );


        addNaturalPositionVariation(

            position,

            2.2
        );


        bouquet.position.copy(
            position
        );


        // ====================================================
        // ESCALA
        // ====================================================

        bouquet.scale.setScalar(

            0.56

            +

            Math.random() *
            0.16
        );


        // ====================================================
        // ORIENTACIÓN
        // ====================================================
        //
        // Los ramos permanecen verticales.
        // No los hacemos apuntar aleatoriamente en cualquier
        // dirección porque se verían acostados.
        // ====================================================

        bouquet.rotation.set(

            (
                Math.random() -
                0.5
            )

            *
            0.11,


            Math.atan2(

                position.x,

                position.z
            )

            +

            (
                Math.random() -
                0.5
            )

            *
            0.22,


            (
                Math.random() -
                0.5
            )

            *
            0.10
        );


        bouquet.userData = {

            baseY:
                bouquet.position.y,

            baseX:
                bouquet.position.x,

            baseZ:
                bouquet.position.z,

            offset:

                Math.random() *
                10,

            main:
                false

        };


        universe.add(
            bouquet
        );


        bouquets.push(
            bouquet
        );
    }
}

// ============================================================
// 5 RAMOS DE GIRASOLES
// ============================================================

addBouquets(

    "sunflowers",

    CONFIG
        .bouquets
        .sunflowers

);


// ============================================================
// 5 RAMOS DE ROSAS
// ============================================================

addBouquets(

    "roses",

    CONFIG
        .bouquets
        .roses

);


// ============================================================
// 5 RAMOS DE MARGARITAS
// ============================================================

addBouquets(

    "daisies",

    CONFIG
        .bouquets
        .daisies

);


// ============================================================
// 3 RAMOS MIXTOS
//
// Cada uno contiene:
// 2 girasoles
// 2 rosas
// 2 margaritas
// ============================================================

addBouquets(

    "mixed",

    CONFIG
        .bouquets
        .mixed

);

// ============================================================
// RAMO PRINCIPAL 3D DE 60 ROSAS
// ============================================================
//
// CARACTERÍSTICAS:
//
// - 60 rosas amarillas.
// - NO utiliza createBouquet().
// - NO contiene papel.
// - Copa completamente tridimensional.
// - Simétrica alrededor del eje Y.
// - Se ve como ramo desde frente, atrás, izquierda y derecha.
// - Rosas exteriores ligeramente inclinadas hacia afuera.
// - Todos los tallos convergen hacia una cintura.
// - Lazo amarillo 3D alrededor de esa cintura.
// - Tallos vuelven a abrirse ligeramente debajo del lazo.
// ============================================================


function createMainRoseBouquet(
    roseCount = 60
) {

    const bouquet =
        new THREE.Group();


    // ========================================================
    // GRUPOS INTERNOS
    // ========================================================

    const rosesGroup =
        new THREE.Group();


    const stemsGroup =
        new THREE.Group();


    const leavesGroup =
        new THREE.Group();


    bouquet.add(
        stemsGroup
    );


    bouquet.add(
        leavesGroup
    );


    bouquet.add(
        rosesGroup
    );


    // ========================================================
    // MEDIDAS
    // ========================================================
    //
    // Todo está construido alrededor del eje Y.
    //
    // La copa NO está orientada hacia la cámara.
    // Es un volumen circular real.
    // ========================================================

    const crownRadius =
        4.65;


    const crownCenterY =
        3.35;


    const crownHeight =
        3.45;


    // Punto donde todos los tallos se juntan.
    const tieY =
        -0.55;


    // Final de los tallos.
    const stemBottomY =
        -5.15;


    const goldenAngle =
        Math.PI *
        (
            3 -
            Math.sqrt(5)
        );


    // ========================================================
    // FUNCIÓN AUXILIAR:
    // TALLO ENTRE DOS PUNTOS
    // ========================================================

    function stemBetween(
        start,
        end,
        radius = 0.055
    ) {

        const direction =
            new THREE.Vector3()
                .subVectors(
                    end,
                    start
                );


        const length =
            direction.length();


        const geometry =
            new THREE.CylinderGeometry(

                radius * 0.82,

                radius,

                length,

                7
            );


        const stem =
            new THREE.Mesh(

                geometry,

                M.stem
            );


        const middle =
            new THREE.Vector3()
                .addVectors(
                    start,
                    end
                )
                .multiplyScalar(
                    0.5
                );


        stem.position.copy(
            middle
        );


        stem.quaternion.setFromUnitVectors(

            new THREE.Vector3(
                0,
                1,
                0
            ),

            direction
                .clone()
                .normalize()
        );


        return stem;
    }

// ========================================================
// DISTRIBUCIÓN DEL RAMO PRINCIPAL
// FORMA DE RAMO REAL / FLORISTERÍA
// ========================================================
//
// Ya NO hacemos una esfera.
//
// La silueta será:
//
//             🌹🌹🌹🌹
//          🌹🌹🌹🌹🌹🌹
//        🌹🌹🌹🌹🌹🌹🌹🌹
//       🌹🌹🌹🌹🌹🌹🌹🌹🌹
//        🌹🌹🌹🌹🌹🌹🌹
//           🍃🍃🍃🍃
//              \|/
//               🎀
//               ||
//               ||
//
// Y como cada anillo es 360°, la misma forma se conserva
// desde delante, atrás, izquierda y derecha.
// ========================================================

const rosePositions = [];


// ========================================================
// ANILLOS DEL RAMO
// ========================================================
//
// Cada elemento:
//
// count  = rosas del anillo
// radius = radio horizontal
// y      = altura
// tilt   = inclinación hacia afuera
//
// TOTAL = 60 ROSAS.
//
//  5
//  9
// 13
// 15
// 11
//  7
// --
// 60
// ========================================================

const bouquetRings = [

    // Centro superior.
    {
        count: 5,
        radius: 0.85,
        y: 6.25,
        tilt: 0.025
    },

    // Corona alta.
    {
        count: 9,
        radius: 1.85,
        y: 5.85,
        tilt: 0.045
    },

    // Parte superior ancha.
    {
        count: 13,
        radius: 3.05,
        y: 5.25,
        tilt: 0.075
    },

    // Parte más ancha del ramo.
    {
        count: 15,
        radius: 4.15,
        y: 4.35,
        tilt: 0.11
    },

    // Parte inferior comienza a cerrarse.
    {
        count: 11,
        radius: 3.35,
        y: 3.35,
        tilt: 0.13
    },

    // Cuello inferior de flores.
    {
        count: 7,
        radius: 2.15,
        y: 2.55,
        tilt: 0.12
    }
];


// ========================================================
// CREAR POSICIONES
// ========================================================

let globalRoseIndex = 0;


for (
    let ringIndex = 0;
    ringIndex < bouquetRings.length;
    ringIndex++
) {

    const ring =
        bouquetRings[ringIndex];


    // Cada anillo empieza en un ángulo diferente.
    // Así las rosas quedan intercaladas y no forman
    // columnas verticales artificiales.

    const ringOffset =

        ringIndex *
        1.137

        +

        (
            ringIndex % 2
        )

        *
        0.31;


    for (
        let j = 0;
        j < ring.count;
        j++
    ) {

        const angle =

            (
                j /
                ring.count
            )

            *
            Math.PI *
            2

            +

            ringOffset;


        // Pequeñísima variación.
        // Lo suficiente para que parezca natural,
        // pero no tanta como para abrir huecos.

        const radius =

            ring.radius

            +

            (
                Math.random() -
                0.5
            )

            *
            0.12;


        const x =

            Math.cos(angle) *
            radius;


        const z =

            Math.sin(angle) *
            radius;


        const y =

            ring.y

            +

            (
                Math.random() -
                0.5
            )

            *
            0.12;


        rosePositions.push({

            x: x,

            y: y,

            z: z,

            angle: angle,

            radius: radius,

            tilt: ring.tilt,

            ringIndex: ringIndex,

            index: globalRoseIndex
        });


        globalRoseIndex++;
    }
}

    // ========================================================
    // CREAR LAS 60 ROSAS
    // ========================================================

    for (
        let i = 0;
        i < rosePositions.length;
        i++
    ) {

        const p =
            rosePositions[i];


        const normalizedRadius =

            THREE.MathUtils.clamp(

                p.radius /
                4.15,
                0,
                1
            );


        const roseScale = 0.72 + normalizedRadius * 0.055 + Math.random() * 0.025;

        const rose =
            createRose(

                roseScale,

                false
            );


        rose.position.set(

            p.x,

            p.y,

            p.z
        );


        // ====================================================
        // ORIENTACIÓN REALMENTE RADIAL
        // ====================================================
        //
        // Todas miran principalmente hacia arriba.
        //
        // Las exteriores se abren ligeramente hacia afuera
        // en TODAS las direcciones.
        //
        // No depende de la cámara.
        // ====================================================

        const outwardTilt =

            p.tilt;


        rose.rotation.x =

            Math.sin(
                p.angle
            )

            *
            outwardTilt;


        rose.rotation.z =

            -Math.cos(
                p.angle
            )

            *
            outwardTilt;


        rose.rotation.y =

            p.angle

            +

            (
                Math.random() -
                0.5
            )

            *
            0.10;


        rosesGroup.add(
            rose
        );


        // ====================================================
        // TALLO SUPERIOR
        // ====================================================
        //
        // Este es el cambio importante:
        //
        // TODOS convergen hacia prácticamente EL MISMO PUNTO.
        //
        // Antes:
        //
        // \  |   /   |
        //  \ |  /    |
        //
        // Ahora:
        //
        // \   |   /
        //  \  |  /
        //   \ | /
        //    \|/
        // ====================================================

        const flowerBase =
            new THREE.Vector3(

                p.x,

                p.y -
                0.38,

                p.z
            );


        // Pequeñísimo radio para que físicamente puedan verse
        // varios tallos sin ocupar exactamente el mismo píxel.
        const tieRadius =
            0.055;


        const tiePoint =
            new THREE.Vector3(

                Math.cos(
                    p.angle
                )

                *
                tieRadius,

                tieY,

                Math.sin(
                    p.angle
                )

                *
                tieRadius
            );


        const upperStem =
            stemBetween(

                flowerBase,

                tiePoint,

                0.052

                +

                Math.random() *
                0.012
            );


        stemsGroup.add(
            upperStem
        );
    }


    // ========================================================
    // TALLOS DEBAJO DEL LAZO
    // ========================================================
    //
    // Salen desde la cintura y se abren ligeramente.
    // ========================================================

    for (
        let i = 0;
        i < roseCount;
        i++
    ) {

        const angle =

            i *
            goldenAngle;


        // Todos comienzan prácticamente en el mismo punto.
        const startRadius =

            0.10

            +

            (
                i %
                4
            )

            *
            0.018;


        const start =
            new THREE.Vector3(

                Math.cos(
                    angle
                )

                *
                startRadius,

                tieY -
                0.05,

                Math.sin(
                    angle
                )

                *
                startRadius
            );


        // Abajo se separan un poco,
        // como tallos naturales de un ramo.
        const bottomRadius =

            0.48

            +

            (
                i %
                8
            )

            *
            0.035;


        const end =
            new THREE.Vector3(

                Math.cos(
                    angle
                )

                *
                bottomRadius,

                stemBottomY

                +

                (
                    Math.random() -
                    0.5
                )

                *
                0.25,

                Math.sin(
                    angle
                )

                *
                bottomRadius
            );


        const lowerStem =
            stemBetween(

                start,

                end,

                0.048

                +

                Math.random() *
                0.010
            );


        stemsGroup.add(
            lowerStem
        );
    }


    // ========================================================
    // COLLAR DE HOJAS
    // ========================================================
    //
    // Hojas colocadas radialmente.
    // También son 360°, no orientadas hacia la cámara.
    // ========================================================

    const collarLeaves =
        24;


    for (
        let i = 0;
        i < collarLeaves;
        i++
    ) {

        const angle =

            i /
            collarLeaves

            *
            Math.PI *
            2;


        const radius =

            3.65

            +

            (
                i %
                3
            )

            *
            0.24;


        const leaf =
            createLeaf(

                0.68

                +

                Math.random() *
                0.13,

                i % 4 === 0

                    ? M.leafDark

                    : M.leaf
            );


        leaf.position.set(

            Math.cos(
                angle
            )

            *
            radius,

            2.25

            +

            (
                i %
                4
            )

            *
            0.16,

            Math.sin(
                angle
            )

            *
            radius
        );


        // La hoja apunta radialmente hacia afuera.
        leaf.rotation.order =
            "YXZ";


        leaf.rotation.y =

            -angle

            +

            Math.PI /
            2;


        leaf.rotation.z =

            (
                i %
                2 === 0
            )

                ? -0.72

                : 0.72;


        leaf.rotation.x =

            (
                Math.random() -
                0.5
            )

            *
            0.20;


        leavesGroup.add(
            leaf
        );
    }


    // ========================================================
    // HOJAS INTERIORES
    // ========================================================
    //
    // Pocas hojas entre las rosas.
    // No queremos tapar las 60 cabezas.
    // ========================================================

    const innerLeaves =
        16;


    for (
        let i = 0;
        i < innerLeaves;
        i++
    ) {

        const angle =

            i *
            goldenAngle

            +
            0.65;


        const radius =

            1.9

            +

            (
                i %
                5
            )

            *
            0.42;


        const leaf =
            createLeaf(

                0.48

                +

                Math.random() *
                0.10,

                i % 3 === 0

                    ? M.leafDark

                    : M.leaf
            );


        leaf.position.set(

            Math.cos(
                angle
            )

            *
            radius,

            2.7

            +

            (
                i %
                4
            )

            *
            0.45,

            Math.sin(
                angle
            )

            *
            radius
        );


        leaf.rotation.order =
            "YXZ";


        leaf.rotation.y =

            -angle

            +

            Math.PI /
            2;


        leaf.rotation.z =

            (
                i %
                2 === 0
            )

                ? -0.55

                : 0.55;


        leavesGroup.add(
            leaf
        );
    }


    // ========================================================
    // LAZO AMARILLO 3D
    // ========================================================

    const bow =
        createMainBouquetBow();


    bow.position.set(

        0,

        tieY,

        0
    );


    // Ponemos el lazo después de los tallos
    // para que visualmente los envuelva.
    bouquet.add(
        bow
    );


    return bouquet;
}


// ============================================================
// LAZO 3D DEL RAMO PRINCIPAL
// ============================================================
//
// Este lazo rodea realmente los tallos.
//
// Tiene:
//
// - cinta circular alrededor de la cintura
// - nudo
// - cuatro bucles distribuidos alrededor
// - cuatro colas
//
// Así no desaparece completamente cuando se gira el ramo.
// ============================================================

function createMainBouquetBow() {

    const bow =
        new THREE.Group();


    const yellowMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0xffd326,

            roughness:
                0.50,

            metalness:
                0.02,

            side:
                THREE.DoubleSide
        });


    // ========================================================
    // CINTA QUE APRIETA LOS TALLOS
    // ========================================================

    const band =
        new THREE.Mesh(

            new THREE.TorusGeometry(

                0.31,

                0.105,

                10,

                32
            ),

            yellowMaterial
        );


    // Torus originalmente está en XY.
    // Lo ponemos horizontal alrededor del eje Y.
    band.rotation.x =
        Math.PI /
        2;


    bow.add(
        band
    );


    // ========================================================
    // NUDO PRINCIPAL
    // ========================================================

    const knot =
        ellipsoid(

            0.48,

            0.38,

            0.42,

            yellowMaterial,

            16
        );


    knot.position.set(

        0,

        0,

        0.34
    );


    bow.add(
        knot
    );


    // ========================================================
    // BUCLES 3D
    // ========================================================

    for (
        let i = 0;
        i < 4;
        i++
    ) {

        const angle =

            i /
            4

            *
            Math.PI *
            2;


        const loop =
            ellipsoid(

                0.82,

                0.38,

                0.17,

                yellowMaterial,

                14
            );


        loop.position.set(

            Math.cos(
                angle
            )

            *
            0.63,

            0.02,

            Math.sin(
                angle
            )

            *
            0.63
        );


        loop.rotation.y =

            -angle;


        loop.rotation.z =

            Math.sin(
                angle
            )

            *
            0.25;


        bow.add(
            loop
        );
    }


    // ========================================================
    // COLAS DEL LAZO
    // ========================================================

    for (
        let i = 0;
        i < 4;
        i++
    ) {

        const angle =

            Math.PI /
            4

            +

            i /
            4

            *
            Math.PI *
            2;


        const tail =
            ellipsoid(

                0.20,

                0.95,

                0.095,

                yellowMaterial,

                10
            );


        tail.position.set(

            Math.cos(
                angle
            )

            *
            0.34,

            -0.72,

            Math.sin(
                angle
            )

            *
            0.34
        );


        tail.rotation.y =

            -angle;


        tail.rotation.z =

            Math.cos(
                angle
            )

            *
            0.16;


        bow.add(
            tail
        );
    }


    return bow;
}

const mainBouquet =
    createMainRoseBouquet(

        CONFIG
            .mainBouquet
            .roses
        
    )


// Posición:
// X = centro
// Y = encima del agujero negro
// Z = ligeramente hacia delante

mainBouquet.position.set(

    0,

    12.0,

    1.5

);


// Más grande que los otros ramos.

mainBouquet.scale.setScalar(
    0.92
);


// Prácticamente de frente.

mainBouquet.rotation.set(

    0,

    0,

    0

);


mainBouquet.userData = {

    baseY:
        mainBouquet.position.y,

    offset:
        0,

    main:
        true

};


universe.add(
    mainBouquet
);


bouquets.push(
    mainBouquet
);


// ============================================================
// TEXTO SPRITE
// ============================================================

function createTextSprite(
    text
) {

    const canvas =
        document.createElement(
            "canvas"
        );


    canvas.width =
        1200;


    canvas.height =
        320;


    const ctx =
        canvas.getContext(
            "2d"
        );


    ctx.textAlign =
        "center";


    ctx.textBaseline =
        "middle";


    ctx.font =
        "42px Arial";


    ctx.fillStyle =
        "#fff1a8";


    ctx.shadowColor =
        "#ffb300";


    ctx.shadowBlur =
        16;


    const lines =
        text.split(
            "\n"
        );


    lines.forEach(
        (
            line,
            index
        ) => {

            ctx.fillText(

                line,

                canvas.width /
                2,

                canvas.height /
                2

                +

                (
                    index

                    -

                    (
                        lines.length -
                        1
                    )
                    /
                    2
                )

                *

                54
            );
        }
    );


    const texture =
        new THREE.CanvasTexture(
            canvas
        );


    texture.colorSpace =
        THREE.SRGBColorSpace;


    const material =
        new THREE.SpriteMaterial({

            map:
                texture,

            transparent:
                true,

            opacity:
                0.8,

            depthWrite:
                false
        });


    const sprite =
        new THREE.Sprite(
            material
        );


    sprite.scale.set(
        13,
        3.5,
        1
    );


    return sprite;
}


// ============================================================
// MENSAJES
// ============================================================

const textSprites =
    [];


// ============================================================
// MENSAJES DISTRIBUIDOS UNIFORMEMENTE EN 3D
// ============================================================

CONFIG.messages.forEach(
    (
        text,
        index
    ) => {

        const sprite =
            createTextSprite(
                text
            );


        const total =
            CONFIG.messages.length;


        // ====================================================
        // DISTRIBUCIÓN ESFÉRICA
        // ====================================================
        //
        // Evita que todos los mensajes estén en un solo plano
        // o concentrados en un lado.
        // ====================================================

        const goldenAngle =
            Math.PI *
            (
                3 -
                Math.sqrt(5)
            );


        const yNormalized =

            1

            -

            (
                (
                    index +
                    0.5
                )

                /

                total
            )

            *
            2;


        const horizontalRadius =

            Math.sqrt(

                Math.max(

                    0,

                    1 -
                    yNormalized *
                    yNormalized
                )
            );


        const angle =

            index *
            goldenAngle

            +

            0.65;


        // ====================================================
        // DISTANCIAS
        // ====================================================
        //
        // Alternamos entre 3 capas para que los mensajes
        // no formen una sola esfera.
        // ====================================================

        let radius;


        if (
            index % 3 === 0
        ) {

            radius =
                24;
        }

        else if (
            index % 3 === 1
        ) {

            radius =
                32;
        }

        else {

            radius =
                40;
        }


        // ====================================================
        // POSICIÓN 3D
        // ====================================================

        sprite.position.set(

            Math.cos(angle)
            *
            horizontalRadius
            *
            radius,

            yNormalized
            *
            radius
            *
            0.78,

            Math.sin(angle)
            *
            horizontalRadius
            *
            radius
        );


        // ====================================================
        // PEQUEÑA VARIACIÓN
        // ====================================================

        sprite.position.x +=

            (
                Math.random() -
                0.5
            )

            *
            2;


        sprite.position.y +=

            (
                Math.random() -
                0.5
            )

            *
            2;


        sprite.position.z +=

            (
                Math.random() -
                0.5
            )

            *
            2;


        // ====================================================
        // DATOS PARA ANIMACIÓN
        // ====================================================

        sprite.userData = {

            baseY:
                sprite.position.y,

            baseX:
                sprite.position.x,

            baseZ:
                sprite.position.z,

            offset:

                index *
                0.73

                +

                Math.random() *
                Math.PI,

            floatSpeed:

                0.25

                +

                Math.random() *
                0.30

        };


        universe.add(
            sprite
        );


        textSprites.push(
            sprite
        );
    }
);


// ============================================================
// ELEMENTOS HTML
// ============================================================

const intro =
    document.getElementById(
        "intro"
    );


const flowerButton =
    document.getElementById(
        "flowerButton"
    );


const flash =
    document.getElementById(
        "flash"
    );


const galaxyTitle =
    document.getElementById(
        "galaxyTitle"
    );


const desktopHelp =
    document.getElementById(
        "desktopHelp"
    );


const mobileHelp =
    document.getElementById(
        "mobileHelp"
    );


// ============================================================
// ESTADO
// ============================================================

let started =
    false;


let introProgress =
    0;


universe.visible =
    false;


// ============================================================
// INICIAR EXPERIENCIA
// ============================================================

function startExperience() {

    if (started)
        return;


    started =
        true;


    universe.visible =
        true;


    universe.scale.setScalar(
        0.04
    );


    portal.scale.setScalar(
        0.1
    );


    flash.animate(

        [

            {
                opacity:
                    0
            },

            {
                opacity:
                    0.15
            },

            {
                opacity:
                    1
            },

            {
                opacity:
                    0.25
            },

            {
                opacity:
                    0
            }

        ],

        {

            duration:
                1800,

            easing:
                "ease-out"

        }
    );


    intro.classList.add(
        "disappear"
    );


    setTimeout(
        () => {

            galaxyTitle
                .classList
                .add(
                    "visible"
                );


            if (
                matchMedia(
                    "(max-width:700px)"
                ).matches
            ) {

                mobileHelp
                    .classList
                    .add(
                        "visible"
                    );

            } else {

                desktopHelp
                    .classList
                    .add(
                        "visible"
                    );
            }

        },

        700
    );


    setTimeout(
        () => {

            intro.style.display =
                "none";

        },

        1900
    );
}


flowerButton.addEventListener(
    "click",
    startExperience
);


// ============================================================
// CONTROLES
// ============================================================

let dragging =
    false;


let lastX =
    0;


let lastY =
    0;


let targetRotX =
    0;


let targetRotY =
    0;


let velocityX =
    0;


let velocityY =
    0;


let targetZoom =
    42;


const canvas =
    renderer.domElement;


// ============================================================
// ARRASTRAR
// ============================================================

canvas.addEventListener(
    "pointerdown",
    event => {

        if (!started)
            return;


        dragging =
            true;


        lastX =
            event.clientX;


        lastY =
            event.clientY;


        canvas.setPointerCapture?.(
            event.pointerId
        );


        document.body
            .classList
            .add(
                "dragging"
            );
    }
);


canvas.addEventListener(
    "pointermove",
    event => {

        if (!dragging)
            return;


        const deltaX =
            event.clientX -
            lastX;


        const deltaY =
            event.clientY -
            lastY;


        lastX =
            event.clientX;


        lastY =
            event.clientY;


        velocityY =
            deltaX *
            0.0035;


        velocityX =
            deltaY *
            0.0035;


        targetRotY +=
            velocityY;


        targetRotX +=
            velocityX;


        targetRotX =
            THREE.MathUtils.clamp(
                targetRotX,
                -1.1,
                1.1
            );
    }
);


function stopDrag() {

    dragging =
        false;


    document.body
        .classList
        .remove(
            "dragging"
        );
}


canvas.addEventListener(
    "pointerup",
    stopDrag
);


canvas.addEventListener(
    "pointercancel",
    stopDrag
);


// ============================================================
// ZOOM CON RUEDA
// ============================================================

canvas.addEventListener(

    "wheel",

    event => {

        if (!started)
            return;


        event.preventDefault();


        targetZoom =
            THREE.MathUtils.clamp(

                targetZoom

                +

                event.deltaY *
                0.012,

                22,

                75
            );
    },

    {
        passive:
            false
    }
);


// ============================================================
// PINCH EN MÓVIL
// ============================================================

let pinchDistance =
    0;


canvas.addEventListener(

    "touchstart",

    event => {

        if (
            event.touches.length ===
            2
        ) {

            pinchDistance =
                Math.hypot(

                    event.touches[0].clientX
                    -
                    event.touches[1].clientX,

                    event.touches[0].clientY
                    -
                    event.touches[1].clientY
                );
        }
    },

    {
        passive:
            true
    }
);


canvas.addEventListener(

    "touchmove",

    event => {

        if (
            event.touches.length ===
            2
        ) {

            const distance =
                Math.hypot(

                    event.touches[0].clientX
                    -
                    event.touches[1].clientX,

                    event.touches[0].clientY
                    -
                    event.touches[1].clientY
                );


            targetZoom =
                THREE.MathUtils.clamp(

                    targetZoom

                    +

                    (
                        pinchDistance
                        -
                        distance
                    )

                    *

                    0.04,

                    22,

                    75
                );


            pinchDistance =
                distance;
        }
    },

    {
        passive:
            true
    }
);


// ============================================================
// ANIMACIÓN
// ============================================================

const clock =
    new THREE.Clock();


function animate() {

    requestAnimationFrame(
        animate
    );


    const elapsed =
        clock.getElapsedTime();


    // Shader.
    diskMaterials.forEach(
        material => {

            material
                .uniforms
                .uTime
                .value =
                elapsed;
        }
    );


    orbitalDust.rotation.z +=
        0.00035;


    whiteStars.rotation.y +=
        0.00008;


    goldenStars.rotation.y -=
        0.00012;


    // Entrada.
    if (started) {

        introProgress =
            THREE.MathUtils.lerp(
                introProgress,
                1,
                0.035
            );


        const scale =
            THREE.MathUtils.lerp(
                0.04,
                1,
                introProgress
            );


        universe.scale.setScalar(
            scale
        );


        portal.scale.setScalar(

            THREE.MathUtils.lerp(
                0.1,
                1,
                introProgress
            )

        );
    }


    // Inercia.
    if (!dragging) {

        targetRotY +=
            velocityY;


        targetRotX +=
            velocityX;


        velocityX *=
            0.94;


        velocityY *=
            0.94;
    }


    universe.rotation.x =
        THREE.MathUtils.lerp(

            universe.rotation.x,

            targetRotX,

            0.08
        );


    universe.rotation.y =
        THREE.MathUtils.lerp(

            universe.rotation.y,

            targetRotY,

            0.08
        );


    camera.position.z =
        THREE.MathUtils.lerp(

            camera.position.z,

            targetZoom,

            0.08
        );


    // Flores individuales.
    floatingFlowers.forEach(
        (
            flower,
            index
        ) => {

            flower.position.y =

                flower.userData.baseY

                +

                Math.sin(

                    elapsed *
                    flower.userData.floatSpeed

                    +

                    flower.userData.offset

                )

                *

                0.35;


            flower.rotation.y =

                flower.userData.baseRotY

                +

                Math.sin(

                    elapsed *
                    0.45

                    +

                    index

                )

                *

                0.12;
        }
    );


    // Ramos.
    bouquets.forEach(
        (
            bouquet,
            index
        ) => {

            bouquet.position.y =

                bouquet.userData.baseY

                +

                Math.sin(

                    elapsed *
                    0.35

                    +

                    bouquet.userData.offset

                )

                *

                0.42;


            bouquet.rotation.y +=

                0.00045

                *

                (
                    index % 2
                        ? 1
                        : -1
                );
        }
    );


    // Mensajes.
    textSprites.forEach(
        (
            sprite,
            index
        ) => {

            sprite.material.opacity =

                0.62

                +

                Math.sin(

                    elapsed *
                    0.7

                    +

                    index

                )

                *

                0.12;
        }
    );


    // Bloom controlado.
    bloomPass.strength =

        0.48

        +

        Math.sin(
            elapsed *
            0.7
        )

        *

        0.035;


    composer.render();
}


animate();


// ============================================================
// RESPONSIVE
// ============================================================

addEventListener(
    "resize",
    () => {

        camera.aspect =
            innerWidth /
            innerHeight;


        camera.updateProjectionMatrix();


        renderer.setSize(
            innerWidth,
            innerHeight
        );


        composer.setSize(
            innerWidth,
            innerHeight
        );


        bloomPass
            .resolution
            .set(
                innerWidth,
                innerHeight
            );
    }
);