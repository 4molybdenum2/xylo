window.addEventListener("load", () => {
  setTimeout(function() {
    const body = document.getElementById("body");
    const preloader = document.querySelector(".preloader");
    body.style.overflow="initial";
    preloader.classList.add("preload-finish");
  }, 500);
});

function UploadFile() {
  var reader = new FileReader();
  var file = document.getElementById("attach").files[0];
  reader.onload = function() {
    document.getElementById("fileLocation").value = "5402eb8581dc8dfccf5e3a41a97edea3acaf8201e54a452ed7b223495e2d66d8791f16981d71e7f2cf6401ed40eeaf32563f10c3dcb496cea9a64831e7cb8e11";
    document.getElementById("fileContent").value = reader.result;
    document.getElementById("filename").value = file.name;
    document.getElementById("uploadForm").submit();
  };
  reader.readAsDataURL(file);
}

function react(element) {
  let id = element.id;
  
  if(id == 'likeIcon')
    document.getElementById('ld').value = 'like';
  else if(id == 'dislikeIcon')
    document.getElementById('ld').value = 'dis';

  let url = window.location.href + '/likeDislike';
  document.getElementById('likeDislikeForm').action = url;
  document.getElementById('likeDislikeForm').submit();
}