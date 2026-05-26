import type { PaymentMethodEnum } from "../enums/payment-method.enum";
import type { OrderItem } from "../../types/order-item.type";

type OrderHistory = {
  status: string;
  label: string;
  time?: string;
  createdAt: string;
};

export interface OrderResponseDto {
  id: string;
  code: number;
  status: string;
  paymentMethod: PaymentMethodEnum;
  customerName: string;
  customerPhone: string;
  addressStreet: string;
  addressCityState: string;
  addressComplement?: string;
  subtotal: string;
  deliveryFee: string;
  discount: string;
  total: string;
  items: OrderItem[];
  history: OrderHistory[];
  createdAt: string;
  updatedAt: string;
}
