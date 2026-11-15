# Meditation User Stories

**Project:** Meditation App  
**Course:** Mobile App Development Capstone Project  
**Specialization:** IBM iOS and Android Mobile App Developer  
**Lab:** Option B — Develop User Stories for React Native

This document defines user stories, acceptance criteria, and estimated story points for a meditation mobile application. Story points are relative effort estimates.

## 1. Login and Registration

### US-01 — Register an Account
**Title:** Register an Account  
As a **new user**, I want to **register with a username, email, and password** so that **I can create my account**.

**Acceptance Criteria:**
1. The registration screen provides username, email, and password fields and a **Sign Up** button.
2. A valid submission creates a user account.
3. Missing or invalid fields display helpful error messages.

**Story Points:** 5

### US-02 — Log In
**Title:** Log In  
As a **registered user**, I want to **log in with my email and password** so that **I can access my account**.

**Acceptance Criteria:**
1. The login screen accepts an email and password.
2. Correct credentials log the user in and navigate to the homepage/dashboard.
3. Incorrect credentials display an error message.

**Story Points:** 3

### US-03 — Validate Empty Form Fields
**Title:** Validate Empty Form Fields  
As a **user**, I want to **receive feedback when required fields are blank** so that **I can correct my input**.

**Acceptance Criteria:**
1. Submitting a registration form with required fields missing displays relevant errors.
2. Submitting a login form with required fields missing displays relevant errors.
3. The user can correct the fields and resubmit.

**Story Points:** 2

### US-04 — Persist Account Details Locally
**Title:** Persist Account Details Locally  
As a **user**, I want to **have my account details saved locally** so that **my account is available between app sessions**.

**Acceptance Criteria:**
1. Registration saves the necessary user account details in local storage.
2. Saved details are available for subsequent authentication attempts.
3. Passwords are not stored in plaintext; an appropriate secure authentication/storage approach is used in the implementation.

**Story Points:** 5

## 2. Homepage

### US-05 — Personalized Greeting
**Title:** Personalized Greeting  
As a **user**, I want to **see a greeting with my username** so that **I feel welcomed**.

**Acceptance Criteria:**
1. The homepage displays **Hello, [username]** with the logged-in user's name.
2. The title **Find your perfect meditation.** appears below the greeting.
3. The greeting is visible when the homepage loads.

**Story Points:** 2

### US-06 — Browse Popular Meditations
**Title:** Browse Popular Meditations  
As a **user**, I want to **browse popular meditation cards** so that **I can discover exercises that match my interests**.

**Acceptance Criteria:**
1. Cards show images, titles, and brief descriptions.
2. Cards display categories such as Calmness and Relaxation.
3. Cards display durations such as 10 or 15 minutes.

**Story Points:** 3

### US-07 — View Daily Featured Meditation
**Title:** View Daily Featured Meditation  
As a **user**, I want to **see a featured meditation each day** so that **I can quickly choose a recommended session**.

**Acceptance Criteria:**
1. A dedicated homepage section highlights one featured meditation.
2. The featured item includes an image, title, category, and duration.
3. The featured item is visually distinct from the popular meditation cards.

**Story Points:** 3

### US-08 — Use Homepage Navigation
**Title:** Use Homepage Navigation  
As a **user**, I want to **use clear navigation icons** so that **I can move through the app easily**.

**Acceptance Criteria:**
1. A logo appears in the top-left corner of the homepage.
2. A settings icon appears in the top-right corner.
3. The settings icon provides access to the settings screen.

**Story Points:** 2

## 3. Exercise Detail Screen

### US-09 — View Exercise Information
**Title:** View Exercise Information  
As a **user**, I want to **view an exercise's description and benefits** so that **I understand its purpose**.

**Acceptance Criteria:**
1. The detail screen displays a large banner image.
2. The exercise title (for example, **Mindful Breathing**), category, and duration appear beneath the image.
3. An **About** section explains the exercise's focus and potential stress-reducing benefits.

**Story Points:** 3

### US-10 — Follow Exercise Instructions
**Title:** Follow Exercise Instructions  
As a **user**, I want to **read step-by-step meditation instructions** so that **I can perform an exercise correctly**.

**Acceptance Criteria:**
1. An **Instructions** section is available on the exercise detail screen.
2. Instructions explain posture and breathing steps in a clear sequence.
3. Instructions are readable without leaving the detail screen.

**Story Points:** 3

### US-11 — Access Exercise Actions
**Title:** Access Exercise Actions  
As a **user**, I want to **find favorite, share, and back controls** so that **I can manage the exercise page**.

**Acceptance Criteria:**
1. An **Add to Favorites** button appears prominently near the bottom of the screen.
2. A back icon appears at the top and returns to the previous screen.
3. A share icon appears at the top and initiates sharing.

**Story Points:** 3

## 4. Favorites

### US-12 — Add an Exercise to Favorites
**Title:** Add an Exercise to Favorites  
As a **user**, I want to **add an exercise to Favorites** so that **I can find it again quickly**.

**Acceptance Criteria:**
1. An outlined heart and **Add to Favorites** label indicate an unsaved exercise.
2. Tapping the control adds the exercise to the Favorites list.
3. The heart becomes filled and the label changes to **Remove from Favorites**.

**Story Points:** 3

### US-13 — Remove an Exercise from Favorites
**Title:** Remove an Exercise from Favorites  
As a **user**, I want to **remove an exercise from Favorites** so that **I can manage my saved items**.

**Acceptance Criteria:**
1. Saved exercises show a filled heart and **Remove from Favorites** label.
2. Tapping the control removes the exercise from the Favorites list.
3. The heart becomes outlined and the label changes to **Add to Favorites**.

**Story Points:** 2

### US-14 — Browse My Favorites
**Title:** Browse My Favorites  
As a **user**, I want to **see all my favorite exercises in one place** so that **I can access them quickly**.

**Acceptance Criteria:**
1. A **My Favorites** screen lists saved exercises.
2. Each saved item shows its title, category, and duration.
3. Tapping a saved item opens its details or allows the user to start the activity.

**Story Points:** 3

## 5. Daily Reminders

### US-15 — Navigate the Reminder Calendar
**Title:** Navigate the Reminder Calendar  
As a **user**, I want to **view the current month and move between months** so that **I can select a reminder date**.

**Acceptance Criteria:**
1. The calendar displays the current month and its days.
2. Previous and next arrows navigate between months.
3. The user can select a calendar date.

**Story Points:** 3

### US-16 — Select a Reminder Date and Time
**Title:** Select a Reminder Date and Time  
As a **user**, I want to **choose a date and time** so that **I can schedule a meditation reminder**.

**Acceptance Criteria:**
1. Before date selection, the interface shows **Selected Date: None**.
2. The lab example shows the default time as **Selected Time: 20:44**.
3. The user can choose a specific date and time, and the selected values are displayed.

**Story Points:** 3

### US-17 — Add and Manage Reminders
**Title:** Add and Manage Reminders  
As a **user**, I want to **add, view, and delete reminders** so that **I can manage my meditation schedule**.

**Acceptance Criteria:**
1. An **Add Reminder** button schedules a reminder using the selected date and time.
2. A list displays all reminders with their dates and times.
3. Each reminder has a red **Delete** button that removes it from the list.

**Story Points:** 5

## 6. Sharing

### US-18 — Share an Exercise
**Title:** Share an Exercise  
As a **user**, I want to **share a meditation exercise with friends or family** so that **they can discover helpful activities**.

**Acceptance Criteria:**
1. A visible share button/icon appears on the exercise detail screen.
2. Tapping the share button opens available sharing options.
3. Users can share through supported social media, email, or messaging apps.

**Story Points:** 3

## 7. Logout

### US-19 — Log Out Securely
**Title:** Log Out Securely  
As a **user**, I want to **log out of my account** so that **I can end my session securely**.

**Acceptance Criteria:**
1. A clearly visible **Logout** button is available in the app.
2. Tapping **Logout** clears the active session data.
3. The user is redirected to the login screen.

**Story Points:** 3

## 8. Appearance Settings

### US-20 — Switch Between Light and Dark Themes
**Title:** Switch Between Light and Dark Themes  
As a **user**, I want to **switch between light and dark modes** so that **I can customize the app and reduce eye strain**.

**Acceptance Criteria:**
1. Settings includes a **Theme** toggle or switch.
2. The user can select light or dark mode.
3. The theme updates immediately without refreshing or restarting the app.

**Story Points:** 3

---

## Summary

- **Total user stories:** 20
- **Total estimated story points:** 62
- **Coverage:** Registration, login, homepage, exercise details, Favorites, reminders, sharing, logout, and theme settings.


> **Note:** Story points are planning estimates supplied for this submission. The lab specifies the user-story format but does not prescribe particular point values. The password-storage safeguard in US-04 is an implementation security recommendation beyond the lab's basic local-storage requirement.
