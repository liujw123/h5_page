var container = document.querySelector(".swiper-container");
/*动态改变根元素字体大小*/
function recalc() {
    var deviceWidth = document.documentElement.clientWidth;
    var deviceHeight = document.documentElement.clientHeight;
    //获取的窗口宽度
    if (!deviceWidth) return;
    if (deviceWidth < deviceHeight) {
        document.documentElement.style.fontSize = deviceWidth + 'px';
    }else{
        document.documentElement.style.fontSize = deviceHeight/2 + 'px';
    }

}

function initRecalc() {
    recalc();
    var resizeEvt = 'osrientationchange' in window ? 'orientationchange' : 'resize';
    if (!document.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    document.addEventListener('DOMContentLoaded', recalc, false);
}
initRecalc();

// function containHeight(){
//     var container = document.querySelector(".swiper-container");
//     console.log(container)
//     container.style.height=deviceHeight+'px'
// }containHeight()