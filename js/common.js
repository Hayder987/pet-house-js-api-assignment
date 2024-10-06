
document.getElementById("btnBar").addEventListener("click", ()=>{
   document.getElementById("barMenu").classList.toggle("hidden");
   const barBtn =document.getElementsByClassName("barBtn");
   for(let item of barBtn){
      item.addEventListener("click", ()=>{
         document.getElementById("barMenu").classList.add("hidden");
      })
   }
});

const btnHandellar =(id)=>{

   const allBtn = document.getElementsByClassName("allBtn");
   for(item of allBtn){
    item.classList.add("rounded-xl")
    item.classList.remove("bg-bgColor", "rounded-full")
   }
   const btn = document.getElementById(id);
      btn.classList.remove("rounded-xl")
      btn.classList.add("bg-bgColor","rounded-full");
};


const loaderControl =(id)=>{
   let loader = document.getElementById(id);
   loader.classList.remove("hidden");
    loader.classList.remove("flex");
};

