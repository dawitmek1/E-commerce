// ===== CART ITEM QUANTITY ADJUSTMENTS =====
document.querySelectorAll('.cart-item-quantity').forEach(item => {
    const decrementBtn = item.querySelector('.decrement');
    const incrementBtn = item.querySelector('.increment');
    const quantityDisplay = item.querySelector('.quantity');
    const priceElement = item.closest('.cart-item').querySelector('.cart-item-price');
    const totalElement = item.closest('.cart-item').querySelector('.cart-item-total');
    let quantity = parseInt(quantityDisplay.textContent);
    const unitPrice = parseFloat(priceElement.textContent.replace('$', ''));
  
    function updateQuantity() {
      quantityDisplay.textContent = quantity;
      const newTotal = (unitPrice * quantity).toFixed(2);
      totalElement.textContent = `$${newTotal}`;
      updateCartTotal();
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
  
  // ===== REMOVE ITEMS FROM CART =====
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const cartItem = this.closest('.cart-item');
      cartItem.style.animation = 'fadeOut 0.3s ease';
      setTimeout(() => {
        cartItem.remove();
        updateCartTotal();
      }, 300);
    });
  });
  
  // ===== UPDATE CART TOTAL =====
  function updateCartTotal() {
    const cartItems = document.querySelectorAll('.cart-item');
    let subtotal = 0;
    
    cartItems.forEach(item => {
      const itemTotal = parseFloat(item.querySelector('.cart-item-total').textContent.replace('$', ''));
      subtotal += itemTotal;
    });
  
    const tax = (subtotal * 0.06).toFixed(2);
    const total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);
  
    // Update summary
    document.querySelector('.summary-row.subtotal span:last-child').textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector('.summary-row.tax span:last-child').textContent = `$${tax}`;
    document.querySelector('.summary-row.total span:last-child').textContent = `$${total}`;
  }
  
  // Initialize cart total on load
  document.addEventListener('DOMContentLoaded', updateCartTotal);