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

    const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${GALLERY_COLUMN}&api_key=${API_KEY_CAT}`, { cache: "no-store" })
        .catch(() =>{
            showMoreButton.textContent = 'Loading Failed';
        });


    const elem = document.createElement('li');
    elem.classList.add('container');

    let progress = GALLERY_COLUMN;
    const data = await response.json();
    data.forEach(cat => {
        const linkTag = document.createElement('a');
        linkTag.setAttribute('href', cat.url);
        elem.appendChild(linkTag);

        const img = document.createElement('img');
        img.classList.add('gallery-image');
        img.src = cat.url;
        img.addEventListener('load', ()=>{
            linkTag.appendChild(img);
            progress--;
            if(progress === 0){
                galleryContainer.appendChild(elem);
                loadingCount.count--;
            }
        });
    });
}

// ----------------------------------------------------
// 2. Kakao map api
// ----------------------------------------------------
// api key는 무료에 과금정책이 없으므로 가리지 않음
const mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(37.56699, 126.97821), // 지도의 중심좌표
        level: 4, // 지도의 확대 레벨
        mapTypeId : kakao.maps.MapTypeId.ROADMAP // 지도종류
    };

// 지도를 생성한다
const map = new kakao.maps.Map(mapContainer, mapOption);

// 지도 타입 변경 컨트롤을 생성한다
const mapTypeControl = new kakao.maps.MapTypeControl();

// 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도에 확대 축소 컨트롤을 생성한다
const zoomControl = new kakao.maps.ZoomControl();

// 지도의 우측에 확대 축소 컨트롤을 추가한다
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

// 현재 위치를 업데이트 할 텍스트 박스
const locationTextbox = document.querySelector("#location > .content-box > :nth-child(2)");

const geocoder = new kakao.maps.services.Geocoder();

// HTML5의 geolocation으로 사용할 수 있는지 확인합니다
if (navigator.geolocation) {

    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition(function(position) {

        const lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도

        // const lat = 37.2518163005629, // 위도
        //     lon = 127.072602539897; // 경도

        const locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

        geocoder.coord2Address(lon, lat, (result, status) =>{
            if (status === kakao.maps.services.Status.OK) {
                setFullAddress(result[0]);
            }
        });

        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition);
    });

} else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
    const locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
    displayMarker(locPosition);
}

// 지도에 마커를 표시하는 함수입니다
function displayMarker(locPosition) {

    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
        map: map,
        position: locPosition
    });

    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);

    // 맵에 click 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
        searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
            marker.setPosition(mouseEvent.latLng);

            if (status === kakao.maps.services.Status.OK) {
                setFullAddress(result[0]);
            }
        });
    });
}

function searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

function setFullAddress(address){

    if(address === undefined)
        return false;

    let detailAddr = !!address.road_address ? `도로명주소 : ${address.road_address.address_name}\n` : '';
    detailAddr += `지번 주소 : ${address.address.address_name}`;

    locationTextbox.textContent = `${detailAddr}`;

    return true;
}