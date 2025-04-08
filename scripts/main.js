// ===== DOM ELEMENTS =====
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// ===== DARK/LIGHT MODE TOGGLE =====
function setTheme(theme) {
  document.body.className = theme;
  localStorage.setItem('theme', theme);
  updateThemeIcon();
}

function updateThemeIcon() {
  if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
      icon.classList.replace('fa-moon', 'fa-sun');
    } else {
      icon.classList.replace('fa-sun', 'fa-moon');
    }
  }
}

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme);
}

// Toggle theme on button click
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark-mode') ? '' : 'dark-mode';
    setTheme(newTheme);
  });
}

// ===== MOBILE MENU TOGGLE =====
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active') 
      ? '<i class="fas fa-times"></i>' 
      : '<i class="fas fa-bars"></i>';
  });
}

// ===== SCROLL ANIMATIONS =====
function animateOnScroll() {
  const elements = document.querySelectorAll('.animate');
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (elementTop < windowHeight - 100) {
      element.classList.add('animated');
    }
  });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// ===== PRODUCT QUANTITY SELECTOR (used on product & cart pages) =====
document.querySelectorAll('.quantity-selector').forEach(selector => {
  const decrementBtn = selector.querySelector('.decrement');
  const incrementBtn = selector.querySelector('.increment');
  const quantityDisplay = selector.querySelector('.quantity');
  let quantity = 1;

  function updateQuantity() {
    quantityDisplay.textContent = quantity;
  }

  if (decrementBtn && incrementBtn) {
    decrementBtn.addEventListener('click', () => {
      if (quantity > 1) {
        quantity--;
        updateQuantity();
      }
    });

    incrementBtn.addEventListener('click', () => {
      quantity++;
      updateQuantity();
    });
  }
});

// ===== FORM VALIDATION (used on contact & auth pages) =====
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    let isValid = true;
    const inputs = this.querySelectorAll('input, textarea, select');

    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = 'var(--danger)';
        isValid = false;
      } else {
        input.style.borderColor = '';
      }
    });

    if (!isValid) {
      e.preventDefault();
      alert('Please fill in all required fields!');
    }
  });
});