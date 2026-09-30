import { useMemo, useState } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Күрүч", category: "Азык-түлүк", price: 120, unit: "кг", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80" },
  { id: 2, name: "Ун", category: "Азык-түлүк", price: 55, unit: "кг", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80" },
  { id: 3, name: "Шекер", category: "Азык-түлүк", price: 78, unit: "кг", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=80" },
  { id: 4, name: "Макарон", category: "Азык-түлүк", price: 85, unit: "кг", image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=900&q=80" },
  { id: 5, name: "Өсүмдүк майы", category: "Азык-түлүк", price: 160, unit: "л", image: "https://images.unsplash.com/photo-1474978528675-4a50a4508dc3?auto=format&fit=crop&w=900&q=80" },
  { id: 6, name: "Минералдык суу", category: "Суусундук", price: 35, unit: "шт", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80" },
  { id: 7, name: "Кола", category: "Суусундук", price: 70, unit: "шт", image: "https://images.unsplash.com/photo-1622483767028-3f66f2b0a5d6?auto=format&fit=crop&w=900&q=80" },
  { id: 8, name: "Шырын", category: "Суусундук", price: 110, unit: "шт", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=80" },
  { id: 9, name: "Самын", category: "Тиричилик", price: 45, unit: "шт", image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80" },
  { id: 10, name: "Кир жуучу порошок", category: "Тиричилик", price: 180, unit: "шт", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80" },
  { id: 11, name: "Туалет кагазы", category: "Тиричилик", price: 95, unit: "шт", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=900&q=80" },
  { id: 12, name: "Салфетка", category: "Тиричилик", price: 60, unit: "пачка", image: "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=900&q=80" },
];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Баары");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const categories = ["Баары", "Азык-түлүк", "Суусундук", "Тиричилик"];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "Баары" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
  }

  function increase(id) {
    setCart((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decrease(id) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(id) {
    setCart((current) => current.filter((item) => item.id !== id));
  }

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="app">
      <header className="header">
        <div className="container header-inner">
          <div className="logo">
            <div className="logo-icon">О</div>
            <div>
              <h1>OPTOVIK</h1>
              <span>Оптовый магазин</span>
            </div>
          </div>

          <button
            className="cart-button"
            onClick={() => setShowCart(true)}
          >
            🛒 Корзина
            <b>{cartCount}</b>
          </button>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <div>
            <p className="hero-label">ОПТОВАЯ ТОРГОВЛЯ</p>
            <h2>Товарларды дүңүнөн<br />сатып алыңыз</h2>
            <p>
              Дүкөндөр жана ишкерлер үчүн сапаттуу товарлар
              жеткиликтүү баада.
            </p>
          </div>
        </section>

        <section className="catalog">
          <div className="catalog-top">
            <div>
              <h2>Каталог товаров</h2>
              <p>{filteredProducts.length} товар табылды</p>
            </div>

            <input
              className="search"
              type="text"
              placeholder="🔎 Товар издөө..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="categories">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="products">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div
                  className="product-image"
                  style={{ backgroundImage: `url(${product.image})` }}
                  aria-label={product.name}
                />

                <div className="product-info">
                  <span className="category">
                    {product.category}
                  </span>

                  <h3>{product.name}</h3>

                  <p className="price">
                    {product.price} сом
                    <small> / {product.unit}</small>
                  </p>

                  <button
                    className="add-button"
                    onClick={() => addToCart(product)}
                  >
                    + Себетке кошуу
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="empty">
              <div>🔎</div>
              <h3>Товар табылган жок</h3>
              <p>Башка ат менен издеп көрүңүз.</p>
            </div>
          )}
        </section>
      </main>

      {showCart && (
        <div
          className="overlay"
          onClick={() => setShowCart(false)}
        >
          <div
            className="cart"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cart-header">
              <h2>🛒 Корзина</h2>

              <button
                className="close"
                onClick={() => setShowCart(false)}
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <div>🛒</div>
                <h3>Корзина бош</h3>
                <p>Товарларды корзинага кошуңуз.</p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <div>
                        <h3>{item.name}</h3>
                        <p>{item.price} сом / {item.unit}</p>
                      </div>

                      <div className="quantity">
                        <button onClick={() => decrease(item.id)}>
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button onClick={() => increase(item.id)}>
                          +
                        </button>
                      </div>

                      <strong>
                        {item.price * item.quantity} сом
                      </strong>

                      <button
                        className="delete"
                        onClick={() => removeFromCart(item.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-footer">
                  <div>
                    <span>Жалпы сумма:</span>
                    <strong>{totalPrice} сом</strong>
                  </div>

                  <button
                    className="order-button"
                    onClick={() =>
                      alert(
                        `Заказ кабыл алынды! Сумма: ${totalPrice} сом`
                      )
                    }
                  >
                    Заказ берүү
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <footer className="project-footer">
        <div className="project-footer-inner">
          <span className="project-footer-title">Project Team</span>
          <div className="project-footer-row">
            <span>Team Lead:</span>
            <strong>Алияр</strong>
          </div>
          <div className="project-footer-row">
            <span>QA Tester + Dev:</span>
            <strong>Акмарал</strong>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;