var container = document.querySelector(".swiper-container");
/*动态改变根元素字体大小*/
function recalc() {
    var deviceWidth = document.documentElement.clientWidth;
    var deviceHeight = document.documentElement.clientHeight;
    //获取的窗口宽度
    if (!deviceWidth) return;
    var scale=deviceWidth/deviceHeight>0.6//兼容ipad
    // console.log(scale)
    //横屏处理
    if (!scale) {
        document.documentElement.style.fontSize = deviceWidth + 'px';
        container.classList.remove("baseHeight");
    }else{
        document.documentElement.style.fontSize = deviceHeight/2 + 'px';
        container.classList.add("baseHeight");
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
