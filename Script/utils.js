import {
    WindowsEventType,
} from './define.js'

// 사용을 모달 창 뿐이라 display와 같은 경우는 배제함.
export function windowEventHandler(target, event){
    switch(event){
        case WindowsEventType.OPEN:
            target.style.visibility = 'visible';
            break;
        case WindowsEventType.CLOSE:
            target.style.visibility = 'hidden';
            break;
        default:
            throw Error("TypeError: event type is not WindowsEventType");
    }
    return true;
}

export function emailCheck(email_address){
    const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    return email_regex.test(email_address);
}

export function createElementWithClass(tag, ...classes) {
    const element = document.createElement(tag);
    element.classList.add(...classes);
    return element;
}