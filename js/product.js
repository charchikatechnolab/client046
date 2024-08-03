let img_div, img , recent_view_card =0 , related_card=0 , review_card_no=0;
lens = document.querySelector(".lens");
img_container = document.querySelector(".product-image--lens");
recent_image = img_container.querySelector(".product-image--lens img");
zoom_img = document.querySelector(".product-image--zoom");

img_container.onpointermove = function (event) {
    moveAt(event.clientX, event.clientY);
}
function moveAt(obj_clientx, obj_clienty) {
    var x, y;
    leftpos = obj_clientx - img_container.getBoundingClientRect().left - (lens.offsetWidth / 2)
    toppos = obj_clienty - img_container.getBoundingClientRect().top - (lens.offsetHeight / 2);
    x = (leftpos < 0) ? 0 : (leftpos > (img_container.clientWidth - lens.offsetWidth)) ? img_container.clientWidth - lens.clientWidth : leftpos;
    y = (toppos < 0) ? 0 : (toppos > (img_container.clientHeight - lens.offsetHeight)) ? img_container.clientHeight - lens.clientHeight : toppos;
    lens.style.left = x + "px";
    lens.style.top = y + "px";
    // set the zoom image as background ever mouse move
    if (window.innerWidth <= 800) {
        lens.style.backgroundPosition = "-" + (x * 1.25) + "px -" + (y * 1.25) + "px";
    } else {
        zoom_img.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }
}
//logic of zoom image

function toogle(element) {
    document.querySelector(".lens").classList.toggle("d-non");
    (window.innerWidth <= 800) ? zoom_img.classList.add("d-non") : zoom_img.classList.toggle("d-non");
    if (event.type == 'pointerenter') {
        if (window.innerWidth <= 800) {
            lens.style.backgroundImage = "url('" + recent_image.src + "')";
            lens.style.backgroundSize = (recent_image.width * 1.25) + "px " + (recent_image.height * 1.25) + "px";
            if (!zoom_img.classList.contains("d-non")) {
                zoom_img.classList.add("d-non");
            }
        } else {
            lens.style = "";
            if (zoom_img.classList.contains("d-non")) {
                zoom_img.classList.remove("d-non");
            }
            zoom_img.style.backgroundImage = "url('" + recent_image.src + "')";
            //  zoom image width = cx * lens width . zoom image  cx time bigger than lens
            cx = zoom_img.offsetWidth / lens.offsetWidth;
            cy = zoom_img.offsetHeight / lens.offsetHeight;
            zoom_img.style.backgroundSize = (recent_image.width * cx) + "px " + (recent_image.height * cy) + "px";
        }
    }
}
function vidoeshow() {
    var vid = document.querySelector('.video_container video');
    var div_video = document.getElementById("video_container");
    div_video.appendChild(vid);
    document.querySelector('.product-image--lens').insertAdjacentElement('afterend', div_video);
    div_video.style.display = "block";
    document.querySelector('.product-image--lens').style.display = 'none';
    vid.play();
}
function setimage(control) {
    document.querySelector(".product-image--lens img").src = control.querySelector("img").src;
    document.querySelector('.product-image--lens').style.display = 'block';
    document.querySelector('.video_container').style.display = 'none';
    // document.getElementById('mainimage').src =  `{{ media.preview_image.src |  image_url }}`;
    document.querySelector('.video_container video').pause();
}
window.addEventListener('load', () => {
    var social_arr = document.querySelectorAll(".share_media a[data-social]");
    for (let social_link of social_arr) {
        let condition = social_link.dataset.social;
        let current_url = window.location.href;
        let product_title = document.querySelector(".product-description h2").innerText;
        console.log('test');
        switch (condition) {
            case "facebook":
                social_link.href = "https://www.facebook.com/sharer/sharer.php?u=" + current_url;
                break;
            case "twiiter":
                social_link.href = "http://twitter.com/share?text=" + product_title + "&url=" + current_url;
                break;
            case "tumblr":
                social_link.href = "https://tumblr.com/widgets/share/tool?canonicalUrl=" + current_url;
                break;
            case "telegram":
                social_link.href = "https://telegram.me/share/url?url=" + current_url;
                break;
            case "mail":
                social_link.href = "mailto:?subject=" + product_title + "&body=" + current_url;
                break;
        }
    }
});
let slideIndex = 1;
var slider_interval;
showSlides(slideIndex);
// Next/previous controls
function plusSlides(n) {
    clearInterval(slider_interval);
    showSlides(slideIndex += n);
}
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("banner-container");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "flex";
    slider_interval = window.setTimeout(() => showSlides(slideIndex += 1), 2000);
}
function review_click(inc, scroller_div) {
    review_card_no = recent_card_no(inc, review_card_no, scroller_div);
    review_card_no = scroolview_event(inc, review_card_no, scroller_div);
}
function hideshow(elem){
    elem.style.display="none";
    elem.nextElementSibling.style.display="flex";
}
var timeInSecs;
var ticker;
function startTimer(secs) {
    timeInSecs = parseInt(secs);
    ticker = setInterval("tick()", 1000); 
}

function tick( ) {
    var secs = timeInSecs;
    if (secs > 0) {
        timeInSecs--; 
    }
    else {
        clearInterval(ticker);
        startTimer(10*60); // 4 minutes in seconds
    }
    var mins = Math.floor(secs/60);
    secs %= 60;
    document.querySelector("#minutes .bottom").innerText = ( (mins < 10) ? "0" : "" ) + mins ;
    document.querySelector("#seconds .bottom").innerText = ( (secs < 10) ? "0" : "" ) + secs;
}

startTimer(10*60); // 4 minutes in seconds