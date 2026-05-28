let cart = [];

function loadCart() {
    const saved = localStorage.getItem('smartHomeCart');
    if (saved) {
        cart = JSON.parse(saved);
    }
}

function getCartTotal() {
    return cart.reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.-]/g, ''));
        return total + (price * item.quantity);
    }, 0);
}

function renderCheckout() {
    loadCart();
    const container = document.getElementById('checkout-container');
    const paymentSection = document.getElementById('payment-section');
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-checkout">
                <div class="empty-checkout-icon">📦</div>
                <h2 class="empty-cart-title">购物车是空的</h2>
                <p class="empty-cart-desc">请先选择商品后再进行结算</p>
                <a href="index.html" class="continue-shopping">继续购物</a>
            </div>
        `;
        paymentSection.classList.add('payment-section-hidden');
        return;
    }
    
    let html = `
        <div class="checkout-section">
            <h2 class="section-title">订单商品</h2>
    `;
    
    cart.forEach(item => {
        html += `
            <div class="order-item">
                <div class="order-item-icon">${item.icon}</div>
                <div class="order-item-info">
                    <h4>${item.name}</h4>
                    <div class="order-item-price">${item.price}</div>
                </div>
                <div class="order-item-quantity">×${item.quantity}</div>
            </div>
        `;
    });
    
    const total = getCartTotal();
    const shipping = 0;
    const finalTotal = total + shipping;
    
    html += `
        <div class="total-section">
            <div class="total-row">
                <span>商品总额</span>
                <span>¥${total.toLocaleString()}</span>
            </div>
            <div class="total-row">
                <span>运费</span>
                <span>¥${shipping}</span>
            </div>
            <div class="grand-total">应付总额：¥${finalTotal.toLocaleString()}</div>
        </div>
        </div>
    `;
    
    container.innerHTML = html;
    paymentSection.classList.remove('payment-section-hidden');
    document.getElementById('pay-amount').textContent = finalTotal.toLocaleString();
    
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        if (profile.phone) {
            document.getElementById('contact-phone').value = profile.phone;
        }
        if (profile.address) {
            document.getElementById('delivery-address').value = profile.address;
        }
    }
}

function setupPaymentMethods() {
    document.querySelectorAll('.payment-method').forEach(method => {
        method.addEventListener('click', function() {
            document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));
            this.classList.add('selected');
            
            const selected = this.querySelector('input[type="radio"]');
            selected.checked = true;
        });
    });
}

function confirmPayment() {
    const contactPhone = document.getElementById('contact-phone').value.trim();
    const deliveryAddress = document.getElementById('delivery-address').value.trim();
    
    if (!contactPhone) {
        alert('⚠️ 请输入联系电话！');
        document.getElementById('contact-phone').focus();
        return;
    }
    
    if (!/^1[3-9]\d{9}$/.test(contactPhone)) {
        alert('⚠️ 请输入正确的手机号码！');
        document.getElementById('contact-phone').focus();
        return;
    }
    
    if (!deliveryAddress) {
        alert('⚠️ 请输入收货地址！');
        document.getElementById('delivery-address').focus();
        return;
    }
    
    const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
    const paymentNames = {
        'wechat': '微信支付',
        'alipay': '支付宝',
        'bankcard': '银行卡支付'
    };
    
    alert(`✅ 支付成功！\n\n📞 联系电话：${contactPhone}\n📍 收货地址：${deliveryAddress}\n💳 支付方式：${paymentNames[selectedPayment]}\n\n感谢您的购买，我们将尽快为您发货！`);
    
    localStorage.removeItem('smartHomeCart');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
    renderCheckout();
    setupPaymentMethods();
    
    const confirmPayBtn = document.getElementById('confirm-pay-btn');
    if (confirmPayBtn) {
        confirmPayBtn.addEventListener('click', confirmPayment);
    }
});