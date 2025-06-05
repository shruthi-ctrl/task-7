const userList = document.getElementById("userList");
const errorDiv = document.getElementById("error");
const reloadBtn = document.getElementById("reloadBtn");

function fetchUsers() {
  userList.innerHTML = ""; // Clear previous users
  errorDiv.textContent = ""; // Clear previous errors

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((users) => {
      users.forEach((user) => {
        const userCard = document.createElement("div");
        userCard.className = "user-card";
        userCard.innerHTML = `
          <h3>${user.name}</h3>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
        `;
        userList.appendChild(userCard);
      });
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      errorDiv.textContent = "Failed to load users. Please check your connection.";
    });
}

// Initial fetch
fetchUsers();

// Reload button
reloadBtn.addEventListener("click", fetchUsers);