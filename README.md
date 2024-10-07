# Task ManagementSystem

**Technologies:**
Frontend -> NextJs
Backend  -> Nodejs, ExpressJs
Database -> MySQL in xampp server

**How to Run**
Install xampp server: import ManagementSystem folder and place it inside 'htdocs' folder.

FrontEnd:
step1: open folder taskApp UI->taskapp in terminal
step2: Run npm install. All modules will install
step3: Run npm run dev. The application will run at localhost:3000

BackEnd:
step1: open folder taskApp in terminal
step2: Run npm install. All modules will install
step3: Run npm run serve. The application will run at localhost:8080

DataBase:
step1: Run xampp Apache and MySql. Go to MySql admin page.
step2: Create database "task_management_db"
step2: Write sql query:

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL, 
    role ENUM('admin', 'manager', 'regular') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATETIME,
    status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

**After Successfull run**
Login Page Credentials for Admin:

Username: admin11@gmail.com
password: 12345678

At first there will only have admin. After login he will be able to create/manage users and managers.
