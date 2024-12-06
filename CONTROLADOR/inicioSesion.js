

document.getElementById("iniciarSesion").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita que el formulario se envíe por defecto

    // Obtén los valores del formulario
    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;

    // Crea el objeto con los datos del usuario
    const datos = { username: usuario, contrasena: contrasena };

    try {
        // Envía los datos al backend
        const response = await fetch("http://localhost:3000/users/getSesion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        });

        const result = await response.json();

        if (result.success) {
            alert("Inicio exitoso.");
            localStorage.setItem("usuarioLogueado", JSON.stringify(result.user));
            // Redirige al usuario a la página principal
            window.location.href = "../usuario.html";
        } else {
            alert(result.message || "No se pudo iniciar sesión. Verifica tus datos.");
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Hubo un problema al intentar iniciar sesión.");
    }
});
