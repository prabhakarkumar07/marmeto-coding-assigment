// Fetching data from the API
fetch(
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
)
  .then((response) => {
    // Checking if response is successful
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    const productContainer = document.getElementById("product-container");
    const male = document.getElementById("m");
    const female = document.getElementById("w");
    const kid = document.getElementById("k");

    // function to create product card dynamically
    function createProductCard(product) {
      const discount = Math.round(
        (1 - product.price / product.compare_at_price) * 100
      );

      // Create elements dynamically
      const card = document.createElement("div");
      card.classList.add("product-card");

      const image = document.createElement("img");
      image.src = product.image;
      image.alt = product.title;

      const detailsContainer = document.createElement("div");
      detailsContainer.classList.add("product_details");

      const badge = product.badge_text ? document.createElement("span") : null;
      if (badge) {
        badge.classList.add("badge");
        badge.textContent = product.badge_text;
      }

      const product_detail = document.createElement("div");
      product_detail.classList.add("product_detail");

      const top = document.createElement("div");
      top.classList.add("top");

      const title = document.createElement("h3");
      title.classList.add("title");
      title.textContent = product.title;

      const vendor = document.createElement("p");
      vendor.classList.add("vendor");
      vendor.textContent = `• ${product.vendor}`;

      const bottom = document.createElement("div");
      bottom.classList.add("bottom");

      const price = document.createElement("p");
      price.classList.add("price");
      price.textContent = `Rs ${product.price}.00`;

      const comparePrice = document.createElement("p");
      comparePrice.classList.add("compare-price");
      comparePrice.textContent = `${product.compare_at_price}.00`;

      const discountText = document.createElement("p");
      discountText.classList.add("discount");
      discountText.textContent = `${discount}% Off`;

      const addToCartBtn = document.createElement("button");
      addToCartBtn.classList.add("addToCartButton");
      addToCartBtn.textContent = "Add to cart";

      // Construct the card structure
      top.appendChild(title);
      top.appendChild(vendor);
      bottom.appendChild(price);
      bottom.appendChild(comparePrice);
      bottom.appendChild(discountText);
      product_detail.appendChild(top);
      product_detail.appendChild(bottom);
      detailsContainer.appendChild(badge || document.createTextNode(""));
      detailsContainer.appendChild(product_detail);
      card.appendChild(image);
      card.appendChild(detailsContainer);
      card.appendChild(addToCartBtn);

      return card;
    }

    // function to display product cards based on category
    function displayProducts(categoryIndex) {
      productContainer.innerHTML = "";
      const category = data.categories[categoryIndex];

      category.category_products.forEach((product) => {
        const productCard = createProductCard(product);
        productContainer.appendChild(productCard);
      });

      // Show corresponding category element
      [male, female, kid].forEach((element, index) => {
        if (index === categoryIndex) {
          element.style.display = "block";
        } else {
          element.style.display = "none";
        }
      });
    }

    // Event listeners for tab switching
    document.getElementById("men-tab").addEventListener("click", () => {
      displayProducts(0);
      setActiveTab(0);
    });

    document.getElementById("women-tab").addEventListener("click", () => {
      displayProducts(1);
      setActiveTab(1);
    });

    document.getElementById("kids-tab").addEventListener("click", () => {
      displayProducts(2);
      setActiveTab(2);
    });

    // Function to set active tab and uproduct_detailate button colors
    function setActiveTab(tabIndex) {
      const tabButtons = document.querySelectorAll(".tab-btn");
      tabButtons.forEach((button, index) => {
        if (index === tabIndex) {
          button.classList.add("active");
          button.style.backgroundColor = "#000";
          button.style.color = "#fff";
        } else {
          button.classList.remove("active");
          button.style.backgroundColor = "";
          button.style.color = "";
        }
      });
    }

    // Initial display of products
    displayProducts(0);
    setActiveTab(0);
  })
  .catch((error) => console.error("Error fetching data:", error));
