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

showMoreButton.addEventListener('click', loadMoreCats);
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

export const loadingCount = {
    get count(){
        return this._count || 0;
    },
    set count(value){
        this._count = value;
        if(this._count === 0)
            showMoreButton.textContent = 'Show more';
        else
            showMoreButton.textContent = 'Loading...';
    }
};