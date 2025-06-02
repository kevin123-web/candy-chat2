function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  addMessage("user", message);
  input.value = "";

  // Crear mensaje animado "IA escribiendo..."
  const loadingMsg = addMessage("bot", "IA escribiendo");
  let dots = 0;

  // Animación de puntos cada 500ms
  const interval = setInterval(() => {
    dots = (dots + 1) % 4; // 0,1,2,3
    loadingMsg.textContent = "IA escribiendo" + ".".repeat(dots);
  }, 500);

  fetch("/mensaje", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ mensaje: message })
  })
    .then(response => response.json())
    .then(data => {
      // Esperar 1.5s antes de mostrar respuesta y detener animación
      setTimeout(() => {
        clearInterval(interval);
        loadingMsg.textContent = data.respuesta;
      }, 5000);
    });
}

function addMessage(sender, text) {
  const chatbox = document.getElementById("chatbox");
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.textContent = text;
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;
  return msg;
}

window.onload = () => {
  addMessage("bot", "¡Hola! Somos DulceChat 🍭, tu asistente de dulces. Pregúntanos por gomitas, caramelos, chocolates y más.");
};
