document.addEventListener('DOMContentLoaded', function() {
    // --- 1. Fungsi Menu Navigasi Mudah Alih ---
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active'); // Tambah/buang kelas 'active' pada navigasi
            // Ini akan memerlukan CSS tambahan untuk .main-nav.active { display: flex; }
        });

        // Tutup menu apabila pautan navigasi diklik (untuk mobile)
        const navLinks = document.querySelectorAll('.main-nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                }
            });
        });
    }

    // --- 2. Fungsi Penapis Produk ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Buang kelas 'active' dari semua butang penapis
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Tambah kelas 'active' pada butang yang ditekan
            this.classList.add('active');

            const filter = this.dataset.filter; // Dapatkan nilai data-filter (cth: 'leafy', 'root', 'all')

            productItems.forEach(item => {
                const category = item.dataset.category;

                if (filter === 'all' || category === filter) {
                    item.style.display = 'block'; // Paparkan item
                } else {
                    item.style.display = 'none'; // Sembunyikan item
                }
            });
        });
    });

    // --- 3. Fungsi Pop-up Detail Produk (Struktur asas, belum aktif secara penuh tanpa butang) ---
    const productDetailPopup = document.getElementById('product-detail-popup');
    const closePopupBtn = productDetailPopup ? productDetailPopup.querySelector('.close-btn') : null;
    const popupTitle = productDetailPopup ? document.getElementById('popup-title') : null;
    const popupImage = productDetailPopup ? document.getElementById('popup-image') : null;
    const popupDescription = productDetailPopup ? document.getElementById('popup-description') : null;
    // Anda mungkin ingin menambah elemen lain untuk origin, benefits, storage, uses jika perlu
    const popupOrigin = productDetailPopup ? document.getElementById('popup-origin') : null;
    const popupBenefits = productDetailPopup ? document.getElementById('popup-benefits') : null;
    const popupStorage = productDetailPopup ? document.getElementById('popup-storage') : null;
    const popupUses = productDetailPopup ? document.getElementById('popup-uses') : null;
    const popupAddToInquiryBtn = productDetailPopup ? document.getElementById('popup-add-to-inquiry') : null;

    // Data contoh untuk pop-up. Dalam aplikasi sebenar, ini akan datang dari database atau API.
    const productData = {
        bayam: {
            title: 'Bayam Segar',
            image: 'https://via.placeholder.com/400x300?text=Bayam+Detail',
            description: 'Bayam segar dan kaya nutrien, sesuai untuk tumisan, sup, atau salad sihat.',
            origin: 'Sumber: Ladang Tempatan',
            benefits: 'Manfaat: Tinggi zat besi dan vitamin K.',
            storage: 'Penyimpanan: Simpan dalam peti sejuk untuk kesegaran optimum.',
            uses: 'Kegunaan: Masak lemak cili api, sup bayam, gulai sayur.'
        },
        kentang: {
            title: 'Ubi Kentang',
            image: 'https://via.placeholder.com/400x300?text=Kentang+Detail',
            description: 'Ubi kentang berkualiti tinggi, serbaguna untuk pelbagai hidangan.',
            origin: 'Sumber: Cameron Highlands',
            benefits: 'Manfaat: Sumber karbohidrat kompleks dan vitamin B6.',
            storage: 'Penyimpanan: Simpan di tempat sejuk dan kering, jauh dari cahaya matahari.',
            uses: 'Kegunaan: Kentang goreng, mash potato, kari kentang.'
        },
        tomato: {
            title: 'Tomato Merah',
            image: 'https://via.placeholder.com/400x300?text=Tomato+Detail',
            description: 'Tomato merah ranum, manis dan berair, pilihan terbaik untuk salad dan sos.',
            origin: 'Sumber: Ladang Tempatan',
            benefits: 'Manfaat: Kaya antioksidan Lycopene dan vitamin C.',
            storage: 'Penyimpanan: Simpan pada suhu bilik, jauh dari cahaya matahari langsung.',
            uses: 'Kegunaan: Salad, sos pasta, sup tomato.'
        },
        sawi: {
            title: 'Sawi Hijau',
            image: 'https://via.placeholder.com/400x300?text=Sawi+Detail',
            description: 'Sawi ranggup dan segar, sangat sesuai untuk masakan tumisan atau sup.',
            origin: 'Sumber: Ladang Tempatan',
            benefits: 'Manfaat: Tinggi vitamin A, C, dan K.',
            storage: 'Penyimpanan: Simpan dalam peti sejuk di dalam beg plastik.',
            uses: 'Kegunaan: Sawi goreng belacan, sup sawi, mi goreng.'
        },
        lobak: {
            title: 'Lobak Merah',
            image: 'https://via.placeholder.com/400x300?text=Lobak+Merah+Detail',
            description: 'Lobak merah segar dan manis, penuh dengan vitamin untuk diet sihat anda.',
            origin: 'Sumber: Ladang Tempatan',
            benefits: 'Manfaat: Kaya vitamin A, baik untuk penglihatan.',
            storage: 'Penyimpanan: Simpan dalam peti sejuk di dalam beg plastik.',
            uses: 'Kegunaan: Jus, sup, kari, salad.'
        },
        cili: {
            title: 'Cili Padi',
            image: 'https://via.placeholder.com/400x300?text=Cili+Padi+Detail',
            description: 'Cili padi yang pedas menyengat, pilihan terbaik untuk menambah rasa dalam masakan.',
            origin: 'Sumber: Ladang Tempatan',
            benefits: 'Manfaat: Meningkatkan metabolisme dan mengandungi vitamin C.',
            storage: 'Penyimpanan: Simpan di tempat sejuk dan kering, boleh juga disimpan dalam peti sejuk.',
            uses: 'Kegunaan: Sambal, lauk pauk pedas, kerabu.'
        }
    };

    // Fungsi untuk memaparkan pop-up
    function showProductDetail(productId) {
        const data = productData[productId];
        if (data && productDetailPopup) {
            popupTitle.textContent = data.title;
            popupImage.src = data.image;
            popupImage.alt = data.title;
            popupDescription.textContent = data.description;
            // Pastikan elemen ini wujud sebelum menetapkan textContent
            if (popupOrigin) popupOrigin.textContent = data.origin;
            if (popupBenefits) popupBenefits.textContent = data.benefits;
            if (popupStorage) popupStorage.textContent = data.storage;
            if (popupUses) popupUses.textContent = data.uses;

            // Set data-product-id pada butang 'Tambah ke Senarai Pertanyaan' dalam pop-up
            if (popupAddToInquiryBtn) {
                popupAddToInquiryBtn.dataset.productId = productId;
            }

            productDetailPopup.classList.add('active'); // Tambah kelas 'active' untuk paparkan pop-up
        }
    }

    // Fungsi untuk menyembunyikan pop-up
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', function() {
            productDetailPopup.classList.remove('active');
        });
    }

    // Tutup pop-up apabila klik di luar kandungan pop-up
    if (productDetailPopup) {
        productDetailPopup.addEventListener('click', function(event) {
            if (event.target === productDetailPopup) {
                productDetailPopup.classList.remove('active');
            }
        });
    }

    // Mengaktifkan pop-up apabila item produk diklik
    productItems.forEach(item => {
        item.addEventListener('click', function() {
            const productId = this.dataset.productId; // Pastikan anda ada data-product-id di item produk HTML
            showProductDetail(productId);
        });
    });

    // --- 4. Fungsi 'Tambah ke Senarai Pertanyaan' (dalam pop-up) ---
    if (popupAddToInquiryBtn) {
        popupAddToInquiryBtn.addEventListener('click', function() {
            const productId = this.dataset.productId;
            alert(`Produk ${productData[productId].title} telah ditambah ke senarai pertanyaan anda! (Fungsi ini boleh diimplementasikan kemudian)`);
            // Di sini anda boleh menambah logik untuk menambah produk ke senarai pertanyaan/keranjang
            productDetailPopup.classList.remove('active'); // Tutup pop-up selepas menambah
        });
    }

});

document.addEventListener('DOMContentLoaded', function() {
    let slideIndex = 0;
    const slides = document.querySelectorAll('.carousel-page');
    const dots = document.querySelectorAll('.dot');
    let slideInterval;

    function showSlides(n) {
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        slides[n].classList.add('active');
        dots[n].classList.add('active');
    }

    function nextSlide() {
        slideIndex++;
        if (slideIndex >= slides.length) {
            slideIndex = 0; // Kembali ke awal jika sampai akhir
        }
        showSlides(slideIndex);
    }

    function currentSlide(n) {
        slideIndex = n - 1; // n-1 kerana array bermula dari 0
        showSlides(slideIndex);
        resetInterval(); // Reset interval apabila navigasi manual
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000); // Bertukar setiap 5 saat (5000ms)
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startSlideShow();
    }

    // Mula slideshow apabila DOM dimuatkan
    showSlides(slideIndex); // Paparkan halaman pertama secara lalai
    startSlideShow();
});