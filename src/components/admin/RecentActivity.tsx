import {
  Package,
  ShoppingBag,
  RotateCcw,
} from "lucide-react";

import type { Order } from "../../types/Order";
import type { Product } from "../../types/Product";

type RecentActivityProps = {
  orders: Order[];
  returns: any[];
  products: Product[];
};

type Activity = {
  id: string;
  type: "order" | "return" | "product";
  title: string;
  date: string;
};

export default function RecentActivity({
  orders,
  returns,
  products,
}: RecentActivityProps) {
  const activities: Activity[] = [];

  // =========================
  // ORDERS
  // =========================

  orders.forEach((order) => {
    const date = order.createdAt || order.date;

    if (!date) return;

    activities.push({
      id: `order-${order._id || order.id || order.orderNumber}`,
      type: "order",
      title: `New Order ${order.orderNumber}`,
      date,
    });
  });

  // =========================
  // RETURNS
  // =========================

  returns.forEach((returnItem: any) => {
    const date =
      returnItem.createdAt ||
      returnItem.date;

    if (!date) return;

    activities.push({
      id: `return-${returnItem._id || returnItem.id}`,
      type: "return",
      title: "Return Request",
      date,
    });
  });

  // =========================
  // PRODUCTS
  // =========================

  products.forEach((product) => {
    const date = product.createdAt;

    if (!date) return;

    activities.push({
      id: `product-${product._id || product.id}`,
      type: "product",
      title: `Product Added: ${product.name}`,
      date,
    });
  });

  // =========================
  // SORT NEWEST FIRST
  // =========================

  activities.sort(
    (a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime()
  );

  // Only show latest 5
  const recentActivities = activities.slice(0, 5);

  // =========================
  // TIME AGO
  // =========================

  const getTimeAgo = (date: string) => {
    const timestamp = new Date(date).getTime();

    if (Number.isNaN(timestamp)) {
      return "Unknown time";
    }

    const diff = Date.now() - timestamp;

    const minutes = Math.floor(
      diff / (1000 * 60)
    );

    if (minutes < 1) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes} ${
        minutes === 1 ? "minute" : "minutes"
      } ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
      return `${hours} ${
        hours === 1 ? "hour" : "hours"
      } ago`;
    }

    const days = Math.floor(hours / 24);

    if (days < 30) {
      return `${days} ${
        days === 1 ? "day" : "days"
      } ago`;
    }

    const months = Math.floor(days / 30);

    if (months < 12) {
      return `${months} ${
        months === 1 ? "month" : "months"
      } ago`;
    }

    const years = Math.floor(months / 12);

    return `${years} ${
      years === 1 ? "year" : "years"
    } ago`;
  };

  return (
    <div className="bg-white border border-[#E5E5DD] rounded-3xl p-6 shadow-sm">

      <h2 className="text-xl lg:text-2xl font-bold mb-6 text-[#13160F]">
        Recent Activity
      </h2>

      {recentActivities.length === 0 ? (
        <p className="text-[#6B6F63]">
          No recent activity
        </p>
      ) : (
        <div className="space-y-5">

          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex gap-4"
            >

              {/* ORDER ICON */}
              {activity.type === "order" && (
                <ShoppingBag
                  className="text-[#5C8A05] shrink-0"
                />
              )}

              {/* RETURN ICON */}
              {activity.type === "return" && (
                <RotateCcw
                  className="text-[#B88A2D] shrink-0"
                />
              )}

              {/* PRODUCT ICON */}
              {activity.type === "product" && (
                <Package
                  className="text-[#AAD10A] shrink-0"
                />
              )}

              <div className="min-w-0">

                <p className="text-[#13160F]">
                  {activity.title}
                </p>

                <span className="text-[#6B6F63] text-sm">
                  {getTimeAgo(activity.date)}
                </span>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}