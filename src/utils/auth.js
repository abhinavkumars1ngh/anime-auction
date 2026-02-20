const HOST = {
  username: "admin",
  password: "admin123",
  role: "host"
};

export function loginUser(username, password) {
  if (username === HOST.username && password === HOST.password) {
    localStorage.setItem("role", "host");
    localStorage.setItem("currentUser", "admin");
    return { success: true, role: "host" };
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    localStorage.setItem("role", "guest");
    localStorage.setItem("currentUser", username);
    return { success: true, role: "guest" };
  }

  return { success: false };
}

export function registerUser(username, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find(u => u.username === username)) {
    return { success: false, message: "User already exists" };
  }

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));

  return { success: true };
}