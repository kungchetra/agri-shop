# 🌾 ហាងថ្នាំកសិកម្ម - Agricultural Shop Management System

## របៀបដំណើរការ (How to Run)

### តម្រូវការ (Requirements)
- Node.js v14+
- npm

### ជំហានដំណើរការ (Steps)

```bash
# 1. ចូលទៅ folder
cd agri-shop

# 2. ដំណើរការ server
node server.js

# 3. បើក Browser ទៅ:
http://localhost:3001
```

## មុខងារ (Features)

| មុខងារ | ការពិពណ៌នា |
|--------|-----------|
| 📊 Dashboard | ផ្ទាំងសង្ខេបហិរញ្ញវត្ថុ + ការព្រមាន |
| 📦 Inventory | គ្រប់គ្រងស្តុក + ផ្លាក ហួស/ជិតអស់ |
| 🧾 Invoice/Sales | បង្កើត + គ្រប់គ្រងវិក្កយបត្រ |
| 🛒 Purchases | ការទិញចូល + Update ស្តុក |
| 👥 Customers | បញ្ជីអតិថិជន + តាមដានបំណុល |
| 🏭 Suppliers | បញ្ជីអ្នកផ្គត់ផ្គង់ + បំណុល |
| 📈 Reports | របាយការណ៍ + ស្ថិតិ |

## ទិន្នន័យ (Data)
- ផ្ទុកនៅ `db.json` (auto-created)
- ទិន្នន័យគំរូ ១២ ផលិតផល, ៨ អតិថិជន, ៥ Supplier

## API Endpoints
```
GET  /api/products      - បញ្ជីផលិតផល
POST /api/products      - បន្ថែមផលិតផល
PUT  /api/products/:id  - កែផលិតផល
DELETE /api/products/:id - លុបផលិតផល

GET  /api/sales         - វិក្កយបត្រ
POST /api/sales         - បង្កើតវិក្កយបត្រ (Auto cut stock)

GET  /api/purchases     - ការទិញ
POST /api/purchases     - ការទិញថ្មី (Auto add stock)

GET  /api/customers     - អតិថិជន
GET  /api/suppliers     - អ្នកផ្គត់ផ្គង់
GET  /api/dashboard     - ទិន្នន័យ Dashboard
```
