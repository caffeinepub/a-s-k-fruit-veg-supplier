# A.S.K Fresh Supply

## Current State
- AdminPanel.tsx has ADMINS array with `{name, password}`: Adnan A.S.K / ADNAN@786 and Shad A.S.K / SHAD@786. Login uses a "Select User" button grid + password field.
- MDDashboard.tsx has a single `MD_PASSWORD = "SUFIYAN@786"`. Login has only a password field. No "Remember Me" feature.
- Both panels already show the A.S.K eagle logo on their login screens.
- No localStorage is used for session persistence in either panel.
- No confirmation message on login success.

## Requested Changes (Diff)

### Add
- Username input field to AdminPanel login (replacing the grid of name buttons)
- Username input field to MDDashboard login
- "Remember Me" checkbox to MDDashboard login, persisting username+auth to localStorage so Chief stays logged in across page refreshes
- Toast / banner confirmation message "A.S.K System Secured & Live" displayed once on first successful login after credentials reset
- localStorage.clear() call on component mount to wipe all previous sessions

### Modify
- AdminPanel ADMINS array:
  - Adnan A.S.K → username: "Adnan", password: "BOSS123"
  - Shad A.S.K → username: "Shad", password: "CASH456"
- MDDashboard credentials → username: "Chief", password: "ASK786"
- AdminPanel handleLogin to validate both username AND password
- MDDashboard handleLogin to validate both username AND password
- AdminPanel handleLogout to clear localStorage
- MDDashboard handleLogout to clear localStorage
- Ensure eagle logo (`/assets/uploads/IMG_2664-1.jpeg`) remains visible on login screens of all panels (already present, keep as-is)

### Remove
- Old "Select User" button grid from AdminPanel login (replace with username text input)
- Old credential constants (ADNAN@786, SHAD@786, SUFIYAN@786)

## Implementation Plan
1. **MDDashboard.tsx**:
   - On mount: call `localStorage.removeItem('ask_md_session')` to wipe old sessions, then check for stored session if Remember Me was previously set
   - Change MD_PASSWORD to ASK786, add MD_USERNAME = "Chief"
   - Add `username` state and `rememberMe` boolean state
   - Update handleLogin: validate username === "Chief" AND password === "ASK786"
   - On successful login: if rememberMe, write `{loggedIn: true}` to localStorage under `ask_md_session`; show "A.S.K System Secured & Live" toast
   - On mount: if `ask_md_session` stored, auto-login
   - On logout: clear `ask_md_session` from localStorage
   - Add username input field and Remember Me checkbox to login UI

2. **AdminPanel.tsx**:
   - On mount: call localStorage.clear() to wipe all previous sessions
   - Change ADMINS to: `[{name:"Adnan A.S.K", username:"Adnan", password:"BOSS123"}, {name:"Shad A.S.K", username:"Shad", password:"CASH456"}]`
   - Add `username` state
   - Update handleLogin: find admin by matching username (case-sensitive), then check password
   - Show "A.S.K System Secured & Live" toast on successful login
   - Replace "Select User" button grid with a username text input field
   - Keep logo, password input, and all other UI unchanged
