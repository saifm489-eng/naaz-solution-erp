"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

export default function EditPage() {
  const params = useParams();

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">
          Edit Dashboard Item
        </h1>

        <p className="text-gray-600 mb-6">
          ID: <strong>{params.id}</strong>
        </p>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter name"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows={5}
              placeholder="Enter description"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div className="flex gap-3">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
              Save Changes
            </button>

            <Link
              href="/dashboard"
              className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}