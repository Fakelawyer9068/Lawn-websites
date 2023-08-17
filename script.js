const lawnSizeSelect = document.getElementById('lawnSize');
const daySelect = document.getElementById('day');
const addressInput = document.getElementById('address');
const phoneInput = document.getElementById('phone'); // Added this line
const calculateButton = document.getElementById('calculateButton');
const totalPriceSpan = document.getElementById('totalPrice');

const confirmationSection = document.getElementById('confirmationSection');
const confirmedLawnSizeSpan = document.getElementById('confirmedLawnSize');
const confirmedDaySpan = document.getElementById('confirmedDay');
const confirmedAddressSpan = document.getElementById('confirmedAddress');
const confirmedPhoneSpan = document.getElementById('confirmedPhone'); // Added this line
const confirmedTotalPriceSpan = document.getElementById('confirmedTotalPrice');
const confirmOrderButton = document.getElementById('confirmOrderButton');

let calculatedPrice = null;

lawnSizeSelect.addEventListener('change', updatePrice);
daySelect.addEventListener('change', updatePrice);

calculateButton.addEventListener('click', () => {
    calculatedPrice = calculatePrice();
    const selectedDay = daySelect.value;
    const enteredAddress = addressInput.value;
    const enteredPhone = phoneInput.value; // Get the entered phone number

    confirmationSection.style.display = 'block';
    confirmedLawnSizeSpan.textContent = lawnSizeSelect.value;
    confirmedDaySpan.textContent = selectedDay;
    confirmedAddressSpan.textContent = enteredAddress;
    confirmedPhoneSpan.textContent = enteredPhone; // Display the entered phone number
    confirmedTotalPriceSpan.textContent = calculatedPrice.toFixed(2);
});

confirmOrderButton.addEventListener('click', () => {
    // You can add email sending or other processing here
    // For demonstration purposes, this just shows an alert
    alert('Order confirmed!');
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
            price = 50;
            break;
        case 'extra-large':
            price = 60;
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
