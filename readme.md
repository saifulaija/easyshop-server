
# Live Link
You can access the server side GitHub Link at [Easy Shop Server](https://github.com/saifulaija/easyshop-server).


# RQ_Analytics Backend

This repository contains the backend code for the RQ_Analytics project. It provides various API endpoints to prepare and visualize data from the `RQ_Analytics` MongoDB database, enabling business insights through analytical charts.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
  - [1. Total Sales Over Time](#1-total-sales-over-time)
  - [2. Sales Growth Rate Over Time](#2-sales-growth-rate-over-time)
  - [3. New Customers Added Over Time](#3-new-customers-added-over-time)
  - [4. Number of Repeat Customers](#4-number-of-repeat-customers)
  - [5. Geographical Distribution of Customers](#5-geographical-distribution-of-customers)
  - [6. Customer Lifetime Value by Cohorts](#6-customer-lifetime-value-by-cohorts)
- [Setup Instructions](#setup-instructions)
- [Contact](#contact)
- [License](#license)

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building API services.
- **MongoDB**: NoSQL database for storing and retrieving data.
- **Mongoose**: ODM library for MongoDB and Node.js.
- **TypeScript**: Superset of JavaScript for type safety and better developer experience.
- **Chart.js**: (Frontend) Libraries for data visualization.

## Database Schema

The `RQ_Analytics` database consists of the following collections:

1. **Customer**
2. **Product**
3. **Order**

## API Endpoints

### 1. Total Sales Over Time

**Endpoint**: `GET /api/order/sales-measurement`

**Description**: Retrieves total sales aggregated over specified time intervals (daily, monthly, quarterly, yearly).

**Sample Response**:
```json
[
  { "date": "2023-08-01", "totalSales": 15000 },
  { "date": "2023-09-01", "totalSales": 17500 }
]
