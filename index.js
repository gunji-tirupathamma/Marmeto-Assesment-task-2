document.addEventListener('DOMContentLoaded', function () {  
    fetchDataAndShowProducts('women'); 
    
    // Add event listeners to buttons
    document.getElementById('menButton').addEventListener('click', function () {
        fetchDataAndShowProducts('men');
        updateButtonStyle('menButton')
    });

    fetchDataAndShowProducts('women');

    document.getElementById('womenButton').addEventListener('click', function () {
        fetchDataAndShowProducts('women');
        updateButtonStyle('womenButton')
    });

    document.getElementById('kidsButton').addEventListener('click', function () {
        fetchDataAndShowProducts('kids');
        updateButtonStyle('kidsButton')
    });
});

function updateButtonStyle(clickedButtonId) {
    // Remove 'after-click' class from all buttons
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.classList.remove('after-click');
    });

    // Add 'after-click' class to the clicked button
    const clickedButton = document.getElementById(clickedButtonId);
    clickedButton.classList.add('after-click');
}




function fetchDataAndShowProducts(category){
    let options={
        method:"GET"
    }
    
    fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json", options)
    
    .then(function (response) {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
        
    })
    .then(data=>{
        console.log(data)
        if(Array.isArray(data.categories)){
            showProducts(category,data.categories)
            console.log(data.categories)
        }else{
            console.error("Data is not an array:", data.categories);
        }
                    
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
    
}





function showProducts(category,data){
    if (Array.isArray(data)) {
        const targetCategory = data.find(cat => cat.category_name.toLowerCase() === category.toLowerCase());

        if (targetCategory) {
            const filteredProducts = targetCategory.category_products || [];
            console.log(filteredProducts)

            let productsContainer = document.getElementById('products-container');
            productsContainer.innerHTML = '';

            filteredProducts.forEach(product => {
                const productCard = createProductCard(product);
                productsContainer.appendChild(productCard);
                console.log(productsContainer)
            });
        } else {
            console.error(`Category '${category}' not found in the data.`);
        }
        
    } else {
        console.error("Data is not an array:", data);
    }
}


function createProductCard(product){
    let productCardContainer=document.createElement('div')
        productCardContainer.classList.add('product-card')

        let badgeImageContainer=document.createElement('div')
        badgeImageContainer.classList.add('badge-image-container')
        productCardContainer.appendChild(badgeImageContainer)

        let badgeText=document.createElement('div')
        if(product.badge_text!==null){
            badgeText.innerHTML=product.badge_text
            badgeText.classList.add('badge')
            badgeImageContainer.appendChild(badgeText)
        }else{
            badgeText.style.disply='none'
        }                      


        let productImage=document.createElement('img')
        productImage.src=product.image
        productImage.alt=product.title

        productImage.addEventListener('click',function(){
            if(productImage.src===product.image){
                productImage.src=product.second_image
                productImage.alt=product.title

            }else{
                productImage.src=product.image
                productImage.alt=product.title
            }
        })
     
        productImage.classList.add('image')
        badgeImageContainer.appendChild(productImage)
        

        let descriptionContainer= document.createElement('div')
        descriptionContainer.classList.add('description-Cont')
        productCardContainer.appendChild(descriptionContainer)

        let categoryContainer=document.createElement('div')
        categoryContainer.classList.add("categoryContainer")
        descriptionContainer.appendChild(categoryContainer)

        let title=document.createElement('h3')
        title.innerHTML=product.title.length >20? product.title.substring(0,10)+'...' : product.title
        categoryContainer.appendChild(title)

        let vendor=document.createElement('p')
        vendor.innerHTML='* '+product.vendor
        vendor.classList.add('vendor')
        categoryContainer.appendChild(vendor)

        let priseContainer=document.createElement('div')
        priseContainer.classList.add("prise-container")
        descriptionContainer.appendChild(priseContainer)

        let originalPrise=document.createElement('h3')
        originalPrise.innerHTML="Rs "+product.price+".00"        
        priseContainer.appendChild(originalPrise)

        let compairPrise=document.createElement('p')
        compairPrise.innerHTML=product.compare_at_price+'.00'
        compairPrise.classList.add('compare-prise')
        priseContainer.appendChild(compairPrise)

        let offerPercentage=document.createElement('p')
        offerPercentage.innerHTML='50% off'
        offerPercentage.classList.add('offer')
        priseContainer.appendChild(offerPercentage)

        let addButton=document.createElement('button')
        addButton.innerHTML='Add to Cart'
        addButton.classList.add('addbutton')
        descriptionContainer.appendChild(addButton)     


    return productCardContainer    
}
