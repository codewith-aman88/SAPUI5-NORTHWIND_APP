# SAPUI5 NORTHWIND App

A simple SAPUI5 application that connects to the **Northwind OData service** (a public demo dataset) and displays business data using UI5 controls and views. This app was generated using SAP Fiori tools and built with standard SAPUI5/OpenUI5 patterns. 

---

## 🚀 What This Is

This is a front-end UI5 project that:

* Uses SAPUI5 (UI Development Toolkit for HTML5) to build the UI. 
* Connects to the **Northwind OData V2 service** to fetch sample data (products, orders, customers).
* Demonstrates basic routing, models, views, and data binding with SAPUI5.

The UI follows a simple Fiori-style layout and is meant for learning or prototyping.

---

## 🛠️ Features

* SAPUI5 application scaffolded using SAP Fiori tools.
* OData model configured to consume Northwind service. 
* Navigation between views (products list, details, etc.). 
* Mock data support for offline testing.

---

## 📦 Prerequisites

Make sure you have these installed:

* **Node.js** (Long Term Support version)
* **npm** (comes with Node.js)

---

## 📥 How to Run It

Clone or download the repo, then from the project root:

```bash
npm install
npm start
```

After that, open the app in your browser. It will load data from the Northwind OData service.

If you want to try the app with offline mock data (handy if the OData service is down), use:

```bash
npm run start-mock
```

---

## 📁 What’s in the Repo

* **webapp/** – The core of the SAPUI5 app (views, controllers, models).
* **ui5.yaml**, **ui5-local.yaml**, **ui5-mock.yaml** – UI5 Tooling configurations.
* **package.json** – NPM dependencies and scripts.

---

## 📚 Learning SAPUI5

If you’re new to UI5 or want to understand how it works:

* UI5 uses an MVC pattern and data binding to build dynamic web apps.
* You can bind OData models to lists, tables, forms, and charts. 
* A common challenge is browser CORS — tools like local proxies help with that.

This project is a great starting point for real SAPUI5 projects.

---

## 📬 Feedback & Contributions

Feel free to share suggestions, open issues, or contribute improvements.

Happy coding!
