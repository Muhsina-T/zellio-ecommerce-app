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

  // Recent orders
  orders.slice(0, 3).forEach((order) => {
    activities.push({
      id: `order-${order._id || order.id}`,
      type: "order",
      title: `New Order ${order.orderNumber}`,
      date: order.createdAt || order.date,
    });
  });

  // Recent returns
  returns.slice(0, 3).forEach((returnItem: any) => {
    activities.push({
      id: `return-${returnItem._id || returnItem.id}`,
      type: "return",
      title: "Return Request",
      date:
        returnItem.createdAt ||
        returnItem.date ||
        new Date().toISOString(),
    });
  });

  // Recent products
  products.slice(0, 3).forEach((product) => {
    activities.push({
      id: `product-${product._id}`,
      type: "product",
      title: `Product Added: ${product.name}`,
      date: new Date().toISOString(),
    });
  });

  // Newest first
  activities.sort(
    (a, b) =>
      new Date(b.date).getTime() -
      new Date(a.date).getTime()
  );

  const recentActivities = activities.slice(0, 5);

  const getTimeAgo = (date: string) => {
    const diff =
      Date.now() - new Date(date).getTime();

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

    return `${days} ${
      days === 1 ? "day" : "days"
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

              {activity.type === "order" && (
                <ShoppingBag className="text-[#5C8A05]" />
              )}

              {activity.type === "return" && (
                <RotateCcw className="text-[#B88A2D]" />
              )}

              {activity.type === "product" && (
                <Package className="text-[#AAD10A]" />
              )}

              <div>
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