"use strict";

// let products={};
let products = $(".products");
let elList = $(".list");
// let elCard = $(".card");

fetch("https://www.googleapis.com/books/v1/volumes?q=search+terms&maxResults=40")
	.then((res) => res.json())
	.then((data) => {
		products = data.items;
		// console.log(products);
		// console.log(data);
		renderUi(products);

	});

    let elText=$(".show-items")
    let i=0;

function renderUi(array) {
	array.forEach((item) => {
		let elCard = document.createElement("li");
		elCard.className = "card";

		// console.log(item);
		elCard.innerHTML = `
            <div class="secondary bg-dark bg-opacity-10 rounded-1 p-0 d-flex align-items-center justify-content-center">
               <img src="${item.volumeInfo.imageLinks ? `${item.volumeInfo.imageLinks.thumbnail}` : "Ma'lumot topilmadi"}" width="200px" height="200px" alt="element img" class="element-img">
             </div>
            <div class="card-texts mt-3">
               <h2 class="card-title m-1 fs-6 overflow-hidden" title="${item.volumeInfo.title}">${item.volumeInfo.title ? `${item.volumeInfo.title}` :"Ma'lumot topilmadi"}</h2>
               <p class="card-text mb-0 text-black-50 overflow-hidden" title="${item.volumeInfo.authors}">${item.volumeInfo.authors ? `${item.volumeInfo.authors.slice(0, 25)}` :"Ma'lumot topilmadi" }</p>
               <p class="card-text text-black-50" title="${item.volumeInfo.publishedDate}">${item.volumeInfo.publishedDate ? `${item.volumeInfo.publishedDate.slice(0, 4)}` : "Ma'lumot topilmadi"}</p>
            </div>
            <div class="card-btns mt-3 d-flex">
               <button class="btn btn-one w-50 bg-warning text-capitalize fw-bold col-6 border " title="${item.id}" data-id="${item.id}">Bookmark</button>
               <button class="btn btn-two w-50 bg-dark bg-opacity-10 text-capitalize text-primary fw-bold col-6 border-0" data-id="${item.id}">More Info</button>
            </div>
            <a target="_blank" href="${item.volumeInfo.previewLink}" class="btn-three btn mt-1 bg-secondary text-capitalize text-white fw-normal col-12 border-0">Read</a>

                 `;
		elList.appendChild(elCard);

		i++;
	elText.innerHTML =`Showing ${i} Result(s)`;
	});
	i=0;

	// search(array);
}


// products.forEach(item => {
console.log(elText);
console.log(products);
// })






/*-----------------------------------------------------------------------Bookmark------------- */

let elBookmark = document.querySelector(".bookmark");
let arrBookmark = [];
elList.addEventListener("click", (evt) => {
	if (evt.target.classList.contains("btn-one")) {
		elBookmark.innerHTML = "";
		let Id = evt.target.dataset.id;
		let arr = products.filter((item) => {
			return item.id == Id;
		})[0];
		if (!arrBookmark.includes(arr)) {
			arrBookmark.push(arr);
		}
		updateBookmark(arrBookmark);
	}
});
function updateBookmark(array) {
	elBookmark.innerHTML=""
		array.forEach((el, index) => {
			const wrapper = document.createElement("div");
			wrapper.innerHTML = `
					  <div class="bookmarked d-flex w-100 align-items-center justify-content-between bg-black bg-opacity-10 my-3 p-2">
						  <div class="bookmarked-texts p-2">
							  <h2 class="bookmarked-title fs-6 overflow-hidden" title="${el.volumeInfo.title}">${el.volumeInfo.title ? `${el.volumeInfo.title}` :"Ma'lumot topilmadi"}</h2>
							  <p class="bookmarked-text text-black-50 fs-6 overflow-hidden" title="${el.volumeInfo.authors}">${el.volumeInfo.authors ? `${el.volumeInfo.authors}` :"Ma'lumot topilmadi" }</p>
						  </div>
						  <div class="bookmarked-btns d-flex">
							  <a target="_blank" href="${el.volumeInfo.previewLink}" class="read-more-link btn border-0 shadow-0 text-decoration-none data-id="${el.id}">
								  <img src="./images/book-open.svg" alt="book open img" class="open-book hover-shadow" title="${el.id}">
							  </a>
								  <img src="./images/delete.svg" alt="delete img"  class="delete-book hover-shadow pointer-" dataset-index="${index}" data-id="${el.id}">
						  </div>
					  </div>
				    `;
			elBookmark.append(wrapper);
		});
}

elBookmark.addEventListener("click", (evt) => {
	if (evt.target.classList.contains("delete-book")) {
		let Id = evt.target.getAttribute("dataset-index");
		arrBookmark.splice(Id, 1);
		updateBookmark(arrBookmark);
	}
});

/*-----------------------------------------------------------------------Bookmark end------------- */


/*-----------------------------------------------------------------------Modal-------------------- */
let elMoreInfo = document.querySelector(".more-info");
let elModal = document.createElement("div");

elList.addEventListener("click", (evt) => {
	if (evt.target.classList.contains("btn-two")) {
		let Id = evt.target.dataset.id;
		let elItem = products.filter((item) => {
			return item.id == Id;
		})[0];
		elMoreInfo.className = "d-block position-absolute top-0 start-0 w-100 h-100 d-flex";
		elModal.className="modal__inner d-flex  justify-content-end w-100 h-100 bg-black bg-opacity-50"
		elModal.innerHTML = `
		<div class="modal-right bg-white ">
			<div class="header d-flex p-4 justify-content-between bg-black bg-opacity-10">
				<h2 class="modal-title fs-6">${elItem.volumeInfo.title}</h2>
				<img src="./images/delete.svg" alt="back icon" class="back-icon hover-shadow">
			</div>
            <div class="d-flex justify-content-center p-4">
			<img src="${elItem.volumeInfo.imageLinks.thumbnail}" alt="book img" class="book-img ">
			</div>
			<p class="modal-text p-4 fs-6">${elItem.volumeInfo.description ? `${elItem.volumeInfo.description}` : "<strong class='text-danger'>Ma'lumot topilmadi</strong>"}</p>
			<ul class="modal-elements list-unstyled p-4">
				<li class="text1"> <strong>Author :</strong> ${elItem.volumeInfo.authors ? `${elItem.volumeInfo.authors}` :"<strong class='text-danger'>Ma'lumot topilmadi</strong>" }</li>
				<li class="text2"><strong>Published :</strong> ${elItem.volumeInfo.publishedDate ? `${elItem.volumeInfo.publishedDate}` : "<strong class='text-danger'>Ma'lumot topilmadi</strong>"}</li>
				<li class="text3"><strong>Publishers :</strong> ${elItem.volumeInfo.publisher ? `${elItem.volumeInfo.publisher}` : "<strong class='text-danger'>Ma'lumot topilmadi</strong>"}</li>
				<li class="text4"><strong>Categories :</strong> ${elItem.volumeInfo.categories ? `${elItem.volumeInfo.categories }` : "<strong class='text-danger'>Ma'lumot topilmadi</strong>"}</li>
				<li class="text5"><strong>Pages Count:</strong> ${elItem.volumeInfo.pageCount ? `${elItem.volumeInfo.pageCount}` : "<strong class='text-danger'>Ma'lumot topilmadi</strong>"}</li>
			</ul>
            <a target="_blank" href="${elItem.volumeInfo.previewLink}" class=" w-25 btn-read  btn mt-1 bg-secondary text-capitalize text-white fw-normal col-12 border-0"">Read</a>
		</div>
		`;
		elMoreInfo.append(elModal);
	}
});

elMoreInfo.addEventListener('click', evt=>{
if(evt.target.classList.contains("back-icon")){
    elModal.innerHTML="";
	elMoreInfo.className = "d-none";
}
})

/*-----------------------------------------------------------------------Modal end-----------------*/



/*-----------------------------------------------------------------------Search -----------------*/


let elSearch=$(".input-group");

// console.log(elSearch);

// elSearch.addEventListener('keyup', evt=>{
// 	evt.preventDefault();

// 	let value = evt.target.value;
// // console.log(value);
// if(value==""){
// 	renderUi(products);
// }
// else{

// 	let BASE_URL="https://www.googleapis.com/books/v1/volumes"
// let url="?q=search+terms&maxResults=40"
// fetch(BASE_URL+url)
// 	.then((res) => res.json())
// 	.then((data) => {
// 		products = data.items;
// 	});
// 	// products.forEach(item => {
// 		// console.log(item.volumeInfo.title);
// 		let searchProducts=products.filter(item=>{
// 			return item.volumeInfo.title==value
// 		})[0]
// 	console.log(searchProducts);
// 	// })



// }

	
// })


search(products)
let arrayy=[]
function search(array) {
	elSearch.addEventListener("keyup", (evt) => {
		arrayy=products;
		evt.preventDefault();
		let value = evt.target.value;
   if(value==""){
		renderUi(products);
    }
	else{
		elList.innerHTML = "";
		const newItem = arrayy.filter((item) => {
			return item.volumeInfo.title.includes(value);
		});
		renderUi(newItem);
	}
		
	});

}