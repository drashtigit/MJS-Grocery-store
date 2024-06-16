
document.addEventListener('DOMContentLoaded', function () {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPayment = parseFloat(localStorage.getItem('totalPrice')) || 0;

    const cartList = document.querySelector('.cart-list');
    const totalPriceElement = document.getElementById('total-price');
    const payNowButton = document.getElementById('payNowBtn');

    function renderCartItems() {
        cartList.innerHTML = '';
        if (cartItems && cartItems.length > 0) {
            cartItems.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <div class="cart-item-info">
                        <img src="${item.imgSrc}" width="50px">
                        <div class="name-price">
                            <span class="name">${item.name}</span>
                            <span class="price">₹ ${item.price.toFixed(2)}</span>
                        </div>
                    </div>
                    <div class="quantity">
                        <button class="increase">+</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="decrease">-</button>
                        <button class="delete">Delete</button>
                    </div>
                `;
                cartList.appendChild(cartItem);
            });
        } else {
            const emptyCartMessage = document.createElement('p');
            emptyCartMessage.textContent = 'Your cart is empty.';
            cartList.appendChild(emptyCartMessage);
        }

        // Setup event listeners for increase and decrease buttons
        cartList.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', function () {
                const index = Array.from(this.parentNode.parentNode.parentNode.children).indexOf(this.parentNode.parentNode);
                cartItems[index].quantity++;
                renderCartItems();
                updateTotalPrice();
                saveCartToLocalStorage();
            });
        });

        cartList.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', function () {
                const index = Array.from(this.parentNode.parentNode.parentNode.children).indexOf(this.parentNode.parentNode);
                if (cartItems[index].quantity > 1) {
                    cartItems[index].quantity--;
                    renderCartItems();
                    updateTotalPrice();
                    saveCartToLocalStorage();
                }
            });
        });

        // Setup event listeners for delete buttons
        cartList.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', function () {
                const index = Array.from(this.parentNode.parentNode.parentNode.children).indexOf(this.parentNode.parentNode);
                cartItems.splice(index, 1);
                renderCartItems();
                updateTotalPrice();
                saveCartToLocalStorage();
            });
        });
    }

    renderCartItems();
    updateTotalPrice();

    document.getElementById('paynowBtn').addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'payment2.html';
    });

    function updateTotalPrice() {
        totalPayment = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        totalPriceElement.textContent = `Total Price: ₹ ${totalPayment.toFixed(2)}`;
    }

    function saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cartItems));
        localStorage.setItem('totalPrice', totalPayment.toFixed(2));
    }
});
