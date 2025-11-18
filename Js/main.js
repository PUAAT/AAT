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

/* --- 3D 圖片傾斜特效 (3D Tilt) --- */

// 1. 抓取所有的故事圖片
const images = document.querySelectorAll('.story-block img');

// 2. 幫每一張圖片加上監聽器
images.forEach(img => {
    
    // 當滑鼠在圖片上移動時...
    img.addEventListener('mousemove', (e) => {
        const rect = img.getBoundingClientRect();
        
        // 計算滑鼠在圖片內的 X 和 Y 座標 (0 到 1 之間)
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        // 計算旋轉角度 (範圍 -15度 到 15度)
        // 0.5 是中心點
        const rotateX = (0.5 - y) * 30; 
        const rotateY = (x - 0.5) * 30;
        
        // 套用 CSS 變形
        // perspective(1000px) 是創造 3D 景深
        img.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    // 當滑鼠離開圖片時...
    img.addEventListener('mouseleave', () => {
        // 圖片慢慢回復原狀
        img.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        img.style.transition = 'transform 0.5s ease'; // 加上平滑過渡
    });
    
    // 當滑鼠進入時，取消平滑過渡 (讓反應更靈敏)
    img.addEventListener('mouseenter', () => {
        img.style.transition = 'none';
    });
});