# Blood Bank Management System 🩸
A modern, robust system for managing all operations of a blood bank — donor records, blood inventory, request management, and more. Built with a clean, responsive UI for both admins and staff.

## 🚀 Features
- Donor Management: Register, update & track donor details
- Blood Inventory: Live tracking of units by blood group & expiry
- Requests: Process requests & donation matches automatically
- Search & Filter: Quickly find donors, requests, and blood units
- Authentication: Secure login for admins & staff
- Dashboard: Analytics for donations, requests, and inventory

## 🛠️ Tech Stack
- Frontend: React.js, Vite, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- API: RESTful endpoints
- Deployment: Render / Vercel

## ⚡ Getting Started
### Prerequisites
- Node.js (v14+)
- MongoDB URI
- Git

### Installation
```bash
git clone https://github.com/ayushrathore1/Blood-Bank-Management-System.git
cd Blood-Bank-Management-System
```
Install backend dependencies:
```bash
npm install
```
Go to the frontend directory & install dependencies:
```bash
cd frontend
npm install
```

### Environment Variables
Create a `.env` file in the backend root:
```text
PORT=6000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
For Vite frontend, use `.env` with your API endpoint if needed.

### Run Locally
**Backend**
```bash
npm start
```
**Frontend**
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173/) in your browser.

## 👨‍💻 Usage
- **Admin:** Manage users, donors & overall blood bank operations
- **Staff:** Add donations, manage requests, view inventory
- **Donor:** Register & track personal donations

## 🤝 Contributing
Pull requests are welcome! Please submit your suggestions or bug reports via Issues. For major updates, discuss first.

## 📄 License
Distributed under the MIT License.

## ✍️ Author
Ayush Rathore
[GitHub Profile](https://github.com/ayushrathore1)
