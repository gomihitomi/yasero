const isDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
const loading = document.getElementById("loading");

draw();
async function draw() {
  const res = await fetch(
    "https://script.google.com/macros/s/AKfycbzx_ZCTovQ-louaAP_pnViGWvYi-FearuvILMR3sPT8lNY3C2C85BqB_YyP_n1LyQikEQ/exec"
  );
  const json = await res.json();

  const url = `https://x.com/share?url=https://gomihitomi.github.io/yasero/&text=${
    "現在の吾味人美ダイエット成果は…「" + json.total + "」"
  }&hashtags=痩せろ吾味人美`;
  post.setAttribute("href", url);

  loading.classList.add("fedeout");
  setTimeout(() => loading.remove(), 500);
  ["date", "prev", "total", "comment"].forEach((key) => {
    document.getElementById(key).innerText = json[key];
  });

  const canvas = document.getElementById("canvas");
  if (!canvas.getContext) return;
  const ctx = canvas.getContext("2d");

  const datas = json.week.split(",").map((v) => Number(v));
  const diffs = datas.reduce((p, n, i) => [...p, p[i] + n], [10]);

  const paths = datas.map((v, i) => {
    const x = i * 60 + 20;
    const y = 400 - diffs[i + 1] * 30;
    const value = (v > 0 && "+") + v;
    return { x, y, value };
  });

  const first = paths.at(0);
  ctx.lineWidth = 1;

  ctx.fillStyle = isDark ? "#fff" : "#000";
  ctx.strokeStyle = isDark ? "#fff" : "#000";

  ctx.beginPath();
  ctx.moveTo(first.x, first.y);
  paths.slice(1).forEach((path) => {
    ctx.lineTo(path.x, path.y);
  });
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.font = "12px sans-serif";
  paths.forEach((path) => {
    const { x, y, value } = path;

    ctx.beginPath();

    ctx.arc(x, y, 3, 0, 2 * Math.PI);
    ctx.fillText(value, x, y - 10);

    ctx.closePath();
    ctx.fill();
  });
}
