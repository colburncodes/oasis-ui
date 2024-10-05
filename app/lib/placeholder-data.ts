// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const customers = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: customers[2].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: customers[0].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

const payment = [
  { name: 'Visa', type: 'credit' },
  { name: 'MasterCard', type: 'credit' },
  { name: 'Cash', type: 'cash' },
  { name: 'PayPal', type: 'digital wallet' },
  { name: 'Check', type: 'check' }
]

const stores = [
  {
    id: 'store-001',
    name: 'Downtown Grocery',
    image_url: '/stores/downtown-grocery.png',
    address: '123 Main St, Cityville, State 12345',
    status: 'active',
    route_id: 'route-001',
    last_delivery_date: '2023-10-15',
    next_delivery_date: '2023-10-22',
  },
  {
    id: 'store-002',
    name: 'Suburb Mart',
    image_url: '/stores/suburb-mart.png',
    address: '456 Oak Ave, Townsburg, State 67890',
    status: 'active',
    route_id: 'route-002',
    last_delivery_date: '2023-10-14',
    next_delivery_date: '2023-10-21',
  },
  {
    id: 'store-003',
    name: 'City Center Shop',
    image_url: '/stores/city-center-shop.png',
    address: '789 Elm St, Metropolis, State 54321',
    status: 'inactive',
    route_id: null,
    last_delivery_date: '2023-09-30',
    next_delivery_date: null,
  },
  {
    id: 'store-004',
    name: 'Lakeside Convenience',
    image_url: '/stores/lakeside-convenience.png',
    address: '101 Lake Rd, Riverside, State 13579',
    status: 'active',
    route_id: 'route-001',
    last_delivery_date: '2023-10-16',
    next_delivery_date: '2023-10-23',
  },
  {
    id: 'store-005',
    name: 'Mountain View Market',
    image_url: '/stores/mountain-view-market.png',
    address: '202 Peak Blvd, Hilltown, State 24680',
    status: 'active',
    route_id: 'route-003',
    last_delivery_date: '2023-10-17',
    next_delivery_date: '2023-10-24',
  },
];

const routes = [
  {
    id: 'route-001',
    name: 'City Center Route',
    description: 'Covers downtown and nearby suburbs',
    status: 'active',
    driver_id: 'driver-001',
    total_stores: 2,
    total_active_stores: 2,
    last_update_date: '2023-10-18',
  },
  {
    id: 'route-002',
    name: 'Suburban Circle',
    description: 'Covers outer suburban areas',
    status: 'active',
    driver_id: 'driver-002',
    total_stores: 1,
    total_active_stores: 1,
    last_update_date: '2023-10-17',
  },
  {
    id: 'route-003',
    name: 'Mountain Pass',
    description: 'Covers hillside and mountain stores',
    status: 'active',
    driver_id: 'driver-003',
    total_stores: 1,
    total_active_stores: 1,
    last_update_date: '2023-10-18',
  },
  {
    id: 'route-004',
    name: 'Lakeshore Drive',
    description: 'Covers stores along the lakeshore',
    status: 'inactive',
    driver_id: null,
    total_stores: 0,
    total_active_stores: 0,
    last_update_date: '2023-10-10',
  },
];

const drivers = [
  {
    id: 'driver-001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    license_number: 'DL12345678',
    status: 'active',
  },
  {
    id: 'driver-002',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '(555) 987-6543',
    license_number: 'DL87654321',
    status: 'active',
  },
  {
    id: 'driver-003',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    phone: '(555) 246-8135',
    license_number: 'DL13579246',
    status: 'active',
  },
];

export { users, customers, invoices, revenue, payment, stores, routes, drivers };
