const layersButtons = document.querySelectorAll(".layers__button");
const main = document.querySelector(".main");
const mainImage = document.querySelector(".main img");
const cabsButtons = document.querySelectorAll(".cabs__button");
const cabs = document.querySelector(".cabs");
const layers = document.querySelectorAll(".layers");
const buttonBack = document.querySelector(".button__back");
const menuTitle = document.querySelector(".menu__title");
const menu = document.querySelector(".cabs");
const mainTitle = document.querySelector(".main-title");
const info = document.querySelector(".menu__info");
const info2 = document.querySelector(".menu__info2");
const buttonAttributes = document.querySelector(".button__attributes");

for (let cabsButton of cabsButtons) {
  cabsButton.addEventListener("click", function (e) {
    let id = cabsButton.id;
    menuTitle.innerHTML = `Кабинет ${id}`;

    console.log(id);
    for (let layer of layers) {
      console.log(layer.id);
      console.log(`layers-${id}`);
      if (layer.id == `layers-${id}`) {
        layer.classList.add("_vision");
        cabs.classList.add("_hidden");
        info.classList.add("_hidden");
        info2.classList.add("_visible");
        buttonBack.classList.add("_active");
        buttonAttributes.classList.add("_active");
      }
    }
  });
}

for (let layersButton of layersButtons) {
  layersButton.addEventListener("click", function (e) {
    let id = layersButton.id;
    let cab = id.split("-")[0];
    let layer = id.split("-")[1];
    mainImage.src = `database/${cab}/${layer}.jpg`;
    mainTitle.innerHTML = layersButton.innerHTML;
    fetch(`database/${cab}/${layer}.txt`) // Путь к файлу
      .then((response) => {
        if (!response.ok) throw new Error("Ошибка загрузки файла");
        return response.text();
      })
      .then((text) => {
        console.log(text); // Выводим содержимое
        document.getElementById("attributes").innerHTML = text;
      })
      .catch((err) => console.error("Ошибка:", err));
  });
}

buttonBack.addEventListener("click", function (e) {
  menuTitle.innerHTML = `Выбор помещения`;

  for (let layer of layers) {
    layer.classList.remove("_vision");
  }
  cabs.classList.remove("_hidden");
  info.classList.remove("_hidden");
  info2.classList.remove("_visible");

  buttonAttributes.classList.remove("_active");
  buttonBack.classList.remove("_active");
});

buttonAttributes.addEventListener("click", function (e) {
  if (mainImage.getAttribute("src")) {
    document.getElementById("attributes").classList.toggle("_active");
    if (buttonAttributes.innerHTML != `Скрыть атрибуты слоя`) {
      buttonAttributes.innerHTML = "Скрыть атрибуты слоя";
    } else {
      buttonAttributes.innerHTML = "Показать атрибуты слоя";
    }
  }
});
