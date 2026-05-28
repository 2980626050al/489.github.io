let cart = [];

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCart();
            updateCartUI();
        }
    }
}

function getCartTotal() {
    return cart.reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.-]/g, ''));
        return total + (price * item.quantity);
    }, 0);
}

function saveCart() {
    localStorage.setItem('smartHomeCart', JSON.stringify(cart));
}

function loadCart() {
    const saved = localStorage.getItem('smartHomeCart');
    if (saved) {
        cart = JSON.parse(saved);
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems > 0 ? totalItems : '';
    }
}

function animateAddToCart(element) {
    const cartIcon = document.querySelector('.btn-cart');
    if (!cartIcon) return;
    
    const rect = element.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();
    
    const flyingElement = document.createElement('div');
    flyingElement.textContent = '🛒';
    flyingElement.style.cssText = `
        position: fixed;
        font-size: 30px;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
        z-index: 9999;
        pointer-events: none;
        transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    `;
    
    document.body.appendChild(flyingElement);
    
    setTimeout(() => {
        flyingElement.style.left = `${cartRect.left + cartRect.width / 2}px`;
        flyingElement.style.top = `${cartRect.top + cartRect.height / 2}px`;
        flyingElement.style.fontSize = '16px';
        flyingElement.style.opacity = '0.5';
    }, 10);
    
    setTimeout(() => {
        document.body.removeChild(flyingElement);
    }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    updateCartUI();
    
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const product = {
                id: this.dataset.productId,
                name: productCard.querySelector('h3').textContent,
                price: productCard.querySelector('.product-price').textContent,
                icon: productCard.querySelector('.product-image').textContent
            };
            
            animateAddToCart(this);
            addToCart(product);
            
            this.textContent = '已添加';
            setTimeout(() => {
                this.textContent = '加入购物车';
            }, 1500);
        });
    });
    
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            const productId = cartItem.dataset.productId;
            const quantityElement = cartItem.querySelector('.quantity-value');
            let quantity = parseInt(quantityElement.textContent);
            
            if (this.textContent === '+') {
                quantity++;
            } else {
                quantity--;
            }
            
            updateQuantity(productId, quantity);
            
            if (window.renderCart) {
                renderCart();
            }
        });
    });
});

function renderCart() {
    const container = document.getElementById('cart-container');
    const summary = document.getElementById('cart-summary');
    
    if (!container || !summary) return;
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h2 class="empty-cart-title">购物车是空的</h2>
                <p class="empty-cart-desc">快去挑选适合您的适老化商品吧！</p>
                <a href="index.html" class="continue-shopping">继续购物</a>
            </div>
        `;
        summary.classList.add('cart-summary-hidden');
        return;
    }
    
    let html = '';
    cart.forEach(item => {
        html += `
            <div class="cart-item" data-product-id="${item.id}">
                <div class="cart-item-icon">${item.icon}</div>
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <div class="cart-item-price">${item.price}</div>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn">+</button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    summary.classList.remove('cart-summary-hidden');
    
    const total = getCartTotal();
    document.getElementById('cart-total').textContent = '¥' + total.toLocaleString();
    
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            const productId = cartItem.dataset.productId;
            const quantityElement = cartItem.querySelector('.quantity-value');
            let quantity = parseInt(quantityElement.textContent);
            
            if (this.textContent === '+') {
                quantity++;
            } else {
                quantity--;
            }
            
            updateQuantity(productId, quantity);
            renderCart();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cart-container')) {
        loadCart();
        updateCartUI();
        renderCart();
    }
});