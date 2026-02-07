# 🔗 URLTrimrr – URL Shortener Web Application

URLTrimrr is a full-stack URL shortener web application that allows users to shorten long URLs, generate QR codes, and track click analytics in real time. The application is built with a modern tech stack and focuses on usability, performance, and clean design.

---

## 🚀 Features

* ✂️ Shorten long URLs into clean, shareable links
* 📊 Track click counts for each shortened URL
* 📱 Generate QR codes for easy sharing
* 👤 User authentication and personalized dashboard
* 🗂️ View and manage all created URLs in one place
* ⚡ Fast and scalable backend powered by Supabase

---

## 🛠️ Tech Stack

**Frontend**

* React.js
* HTML5
* CSS3
* JavaScript (ES6+)

**Backend / Services**

* Supabase (Database + Authentication)

**Database**

* PostgreSQL (via Supabase)

---

## 📂 Database Schema Overview

* **Users** – Stores authenticated user details
* **URLs** – Stores original URL, shortened URL, and metadata
* **Clicks** – Tracks number of visits per shortened URL
* **QR Codes** – Generated and associated with shortened URLs

---

## 🔐 Authentication

* Secure user authentication using Supabase Auth
* Each user can create, view, and manage their own shortened URLs

---

## ⚙️ Installation & Setup

1. Clone the repository

   ```bash
   git clone https://github.com/ani29dy/URLTrimrr.git
   ```

2. Navigate to the project directory

   ```bash
   cd URLTrimrr
   ```

3. Install dependencies

   ```bash
   npm install
   ```

4. Create a `.env` file and add your Supabase credentials

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. Start the development server

   ```bash
   npm run dev
   ```

---

## 📈 Future Enhancements

* Custom URL aliases
* Link expiration feature
* Advanced analytics dashboard
* Rate limiting and abuse prevention
* Admin panel for monitoring

---

## 🤝 Contribution

Contributions are welcome! Feel free to fork this repository and submit a pull request.

---

## 👨‍💻 Author

**Aniket Yalamalli**
Aspiring Full Stack Developer
GitHub: [https://github.com/ani29dy](https://github.com/ani29dy)

---

⭐ If you like this project, don’t forget to star the repository!
