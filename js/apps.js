
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
    displayPets(data.data);
    // console.log(data.data)
   }
   else{
    url = `https://openapi.programming-hero.com/api/peddy/pets`;
    const res = await fetch(url);
    const data = await res.json();
    displayPets(data.pets);
    // console.log(data.pets)
   }
  
};

const displayCategories =(categories)=>{
  const categorySection = document.getElementById("categorySection");

  categories.forEach(item =>{
   const button = document.createElement("button");
   button.classList.add("allBtn","border-2", "rounded-xl", "flex", "justify-center", "items-center","gap-3","px-12", "py-4")
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

const displayPets = (pets)=>{
   const cardDiv = document.getElementById("cardDiv");
   cardDiv.innerHTML = "";
   if(pets.length===0){
    cardDiv.classList.remove("grid")
    cardDiv.innerHTML=`
      <img src="./images/error.webp">
    `
   }
   else{
    cardDiv.classList.add("grid")
   };

   pets.forEach(pet=>{
     const card = document.createElement("div");
     card.classList.add("p-3", "border", "rounded-xl")
     card.innerHTML = `
        <img class="h-[180px] object-cover w-full rounded-lg mb-6" src=${pet?.image}>
        <h3 class="text-xl font-semibold mb-2">${pet?.pet_name}</h3>
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
          <span class="text-gray-500">Price: ${pet?.price}$</span>
        </div>

     `
     cardDiv.appendChild(card);
   });
};





getCategories();
getAllPets(false);
