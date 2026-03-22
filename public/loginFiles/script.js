const form = document.getElementById('loginForm');
        const mensajeDiv = document.getElementById('mensaje');

        form.addEventListener('submit', async (e) => {
            e.preventDefault(); // 1. Evita que la página se recargue

            mensajeDiv.innerText = "Cargando...";

            // 2. Recogemos los datos del formulario
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            try {
                // 3. Enviamos los datos a tu servidor (ejemplo: /api/login)
                const respuesta = await fetch('/api/login', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                // 4. Procesamos la respuesta del servidor
                if (respuesta.ok) {
                    mensajeDiv.style.color = "green";
                    mensajeDiv.innerText = "¡Bienvenido! Redirigiendo...";
                    // Aquí podrías usar: window.location.href = "/dashboard";
                } else {
                    mensajeDiv.style.color = "red";
                    mensajeDiv.innerText = "Error: Usuario o contraseña incorrectos.";
                }
            } catch (error) {
                mensajeDiv.innerText = "Hubo un error en la conexión.";
            }
        });