# E-Cell Website

This repository contains the complete source code for the **E-Cell Website**, built using **React (Vite)** and **Supabase**.
It includes both the public site and an **admin dashboard** for managing events, team members, and gallery images.

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Environment Variables](#environment-variables)
5. [Installation](#installation)
6. [Running the Development Server](#running-the-development-server)
7. [Building for Production](#building-for-production)
8. [Deployment](#deployment)
9. [Admin Dashboard](#admin-dashboard)
10. [Best Practices](#best-practices)
11. [License](#license)

---

## Overview

The E-Cell Website is a modern web application that serves as the official site for the Entrepreneurship Cell - AISSMS COE.
It provides an engaging front-end for visitors to explore events, team members, and gallery images, while also featuring an admin interface for content management.

---

## Tech Stack

* **Frontend Framework:** React (Vite)
* **Backend Service:** Supabase
* **Database:** PostgreSQL (via Supabase)
* **Storage:** Supabase Storage (for images and assets)
* **Styling:** Tailwind CSS
* **Hosting / Deployment:** Vercel
* **Version Control:** Git & GitHub

---

## Project Structure

```
E-Cell/
│
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/               # Page components (Events, Gallery, Team, etc.)
│   ├── context/             # Context providers (AdminDataProvider, etc.)
│   ├── utils/               # Helper utilities (Supabase client)
│   ├── App.jsx              # Root component
│   └── main.jsx             # Vite entry point
│
├── public/                  # Public assets
├── .env                     # Environment variables (not committed)
├── index.html               # HTML entry file
├── package.json             # Project metadata and dependencies
├── vite.config.js           # Vite configuration
└── README.md
```

---

## Environment Variables

Create a `.env` file in the root directory and define the following environment variables:

```
VITE_SUPABASE_URL=""
VITE_SUPABASE_ANON_KEY=""
```

You can find these values in your Supabase project under
**Settings → API → Project API Keys**.

> Do not commit your `.env` file.
> Ensure `.env` is listed in `.gitignore` to prevent exposing sensitive keys.

---

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/E-Cell.git
   cd E-Cell
   ```

2. Install project dependencies:

   ```bash
   npm install
   ```

---

## Running the Development Server

To start the local development server:

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

The development server automatically updates when files are saved.

---
