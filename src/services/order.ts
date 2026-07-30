import type { Order } from "../types/Order";


const ORDER_KEY="zellio_orders";


export function saveOrder(order:Order){

const orders =
getOrders();


orders.push(order);


localStorage.setItem(
ORDER_KEY,
JSON.stringify(orders)
);


}



export function getOrders():Order[]{


const data =
localStorage.getItem(
ORDER_KEY
);


return data
?
JSON.parse(data)
:
[];


}