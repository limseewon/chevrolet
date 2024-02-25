const slideWrappers = document.querySelectorAll('.slidewrapper');

for(let slidewrapper of slideWrappers){
  myslide(slidewrapper);
}



function myslide(target) {

  let slideWrapper = target, //ul의 부모
    slideContainer = slideWrapper.querySelector('.slidecontainer'), //ul
    slides = slideContainer.querySelectorAll('.slide'), //각 슬라이드
    slideCount = slides.length, //슬라이드 개수
    currentSlideIdx = 0,
    pager = slideWrapper.querySelector('.pager'),
    timer,
    pagerHTML = '',
    prevBtn = slideWrapper.querySelector('.prev'),
    nextBtn = slideWrapper.querySelector('.next');

  if (slideCount > 1) {
    slides.forEach((item, idx) => {
      item.style.left = `${idx*100}%`;
      //pager a 태그 생성
      pagerHTML += `<a href="">${idx}</a>`;
    });
  }
  pager.innerHTML = pagerHTML;
  let pagerBtn = pager.querySelectorAll('a');

  function moveSlide(num) {
    slideContainer.style.left = `${-num*100}%`;
    currentSlideIdx = num;
    console.log(currentSlideIdx);

    if (currentSlideIdx === slideCount - 1) {
      nextBtn.classList.add('disabled');
    } else {
      nextBtn.classList.remove('disabled');
    }
    //처음이면 이전버튼이 사라지고, 처음이 아니라면 다시보이도록
    if (currentSlideIdx === 0) {
      prevBtn.classList.add('disabled');
    } else {
      prevBtn.classList.remove('disabled');
    }
    //모든슬라이드에서 active를 제거하고, 지금 보고 있는 슬라이드에 active를 추가
    for (let sl of slides) {
      sl.classList.remove('active');
    }
    slides[currentSlideIdx].classList.add('active');
    //모든 페이저에서 active를 제거하고, 현재 슬라이드번호의 pager에 active 추가
    for (let pb of pagerBtn) {
      pb.classList.remove('active');
    }
    pagerBtn[currentSlideIdx].classList.add('active');
  } //moveslide
  moveSlide(0);

  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    //마지막이 아니라면
    if (currentSlideIdx < slideCount - 1) {
      moveSlide(currentSlideIdx + 1);
    }
  });
  //이전 버튼을 클릭하면 할일, 처음이 아니라면
  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentSlideIdx > 0) {
      moveSlide(currentSlideIdx - 1);
    }
  });

  pagerBtn.forEach((item, idx) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      moveSlide(idx);
    });
  });

  function autoSlide() {
    timer = setInterval(() => {
      //let nextIdx = currentSlideIdx + 1;
      let nextIdx = (currentSlideIdx + 1) % slideCount;
      moveSlide(nextIdx);
    }, 5000);
  }
  autoSlide();

  slideWrapper.addEventListener('mouseenter', () => {
    clearInterval(timer);
  });
  slideWrapper.addEventListener('mouseleave', () => {
    autoSlide();
  });

}


// 탭 메뉴
const tabMenu = document.querySelectorAll('.tab-menu a'); 
const tabContent = document.querySelectorAll('.tab-content > ul'); 

const highlight = document.querySelector('.highlight');

tabMenu.forEach((item, index)=>{
  item.addEventListener('click',(e)=>{
    e.preventDefault();
    let newLeft = item.offsetLeft;
    let newWidth = item.offsetWidth;
    console.log(newLeft,newWidth);

    highlight.style.left = `${newLeft}px`;
    highlight.style.width = `${newWidth}px`;

    for(let m of tabMenu){
      m.classList.remove('active');
    }
    e.target.classList.add('active');

    for(let tc of tabContent){
      tc.classList.remove('active');
    }
    tabContent[index].classList.add('active');
  })
})

/*
요소의 너비 offsetWidth
요소의 위치 offsetLeft
  가까운 부모중에 포지션값이 기본값이 아닌 요소를 기준으로.
*/
