// Recupera carrito de localStorage o inicia vacío
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para mostrar mensaje tipo toast
function mostrarToast(mensaje) {
  // Crear contenedor si no existe
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.position = 'fixed';
    toastContainer.style.top = '20px';
    toastContainer.style.right = '20px';
    toastContainer.style.zIndex = '9999';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.textContent = mensaje;
  toast.style.background = '#b10101';
  toast.style.color = '#fff';
  toast.style.padding = '10px 20px';
  toast.style.borderRadius = '5px';
  toast.style.marginTop = '10px';
  toast.style.boxShadow = '0 4px 6px rgba(0,0,0,0.2)';
  toast.style.opacity = '0';
  toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  toastContainer.appendChild(toast);

  // Animación de entrada
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  // Desaparece después de 2.5s
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px)';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// Actualiza contador en navbar
function actualizarContadoresCarrito() {
  const total = cart.reduce((acc, item) => acc + (parseInt(item.quantity) || 0), 0);
  
  // === INICIO DE LA CORRECCIÓN ===
  // Buscamos los IDs correctos que definimos en el HTML
  const desktop = document.getElementById('contador-carrito-desktop'); 
  // === FIN DE LA CORRECCIÓN ===
  
  const mobile = document.getElementById('contador-carrito-mobile');

  if (desktop) desktop.textContent = total;
  if (mobile) mobile.textContent = total;
}

// Guarda carrito en localStorage y actualiza contador
function guardarCarrito() {
  localStorage.setItem('cart', JSON.stringify(cart));
  actualizarContadoresCarrito();
}

// Agrega producto al carrito
function agregarAlCarrito(producto, inputCantidad) {
  const index = cart.findIndex(item => item.id === producto.id);

  if (index !== -1) {
      cart[index].quantity += producto.quantity;
  } else {
      cart.push(producto);
  }

  guardarCarrito();
  mostrarToast(`${producto.name} agregado al carrito ✅`);

  // Reiniciar input de cantidad a 1
  if (inputCantidad) inputCantidad.value = 1;
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadoresCarrito();

  document.querySelectorAll('.btn-agregar').forEach(btn => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.card');
        const nombre = btn.dataset.name || card.querySelector('h2').textContent;
        const img = btn.dataset.img || card.querySelector('img').src;
        const idBase = nombre.toLowerCase().replace(/\s+/g, '-');

        const cantidadInput = card.querySelector('.cantidad-input');
        let cantidad = parseInt(cantidadInput.value);
        if (!cantidad || cantidad < 1) cantidad = 1;

        // 🆕 Detecta si hay select con opciones
        const selectOpcion = card.querySelector('.opcion-select');
        const opcionTexto = selectOpcion ? ` (${selectOpcion.value})` : '';
        const id = selectOpcion ? `${idBase}-${selectOpcion.value.replace(/\s+/g, '-').toLowerCase()}` : idBase;

        const producto = {
          id: id,
          name: nombre + opcionTexto,
          img: img,
          quantity: cantidad
        }; 

        agregarAlCarrito(producto, cantidadInput);
      });
  });
});


// Escucha cambios en localStorage desde otras pestañas
window.addEventListener('storage', (e) => {
  if (e.key === 'cart') {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    actualizarContadoresCarrito();
  }
});