window.onload = function () {
  var int;
  function setInt() {
    clearInterval(int);
    int = setInterval(function () {
      var btns = document.getElementsByName("carousel");
      for (var i = 0; i < btns.length; i++) {
        if (btns[i].checked) {
          btns[i].checked = false;
          if (i + 1 == btns.length) {
            btns[0].checked = true;
          } else {
            btns[i + 1].checked = true;
          }
          return;
        }
      }
    }, 5000);
  }
  setInt();

  const videodata = [
    { id: 1, url: "https://www.youtube.com/embed/tgbNymZ7vqY?controls=0", title: "Kofoworola & Olawale" },
    { id: 2, url: "https://www.youtube.com/embed/tgbNymZ7vqY?controls=0", title: "Kofoworola & Olawale" },
    { id: 3, url: "https://www.youtube.com/embed/tgbNymZ7vqY?controls=0", title: "Kofoworola & Olawale" },
    { id: 4, url: "https://www.youtube.com/embed/tgbNymZ7vqY?controls=0", title: "Kofoworola & Olawale" },
    { id: 5, url: "https://www.youtube.com/embed/tgbNymZ7vqY?controls=0", title: "Kofoworola & Olawale" },
    { id: 6, url: "https://www.youtube.com/embed/tgbNymZ7vqY?controls=0", title: "Kofoworola & Olawale" },
    { id: 7, url: "https://www.youtube.com/embed/tgbNymZ7vqY?controls=0", title: "Kofoworola & Olawale" },
  ];

  let videosToShow = 4;
  const videoContainer = document.querySelector(".videos");
  const seeMoreButton = document.querySelector(".see-more");

  function renderVideos(limit) {
    videoContainer.innerHTML = videodata
      .slice(0, limit)
      .map(
        (video) => `
          <div class="video-container">
            <iframe
              width="520"
              height="345"
              src="${video.url}"
              frameborder="0"
              allowfullscreen
            ></iframe>
            <h3>${video.title}</h3>
          </div>
        `
      )
      .join("");
  }

  function showMoreVideos() {
    videosToShow = videodata.length;
    renderVideos(videosToShow);
    seeMoreButton.style.display = "none";
  }

  seeMoreButton.addEventListener("click", showMoreVideos);
  renderVideos(videosToShow);
};


function scrollToSection(sectionId) {
  event.preventDefault();
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
    const navLinks = document.getElementById("nav-links");
    if (navLinks.classList.contains("active")) {
      toggleMenu();
    }
  }
}