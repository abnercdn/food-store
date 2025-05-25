// ============================
// Cadastro
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("register-name").value;
      const email = document.getElementById("register-email").value;
      const password = document.getElementById("register-password").value;

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const userExists = users.find((u) => u.email === email);
      if (userExists) {
        alert("Email já cadastrado!");
        return;
      }

      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify({ name, email }));

      alert("Cadastro realizado com sucesso!");
      window.location.href = "index.html";
    });
  }

  // ============================
  // Login
  // ============================
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        alert("Email ou senha incorretos!");
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(user));
      alert("Login realizado com sucesso!");
      window.location.href = "index.html";
    });
  }
});

// ============================
// Logout
// ============================
function logout() {
  localStorage.removeItem("currentUser");
  alert("Logout realizado!");
  window.location.href = "index.html";
}

// ============================
// Verificar Login
// ============================
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}
