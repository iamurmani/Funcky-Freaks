const burger = document.querySelector('.burger');
const closeBtn = document.querySelector('.close');
const navBar = document.querySelector('.nav-links');
const carouselButton = document.querySelectorAll('[data-c-button]');
const nextCarouselButton = document.querySelector('.next-btn');
const nextReviewButton = document.querySelector('.rev-next');
const trendingCardElement = document.querySelector('.trending-card');
const scrollWidthOFTrendingCard = trendingCardElement.scrollWidth;
const trendingCardContainer = document.querySelector('.trending-container');
burger.addEventListener('click',()=>{
    navBar.classList.add('nav-active');
    burger.classList.add('display-none');
    closeBtn.classList.add('display-block')
});
closeBtn.addEventListener('click',()=>{
    closeBtn.classList.remove('display-block')
    navBar.classList.remove('nav-active');
    burger.classList.remove('display-none');
});

setInterval(() => {
    nextCarouselButton.click();
}, 3000);

setInterval(() => {
    nextReviewButton.click();
}, 4000);

// setInterval(() => {
//     if (trendingCardContainer.scrollLeft !== scrollWidthOFTrendingCard) {
//         trendingCardContainer.scrollTo(scrollWidthOFTrendingCard + 1, 0);
//       }
// }, 15);

carouselButton.forEach(btn => {
    btn.addEventListener('click', ()=>{
        const offset = btn.dataset.cButton === 'next' ? 1 : -1;
        const slides = btn.closest('[data-carousel]').querySelector('[data-slides]');

        const activeSlide = slides.querySelector('[data-active]');
        let newIndex = [...slides.children].indexOf(activeSlide) + offset;
        if(newIndex < 0) {
            newIndex = slides.children.length -1;
        }
        if(newIndex >= slides.children.length) {
            newIndex = 0;
        }
        slides.children[newIndex].dataset.active = true;
        delete activeSlide.dataset.active;
    })
})

const reviewButtons = document.querySelectorAll('[data-review-btn]')

reviewButtons.forEach(btn => {
    btn.addEventListener('click', ()=>{
        const offset = btn.dataset.reviewBtn === 'next' ? 1 : -1;
        const reviewContainer = document.querySelector('.review-container');
        const activeReview = reviewContainer.querySelector('[data-active]');
        let newIndex = [...reviewContainer.children].indexOf(activeReview) + offset;
        if(newIndex < 0) {
            newIndex = reviewContainer.children.length -1;
        }
        if(newIndex >= reviewContainer.children.length) {
            newIndex = 0;
        }
        reviewContainer.children[newIndex].dataset.active = true;
        delete activeReview.dataset.active;
    })
})