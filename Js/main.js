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
/* --- 漢堡選單功能 --- */

// 1. 抓取按鈕 和 選單
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu'); // 記得 HTML ul 要加 class="nav-menu"

// 2. 監聽按鈕的「點擊 (click)」事件
menuToggle.addEventListener('click', () => {
    
    // 3. 切換 active class (有就移除，沒有就加上)
    navMenu.classList.toggle('active');
});
/* --- 捲動浮現效果 (Scroll Reveal) --- */

window.addEventListener('scroll', reveal);

function reveal() {
    // 1. 抓取所有帶有 'reveal' class 的元素
    var reveals = document.querySelectorAll('.reveal');

    // 2. 遍歷每一個元素
    for (var i = 0; i < reveals.length; i++) {

        var windowHeight = window.innerHeight; // 視窗高度
        var elementTop = reveals[i].getBoundingClientRect().top; // 元素距離頂部的距離
        var elementVisible = 150; // 緩衝距離 (讓元素進入視窗 150px 後才出現)

        // 3. 如果元素進入了視線範圍...
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active'); // 加上 active class -> 觸發 CSS 動畫
        } else {
            // (選用) 如果想讓它滑出去後消失，可以把 else 打開
            // reveals[i].classList.remove('active'); 
        }
    }
}

// 頁面載入時先執行一次 (避免剛打開是一片白)
reveal();