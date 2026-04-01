// SCROLL
document.querySelectorAll('.gallery-wrapper').forEach(wrapper => {
  const gallery = wrapper.querySelector('.scrollable');
  wrapper.querySelector('.left').onclick = () =>
    gallery.scrollBy({ left: -200, behavior: 'smooth' });
  wrapper.querySelector('.right').onclick = () =>
    gallery.scrollBy({ left: 200, behavior: 'smooth' });
});

// LIGHTBOX PER CARD
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentImages = [];
let currentIndex = 0;

document.querySelectorAll('.scrollable').forEach(gallery => {
  const imgs = gallery.querySelectorAll('img');

  imgs.forEach((img, index) => {
    img.onclick = () => {
      currentImages = imgs;
      currentIndex = index;
      showImage();
      lightbox.style.display = 'flex';
    };
  });
});

function showImage() {
  lightboxImg.src = currentImages[currentIndex].src;
}

prevBtn.onclick = () => {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  showImage();
};

nextBtn.onclick = () => {
  currentIndex = (currentIndex + 1) % currentImages.length;
  showImage();
};

closeBtn.onclick = () => lightbox.style.display = 'none';