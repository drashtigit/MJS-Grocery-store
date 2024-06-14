
let searchForm = document.querySelector('.search-form');
let loginForm = document.querySelector('.login-form');
let navbar = document.querySelector('.navbar');
let shoppingCart=document.querySelector('.shopping-cart');






document.querySelector('#cart-btn').addEventListener('click', (event) => {
    event.stopPropagation();
    shoppingCart.classList.toggle('active');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
    searchForm.classList.remove('active');
    
});

document.querySelector('#search-btn').addEventListener('click', (event) => {
    event.stopPropagation(); 
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    
});

document.querySelector('#login-btn').addEventListener('click', (event) => {
    event.stopPropagation(); 
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    navbar.classList.remove('active');
    shoppingCart.classList.remove('active');
   
});

document.querySelector('#menu-btn').addEventListener('click', (event) => {
    event.stopPropagation(); 
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    
});

document.body.addEventListener('click', (event) => {
    if (!event.target.closest('.search-form') && !event.target.closest('.login-form')) {
        
        loginForm.classList.remove('active');
        navbar.classList.remove('active');
        
    }
});

window.addEventListener('scroll', () => {
   
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
    shoppingCart.classList.remove('active');
});





var productSwiper = new Swiper(".product-slider", {
  loop: true,
  spaceBetween: 20,
  autoplay: {
      delay: 2000,
      disableOnInteraction: false,
  },
  speed: 2000, 
  breakpoints: {
      0: {
          slidesPerView: 1,
      },
      768: {
          slidesPerView: 2,
      },
      1020: {
          slidesPerView: 3,
      },
  },
});





const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minsEl = document.getElementById("minutes"); 
const secondsEl = document.getElementById("seconds");

const newYears = "15 august 2024";

function countdown() {
    const newYearsDate = new Date(newYears);
    const currentDate = new Date();

    const totalSeconds = (newYearsDate - currentDate) / 1000;

    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const mins = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;

    daysEl.innerHTML = days;
    hoursEl.innerHTML = formatTime(hours);
    minsEl.innerHTML = formatTime(mins);
    secondsEl.innerHTML = formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

countdown();

setInterval(countdown, 1000);



document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('.scale-btn');

    buttons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault();

            var parentBox = button.closest('.box');
            var hiddenContent = parentBox.querySelector('.hidden-content');

            if (hiddenContent.style.display == 'none') {
                hiddenContent.style.display = 'block';
                button.textContent = 'Read less';
            } else {
                hiddenContent.style.display = 'none';
                button.textContent = 'Read more';
            }
        });
    });
});




const searchBox = document.getElementById('search-box');
    const voiceSearchButton = document.getElementById('voice-search');
    
    // Check if browser supports Web Speech API
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        
        recognition.lang = navigator.language;
        
        voiceSearchButton.addEventListener('click', () => {
            recognition.start();
        });

        recognition.onresult = (event) => {
            const result = event.results[0][0].transcript;
            searchBox.value = result;
        };
        
        recognition.onerror = (event) => {
            console.error('Voice recognition error:', event.error);
        };
    } else {
        voiceSearchButton.style.display = 'none';
    }





    document.addEventListener('DOMContentLoaded', function() {
        const addToCartButtons = document.querySelectorAll('.addToCartBtn');
        const shoppingCart = document.querySelector('.shopping-cart');
        const shoppingCartContent = shoppingCart.querySelector('.content');
        const successPopup = document.getElementById('successPopup');

        function closePopup() {
            successPopup.style.display = 'none';
        }
    
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault(); 
    
                successPopup.style.display = 'block';
    
                setTimeout(closePopup, 3000); 
    
            });
        });
    });
    














document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.addToCartBtn');
    const shoppingCart = document.querySelector('.shopping-cart');
    const shoppingCartContent = shoppingCart.querySelector('.content');
    let totalPrice = 0;
    let totalItemCount = 0;

    loadCartFromLocalStorage(); 

    updateTotalPrice();
    updateCartItemCount();

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const productBox = this.closest('.box');
            const productName = productBox.querySelector('h1').innerText;
            const productPrice = parseFloat(productBox.querySelector('.price').innerText.replace('₹', ''));
            let cartItem = shoppingCartContent.querySelector(`.cart-item[data-name="${productName}"]`);
            let quantity = 1;

            if (cartItem) {
                quantity = parseInt(cartItem.dataset.quantity) + 1;
                cartItem.querySelector('.quantity').textContent = quantity;
                cartItem.dataset.quantity = quantity;
            } else {
                cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.dataset.name = productName;
                cartItem.dataset.quantity = 1;
                cartItem.innerHTML = `
                    <div class="cart-item-info">
                        <img src="${productBox.querySelector('img').src}" width="50px">
                        <span>${productName}</span>
                        <span class="price">₹ ${productPrice.toFixed(2)}</span>
                    </div>
                    <div class="quantity-controls">
                        <button class="quantity-btn increase">+</button>
                        <span class="quantity">${quantity}</span>
                        <button class="quantity-btn decrease">-</button>
                    </div>
                    <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
                `;
                shoppingCartContent.appendChild(cartItem);
            }

            updateTotalPrice();
            updateCartItemCount();
            saveCartToLocalStorage();

            cartItem.querySelector('.increase').addEventListener('click', function () {
                const currentQuantity = parseInt(cartItem.dataset.quantity);
                if (currentQuantity < 100) {
                    const newQuantity = currentQuantity + 1;
                    cartItem.querySelector('.quantity').textContent = newQuantity;
                    cartItem.dataset.quantity = newQuantity;
                    updateTotalPrice();
                    updateCartItemCount();
                    saveCartToLocalStorage();
                }
            });

            cartItem.querySelector('.decrease').addEventListener('click', function () {
                const currentQuantity = parseInt(cartItem.dataset.quantity);
                if (currentQuantity > 1) {
                    const newQuantity = currentQuantity - 1;
                    cartItem.querySelector('.quantity').textContent = newQuantity;
                    cartItem.dataset.quantity = newQuantity;
                    updateTotalPrice();
                    updateCartItemCount();
                    saveCartToLocalStorage(); 
                }
            });

            cartItem.querySelector('.delete-btn').addEventListener('click', function () {
                cartItem.remove();
                updateTotalPrice();
                updateCartItemCount();
                saveCartToLocalStorage(); 
            });

            cartItem.classList.add('added');
            setTimeout(() => {
                cartItem.classList.remove('added');
            }, 2000);

            shoppingCart.style.display = 'block';
        });
    });

    function calculateTotalPrice() {
        let totalPrice = 0;
        const cartItems = shoppingCartContent.querySelectorAll('.cart-item');
        cartItems.forEach(cartItem => {
            const quantity = parseInt(cartItem.dataset.quantity);
            const price = parseFloat(cartItem.querySelector('.price').textContent.replace('₹', ''));
            totalPrice += quantity * price;
        });
        return totalPrice;
    }

    function updateTotalPrice() {
        totalPrice = calculateTotalPrice();
        document.getElementById('total-price').textContent = `Total Price: ₹ ${totalPrice.toFixed(2)}`;
    }

    function updateCartItemCount() {
        const cartItems = shoppingCartContent.querySelectorAll('.cart-item');
        totalItemCount = Array.from(cartItems).reduce((total, item) => {
            return total + parseInt(item.dataset.quantity);
        }, 0);
        const cartCount = document.getElementById('cart-count');
        cartCount.textContent = totalItemCount > 0 ? totalItemCount : '';
    }

    function saveCartToLocalStorage() {
        const cartItems = Array.from(shoppingCartContent.querySelectorAll('.cart-item')).map(cartItem => ({
            name: cartItem.dataset.name,
            quantity: parseInt(cartItem.dataset.quantity),
            price: parseFloat(cartItem.querySelector('.price').textContent.replace('₹', '')),
            imgSrc: cartItem.querySelector('img').src
        }));
        localStorage.setItem('cart', JSON.stringify(cartItems));
        localStorage.setItem('totalPrice', totalPrice.toFixed(2));
    }

    function loadCartFromLocalStorage() {
        const savedCart = JSON.parse(localStorage.getItem('cart'));
        if (savedCart) {
            savedCart.forEach(item => {
                let cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.dataset.name = item.name;
                cartItem.dataset.quantity = item.quantity;
                cartItem.innerHTML = `
                    <div class="cart-item-info">
                        <img src="${item.imgSrc}" width="50px">
                        <span>${item.name}</span>
                        <span class="price">&nbsp ₹${item.price.toFixed(2)}</span>
                    </div>
                    <div class="quantity-controls">
                        <button class="quantity-btn increase">+</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn decrease">-</button>
                    </div>
                    <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
                `;
                shoppingCartContent.appendChild(cartItem);

                cartItem.querySelector('.increase').addEventListener('click', function () {
                    if (item.quantity < 100) {
                        item.quantity++;
                        cartItem.querySelector('.quantity').textContent = item.quantity;
                        cartItem.dataset.quantity = item.quantity;
                        updateTotalPrice();
                        updateCartItemCount();
                        saveCartToLocalStorage();
                    }
                });

                cartItem.querySelector('.decrease').addEventListener('click', function () {
                    if (item.quantity > 1) {
                        item.quantity--;
                        cartItem.querySelector('.quantity').textContent = item.quantity;
                        cartItem.dataset.quantity = item.quantity;
                        updateTotalPrice();
                        updateCartItemCount();
                        saveCartToLocalStorage();
                    }
                });

                cartItem.querySelector('.delete-btn').addEventListener('click', function () {
                    cartItem.remove();
                    updateTotalPrice();
                    updateCartItemCount();
                    saveCartToLocalStorage();
                });
            });

            totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;
        }
    }
});









    
    






    


    




    function animateOnScroll() {
        var elements = document.querySelectorAll('.scroll-animation');
    
        elements.forEach(function(element) {
            var distanceFromTop = element.getBoundingClientRect().top;
            var windowHeight = window.innerHeight;
    
            // Check if the element is in view when scrolling down
            if (distanceFromTop - windowHeight <= 0) {
                element.classList.add('active');
            } else {
                element.classList.remove('active'); // Remove the 'active' class if the element is not in view when scrolling down
            }
    
            // Check if the element is in view when scrolling up
            var distanceFromBottom = element.getBoundingClientRect().bottom;
            if (distanceFromBottom >= 0 && distanceFromBottom <= windowHeight) {
                element.classList.add('active');
            } else {
                element.classList.remove('active'); // Remove the 'active' class if the element is not in view when scrolling up
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    
    // Trigger animation on page load
    animateOnScroll();
    
    
    
   
    


   


    document.addEventListener('DOMContentLoaded', function() {
        const carousel = document.getElementById('carousel');
        const leftButton = document.getElementById('left');
        const rightButton = document.getElementById('right');
      
        leftButton.addEventListener('click', function() {
          carousel.scrollBy({
            left: -300, // Adjust scroll amount as needed
            behavior: 'smooth'
          });
        });
      
        rightButton.addEventListener('click', function() {
          carousel.scrollBy({
            left: 300, // Adjust scroll amount as needed
            behavior: 'smooth'
          });
        });
      });
      











      

      document.addEventListener('DOMContentLoaded', function() {
        // Get all navbar links
        const navbarLinks = document.querySelectorAll('.navbar a');

        // Function to handle click event
        function handleLinkClick(event) {
            event.preventDefault(); // Prevent default anchor behavior

            // Get the target section id from the link's href
            const targetId = event.currentTarget.getAttribute('href').substring(1);

            // Get the target section element
            const targetSection = document.getElementById(targetId);

            // Scroll to the target section
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth' // Smooth scroll
                });
            }
        }

        // Attach click event listener to each navbar link
        navbarLinks.forEach(link => {
            link.addEventListener('click', handleLinkClick);
        });
    });














    document.addEventListener('DOMContentLoaded', function() {
        const searchBox = document.getElementById('search-box');
        const recommendationList = document.getElementById('recommendation-list');
        let selectedRecommendationIndex = -1;
    
        // Sample data for recommendations
        const sampleData = [
            'Kaju', 'Moong Dal', 'Anjeer', 'Badam', 'Bajra', 'Beans', 'Besan', 'Akhrot', 'Brush', 'Caramon', 
            'Chaipatti', 'Chocolates', 'Clothes Soap', 'Cloves', 'Coffe', 'Garam Masala', 'Gehu', 'Haldi Powder',
            'Handwash', 'Jaggery', 'Kishmish', 'Ghee', 'Laal Chana', 'Masoor Dal', 'Mirchi Powder', 'Oats', 'Oil',
            'Pista', 'Rice', 'Salt', 'Shampoo', 'Soap', 'Sugar', 'Toor Dal', 'Urad Dal', 'Washing Powder', 'Moth'
        ];
    
        function showRecommendations(query) {
            recommendationList.innerHTML = '';
    
            if (query.trim()) { // Trim leading and trailing spaces
                const filteredData = sampleData.filter(item => item.toLowerCase().includes(query.toLowerCase()));
    
                filteredData.forEach((item, index) => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `<i class="fas fa-search" id="search2"></i>&nbsp &nbsp &nbsp ${item}`;
                    listItem.addEventListener('click', function() {
                        searchBox.value = item;
                        recommendationList.innerHTML = '';
                        recommendationList.style.display = 'none';
                    });
                    recommendationList.appendChild(listItem);
                });
    
                selectedRecommendationIndex = -1; // Reset selection when new recommendations are shown
                recommendationList.style.display = 'block';
            } else {
                recommendationList.style.display = 'none';
            }
        }
    
        function highlightRecommendation() {
            const recommendations = recommendationList.querySelectorAll('li');
            recommendations.forEach((item, index) => {
                if (index === selectedRecommendationIndex) {
                    item.classList.add('selected');
                    item.scrollIntoView({ block: 'nearest' });
                } else {
                    item.classList.remove('selected');
                }
            });
        }
    
        searchBox.addEventListener('input', function() {
            const query = searchBox.value.toLowerCase().trim(); // Trim leading and trailing spaces
            showRecommendations(query);
        });
    
        searchBox.addEventListener('keydown', function(event) {
            const recommendations = recommendationList.querySelectorAll('li');
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                if (selectedRecommendationIndex < recommendations.length - 1) {
                    selectedRecommendationIndex++;
                    highlightRecommendation();
                }
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                if (selectedRecommendationIndex > 0) {
                    selectedRecommendationIndex--;
                    highlightRecommendation();
                }
            } else if (event.key === 'Enter' && selectedRecommendationIndex !== -1) {
                event.preventDefault();
                const selectedRecommendation = recommendations[selectedRecommendationIndex];
                if (selectedRecommendation) {
                    searchBox.value = selectedRecommendation.textContent;
                    recommendationList.style.display = 'none';
                }
            }
        });
    
        // Hide the recommendation list if clicked outside
        document.addEventListener('click', function(event) {
            if (!searchBox.contains(event.target) && !recommendationList.contains(event.target)) {
                recommendationList.style.display = 'none';
            }
        });
    
        // Prevent the search form from toggling when clicking on recommendations
        document.querySelector('.recommendation-list').addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent event bubbling to the document body
        });

        document.querySelector('#search-btn').addEventListener('click', function() {
            recommendationList.innerHTML = '';
            recommendationList.style.display = 'none';
        });


// Ensure recommendation list is hidden when login button is clicked
document.querySelector('#login-btn').addEventListener('click', function() {
    recommendationList.innerHTML = '';
    recommendationList.style.display = 'none';
});

// Ensure recommendation list is hidden when cart button is clicked
document.querySelector('#cart-btn').addEventListener('click', function() {
    recommendationList.innerHTML = '';
    recommendationList.style.display = 'none';
});

    });
    
  




    var btns = document.querySelectorAll('.btn3');
  
    btns.forEach(function(btn3) {
      btn3.addEventListener('click', function(event) {
        event.preventDefault(); 
  
        var cssFile = document.createElement('link');
        cssFile.rel = 'stylesheet';
        cssFile.type = 'text/css';
        cssFile.href = 'Feedback Form CSS.css';
        document.head.appendChild(cssFile); 
  
        window.location.href = 'Feedback Form HTML.html';
        setTimeout(function() {
          window.location.href = 'Feedback Form Confirm HTML and CSS.html';
        }, 1000); 
      });
    });







    document.querySelectorAll('a.links').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('id');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });





    var btns = document.querySelectorAll('.btn2');
      
    btns.forEach(function(btn2) {
      btn2.addEventListener('click', function(event) {
        event.preventDefault(); 
  
        var cssFile = document.createElement('link');
        cssFile.rel = 'stylesheet';
        cssFile.type = 'text/css';
        cssFile.href = 'Best deals CSS.css';
        document.head.appendChild(cssFile);
  
        var jsFile = document.createElement('script');
        jsFile.src = 'Best Deals JS.js';
        document.body.appendChild(jsFile);
  
        window.location.href = 'Best deals HTML.html';
      });
    });
