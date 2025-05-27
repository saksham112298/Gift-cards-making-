document.addEventListener("DOMContentLoaded", () => {
  const giftCards = [
    { name: "Amazon", image: "images/amazon.png" },
    { name: "Flipkart", image: "images/flipkart.png" },
    { name: "BookMyShow", image: "images/bookmyshow.png" },
    { name: "Zomato", image: "images/zomato.png" }
  ];

  const cardContainer = document.getElementById("card-container");
  const searchInput = document.getElementById("search");
  const darkToggle = document.getElementById("dark-toggle");
  const homeScreen = document.getElementById("home-screen");
  const paymentScreen = document.getElementById("payment-screen");
  const confirmationScreen = document.getElementById("confirmation-screen");

  const selectedBrand = document.getElementById("selected-brand");
  const payButton = document.getElementById("pay-button");
  const amountInput = document.getElementById("amount");

  const upiOption = document.getElementById("upi-option");
  const cardOption = document.getElementById("card-option");

  const selectedMethod = document.getElementById("selected-method");
  const loader = document.getElementById("loader");
  const confirmCode = document.getElementById("confirm-code");

  let currentBrand = "";
  let currentMethod = "UPI";

  // Load cards
  function displayCards(cards) {
    cardContainer.innerHTML = "";
    cards.forEach(card => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `<img src="${card.image}" alt="${card.name}"><p>${card.name}</p>`;
      div.onclick = () => {
        currentBrand = card.name;
        selectedBrand.textContent = currentBrand;
        homeScreen.classList.add("hidden");
        paymentScreen.classList.remove("hidden");
      };
      cardContainer.appendChild(div);
    });
  }

  displayCards(giftCards);

  // Search filter
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    const filtered = giftCards.filter(card => card.name.toLowerCase().includes(value));
    displayCards(filtered);
  });

  // Dark mode toggle
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // Select payment method
  upiOption.addEventListener("click", () => {
    currentMethod = "UPI";
    upiOption.style.border = "2px solid #007bff";
    cardOption.style.border = "none";
  });

  cardOption.addEventListener("click", () => {
    currentMethod = "Card";
    cardOption.style.border = "2px solid #007bff";
    upiOption.style.border = "none";
  });

  // Pay button
  payButton.addEventListener("click", () => {
    if (!amountInput.value || isNaN(amountInput.value)) {
      alert("Please enter a valid amount.");
      return;
    }

    paymentScreen.classList.add("hidden");
    loader.classList.remove("hidden");

    setTimeout(() => {
      loader.classList.add("hidden");
      confirmationScreen.classList.remove("hidden");
      selectedMethod.textContent = currentMethod;
      confirmCode.textContent = generateCode();
      confettiEffect();
    }, 2000);
  });

  // Generate random gift card code
  function generateCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 13; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  }

  // Confetti animation (simple)
  function confettiEffect() {
    const duration = 1 * 1000;
    const end = Date.now() + duration;
    const colors = ['#bb0000', '#ffffff', '#0000bb', '#00bb00'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
});
