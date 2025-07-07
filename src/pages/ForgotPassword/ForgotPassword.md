# `ForgotPassword` Component

This component renders the **"Forgot Password"** page of the **COFRAP** application.

It allows a user who has forgotten their password to enter their **username**. Upon submission:
- A new password is generated via the `generate-password` API.
- A new **QR code** is received and stored in `localStorage`.
- A second call to `generate-2fa` is made to retrieve the **2FA QR code**, also stored.
- The user is redirected to the `/dashboard`.

---

## ✅ Features

- Username input and validation
- Fetches a new password from the backend
- Retrieves and stores both password and 2FA QR codes
- Redirects to the dashboard upon success
- Displays helpful instructions and links to other auth pages

---

## 📦 Usage

```jsx
import ForgotPassword from "./ForgotPassword";

<ForgotPassword />
