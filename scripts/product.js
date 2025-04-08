// ===== PRODUCT GALLERY =====
const thumbnails = document.querySelectorAll('.thumbnail');
const mainImg = document.getElementById('product-main-img');

if (thumbnails.length && mainImg) {
  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', function() {
      // Remove active class from all thumbnails
      thumbnails.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked thumbnail
      this.classList.add('active');
      
      // Change main image (using data attributes)
      const newImgSrc = this.querySelector('img').src;
      mainImg.src = newImgSrc;

      // Add zoom-in animation
      mainImg.style.animation = 'none';
      void mainImg.offsetWidth; // Trigger reflow
      mainImg.style.animation = 'zoomIn 0.5s ease';
    });
  });
}

// ===== ADD TO CART FUNCTIONALITY =====
const addToCartBtn = document.querySelector('.add-to-cart');
const cartCount = document.querySelector('.cart-count');

if (addToCartBtn && cartCount) {
  addToCartBtn.addEventListener('click', function() {
    const quantity = parseInt(document.querySelector('.quantity').textContent);
    const currentCount = parseInt(cartCount.textContent) || 0;
    const newCount = currentCount + quantity;

    // Update cart count
    cartCount.textContent = newCount;
    
    // Animation
    cartCount.style.transform = 'scale(1.3)';
    setTimeout(() => {
      cartCount.style.transform = 'scale(1)';
    }, 300);

    // Feedback
    this.innerHTML = '<i class="fas fa-check"></i> Added!';
    setTimeout(() => {
      this.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
    }, 2000);

    // (In a real app, you would update cart in localStorage or send to backend)
  });
}

// ===== PRODUCT TABS =====
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

if (tabButtons.length && tabPanes.length) {
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // Update active tab button
      tabButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Show corresponding tab pane
      tabPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === tabId) {
          pane.classList.add('active');
        }
      });
    });
  });
}

// ===== PRODUCT RATING STARS =====
const ratingStars = document.querySelectorAll('.rating-input i');

if (ratingStars.length) {
  ratingStars.forEach(star => {
    star.addEventListener('click', function() {
      const rating = parseInt(this.getAttribute('data-rating'));
      
      // Update star display
      ratingStars.forEach((s, index) => {
        if (index < rating) {
          s.classList.replace('far', 'fas');
        } else {
          s.classList.replace('fas', 'far');
        }
      });
    });
  });
}