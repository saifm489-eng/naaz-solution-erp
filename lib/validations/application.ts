import { z } from "zod";

export const applicationSchema = z.object({
  customer_id: z
    .string()
    .min(1, "Please select a customer"),

  serviceName: z
    .string()
    .min(2, "Service name is required"),

  amount: z.coerce
    .number()
    .min(0, "Amount cannot be negative"),

  status: z.enum([
    "Pending",
    "Processing",
    "Approved",
    "Rejected",
    "Completed",
  ]),

  remarks: z.string().optional(),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;