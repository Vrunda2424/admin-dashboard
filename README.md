# React Admin Dashboard (Login, Dashboard, Logout)

## Run
```bash
npm install
npm run dev
```
Open the URL shown in the terminal (usually http://localhost:5173).

## Demo login
Username: `admin`  Password: `admin123`

## Structure
```
src/
  components/  Logo, FormField, Navbar, ProtectedRoute
  context/     AuthContext (login, logout, session)
  pages/       Login, Dashboard
  styles/      index.css
```

## Note
Credentials are hard-coded for this task only. A real app must verify them on a server
