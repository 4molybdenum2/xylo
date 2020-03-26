window.addEventListener("load", () => {
  setTimeout(function() {
    const body = document.getElementById("body");
    const preloader = document.querySelector(".preloader");
    body.style.overflow="initial";
    preloader.classList.add("preload-finish");
  }, 500);
});
