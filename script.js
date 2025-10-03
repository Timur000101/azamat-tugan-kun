// Simple and clean interactions

document.addEventListener('DOMContentLoaded', function() {
    
    // Background music autoplay with better mobile support
    const bgMusic = document.getElementById('background-music');
    const musicControl = document.createElement('button');
    musicControl.textContent = '🎵';
    musicControl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        background: rgba(255,255,255,0.9);
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
    `;
    document.body.appendChild(musicControl);

    let musicPlaying = false;
    let autoplayAttempted = false;

    function updateMusicControl() {
        musicControl.textContent = musicPlaying ? '🎵' : '🎵';
        musicControl.style.background = musicPlaying ? 'rgba(255,255,255,0.9)' : 'rgba(220,220,220,0.9)';
    }

    function playMusic() {
        if (bgMusic && !musicPlaying) {
            bgMusic.currentTime = 0; // Restart from beginning
            bgMusic.volume = 0.3; // Lower volume for background
            const promise = bgMusic.play();
            if (promise) {
                promise.then(() => {
                    musicPlaying = true;
                    updateMusicControl();
                }).catch((error) => {
                    console.log('Music play failed:', error);
                    musicPlaying = false;
                    updateMusicControl();
                });
            }
        }
    }

    function pauseMusic() {
        if (bgMusic && musicPlaying) {
            bgMusic.pause();
            musicPlaying = false;
            updateMusicControl();
        }
    }

    musicControl.addEventListener('click', () => {
        if (musicPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    });

    // Try autoplay after a short delay
    setTimeout(() => {
        if (!autoplayAttempted) {
            autoplayAttempted = true;
            const playPromise = bgMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    musicPlaying = true;
                    updateMusicControl();
                }).catch(() => {
                    // Autoplay blocked - show control button prominently
                    musicControl.style.display = 'block';
                    
                    // Try on user interactions
                    const playOnInteraction = () => {
                        playMusic();
                        document.removeEventListener('click', playOnInteraction);
                        document.removeEventListener('touchstart', playOnInteraction);
                        document.removeEventListener('keydown', playOnInteraction);
                    };
                    
                    document.addEventListener('click', playOnInteraction);
                    document.addEventListener('touchstart', playOnInteraction);
                    document.addEventListener('keydown', playOnInteraction);
                });
            }
        }
    }, 1000);

    updateMusicControl();
    
    // Smooth scroll for hero indicator
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', () => {
            const statsSection = document.querySelector('.stats-section');
            if (statsSection) {
                statsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Simple fade-in on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for fade-in
    const sections = document.querySelectorAll('.stats-section, .poem-section, .about-section, .gallery-section, .invitation-section, .wishes-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Simple parallax for hero
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const heroImage = document.querySelector('.hero-image');
                if (heroImage && scrolled < window.innerHeight) {
                    heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    console.log('✨ Сайт загружен');
});
