let continer = document.querySelector("#container")
let sortBtn = document.querySelector("#sortdata")
let searchBtn = document.querySelector("input")


let getData =  async(URL) =>{
    let res = await fetch(URL)
    let data = await res.json()
    displayData(data)
   
}
getData("https://fakestoreapi.com/products")

let displayData = (arr) =>{
   continer.innerHTML = "";
    arr.forEach((ele ,i) => {
          let div = document.createElement("div")

          let image = document.createElement("img")
          image.src = ele.image;

          let title = document.createElement("p")
          title.innerHTML = ele.title;

          let category = document.createElement("h3")
          category.innerHTML = ele.category
          
          let price = document.createElement("p")
          price.innerHTML = ` Only Rs :${ele.price}`;

          let id = document.createElement("p")
          id.innerHTML = `${ele.id}`

          let desc = document.createElement("p")
          desc.innerHTML = ele.description

          div.append(image ,id ,  category , title , price ,  desc )

        continer.append(div)
    });
    
}

// ----------------searchBar----------

let  searchData = async()=>{
      let value = searchBtn.value
      let res = await fetch("https://fakestoreapi.com/products")
      let data = await res.json()
    
     let narr = data.filter((ele , i)=>{
        return ele.category.toLowerCase() === value.toLowerCase()
     })
     if(narr.length=== 0){
        continer.innerHTML = "<h2>please enter the Correct data</h2>"
      }else{
        displayData(narr)
      } 
}

searchBtn.addEventListener("input" , searchData)

// --------sort data--------------


let sortData = async() =>{
    let value = sortBtn.value
    let narr;
   
    let res = await fetch("https://fakestoreapi.com/products")
    let data = await res.json()
    console.log(data)

    if(value === "asc"){
        narr = data.sort((a ,b)=>{
              return a.price - b.price
        })
    }else if(value === "desc"){
       narr =data.sort((a ,b)=>{
        return b.price - a.price
    })
    }
    displayData(narr)
}

sortBtn.addEventListener("change" , ()=>{
    sortData()
})

// -----------filter data --------------

let filterBtn = document.querySelector("#filterData")

let filterData = async() => {
    let value = filterBtn.value;
    let res = await fetch("https://fakestoreapi.com/products")
    let data = await res.json()

    if(value ==="Filter Data"){
        return displayData(data)
    }else{
        let filterArr = data.filter((ele)=>{
            return ele.category === value
       })
       displayData(filterArr)
    }

}

filterBtn.addEventListener("change" , filterData )


