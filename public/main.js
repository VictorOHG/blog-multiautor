document.addEventListener("DOMContentLoaded", function () {
    const userLink = document.getElementById("userLink");

    if (!userLink) {
        console.error("Elemento con id 'userLink' no encontrado.");
        return;
    }

    // Verificar si hay un usuario logueado en localStorage
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");

    if (usuarioLogueado) {
        try {
            const usuario = JSON.parse(usuarioLogueado);

            // Si el usuario tiene un nombre, mostrarlo
            if (usuario.nombre) {
                userLink.textContent = `Hola, ${usuario.nombre}`;
                userLink.href = "#"; // Opcional: redirección personalizada para usuarios logueados
            } else {
                throw new Error("El usuario logueado no tiene un nombre válido.");
            }
        } catch (error) {
            console.error("Error al parsear el usuario logueado:", error);
            resetUserLink();
        }
    } else {
        // No hay usuario logueado, restablecer a "Registrarse"
        resetUserLink();
    }

    function resetUserLink() {
        userLink.textContent = "Registrarse";
        userLink.href = "VISTA/contact.html";
    }
});
