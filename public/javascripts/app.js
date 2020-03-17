let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', '${vh}px');

// $(document).ready(()=>{
//         setTimeout(function(){
//                 $('body').addClass('preload-finish');
//         },3000);
// });
window.addEventListener('load',()=>{
        setTimeout(function(){
                const preloader = document.querySelector('.preloader');
        preloader.classList.add('preload-finish');
        },2000);
        
});
