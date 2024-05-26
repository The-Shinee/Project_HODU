import{
    loadMoreCats,
} from './api.js';

import {
    showMoreButton,
    subscribeButton,
    subscribeModal,
    subscribeModalButton,
    scrollTopButton,
} from './components.js';

import {
    windowEventHandler,
} from './utils.js';

import{
    WindowsEventType,
} from './define.js';

showMoreButton.addEventListener('click', ()=> {
    loadMoreCats();
});
subscribeButton.addEventListener('click', ()=>{
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