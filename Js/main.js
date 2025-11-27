/*
 * 這是 JavaScript 的註解
 * 我們的目標：當頁面向下捲動時，幫 <nav> 加上 "scrolled" 這個 class
 */

/* --- Level 2: 網站載入完成偵測 (新增這段在最上面) --- */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // 延遲 0.5 秒再消失，讓使用者看清楚帥氣的動畫
        setTimeout(() => {
            preloader.classList.add('preloader-hidden');
        }, 500);
    }
});

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

// 讓 故事圖片、武器圖示、還有團隊卡片 都能 3D 轉動
const images = document.querySelectorAll('.story-block img, .arsenal-icon img, .team-card');

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
/* --- Animus 粒子生成器 --- */
function createParticles() {
    const body = document.querySelector('body');
    const particleCount = 50; // 粒子數量

    for (let i = 0; i < particleCount; i++) {
        let particle = document.createElement('div');
        particle.classList.add('animus-particle');
        
        // 隨機位置與大小
        let x = Math.random() * 100;
        let y = Math.random() * 100;
        let size = Math.random() * 3 + 1; // 1px ~ 4px
        let duration = Math.random() * 5 + 3; // 3s ~ 8s 動畫時間
        let delay = Math.random() * 5;

        particle.style.left = x + 'vw';
        particle.style.top = y + 'vh';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';

        body.appendChild(particle);
    }
}

// 啟動粒子
createParticles();

/* --- Gallery Lightbox 功能 --- */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const captionText = document.getElementById('caption');
const closeBtn = document.querySelector('.close-btn');

// 抓取所有藝廊圖片
const galleryImages = document.querySelectorAll('.gallery-item img');

// 🔥 關鍵修改：加這行 if 檢查
// 意思：只有當網頁裡真的有 lightbox 和 closeBtn 時，才執行下面的程式
if (lightbox && closeBtn) {

    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            lightbox.style.display = "block";
            lightboxImg.src = this.src;
            
            // 抓取說明文字
            const captionDiv = this.nextElementSibling;
            if (captionDiv) {
                captionText.innerHTML = captionDiv.innerText;
            } else {
                captionText.innerHTML = "";
            }
        });
    });

    // 關閉功能
    closeBtn.onclick = function() {
        lightbox.style.display = "none";
    }

    // 點擊背景也可以關閉
    lightbox.onclick = function(e) {
        if (e.target !== lightboxImg) {
            lightbox.style.display = "none";
        }
    }

} // End of lightbox check

/* --- Debug 版本：Contact 表單功能 --- */
const contactForm = document.getElementById('contact-form');
const statusMsg = document.getElementById('form-status');
const submitBtn = document.querySelector('.submit-btn');
const btnText = document.querySelector('.btn-text');

// 測試 1: 確認 JS 有抓到表單
if (contactForm) {
    console.log("✅ 成功抓到表單元素！監聽器已啟動。");

    contactForm.addEventListener('submit', async function(e) {
        console.log("⚡ 觸發 Submit 事件！正在阻止預設刷新...");
        e.preventDefault(); // 這是最關鍵的一行，阻止刷新

        console.log("🔒 正在準備發送...");
        
        // 改變按鈕狀態
        btnText.innerText = "ENCRYPTING DATA...";
        submitBtn.style.opacity = "0.7";
        submitBtn.style.cursor = "wait";

        const data = new FormData(contactForm);

        try {
            // 記得確認這裡的網址是對的
            const response = await fetch("https://formspree.io/f/xdkvwbdy", {
                method: "POST",
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                console.log("🚀 發送成功！");
                statusMsg.innerHTML = "<span style='color:#27c93f'>> DATA SENT SUCCESSFULLY.</span>";
                contactForm.reset();
                btnText.innerText = "TRANSMIT DATA";
            } else {
                console.log("❌ 發送失敗：Formspree 回傳錯誤");
                statusMsg.innerHTML = "<span style='color:#c0392b'>> ERROR: TRANSMISSION FAILED.</span>";
            }
        } catch (error) {
            console.log("❌ 發送失敗：網路錯誤");
            statusMsg.innerHTML = "<span style='color:#c0392b'>> ERROR: NETWORK OFFLINE.</span>";
        }
        
        submitBtn.style.opacity = "1";
        submitBtn.style.cursor = "pointer";
    });
} else {
    console.error("❌ 找不到 id='contact-form' 的元素！請檢查 HTML。");
}

/* --- 戰術游標跟隨與互動 --- */
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// 只有在電腦版才執行 (檢查是否有游標元素)
if (cursorDot && cursorOutline) {
    
    // 1. 跟隨滑鼠
    window.addEventListener('mousemove', function(e) {
        const posX = e.clientX;
        const posY = e.clientY;

        // 實心點直接跟隨 (無延遲)
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // 外框延遲跟隨 (增加滑順感)
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // 2. 互動偵測 (連結、按鈕)
    const hoverables = document.querySelectorAll('a, button, .gallery-item, .video-card, .team-card');

    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering'); // 變大
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering'); // 變回原狀
        });
    });
}

/* --- 捲動進度條計算 --- */
const progressBar = document.querySelector('.scroll-progress');

if (progressBar) {
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        progressBar.style.width = scrolled + "%";
    });
}

/* --- Level 1: 駭客打字機特效 --- */

// 定義要打的字
const textH1 = "EXPLORE HISTORY";
const textP = "THROUGH THE EYES OF ASSASSINS";

// 抓取元素
const h1Element = document.querySelector('.type-h1');
const pElement = document.querySelector('.type-p');

// 只有在首頁才執行 (確認元素存在)
if (h1Element && pElement) {
    let i = 0;
    let j = 0;

    // 打 H1 的函數
    function typeWriterH1() {
        if (i < textH1.length) {
            h1Element.innerHTML += textH1.charAt(i);
            h1Element.setAttribute('data-text', h1Element.innerHTML); // 讓 Glitch 特效同步
            i++;
            setTimeout(typeWriterH1, 100); // 打字速度 (越小越快)
        } else {
            // H1 打完後，開始打 P
            setTimeout(typeWriterP, 500); // 停頓 0.5 秒
        }
    }

    // 打 P 的函數
    function typeWriterP() {
        if (j < textP.length) {
            pElement.innerHTML += textP.charAt(j);
            j++;
            setTimeout(typeWriterP, 50); // 副標題打快一點
        }
    }

    // 啟動！
    // 延遲 1 秒讓影片先跑一下再開始打字
    setTimeout(typeWriterH1, 1000);
}

/* --- Level 3: UI 音效系統 (Audio Feedback) --- */

// 1. 抓取音效元素
const hoverSound = document.getElementById('sfx-hover');
const clickSound = document.getElementById('sfx-click');

// 2. 設定音量 (建議小聲一點，不要嚇到人)
if (hoverSound) hoverSound.volume = 0.2; // 20% 音量
if (clickSound) clickSound.volume = 0.4; // 40% 音量

// 3. 定義播放函數 (防止連續觸發時沒聲音)
function playHover() {
    if (hoverSound) {
        hoverSound.currentTime = 0; // 倒帶回開頭
        hoverSound.play().catch(e => {}); // catch 錯誤是為了防止瀏覽器阻擋
    }
}

function playClick() {
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch(e => {});
    }
}

// 4. 幫所有「可互動元素」加上音效
// 包含：連結(a), 按鈕(button), 還有我們的各種卡片(.card)
const interactiveElements = document.querySelectorAll('a, button, .game-card, .video-card, .gallery-item, .team-card, .arsenal-card');

interactiveElements.forEach(el => {
    // 滑鼠移入 -> 播放 hover 音效
    el.addEventListener('mouseenter', playHover);
    
    // 點擊 -> 播放 click 音效
    el.addEventListener('click', playClick);
});

/* --- Level 4: Konami Code 彩蛋 (上上下下左右左右BA) --- */
const secretCode = [
    'ArrowUp', 'ArrowUp', 
    'ArrowDown', 'ArrowDown', 
    'ArrowLeft', 'ArrowRight', 
    'ArrowLeft', 'ArrowRight', 
    'b', 'a'
];
let sequence = [];

window.addEventListener('keydown', (e) => {
    // 1. 把按下的鍵加入陣列
    sequence.push(e.key);
    
    // 2. 只保留最後 10 個按鍵 (因為密碼長度是 10)
    sequence.splice(-secretCode.length - 1, sequence.length - secretCode.length);

    // 3. 檢查是否吻合
    if (sequence.join('').includes(secretCode.join(''))) {
        activateEagleVision();
        sequence = []; // 重置
    }
});

function activateEagleVision() {
    // 播放音效
    const eagleSound = document.getElementById('sfx-eagle');
    if (eagleSound) eagleSound.play();

    // 切換 CSS class
    document.body.classList.toggle('eagle-vision');
    
    console.log("🦅 EAGLE VISION ACTIVATED");
}

/* --- PWA Service Worker 註冊 --- */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker 註冊成功！範圍：', reg.scope))
            .catch(err => console.log('Service Worker 註冊失敗：', err));
    });
}