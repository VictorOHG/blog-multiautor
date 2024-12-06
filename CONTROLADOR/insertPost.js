// **Formulario para Crear Publicaciones**
document.getElementById("crearPublicacion").addEventListener("submit", async function (event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const contenido = document.getElementById("contenido").value;

    try {
        const response = await fetch("http://localhost:3000/publis/postPosts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ titulo, contenido }),
        });

        const result = await response.json();
        if (result.success) {
            const { postId, createdAt } = result.data; // Recuperar `createdAt` del backend
            agregarPublicacion(postId, titulo, contenido, createdAt);
            document.getElementById("crearPublicacion").reset();
            alert("Publicación creada exitosamente.");
        } else {
            alert("Hubo un problema al crear la publicación.");
        }
    } catch (error) {
        console.error("Error al crear publicación:", error);
        alert("Error de conexión con el servidor.");
    }
});

// **Función para agregar publicaciones dinámicamente**
function agregarPublicacion(postId, titulo, contenido, createdAt) {
    const contenedorPublicaciones = document.querySelector("#contenedorPublicaciones");

    // Formatea la fecha en un formato legible
    const fechaPublicacion = new Date(createdAt).toLocaleString();

    const publicacionHTML = `
        <div class="post-preview" data-post-id="${postId}">
            <h2 class="post-title">${titulo}</h2>
            <p class="post-subtitle">${contenido}</p>
            <p class="post-meta">Publicado el ${fechaPublicacion}</p>
            <button class="btn btn-secondary btn-comentar" data-post-id="${postId}">Comentar</button>
            <div class="comentarios-contenedor"></div>
        </div>
        <hr class="my-4" />
    `;
    contenedorPublicaciones.insertAdjacentHTML("beforeend", publicacionHTML);
}

// **Cargar publicaciones existentes**
document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("http://localhost:3000/publis/getPosts");
        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
            result.data.forEach((publicacion) => {
                const { postId, titulo, contenido, createdAt } = publicacion;
                agregarPublicacion(postId, titulo, contenido, createdAt);
            });
        } else {
            console.error("Formato de respuesta inesperado:", result);
        }
    } catch (error) {
        console.error("Error al cargar publicaciones:", error);
    }
});

// **Abrir cuadro de comentarios**
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-comentar")) {
        const postId = event.target.getAttribute("data-post-id");
        mostrarCuadroDeComentario(postId, event.target);
    }
});

function mostrarCuadroDeComentario(postId, boton) {
    const contenedor = boton.closest(".post-preview").querySelector(".comentarios-contenedor");
    contenedor.innerHTML = `
        <textarea class="form-control comentario-input" placeholder="Escribe tu comentario"></textarea>
        <button class="btn btn-primary btn-enviar-comentario" data-post-id="${postId}">Enviar Comentario</button>
    `;
}

// **Enviar comentario al backend**
document.addEventListener("click", async (event) => {
    if (event.target.classList.contains("btn-enviar-comentario")) {
        const postId = event.target.getAttribute("data-post-id");
        const comentarioInput = event.target.closest(".comentarios-contenedor").querySelector(".comentario-input");
        const comentario = comentarioInput.value;

        if (!comentario.trim()) {
            alert("El comentario no puede estar vacío.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/comment/postComments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ comentario, postId }),
            });

            const result = await response.json();
            if (result.success) {
                mostrarComentarioEnDOM(postId, comentario);
                comentarioInput.value = ""; // Limpia el cuadro
                alert("Comentario enviado con éxito.");
            } else {
                alert("Hubo un problema al enviar el comentario.");
            }
        } catch (error) {
            console.error("Error al enviar comentario:", error);
            alert("Error de conexión con el servidor.");
        }
    }
});

// **Mostrar comentario en el DOM**
function mostrarComentarioEnDOM(postId, comentario) {
    const contenedorComentarios = document.querySelector(
        `.post-preview[data-post-id="${postId}"] .comentarios-contenedor`
    );
    const comentarioHTML = `<p>${comentario}</p>`;
    contenedorComentarios.insertAdjacentHTML("beforeend", comentarioHTML);
}
