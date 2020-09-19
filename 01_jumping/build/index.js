"use strict";
const chara = document.getElementById("chara");
const block = document.getElementById("block");
const jumpBtn = document.getElementById("jumpBtn");
const startBtn = document.getElementById("startBtn");
const message = document.getElementById("message");
let clickNum = 0;
if (!chara)
    throw new Error('charaがありません');
if (!block)
    throw new Error('blockがありません');
if (!jumpBtn)
    throw new Error('Jump buttonがありません');
if (!startBtn)
    throw new Error('Start buttonがありません');
if (!message)
    throw new Error('message がありません');
jumpBtn.addEventListener("click", jump);
function jump() {
    if (!chara)
        throw new Error('charaがありません');
    if (!chara.classList.contains("jump"))
        chara.classList.add("jump");
    clickNum++;
    setTimeout(() => {
        chara.classList.remove("jump");
    }, 500);
}
// GAME START!!
startBtn.addEventListener("click", () => {
    // 初期化
    message.innerHTML = "";
    clickNum = 0;
    if (!block.classList.contains("move"))
        block.classList.add("move");
    const checkDead = setInterval(() => {
        // 現在のスタイルを取得し(getComputedStyle)、そこから特定の値を取得
        const charaTop = parseInt(window.getComputedStyle(chara).getPropertyValue("top"));
        const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
        // block とキャラがぶつかったらゲームオーバー
        if (blockLeft < 50 && blockLeft > 0 && charaTop >= 130) {
            message.innerHTML = `<p>Game Over. <br />You jumped ${clickNum} times!</p>`;
            block.classList.remove("move");
        }
    }, 10);
});
