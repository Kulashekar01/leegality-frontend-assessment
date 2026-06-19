# Leegality Frontend Engineer Assessment

## Overview

This project is a React-based e-commerce application built using the DummyJSON Products API. The application provides a product listing page with filtering and pagination capabilities, along with a product detail page for viewing detailed product information.

---

## Setup Instructions

### Prerequisites

* Node.js (v18 or above)
* npm

### Installation

1. Clone the repository

```bash
git clone https://github.com/Kulashekar01/leegality-frontend-assessment.git
cd leegality-frontend-assessment
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open the application in your browser

```text
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

---

## Assumptions Made

* Product data is fetched from the DummyJSON API and filtered on the client side.
* Brand options are dynamically extracted from the fetched product data.
* Pagination is applied after filtering so that users navigate through filtered results only.
* A single brand selection is supported as the assignment did not explicitly require multi-select brand filtering.
* Product images use the thumbnail provided by the API.

---

## Architectural Decisions

### Component-Based Structure

The application is divided into reusable components to improve maintainability and readability:

* ProductCard
* FilterSidebar
* Loader
* ErrorMessage

### Service Layer

All API-related logic is centralized inside a dedicated service file (`productService.js`) to separate data fetching from UI components.

### State Management

React Hooks (`useState` and `useEffect`) are used for managing:

* Product data
* Filter state
* Pagination state
* Loading and error states

Given the scope of the assignment, external state management libraries such as Redux were intentionally avoided.

### Routing

React Router is used to implement navigation between:

* Product Listing Page
* Product Detail Page

### Filtering Strategy

Filtering is implemented using a combined client-side filtering approach that supports:

* Category filtering
* Brand filtering
* Price range filtering

Multiple filters can be applied simultaneously.

---

## Improvements If Given More Time

* URL-based filter persistence to preserve filters across page refreshes and navigation.
* Multi-select brand filtering.
* Product search functionality.
* Skeleton loaders for improved loading experience.
* Unit and integration tests using React Testing Library.
* Better accessibility support (ARIA labels and keyboard navigation).
* Enhanced mobile responsiveness and UI polish.
* Advanced pagination controls with page numbers.
* Performance optimizations using memoization where appropriate.

---

## Technologies Used

* React
* React Router DOM
* Axios
* Tailwind CSS
* Vite

---

## Features Implemented

* Product Listing Page
* Product Detail Page
* Dynamic Category Filter
* Dynamic Brand Filter
* Price Range Filter
* Combined Filtering Logic
* Pagination
* Loading State Handling
* Error State Handling
* Responsive Layout
* Search Filter

### Live Demo Link
```text
https://leegality-frontend-assessment-one.vercel.app/
```