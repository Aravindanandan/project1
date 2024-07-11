let productlist ={};
let filterdLineitems = {};
document.addEventListener('DOMContentLoaded', function() {
  const loader = document.getElementById('loader');
  loader.style.display = "block";
  fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
          console.log(data);
          productlist = data.sort((a,b) => a.price - b.price);
          loader.style.display = "none";
          generateProductlistUI(productlist);
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
});
 function generateProductlistUI(data){
  if(data.length > 0){
    const productListContainer = document.getElementById('productList');
    data.forEach(eachitem => {
      const listItem = document.createElement('div');
      listItem.classList.add('lineitem');
      listItem.innerHTML = `
      <div class="productImage" style="border-bottom:2px solid #F3F3F3;padding-bottom:5px">
        <img src="${eachitem.image}">
      </div>
      <div>
        <p class="productTitle">${eachitem.title}</p>
        <p>$${eachitem.price}</p>
        <p style="cursor:pointer">Add to cart</p>
      </div> 
      `;
      productListContainer.appendChild(listItem);
      totallist(data.length);
    })
  }
 }

 function totallist(length){
  document.getElementById("totallineitem").innerHTML = `${length} Results`
 }

 function handleCheckboxChange(clickedCheckbox){
  const categoryFilterCheckboxes = document.querySelectorAll('input[type="checkbox"]');
  categoryFilterCheckboxes.forEach(checkbox => {
    if (checkbox !== clickedCheckbox) {
        checkbox.checked = false;
        const productLists = document.getElementsByClassName("lineitem");
        Array.from(productLists).forEach(item => item.remove());
        filterdLineitems = productlist.filter(item => item.category == clickedCheckbox.value);
        generateProductlistUI(filterdLineitems);
    }
});
}

function handleSortChange(selectedoption){
  const productLists = document.getElementsByClassName("lineitem");
  Array.from(productLists).forEach(item => item.remove());
  if(selectedoption.value == "rating"){
    if(filterdLineitems.length > 0) {
      filterdLineitems.sort((a,b) => a.rating.rate - b.rating.rate);
      generateProductlistUI(filterdLineitems);
    }
    else{
      productlist.sort((a,b) => a.rating.rate - b.rating.rate);
      generateProductlistUI(productlist);
    }
  }else{
    if(filterdLineitems.length > 0) {
      filterdLineitems.sort((a,b) => a.price - b.price);
      generateProductlistUI(filterdLineitems);
    }else{
      productlist.sort((a,b) => a.price - b.price);
      generateProductlistUI(productlist);
    }
  }
}