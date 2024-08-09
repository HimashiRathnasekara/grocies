document.addEventListener('DOMContentLoaded', () => {
    const addtofavbutton = document.getElementById('addtofav');
    const applyfav = document.getElementById("applyfav");
    const buyNowButton = document.getElementById("buyNowButton");
    const buynoebtn = document.getElementById("paynowbutton");
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function addToCart(itemName, itemPrice, inputId) {
        let quantityInput = document.getElementById(inputId);
        let quantity = parseInt(quantityInput.value) || 0;
        if (quantity > 0) {
            let existingItem = cart.find(item => item.name === itemName);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ name: itemName, price: itemPrice, quantity: quantity });
            }
            updateCart();
        }
        quantityInput.value = '';
    }

    function updateCart() {
        let cartItems = document.getElementById('cartItems');
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            let row = document.createElement('tr');

            let itemName = document.createElement('td');
            itemName.textContent = item.name;
            row.appendChild(itemName);

            let itemPrice = document.createElement('td');
            itemPrice.textContent = `Rs. ${item.price}`;
            row.appendChild(itemPrice);

            let itemQuantity = document.createElement('td');
            itemQuantity.textContent = item.quantity;
            row.appendChild(itemQuantity);

            let itemTotal = document.createElement('td');
            itemTotal.textContent = `Rs. ${item.price * item.quantity}`;
            row.appendChild(itemTotal);

            cartItems.appendChild(row);

            total += item.price * item.quantity;
        });

        document.getElementById('cartTotalPrice').textContent = `Total: Rs. ${total}`;
    }

    function buyNow() {
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
            window.location.href = 'PaymentPage.html';
        } else {
            alert('Your cart is empty.');
        }
    }

    function saveToFavorites() {
        localStorage.setItem('favoriteCart', JSON.stringify(cart));
        alert('Your favorites have been saved!');
    }

    function applyFavorites() {
        let favoriteCart = JSON.parse(localStorage.getItem('favoriteCart'));
        if (favoriteCart) {
            cart = favoriteCart;
            updateCart();
            alert('Favorites applied to cart!');
        } else {
            alert('No favorites found.');
        }
    }

    // Handle Add to Cart button clicks
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            let productGrid = button.parentElement;
            let itemName = productGrid.querySelector('h3').textContent.trim();
            let itemPrice = parseInt(productGrid.querySelector('.price').textContent.replace('Rs.', '').trim());
            let inputId = productGrid.querySelector('input').id;

            addToCart(itemName, itemPrice, inputId);
        });
    });

    // Handle Buy Now button click
    if (buyNowButton) {
        buyNowButton.addEventListener('click', buyNow);
    }

    // Handle Save to Favorites button click
    if (addtofavbutton) {
        addtofavbutton.addEventListener('click', saveToFavorites);
    }

    // Handle Apply Favorites button click
    if (applyfav) {
        applyfav.addEventListener('click', applyFavorites);
    }

    // Handle Pay Now button click (added functionality)
    if (buynoebtn) {
        buynoebtn.addEventListener("click", function() {
            // Get form input values
            const name = document.getElementById('name').value.trim();
            const address = document.getElementById('address').value.trim();
            const contactNumber = document.getElementById('contact number').value.trim();
            const paymentMethod = document.getElementById('payment').value;

            // Validate each input separately
            if (name === "") {
                alert('Please enter your name.');
                return;
            }

            if (address === "") {
                alert('Please enter your delivery address.');
                return;
            }

            if (contactNumber === "") {
                alert('Please enter your contact number.');
                return;
            }

            // Directly check if contactNumber is a valid number
            if (isNaN(contactNumber)) {
                alert('Please enter a valid contact number (numbers only).');
                return;
            }

            if (paymentMethod === "") {
                alert('Please select a payment method.');
                return;
            }

            // Calculate and format delivery date (7 days from today)
            const deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + 1);
            const formattedDeliveryDate = deliveryDate.toLocaleDateString();

            // Display the thank you message
            alert(`Thank you for your purchase, ${name}!\nYour order will be delivered by ${formattedDeliveryDate}.`);

            // Clear all the input fields after the alert is dismissed
            document.getElementById('name').value = "";
            document.getElementById('address').value = "";
            document.getElementById('contact number').value = "";
            document.getElementById('payment').selectedIndex = 0; // Reset to first option in the dropdown
        });

        document.addEventListener('DOMContentLoaded', function() {
            // Get the table body and total price elements
            let orderTableBody = document.getElementById('summaryitems');
            let orderTotalPrice = document.getElementById('orderTotalPrice');
            
            // Get the cart data from localStorage or use an empty array if nothing is found
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
            // Function to show order details
            function displayOrderDetails() {
                orderTableBody.innerHTML = '';  // Clear the table body
                let total = 0;  // Initialize total price
        
                // Loop through each item in the cart
                cart.forEach(function(item) {
                    let row = document.createElement('tr');  // Create a new row
        
                    // Create and add cells for item details
                    let itemName = document.createElement('td');
                    itemName.textContent = item.name;
                    row.appendChild(itemName);
        
                    let itemQuantity = document.createElement('td');
                    itemQuantity.textContent = item.quantity;
                    row.appendChild(itemQuantity);
        
                    let itemPrice = document.createElement('td');
                    itemPrice.textContent = 'Rs. ' + item.price;
                    row.appendChild(itemPrice);
        
                    let itemTotal = document.createElement('td');
                    itemTotal.textContent = 'Rs. ' + (item.price * item.quantity);
                    row.appendChild(itemTotal);
        
                    // Add the row to the table
                    orderTableBody.appendChild(row);
        
                    // Update the total price
                    total += item.price * item.quantity;
                });
        
                // Display the total price
                orderTotalPrice.textContent = 'Rs. ' + total;
            }
        
            // Show the order details when the page is fully loaded
            displayOrderDetails();
        });
        

        
    }

});
