function scroolview_event(inc,recent_card_no,scroller){
    var scroller_childern = scroller.children;
    var card = scroller_childern[recent_card_no];
    if(card != undefined)
        scroller.scrollLeft = card.offsetLeft; 
    else{
        scroller.scrollLeft = scroller_childern[scroller_childern.length-1].offsetLeft;
    }
    return recent_card_no;
}
function onload(scroller,recent_card_no){
    var scroller_childern = scroller.children;
    var card = scroller_childern[recent_card_no];
    if(scroller_childern.length > 0){
        scroller.scrollTo({
            top: 0,
            left: card.offsetLeft,
            behavior: 'instant'
        });
    }
    if (scroller.scrollWidth <= scroller.clientWidth) {
        scroller.previousElementSibling.classList.add('d-non');
        scroller.previousElementSibling.previousElementSibling.classList.add('d-non');
    }
}
function onresize(scroller,recent_card_no){
    if (scroller.scrollWidth <= scroller.clientWidth) {
        if(!scroller.previousElementSibling.classList.contains('d-non')){
            scroller.previousElementSibling.classList.add('d-non');
            scroller.previousElementSibling.previousElementSibling.classList.add('d-non');
        }
    }else{
        if(scroller.previousElementSibling.classList.contains('d-non')){
            scroller.previousElementSibling.classList.remove('d-non');
            scroller.previousElementSibling.previousElementSibling.classList.remove('d-non');
            var scroller_childern = scroller.children;
            var card = scroller_childern[recent_card_no];
            scroller.scrollTo({top: 0, left: card.offsetLeft, behavior: 'instant'});
        }
    }
}
function recent_card_no(inc,recent_card_no,scroller){
    if(window.innerWidth <= 500 ){
        inc > 0 ? inc = 1 : inc = -1;
    }
    if(window.innerWidth >= 500 ){
        inc > 0 ? inc = 2 : inc = -2;
    }
    recent_card_no = recent_card_no + inc;
    if(recent_card_no >= scroller.children.length-1){
        if(visiblle_check(scroller.children[scroller.children.length-1])){
            recent_card_no = 0;
        }
    }
    if(recent_card_no < 0 ){
        //recent_card_no = (Math.abs(inc) *  Math.ceil(scroller.children.length/ Math.abs(inc))) -  Math.abs(inc) ; 
        if(recent_card_no == inc){
            recent_card_no = scroller.children.length + inc;
        }else{
            recent_card_no = 0;
        }
    }
    console.log(recent_card_no);
    return recent_card_no;
}
function visiblle_check(element){
     if(element.getBoundingClientRect().x  < element.parentElement.offsetWidth){
            return true;
     }else{
        return false;
     }
}

