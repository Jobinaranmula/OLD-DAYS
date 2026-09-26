// OLD DAYS — Main Script

document.addEventListener("DOMContentLoaded", () => {

  const enterBtn = document.getElementById("enterBtn");

  // ENTER MEMORIES
  enterBtn.addEventListener("click", async () => {

    // Try to enter browser fullscreen
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
    } catch (error) {
      console.log("Fullscreen not available:", error);
    }

    // Hide the intro
    document.querySelector(".intro").style.opacity = "0";
    document.querySelector(".intro").style.transform = "scale(1.05)";

    setTimeout(() => {
      document.querySelector(".intro").style.display = "none";
    }, 700);

  });

  // Double tap / double click = fullscreen
  document.addEventListener("dblclick", async () => {

    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.log("Fullscreen error:", error);
    }

  });

  // ESC / fullscreen exit
  document.addEventListener("fullscreenchange", () => {

    if (!document.fullscreenElement) {
      console.log("Fullscreen exited");
    }

  });

});
