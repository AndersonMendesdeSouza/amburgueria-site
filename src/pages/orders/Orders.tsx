import { useNavigate } from "react-router-dom";
import {
  Bike,
  Check,
  ChefHat,
  ChevronRight,
  Home,
  Map,
} from "lucide-react";
import { Header } from "../../components/Header/Header";
import styles from "./Orders.module.css";

const orderItems = [
  {
    name: "Monster Bacon",
    desc: "Pão artesanal, blend 160g, cheddar, bacon, alface, tomate e molho especial",
    qty: "x1",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=240&q=80",
  },
  {
    name: "Batata Média",
    desc: "Batata frita crocante",
    qty: "x1",
    img: "https://images.unsplash.com/photo-1630431341973-02e6b662ec35?auto=format&fit=crop&w=240&q=80",
  },
  {
    name: "Coca-Cola",
    desc: "350ml",
    qty: "x1",
    img: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=240&q=80",
  },
];

const recentOrders = [
  { id: "#1011", date: "12/05/2026", items: "2 itens", total: "R$ 52,30" },
  { id: "#1003", date: "08/05/2026", items: "3 itens", total: "R$ 79,90" },
];

export default function Orders() {
  const navigate = useNavigate();

  return (
    <div className={styles.screen}>
      <Header showSearch={false} onCartClick={() => navigate("/cart")} />

      <main className={styles.content}>
        <h1 className={styles.title}>Pedidos</h1>

        <div className={styles.tabs}>
          <button className={styles.activeTab} type="button">
            Em andamento
          </button>
          <button type="button">Finalizados</button>
          <button type="button">Cancelados</button>
        </div>

        <section className={styles.currentOrder}>
          <div className={styles.orderTop}>
            <div>
              <h2>Pedido #1024</h2>
              <p>
                <strong>25-35 min</strong>
                <span>• Previsão de entrega</span>
              </p>
            </div>
            <span className={styles.preparing}>
              <ChefHat size={17} />
              Preparando
            </span>
          </div>

          <div className={styles.timeline}>
            <div className={styles.stepDone}>
              <span>
                <Check size={20} />
              </span>
              <strong>Recebido</strong>
            </div>
            <div className={styles.stepDone}>
              <span>
                <ChefHat size={20} />
              </span>
              <strong>Preparando</strong>
            </div>
            <div className={styles.stepMuted}>
              <span>
                <Bike size={20} />
              </span>
              <strong>Saiu para entrega</strong>
            </div>
            <div className={styles.stepMuted}>
              <span>
                <Home size={20} />
              </span>
              <strong>Entregue</strong>
            </div>
          </div>

          <div className={styles.items}>
            {orderItems.map((item) => (
              <div key={item.name} className={styles.orderItem}>
                <img src={item.img} alt={item.name} />
                <div>
                  <strong>{item.name}</strong>
                  <p>{item.desc}</p>
                </div>
                <span>{item.qty}</span>
              </div>
            ))}
          </div>

          <div className={styles.total}>
            <span>Total</span>
            <strong>R$ 68,70</strong>
          </div>

          <button className={styles.trackButton} type="button">
            <Map size={20} />
            Acompanhar pedido
          </button>
          <button className={styles.detailsButton} type="button">
            Ver detalhes
          </button>
        </section>

        <section className={styles.recent}>
          <div className={styles.sectionHeader}>
            <h2>Pedidos recentes</h2>
            <button type="button">
              Ver todos
              <ChevronRight size={20} />
            </button>
          </div>

          <div className={styles.recentList}>
            {recentOrders.map((order) => (
              <div className={styles.recentItem} key={order.id}>
                <img
                  src="https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=240&q=80"
                  alt={`Pedido ${order.id}`}
                />
                <div className={styles.recentInfo}>
                  <strong>Pedido {order.id}</strong>
                  <span>
                    {order.items} • {order.date}
                  </span>
                  <b>{order.total}</b>
                </div>
                <div className={styles.recentActions}>
                  <span className={styles.delivered}>Entregue</span>
                  <button type="button">Pedir novamente</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
