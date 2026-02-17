// stock-broker-vanilla/js/router.js

const viewContainer = document.getElementById('view-container');
const modalContainer = document.getElementById('modal-container');

const routes = {
    'home': {
        path: 'pages/home.html',
        script: 'js/views/homeView.js'
    },
    // Add other routes here as you convert pages
};

export const router = {
    navigate: async (routeName, params = {}) => {
        const route = routes[routeName];
        if (!route) {
            console.error('Route not found:', routeName);
            return;
        }

        try {
            // Load HTML
            const response = await fetch(route.path);
            const html = await response.text();
            viewContainer.innerHTML = html;

            // Load and execute JavaScript for the view
            if (route.script) {
                // Remove previous view script if any
                const oldScript = document.getElementById('current-view-script');
                if (oldScript) {
                    oldScript.remove();
                }

                // Load new script
                const script = document.createElement('script');
                script.id = 'current-view-script';
                script.type = 'module';
                script.src = route.script;
                script.onload = () => {
                    // Optionally pass parameters to the view's script
                    window.currentViewParams = params;
                    // Initialize icons
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                };
                document.body.appendChild(script);
            }

            // Update active navigation item
            document.querySelectorAll('nav button').forEach(button => {
                if (button.dataset.nav === routeName) {
                    button.classList.remove('text-gray-400');
                    button.classList.add('text-gray-900');
                    const icon = button.querySelector('i');
                    if (icon) {
                        icon.dataset.lucide = button.dataset.nav === 'home' ? 'layout-grid' : button.dataset.nav;
                        lucide.createIcons();
                    }
                    button.querySelector('span').classList.add('font-bold');
                } else {
                    button.classList.add('text-gray-400');
                    button.classList.remove('text-gray-900');
                    const icon = button.querySelector('i');
                    if (icon) {
                        // Reset icons for inactive states if needed, or rely on initial HTML setup
                        // For simplicity, just ensure correct color and create icons
                    }
                    button.querySelector('span').classList.remove('font-bold');
                }
            });

            // Scroll to top of the new page
            viewContainer.scrollTop = 0;

        } catch (error) {
            console.error('Error navigating to route ', routeName, ':', error);
        }
    },

    showModal: (modalContentHtml, title = 'Notification', onDone = () => {}) => {
        modalContainer.innerHTML = `
            <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div class="absolute inset-0 bg-gray-900 opacity-60 backdrop-blur-sm" id="modal-overlay"></div>
                <div class="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-300">
                    <div class="flex flex-col items-center text-center">
                        <div class="bg-green-100 p-4 rounded-full mb-6">
                            <i data-lucide="check-circle" class="w-16 h-16 text-green-600"></i>
                        </div>
                        <h2 class="text-3xl font-bold text-gray-900 mb-2">${title}</h2>
                        <p class="text-gray-600 mb-8 leading-relaxed">
                            ${modalContentHtml}
                        </p>
                        <button id="modal-done-button"
                            class="w-full bg-green-600 text-white py-4 rounded-2xl text-xl font-bold hover:bg-green-700 transition-all shadow-md active:scale-95">
                            Done
                        </button>
                    </div>
                </div>
            </div>
        `;
        lucide.createIcons(); // Initialize icons in the modal

        document.getElementById('modal-overlay').addEventListener('click', () => {
            router.hideModal();
            onDone();
        });
        document.getElementById('modal-done-button').addEventListener('click', () => {
            router.hideModal();
            onDone();
        });
    },

    hideModal: () => {
        modalContainer.innerHTML = '';
    }
};

// Initial navigation
document.addEventListener('DOMContentLoaded', () => {
    router.navigate('home');
});
