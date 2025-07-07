Registration page of the COFRAP application.

Allows a new user to create an account by entering their email and a password.
The information is sent to the registration API.
If successful:

- the JWT token is stored in `localStorage`

- the user is redirected to the home page

## Example of use

```jsx
<Signin />
