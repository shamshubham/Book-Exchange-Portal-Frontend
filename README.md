# Book Exchange Portal - Frontend

Welcome to the **Book Exchange Portal - Frontend**! This Next-based application facilitates book exchanges within a community. Users can search for books, manage their own listings, and handle exchange requests with ease.

## 📚 Features

- **Book Discovery:** Effortlessly search for books by title, author, or genre.
- **Book Listing For Exchange:** Add, edit, and remove books from your collection.
- **Request Handling:** Manage book exchange requests efficiently.
- **Matchmaking:** Recommended books for user on basis of previous history of own books and requests.

## 🛠 Technologies Used

- **React:** For building a dynamic user interface.
- **Axios:** For making API requests.
- **Tailwind CSS:** For modern, responsive styling.
- **React Toastify:** For user-friendly notifications.

## 🚀 Getting Started

Follow these steps to set up and run the Book Exchange Portal frontend locally:

### Prerequisites

Ensure you have the following installed:
- [Next.js](https://nextjs.org/) (v14 or higher)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/shamshubham/Book-Exchange-Portal-Frontend.git
   cd book-exchange-portal-frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create an `.env` file in the root directory and add the following:

   ```env
   REACT_APP_API_URL=https://api.yourdomain.com
   ```

4. **Start the development server:**

   ```bash
   npm start
   ```

   The application will be running at [http://localhost:3000](http://localhost:3000).

## 🌐 Usage

- **Book Discovery:** Utilize the search bar to find books by title, author, or genre.
- **Matchmaking:** Utilize the page by using recommended books on basis of previous history.
- **Book Listing:** Access your profile to add, edit, or delete books from your collection.
- **Requests:** Navigate to the requests page to view and manage your requests sent for exchange.
- **Exchange Requests:** Navigate to the exchange requests page to view and manage book exchange requests.

## 📂 Folder Structure

- **`src/`** - Contains all source code for the frontend.
  - **`components/`** - Reusable React components.
  - **`book_discovery/`** - Book Discovery page of the application.
  - **`book_listing/`** - Book Listing page of the application.
  - **`exchange_request/`** - Exchange request page of the application.
  - **`login/`** - Login page of the application.
  - **`signup/`** - Signup page of the application.
  - **`request/`** - Request page of the application.
  - **`matchmaking/`** - Matchmaking page of the application.
  - **`page.js`** - Entry point of the React application.

## 🤝 Contributing

We welcome contributions to improve the project! Please fork the repository and submit a pull request. Ensure that your code adheres to our coding guidelines and includes tests for any new features.

## 📝 License

This project is licensed under the [MIT License](LICENSE). See the LICENSE file for more details.

## 📧 Contact

For any questions or feedback, please reach out to [shubham.sv1906@gmail.com](mailto:shubham.sv1906@gmail.com).
