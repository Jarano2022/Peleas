async function verificarSesion() {
    const token = localStorage.getItem('8e5d2d9d3b');
    const headers = { 'Content-Type': 'application/json' };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    try {
        const resp = await fetch('/api/verify', {
            method: 'GET',
            headers,
            credentials: 'same-origin'
        });

        if (!resp.ok) {
            localStorage.removeItem('8e5d2d9d3b');
            window.location.href = '/';
            return;
        }

        const data = await resp.json();
        console.log('Usuario verificado:', data.user);
    } catch (err) {
        localStorage.removeItem('8e5d2d9d3b');
        window.location.href = '/';
    }
}

document.addEventListener('DOMContentLoaded', verificarSesion);
