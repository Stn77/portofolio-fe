// set margin top of main section based on navbar height
const navbar = document.getElementById('navbar');
const navbarHeight = navbar.offsetHeight;
const mainSection = document.getElementById('main-section');
mainSection.style.marginTop = `${navbarHeight - 1}px`;
mainSection.style.height = `calc(100vh - ${navbarHeight}px)`;

const Q_AND_A_URL = 'https://portofolio-be-seven.vercel.app/api/submit-question';

document.getElementById('q_and_a_form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    
    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'Mengirim...';
    formMessage.textContent = '';
    
    const formData = {
        nama: document.getElementById('nama').value,
        pesan: document.getElementById('pesan').value
    };
    
    if(formData.pesan.length > 4096){
        formMessage.style.color = '#ff6b6b';
        formMessage.textContent = '✗ Pesan tidak boleh lebih dari 4096 karaakter';
        return;
    }

    // Send data to backend
    fetch(Q_AND_A_URL, {
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
            document.getElementById('q_and_a_form').reset();
        } else {
            throw new Error(data.message || 'Gagal mengirim pesan');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        console.error('Error:', error.message);
        formMessage.style.color = '#ff6b6b';
        formMessage.textContent = '✗ Gagal mengirim pesan. Silakan coba lagi.';
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Kirim Pesan';
    });
})