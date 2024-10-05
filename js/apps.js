
const getCategories = async ()=>{
   const url = "https://openapi.programming-hero.com/api/peddy/categories";
   const res = await fetch(url);
   const data = await res.json();
   displayCategories(data.categories);
};

const getAllPets = async(condition, pets)=>{  
   let url ;
   if(condition){
    url = `https://openapi.programming-hero.com/api/peddy/category/${pets}`
    const res = await fetch(url);
    const data = await res.json();
    
    document.getElementById("sortBtn").addEventListener("click", ()=>{    
        loaderControl("loder")
        displayPets(data.data, true);
    })
        loaderControl("loder");
        displayPets(data.data, false); 
   }
   else{
    url = `https://openapi.programming-hero.com/api/peddy/pets`;
    const res = await fetch(url);
    const data = await res.json();
    document.getElementById("sortBtn").addEventListener("click", ()=>{     
        loaderControl("loder")
        displayPets(data.pets, true);
    })
        loaderControl("loder");
        displayPets(data.pets,false)   
   }
};

const displayCategories =(categories)=>{
  const categorySection = document.getElementById("categorySection");

  categories.forEach(item =>{
   const button = document.createElement("button");
   button.classList.add("allBtn","border-2", "rounded-xl", "flex", "justify-center", "items-center","gap-3","px-12","md:px-4", "py-4")
   button.setAttribute("id", `btn-${item.id}`);
   button.addEventListener("click", ()=>{
    btnHandellar(`btn-${item.id}`);
    getAllPets(true, `${item.category}`);

   });
   button.innerHTML = `
      <p class=""><img class="w-12 h-12" src= ${item.category_icon}></p>
      <p class="text-2xl font-bold">${item.category}</p>
   `
   categorySection.appendChild(button);
  });
};

const cardDiv = document.getElementById("cardDiv");

const displayPets = (pets, sort)=>{ 
    cardDiv.innerHTML = "";
   pets = sort ? pets.sort((a, b)=> b.price - a.price) : pets;
   
   setTimeout(()=>{
    cardDiv.innerHTML = "";
    display(pets);
   },2000)
};

const display=(data)=>{
    

    if(data.length===0){
        cardDiv.classList.remove("grid");
        cardDiv.classList.add("flex","flex-col","justify-center","items-center");
        document.getElementById("loder").classList.add("hidden");
        document.getElementById("sortBtn").classList.add("hidden");
        cardDiv.innerHTML=`
          <img class="w-40 mx-auto mb-8" src="./images/error.webp">
          <h1 class="text-3xl font-bold text-center mb-6">No Information Available</h1>
          <p class="w-8/12 text-gray-500 text-center">Pets are humanizing. They remind us we have an obligation and responsibility to preserve and nurture and care for all life.” There is no bird here now...</p>
        `
       }
       else{
        document.getElementById("sortBtn").classList.remove("hidden");
        cardDiv.classList.add("grid")
       };


    data.forEach(pet=>{
        const card = document.createElement("div");
        card.classList.add("p-3", "border", "rounded-xl")
        card.innerHTML = `
           <img class="h-[180px] object-cover w-full rounded-lg mb-6" src=${pet?.image || "No Image Found"}>
           <div class="border-b mb-6">
              <h3 class="text-xl font-semibold mb-2">${pet?.pet_name || "No Name Found"}</h3>
              <div class="flex gap-4 mb-2">
                <span><i class="fa-solid fa-table-cells-large"></i></span>
                <span class="text-gray-500">Breed: ${pet?.breed || "Not Available"}</span>
              </div>
              <div class="flex gap-4 mb-2">
                <span><i class="fa-regular fa-calendar"></i></span>
                <span class="text-gray-500">Birth: ${pet?.date_of_birth || "Not Available"}</span>
              </div>
              <div class="flex gap-4 mb-2">
                <span><i class="fa-solid fa-venus"></i></span>
                <span class="text-gray-500">Gender: ${pet?.gender || "Not identified"}</span>
              </div>
              <div class="flex gap-4 mb-2">
                <span><i class="fa-solid fa-dollar-sign"></i></span>
                <span class="text-gray-500">Price: ${pet?.price || "Not For Sale"}$</span>
              </div>
           </div>
           <div class="flex gap-2 lg:gap-6">
             <button onclick = "postImage('${pet?.image}')" class="py-2 hover:bg-bgColor px-4 rounded-xl border"><i class="fa-regular fa-thumbs-up"></i></button>
             <button class="py-2 hover:bg-bgColor text-PrimaryColor font-bold px-4 rounded-xl border">Adopt</button>
             <button class="py-2 hover:bg-bgColor text-PrimaryColor font-bold px-4 rounded-xl border">Details</button>
           </div>
   
        `
        cardDiv.appendChild(card);
        document.getElementById("loder").classList.add("hidden");
      });
   };

   const postImage=(img)=>{
   const dynamicImg = document.getElementById("dynamicImg");
     const imgDiv = document.createElement("div");
     imgDiv.innerHTML = `
     <div>
       <img class="rounded-xl w-full h-40 object-cover" src=${img}>
     </div>
     `
     dynamicImg.appendChild(imgDiv)
   }

getCategories();
getAllPets(false);


