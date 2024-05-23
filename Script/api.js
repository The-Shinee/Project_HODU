const galleryContainer = document.querySelector('#gallery ul');
const showMoreButton = document.querySelector('#gallery > .content-box > :last-child');

showMoreButton.addEventListener('click', loadMoreCats);

// api key는 무료에 과금정책이 없으므로 가리지 않음
async function loadMoreCats() {
    const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_ QHYXRuv8cxfhV3orCyw9kfVgEeUw22 5pPsTtyKc4r1yOcaRPH25JbU2TUYK0 21mG')
    // const response = await fetch('https://cataas.com/api/cats?tags=cute&type=square&json=true&limit=3')
    const data = await response.json();

    const elem = document.createElement('li');
    elem.classList.add('container');
    let progress = 10;

    data.forEach(cat => {
        const img = document.createElement('img');
        img.src = cat.url;
        // img.src = `https://cataas.com/cat/${cat._id}`;
        img.addEventListener('load', ()=>{
            elem.appendChild(img);
            progress--;
            if(progress === 0)
                galleryContainer.appendChild(elem);
        });
    });
}

const INIT_GALLERY_ROW = 3;
const GALLERY_COLUMN = 3;
for(let i = 0 ; i < INIT_GALLERY_ROW ; i++)
{
    loadMoreCats();
}