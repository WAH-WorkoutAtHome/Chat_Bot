async function sendRequest() {
  const prompt = document.getElementById("prompt").value;

  if (!prompt.trim()) {
      document.getElementById("responseText").innerText = 'Silakan masukkan pesan!';
      return;
  }

  const chatBody = document.getElementById("chatBody");
  const userMessage = document.createElement("div");
  userMessage.innerHTML = `${prompt}`;
  userMessage.className = "chat-message user-message";
  chatBody.appendChild(userMessage);

  const loadingMessage = document.createElement("div");
  loadingMessage.innerHTML = "<em>Sedang mengetik...</em>";
  loadingMessage.className = "chat-message loading-message";
  chatBody.appendChild(loadingMessage);
  chatBody.scrollTop = chatBody.scrollHeight;

  try {
      const response = await fetch('http://localhost:3000/gemini?prompt=' + encodeURIComponent(prompt), {
          method: 'POST',
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      loadingMessage.remove();

      const botMessage = document.createElement("div");
      botMessage.innerHTML = `${data.text || 'Tidak ada respons dari server.'}`;
      botMessage.className = "chat-message bot-message";
      chatBody.appendChild(botMessage);

      chatBody.scrollTop = chatBody.scrollHeight;
  } catch (error) {
      loadingMessage.remove();
      const errorMessage = document.createElement("div");
      errorMessage.innerHTML = `<strong>Error:</strong> ${error.message}`;
      errorMessage.className = "chat-message error-message";
      chatBody.appendChild(errorMessage);
  }
}

function checkEnter(event) {
  if (event.key === "Enter") {
    sendRequest();
  }
}
