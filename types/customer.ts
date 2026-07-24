export interface Customer {
  id: string;
  user_id: string;

  customer_code: string;

  name: string;
  father_name: string | null;
  mother_name: string | null;

  phone: string;
  alternate_phone: string | null;

  email: string | null;

  gender: "Male" | "Female" | "Other" | null;
  dob: string | null;

  aadhaar_no: string | null;
  pan_no: string | null;

  address: string | null;
  city: string | null;
  district: string | null;
  state: string | null;
  pincode: string | null;

  photo_url: string | null;

  notes: string | null;

  status: "Active" | "Inactive";

  created_at: string;
  updated_at: string;
}