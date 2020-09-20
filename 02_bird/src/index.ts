const block = document.getElementById("block");
const hole = document.getElementById("hole");
const chara = document.getElementById("chara");
const jumpBtn = document.getElementById("jumpBtn");
const startBtn = document.getElementById("startBtn");
const message = document.getElementById("message");
const dialogBtn = document.getElementById('dialogBtn');
const dialog = document.getElementById('dialog');
const dialogClose = document.getElementById('dialogClose');

let jumping: number = 0;
let counter: number = 0;

if(!block) throw new Error('blockがありません');
if(!hole) throw new Error('holeがありません');
if(!chara) throw new Error('charaがありません');
if(!jumpBtn) throw new Error('Jump buttonがありません');
if(!startBtn) throw new Error('Start buttonがありません');
if(!message) throw new Error('message がありません');
if(!dialogBtn) throw new Error('dialogBtn がありません');
if(!dialog) throw new Error('dialog がありません');
if(!dialogClose) throw new Error('dialogClose がありません');

// GAME START!!
startBtn.addEventListener("click", () => {
  // 初期化
  if(!block.classList.contains("move")) block.classList.add("move");
  if(!hole.classList.contains("move")) hole.classList.add("move");
  if(!chara.classList.contains("piyo")) chara.classList.add("piyo");
  if(block.classList.contains("stop")) block.classList.remove("stop");
  if(hole.classList.contains("stop")) hole.classList.remove("stop");
  jumpBtn.addEventListener("click", jump);

  // CSS アニメーションの反復が1回分終了し、次の回が始まったときに発生するイベント
  hole.addEventListener("animationiteration", () => {
    const random = - ((Math.random() * 300) + 150);
    hole.style.top = random + "px";
    counter++;
  });

  // gravity の設定
  const gravity = setInterval(() => {
    // 現在のスタイルを取得し(getComputedStyle)、そこから特定の値を取得
    const charaTop = parseInt(window.getComputedStyle(chara).getPropertyValue("top"));
    if(jumping === 0) chara.style.top = (charaTop + 2) + "px";
    
    const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    const holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));

    // 地面からの距離：キャラクターが地面の下に潜ったらマイナスになる
    const cTop = - (510 - charaTop);
    
    // Game Over
    // キャラクターが地面につく or ブロックの左側がキャラクターにぶつかる and キャラクターがブロックより上にいる
    // or ブロックの左側がキャラクターにぶつかる and キャラクターがブロックより下にいる(穴は150px, キャラクターを50pxと計算すると、100px)
    if((charaTop > 500) 
      || (blockLeft < 98) && (blockLeft > 0) && ((cTop < holeTop)
      || (blockLeft < 98) && (blockLeft > 0) && (cTop > holeTop + 120))
    ){
      dialogBtn.click();
      dialog.innerText = `Score: ${counter} !`;
      // 初期化
      clearInterval(gravity);
      jumpBtn.removeEventListener("click", jump);
      counter = 0;
      // アニメーション停止
      if(!block.classList.contains("stop")) block.classList.add("stop");
      if(!hole.classList.contains("stop")) hole.classList.add("stop");
      if(!chara.classList.contains("stop")) chara.classList.add("stop");
    }
  }, 10);
});

// ダイアログがクリックされたら位置を元に戻す
dialogClose.addEventListener("click", () => {
  if(block.classList.contains("move")) block.classList.remove("move");
  if(hole.classList.contains("move")) hole.classList.remove("move");
  if(block.classList.contains("stop")) block.classList.remove("stop");
  if(hole.classList.contains("stop")) hole.classList.remove("stop");
  chara.style.top = 100 + "px";
});

function jump() {
  if(!chara) throw new Error('charaがありません');
  
  jumping = 1;
  let jumpCount: number = 0;
  
  // 重力を感じながら、クリックされたら少し上に上がるためにsetInterval
  const jumpInterval = setInterval(() => {
    // 現在のスタイルを取得し(getComputedStyle)、そこから特定の値を取得
    const charaTop = parseInt(window.getComputedStyle(chara).getPropertyValue("top"));
    
    if((charaTop > 6) && (jumpCount < 15)) chara.style.top = (charaTop - 4) + "px";

    if(jumpCount > 20) {
      clearInterval(jumpInterval);
      jumping = 0;
      jumpCount = 0;
    }
    jumpCount++;
  }, 10);
}