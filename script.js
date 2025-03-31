document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-button');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));

            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');
            galleryItems.forEach(item => {
                item.style.animation = 'none';
                item.offsetHeight;

                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.6s ease forwards';

                    const index = Array.from(galleryItems).indexOf(item);
                    item.style.animationDelay = `${0.1 * index}s`;
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const audioTabs = document.querySelectorAll('.audio-tab');
    const audioContents = document.querySelectorAll('.audio-content');

    audioTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            audioTabs.forEach(t => t.classList.remove('active'));
            audioContents.forEach(content => content.classList.remove('active'));
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-audio-tab');
            document.getElementById(tabId).classList.add('active');
            const audioCards = document.getElementById(tabId).querySelectorAll('.audio-card');
            audioCards.forEach((card, index) => {
                card.style.animation = 'none';
                card.offsetHeight;
                card.style.animation = 'fadeInUp 0.6s ease forwards';
                card.style.animationDelay = `${0.1 * index}s`;
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const videoTabs = document.querySelectorAll('.video-tab');
    const videoContents = document.querySelectorAll('.video-content');

    videoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            videoTabs.forEach(t => t.classList.remove('active'));
            videoContents.forEach(content => content.classList.remove('active'));

            tab.classList.add('active');

            const tabId = tab.getAttribute('data-video-tab');
            document.getElementById(tabId).classList.add('active');
            const videoCards = document.getElementById(tabId).querySelectorAll('.video-card');
            videoCards.forEach((card, index) => {
                card.style.animation = 'none';
                card.offsetHeight; // Trigger reflow
                card.style.animation = 'fadeInUp 0.6s ease forwards';
                card.style.animationDelay = `${0.1 * index}s`;
            });
        });
    });

    const videoContainers = document.querySelectorAll('.video-container');

    videoContainers.forEach(container => {
        const video = container.querySelector('.video-player');
        const playPauseBtn = container.querySelector('.play-pause-btn');
        const playIcon = playPauseBtn.querySelector('.play-icon');
        const pauseIcon = playPauseBtn.querySelector('.pause-icon');

        function updatePlayPauseButton() {
            if (video.paused) {
                playIcon.style.display = 'inline';
                pauseIcon.style.display = 'none';
            } else {
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'inline';
            }
        }

        playPauseBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
            updatePlayPauseButton();
        });

        video.addEventListener('loadedmetadata', updatePlayPauseButton);
        video.addEventListener('play', updatePlayPauseButton);
        video.addEventListener('pause', updatePlayPauseButton);

        video.addEventListener('click', () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
            updatePlayPauseButton();
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const videoElement = document.getElementById('dubbing-video');
    const videoSource = document.getElementById('video-source');
    const englishAudio = document.getElementById('english-audio');
    const hindiAudio = document.getElementById('hindi-audio');
    const languageButtons = document.querySelectorAll('.language-btn');

    const playButton = document.querySelector('.dubbing-play-btn');
    const playIcon = document.querySelector('.dubbing-play-icon');
    const pauseIcon = document.querySelector('.dubbing-pause-icon');
    const muteButton = document.querySelector('.dubbing-mute-btn');
    const volumeIcon = document.querySelector('.dubbing-volume-icon');
    const muteIcon = document.querySelector('.dubbing-mute-icon');
    const progressBar = document.querySelector('.dubbing-progress-bar');
    const progressContainer = document.querySelector('.dubbing-progress');

    const exampleItems = document.querySelectorAll('.dubbing-example-item');

    let activeAudio = englishAudio;
    let isMuted = true;

    function syncAudioWithVideo() {
        activeAudio.currentTime = videoElement.currentTime;
        if (!videoElement.paused && !isMuted) {
            activeAudio.play();
        }
    }

    videoElement.addEventListener('loadedmetadata', () => {
        videoElement.muted = true;
        isMuted = true;

        englishAudio.addEventListener('loadedmetadata', () => {
            englishAudio.pause();
        });

        hindiAudio.addEventListener('loadedmetadata', () => {
            hindiAudio.pause();
        });
    });

    function switchLanguage(language) {
        activeAudio.pause();

        const currentTime = videoElement.currentTime;
        const isPlaying = !videoElement.paused;

        if (language === 'english') {
            activeAudio = englishAudio;
        } else if (language === 'hindi') {
            activeAudio = hindiAudio;
        }

        activeAudio.currentTime = currentTime;

        if (isPlaying && !isMuted) {
            activeAudio.play();
        }
    }

    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            languageButtons.forEach(btn => btn.classList.remove('active'));

            button.classList.add('active');

            const language = button.getAttribute('data-language');
            switchLanguage(language);
        });
    });

    playButton.addEventListener('click', () => {
        if (videoElement.paused) {
            videoElement.play();
            if (!isMuted) {
                activeAudio.play();
            }
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'inline';
        } else {
            videoElement.pause();
            activeAudio.pause();
            playIcon.style.display = 'inline';
            pauseIcon.style.display = 'none';
        }
    });

    muteButton.addEventListener('click', () => {
        if (isMuted) {
            videoElement.muted = true;
            activeAudio.volume = 1;
            activeAudio.currentTime = videoElement.currentTime;
            if (!videoElement.paused) {
                activeAudio.play();
            }
            isMuted = false;
            volumeIcon.style.display = 'inline';
            muteIcon.style.display = 'none';
        } else {
            activeAudio.pause();
            isMuted = true;
            volumeIcon.style.display = 'none';
            muteIcon.style.display = 'inline';
        }
    });

    videoElement.addEventListener('timeupdate', () => {
        const percentage = (videoElement.currentTime / videoElement.duration) * 100;
        progressBar.style.width = `${percentage}%`;

        if (!isMuted && Math.abs(activeAudio.currentTime - videoElement.currentTime) > 0.3) {
            activeAudio.currentTime = videoElement.currentTime;
        }
    });

    progressContainer.addEventListener('click', (e) => {
        const pos = (e.pageX - progressContainer.getBoundingClientRect().left) / progressContainer.offsetWidth;
        videoElement.currentTime = pos * videoElement.duration;
        if (!isMuted) {
            activeAudio.currentTime = videoElement.currentTime;
        }
    });

    exampleItems.forEach(item => {
        item.addEventListener('click', () => {
            const videoSrc = item.getAttribute('data-video');
            const englishSrc = item.getAttribute('data-english');
            const hindiSrc = item.getAttribute('data-hindi');

            videoElement.pause();
            activeAudio.pause();

            videoSource.src = videoSrc;
            englishAudio.src = englishSrc;
            hindiAudio.src = hindiSrc;

            playIcon.style.display = 'inline';
            pauseIcon.style.display = 'none';

            videoElement.load();
            englishAudio.load();
            hindiAudio.load();

            const activeLanguage = document.querySelector('.language-btn.active').getAttribute('data-language');
            if (activeLanguage === 'english') {
                activeAudio = englishAudio;
            } else {
                activeAudio = hindiAudio;
            }

            videoElement.addEventListener('canplay', () => {
                videoElement.play();
                if (!isMuted) {
                    activeAudio.play();
                }
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'inline';
            }, { once: true });
        });
    });

    videoElement.addEventListener('play', syncAudioWithVideo);
    videoElement.addEventListener('seeking', syncAudioWithVideo);
});