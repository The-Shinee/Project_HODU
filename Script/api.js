import {
    showMoreButton,
    galleryContainer,
} from './components.js';

import {
    API_KEY_CAT,
    GALLERY_COLUMN,
} from './define.js'

import{
    loadingCount
} from './events.js';

// ----------------------------------------------------
// 1. Cat api
// ----------------------------------------------------

// api key는 무료에 과금정책이 없으므로 가리지 않음
export async function loadMoreCats() {
    loadingCount.count++;

    const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${GALLERY_COLUMN}&api_key=${API_KEY_CAT}`)
        .catch(() =>{
            showMoreButton.textContent = 'Loading Failed';
        });
    // const response = await fetch('https://cataas.com/api/cats?tags=cute&type=square&json=true&limit=3')

    const data = await response.json();

    const elem = document.createElement('li');
    elem.classList.add('container');
    let progress = 10; // TODO : limit 관련 수정사항 issue #1

    data.forEach(cat => {
        const img = document.createElement('img');
        img.src = cat.url;
        // img.src = `https://cataas.com/cat/${cat._id}`;
        img.addEventListener('load', ()=>{
            elem.appendChild(img);
            progress--;
            if(progress === 0){
                galleryContainer.appendChild(elem);
                loadingCount.count--;
            }
        });
    });
}