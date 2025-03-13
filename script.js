window.onload = function () {
  // Carousel
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

  // Video Rendering (unchanged)
  const videodata = [
    { id: 1, url: "https://www.youtube.com/embed/tgbNymZ7vqY?controls=0&autoplay=1&mute=1", title: "Kofoworola & Olawale" },
    { id: 2, url: "https://www.youtube.com/embed/tgbNymZ7vqY?controls=0&autoplay=1&mute=1", title: "Kofoworola & Olawale" },
    { id: 3, url: "https://www.youtube.com/embed/tgbNymZ7vqY?controls=0&autoplay=1&mute=1", title: "Kofoworola & Olawale" },
    { id: 4, url: "https://www.youtube.com/embed/tgbNymZ7vqY?controls=0&autoplay=1&mute=1", title: "Kofoworola & Olawale" },
  ];

  let videosToShow = 4;
  const videoContainer = document.querySelector(".videos");
  const seeMoreButton = document.querySelector(".see-more");
  const popup = document.getElementById("popup");
  const overlay = document.getElementById("overlay");

  function renderVideos(limit) {
    try {
      videoContainer.innerHTML = videodata
        .slice(0, limit)
        .map(
          (video) => `
            <div class="video-container">
              <iframe
                src="${video.url}"
                frameborder="0"
                allowfullscreen
                class="video-iframe"
                data-title="${video.title}"
              ></iframe>
              <h3>${video.title}</h3>
            </div>
          `
        )
        .join("");

      const iframes = document.querySelectorAll(".video-iframe");
      iframes.forEach((iframe) => {
        setTimeout(() => {
          iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
        }, 10000);

        iframe.addEventListener("click", () => {
          popup.querySelector("p").textContent = `Learn more about "${iframe.dataset.title}"!`;
          popup.style.display = "block";
          overlay.style.display = "block";
        });
      });
    } catch (error) {
      console.error("Error rendering videos:", error);
    }
  }

  function showMoreVideos() {
    videosToShow = videodata.length;
    renderVideos(videosToShow);
    seeMoreButton.style.display = "none";
  }

  function closePopup() {
    popup.style.display = "none";
    overlay.style.display = "none";
  }

  overlay.addEventListener("click", closePopup);
  seeMoreButton.addEventListener("click", showMoreVideos);
  renderVideos(videosToShow);

  // Counter Logic with Intersection Observer
  const counters = document.querySelectorAll(".counter");
  const speed = 200;

  const updateCount = (counter) => {
    const target = +counter.getAttribute("data-target");
    let count = +counter.innerText.replace("+", ""); // Remove "+" for calculation
    const inc = Math.ceil(target / speed); // Whole number increment

    if (count < target) {
      count = Math.min(count + inc, target); // Cap at target
      counter.innerText = Math.floor(count) + "+"; // Always show whole numbers with "+"
      setTimeout(() => updateCount(counter), 20);
    } else {
      counter.innerText = target + "+"; // Final value with "+"
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