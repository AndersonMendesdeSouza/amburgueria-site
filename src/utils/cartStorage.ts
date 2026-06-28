export type StoredCartItem = {
  id?: string;
  name?: string;
  price?: number;
  qty?: number;
  quantity?: number;
  note?: string;
  subtitle?: string;
  image?: string;
  img?: string;
  badge?: string;
  [key: string]: unknown;
};

export const CART_STORAGE_KEY = "food";
export const CART_UPDATED_EVENT = "cart-updated";

export function makeCartMergeKey(item: StoredCartItem) {
  const id = String(item.id ?? "").trim();
  if (id) return `id:${id}`;

  const name = String(item.name ?? "").trim().toLowerCase();
  return `name:${name || "unknown"}`;
}

function parseCartItems(): StoredCartItem[] {
  if (typeof localStorage === "undefined") return [];

  const raw = localStorage.getItem(CART_STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    const values = Array.isArray(parsed) ? parsed : [parsed];
    return values.filter(
      (value): value is StoredCartItem =>
        Boolean(value) && typeof value === "object",
    );
  } catch {
    return [];
  }
}

export function getCartQuantity() {
  return parseCartItems().reduce((total, item) => {
    const quantity = Number(item.qty ?? item.quantity ?? 1);
    const safeQuantity =
      Number.isFinite(quantity) && quantity > 0 ? quantity : 1;

    return total + safeQuantity;
  }, 0);
}

export function notifyCartUpdated() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function addCart(item: StoredCartItem | null) {
  if (!item) return;

  const items = parseCartItems();

  const qtyToAddRaw = Number(item.qty ?? item.quantity ?? 1);
  const qtyToAdd =
    Number.isFinite(qtyToAddRaw) && qtyToAddRaw > 0 ? qtyToAddRaw : 1;

  const mergeKey = makeCartMergeKey(item);
  const index = items.findIndex((product) => makeCartMergeKey(product) === mergeKey);

  if (index >= 0) {
    const current = items[index];
    const prevQty = Number(current.qty ?? current.quantity ?? 1);

    items[index] = {
      ...current,
      ...item,
      qty: prevQty + qtyToAdd,
      image: String(item.image ?? item.img ?? current.image ?? current.img ?? ""),
      img: String(item.img ?? item.image ?? current.img ?? current.image ?? ""),
    };
  } else {
    items.push({
      ...item,
      qty: qtyToAdd,
      image: String(item.image ?? item.img ?? ""),
      img: String(item.img ?? item.image ?? ""),
    });
  }

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  notifyCartUpdated();
}
