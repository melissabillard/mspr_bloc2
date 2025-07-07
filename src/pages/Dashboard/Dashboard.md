# `Dashboard` Component

This component renders the **Dashboard** page of the **COFRAP** application.

It displays two QR codes:
- One for retrieving the user's **password**
- One for **2FA (two-factor authentication)**

It also adapts its content based on whether the user is recovering their password.

---

## ✅ Features

- Displays a personalized welcome message
- Shows the **password QR code** stored in `localStorage`
- Shows the **2FA QR code** if available
- Detects if the user is in **password recovery mode**
- Redirects to `/signin` if no username is stored
- Includes instructions and a login button

---

## 📦 Usage

```jsx
import Dashboard from "./Dashboard";

<Dashboard />
