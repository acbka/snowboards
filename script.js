// background
function backgroundImage(){
   const img1 = document.querySelector(".top1");
   const img2 = document.querySelector(".top2");
   const interval = 5000;

   showImage()

   function showImage(){ 
      img1.classList.toggle("hidden");
      img2.classList.toggle("hidden");
      setTimeout(showImage, interval);
   }
}

function burgerMenu() {
   document.querySelector(".burger").addEventListener("click", function () {
      document.querySelector(".menu").classList.toggle("show");
      this.classList.toggle("burger-cross");
   })
}
// menu

let menuItems = Array.from(document.querySelectorAll(".item"));

let anchors = menuItems.map(el => { 
   let hash = el.href.replace(/[^#]*(.*)/, '$1'); 
   return hash;
})

let sections = anchors.map(hash => {
   let block = document.querySelector(hash);
   return block ;
})

let menuHeight = document.querySelector(".nav-menu").offsetHeight;
let V = .1;

function activeMenuItem() {
   menuItems.forEach(elem => {
      elem.addEventListener('click', function (e) {
         e.preventDefault();
         scrollMenu(elem); 
         
         menuItems.forEach((nl) => {
            if (nl != this) {
               nl.classList.remove('active');
            }
         });

         this.classList.add('active');
        document.querySelector(".menu").classList.toggle("show");
        document.querySelector(".burger").classList.remove("burger-cross");
      }, false);
   });
}

// scroll menu

   function scrollMenu(item) { 
      let w = window.pageYOffset;
      let hash = item.href.replace(/[^#]*(.*)/, '$1'); 
      let t = document.querySelector(hash).getBoundingClientRect().top; 

      let start = null;
   
      requestAnimationFrame(step);
   
      function step(time) {
         let menuHeight = document.querySelector(".nav-menu").offsetHeight;

         if (start === null) start = time;

         let progress = time - start;
         let r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
         window.scrollTo(0, r); 

         if (r != w + t) {
            requestAnimationFrame(step)
         } else { 
            window.scrollTo(0, t + w - menuHeight) // if menu is fixed
            //location.hash = hash // -  URL с хэшем если меню не fixed
         }
      };
   }
   
// scroll page

function scrollPage(){
   let menuItems = Array.from(document.querySelectorAll(".item"));
   window.addEventListener('scroll', activeBlock);

   function activeBlock(){
      sections.forEach(item => {
         let start = item.offsetTop - menuHeight;
         let end = item.offsetTop + item.offsetHeight/1.3;

         if (pageYOffset > start && pageYOffset < end){
            document.querySelector(".active").classList.remove("active");
            let index = sections.indexOf(item);
            menuItems[index].classList.add("active");
         }
      })
   }
} 

// carusel

function carusel(){
   //let images = Array.from(document.querySelectorAll(".image"));

   let images = [
      "./img/board1.png",
      "./img/board2.png",
      "./img/board3.png",
      "./img/board4.png",
      "./img/board5.png"
   ];

   let length = images.length;

   let n = 1;

   if (document.body.clientWidth > 1155) { 
      n = 3; 
   } else if (document.body.clientWidth > 866) {
      n = 2;
   }

   let start = 0;
   let end = n;

   createList(start, end);

   let arrayLi = document.querySelectorAll(".image");

   //visible();

   document.querySelector(".prev").addEventListener("click", function(){
      if (start < length-1) {
         start ++;
      } else { 
         start = 0;
      }; 
      changeList(start);
   })

   document.querySelector(".next").addEventListener("click", function(){
      if (start == 0) {
         start = length-1;
      } else { 
         start --;
      }; 
      changeList(start);
   })


   function createList(start, end){
      for (let i = start; i < end; i++) {
         let img = document.createElement("img");
         img.src = images[i];
         let li = document.createElement("li");
         li.classList.add("image"); 
         li.appendChild(img);
         document.querySelector(".images").appendChild(li)
      }
   }

   function changeList(count){
      arrayLi.forEach(elem => { 
         elem.removeChild(elem.firstChild); 
         let img = document.createElement("img");
         img.src = images[count]; 
         elem.appendChild(img);
         if (count < length - 1){
            count ++;
         }  else {
            count = 0;
         }
      })
   }


}




//backgroundImage()
burgerMenu()
activeMenuItem() 
scrollPage()
carusel()