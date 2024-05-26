const fs = require("fs");

async function fetchData() {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzlDWlIUNmCgLMFxUGW7eE9WLZRVtYVZ5LfTRX1m8BhS313caAfshEeAtASiedG3QgkwQ/exec"
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
