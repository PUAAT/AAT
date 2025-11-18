/*
 * 這是 JavaScript 的註解
 * 我們的目標：當頁面向下捲動時，幫 <nav> 加上 "scrolled" 這個 class
 */

// 1. 選中我們要操作的目標 (導覽列)
const nav = document.querySelector('nav');

// 2. 監聽整個視窗的「捲動 (scroll)」事件
window.addEventListener('scroll', () => {
    
    // 3. 檢查：如果垂直捲動的距離 (window.scrollY)「大於」 50 像素
    if (window.scrollY > 50) {
        
        // 4. 就幫 <nav> 加上 "scrolled" 這個 class
        nav.classList.add('scrolled');
        
    } else {
        
        // 5. 否則 (捲回頂部了)，就把 "scrolled" 這個 class 移除
        nav.classList.remove('scrolled');
    }
});