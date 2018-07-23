var container = document.querySelector(".swiper-container");
/*动态改变根元素字体大小*/
function recalc() {
    var deviceWidth = window.innerWidth||document.documentElement.clientWidth;
    var deviceHeight = window.innerHeight||document.documentElement.clientHeight;
    //获取的窗口宽度
    if (!deviceWidth) return;
    var scale=deviceWidth/deviceHeight>0.7//兼容ipad
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
