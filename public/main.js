const isDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

draw();

async function draw() {
  const res = await fetch("data.json");
  const json = await res.json();

  // 画面の表示要素を追加
  ["date", "prev", "total", "comment"].forEach((key) => {
    document.getElementById(key).innerText = json[key];
  });

  // ツイートボタン設定
  const url = `https://x.com/share?url=https://gomihitomi.github.io/yasero/&text=${
    "現在の吾味人美ダイエット成果は…「" + json.total + "」"
  }&hashtags=痩せろ吾味人美`;
  post.setAttribute("href", url);

  drawSvg(json);
}

function drawSvg(json) {
  const canvas = document.getElementById("canvas");
  if (!canvas.getContext) return;
  const ctx = canvas.getContext("2d");

  const datas = json.week.split(",").map((v) => Number(v));
  const diffs = datas.reduce((p, n, i) => [...p, p[i] + n], [10]);

  const paths = datas.map((v, i) => {
    const x = i * 80 + 40;
    const y = 1000 - diffs[i + 1] * 80;
    const value = (v > 0 && "+") + v;
    return { x, y, value };
  });

  ctx.fillStyle = isDark ? "#fff" : "#000";
  ctx.strokeStyle = isDark ? "#fff" : "#000";
  ctx.lineWidth = 2;

  const first = paths.at(0);

  // パスを描画
  ctx.beginPath();
  ctx.moveTo(first.x, first.y);
  paths.slice(1).forEach((path) => {
    ctx.lineTo(path.x, path.y);
  });
  ctx.stroke();

  // 数値を描画
  ctx.textAlign = "center";
  ctx.font = "24px sans-serif";
  paths.forEach((path) => {
    const { x, y, value } = path;

    ctx.beginPath();

    ctx.arc(x, y, 6, 0, 2 * Math.PI);
    ctx.fillText(value, x, y - 25);

    ctx.closePath();
    ctx.fill();
  });
}

const aboutModal = document.getElementById("about-modal");
const openModal = () => aboutModal.showModal();
const closeModal = (e) => {
  if (!e || !e.target.closest(".modal-container")) aboutModal.close();
};
