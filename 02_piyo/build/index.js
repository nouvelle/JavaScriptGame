"use strict";
const block = document.getElementById("block");
const hole = document.getElementById("hole");
const chara = document.getElementById("chara");
const jumpBtn = document.getElementById("jumpBtn");
const startBtn = document.getElementById("startBtn");
const message = document.getElementById("message");
const dialog = document.getElementById('dialog');
const dialogClose = document.getElementById('dialogClose');
const contentCover = document.getElementById('contentCover');
let jumping = 0;
let counter = 0;
if (!block)
    throw new Error('blockがありません');
if (!hole)
    throw new Error('holeがありません');
if (!chara)
    throw new Error('charaがありません');
if (!jumpBtn)
    throw new Error('Jump buttonがありません');
if (!startBtn)
    throw new Error('Start buttonがありません');
if (!message)
    throw new Error('message がありません');
if (!dialog)
    throw new Error('dialog がありません');
if (!dialogClose)
    throw new Error('dialogClose がありません');
if (!contentCover)
    throw new Error('contentCover がありません');
// GAME START!!
startBtn.addEventListener("click", () => {
    // 初期化
    if (!block.classList.contains("move"))
        block.classList.add("move");
    if (!hole.classList.contains("move"))
        hole.classList.add("move");
    if (!chara.classList.contains("piyo"))
        chara.classList.add("piyo");
    if (block.classList.contains("stop"))
        block.classList.remove("stop");
    if (hole.classList.contains("stop"))
        hole.classList.remove("stop");
    if (!contentCover.classList.contains("dispNone"))
        contentCover.classList.add("dispNone");
    if (!message.classList.contains("dispNone"))
        message.classList.add("dispNone");
    jumpBtn.addEventListener("click", jump);
    // CSS アニメーションの反復が1回分終了し、次の回が始まったときに発生するイベント
    hole.addEventListener("animationiteration", () => {
        const random = -((Math.random() * 300) + 150);
        hole.style.top = random + "px";
        counter++;
    });
    // gravity の設定
    const gravity = setInterval(() => {
        // 現在のスタイルを取得し(getComputedStyle)、そこから特定の値を取得
        const charaTop = parseInt(window.getComputedStyle(chara).getPropertyValue("top"));
        if (jumping === 0)
            chara.style.top = (charaTop + 2) + "px";
        const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
        const holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
        // 地面からキャラクターのtopまでの距離
        const cTop = -(500 - charaTop);
        // Game Over 判定
        // 1. キャラクターが地面の下に完全に隠れる（charaTop > 450）
        // 2. ブロックの上半分 or 下半分の位置でキャラクターとぶつかる
        //  - ブロックの左側がキャラクターにぶつかる(blockLeft < 95 : 5px余裕を持たせてる)
        //  - ブロックの左側がエリア内にある(blockLeft > 5 : 5px余裕を持たせてる)
        //  - ブロックの上半分の位置でキャラクターとぶつかる
        //      or
        //  - ブロックの下半分の位置でキャラクターとぶつかる(穴は150px, キャラクターを50pxと計算すると、100px:(cTop > holeTop + 100)
        if ((charaTop > 450)
            || (blockLeft < 95) && (blockLeft > 5) && ((cTop < holeTop) || (cTop > holeTop + 100))) {
            dialog.innerText = `Score: ${counter} !`;
            if (contentCover.classList.contains("dispNone"))
                contentCover.classList.remove("dispNone");
            if (message.classList.contains("dispNone"))
                message.classList.remove("dispNone");
            // 初期化
            clearInterval(gravity);
            jumpBtn.removeEventListener("click", jump);
            counter = 0;
            // アニメーション停止
            if (!block.classList.contains("stop"))
                block.classList.add("stop");
            if (!hole.classList.contains("stop"))
                hole.classList.add("stop");
            if (!chara.classList.contains("stop"))
                chara.classList.add("stop");
        }
    }, 10);
});
// ダイアログがクリックされたら位置を元に戻す
dialogClose.addEventListener("click", () => {
    if (!contentCover.classList.contains("dispNone"))
        contentCover.classList.add("dispNone");
    if (!message.classList.contains("dispNone"))
        message.classList.add("dispNone");
    if (block.classList.contains("move"))
        block.classList.remove("move");
    if (hole.classList.contains("move"))
        hole.classList.remove("move");
    if (block.classList.contains("stop"))
        block.classList.remove("stop");
    if (hole.classList.contains("stop"))
        hole.classList.remove("stop");
    chara.style.top = 100 + "px";
});
function jump() {
    if (!chara)
        throw new Error('charaがありません');
    jumping = 1;
    let jumpCount = 0;
    // 重力を感じながら、クリックされたら少し上に上がるためにsetInterval
    const jumpInterval = setInterval(() => {
        // 現在のスタイルを取得し(getComputedStyle)、そこから特定の値を取得
        const charaTop = parseInt(window.getComputedStyle(chara).getPropertyValue("top"));
        if ((charaTop > 6) && (jumpCount < 15))
            chara.style.top = (charaTop - 4) + "px";
        if (jumpCount > 20) {
            clearInterval(jumpInterval);
            jumping = 0;
            jumpCount = 0;
        }
        jumpCount++;
    }, 10);
}
