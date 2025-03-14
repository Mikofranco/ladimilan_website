window.onload = function () {
  let int;
  function setInt() {
    clearInterval(int);
    int = setInterval(() => {
      const btns = document.getElementsByName("carousel");
      for (let i = 0; i < btns.length; i++) {
        if (btns[i].checked) {
          btns[i].checked = false;
          btns[(i + 1) % btns.length].checked = true;
          break;
        }
      }
    }, 5000);
  }
  setInt();

  const navLinks = document.getElementById("nav-links");
  const hamburger = document.querySelector(".hamburger");
  const overlay = document.getElementById("overlay");
  const popup = document.getElementById("popup");

  // function toggleMenu() {
  //   console.log("Toggling menu:", navLinks.classList.contains("active"));
  //   navLinks.classList.toggle("active");
  // }

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    const isClickInsideNav = navLinks.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    if (
      !isClickInsideNav &&
      !isClickOnHamburger &&
      navLinks.classList.contains("active")
    ) {
      toggleMenu();
    }
  });

  // Scroll to section and close menu (unchanged)
  function scrollToSection(sectionId) {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      if (navLinks.classList.contains("active")) {
        toggleMenu();
      }
    }
  }

  const videodata = [
    { id: 1, url: "https://www.youtube.com/embed/tgbNymZ7vqY?controls=0&autoplay=1&mute=1", title: "Kofoworola & Olawale", thumbnail: "https://img.youtube.com/vi/tgbNymZ7vqY/hqdefault.jpg" },
    { id: 2, url: "https://www.youtube.com/embed/tgbNymZ7vqY?controls=0&autoplay=1&mute=1", title: "Kofoworola & Olawale", thumbnail: "https://img.youtube.com/vi/tgbNymZ7vqY/hqdefault.jpg" },
    { id: 3, url: "https://www.youtube.com/embed/tgbNymZ7vqY?controls=0&autoplay=1&mute=1", title: "Kofoworola & Olawale", thumbnail: "https://img.youtube.com/vi/tgbNymZ7vqY/hqdefault.jpg" },
    { id: 4, url: "https://www.youtube.com/embed/tgbNymZ7vqY?controls=0&autoplay=1&mute=1", title: "Kofoworola & Olawale", thumbnail: "https://img.youtube.com/vi/tgbNymZ7vqY/hqdefault.jpg" },
  ];

  let videosToShow = 4;
  const videoContainer = document.querySelector(".videos");
  const seeMoreButton = document.querySelector(".see-more");
  const popupTitle = document.getElementById("popup-title");
  const popupVideoContainer = document.getElementById("popup-video-container");

  function renderVideos(limit) {
    try {
      videoContainer.innerHTML = videodata
        .slice(0, limit)
        .map(
          (video) => `
            <div class="video-container">
              <img src="${video.thumbnail}" alt="${video.title}" class="video-thumbnail" data-url="${video.url}" data-title="${video.title}" />
              <h3 class="video-title">${video.title}</h3>
              <img src="assets/svg/playicon.svg" alt="video play icon" class="play-icon"/>
            </div>
          `
        )
        .join("");
      attachVideoListeners();
    } catch (error) {
      console.error("Error rendering videos:", error);
    }
  }

  function attachVideoListeners() {
    const videoContainers = document.querySelectorAll(".video-container");

    videoContainers.forEach((container) => {
      const thumbnail = container.querySelector(".video-thumbnail");
      const playIcon = container.querySelector(".play-icon");

      // Function to open popup
      const openVideoPopup = () => {
        const videoUrl = thumbnail.dataset.url.replace("mute=1", "mute=0&autoplay=1");
        popupTitle.textContent = thumbnail.dataset.title;
        popupVideoContainer.innerHTML = `
          <iframe src="${videoUrl}" frameborder="0" allowfullscreen class="popup-video-iframe"></iframe>
        `;
        popup.style.display = "block";
        overlay.style.display = "block";
      };

      thumbnail.addEventListener("click", openVideoPopup);
      if (playIcon) {
        playIcon.addEventListener("click", openVideoPopup);
      }
    });
  }

  function showMoreVideos() {
    videosToShow = videodata.length;
    renderVideos(videosToShow);
    seeMoreButton.style.display = "none";
  }

  function closePopup() {
    popup.style.display = "none";
    overlay.style.display = "none";
    popupVideoContainer.innerHTML = "";
  }

  overlay.addEventListener("click", closePopup);
  seeMoreButton.addEventListener("click", showMoreVideos);
  renderVideos(videosToShow);

  const counters = document.querySelectorAll(".counter");
  const speed = 200;

  const updateCount = (counter) => {
    const target = +counter.getAttribute("data-target");
    let count = +counter.innerText.replace("+", "");
    const inc = Math.ceil(target / speed);
    if (count < target) {
      count = Math.min(count + inc, target);
      counter.innerText = Math.floor(count) + "+";
      setTimeout(() => updateCount(counter), 20);
    } else {
      counter.innerText = target + "+";
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          if (!counter.classList.contains("counted")) {
            counter.classList.add("counted");
            updateCount(counter);
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
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

function toggleMenu() {
  const navLinks = document.getElementById("nav-links");
  navLinks.classList.toggle("active");
}

function closePopup() {
  const popup = document.getElementById("popup");
  const overlay = document.getElementById("overlay");
  popup.style.display = "none";
  overlay.style.display = "none";
  document.getElementById("popup-video-container").innerHTML = "";
}
hamburger.addEventListener("click", toggleMenu);

