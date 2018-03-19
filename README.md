# About
This project made by React on top of Node.
Apllication can make new invoices, customers, products. Automatically saves changes on the server via API.

# Dependencies

* sqlite3
* node
* npm

# Getting Started

###### Install server npm dependencies

* `npm install`

###### Install frontend npm dependencies
* `cd frontend`
* `npm install`

###### Run the build
Since Unix systems and Windows don't have shared API, I've made the default start for Unix
##### For Unix
Run `npm start`
It should run the frontend build command then copy bungle to the public directory and start server.
If not, read error message from the console

##### For Widnows
To run the project on Winndows you need to make some tedius steps. Making more friendly build script in the nearest future :)
* `cd ./frontend`
* `npm run build`
* go to project root directory
* `npm run copy-ui-windows`
* `node ./app.js`

`node app.js`

###### Viewing the application in your browser

`http://localhost:8000`

# Schema

## Customers

* id (integer)
* name (string)
* address (string)
* phone (string)

## Products

* id (integer)
* name (string)
* price (decimal)

## Invoices

* id (integer)
* customer_id (integer)
* discount (decimal)
* total (decimal)

## InvoiceItems

* id (integer)
* invoice_id (integer)
* product_id (integer)
* quantity (decimal)

# Resources

## Customers

```
GET|POST          /api/customers
GET|PUT|DELETE    /api/customers/{id}
```

## Products

```
GET|POST          /api/products
GET|PUT|DELETE    /api/products/{id}
```

## Invoices

```
GET|POST          /api/invoices
GET|PUT|DELETE    /api/invoices/{id}
```

## InvoiceItems

```
GET|POST          /api/invoices/{id}/items
GET|PUT|DELETE    /api/invoices/{invoice_id}/items/{id}
```
