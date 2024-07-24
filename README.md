# CodeUp

## Overview

CodeUp is a full-stack application built with MongoDB, Express.js, React.js, and Tailwind CSS. It features user authentication, post management, and an admin interface for managing users and posts.

## Features

- User and Admin Authentication
- Post Creation, Deletion, and Viewing
- Admin Dashboard for Managing Users and Posts
- Responsive Design with Tailwind CSS

## Project Structure

```plaintext
CodeUp/
├── config/
│   ├── database.js
├── controllers/
│   ├── adminController.js
│   ├── poserController.js
│   ├── postController.js
│   ├── userController.js
├── middleware/
│   ├── authMiddleware.js
│   ├── uploadMiddleware.js
├── models/
│   ├── poserSchema.js
│   ├── postSchema.js
│   ├── userSchema.js
├── node_modules/
├── routes/
│   ├── adminRouter.js
│   ├── poserRouter.js
│   ├── userRouter.js
├── uploads/
│   ├── posts/
├── views/
│   ├── node_modules/
│   ├── public/
│   │   ├── index.html
│   │   ├── logo.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   │   ├── AdminHomepage.jsx
│   │   │   │   ├── AllPoser.jsx
│   │   │   │   ├── AllPost.jsx
│   │   │   │   ├── AllUser.jsx
│   │   │   ├── auth/
│   │   │   │   ├── LoginPoser.jsx
│   │   │   │   ├── LoginUser.jsx
│   │   │   │   ├── SignupPoser.jsx
│   │   │   │   ├── SignupUser.jsx
│   │   │   ├── poser/
│   │   │   │   ├── PoserHomepage.jsx
│   │   │   ├── user/
│   │   │   │   ├── UserHomepage.jsx
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── tailwind.css
│   ├── package-lock.json
│   ├── package.json
│   ├── tailwind.config.js
├── .env
├── .gitignore
├── app.js
├── package-lock.json
├── package.json
├── README.md
```
