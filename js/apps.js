
const getCategories = async ()=>{
   const url = "https://openapi.programming-hero.com/api/peddy/categories";
   const res = await fetch(url);
   const data = await res.json();
   displayCategories(data.categories);
}

const displayCategories =(categories)=>{
  const categorySection = document.getElementById("categorySection");

  categories.forEach(item =>{
   const div = document.createElement("div");

   div.innerHTML = `
    <button id="btn-${item.id}" class="allBtn flex justify-center items-center gap-3 px-12 py-4 border-2 rounded-xl">
      <span class=""><img class="w-12 h-12" src= ${item.category_icon}></span>
      <span class="text-2xl font-bold">${item.category}</span>
    </button>
   `

   categorySection.appendChild(div);
  });

};




getCategories();

