<script>
  document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const form = new FormData(this);
    const data = Object.fromEntries(form.entries());

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await res.json();
      console.log("API Result:", result);

      if (res.status === 200) {
        window.location.href = "/index.html";
      } else {
        document.getElementById('response').textContent = result.message;
      }
    } catch (err) {
      document.getElementById('response').textContent = "Terjadi kesalahan koneksi.";
    }
  });
</script>
