import restApiUrl from '../../js/script.js'
const productsContainer = document.querySelector(".products");
let allProducts = []; // Переменная для хранения всех продуктов

function getAllProducts() {
    axios.get(`${restApiUrl}/products/all`)
        .then((response) => {
            console.log(response.data); // данные продуктов
            allProducts = response.data; // Сохраняем все продукты
            showProducts(allProducts); // Показываем все продукты
            showCategories(allProducts); // Показываем категории
            addRateFilter(allProducts)
        })
        .catch((error) => {
            console.log(error.message); // обработка ошибок
        });
}

function showProducts(products){
    productsContainer.innerHTML = "";

    products.forEach(product =>{
        const productDiv= document.createElement("div");
        productDiv.classList.add("col");

        productDiv.innerHTML = `
        <div class="card h-100 border-0">
                <div class="bg-light-grey p-3">
                    <img src="${product.imageUrl}" class="card-img-top productImage" alt="" data-product='${JSON.stringify(product)}'>
                </div>
                <div class="card-body">
                    <h6 class="card-tittle">${product.brand} ${product.model}</h6>
                    <p class="card-text">
                        <div class="text-danger">
                            ${product.price}
                        </div>
                        <div>
                            ${showRate(product.rate)}
                            <span class="text-secondary">(${product.rewiewsCount || Math.round(Math.random() * 100)})</span>
                        </div>
                        <div>
                            <button class="btn btn-dark w-100 my-2 add-to-cart" data-product="${JSON.stringify(product)}">add to cart</button>
                        </div>
                    </p>
                </div>
            </div>
        `;
        productsContainer.appendChild(productDiv)
    });

    console.log('Product displayed');

    document.querySelectorAll('.add-to-cart')
.forEach(button =>{
    button.addEventListener('click', function (){
        const product = JSON.parse(this.getAttribute('data-product'))
        addToCart(product);
    })
})

document.querySelectorAll('.productImage').forEach(image=>{
    image.addEventListener('click', function(){
        const product = JSON.parse(this.getAttribute('data-product'));
        localStorage.setItem("product", JSON.stringify(product))
        window.location.href = '/pages/product/product.html';
    })
})

}

function showRate(rate){
    let stars = '';
    for (let i = 1; i <= rate; i++){
        stars += '<i class="bi bi-star-fill text-warning"></i>'
    }
    return stars;
}

function addToCart(product){
    const token = localStorage.getItem('token');
    console.log("Token:", token)

    if (token) {
        axios.post(`${restApiUrl}/cart/${product.id}?quantity=1`, {},{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response =>{
            alert("Продукт добавлен в корзину")
            console.log("Product added to cart:", response.data);
        })
        .catch(error =>{
            console.log("Ошибка при добавлении товара в корзину:", error.message);
        })
    } else{
        console.error("Ошибка: Токен авторизации не найден")
    }
}

function showCategories(products){
    const categories = document.querySelector(".categories");
    categories.innerHTML = "";
    let categoriesList = products.map((product) => {
        return product.category;
    });

    const uniqueCategories = new Set(categoriesList);

    uniqueCategories.forEach((category)=>{
        const div = document.createElement("div");
        div.innerText = category;
        div.classList.add("my-1");
        categories.append(div);

        div.addEventListener("click", () =>{
            const filteredProducts = products.filter((product) => {
                return product.category === category;
            });
            showProducts(filteredProducts)
        })
    })
}
function addRateFilter(allProducts){
    const rateList = document.querySelector(".rate");
rateList.forEach(rate => {
    rate.addEventListener("click", () =>{
        const filteredProducts = allProducts.filter((product) =>{
            return product.rate == rate.dataset.rate;
        });
        showProducts(filteredProducts)
    })
})
}
document.querySelector(".sortSelect").addEventListener("change", function(event){
    const order = event.target.value === "1" ? 'asc' : 'desc';
    const sortedProducts = sortProductsByPrice(allProducts,order);
    showProducts(sortedProducts)
});

function sortedProductsByPrice(products, order = 'asc'){
    return product.sort((a,b) =>{
        if(order === 'asc'){
            return a.price - b.price;
        } else if(order === 'desc'){
            return b.price - a.price;
        }else{
            console.error('Invalid order parametr');
            return 0;
        }
    })
}

document.querySelector("allProductsBtn").addEventListener("click", () =>{
    getAllProducts();
})

document.querySelector(".searchInput").addEventListener("input", (e) => {
    let searchWord = e.target.value.toLowerCase();
    let filteredProducts;

    filteredProducts = allProducts.filter((product) =>{
        const brandAndModel = (product.brand + " " + product.model).toLowerCase();
        return brandAndModel.includes(searchWord);
    });

    if(searchWord === ""){
        filteredProducts = allProducts;
    }

    showProducts(filteredProducts);
})


getAllProducts()