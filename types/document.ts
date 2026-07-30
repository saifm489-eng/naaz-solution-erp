export interface Document {
  id: string;

  customer_id: string | null;

  application_id: string | null;

  user_id: string;

  file_name: string;

  file_path: string;

  file_url: string | null;

  file_size: number | null;

  file_type: string | null;

  created_at: string;
}