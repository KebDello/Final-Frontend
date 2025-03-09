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
                            <span class="text-secondary">(${product.reviewsCount || Math.round(Math.random() * 100)})</span>
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

getAllProducts()