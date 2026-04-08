# Members Only

A private clubhouse application where users can write messages, but only members can see the authors and dates. Non-members only see the content of the messages, while admins have the power to delete any post.

## Features

* **Four-Tier Access System**:
    * **Guest**: Can browse messages but cannot see authors, timestamps, or post new content.
    * **User**: Can post new messages but remains "outside the club", unable to see metadata.
    * **Member**: Gains full access to view message authors and timestamps.
    * **Admin**: Holds all member privileges plus the ability to delete any message.
* **Authentication**: Secure registration and login using Passport.js.
* **Membership Logic**: A dedicated "Join the Club" feature requiring a secret passcode to upgrade status.
* **Validation**: Robust server-side form validation and sanitization.

## Technologies Used

* **Backend**: Node.js, Express
* **Database**: PostgreSQL (via pg)
* **Authentication**: Passport.js, express-session
* **View Engine**: EJS
* **Validation**: express-validator
* **Styling**: Custom CSS

## Getting Started

### Prerequisites

* Node.js installed
* PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:
   `npm install`
3. Create a .env file in the root directory and add your credentials:
   ```
   DATABASE_URL=your_postgres_connection_string
   SESSION_SECRET=your_secret_key
   MEMBER_PASSCODE=your_membership_passcode
   ADMIN_PASSCODE=your_admin_passcode
   ```
4. Start the server:
   `npm run dev`

## Author

* Created as part of The Odin Project curriculum.