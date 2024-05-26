import{
    loadMoreCats,
} from './api.js';

import {
    showMoreButton,
    subscribeButton,
    subscribeModal,
    subscribeModalButton,
    scrollTopButton, emailInput,
} from './components.js';

import {
    windowEventHandler,
    emailCheck,
} from './utils.js';

import{
    WindowsEventType,
} from './define.js';

showMoreButton.addEventListener('click', ()=> {
    loadMoreCats();
});
subscribeButton.addEventListener('click', ()=>{
    if(emailCheck(emailInput.value) === false)
    {
        alert('올바른 이메일 형식을 입력해주세요.');
        return;
    }

    windowEventHandler(subscribeModal, WindowsEventType.OPEN);
});
subscribeModalButton.addEventListener('click', ()=>{
    windowEventHandler(subscribeModal, WindowsEventType.CLOSE);
});
scrollTopButton.addEventListener('mouseenter', ()=>{
    scrollTopButton.style.backgroundImage = "url('../Resources/Images/scroll-top-btn-hover.svg')";
});

scrollTopButton.addEventListener('mouseleave', ()=>{
    scrollTopButton.style.backgroundImage = "url('../Resources/Images/scroll-top-btn-normal.svg')";
});

scrollTopButton.addEventListener('click', ()=>{
    window.scrollTo(0, 0);
});

export const galleryImageLoadingStatus = {
    get isLoading(){
        return this._isLoading || false;
    },
    set isLoading(value){
        this._isLoading = value;
        if(this._isLoading === false)
            showMoreButton.textContent = 'Show more';
        else
            showMoreButton.textContent = 'Loading...';
    }
};