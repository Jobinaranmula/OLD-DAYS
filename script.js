document.addEventListener("DOMContentLoaded", () => {

  const mainAudio = document.getElementById("mainAudio");
  const mainPlay = document.getElementById("mainPlay");

  const natureAudio = document.getElementById("natureAudio");
  const rainAudio = document.getElementById("rainAudio");
  const cricketAudio = document.getElementById("cricketAudio");

  /* DEFAULT VOLUMES */

  natureAudio.volume = 0.50;
  rainAudio.volume = 0.35;
  cricketAudio.volume = 0.45;
  mainAudio.volume = 0.70;


  /* BACKGROUND SOUND STATE */

  natureAudio.dataset.enabled = "true";
  rainAudio.dataset.enabled = "true";
  cricketAudio.dataset.enabled = "true";


  /* MAIN MP3 PLAY */

  mainPlay.addEventListener("click", async () => {

    if (mainAudio.paused) {

      try {
        await mainAudio.play();
        mainPlay.textContent = "❚❚ PAUSE";
      } catch (error) {
        console.log("MP3 could not play yet.");
      }

      /*
       * Main MP3 play ചെയ്യുമ്പോൾ
       * ON ആയിട്ടുള്ള background sounds കൂടി play ചെയ്യും.
       */

      startBackgroundSound(natureAudio);
      startBackgroundSound(rainAudio);
      startBackgroundSound(cricketAudio);

    } else {

      mainAudio.pause();
      mainPlay.textContent = "▶ PLAY";

      /*
       * പ്രധാന MP3 മാത്രം pause ചെയ്യും.
       * Background sounds തുടരും.
       */

    }

  });


  /* START BACKGROUND SOUND */

  function startBackgroundSound(audio) {

    if (audio.dataset.enabled !== "false") {

      audio.play().catch(() => {
        console.log("Waiting for user interaction...");
      });

    }

  }


  /* ON / OFF BUTTONS */

  document.querySelectorAll(".toggle").forEach(button => {

    button.addEventListener("click", () => {

      const audioId = button.dataset.audio;
      const audio = document.getElementById(audioId);

      if (audio.paused) {

        audio.dataset.enabled = "true";

        audio.play().catch(() => {});

        button.textContent = "ON";
        button.classList.remove("off");

      } else {

        audio.dataset.enabled = "false";

        audio.pause();

        button.textContent = "OFF";
        button.classList.add("off");

      }

    });

  });


  /* VOLUME CONTROLS */

  document.querySelectorAll("[data-volume]").forEach(slider => {

    slider.addEventListener("input", () => {

      const audioId = slider.dataset.volume;
      const audio = document.getElementById(audioId);

      audio.volume = Number(slider.value) / 100;

    });

  });


  /* MAIN MP3 VOLUME */

  const mainVolume = document.getElementById("mainVolume");

  if (mainVolume) {

    mainVolume.addEventListener("input", () => {

      mainAudio.volume =
        Number(mainVolume.value) / 100;

    });

  }


  /* MP3 ENDED */

  mainAudio.addEventListener("ended", () => {

    mainPlay.textContent = "▶ PLAY";

  });


  /* IMPORTANT:
     Main MP3 pause ചെയ്താലും
     background sounds automatically pause ആകില്ല.
  */

});
