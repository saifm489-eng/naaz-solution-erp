import { Customer } from "@/types/customer";
import CustomerStatusBadge from "./CustomerStatusBadge";

import {
  Phone,
  Mail,
  MapPin,
  User,
  BadgeInfo,
} from "lucide-react";

interface Props {
  customer: Customer;
}

export default function CustomerCard({ customer }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:border-slate-300">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />

            <h3 className="text-lg font-semibold text-slate-800">
              {customer.name}
            </h3>
          </div>

          <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
            <BadgeInfo className="h-4 w-4" />

            <span>{customer.customer_code}</span>
          </div>
        </div>

        <CustomerStatusBadge status={customer.status} />
      </div>

      <div className="mt-6 space-y-4">

        <div className="flex items-center gap-3">
          <Phone className="h-4 w-4 text-slate-500" />
          <span className="text-sm text-slate-700">
            {customer.phone}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Mail className="h-4 w-4 text-slate-500" />
          <span className="text-sm text-slate-700">
            {customer.email || "-"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="h-4 w-4 text-slate-500" />
          <span className="text-sm text-slate-700">
            {customer.city || "-"}
          </span>
        </div>

      </div>
    </div>
  );
}