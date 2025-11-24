function loadHTML(url, elementId, callback) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar ${url}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(html => {
            const targetElement = document.getElementById(elementId);
            if (!targetElement) {
                console.warn(`Elemento com ID '${elementId}' não encontrado.`);
                return;
            }

            const template = document.createElement('template');
            template.innerHTML = html;
            targetElement.appendChild(template.content);

            const scripts = targetElement.querySelectorAll("script");
            scripts.forEach(oldScript => {
                const newScript = document.createElement("script");
                Array.from(oldScript.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });
                newScript.textContent = oldScript.textContent;
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });

            if (typeof callback === "function") callback();
        })
        .catch(error => {
            console.error(error);
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = `<p>Erro ao carregar o conteúdo.</p>`;
            }
        });
}

document.addEventListener("DOMContentLoaded", function() {
    loadHTML("/HTML/partials/header.html", "header-placeholder");
    loadHTML("/HTML/partials/sidebar.html", "sidebar-placeholder");
});
