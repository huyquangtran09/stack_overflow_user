const usernameInput = document.getElementById("username-input");
const searchButton = document.getElementById("search-button");
const searchWords = document.getElementById("search-words");
const card = document.getElementById("card");
const emptyState = document.getElementById("empty-state");
// Add event listener "input" to usernameInput
usernameInput.addEventListener("input", () => {
  const username = usernameInput.value.trim();
  console.log(username);
});

card.style.display = "none";
searchWords.style.display = "block";

// Add event listener "onclick" to searchButton
searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  const username = usernameInput.value.trim();
  //Nếu input rỗng thì quay lại trang thái ban đầu
  if (username === "") {
    card.style.display = "none";
    searchWords.style.display = "block";
    return;
  }

  //viết hàm call API với link https://api.stackexchange.com/2.3/users?order=desc&sort=reputation&inname=${username}&site=stackoverflow
  const apiUrl = `https://api.stackexchange.com/2.3/users?order=desc&sort=reputation&inname=${username}&site=stackoverflow`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      renderUI(data, username);
      searchWords.style.display = "none";
      card.style.display = "grid";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

//viết hàm renderUI vào card
const renderUI = (data, username) => {
  const user = data.items;
  if (user.length === 0) {
    card.innerHTML = `
      <p>No found user "${username}"</p>
    `;
    return;
  }
  const userHTML = user
    .map(
      (user) => `
    <div class="card-content">
          <div class="card-user-info">
            <img
              alt="${user.display_name} ${user.user_id}"
              class="card-avatar"
              src="${user.profile_image}"
            />
            <div class="card-user-info-content">
              <h3 class="card-user-name">${user.display_name}</h3>
              <p class="card-user-location">${
                user.location ? `📍 ${user.location}` : ""
              }</p>
            </div>
          </div>
          <div class="card-user-stat">
            <p class="card-stat-title">Reputation</p>
            <p class="card-stat-value">${user.reputation}</p>
          </div>
          <div class="card-user-stat">
            <p class="card-stat-title">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-award w-3 h-3"
              >
                <path
                  d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"
                ></path>
                <circle cx="12" cy="8" r="6"></circle>
              </svg>
              Badges
            </p>
            <div class="card-badges">
              <div class="card-badge">
                <div class="card-badge-icon"></div>
                <span class="card-badge-value">${
                  user.badge_counts.gold
                }</span>  
              </div>
              <div class="card-badge">
                <div class="card-badge-icon"></div>
                <span class="card-badge-value">${
                  user.badge_counts.silver
                }</span>
              </div>
              <div class="card-badge">
                <div class="card-badge-icon"></div>
                <span class="card-badge-value">${
                  user.badge_counts.bronze
                }</span>   
              </div>
            </div>
          </div>
          <button data-slot="button" class="card-button">
            View Profile<svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="card-icon"
            >
              <path d="M15 3h6v6"></path>
              <path d="M10 14 21 3"></path>
              <path
                d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
              ></path>
            </svg>
          </button>
        </div>
    `
    )
    .join("");
  card.innerHTML = userHTML;
};
