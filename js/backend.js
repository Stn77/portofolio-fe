const EMAIL_URL = 'https://portofolio-be-seven.vercel.app/api/send-email';
const Q_AND_A_URL = 'https://portofolio-be-seven.vercel.app/api/submit-question';

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
    fetch(EMAIL_URL, {
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
