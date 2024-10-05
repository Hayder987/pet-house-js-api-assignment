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
