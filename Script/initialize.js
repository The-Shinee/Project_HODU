import {
    loadMoreCats,
} from './api.js';

import {
    INIT_GALLERY_ROW,
} from './define.js';

for(let i = 0 ; i < INIT_GALLERY_ROW ; i++)
{
    loadMoreCats(true);
}