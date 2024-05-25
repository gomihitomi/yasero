const fs = require("fs");

async function fetchData() {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzx_ZCTovQ-louaAP_pnViGWvYi-FearuvILMR3sPT8lNY3C2C85BqB_YyP_n1LyQikEQ/exec"
    );
    const data = await response.json();

    fs.writeFileSync("public/data.json", JSON.stringify(data, null, 2));
    console.log("Data fetched and saved successfully.");
  } catch (error) {
    console.error("Error fetching data:", error);
    process.exit(1);
  }
}

fetchData();
