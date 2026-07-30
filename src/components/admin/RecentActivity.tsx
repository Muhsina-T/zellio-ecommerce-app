import {
  Package,
  ShoppingBag,
  RotateCcw,
} from "lucide-react";

export default function RecentActivity() {
  return (
    <div className="bg-slate-900 rounded-3xl p-6">

      <h2 className="text-2xl font-bold mb-6">

        Recent Activity

      </h2>

      <div className="space-y-5">

        <div className="flex gap-4">

          <ShoppingBag
            className="text-cyan-400"
          />

          <div>

            <p>New Order Received</p>

            <span className="text-slate-400">

              2 minutes ago

            </span>

          </div>

        </div>

        <div className="flex gap-4">

          <RotateCcw
            className="text-yellow-400"
          />

          <div>

            <p>Return Request</p>

            <span className="text-slate-400">

              20 minutes ago

            </span>

          </div>

        </div>

        <div className="flex gap-4">

          <Package
            className="text-green-400"
          />

          <div>

            <p>Product Added</p>

            <span className="text-slate-400">

              1 hour ago

            </span>

          </div>

        </div>

      </div>

    </div>
  );
}