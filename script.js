
const themes = {
    matrix: {
        primary: '#00ff00',
        secondary: '#004400',
        bg: '#000000',
        text: '#ffffff',
        accent: '#00aa00'
    },
    cyber: {
        primary: '#00ffff',
        secondary: '#004466',
        bg: '#001122',
        text: '#ffffff',
        accent: '#0088aa'
    },
    synth: {
        primary: '#ff00ff',
        secondary: '#440044',
        bg: '#110022',
        text: '#ffffff',
        accent: '#aa00aa'
    }
};

// Enhanced section transition with typing effect
function showSection(sectionId) {
    // Hide all sections with fade out effect
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        setTimeout(() => {
            section.classList.remove('active');
        }, 300);
    });
    
    // Show selected section with typing effect
    setTimeout(() => {
        const selectedSection = document.getElementById(sectionId);
        selectedSection.classList.add('active');
        selectedSection.style.opacity = '1';
        
        // Add terminal typing effect to headings
        const heading = selectedSection.querySelector('h2');
        const originalText = heading.textContent;
        heading.textContent = '';
        let i = 0;
        
        const typeText = () => {
            if (i < originalText.length) {
                heading.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeText, 50);
            }
        };
        
        typeText();
    }, 300);
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.style.borderColor = 'transparent';
    });
    event.target.style.borderColor = 'var(--accent)';
}

// Terminal cursor effect
const cursor = document.createElement('span');
cursor.textContent = '█';
cursor.style.animation = 'blink 1s infinite';
document.querySelector('.terminal-prompt').appendChild(cursor);

// Add hover effect to project items
document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px)';
        item.style.boxShadow = '0 5px 15px rgba(0, 255, 0, 0.1)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
        item.style.boxShadow = 'none';
    });
});

// Matrix rain effect in background
const canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';
canvas.style.opacity = '0.05';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
const drops = [];
const fontSize = 10;
const columns = canvas.width / fontSize;

for(let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, .1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for(let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if(drops[i] * fontSize > canvas.height && Math.random() > .975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(draw, 35);

// Show About section by default
showSection('about');

  // Command history and autocomplete
  let commandHistory = [];
let historyIndex = -1;

// Initialize theme switcher
function setTheme(themeName) {
    if (!themes[themeName]) return;
    
    const root = document.documentElement;
    const theme = themes[themeName];
    
    Object.entries(theme).forEach(([property, value]) => {
        root.style.setProperty(`--${property}`, value);
    });
    
    showNotification(`Theme switched to ${themeName}`);
    createThemeParticles(theme.primary);
    localStorage.setItem('preferred-theme', themeName);
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Command handling
function handleCommand(command) {
    const [cmd, ...args] = command.toLowerCase().trim().split(' ');
    
    if (cmd === 'theme' && args[0]) {
        if (themes[args[0]]) {
            setTheme(args[0]);
            return true;
        }
        showNotification('Invalid theme. Available themes: matrix, cyber, synth');
        return false;
    }
    
    if (commands[cmd]) {
        commands[cmd]();
        return true;
    }
    
    showNotification('Command not found. Type "help" for available commands.');
    return false;
}

// Download CV function
function downloadCV() {
    showNotification('Redirecting to CV...');
    
    // Direct link to your CV PDF in Google Drive
    const cvUrl = 'https://online.pubhtml5.com/sylfa/hjqf/';
    
    // Open CV in new tab
    window.open(cvUrl, '_blank');
    
    showNotification('CV opened in new tab!');
}

// Share profile function
function shareProfile() {
    if (navigator.share) {
        navigator.share({
            title: 'Aman Maurya - Developer Portfolio',
            text: 'Check out my developer portfolio!',
            url: window.location.href
        })
        .then(() => showNotification('Profile shared successfully!'))
        .catch(() => showNotification('Share cancelled'));
    } else {
        // Fallback for browsers that don't support Web Share API
        const dummy = document.createElement('input');
        document.body.appendChild(dummy);
        dummy.value = window.location.href;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        showNotification('Portfolio URL copied to clipboard!');
    }
}

// Statistics animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        let current = 0;
        const increment = target / 50; // Adjust for animation speed
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            stat.textContent = Math.round(current);
        }, 30);
    });
}

// Particle effects
function createParticles(event) {
    const particles = 10;
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.zIndex = '9999';
    container.style.pointerEvents = 'none';
    document.body.appendChild(container);
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 10 + 5;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary').trim();
        
        const x = event.clientX;
        const y = event.clientY;
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        const angle = (i / particles) * Math.PI * 2;
        const velocity = 2 + Math.random() * 2;
        particle.style.setProperty('--dx', `${Math.cos(angle) * velocity * 50}px`);
        particle.style.setProperty('--dy', `${Math.sin(angle) * velocity * 50}px`);
        
        container.appendChild(particle);
    }
    
    setTimeout(() => container.remove(), 1000);
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    // Set default theme
    const savedTheme = localStorage.getItem('preferred-theme') || 'matrix';
    setTheme(savedTheme);
    
    // Show initial section
    showSection('about');
    
    // Initialize statistics
    animateStats();
    
    // Add click particle effects
    document.addEventListener('click', createParticles);
    
    // Initialize command input
    const commandInput = document.getElementById('commandInput');
    commandInput.focus();
    
    // Command input event listener
    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = commandInput.value.trim();
            if (command) {
                handleCommand(command);
                commandHistory.unshift(command);
                historyIndex = -1;
                commandInput.value = '';
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                commandInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > -1) {
                historyIndex--;
                commandInput.value = historyIndex >= 0 ? 
                    commandHistory[historyIndex] : '';
            }
        }
    });
});
