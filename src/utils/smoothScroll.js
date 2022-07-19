
const smoothScroll = function (Dom, to, duration) {
    // 获取当前滚动的高度 Dom为目标元素
    const getScrollTop = function (Dom) {
        return Dom.scrollTop;
    };
    // 设置滚动条
    const setScrollTo = function (Dom, value) {
        Dom.scrollTo(0, value);
        return value;
    };
    if (duration < 0) {
        setScrollTo(Dom, to);
        return;
    }
    let diff = to - getScrollTop(Dom);
    if (diff === 0) return;
    let step = (diff / duration) * 10;
    requestAnimationFrame(function () {
        if (Math.abs(step) > Math.abs(diff)) {
            setScrollTo(Dom, getScrollTop(Dom) + diff);
            return;
        }
        setScrollTo(Dom, getScrollTop(Dom) + step);
        if ((diff > 0 && getScrollTop(Dom) >= to) || (diff < 0 && getScrollTop(Dom) <= to)) {
            return;
        }
        smoothScroll(Dom, to, duration - 20);
    });
};
export { smoothScroll };