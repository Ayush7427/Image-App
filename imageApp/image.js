

const btn = document.querySelector("form")
const input = document.querySelector("input")
const imagesContainer = document.querySelector("#imagesContainer")
const loadMoreBtn = document.querySelector(".loadMoreBtn")
let page = 1
let LoadInput

btn.addEventListener("submit" , function(event){
event.preventDefault()
const inputField = input.value.trim()
validation(inputField)
},false)

loadMoreBtn.addEventListener("click" , function(event){
    apiCallFxn(LoadInput , ++page)
},false)

function validation(value){
    if(!value){
        imagesContainer.innerHTML = `<h2>Please enter a search query.</h2>`
    }
    else{
         page = 1
         LoadInput = value
        input.value = ""
        apiCallFxn(value , page)
    }
}

async function apiCallFxn(item , pageNo){
if (pageNo === 1){
    imagesContainer.innerHTML = ""
}
    try {
    // console.log(item);
    const word = item
    // const apiKeys = Your API Key
    const url = `https://api.unsplash.com/search/photos?query=${word}&per_page=28&page=${pageNo}&client_id=${apiKeys}`
    const fetchData = await fetch(url)
    const dataToJson = await fetchData.json() 
    dataFxn(dataToJson)
    } 
    catch (error) {
        if (loadMoreBtn.style.display === "block") {
            loadMoreBtn.style.display = "none"
        }
        imagesContainer.innerHTML = `<h2>Failed to fetch images. Try again later.</h2>`
    }
}

function dataFxn(data){
// console.log(data);
    if (data.results.length > 0) {
        data.results.forEach(function(elements , index , array){
            const div =  document.createElement("div")
            div.classList.add("imageDiv")
            div.innerHTML = `<img src="${elements.urls.regular}">`
    
            const overlayElement = document.createElement("div")
            overlayElement.classList.add("over")
    
            // overlay Text
            const text = document.createElement("h3")
            text.innerHTML = `${elements.alt_description}`

            const downLoadBtn = document.createElement("div")
          downLoadBtn.classList.add("downLoadBtn")
            downLoadBtn.innerHTML = `<a href="${elements.links.download}" target="_blank">Check out</a>`
            // downLoadLink.innerHTML = `${elements.links.download}`

            overlayElement.append(text , downLoadBtn)
            div.appendChild(overlayElement)
            imagesContainer.appendChild(div)
        });
        if (data.total_pages === page) {
            loadMoreBtn.style.display = "none"
        }
        else{
            loadMoreBtn.style.display = "block"
        }
    }
 else{
    if (loadMoreBtn.style.display === "block") {
        loadMoreBtn.style.display = "none"
    }
    imagesContainer.innerHTML = `<h2>No Image Found...</h2>`     
}
}
