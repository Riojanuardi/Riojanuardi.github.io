document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const mobileNav = document.querySelector(".nav-links");
  
    if (hamburger && mobileNav) {
        hamburger.addEventListener("click", () => {
            mobileNav.classList.toggle("active");
        });
  
        // Tutup menu ketika klik di luar hamburger atau menu
        document.addEventListener("click", (event) => {
            if (!hamburger.contains(event.target) && !mobileNav.contains(event.target)) {
                mobileNav.classList.remove("active");
            }
        });
    }
  
    // Animasi latar belakang dengan partikel
    const canvas = document.getElementById("backgroundCanvas");
    const ctx = canvas.getContext("2d");
  
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
  
    let particles = [];
    const particleCount = 100;
  
    function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2,
                opacity: Math.random() * 0.5 + 0.5
            });
        }
    }
    
    particlesJS.load('backgroundCanvas', 'particles.json', function() {
        console.log('Particles.js loaded');
    });
    

    createParticles();
  
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
  
            // Pantulkan jika mencapai tepi layar
            if (p.x <= 0 || p.x >= canvas.width) p.speedX *= -1;
            if (p.y <= 0 || p.y >= canvas.height) p.speedY *= -1;
  
            ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
  
        requestAnimationFrame(animateParticles);
    }
  
    animateParticles();
  
    document.addEventListener("scroll", function () {
        document.querySelectorAll(".reveal").forEach(element => {
            const position = element.getBoundingClientRect().top;
            if (position < window.innerHeight - 100) {
                element.classList.add("active");
            }
        });
    });
    
    
    // Toggle Sertifikasi dengan efek transisi
    function toggleCertifications(brand) {
        let allLists = document.querySelectorAll(".certification-list");
  
        allLists.forEach(list => {
            if (list.id !== brand) {
                list.style.display = "none";
                list.style.opacity = "0";
            }
        });
  
        let selectedList = document.getElementById(brand);
  
        if (selectedList.style.display === "none" || selectedList.style.display === "") {
            selectedList.style.display = "grid";
            let opacity = 0;
  
            function fadeIn() {
                if (opacity >= 1) return;
                opacity += 0.1;
                selectedList.style.opacity = opacity;
                requestAnimationFrame(fadeIn);
            }
  
            fadeIn();
        } else {
            selectedList.style.display = "none";
        }
    }
  
    // Tambahkan fungsi toggle ke global scope
    window.toggleCertifications = toggleCertifications;
  });
  

  function toggleDarkMode() {
    const body = document.body;
    console.log("Tombol diklik!");

    body.classList.toggle("dark-mode");

    console.log("Mode saat ini:", body.classList.contains("dark-mode") ? "Gelap" : "Terang");

    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("Cek localStorage:", localStorage.getItem("darkMode"));

    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }
});
