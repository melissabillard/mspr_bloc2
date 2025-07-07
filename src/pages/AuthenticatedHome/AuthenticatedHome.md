# `AuthenticatedHome` Component

This component renders the **authenticated dashboard** of the **COFRAP** application.

It provides a personalized interface for logged-in users, including profile access, settings, and security information. It also includes logout functionality and quick activity stats.

---

## ✅ Features

- Displays a custom header with user identity and connection status
- Provides action cards for:
  - **Profile management**
  - **Settings configuration**
  - **Security overview**
- Includes a **logout** button to clear user session
- Renders **recent activity stats**
- Redirects to `/login` if the user is not authenticated

---

## 📦 Usage

```jsx
import AuthenticatedHome from "./AuthenticatedHome";

<AuthenticatedHome />
