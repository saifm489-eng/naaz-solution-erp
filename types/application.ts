export type ApplicationStatus =
  | "Pending"
  | "Processing"
  | "Approved"
  | "Rejected"
  | "Completed";

export interface ApplicationCustomer {
  id: string;
  name: string;
  phone: string | null;
}

export interface Application {
  id: string;
  application_no: string;
  customer_id: string;
  service_name: string;
  amount: number | null;
  status: ApplicationStatus;
  remarks: string | null;
  created_at: string;
  updated_at: string | null;

  // Supabase customer relation
  customers?: ApplicationCustomer | null;
}