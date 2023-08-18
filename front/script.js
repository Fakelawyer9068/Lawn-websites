const lawnSizeSelect = document.getElementById('lawnSize');
const daySelect = document.getElementById('day');
const addressInput = document.getElementById('address');
const phoneInput = document.getElementById('phone');
const calculateButton = document.getElementById('calculateButton');
const totalPriceSpan = document.getElementById('totalPrice');

const confirmationSection = document.getElementById('confirmationSection');
const confirmedLawnSizeSpan = document.getElementById('confirmedLawnSize');
const confirmedDaySpan = document.getElementById('confirmedDay');
const confirmedAddressSpan = document.getElementById('confirmedAddress');
const confirmedPhoneSpan = document.getElementById('confirmedPhone');
const confirmedTotalPriceSpan = document.getElementById('confirmedTotalPrice');
const confirmOrderButton = document.getElementById('confirmOrderButton');

let calculatedPrice = null;

lawnSizeSelect.addEventListener('change', updatePrice);
daySelect.addEventListener('change', updatePrice);

calculateButton.addEventListener('click', () => {
    calculatedPrice = calculatePrice();
    const selectedDay = daySelect.value;
    const enteredAddress = addressInput.value;
    const enteredPhone = phoneInput.value;

    confirmationSection.style.display = 'block';
    confirmedLawnSizeSpan.textContent = lawnSizeSelect.value;
    confirmedDaySpan.textContent = selectedDay;
    confirmedAddressSpan.textContent = enteredAddress;
    confirmedPhoneSpan.textContent = enteredPhone;
    confirmedTotalPriceSpan.textContent = calculatedPrice.toFixed(2);
});

confirmOrderButton.addEventListener('click', () => {
    const confirmedLawnSize = confirmedLawnSizeSpan.textContent;
    const confirmedDay = confirmedDaySpan.textContent;
    const confirmedAddress = confirmedAddressSpan.textContent;
    const confirmedPhone = confirmedPhoneSpan.textContent;
    const confirmedTotalPrice = confirmedTotalPriceSpan.textContent;

    const data = {
        lawnSize: confirmedLawnSize,
        day: confirmedDay,
        address: confirmedAddress,
        phone: confirmedPhone,
        totalPrice: confirmedTotalPrice,
    };

    // Replace 'https://your-backend-url' with the actual URL of your deployed backend
    const backendBaseUrl = 'https://shrouded-smooth-belief.glitch.me/sever.js';

    // Submit inquiry to backend
    fetch(`${backendBaseUrl}/submit-inquiry`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        // Optionally show a success message to the user
    })
    .catch(error => {
        console.error('Error:', error);
        // Optionally show an error message to the user
    });

    // Fetch inquiries from backend
    fetch(`${backendBaseUrl}/get-inquiries`)
    .then(response => response.json())
    .then(data => {
        console.log(data); // Print the retrieved data to the browser console
        // You can now use this data to update your frontend UI
    })
    .catch(error => {
        console.error('Error fetching inquiries:', error);
    });

    // Redirect to "finished.html"
    window.location.href = 'finished.html';
});

function calculatePrice() {
    const selectedSize = lawnSizeSelect.value;
    let price = 0;

    switch (selectedSize) {
        case 'small':
            price = 30;
            break;
        case 'medium':
            price = 40;
            break;
        case 'large':
            price = 60;
            break;
        case 'extra-large':
            price = 75;
            break;
    }

    return price;
}

function updatePrice() {
    if (calculatedPrice !== null) {
        totalPriceSpan.textContent = calculatedPrice.toFixed(2);
        totalPriceSpan.style.display = 'block';
    } else {
        totalPriceSpan.style.display = 'none';
    }
}

// ... (remaining functions)
