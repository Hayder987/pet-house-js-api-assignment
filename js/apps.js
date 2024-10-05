
const getCategories = async ()=>{
   try{
   const url = "https://openapi.programming-hero.com/api/peddy/categories";
   const res = await fetch(url);
   const data = await res.json();
   displayCategories(data.categories);

   }
   catch(err){
    console.log(err)
   }
};

const getAllPets = async(condition, pets)=>{  
   try{
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
   }
   catch(err){
    console.log(err)
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

const showDetails= async(id)=>{
   try{
    const url = `https://openapi.programming-hero.com/api/peddy/pet/${id}`;
   const res = await fetch(url);
   const data = await res.json();
   const item = data.petData;
   document.getElementById("modal1").show();

   const modalItem = document.getElementById("modalItem");
   modalItem.innerHTML = `
   <img class="rounded-xl object-cover w-full mb-4" src=${item.image}>
   <h3 class="text-xl font-semibold ">${item?.pet_name || "No Name Found"}</h3>
   <div class="border-b pb-4">
      <div class="flex gap-6 mb-4 ">
        <div>
          <span><i class="fa-solid fa-table-cells-large"></i></span>
          <span class="text-gray-500">Breed: ${item?.breed || "Not Available"}</span>
        </div>
        <div>
          <span><i class="fa-regular fa-calendar"></i></span>
          <span class="text-gray-500">Birth: ${item?.date_of_birth || "Not Available"}</span>
        </div>
      </div>
      <div class="flex gap-6 mb-4">
         <div class="flex gap-4 ">
           <span><i class="fa-solid fa-venus"></i></span>
           <span class="text-gray-500">Gender: ${item?.gender || "Not identified"}</span>
         </div>
         <div class="flex gap-4 ">
           <span><i class="fa-solid fa-dollar-sign"></i></span>
           <span class="text-gray-500">Price: ${item?.price || "Not For Sale"}$</span>
         </div>
      </div>
      <div class="flex gap-4 >
        <span><i class="fa-solid fa-venus"></i></span>
        <span class="text-gray-500">vaccinated status: ${item?.vaccinated_status || "Not identified"}</span>
      </div>
   </div>
   <div>
     <h2 class="font-bold mb-3">Details Information</h2>
     <p class="text-gray-500">${item.pet_details}</p>
   </div>

   `
   }
   catch(err){
    console.log(err)
   }
};

const countDown = (id)=>{
   document.getElementById("modal2").show();
   const modalItem2 = document.getElementById("modalItem2");
   modalItem2.innerHTML =`
    <img class="mb-3" src="./images/hand.png"> 
    <h1 class="text-4xl font-extrabold mb-3">Congrates</h1>
    <p class="mb-4">Adoption Process is Start For Your Pet</p>
    <h1 id="countText" class="text-6xl font-extrabold">3</h1>
   `
   let count = 3;
  let time = setInterval(()=>{
    count -=1;
    document.getElementById("countText").innerText = count;
    if(count===0){
        document.getElementById("modal2").close() 
        clearInterval(time);
        const btn = document.getElementById(id)
        btn.setAttribute("disabled" , true);
        btn.classList.add("bg-gray-200","text-gray-400")
    }   
   },1000)
}


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
             <button id="countId-${pet.petId}" onclick ="countDown(this.id)" class="py-2 hover:bg-bgColor text-PrimaryColor font-bold px-4 rounded-xl border">Adopt</button>
             <button onclick="showDetails('${pet.petId}')" class="py-2 hover:bg-bgColor text-PrimaryColor font-bold px-4 rounded-xl border">Details</button>
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


