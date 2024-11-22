function addProductDOM(product) {
    const products = document.getElementById("products");
    const productElement = document.createElement("div");
    productElement.className = "product";

    const editButton = document.createElement("a");
    editButton.innerHTML = 'Edit';
    editButton.className = "edit-product";
    editButton.setAttribute("data-id", product.id);
    editButton.addEventListener("click", editProductToggle);

    const deleteButton = document.createElement("a");
    deleteButton.innerHTML = 'Delete';
    deleteButton.className = "delete-product";
    deleteButton.setAttribute("data-id", product.id);
    deleteButton.addEventListener("click", deleteProduct);

    productElement.innerHTML = `<a href='product/${product.id}'>${product.title}</a>
    <p>$${product.price}</p>`;
    productElement.appendChild(editButton);
    productElement.appendChild(deleteButton);
    products.appendChild(productElement);
}

async function loadProducts()
{
    url = `https://localhost:7260/api/Products`;
    content = await fetch(url);
    products = await content.json();
    for(let product of products)
    {
        addProductDOM(product);
    }
}

function toggleAddForm()
{
    const form = document.getElementById("add-product-form");
    const addButton = document.getElementById("add-product");

    if(form.classList.contains("hide"))
    {
        form.classList.remove("hide");
        addButton.innerHTML = "Cancel";
    }
    else
    {
        form.classList.add("hide");
        addButton.innerHTML = "Add new";
    }
}

async function saveProduct(e)
{
    e.preventDefault();
    let titleInput = document.querySelector("#add-product-form input[name='title']");
    let priceInput = document.querySelector("#add-product-form input[name='price']");
    
    const product =
    {
        "title": titleInput.value,
        "price": priceInput.value
    };

    await fetch('https://localhost:7260/api/Products', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then((response) => response.json())
    .then((data) => { location.reload(); })
    .catch(error => alert('Error:', error));
}

function editProductToggle(e)
{
    let a = e.target;
    let id = a.getAttribute("data-id");
    console.log(id);
    //TODO: fetch object data by id from api and fill it to html form and show form
}

function deleteProduct(e)
{
    let a = e.target;
    let id = a.getAttribute("data-id");
    console.log(id);
    //TODO: are you sure?, send request to API if sure
}

document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add-product");
    addButton.addEventListener("click", toggleAddForm);

    const addForm = document.getElementById("add-product-form");
    addForm.addEventListener("submit", saveProduct);

    loadProducts();
});