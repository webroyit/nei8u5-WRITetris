const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

// styles the context
context.fillStyle = "#e6f2ff";   // add color
context.fillRect(0, 0, canvas.width, canvas.height);    // add sizes to make a rectangle shape