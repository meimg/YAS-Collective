gsap.config({ trialWarn: false });
gsap.registerPlugin(ScrollTrigger);

// Concerts 

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#container",
    start: "top top",
    end: "+=2000",
    pin: true,
    scrub: 1
  }
});

tl.to("#container", { "--target": "0%", ease: "none" }, 0);
tl.to(".col1", { y: -50, ease: "none" }, 0);
tl.to(".col2", { y: 200, ease: "none" }, 0);
tl.to(".col3", { y: 100, ease: "none" }, 0);


// Audio 
const initAudio = () => {
    const image = document.getElementById('trigger-img');
    const audio = document.getElementById('audio-player');
    if (image && audio) {
        image.addEventListener('click', () => {
            if (audio.paused) {
                audio.play().catch(e => console.log("Error:", e));
                document.body.classList.add('bg-active');
            } else {
                audio.pause();
                audio.currentTime = 0;
                document.body.classList.remove('bg-active');
            }
        });
    }
};

window.addEventListener('load', () => {
    initAudio();
    initRevelado();
});

// Nav 

window.addEventListener('scroll', function() {
    const header = document.getElementById('mainHeader');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});








const cursor = document.querySelector(".cursor-custom");

// Creamos un objeto para trackear la posición visual del cursor
let visualPos = { x: 0, y: 0 };

window.addEventListener("mousemove", (e) => {
    // 1. Movemos el cursor principal
    // Usamos onUpdate para sincronizar la posición visual exacta
    gsap.to(visualPos, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
        onUpdate: () => {
            // Aplicamos la posición al elemento del cursor
            gsap.set(cursor, { x: visualPos.x, y: visualPos.y });
            
            // 2. CREAMOS EL RASTRO AQUÍ
            // Ahora nace de visualPos (el asterisco), no de e.clientX (el ratón real)
            createTrail(visualPos.x, visualPos.y);
        }
    });
});

function createTrail(x, y) {
    const dot = document.createElement("div");
    dot.className = "trail-dot";
    document.body.appendChild(dot);

    // Posición exacta del rastro
    gsap.set(dot, { 
        x: x, 
        y: y, 
        xPercent: -50, 
        yPercent: -50 
    });

    // Animación de la estela
    gsap.to(dot, {
        opacity: 0,
        scale: 0,
        duration: 0.6,
        ease: "power1.out",
        onComplete: () => dot.remove()
    });
}






window.addEventListener('load', () => {
    const tlLoader = gsap.timeline({
        onComplete: () => {
            // Eliminamos el loader para que no consuma recursos
            document.getElementById("loader").remove();
        }
    });

    // 1. Aparece el asterisco rotando
    tlLoader.from(".loader-star", {
        scale: 0,
        rotation: -180,
        duration: 1,
        ease: "back.out(1.7)"
    });

 

    // 3. EXPLOSIÓN FINAL: El asterisco crece hasta cubrir toda la pantalla
    // y el fondo se desvanece
    tlLoader.to(".loader-star", {
        scale: 50, // Crece tanto que se vuelve blanco total y luego desaparece
        duration: 1.5,
        ease: "expo.inOut"
    }, "+=0.5");

    tlLoader.to("#loader", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.6");

    // 4. Animación de entrada de tus elementos reales (opcional)
    // Esto hace que tu collage aparezca con un pequeño "fade in"
    tlLoader.from(".collage", {
        y: 50,
        opacity: 0,
        duration: 1
    }, "-=0.5");
});



  



 



