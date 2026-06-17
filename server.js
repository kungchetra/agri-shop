const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database setup
const adapter = new FileSync('db.json');
const db = low(adapter);

// Seed default data
db.defaults({
  products: [
    { id: 'P-001', name: 'ថ្នាំកម្ចាត់ដង្កូវ Alpha-Cypermethrin', category: 'ថ្នាំសត្វល្អិត', unit: 'ដប 1L', stock: 95, minStock: 10, costPrice: 3.5, sellPrice: 5.5, expiry: '2026-12-30' },
    { id: 'P-002', name: 'ថ្នាំកម្ចាត់ផ្សិត Mancozeb 80WP', category: 'ថ្នាំផ្សិត', unit: 'កញ្ចប់ 1kg', stock: 100, minStock: 15, costPrice: 2, sellPrice: 3.5, expiry: '2026-08-15' },
    { id: 'P-003', name: 'ថ្នាំបាញ់ស្មៅ Glyphosate 480SL', category: 'ថ្នាំស្មៅ', unit: 'ដប 1L', stock: 50, minStock: 5, costPrice: 4, sellPrice: 6.5, expiry: '2026-06-10' },
    { id: 'P-004', name: 'ថ្នាំកម្ចាត់ដង្កូវ Abamectin 1.8EC', category: 'ថ្នាំសត្វល្អិត', unit: 'ដប 500ml', stock: 100, minStock: 10, costPrice: 4.5, sellPrice: 7, expiry: '2027-03-20' },
    { id: 'P-005', name: 'ជី NPK 16-16-16', category: 'ជីគីមី', unit: 'បាវ 50kg', stock: 60, minStock: 20, costPrice: 28, sellPrice: 35, expiry: '2028-01-15' },
    { id: 'P-006', name: 'ជី Urea 46%', category: 'ជីគីមី', unit: 'បាវ 50kg', stock: 40, minStock: 25, costPrice: 22, sellPrice: 28, expiry: '2028-06-30' },
    { id: 'P-007', name: 'ថ្នាំបាញ់ស្មៅ Paraquat 276SL', category: 'ថ្នាំស្មៅ', unit: 'ដប 1L', stock: 50, minStock: 10, costPrice: 5, sellPrice: 7.5, expiry: '2026-09-20' },
    { id: 'P-008', name: 'ថ្នាំកម្ចាត់ផ្សិត Carbendazim 50WP', category: 'ថ្នាំផ្សិត', unit: 'កញ្ចប់ 500g', stock: 100, minStock: 10, costPrice: 2.5, sellPrice: 4, expiry: '2027-05-10' },
    { id: 'P-009', name: 'ជី DAP 18-46-0', category: 'ជីគីមី', unit: 'បាវ 50kg', stock: 150, minStock: 15, costPrice: 32, sellPrice: 40, expiry: '2028-03-25' },
    { id: 'P-010', name: 'គ្រាប់ពូជស្រូវ IR504', category: 'គ្រាប់ពូជ', unit: 'បាវ 25kg', stock: 200, minStock: 10, costPrice: 18, sellPrice: 25, expiry: '2027-12-31' },
    { id: 'P-011', name: 'ថ្នាំកម្ចាត់សត្វកណ្តុរ Zinc Phosphide', category: 'ថ្នាំសត្វល្អិត', unit: 'កញ្ចប់ 100g', stock: 30, minStock: 5, costPrice: 1.5, sellPrice: 3, expiry: '2027-08-15' },
    { id: 'P-012', name: 'ឧបករណ៍បាញ់ថ្នាំ Knapsack 16L', category: 'ឧបករណ៍', unit: 'គ្រឿង', stock: 40, minStock: 3, costPrice: 22, sellPrice: 32, expiry: '' }
  ],
  customers: [
    { id: 'C-001', name: 'លោក សុខ វិចិត្រ', phone: '012-345-678', village: 'ភូមិត្នោត ឃុំព្រែកតាមាក់', cropType: 'ស្រូវ + បន្លែ', totalBuy: 110, debt: 0 },
    { id: 'C-002', name: 'មីង ចាន់ធី', phone: '092-111-222', village: 'ភូមិដូង ឃុំសំរោង', cropType: 'ស្រូវ + ដំឡូង', totalBuy: 0, debt: 280 },
    { id: 'C-003', name: 'ពូ ម៉ៅ', phone: '088-777-555', village: 'ភូមិក្រាំង ឃុំចំការមន', cropType: 'ស្រូវ', totalBuy: 0, debt: 307.5 },
    { id: 'C-004', name: 'លោកស្រី សាន ស្រីពៅ', phone: '015-222-333', village: 'ភូមិតាប៉ែន ឃុំស្វាយរៀង', cropType: 'បន្លែ', totalBuy: 0, debt: 0 },
    { id: 'C-005', name: 'លោក ហេង សុភាព', phone: '070-444-666', village: 'ភូមិព្រែកលៀប', cropType: 'ស្រូវ + ម្រេច', totalBuy: 0, debt: 0 },
    { id: 'C-006', name: 'ពូ ប៊ុនធឿន', phone: '097-555-444', village: 'ភូមិអូរ ឃុំបាក់ស្នា', cropType: 'ស្រូវ', totalBuy: 0, debt: 0 },
    { id: 'C-007', name: 'លោក គឹម សុជាតិ', phone: '086-333-111', village: 'ភូមិចំការដូង', cropType: 'ស្រូវ + ដំឡូងមី', totalBuy: 0, debt: 0 },
    { id: 'C-008', name: 'លោកស្រី យឹម ស្រីលក្ខណ៍', phone: '016-888-999', village: 'ភូមិដើមពោធិ៍', cropType: 'បន្លែ + ផ្លែឈើ', totalBuy: 0, debt: 0 }
  ],
  suppliers: [
    { id: 'S-001', name: 'ក្រុមហ៊ុន កសិកម្មបៃតង', contact: 'លោក ស៊ុំ ម៉េង', phone: '023-456-789', address: 'ផ្លូវ ៥៩៨ ភ្នំពេញ', productType: 'ថ្នាំសត្វល្អិត', totalBuy: 1120, debt: 0 },
    { id: 'S-002', name: 'ដេប៉ូធំ ភ្នំពេញ', contact: 'មីង ស្រីណាង', phone: '012-789-456', address: 'ផ្សារដឹមកុ ភ្នំពេញ', productType: 'ថ្នាំផ្សិត/ស្មៅ', totalBuy: 695, debt: 0 },
    { id: 'S-003', name: 'សហករណ៍ជីកម្ពុជា', contact: 'លោក ហ៊ឹម សុផល', phone: '092-333-666', address: 'កណ្តាល', productType: 'ជីគីមី', totalBuy: 7360, debt: 6860 },
    { id: 'S-004', name: 'ស្ថាប័នគ្រាប់ពូជជាតិ', contact: 'លោកស្រី សុខ លី', phone: '088-111-999', address: 'ផ្លូវជាតិ ៥', productType: 'គ្រាប់ពូជ', totalBuy: 3600, debt: 0 },
    { id: 'S-005', name: 'ហាងឧបករណ៍កសិកម្ម', contact: 'ពូ ឆេង', phone: '097-222-888', address: 'ស្ទឹងមានជ័យ ភ្នំពេញ', productType: 'ឧបករណ៍', totalBuy: 880, debt: 0 }
  ],
  sales: [
    { id: 'INV-26001', date: '2026-05-01', customerId: 'C-001', customerName: 'លោក សុខ វិចិត្រ', items: [{ productId: 'P-001', name: 'ថ្នាំកម្ចាត់ដង្កូវ Alpha-Cypermethrin', qty: 20, unitPrice: 5.5, costPrice: 3.5 }], subtotal: 110, discount: 0, total: 110, paid: 110, balance: 0, paymentStatus: 'សាច់ប្រាក់' },
    { id: 'INV-26002', date: '2026-05-07', customerId: 'C-002', customerName: 'មីង ចាន់ធី', items: [{ productId: 'P-005', name: 'ជី NPK 16-16-16', qty: 5, unitPrice: 35, costPrice: 28 }, { productId: 'P-005', name: 'ជី NPK 16-16-16', qty: 3, unitPrice: 35, costPrice: 28 }], subtotal: 280, discount: 0, total: 280, paid: 0, balance: 280, paymentStatus: 'ជឿ' },
    { id: 'INV-26003', date: '2026-05-10', customerId: 'C-003', customerName: 'ពូ ម៉ៅ', items: [{ productId: 'P-006', name: 'ជី Urea 46%', qty: 10, unitPrice: 28, costPrice: 22 }, { productId: 'P-001', name: 'ថ្នាំកម្ចាត់ដង្កូវ Alpha-Cypermethrin', qty: 5, unitPrice: 5.5, costPrice: 3.5 }], subtotal: 307.5, discount: 0, total: 307.5, paid: 0, balance: 307.5, paymentStatus: 'ជឿ' }
  ],
  purchases: [
    { id: 'PO-26001', date: '2026-04-05', supplierId: 'S-001', supplierName: 'ក្រុមហ៊ុន កសិកម្មបៃតង', items: [{ productId: 'P-001', name: 'ថ្នាំកម្ចាត់ដង្កូវ Alpha-Cypermethrin', qty: 50, unitPrice: 3.5 }], total: 175, paymentStatus: 'បានបង់ប្រាក់' },
    { id: 'PO-26002', date: '2026-04-08', supplierId: 'S-002', supplierName: 'ដេប៉ូធំ ភ្នំពេញ', items: [{ productId: 'P-002', name: 'ថ្នាំកម្ចាត់ផ្សិត Mancozeb 80WP', qty: 100, unitPrice: 2 }], total: 200, paymentStatus: 'បានបង់ប្រាក់' },
    { id: 'PO-26003', date: '2026-04-12', supplierId: 'S-003', supplierName: 'សហករណ៍ជីកម្ពុជា', items: [{ productId: 'P-005', name: 'ជី NPK 16-16-16', qty: 40, unitPrice: 28 }], total: 1120, paymentStatus: 'ជំពាក់គេ' },
    { id: 'PO-26004', date: '2026-04-15', supplierId: 'S-003', supplierName: 'សហករណ៍ជីកម្ពុជា', items: [{ productId: 'P-006', name: 'ជី Urea 46%', qty: 30, unitPrice: 22 }], total: 660, paymentStatus: 'ជំពាក់គេ' },
    { id: 'PO-26005', date: '2026-04-25', supplierId: 'S-003', supplierName: 'សហករណ៍ជីកម្ពុជា', items: [{ productId: 'P-009', name: 'ជី DAP 18-46-0', qty: 150, unitPrice: 32 }], total: 4800, paymentStatus: 'ជំពាក់គេ' },
    { id: 'PO-26006', date: '2026-05-02', supplierId: 'S-004', supplierName: 'ស្ថាប័នគ្រាប់ពូជជាតិ', items: [{ productId: 'P-010', name: 'គ្រាប់ពូជស្រូវ IR504', qty: 200, unitPrice: 18 }], total: 3600, paymentStatus: 'បានបង់ប្រាក់' }
  ],
  invoiceCounter: 26004,
  poCounter: 26007
}).write();

// ===== PRODUCTS ROUTES =====
app.get('/api/products', (req, res) => res.json(db.get('products').value()));
app.post('/api/products', (req, res) => {
  const product = { id: `P-${String(db.get('products').value().length + 1).padStart(3,'0')}`, ...req.body };
  db.get('products').push(product).write();
  res.json(product);
});
app.put('/api/products/:id', (req, res) => {
  db.get('products').find({ id: req.params.id }).assign(req.body).write();
  res.json(db.get('products').find({ id: req.params.id }).value());
});
app.delete('/api/products/:id', (req, res) => {
  db.get('products').remove({ id: req.params.id }).write();
  res.json({ success: true });
});

// ===== CUSTOMERS ROUTES =====
app.get('/api/customers', (req, res) => res.json(db.get('customers').value()));
app.post('/api/customers', (req, res) => {
  const count = db.get('customers').value().length + 1;
  const customer = { id: `C-${String(count).padStart(3,'0')}`, totalBuy: 0, debt: 0, ...req.body };
  db.get('customers').push(customer).write();
  res.json(customer);
});
app.put('/api/customers/:id', (req, res) => {
  db.get('customers').find({ id: req.params.id }).assign(req.body).write();
  res.json(db.get('customers').find({ id: req.params.id }).value());
});

// ===== SUPPLIERS ROUTES =====
app.get('/api/suppliers', (req, res) => res.json(db.get('suppliers').value()));
app.post('/api/suppliers', (req, res) => {
  const count = db.get('suppliers').value().length + 1;
  const supplier = { id: `S-${String(count).padStart(3,'0')}`, totalBuy: 0, debt: 0, ...req.body };
  db.get('suppliers').push(supplier).write();
  res.json(supplier);
});
app.put('/api/suppliers/:id', (req, res) => {
  db.get('suppliers').find({ id: req.params.id }).assign(req.body).write();
  res.json(db.get('suppliers').find({ id: req.params.id }).value());
});

// ===== SALES ROUTES =====
app.get('/api/sales', (req, res) => res.json(db.get('sales').value()));
app.post('/api/sales', (req, res) => {
  const counter = db.get('invoiceCounter').value() + 1;
  db.set('invoiceCounter', counter).write();
  const sale = { id: `INV-${counter}`, date: new Date().toISOString().split('T')[0], ...req.body };
  db.get('sales').push(sale).write();
  // Update stock
  sale.items.forEach(item => {
    const product = db.get('products').find({ id: item.productId });
    const current = product.value();
    if (current) product.assign({ stock: current.stock - item.qty }).write();
  });
  // Update customer debt/totalBuy
  const customer = db.get('customers').find({ id: sale.customerId });
  if (customer.value()) {
    customer.assign({
      totalBuy: (customer.value().totalBuy || 0) + sale.total,
      debt: (customer.value().debt || 0) + sale.balance
    }).write();
  }
  res.json(sale);
});
app.put('/api/sales/:id', (req, res) => {
  db.get('sales').find({ id: req.params.id }).assign(req.body).write();
  res.json(db.get('sales').find({ id: req.params.id }).value());
});

// ===== PURCHASES ROUTES =====
app.get('/api/purchases', (req, res) => res.json(db.get('purchases').value()));
app.post('/api/purchases', (req, res) => {
  const counter = db.get('poCounter').value() + 1;
  db.set('poCounter', counter).write();
  const purchase = { id: `PO-${counter}`, date: new Date().toISOString().split('T')[0], ...req.body };
  db.get('purchases').push(purchase).write();
  // Update stock
  purchase.items.forEach(item => {
    const product = db.get('products').find({ id: item.productId });
    const current = product.value();
    if (current) product.assign({ stock: current.stock + item.qty }).write();
  });
  // Update supplier debt
  if (purchase.paymentStatus === 'ជំពាក់គេ') {
    const supplier = db.get('suppliers').find({ id: purchase.supplierId });
    if (supplier.value()) {
      supplier.assign({
        totalBuy: (supplier.value().totalBuy || 0) + purchase.total,
        debt: (supplier.value().debt || 0) + purchase.total
      }).write();
    }
  }
  res.json(purchase);
});

// ===== DASHBOARD ROUTE =====
app.get('/api/dashboard', (req, res) => {
  const products = db.get('products').value();
  const sales = db.get('sales').value();
  const purchases = db.get('purchases').value();
  const customers = db.get('customers').value();
  const suppliers = db.get('suppliers').value();

  const today = new Date();
  const in30Days = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

  const totalSales = sales.reduce((s, sale) => s + (sale.total || 0), 0);
  const totalProfit = sales.reduce((s, sale) => s + sale.items.reduce((sp, item) => sp + (item.unitPrice - item.costPrice) * item.qty, 0), 0);
  const totalReceivable = customers.reduce((s, c) => s + (c.debt || 0), 0);
  const totalPayable = suppliers.reduce((s, sup) => s + (sup.debt || 0), 0);
  const lowStock = products.filter(p => p.stock <= p.minStock);
  const expiringSoon = products.filter(p => p.expiry && new Date(p.expiry) <= in30Days && new Date(p.expiry) >= today);
  const totalStockValue = products.reduce((s, p) => s + p.stock * p.costPrice, 0);

  res.json({ totalSales, totalProfit, totalReceivable, totalPayable, lowStock, expiringSoon, totalStockValue, totalProducts: products.length, totalCustomers: customers.length });
});

app.listen(3001, () => console.log('Server running on port 3001'));
