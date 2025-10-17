# 💼 HireHub Job Posting Application - Backend

This repository contains the **backend service** for the Job Posting Application.  
It provides a RESTful API for managing job listings using **Node.js**, **Express.js**, and **MongoDB (Mongoose)**.

---

## 🧩 Tech Stack

- **Node.js** – JavaScript runtime environment  
- **Express.js** – Web framework for Node.js  
- **MongoDB** – NoSQL database  
- **Mongoose** – Object Data Modeling (ODM) library for MongoDB  
- **dotenv** – For managing environment variables  
- **CORS** – Enables cross-origin requests  

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/job-posting-backend.git
cd job-posting-backend
```
### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory and add:

```env
MONGODB=<your_mongodb_connection_uri>
PORT=5000
```

### 4️⃣ Start the Server
```bash
npm start
```

---

## 📡 API Endpoints
<img width="1182" height="367" alt="image" src="https://github.com/user-attachments/assets/a1c7ac57-d91c-41a6-b328-6b2155dd3113" />
| Method     | Endpoint           | Description                            |
| ----------- | ------------------ | -------------------------------------- |
| **GET**    | `/`                | Root route – returns a welcome message |
| **GET**    | `/jobPostings`     | Fetch all job postings                 |
| **POST**   | `/jobPostings`     | Create a new job posting               |
| **GET**    | `/jobPostings/:id` | Fetch a single job posting by ID       |
| **DELETE** | `/jobPostings/:id` | Delete a job posting by ID             |


---

## 📁 Project Structure
<img width="483" height="339" alt="image" src="https://github.com/user-attachments/assets/446734bd-eb15-4229-9edf-f97a6e1aa520" />


