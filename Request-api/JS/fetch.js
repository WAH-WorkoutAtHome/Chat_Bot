async function sendRequest() {
    const prompt = document.getElementById("prompt").value;

    try {
      const response = await fetch('http://localhost:3000/gemini?prompt=' + encodeURIComponent(prompt), {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      document.getElementById("responseText").innerHTML = data.text;
    } catch (error) {
      document.getElementById("responseText").innerText = 'Error: ' + error.message;
    }
  }