const product = JSON.parse(localStorage.getItem("product"))
if (!product) {
    console.error("Ошибка: Продукт не найден в localStorage.")
}

const productElement = document.querySelector(".productElement")
productElement.innerHTML = `
<div class="col-7 p-5">
                <img class="w-100" src="${product.imageUrl}" alt="">
            </div>
            <div class="col-5">
                <h3>${product.brand} ${product.model}</h3>
                <div class="text-warning">
                  <i class="bi bi-star-fill text-warning"></i>
                  <i class="bi bi-star-fill text-warning"></i>
                  <i class="bi bi-star-fill text-warning"></i>
                  <i class="bi bi-star-fill text-warning"></i>
                  <i class="bi bi-star-fill text-warning"></i>
                </div>
                <span class="text-secondary">(150 rewiews)</span>
            
            <p class="fs-3 my-2">
                ${product.price}
            </p>
            <p>
                ${product.descriprion}
            </p>
            <hr>
            </hr>
            <button class="btn btn-dark p-3 px-5">
                add to card-text
            </button>
            <div class="mt-3 border rounded border-1 border-black p-3 d-flex gap-4">
                <div>
                    <i class="bi bi-box fs-1"></i>
                </div>
                <div>
                    <h4>
                        Free Delivery
                    </h4>
                    <p class="fw-semibold">
                        <u>
                            Enter your postal code for Delivery Availability
                        </u>
                    </p>
                </div>
            </div>
            <div class="mt-3 border rounded border-1 border-black p-3 d-flex gap-4">
                <div>
                    <i class="bi bi-arrow-counterclockwise fs-1"></i>
                </div>
                <div>
                    <h4>
                        Return Delivery
                    </h4>
                    <p class="fw-semibold">
                        <u>Free 30 days delivery returns. Details </u>
                    </p>
                </div>
            </div>
        </div>
`;


document.querySelector(".productElement").addEventListener("click", (event) =>{
    if(event.target.classList.contain("addToCartBtn")){
        const token = localStorage.getItem('token');
        if(token && product.id){
            axios.post(`${restApiUrl}/cart/${product.id}?quantity=1`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(response =>{
                alert("Product added to cart");
                console.log("Product added to cart:", response.data)
            })
            .catch(error =>{
                console.error("Error adding product to cart:", error.message);
            })
        }else{
            console.error("Error: Product ID not found.")
        }
    }else{
        console.error("Error: Authorization token not found.")
    }
})