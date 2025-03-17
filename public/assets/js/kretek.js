document.addEventListener('DOMContentLoaded', function() {
    // Product Image Slider
    const slides = document.querySelectorAll('.dkproduk-slide');
    const dots = document.querySelectorAll('.dkproduk-dot');
    const prevBtn = document.querySelector('.dkproduk-prev-btn');
    const nextBtn = document.querySelector('.dkproduk-next-btn');
    
    // Cek apakah elemen slider ada di halaman
    if (slides.length > 0 && dots.length > 0) {
        let currentSlide = 0;
        const slideCount = slides.length;
        
        // Function to update slide display
        function showSlide(index) {
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Add active class to current slide and dot
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            
            // Update current slide index
            currentSlide = index;
        }
        
        // Next slide function
        function nextSlide() {
            let newIndex = currentSlide + 1;
            if (newIndex >= slideCount) {
                newIndex = 0;
            }
            showSlide(newIndex);
        }
        
        // Previous slide function
        function prevSlide() {
            let newIndex = currentSlide - 1;
            if (newIndex < 0) {
                newIndex = slideCount - 1;
            }
            showSlide(newIndex);
        }
        
        // Event listeners for buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                nextSlide();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                prevSlide();
            });
        }
        
        // Event listeners for dots
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-index'));
                showSlide(slideIndex);
            });
        });
        
        // Auto slide every 8 seconds (diubah dari 5 detik menjadi 8 detik)
        let slideInterval = setInterval(nextSlide, 8000);
        
        // Pause auto slide on hover
        const sliderContainer = document.querySelector('.dkproduk-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', function() {
                clearInterval(slideInterval);
            });
            
            sliderContainer.addEventListener('mouseleave', function() {
                clearInterval(slideInterval); // Clear any existing interval
                slideInterval = setInterval(nextSlide, 8000); // Set a new interval dengan 8 detik
            });
        }
        
        // Initialize first slide
        showSlide(0);
    }
    
    // Add to cart functionality
    const addBtn = document.querySelector('.dkproduk-add-btn');
    const buyBtn = document.querySelector('.dkproduk-buy-btn');
    
    if (addBtn) {
        addBtn.addEventListener('click', function() {
            alert('Produk ditambahkan ke keranjang!');
        });
    }
    
    if (buyBtn) {
        buyBtn.addEventListener('click', function() {
            alert('Mengarahkan ke halaman pembayaran...');
        });
    }
});



// Horizontal scroll untuk Pribumi products dengan produk tengah sebagai default
document.addEventListener('DOMContentLoaded', function() {
    const productContainers = document.querySelectorAll('.pribumi-products');
    
    productContainers.forEach(container => {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        // Mouse events untuk drag bebas
        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.style.cursor = 'grabbing';
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
            e.preventDefault();
        });
        
        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });
        
        container.addEventListener('mouseup', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });
        
        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 1.2; // Faktor kecepatan drag
            container.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events untuk mobile
        container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });
        
        container.addEventListener('touchmove', (e) => {
            if (e.touches.length > 1) return; // Ignore pinch/zoom
            
            const x = e.touches[0].pageX - container.offsetLeft;
            const walk = (startX - x) * 1;
            container.scrollLeft = scrollLeft + walk;
            
            // Prevent page scrolling when dragging horizontally
            if (Math.abs(startX - x) > 10) {
                e.preventDefault();
            }
        });
        
        // Fungsi untuk menampilkan produk tengah saat halaman dimuat
        function centerMiddleProduct() {
            // Dapatkan semua produk
            const products = container.querySelectorAll('.pribumi-product-col');
            
            // Jika ada produk
            if (products.length > 0) {
                // Dapatkan produk tengah (index)
                const middleIndex = Math.floor(products.length / 2);
                const middleProduct = products[middleIndex];
                
                // Hitung posisi scroll untuk memusatkan produk tengah
                const containerWidth = container.offsetWidth;
                const productWidth = middleProduct.offsetWidth;
                const productLeft = middleProduct.offsetLeft;
                
                // Scroll ke posisi yang memusatkan produk tengah
                const scrollPosition = productLeft - (containerWidth / 2) + (productWidth / 2);
                
                // Terapkan scroll
                container.scrollLeft = scrollPosition;
            }
        }
        
        // Panggil fungsi saat semua gambar dimuat untuk perhitungan yang akurat
        if (document.readyState === 'complete') {
            centerMiddleProduct();
        } else {
            window.addEventListener('load', centerMiddleProduct);
        }
        
        // Juga panggil fungsi setelah delay kecil untuk memastikan layout sudah selesai
        setTimeout(centerMiddleProduct, 300);
    });
});


// Reordering DK product elements for mobile view
document.addEventListener('DOMContentLoaded', function() {
    function reorderDKProductForMobile() {
        const container = document.querySelector('.dkproduk-container');
        const info = document.querySelector('.dkproduk-info');
        const gallery = document.querySelector('.dkproduk-gallery');
        const title = document.querySelector('.dkproduk-title');
        const description = document.querySelector('.dkproduk-description');
        
        if (!container || !info || !gallery || !title || !description) return;
        
        // Check if we're on mobile view
        if (window.innerWidth <= 768) {
            // Move gallery after title
            if (title.nextElementSibling !== gallery) {
                info.insertBefore(gallery, description);
            }
        } else {
            // Restore original structure for desktop
            if (info.contains(gallery)) {
                container.appendChild(gallery);
            }
        }
    }
    
    // Run on load
    reorderDKProductForMobile();
    
    // Run on resize
    window.addEventListener('resize', reorderDKProductForMobile);
});
// Horizontal scroll untuk VB Pro products - Versi drag bebas
document.addEventListener('DOMContentLoaded', function() {
    const vbproProductsWrappers = document.querySelectorAll('.vbpro-products-wrapper');
    
    vbproProductsWrappers.forEach(container => {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        // Mouse events untuk drag bebas
        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.style.cursor = 'grabbing';
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
            e.preventDefault();
        });
        
        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });
        
        container.addEventListener('mouseup', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });
        
        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 1.2; // Faktor kecepatan drag
            container.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events untuk mobile - Lebih sederhana
        container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });
        
        container.addEventListener('touchmove', (e) => {
            if (e.touches.length > 1) return; // Ignore pinch/zoom
            
            const x = e.touches[0].pageX - container.offsetLeft;
            const walk = (startX - x) * 1;
            container.scrollLeft = scrollLeft + walk;
            
            // Prevent page scrolling when dragging horizontally
            if (Math.abs(startX - x) > 10) {
                e.preventDefault();
            }
        });
    });
});
