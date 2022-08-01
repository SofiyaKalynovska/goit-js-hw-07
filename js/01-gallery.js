import { galleryItems } from './gallery-items.js';

// 1. Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.

// Функція, яка створює галерею картинок з масиву об'єктів, які містять прев'ю, повнорозмірну картинку і її опис
const createRenderListOfImgs = (imgs) =>
  imgs.reduce(
    (acc, { preview, original, description }) => acc + `
  <div class = "gallery__item" 
    <a class="gallery__link" href = ${original}>
      <img
        class = "gallery__image"
        src = ${preview}
        data-source = ${original}
        alt = ${description}
      />
    </a> 
  </div>`, ''
  );
// Функція, яка додає в розмітку HTML елементи перед закриваючим тегом div.gallery
const insertListOfImgs = (item) => {
  const galleryOfImgs = document.querySelector('.gallery');
  galleryOfImgs.insertAdjacentHTML("beforeend", item)
};
// Створюємо галерею картинок з масиву об'єктів galleryItems і додаємо її в розмітку
insertListOfImgs(createRenderListOfImgs(galleryItems));
// Виводимо в консоль галерею картинок
console.log(galleryItems);

// 2. Реалізація делегування на div.gallery і отримання url великого зображення.

const galleryOfImgs = document.querySelector('.gallery');
galleryOfImgs.addEventListener("click", onImgClick);
// 4. Відкриття модального вікна по кліку на елементі галереї
function onImgClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const urlOfOriginImg = e.target.dataset.source;
  const lightboxEscConfig = {
    onShow: () => {
      document.addEventListener('keydown', onEscKeyPress);
    },
    onClose: () => {
      document.removeEventListener('keydown', onEscKeyPress);
    }
  }
  const instance = basicLightbox.create(`
    <img
        class = "gallery__image"
        src = ${urlOfOriginImg}
        data-source = ${galleryOfImgs.original}
        alt = ${galleryOfImgs.description}
      />`,
    lightboxEscConfig
  );
    instance.show()
  
  // Закриття картинки по кліку на ESC і зняття слухача подій з цієї кнопки
  function onEscKeyPress(e) {
    if (e.code === 'Escape' && instance.visible()) {
      instance.close()
    }
  }
}








