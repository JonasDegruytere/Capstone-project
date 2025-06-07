# Meditation User Story


### Login/Registration User Stories
**Registration**
As a user, I want to register by entering my username, email, and password, so that I can create an account.
Acceptance Criteria:
Users can enter valid details and click “Sign Up” to create an account.
An error message is shown if any input is invalid or missing
Story Points: 3

**Login**
As a user, I want to log in using my email and password, so that I can access my account.
Acceptance Criteria:
Users can log in with correct credentials and are redirected to their dashboard.
An error message is displayed for incorrect credentials.
Story Points: 2

**Login QOL**
As a user, I want to receive feedback when I attempt to sign up or log in without entering details, so that I can fix the errors.
Acceptance Criteria:
Error messages are displayed for missing fields on sign-up or login attempts.
Story Points: 1

**Session Data**
As a user, I want my details to be stored in local storage, so that my data persists between sessions.
Acceptance Criteria:
User details are saved in local storage after registration and used for authentication during login.
Story Points: 3 


### Homepage User Stories
**Homepage**
As a user, I want a personalized greeting with my name and a title, so that I feel welcomed and encouraged to meditate.
Acceptance Criteria:
Display “Hello, [username]” followed by the title “Find your perfect meditation.”
Story Points: 1

**Explore Popular**
As a user, I want to see popular meditation cards, so that I can explore options based on my preferences.
Acceptance Criteria:
Display cards with images, titles, descriptions, categories such as calmness, relaxation, and durations such as 10 or 15 minutes.
Story Points: 5

**Daily featured items**
As a user, I want a daily featured meditation, so that I can quickly access a recommended session.
Acceptance Criteria:
Showcase one meditation with an image, title, category, and duration in a dedicated section.
Story Points: 3

**Intuitive UI**
As a user, I want intuitive navigation icons, so that I can easily move around the app.
Acceptance Criteria:
Display a logo in the top-left corner and a settings icon in the top-right corner for navigation.
Story Points: 1

**Analytics and Stats screen**
As a user, I want to view an overview of my data on the home screen so that I can monitor my progress at a glance.
Acceptance Criteria:
The page displays meditation time, favorites, meditations completed, etc intake on the analytics screen.
Story Points: 5


### Details screen User Stories
**About section**
As a user, I want an “About” section for each exercise, so that I can understand its benefits and purpose.
Acceptance Criteria:
Display a brief description of the exercise, explaining its focus and stress-reducing benefits.
Story Points: 1

**Instruction sections**
As a user, I want an “Instructions” section for each exercise, so that I can perform it correctly.
Acceptance Criteria:
Provide step-by-step guidance on posture and breathing techniques for the exercise.
Story Points: 1

**Favorites UI**
As a user, I want an “Add to Favorites” button, so that I can easily save an exercise for future practice.
Acceptance Criteria:
Include a prominent “Add to Favorites” button at the bottom of the page.
Story Points: 1


### Persistent User Stories
**Logout**
As a user, I want a clear and visible logout button, so that I can easily log out of my account when I’m done using the app.
Acceptance Criteria:
Display a clear and visible “Logout” button in the app.
Tapping the button logs the user out and redirects them to the login page.
User session data is cleared upon logout to ensure secure access.
Story Points: 1

**Preferences**
As a user, I want to save my preferences such as dark mode so that the app remembers my settings.
Acceptance Criteria:
The remembers the user's timezone, favorites, and other settings across sessions.

**Data Persistence**
As a user, I want my data like login state to persist across sessions so that I don't need to re-enter details every time.
Acceptance Criteria:
The app automatically logs in verified users unless they log out manually.
Story Points: 3


### External API User Stories
**Calender**
As a user, I want to synchronize the calendar with my calander on a different platform and view the current month and navigate between months, so that I can easily select dates for reminders.
Acceptance Criteria:
Import and synchronize a users calender from different platforms.
Display the current month with all the days visible.
Provide navigation arrows to move between months.
Story Points: 5

**Calender Scheduling**
As a user, I want to select a date and time for a reminder, so that I can schedule it properly.
Acceptance Criteria:
Display a default text “Selected Date: None” and “Selected Time: 20:44” to indicate no date has been selected but a time is chosen.
Allow users to select a specific time and date.
Updates calender to include this reminder on all synchronized calenders.
Story Points: 3

**Sharing**
As a user, I want to easily share recommended exercises with friends or family, so that I can help others discover helpful activities.
Acceptance Criteria:
Provide a clear share button/icon on the exercise detail page for easy sharing.
Allow users to share exercises via multiple platforms (e.g., social media, email, or messaging apps).
Story Points: 3


### Settings page User Stories
**Settings**
As a user, I want to access a settings menu from any screen so that I can adjust preferences at my convenience.
Acceptance Criteria:
A meditation app includes a settings icon in the top right corner of all screens, linking to the settings menu.
Story Points: 1

**Settings Categories**
As a user, I want to see categorized sections in the settings menu so that I can quickly find the options I need.
Acceptance Criteria:
The settings page has categorized sections for things such as timezones.
Story Points: 2


### Menu settings User Stories
**Light/Dark themes**
As a user, I want to switch between light and dark themes, so that I can reduce eye strain and customize the app’s visual experience.
Acceptance Criteria:
Provide a “Theme” toggle or switch in the settings section for light and dark mode options.
Allow the user to switch between light and dark mode seamlessly.
The theme should change immediately without needing to refresh or restart the app.
Story Points: 2

**Update Email**
As a user, I want to update my email on the settings screen so that I can keep my account secure.
Acceptance Criteria:
The settings page includes an Account Settings section for users to update credentials.
Story Points: 4


### Notifications User Stories
**Reminders**
As a user, I want to add a reminder after selecting a time, so that I can schedule it for a future date and time.
Acceptance Criteria:
After selecting a time, users can click the “Add Reminder” button to schedule the reminder.
Story Points: 3

**Reminders list**
As a user, I want to see a list of all my reminders, so that I can manage them easily.
Acceptance Criteria:
Display a list of all reminders with the selected date and time.
Provide an option to delete a reminder by clicking the red “Delete” button next to it.
Story Points: 3

**Favorites**
As a user, I want to add an item to my Favorites, so that I can save activities or articles I like for quick access later.
Acceptance Criteria:
A heart icon with the text “Add to Favorites” is displayed next to each item.
The outlined heart indicates the item is not in Favorites.
Tapping the button adds the item to the Favorites list, updates the button text to “Remove from Favorites,” and changes the heart icon to filled.
Story Points: 5

**Remove Favorites**
As a user, I want to remove an item from my Favorites, so that I can manage my saved content.
Acceptance Criteria:
The “Remove from Favorites” button with a filled heart is displayed for items already in Favorites.
Tapping the button removes the item from the Favorites list and reverts the heart icon to outlined.
Users can add or remove items anytime, and the button text updates accordingly.
Story Points: 2

**Favorites screen**
As a user, I want a “My Favorites” screen, so that I can view and manage all my saved items in one place.
Acceptance Criteria:
The “My Favorites” screen displays a list of saved items with their title, category, and duration.
Users can tap any item to view details or start the activity.
The Favorites list remains organized for easy browsing and quick access.
Story Points: 5


