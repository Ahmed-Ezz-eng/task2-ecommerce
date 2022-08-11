let api = `../data.json`;

// variables
let productContainer = document.querySelector(".product-container");
let displayBtn = document.querySelectorAll(".filter i");
// fetch data

const fetchProducts = async (apiLink) => {
    const response = await fetch(apiLink);
    const {products} = await response.json();
    setData(products);
}


fetchProducts(api);

function setData(data) {
    const allProducts = data.map(product => {
        return `
            <div class="product-box">
                <div class="product-img">
                    <img src=${product.img} alt=${product.title} />

                    <div class="product-icons">
                        <i class="fa-regular fa-heart"></i>
                        <i class="fa-solid fa-cart-shopping"></i>
                        <i class="fa-solid fa-arrows-rotate"></i>
                    </div>
                </div>

                <div class = "product-info">
                    <h3>${product.title}</h3>
                    <div class="product-price">
                        <span class="discount">$${product.discount}</span>
                        <span class="price">$${product.price}</span>   
                    </div>

                    ${productContainer.classList.contains("list") ?
                    `
                        <p>${product.desc}</p>
                        <button>add to cart</button>
                    ` : ""
                }
                
                </div>

            </div>
        `;

    })
    productContainer.innerHTML += allProducts.join("");
}



// toggle display
function toggleDisplay(element, display) {
    if (display === "grid") {
        element.classList.remove("list");
        element.classList.add("grid");
        fetchProducts(api);
    } else {
        element.classList.remove("grid");
        element.classList.add("list");
    }
}

displayBtn.forEach(btn => {
    btn.addEventListener("click", function() {
        displayBtn.forEach(el => el.classList.remove("active"));
        this.classList.add("active");
        
        let display = this.dataset.display;
        toggleDisplay(productContainer, display);
        
    })
})

