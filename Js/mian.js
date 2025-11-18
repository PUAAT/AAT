/*
 * 這是 JavaScript 的註解
 * 我們的目標：當頁面向下捲動時，幫 <nav> 加上 "scrolled" 這個 class
 */

// 1. 抓取我們的導覽列 (nav) 標籤
const nav = document.querySelector('nav');

// 2. 監聽視窗的「捲動 (scroll)」事件
window.addEventListener('scroll', () => {
    
    // 3. 檢查：如果目前捲動的垂直距離 (scrollY) 大於 50 像素...
    if (window.scrollY > 50) {
        
        // ...就幫 nav 加上一個叫做 'scrolled' 的 class
        nav.classList.add('scrolled');
        
    } else {
        
        // 4. 如果捲回頂部 (小於 50 像素)，就把 'scrolled' 拿掉
        nav.classList.remove('scrolled');
    }
});