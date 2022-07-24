const categoryElements = document.querySelectorAll('.category a');
const productContainer = document.getElementById('product-container');
const navElement = document.querySelectorAll('.nav-links a')
const productDetailsContainer = document.getElementById('product-details-container-main');
const whatsappHref = href="http://wa.me/+919611756626/?text=Hi%20i%20would%20like%20to%20order%20a%20t-shirt.Please%20guide%20me%20through%20the%20process"
const logo = document.querySelector('.logo a');
categoryElements.forEach(a => {
    const category = a.dataset.catType;
    a.href = window.location.origin + "/products.html?type=" + category;
})
navElement.forEach(ele => {
    const category = ele.dataset.catType;
    ele.href = window.location.origin + "/products.html?type=" + category;
})

window.onload = async function () {
    logo.href = window.location.origin;
    if (window.location.href.indexOf("products") > 0) {
        let categoryType = window.location.href.split('?')[1].split('=')[1];
        let products = await getProductsByType(categoryType);

        products.forEach(p => {
            productContainer.appendChild(getProductHtml(p));
        })
        addEventListenerForProducts();
    }

    if (window.location.href.indexOf("productdetails") > 0) {
        let productData = window.location.href.split('?')[1].split('&');
        let productId = productData[0].split('=')[1];
        let productType = productData[1].split('=')[1];
        let productInfo = await getProductInfoById(productId, productType);
        productDetailsContainer.appendChild(getProductDetailsHtml(productInfo));
        addEventListnerToOtherImages();
    }
}

function getProductDetailsHtml(product) {
    let divElement = document.createElement('div');
    divElement.classList.add('product-details-container');
    let details = `<div class="product-images">
    <img src="${product.imagepath}" alt="" class="main-img" id="main-img"><div class="all-imgs">
    ${getOtherImages(product.otherImages)} </div>
    </div>
    <div class="ind-product-details">
        <h1>${product.productName}</h1>
        <div class="ind-price-details">
            <div>&#x20b9;${product.oldPrice}</div>
            <div>&#x20b9;${product.newPrice}</div>
        </div>
        <div class="available-size">
            <p>Available Size :</p>
            <div class="sizes">
            ${getProductSizes(product.sizes)}
            </div>
            </div>
            <div class="availble-colors">
                <p>Available Colors :</p>
                <div class="colors">
                ${getProductColors(product.colors)}
                </div>
                    </div>
                    <div class="product-description">
                        <p>Description:</p>
                        <p>${product.description}</p>
                    </div>
                    <div class="order-class">
                    <a href="${whatsappHref}"><button class="order-btn">Order <i class="fab fa-whatsapp"></i></button></a>
                    </div>
                </div>
            </div>`;
    divElement.innerHTML = details;
    return divElement;
}

function getProductColors(colors) {
    let colorStr = "";
    colors.forEach(e => {
        colorStr += `<div style="background-color: ${e};"></div>`
    })
    return colorStr;
}
function getProductSizes(sizes) {
    let sizeStr= "";
    sizes.forEach(e => {
        sizeStr += `<div>${e}</div>`
    })
    return sizeStr;
}
function getOtherImages(imgPaths) {
    let imgStr= "";
    imgPaths.forEach(ele => {
        imgStr += `<img src="${ele}" alt="">`;
    });
    return imgStr;
}

function getProductHtml(product) {
    let divElement = document.createElement('div');
    // divElement.classList.add('product-card');
    let productDetailsHtml = `<img src="${product.imagepath}" alt="">
    <div class="product-details">${product.productName}</div>
    <div class="price-details"><div>&#x20b9;${product.oldPrice}</div>
    <div>&#x20b9;${product.newPrice}</div>`
    divElement.innerHTML = productDetailsHtml;
    let anchorElement = document.createElement('a');
    anchorElement.classList.add('product-card');
    anchorElement.setAttribute('data-id', product.productId);
    anchorElement.setAttribute('data-type', product.type);
    anchorElement.appendChild(divElement);
    return anchorElement
}

async function getProductsByType(categoryType) {
    let response = await fetch('./assets/' + categoryType + '.json')
        .then(res => {
            return res.json()
        })
    return response[categoryType];
}

async function getProductInfoById(productId, productType) {
    let response = await fetch('./assets/' + productType + '.json')
        .then(res => {
            return res.json()
        })
    return response[productType].filter(x => x.productId == productId)[0];
}

function addEventListenerForProducts() {
    const products = document.querySelectorAll('.product-card');

    products.forEach(p => {
        p.addEventListener('click', () => {
            p.href = window.location.origin + "/productdetails.html?id=" + p.dataset.id + "&type=" + p.dataset.type;
        })
    })

}

function addEventListnerToOtherImages() {
    let allImages = document.querySelectorAll('.all-imgs img');
    let mainImage = document.getElementById('main-img');
    allImages.forEach(img => {
        img.addEventListener('click', ()=>{
            mainImage.src = img.src;
        })
    })
    
}