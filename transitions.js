// Create transition elements
function createTransitionElements() {
    const overlay = document.createElement('div');
    overlay.className = 'transition-overlay';
    
    const glitch = document.createElement('div');
    glitch.className = 'glitch';
    
    const crtLines = document.createElement('div');
    crtLines.className = 'crt-lines';
    
    const loadingText = document.createElement('div');
    loadingText.className = 'loading-text';
    loadingText.innerHTML = 'LOADING...<br>PLEASE WAIT...';
    
    document.body.appendChild(overlay);
    document.body.appendChild(glitch);
    document.body.appendChild(crtLines);
    document.body.appendChild(loadingText);
}

// Initialize page transitions
function initializeTransitions() {
    createTransitionElements();
    
    // Intercept all navigation links and buttons
    document.querySelectorAll('a, button').forEach(element => {
        // Only add transition to elements that navigate to other pages
        const href = element.href || element.getAttribute('data-href');
        if (href && !href.startsWith('javascript:') && !element.target) {
            element.addEventListener('click', handleNavigation);
        }
        // Handle onclick navigation
        if (element.getAttribute('onclick')?.includes('window.location')) {
            element.removeAttribute('onclick');
            element.setAttribute('data-href', 'index.html');
            element.addEventListener('click', handleNavigation);
        }
    });

    // Add sound effects
    addSoundEffects();
}

// Handle navigation events
async function handleNavigation(event) {
    event.preventDefault();
    const targetUrl = event.currentTarget.href || event.currentTarget.getAttribute('data-href');
    if (!targetUrl) return;
    
    // Start transition
    const overlay = document.querySelector('.transition-overlay');
    const glitch = document.querySelector('.glitch');
    const loadingText = document.querySelector('.loading-text');
    
    // Fade in overlay and glitch effect
    overlay.classList.add('transition-active');
    glitch.classList.add('transition-active');
    loadingText.classList.add('active');
    
    // Play glitch sound
    const glitchSound = new Audio('https://www.myinstants.com/media/sounds/glitch-sound-effect.mp3');
    glitchSound.volume = 0.2;
    glitchSound.play();
    
    // Wait for transition animation
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Navigate to new page
    window.location.href = targetUrl;
}

// Add sound effects
function addSoundEffects() {
    const clickSound = new Audio('https://www.myinstants.com/media/sounds/click.mp3');
    clickSound.volume = 0.2;
    
    const hoverSound = new Audio('https://www.myinstants.com/media/sounds/hover.mp3');
    hoverSound.volume = 0.1;
    
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('click', () => {
            clickSound.currentTime = 0;
            clickSound.play();
        });
        
        element.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.play();
        });
    });
}

// Handle page load
window.addEventListener('load', () => {
    initializeTransitions();
    
    // Remove transition overlay if it exists from previous page
    const overlay = document.querySelector('.transition-overlay');
    const glitch = document.querySelector('.glitch');
    const loadingText = document.querySelector('.loading-text');
    
    if (overlay && glitch && loadingText) {
        setTimeout(() => {
            overlay.classList.remove('transition-active');
            glitch.classList.remove('transition-active');
            loadingText.classList.remove('active');
        }, 100);
    }
}); 