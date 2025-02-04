//boton de volver desplazamiento
document.addEventListener("DOMContentLoaded", function () {
    const volverButton = document.querySelector(".volver-button");
    const navbarNav = document.querySelector(".navbar-toggle");
    const desplazamiento = 100; // Ajusta la distancia en píxeles

    if (volverButton && navbarNav) {
        volverButton.addEventListener("click", function (event) {
            event.preventDefault(); // Evita que el enlace navegue inmediatamente
            navbartoggle.style.transition = "transform 0.3s ease-in-out";
            navbartoggle.style.transform = `translateY(${desplazamiento}px)`;
            
            // Opcional: Redirigir después de la animación
            setTimeout(() => {
                window.location.href = volverButton.getAttribute("href");
            }, 300); // Debe coincidir con la duración de la transición
        });
    }
});