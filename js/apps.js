
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
   console.log(pets)
}





getCategories();
getAllPets(false);
