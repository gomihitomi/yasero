const fs = require("fs");

async function fetchData() {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwaCv8lka1NlQzwG7sAAsOzhzZ2yRrFGuscJQdwGsYWHFSf0xlOqKMEmB1MPLtKdvemUw/exec"
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
