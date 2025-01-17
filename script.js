// Floating icons
const iconPaths = [
    'https://win98icons.alexmeub.com/icons/png/computer-4.png',
    'https://win98icons.alexmeub.com/icons/png/directory_closed-4.png',
    'https://win98icons.alexmeub.com/icons/png/notepad-3.png',
    'https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-4.png',
    'https://win98icons.alexmeub.com/icons/png/msie1-4.png',
    'https://win98icons.alexmeub.com/icons/png/console_prompt-0.png'
];

function createFloatingIcon() {
    const icon = document.createElement('img');
    icon.className = 'floating-icon';
    icon.src = iconPaths[Math.floor(Math.random() * iconPaths.length)];
    
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    
    icon.style.left = `${startX}px`;
    icon.style.top = `${startY}px`;
    
    document.getElementById('floating-icons-container').appendChild(icon);
    
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.5 + Math.random() * 1;
    
    let posX = startX;
    let posY = startY;
    
    function moveIcon() {
        posX += Math.cos(angle) * speed;
        posY += Math.sin(angle) * speed;
        
        icon.style.left = `${posX}px`;
        icon.style.top = `${posY}px`;
        
        if (posX < -50 || posX > window.innerWidth + 50 || 
            posY < -50 || posY > window.innerHeight + 50) {
            icon.remove();
            createFloatingIcon();
        } else {
            requestAnimationFrame(moveIcon);
        }
    }
    
    moveIcon();
}

// Sound effects
function initSoundEffects() {
    const clickSound = document.getElementById('clickSound');
    const hoverSound = document.getElementById('hoverSound');
    
    document.querySelectorAll('button, a').forEach(element => {
        element.addEventListener('click', () => {
            clickSound.currentTime = 0;
            clickSound.play();
        });
        
        element.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.play();
        });
    });

    clickSound.volume = 0.3;
    hoverSound.volume = 0.2;
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create floating icons
    for (let i = 0; i < 10; i++) {
        createFloatingIcon();
    }

    // Initialize sound effects
    initSoundEffects();
}); 