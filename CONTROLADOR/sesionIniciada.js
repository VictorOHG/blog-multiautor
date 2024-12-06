async function verificarSesion() {
    try {
        const response = await fetch("http://localhost:3000/users/isAuthenticated", {
            method: "GET",
            credentials: "include", // Importante para enviar cookies al backend
        });

        const result = await response.json();

        if (result.success) {
            console.log("Sesión activa:", result.user);
            // Aquí puedes mostrar información del usuario o redirigir a una página
        } else {
            console.log("No hay una sesión activa");
            // Redirigir a la página de inicio de sesión si es necesario
            window.location.href = "/login.html";
        }
    } catch (error) {
        console.error("Error al verificar la sesión:", error);
    }
}

// Llamar a la función al cargar la página
document.addEventListener("DOMContentLoaded", verificarSesion);