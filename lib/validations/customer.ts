import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(2, "Customer name is required"),

  father_name: z.string().optional(),

  mother_name: z.string().optional(),

  phone: z
    .string()
    .min(10, "Phone must be 10 digits")
    .max(10, "Phone must be 10 digits"),

  alternate_phone: z.string().optional(),

  email: z.string().email().optional().or(z.literal("")),

  gender: z.enum(["Male", "Female", "Other"]).optional(),

  dob: z.string().optional(),

  aadhaar_no: z.string().optional(),

  pan_no: z.string().optional(),

  address: z.string().optional(),

  city: z.string().optional(),

  district: z.string().optional(),

  state: z.string().optional(),

  pincode: z.string().optional(),

  notes: z.string().optional(),

  status: z.enum(["Active", "Inactive"]),
});

export type CustomerFormData = z.infer<typeof customerSchema>;