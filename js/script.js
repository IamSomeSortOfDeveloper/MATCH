AOS.init();

let burger = document.querySelector('.header__burger');
let menu = document.querySelector('.match-menu');
let links = document.querySelectorAll('.header__link');

burger.addEventListener('click',

    function()

    {
        burger.classList.toggle('header__burger--active');

        menu.classList.toggle('match-menu--active');

        document.body.classList.toggle('stop--scroll');


    }
)

links.forEach(function(el) {
    el.addEventListener('click', function() {
        burger.classList.remove('header__burger--active');

        menu.classList.remove('header__nav--active');

        document.body.classList.remove('stop--scroll');
    })
})

document.addEventListener("DOMContentLoaded", function() {
    const hoverButton = document.getElementById('bg-left');
    const fadeInElement = document.getElementById('fade-in-right');
    const hoverButton2 = document.getElementById('bg-right'); 
    const fadeInElement2 = document.getElementById('fade-in-left'); 
    // Проверяем, что элементы найдены
    if (hoverButton && fadeInElement && hoverButton2 && fadeInElement2) {
        // Обработчик события наведения
        hoverButton.addEventListener('mouseenter', function() {
            fadeInElement.style.opacity = '1'; })
        hoverButton2.addEventListener('mouseenter', function() {
            fadeInElement2.style.opacity = '1'; 
        }
        );

        // Обработчик события ухода курсора
        hoverButton.addEventListener('mouseleave', function() {
            fadeInElement.style.opacity = '0'; })
        hoverButton2.addEventListener('mouseleave', function() {
            fadeInElement2.style.opacity = '0'; 
        });
        
    } else {
        console.error('Элементы не найдены. Проверьте идентификаторы.');
    }
});

const accordionBtns = document.querySelectorAll(".accordion");

accordionBtns.forEach((accordion) => {
  accordion.onclick = function () {
    this.classList.toggle("is-open");

    let content = this.nextElementSibling;
    console.log(content);

    if (content.style.maxHeight) {
      //this is if the accordion is open
      content.style.maxHeight = null;
    } else {
      //if the accordion is currently closed
      content.style.maxHeight = content.scrollHeight + "px";
      console.log(content.style.maxHeight);
    }
  };
});


