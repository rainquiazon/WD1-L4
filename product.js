

var total = 0;

function addToCart(name, price) {
  alert(name + " has been added to your cart!");

  var cartContent = document.querySelector(".cart-content");
  var totalDisplay = document.querySelector(".cart-total h3");

  // remove the "No items yet." text if present
  if (cartContent.innerText === "No items yet.") {
    cartContent.innerHTML = "";
  }

  // create a new item
  var item = document.createElement("div");
  item.className = "cart-item";

  var text = document.createElement("span");
  text.textContent = name + " - ₱" + price;

  var removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.style.marginLeft = "10px";

  // remove button function
  removeBtn.onclick = function() {
    cartContent.removeChild(item);
    total -= price;
    totalDisplay.textContent = "Total: ₱" + total.toFixed(2);

    // if cart is empty, show message again
    if (cartContent.children.length === 0) {
      cartContent.innerHTML = "<p>No items yet.</p>";
    }
  };

  item.appendChild(text);
  item.appendChild(removeBtn);
  cartContent.appendChild(item);

  total += price;
  totalDisplay.textContent = "Total: ₱" + total.toFixed(2);
}

// connect buttons to addToCart
window.onload = function() {
  var cards = document.querySelectorAll(".card");

  for (var i = 0; i < cards.length; i++) {
    (function(card) {
      var btn = card.querySelector("button");
      var name = card.querySelector("h3").innerText;
      var priceText = card.querySelector("p").innerText.replace("₱", "");
      var price = parseFloat(priceText);

      btn.onclick = function() {
        addToCart(name, price);
      };
    })(cards[i]);
  }

  // checkout button
  var checkoutBtn = document.querySelector(".cart-total button");
  checkoutBtn.onclick = function() {
    if (total > 0) {
      alert("Checkout successful! Thank you for your purchase.");
      var cartContent = document.querySelector(".cart-content");
      var totalDisplay = document.querySelector(".cart-total h3");
      cartContent.innerHTML = "<p>No items yet.</p>";
      total = 0;
      totalDisplay.textContent = "Total: ₱0.00";
    } else {
      alert("Your cart is empty!");
    }
  };
};
