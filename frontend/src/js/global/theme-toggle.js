document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.createElement('button');
    toggleButton.id = 'theme-toggle';
    toggleButton.className = 'theme-toggle-btn';
    toggleButton.innerHTML = '<i class="fas fa-moon"></i>'; // Default icon
    toggleButton.setAttribute('aria-label', 'Toggle Dark Mode');

    // Append to nav-auth (inside nav-links)
    const navAuth = document.querySelector('.nav-auth');
    if (navAuth) {
        navAuth.appendChild(toggleButton);
    } else {
        // Fallback to nav-container if nav-auth not found
        const navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            navContainer.appendChild(toggleButton);
        }
    }

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);

    toggleButton.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        if (theme === 'dark') {
            toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
            toggleButton.style.color = '#ffd700'; // Yellow sun
        } else {
            toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
            toggleButton.style.color = '#ffffff'; // White moon
        }
    }
});
