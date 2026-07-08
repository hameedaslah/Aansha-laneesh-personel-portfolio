document.addEventListener('DOMContentLoaded', () => {

    // --- Dynamic Year ---
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // --- Header Scroll State ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const navLinksContainer = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    navToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        if (navLinksContainer.classList.contains('active')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars-staggered';
        }
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            navToggle.querySelector('i').className = 'fa-solid fa-bars-staggered';
        });
    });

    // --- Active Link Highlight on Scroll ---
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Highlight link if scroll position is past 1/3 of the section
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // --- Portfolio Gallery Filtering ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                // Add smooth transition exit animation
                item.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    // Re-trigger visual layout with a micro-timeout
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400); // match transition duration
                }
            });
        });
    });

    // --- Media Lightbox Modal (Videos & Images) ---
    const modal = document.getElementById('media-modal');
    const modalClose = document.getElementById('modal-close');
    const modalContainer = document.getElementById('modal-media-container');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const type = item.getAttribute('data-type');
            const source = item.getAttribute('data-src');
            modalContainer.innerHTML = ''; // reset previous content

            if (type === 'video') {
                const videoUrl = item.getAttribute('data-video-url');
                const videoElement = document.createElement('video');
                videoElement.src = videoUrl;
                videoElement.className = 'modal-video';
                videoElement.controls = true;
                videoElement.autoplay = true;
                modalContainer.appendChild(videoElement);
            } else {
                const imgElement = document.createElement('img');
                imgElement.src = source;
                imgElement.className = 'modal-image';
                imgElement.alt = item.querySelector('img').alt;
                modalContainer.appendChild(imgElement);
            }

            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Lock background scroll
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Unlock background scroll
        
        // Pause any video playback inside modal when closing
        const video = modalContainer.querySelector('video');
        if (video) {
            video.pause();
        }
        setTimeout(() => {
            modalContainer.innerHTML = '';
        }, 400); // fade duration transition helper
    };

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        // Close modal if user clicks the background, not the media content
        if (e.target === modal || e.target.classList.contains('modal-content') === false && e.target.closest('.modal-content') === null) {
            closeModal();
        }
    });

    // Handle Escape Key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // --- Contact Form Submission Handler ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple custom toast alert trigger
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // Simple visual feedback cycle
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending Message...';

            setTimeout(() => {
                submitBtn.style.background = '#4caf50';
                submitBtn.style.color = '#fff';
                submitBtn.textContent = 'Message Sent Successfully!';

                // Reset form fields
                contactForm.reset();

                // Trigger animations off inputs to lower titles back down
                const inputs = contactForm.querySelectorAll('.form-input');
                inputs.forEach(input => {
                    input.blur();
                });

                // Clear success state after delay
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                    submitBtn.textContent = originalText;
                }, 3000);
            }, 1500);
        });
    }

});
