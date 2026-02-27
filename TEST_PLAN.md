# Streleam ERP Manual Test Plan

## 0) Start Everything

Backend:
```
cd /Users/tanmay/Desktop/streleam/server
npm run dev
```

Frontend:
```
cd /Users/tanmay/Desktop/streleam/client
npm run dev
```

## 1) Logins (Role Coverage)

Use demo accounts from Login page:
- Admin: `admin@erp.com / admin123`
- Purchase: `purchase@erp.com / purchase123`
- Production: `production@erp.com / production123`
- Sales: `sales@erp.com / sales123`

Expected: Sidebar only shows pages allowed for the role.

## 2) Role-Based Page Access

### Admin
Should see all pages:
- Customers, Vendors, Products, Inventory, Purchase Orders, Production, Customer Orders, Reports

### Purchase Manager
Should see:
- Vendors, Products, Inventory, Purchase Orders, Reports
Should NOT see:
- Customers, Production, Customer Orders

### Production Manager
Should see:
- Products, Inventory, Production, Reports
Should NOT see:
- Vendors, Purchase Orders, Customers, Customer Orders

### Sales Manager
Should see:
- Customers, Products (view), Inventory, Customer Orders, Reports
Should NOT see:
- Vendors, Purchase Orders, Production

Attempting direct URL access to forbidden pages should return 403 from API.

## 3) Core Workflow Test (Recommended Order)

### A) Admin: Create Raw Materials + Finished Goods (with BOM)
Go to Products:
1. Create RAW materials:
   - Steel Sheet (RAW_MATERIAL, unit kg)
   - Rubber Gasket (RAW_MATERIAL, unit pcs)
   - Bolt Set (RAW_MATERIAL, unit pcs)
2. Create FINISHED goods:
   - Engine Block (FINISHED_GOOD, unit pcs)
   - Add BOM lines:
     - Steel Sheet: 50
     - Rubber Gasket: 10
     - Bolt Set: 20

Expected: Product list shows these products.

### B) Purchase Manager: Create Purchase Order
Go to Purchase Orders:
1. Select vendor (create on Vendors page if needed)
2. Select RAW material
3. Quantity
4. Submit PO

Expected: PO listed as PENDING.

### C) Purchase Manager: Inward PO
Click Inward on a PENDING PO.

Expected:
- PO status becomes RECEIVED
- Inventory for raw materials increases

### D) Production Manager: Run Production
Go to Production:
1. Select finished product
2. Enter quantity produced

Expected:
- Raw inventory decreases based on BOM
- Finished inventory increases
- Production record appears in Reports → Production

If raw inventory insufficient: “Insufficient inventory”.

### E) Sales Manager: Create Customer Order
Go to Customers (create if needed), then Customer Orders:
1. Select customer
2. Select finished good
3. Quantity
4. Create order

Expected: Order listed as PENDING.

### F) Sales Manager: Complete Customer Order
Click Complete on a pending order.

Expected:
- Order status becomes COMPLETED
- Finished inventory decreases

If finished inventory insufficient: “Insufficient inventory”.

## 4) Inventory Checks
Go to Inventory:
- Verify raw stock increased after inward
- Verify raw stock decreased after production
- Verify finished stock increased after production
- Verify finished stock decreased after order completion

## 5) Reports
Go to Reports:
- Orders report: counts of PENDING/COMPLETED
- Inventory report: low stock list
- Production report: recent batches

## 6) Edge Case Tests

1. Create Purchase Order with FINISHED_GOOD
   - Expect: “Purchase orders must contain raw materials only”

2. Create Customer Order with RAW_MATERIAL
   - Expect: “Customer orders must contain finished goods only”

3. Production without BOM
   - Expect: “BOM not defined for this product”

4. Insufficient raw material in production
   - Expect: “Insufficient inventory”

5. Insufficient finished goods on order completion
   - Expect: “Insufficient inventory”

