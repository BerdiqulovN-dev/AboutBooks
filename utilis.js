

function $(element,parent=document){
return parent.querySelector(element);
}
















function filterBySearch(arr){
    elFrom.addEventListener("submit", (evt)=>{
        evt.preventDefault();
        let elSelectValue = elSelect.value;
        let elRatingValue = elRating.value;
        let elSearchValue = elSearchName.value;
        console.log(elSelectValue, elRatingValue, elSearchValue);
    
        if(elSearchValue || elRatingValue || elSelectValue){
            let filteredByCategoryArr = arr.filter((item)=>{
                return item.categories.includes(elSelectValue);
            })
        
            let filteredByRating = filteredByCategoryArr.filter((item)=>{
                return item.imdbRating == elRatingValue;
            })
        
            let filteredByName = filteredByRating.filter((item)=>{
                return item.title.toLowerCase().includes(elSearchValue);
            })
        
            if(filteredByName.length){
                renderUi(filteredByName);
            } else{
                cards.innerHTML = `<h1 class="text-danger text-center fs-3">Nothing is found</h1>`
            }
        }
    })
  }





  function addWatchLater(arr) {
    let filteredArr = [];
    cards.addEventListener("click", (evt) => {
      let id;
  
      if (evt.target.className.includes("watch-later")) {
        id = evt.target.getAttribute("data-id");
  
        arr.forEach((item) => {
          if (item.imdbId == id) {
            if (!filteredArr.includes(item)) {
              filteredArr.push(item);
            }
          }
        });
      }
  
      basketArr = [...filteredArr];
      renderUiBasket(filteredArr);
    });
  }