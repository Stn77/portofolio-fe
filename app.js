
const API_URL = 'http://portofolio-dfjznk9p0-sariffudins-projects-d51ac99f.vercel.app/';

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    
    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'Mengirim...';
    formMessage.textContent = '';
    
    // Get current time in Indonesian format
    const now = new Date();
    const waktuPengiriman = now.toLocaleString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    // Prepare data to send
    const formData = {
        nama: document.getElementById('nama').value,
        waktu_pengiriman: waktuPengiriman,
        email_pengirim: document.getElementById('email').value,
        perihal: document.getElementById('perihal').value,
        pesan: document.getElementById('pesan').value
    };
    
    // Send data to backend
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            formMessage.style.color = 'var(--highlight)';
            formMessage.textContent = '✓ Pesan berhasil dikirim! Terima kasih.';
            document.getElementById('contactForm').reset();
        } else {
            throw new Error(data.message || 'Gagal mengirim pesan');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        formMessage.style.color = '#ff6b6b';
        formMessage.textContent = '✗ Gagal mengirim pesan. Silakan coba lagi.';
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Kirim Pesan';
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after click
            document.getElementById('navMenu').classList.remove('active');
        }
    });
});

// Mobile menu toggle
function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('active');
}

// Active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in to cards
document.querySelectorAll('.project-card, .skill-category, .experience-item, .stat-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});