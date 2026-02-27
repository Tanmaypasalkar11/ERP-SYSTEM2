# Streleam ERP API

Base URL: `http://localhost:4000/api`

Authentication: `Authorization: Bearer <token>`

## Auth

`POST /auth/register`
```json
{ "name": "Admin", "email": "admin@streleam.com", "password": "Admin@123" }
```

`POST /auth/login`
```json
{ "email": "admin@streleam.com", "password": "Admin@123" }
```

## Customers

`POST /customers`
```json
{ "name": "Nexa Builders", "phone": "+91-90000-00001", "email": "ops@nexa.com", "address": "Mumbai" }
```

`GET /customers`

## Vendors

`POST /vendors`
```json
{ "name": "Nova Metals", "phone": "+91-90000-10001", "email": "sales@novametals.com", "address": "Pune" }
```

`GET /vendors`

## Products

`POST /products`
```json
{
  "name": "Streamline Panel",
  "type": "FINISHED_GOOD",
  "unit": "pcs",
  "bom": [
    { "rawMaterialId": "<raw-id>", "quantityRequired": 1.2 }
  ]
}
```

`GET /products`

## Inventory

`GET /inventory`

## Purchase Orders

`POST /purchase-orders`
```json
{
  "vendorId": "<vendor-id>",
  "items": [
    { "productId": "<raw-id>", "quantity": 500 }
  ]
}
```

`POST /purchase-orders/:id/inward`

## Production

`POST /production`
```json
{ "finishedProductId": "<finished-id>", "quantityProduced": 100 }
```

## Customer Orders

`POST /customer-orders`
```json
{
  "customerId": "<customer-id>",
  "items": [
    { "productId": "<finished-id>", "quantity": 50 }
  ]
}
```

`POST /customer-orders/:id/complete`

## Reports

`GET /reports/orders`

`GET /reports/inventory`

`GET /reports/production`
