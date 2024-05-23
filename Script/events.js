import{
    loadMoreCats,
} from './api.js';

import {
    showMoreButton,
    subscribeButton,
    subscribeModal,
    subscribeModalButton,
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