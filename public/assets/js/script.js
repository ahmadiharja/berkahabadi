'use strict';

//Toggle Function
const elemToggleFunc = function(elem) { elem.classList.toggle('active'); }

// Header Sticky & Go-Top
const header = document.querySelector('[data-header]');
const goTopBtn = document.querySelector('[data-go-top]');
window.addEventListener('scroll', function(){ if(window.scrollY >= 10) { header.classList.add('active'); goTopBtn.classList.add('active'); }
                                                                else { header.classList.remove('active'); goTopBtn.classList.remove('active'); } });

// Mobile Menu
const navToggleBtn = document.querySelector('[data-nav-toggle-btn]');
const navbar = document.querySelector('[data-navbar]');

navToggleBtn.addEventListener('click', function() { 
    elemToggleFunc(navToggleBtn);
    elemToggleFunc(navbar);
    elemToggleFunc(document.body);
})

// Skills Toggling Button
const toggleBtnBox = document.querySelector('[data-toggle-box]');
const toggleBtns = document.querySelectorAll('[data-toggle-btn]');
const skillsBox = document.querySelector('[data-skills-box]');

for(let i = 0; i < toggleBtns.length; i++){
    toggleBtns[i].addEventListener('click', function(){
        elemToggleFunc(toggleBtnBox);

        for(let i = 0; i < toggleBtns.length; i++) { elemToggleFunc(toggleBtns[i]); }
        elemToggleFunc(skillsBox);
    });
}

// Dark & Light Theme Toggle
const themeToggleBtn = document.querySelector('[data-theme-btn]');

themeToggleBtn.addEventListener('click', function(){
    elemToggleFunc(themeToggleBtn);

    if(themeToggleBtn.classList.contains('active')){
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');

        localStorage.setItem('theme', 'light-theme');
    }else{
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');

        localStorage.setItem('theme', 'dark-theme');
    }
})

//Applying Theme kept in Local Storage 
if(localStorage.getItem('theme') === 'light-theme'){
    themeToggleBtn.classList.add('active');
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
}else{
    themeToggleBtn.classList.remove('active');
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');
}

// Herbs Slider Animation
const createSliderTrack = () => {
    const track = document.querySelector('.slider-track');
    const slides = track.innerHTML;
    // Duplicate slides for seamless scrolling
    track.innerHTML = slides + slides;
};

// Call after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    createSliderTrack();
});

// Add this to your existing script
const createBenefitsTrack = () => {
    const track = document.querySelector('.slider-track-benefits');
    const slides = track.innerHTML;
    track.innerHTML = slides + slides;
};

document.addEventListener('DOMContentLoaded', () => {
    createBenefitsTrack();
});

// Modal Functionality
const modal = {
    init() {
        this.overlay = document.querySelector('.modal-overlay');
        this.modalElement = document.querySelector('.modal');
        this.closeBtn = document.querySelector('.modal-close');
        this.nextBtn = document.querySelector('.next-step-btn');
        this.partnershipBtn = document.querySelector('.btn-partnership-new');
        this.currentStep = 1;
        this.totalSteps = 4; // Update total steps
        
        this.bindEvents();
    },

    bindEvents() {
        this.partnershipBtn.addEventListener('click', () => this.open());
        this.closeBtn.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });
        this.nextBtn.addEventListener('click', () => this.nextStep());
    },

    open() {
        this.overlay.style.display = 'flex';
        setTimeout(() => {
            this.modalElement.classList.add('active');
        }, 10);
        this.showStep(1); // Always start from step 1
    },

    close() {
        this.modalElement.classList.remove('active');
        setTimeout(() => {
            this.overlay.style.display = 'none';
            this.currentStep = 1; // Reset step when closing
        }, 300);
    },

    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.showStep(this.currentStep);
        }
    },

    showStep(step) {
        const content = this.modalElement.querySelector('.modal-content');
        const stepIndicator = this.modalElement.querySelector('.step-indicator');
        const nextBtn = this.modalElement.querySelector('.next-step-btn');
    
        // Add fade-out class to current content
        content.classList.add('fade-out');
    
        // Wait for fade-out animation to complete
        setTimeout(() => {
            // Reset scroll position to top
            this.modalElement.scrollTop = 0;
    
            // Update content based on step
            if (step === 1) {
                content.innerHTML = this.getStep1Content();
                stepIndicator.textContent = `Step ${step} of ${this.totalSteps}`;
                nextBtn.style.display = 'block';
                nextBtn.textContent = 'Langkah Selanjutnya →';
            } else if (step === 2) {
                content.innerHTML = this.getStep2Content();
                stepIndicator.textContent = `Step ${step} of ${this.totalSteps}`;
                nextBtn.style.display = 'block';
                nextBtn.textContent = 'Langkah Selanjutnya →';
            } else if (step === 3) {
                content.innerHTML = this.getStep3Content();
                stepIndicator.textContent = `Step ${step} of ${this.totalSteps}`;
                nextBtn.style.display = 'none'; // Hide the next button on step 3
                
                // Add click handler for Register Now button
                const registerBtn = content.querySelector('.register-btn');
                if (registerBtn) {
                    registerBtn.onclick = (e) => {
                        e.preventDefault(); // Prevent form submission
                        this.currentStep = 4;
                        this.showStep(4);
                    };
                }
            } else if (step === 4) {
                content.innerHTML = this.getStep4Content();
                stepIndicator.textContent = `Step ${step} of ${this.totalSteps}`;
                nextBtn.style.display = 'none'; // Hide next button on final step
                
                // Initialize bank tabs
                const bankTabs = content.querySelectorAll('.bank-tab-btn');
                const bankContents = content.querySelectorAll('.bank-tab-content');
                
                bankTabs.forEach(tab => {
                    tab.addEventListener('click', () => {
                        // Remove active class from all tabs and contents
                        bankTabs.forEach(t => t.classList.remove('active'));
                        bankContents.forEach(c => c.classList.remove('active'));
                        
                        // Add active class to clicked tab
                        tab.classList.add('active');
                        
                        // Show corresponding content
                        const bank = tab.getAttribute('data-bank');
                        const content = document.getElementById(`${bank}-content`);
                        if (content) content.classList.add('active');
                    });
                });
                
                // Initialize copy buttons
                const copyButtons = content.querySelectorAll('.copy-btn');
                copyButtons.forEach(btn => {
                    btn.addEventListener('click', () => {
                        const textToCopy = btn.getAttribute('data-copy');
                        navigator.clipboard.writeText(textToCopy).then(() => {
                            const originalText = btn.innerHTML;
                            btn.innerHTML = '<i class="ri-check-line"></i> Tersalin!';
                            setTimeout(() => {
                                btn.innerHTML = originalText;
                            }, 2000);
                        });
                    });
                });
            }
    
            // Remove fade-out class and add fade-in class
            content.classList.remove('fade-out');
            content.classList.add('fade-in');
    
            // Remove fade-in class after animation completes
            setTimeout(() => {
                content.classList.remove('fade-in');
            }, 400); // Match this with the animation duration
    
        }, 300); // Match this with the fade-out transition duration
    },
    

    getStep1Content() {
        return `
            <h4 class="modal-step-title">Step 1: Bisnis Nyata dengan Sistem Afiliasi Satu Kaki</h4>
            <p class="modal-step-desc">Sebelum bergabung, penting bagi Anda untuk memahami bagaimana sistem ini bekerja dan mengapa ini bukan MLM yang merugikan.</p>
            
            <div class="feature-section">
                <div class="feature-block">
                    <div class="feature-header">
                        <i class="ri-line-chart-line feature-icon"></i>
                        <h5 class="feature-title">Sistem Afiliasi Satu Kaki – Sederhana & Jelas</h5>
                    </div>
                    <ul class="feature-points">
                        <li>
                            <i class="ri-check-line"></i>
                            <p>Anda bisa mendapatkan komisi dari setiap produk yang Anda jual.</p>
                        </li>
                        <li>
                            <i class="ri-check-line"></i>
                            <p>Anda juga bisa mengajak orang lain untuk ikut menjadi mitra, dan ketika mereka membeli produk, Anda mendapatkan komisi dari transaksi mereka.</p>
                        </li>
                        <li>
                            <i class="ri-check-line"></i>
                            <p>Tidak ada sistem piramida, karena Anda hanya mendapatkan komisi dari mitra langsung di bawah Anda, bukan dari perekrutan bertingkat tanpa batas.</p>
                        </li>
                    </ul>
                </div>
    
                <div class="feature-block">
                    <div class="feature-header">
                        <i class="ri-store-2-line feature-icon"></i>
                        <h5 class="feature-title">Produk Nyata, Bukan Sekadar Jaringan</h5>
                    </div>
                    <ul class="feature-points">
                        <li>
                            <i class="ri-check-line"></i>
                            <p>Anda tidak perlu merekrut banyak orang untuk mendapatkan keuntungan. Fokus utama tetap pada penjualan produk.</p>
                        </li>
                        <li>
                            <i class="ri-check-line"></i>
                            <p>Produk ini adalah Rokok DK – Drajat Karunia, rokok herbal dengan bahan alami yang memiliki manfaat nyata bagi perokok.</p>
                        </li>
                        <li>
                            <i class="ri-check-line"></i>
                            <p>Tidak ada kewajiban stok barang besar, semua transaksi dilakukan dengan sistem yang mudah dan transparan.</p>
                        </li>
                    </ul>
                </div>
    
                <div class="feature-block">
                    <div class="feature-header">
                        <i class="ri-hand-heart-line feature-icon"></i>
                        <h5 class="feature-title">Bisnis yang Berkah & Berkelanjutan</h5>
                    </div>
                    <ul class="feature-points">
                        <li>
                            <i class="ri-check-line"></i>
                            <p>Ini bukan skema cepat kaya atau bisnis yang mengandalkan perekrutan tanpa produk jelas.</p>
                        </li>
                        <li>
                            <i class="ri-check-line"></i>
                            <p>Anda mendapatkan keuntungan dengan menjual produk dan membangun jaringan secara wajar, bukan dengan menipu atau membebani mitra baru.</p>
                        </li>
                    </ul>
                </div>
            </div>
    
            <div class="comparison-box">
                <div class="comparison-header">
                    <h5>Perbandingan dengan MLM Konvensional</h5>
                </div>
                <div class="comparison-content">
                    <div class="comparison-column">
                        <div class="comparison-title">
                            <i class="ri-check-double-line"></i>
                            <span>Sistem Afiliasi DK</span>
                        </div>
                        <ul class="comparison-list positive">
                            <li><i class="ri-check-line"></i> Komisi dari satu tingkat (langsung)</li>
                            <li><i class="ri-check-line"></i> Fokus pada penjualan produk</li>
                            <li><i class="ri-check-line"></i> Tidak ada kewajiban stok minimum</li>
                            <li><i class="ri-check-line"></i> Sistem transparan dan adil</li>
                        </ul>
                    </div>
                    <div class="comparison-column">
                        <div class="comparison-title negative">
                            <i class="ri-close-line"></i>
                            <span>MLM Konvensional</span>
                        </div>
                        <ul class="comparison-list negative">
                            <li><i class="ri-close-line"></i> Komisi dari multi-level (bertingkat)</li>
                            <li><i class="ri-close-line"></i> Fokus pada rekrutmen anggota</li>
                            <li><i class="ri-close-line"></i> Sering ada kewajiban stok minimum</li>
                            <li><i class="ri-close-line"></i> Sistem kompleks dan tidak merata</li>
                        </ul>
                    </div>
                </div>
            </div>
    
            <div class="modal-conclusion">
                <i class="ri-lightbulb-flash-line"></i>
                <p>Kesimpulan: Anda berjualan dan mendapat komisi langsung dari transaksi pribadi serta mitra yang Anda ajak, tanpa harus merekrut berlapis-lapis seperti MLM konvensional.</p>
            </div>
        `;
    },
    

    getStep2Content() {
        return `
            <h4 class="modal-step-title">Step 2: Keuntungan Tambahan dari Program Eksklusif</h4>
            <p class="modal-step-desc">Setelah memahami bagaimana sistemnya bekerja dengan adil dan transparan, kini saatnya melihat keuntungan lebih yang bisa Anda dapatkan.</p>
            
            <div class="program-blocks">
                <div class="program-block">
                    <div class="program-header">
                        <div class="program-icon">
                            <i class="ri-vip-crown-line"></i>
                        </div>
                        <h5>Program Ambassador – Peluang Lebih Besar</h5>
                    </div>
                    <ul class="program-list">
                        <li>
                            <i class="ri-check-line"></i>
                            <span>Jika Anda aktif berjualan dan mengajak mitra lain dengan baik, Anda berkesempatan mendapatkan bonus tambahan dan akses ke pelatihan eksklusif.</span>
                        </li>
                        <li>
                            <i class="ri-check-line"></i>
                            <span>Program ini membantu Anda membangun bisnis jangka panjang, bukan sekadar transaksi sekali jalan.</span>
                        </li>
                        <li>
                            <i class="ri-check-line"></i>
                            <span>Anda akan mendapatkan prioritas dalam peluncuran produk baru dan event khusus dari DK.</span>
                        </li>
                    </ul>
                </div>
    
                <div class="program-block">
                    <div class="program-header">
                        <div class="program-icon">
                            <i class="ri-hand-heart-line"></i>
                        </div>
                        <h5>Program Donasi – Bisnis yang Mengalirkan Keberkahan</h5>
                    </div>
                    <ul class="program-list">
                        <li>
                            <i class="ri-check-line"></i>
                            <span>Sebagian keuntungan dari setiap transaksi akan disalurkan untuk amal, sehingga Anda bisa mendapatkan rezeki sekaligus menabung pahala.</span>
                        </li>
                        <li>
                            <i class="ri-check-line"></i>
                            <span>Setiap mitra berkontribusi dalam kebaikan, menjadikan bisnis ini tidak hanya menguntungkan, tetapi juga membawa manfaat bagi banyak orang.</span>
                        </li>
                        <li>
                            <i class="ri-check-line"></i>
                            <span>Program donasi rutin ke panti asuhan, pesantren, dan kegiatan sosial lainnya yang bisa Anda ikuti secara langsung.</span>
                        </li>
                    </ul>
                </div>
            </div>
    
            <div class="advantages-container">
                <div class="advantages-header">
                    <div class="advantages-header-icon">
                        <i class="ri-award-line"></i>
                    </div>
                    <h5>Keuntungan Menjadi Mitra DK</h5>
                </div>
                <div class="advantages-grid">
                    <div class="advantage-card">
                        <div class="advantage-card-icon">
                            <i class="ri-money-dollar-circle-line"></i>
                        </div>
                        <div class="advantage-card-content">
                            <h6>Komisi Langsung</h6>
                            <p>Dapatkan komisi langsung dari setiap penjualan produk yang Anda lakukan</p>
                        </div>
                    </div>
                    
                    <div class="advantage-card">
                        <div class="advantage-card-icon">
                            <i class="ri-team-line"></i>
                        </div>
                        <div class="advantage-card-content">
                            <h6>Komisi Jaringan</h6>
                            <p>Terima komisi dari transaksi mitra yang Anda ajak bergabung</p>
                        </div>
                    </div>
                    
                    <div class="advantage-card">
                        <div class="advantage-card-icon">
                            <i class="ri-gift-line"></i>
                        </div>
                        <div class="advantage-card-content">
                            <h6>Bonus Prestasi</h6>
                            <p>Raih bonus tambahan saat mencapai target penjualan tertentu</p>
                        </div>
                    </div>
                    
                    <div class="advantage-card">
                        <div class="advantage-card-icon">
                            <i class="ri-medal-line"></i>
                        </div>
                        <div class="advantage-card-content">
                            <h6>Reward Eksklusif</h6>
                            <p>Dapatkan hadiah spesial untuk mitra berprestasi</p>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="step-conclusion">
                <i class="ri-lightbulb-flash-line"></i>
                <p>Kesimpulan: Selain mendapat penghasilan, Anda bisa berkembang lebih jauh dalam ekosistem BERKAH ABADI dan ikut berkontribusi dalam kebaikan sosial.</p>
            </div>
        `;
    },
    
    
    

    getStep3Content() {
        return `
            <h4 class="modal-step-title">Form Pendaftaran Mitra</h4>
            <p class="modal-step-desc">Silakan lengkapi data berikut untuk memulai kemitraan Anda dengan DK</p>
            
            <form class="compact-form">
                <div class="form-row">
                    <div class="form-field">
                        <label for="username">Username*</label>
                        <div class="input-with-icon">
                            <i class="ri-user-line"></i>
                            <input type="text" id="username" placeholder="Masukkan username" required>
                        </div>
                    </div>
                    
                    <div class="form-field">
                        <label for="fullname">Nama Lengkap*</label>
                        <div class="input-with-icon">
                            <i class="ri-profile-line"></i>
                            <input type="text" id="fullname" placeholder="Sesuai KTP" required>
                        </div>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-field">
                        <label for="ktp">Nomor KTP*</label>
                        <div class="input-with-icon">
                            <i class="ri-id-card-line"></i>
                            <input type="text" id="ktp" placeholder="16 digit" required>
                        </div>
                    </div>
                    
                    <div class="form-field">
                        <label for="whatsapp">WhatsApp*</label>
                        <div class="input-with-icon">
                            <i class="ri-whatsapp-line"></i>
                            <input type="tel" id="whatsapp" placeholder="08xxxxxxxxxx" required>
                        </div>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-field">
                        <label for="email">Email*</label>
                        <div class="input-with-icon">
                            <i class="ri-mail-line"></i>
                            <input type="email" id="email" placeholder="email@example.com" required>
                        </div>
                    </div>
                    
                    <div class="form-field">
                        <label for="password">Password*</label>
                        <div class="input-with-icon">
                            <i class="ri-lock-line"></i>
                            <input type="password" id="password" placeholder="Min. 8 karakter" required>
                        </div>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-field">
                        <label for="confirm-password">Konfirmasi Password*</label>
                        <div class="input-with-icon">
                            <i class="ri-lock-password-line"></i>
                            <input type="password" id="confirm-password" placeholder="Ulangi password" required>
                        </div>
                    </div>
                    
                    <div class="form-field">
                        <label for="province">Provinsi*</label>
                        <div class="input-with-icon select-wrapper">
                            <i class="ri-map-pin-line"></i>
                            <select id="province" required>
                                <option value="">Pilih Provinsi</option>
                                <option value="jawa-barat">Jawa Barat</option>
                                <option value="jawa-tengah">Jawa Tengah</option>
                                <option value="jawa-timur">Jawa Timur</option>
                                <option value="dki-jakarta">DKI Jakarta</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-field">
                        <label for="city">Kabupaten/Kota*</label>
                        <div class="input-with-icon select-wrapper">
                            <i class="ri-building-line"></i>
                            <select id="city" required>
                                <option value="">Pilih Kabupaten/Kota</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-field">
                        <label for="district">Kecamatan*</label>
                        <div class="input-with-icon select-wrapper">
                            <i class="ri-community-line"></i>
                            <select id="district" required>
                                <option value="">Pilih Kecamatan</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="form-field full-width">
                    <label for="address">Alamat Lengkap*</label>
                    <div class="input-with-icon">
                        <i class="ri-home-4-line"></i>
                        <input type="text" id="address" placeholder="Alamat lengkap" required>
                    </div>
                </div>
                
                <div class="form-field full-width">
                    <label for="otp">Kode OTP*</label>
                    <div class="otp-group">
                        <div class="input-with-icon">
                            <i class="ri-key-2-line"></i>
                            <input type="text" id="otp" placeholder="Masukkan kode OTP" required>
                        </div>
                        <button type="button" class="otp-button">Kirim OTP</button>
                    </div>
                </div>
                
                
                
                <button type="button" class="register-btn">Daftar Sekarang</button>
            </form>
        `;
    },
    

    getStep4Content() {
        return `
            <h4 class="modal-step-title">Pembayaran Paket Kemitraan</h4>
            <p class="modal-step-desc">Selamat! Anda telah berhasil mendaftar sebagai Mitra DK. Silakan lakukan pembayaran untuk mengaktifkan akun Anda.</p>
            
            <div class="payment-package">
                <div class="package-header">
                    <img src="https://i.ibb.co/vvBkTXBr/rokokkkk-dk.png" alt="Paket Mitra DK" class="package-image">
                    <div class="package-details">
                        <h5>Paket Mitra DK Premium</h5>
                        <div class="package-price">Rp 1.000.000</div>
                    </div>
                </div>
                
                <ul class="package-features">
                    <li><i class="ri-check-line"></i> 10 Pak Rokok DK</li>
                    <li><i class="ri-check-line"></i> Akses Dashboard Mitra</li>
                    <li><i class="ri-check-line"></i> Materi Marketing</li>
                    <li><i class="ri-check-line"></i> Konsultasi Bisnis</li>
                </ul>
            </div>
            
            <div class="payment-methods">
                <h5 class="payment-section-title">Pilih Metode Pembayaran</h5>
                
                <div class="bank-tabs">
                    <div class="bank-tab-headers">
                        <button class="bank-tab-btn active" data-bank="bca">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png" alt="BCA Logo">
                        </button>
                        <button class="bank-tab-btn" data-bank="bri">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/BANK_BRI_logo.svg/2560px-BANK_BRI_logo.svg.png" alt="BRI Logo">
                        </button>
                        <button class="bank-tab-btn" data-bank="mandiri">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/2560px-Bank_Mandiri_logo_2016.svg.png" alt="Mandiri Logo">
                        </button>
                        <button class="bank-tab-btn" data-bank="bni">
                            <img src="https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/2560px-BNI_logo.svg.png" alt="BNI Logo">
                        </button>
                    </div>
                    
                    <div class="bank-tab-contents">
                        <div class="bank-tab-content active" id="bca-content">
                            <div class="bank-account-info">
                                <div class="account-number">2980856511</div>
                                <div class="account-name">PT Berkah Abadi</div>
                                <button class="copy-btn" data-copy="2980856511">
                                    <i class="ri-file-copy-line"></i> Salin
                                </button>
                            </div>
                        </div>
                        
                        <div class="bank-tab-content" id="bri-content">
                            <div class="bank-account-info">
                                <div class="account-number">034901000567302</div>
                                <div class="account-name">PT Berkah Abadi</div>
                                <button class="copy-btn" data-copy="034901000567302">
                                    <i class="ri-file-copy-line"></i> Salin
                                </button>
                            </div>
                        </div>
                        
                        <div class="bank-tab-content" id="mandiri-content">
                            <div class="bank-account-info">
                                <div class="account-number">1370005678910</div>
                                <div class="account-name">PT Berkah Abadi</div>
                                <button class="copy-btn" data-copy="1370005678910">
                                    <i class="ri-file-copy-line"></i> Salin
                                </button>
                            </div>
                        </div>
                        
                        <div class="bank-tab-content" id="bni-content">
                            <div class="bank-account-info">
                                <div class="account-number">0278456789</div>
                                <div class="account-name">PT Berkah Abadi</div>
                                <button class="copy-btn" data-copy="0278456789">
                                    <i class="ri-file-copy-line"></i> Salin
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="payment-instructions">
                <h5 class="payment-section-title">Cara Pembayaran</h5>
                <ol class="instruction-steps">
                    <li>Transfer sesuai nominal <strong>Rp 1.000.000</strong> ke rekening yang dipilih</li>
                    <li>Simpan bukti transfer (screenshot/foto)</li>
                    <li>Kirim bukti transfer beserta username Anda ke WhatsApp Admin:</li>
                </ol>
                
                <a href="https://wa.me/6285123456789" class="whatsapp-button">
                    <i class="ri-whatsapp-line"></i> Kirim Bukti Transfer
                </a>
                
                <div class="payment-note">
                    <i class="ri-information-line"></i>
                    <p>Akun Anda akan diaktifkan dalam waktu 1x24 jam setelah konfirmasi pembayaran diterima.</p>
                </div>
            </div>
        `;
    }
    
};

// Initialize modal after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    modal.init();
});




// Initialize welcome modal when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    // Check if current page is index.html
    const currentPath = window.location.pathname;
    const isIndexPage = currentPath === '/' || 
                        currentPath === '/index.html' || 
                        currentPath.endsWith('/index.html') ||
                        currentPath === '';
    
    if (isIndexPage) {
        welcomeModal.init();
    }
});

// Mobile Bottom Navigation
const createMobileNav = () => {
    // Create mobile navigation HTML
    const mobileNavHTML = `
    <nav class="mobile-nav">
    <ul class="mobile-nav-list">
        <li class="mobile-nav-item">
            <a href="${window.location.pathname.includes('kretek.html') || window.location.pathname.includes('about.html') ? 'index.html' : '#home'}" class="mobile-nav-link ${!window.location.pathname.includes('kretek.html') && !window.location.pathname.includes('about.html') ? 'active' : ''}">
                <i class="ri-home-4-line"></i>
                <span>Beranda</span>
            </a>
        </li>
        <li class="mobile-nav-item">
            <a href="${window.location.pathname.includes('kretek.html') ? '#' : 'kretek.html'}" class="mobile-nav-link ${window.location.pathname.includes('kretek.html') ? 'active' : ''}">
                <i class="ri-fire-line"></i>
                <span>Kretek</span>
            </a>
        </li>
        <li class="mobile-nav-item">
            <a href="${window.location.pathname.includes('about.html') ? '#' : 'about.html'}" class="mobile-nav-link ${window.location.pathname.includes('about.html') ? 'active' : ''}">
                <i class="ri-information-line"></i>
                <span>About</span>
            </a>
        </li>
        <li class="mobile-nav-item">
            <a href="#" class="mobile-nav-link member-nav">
                <i class="ri-user-3-line"></i>
                <span>Member</span>
            </a>
        </li>
    </ul>
</nav>
    `;
    
    // Append mobile navigation to body
    document.body.insertAdjacentHTML('beforeend', mobileNavHTML);
    
    // Add event listeners for mobile nav links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active class from all links
            mobileNavLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // If it's the member link, handle special behavior
            if (this.classList.contains('member-nav')) {
                // Here you can add logic to open member area modal or redirect
                // For now, just prevent default behavior
                event.preventDefault();
            }
            
            // If on the same page and it's a hash link, close mobile menu if open
            if (this.getAttribute('href').startsWith('#') && navbar.classList.contains('active')) {
                elemToggleFunc(navbar);
                elemToggleFunc(navToggleBtn);
                elemToggleFunc(document.body);
            }
        });
    });
};

// Initialize mobile navigation after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    createMobileNav();
    
    // Handle active state for mobile nav based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    if (sections.length > 0) {
        window.addEventListener('scroll', () => {
            let scrollY = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelector(`.mobile-nav-link[href*="${sectionId}"]`)?.classList.add('active');
                } else {
                    document.querySelector(`.mobile-nav-link[href*="${sectionId}"]`)?.classList.remove('active');
                }
            });
        });
    }
});

// Video Slider Functionality
const initVideoSlider = () => {
    const sliderWrapper = document.querySelector('.video-slider-wrapper');
    if (!sliderWrapper) return; // Exit if not on about page
    
    const slider = document.querySelector('.video-slider');
    const slides = document.querySelectorAll('.video-slide');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    const dotsContainer = document.querySelector('.slider-dots');
    
    if (!slider || !slides.length) return;
    
    // Variables for drag functionality
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
    let currentIndex = 0;
    
    // Create dots based on number of slides needed to show
    const slidesPerView = () => {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1200) return 2;
        return 3;
    };
    
    const totalSlides = Math.ceil(slides.length / slidesPerView());
    
    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    // Set slider width
    const setSliderPosition = () => {
        slider.style.transform = `translateX(${currentTranslate}px)`;
    };
    
    // Get position based on index
    const getPositionByIndex = (index) => {
        const slideWidth = slides[0].offsetWidth + 30; // 30px is the gap
        return -(index * slideWidth * slidesPerView());
    };
    
    // Go to specific slide
    const goToSlide = (index) => {
        currentIndex = index;
        currentTranslate = getPositionByIndex(index);
        prevTranslate = currentTranslate;
        setSliderPosition();
        
        // Update dots
        document.querySelectorAll('.slider-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    };
    
    // Next slide
    const nextSlide = () => {
        if (currentIndex < totalSlides - 1) {
            goToSlide(currentIndex + 1);
        } else {
            // Loop back to first slide with animation
            goToSlide(0);
        }
    };
    
    // Previous slide
    const prevSlide = () => {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        } else {
            // Loop to last slide with animation
            goToSlide(totalSlides - 1);
        }
    };
    
    // Add event listeners for buttons
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Touch events
    slides.forEach((slide, index) => {
        // Touch start
        slide.addEventListener('touchstart', (e) => {
            touchStart(e, index);
        });
        
        // Touch end
        slide.addEventListener('touchend', (e) => {
            touchEnd();
        });
        
        // Touch move
        slide.addEventListener('touchmove', (e) => {
            touchMove(e);
        });
        
        // Mouse events
        slide.addEventListener('mousedown', (e) => {
            e.preventDefault();
            touchStart(e, index);
        });
        
        slide.addEventListener('mouseup', () => {
            touchEnd();
        });
        
        slide.addEventListener('mouseleave', () => {
            if (isDragging) touchEnd();
        });
        
        slide.addEventListener('mousemove', (e) => {
            if (isDragging) touchMove(e);
        });
        
        // Prevent context menu
        slide.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
    });
    
    // Touch start function
    function touchStart(event, index) {
        isDragging = true;
        startPos = getPositionX(event);
        animationID = requestAnimationFrame(animation);
        slider.classList.add('grabbing');
    }
    
    // Touch move function
    function touchMove(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            currentTranslate = prevTranslate + currentPosition - startPos;
        }
    }
    
    // Touch end function
    function touchEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        
        const movedBy = currentTranslate - prevTranslate;
        
        // Determine if slide should move to next/prev or snap back
        if (movedBy < -100 && currentIndex < totalSlides - 1) {
            currentIndex += 1;
        } else if (movedBy > 100 && currentIndex > 0) {
            currentIndex -= 1;
        }
        
        // Snap to the current index
        currentTranslate = getPositionByIndex(currentIndex);
        prevTranslate = currentTranslate;
        
        // Update dots
        document.querySelectorAll('.slider-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
        
        setSliderPosition();
        slider.classList.remove('grabbing');
    }
    
    // Get position X from event
    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }
    
    // Animation function
    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }
    
    // Handle resize
    window.addEventListener('resize', () => {
        // Recalculate position based on current index
        currentTranslate = getPositionByIndex(currentIndex);
        prevTranslate = currentTranslate;
        setSliderPosition();
        
        // Recreate dots if needed
        const newTotalSlides = Math.ceil(slides.length / slidesPerView());
        if (newTotalSlides !== totalSlides) {
            // Clear dots
            dotsContainer.innerHTML = '';
            
            // Recreate dots
            for (let i = 0; i < newTotalSlides; i++) {
                const dot = document.createElement('span');
                dot.classList.add('slider-dot');
                if (i === currentIndex) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
        }
    });
    
    // Add grabbing cursor styles
    slider.style.cursor = 'grab';
    slider.addEventListener('mousedown', () => {
        slider.style.cursor = 'grabbing';
    });
    slider.addEventListener('mouseup', () => {
        slider.style.cursor = 'grab';
    });
};

// Initialize video slider when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    initVideoSlider();
});
// Mobile herbs slider
function setupMobileHerbsSlider() {
    if (window.innerWidth <= 767) {
        const sliderTrack = document.querySelector('.slider-track');
        if (!sliderTrack) return;
        
        // Save original content
        const originalSlides = sliderTrack.innerHTML;
        
        // Clear the track
        sliderTrack.innerHTML = '';
        
        // Get all slides
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = originalSlides;
        const slides = Array.from(tempContainer.querySelectorAll('.herb-slide'));
        
        // Create first row (slides 0-5)
        const row1 = document.createElement('div');
        row1.className = 'mobile-row mobile-row-1';
        
        // Create second row (slides 6-11)
        const row2 = document.createElement('div');
        row2.className = 'mobile-row mobile-row-2';
        
        // Add slides to rows
        slides.forEach((slide, index) => {
            // Clone the slide
            const slideClone = slide.cloneNode(true);
            
            // Add to appropriate row
            if (index < 6) {
                row1.appendChild(slideClone);
                // Add duplicate for seamless scrolling
                row1.appendChild(slideClone.cloneNode(true));
            } else {
                row2.appendChild(slideClone);
                // Add duplicate for seamless scrolling
                row2.appendChild(slideClone.cloneNode(true));
            }
        });
        
        // Add rows to track
        sliderTrack.appendChild(row1);
        sliderTrack.appendChild(row2);
    }
}

// Run on page load and resize
document.addEventListener('DOMContentLoaded', function() {
    setupMobileHerbsSlider();
    
    window.addEventListener('resize', function() {
        // Reload the page on resize to reset the slider
        // This is a simple solution - a more complex one would
        // dynamically rebuild the slider
        if ((window.innerWidth <= 767 && window.lastWidth > 767) || 
            (window.innerWidth > 767 && window.lastWidth <= 767)) {
            location.reload();
        }
        window.lastWidth = window.innerWidth;
    });
    
    window.lastWidth = window.innerWidth;
});
