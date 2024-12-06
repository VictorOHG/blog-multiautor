document.getElementById("registrarUsuario").addEventListener("submit", async function (event) {
    event.preventDefault(); // Evitar el envío predeterminado del formulario

    // Obtener los datos del formulario
    const usuario = document.getElementById("usuario").value;
    const email = document.getElementById("email").value;
    const contrasena = document.getElementById("contrasena").value;

    // Crear el objeto de datos
    const datos = { username: usuario, email: email, contrasena: contrasena };

    try {
        // Enviar los datos al backend
        const response = await fetch("http://localhost:3000/users/postUsers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const result = await response.json();
        alert("Usuario registrado exitosamente.");
        window.location.href = "../VISTA/iniciarSesion.html";
        console.log(result);
        
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        alert("Hubo un problema al registrar el usuario.");
    }
});

