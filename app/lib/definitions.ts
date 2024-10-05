// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type Payment = {
  id: string;
  name: string;
  description: string;
  type: 'credit' | 'debit' | 'cash' | 'check' | 'digital wallet'
}

export type Store = {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  phoneNumber: string;
  managerName: string;
}

// Store type
export type FormattedStoreTable = {
  id: string;
  name: string;
  image_url: string;
  address: string;
  route_name: string | null;
  status: 'active' | 'inactive';
  last_delivery_date?: string;
  next_delivery_date?: string;
};

export type StoreTableType = FormattedStoreTable[];


// Route type
export type FormattedRouteTable = {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  driver_name: string | null;
  total_stores: number;
  total_active_stores: number;
  last_update_date: string;
};

export type RouteTableType = FormattedRouteTable[];
