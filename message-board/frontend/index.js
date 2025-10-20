async function addMessage() {
  try {
    const nameEl = document.getElementById("user_name");
    const textEl = document.getElementById("user_message");
    const name = nameEl.value.trim();
    const text = textEl.value.trim();
    if (!name || !text) {
      alert("Please enter both name and message!");
      return;
    }
    const dateTime = new Date().toLocaleString([], {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const url = "http://127.0.0.1:8080/api/add-message";
    post_data = { user: name, text: text, time: dateTime };
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post_data),
    });
    if (!res.ok) {
      alert("Failed to send message. Server responded with " + res.status);
      return;
    }
    window.location.href = "index.html";
  } catch (err) {
    alert("Something went wrong: " + err.message);
  }
}
// Only run when on index.html
document.addEventListener("DOMContentLoaded", () => {
  if (
    window.location.pathname.includes("index.html") ||
    window.location.pathname === "/"
  ) {
    fetchMessages();
  }
});

async function fetchMessages() {
  try {
    const res = await fetch("http://127.0.0.1:8080/api/messages");

    if (!res.ok) throw new Error("Failed to load messages");
    const messages = await res.json();

    const board = document.getElementById("message-board");
    board.innerHTML = ""; // clear old content
    console.log(messages);

    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];
      const card = document.createElement("div");
      card.className = "message-card";

      const header = document.createElement("div");
      header.className = "message-header";

      const author = document.createElement("div");
      author.className = "message-author";
      author.textContent = msg.user;

      const time = document.createElement("div");
      time.className = "message-time";
      time.textContent = msg.time;

      header.appendChild(author);
      header.appendChild(time);

      const text = document.createElement("div");
      text.className = "message-text";
      text.textContent = msg.text;

      card.appendChild(header);
      card.appendChild(text);
      board.appendChild(card);
    }
  } catch (err) {
    console.error(err);
    alert("Error loading messages: " + err.message);
  }
}
