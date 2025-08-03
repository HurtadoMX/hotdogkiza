import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Utensils,
  Search,
  Flame,
  Leaf,
  CupSoda,
  IceCream2,
} from "lucide-react";
import "./App.css";
import supremo from "./assets/img/supremo.png";
import Embarazado from "./assets/img/embarazado.png";
import Mangoyada from "./assets/img/mangoyada.jpg";
import Fresada from "./assets/img/fresada.jpg";
import Cerezada from "./assets/img/cerezada.webp";
import Pepsi from "./assets/img/pepsi.webp";
import Coca from "./assets/img/coca.jpg";
import Squirt from "./assets/img/squirt.webp";
import Pina from "./assets/img/pina.jpg";
import Naranja from "./assets/img/naranja.jpg";
import Sidral from "./assets/img/sidral.jpg";
import Esquite from "./assets/img/esquite.avif";
import Toritos from "./assets/img/toritos.webp";
import Elote from "./assets/img/elote.jpeg";
import Chilidogo from "./assets/img/chilidogo.jpeg";
import Normal from "./assets/img/normal.jpeg";
import Perron from "./assets/img/perron.jpeg";

// Pequeños componentes de UI (Cards, Badges, Button) con CSS plano
const Card = ({ children }) => <div className="card">{children}</div>;
const CardHeader = ({ children }) => (
  <div className="card-header">{children}</div>
);
const CardTitle = ({ children }) => (
  <div className="card-title">{children}</div>
);
const CardContent = ({ children }) => (
  <div className="card-content">{children}</div>
);
const Badge = ({ children, variant }) => (
  <span className={`badge ${variant === "danger" ? "badge-danger" : ""}`}>
    {children}
  </span>
);
const Button = ({ children, onClick }) => (
  <button onClick={onClick} className="btn-gradient">
    {children}
  </button>
);

// Datos de ejemplo del menú
const MENU = [
  {
    id: "Hot-dog Normal",
    name: "Hot-dog Normal",
    description:
      "Hot-dog con pan normal, salchicha con tocino, tomate, cebolla cruda, cebolla asada (con chile morron), catsup, aderezo especial, mostaza, queso amarillo, chorizo",
    only: "Only Hotdog $6",
    combo: "Combo Hot-dog $8 (incluye papas y soda)",
    price: 6,
    category: "Desayunos",
    tags: ["popular"],
    spicy: true,
    vegan: false,
    icon: "🟩",
    img: Normal,
  },
  {
    id: "Hot-dog Perron",
    name: "Hot-dog Perron",
    description:
      "Hot-dog con pan grande, jamon con queso, carne asada, NO salchicha con tocino, tomate, cebolla cruda, cebolla asada (con chile morron), catsup, aderezo especial, mostaza, queso amarillo, chorizo",
    only: "Only Hotdog $8",
    combo: "Combo Hot-dog $10 (incluye papas y soda)",
    price: 8,
    category: "Desayunos",
    tags: ["dulce"],
    spicy: false,
    vegan: false,
    icon: "🥞",
    img: Perron,
  },
  {
    id: "Hot-dog Supremo",
    name: "Hot-dog Supremo",
    description:
      "Hot-dog con pan grande, jamon con queso, carne asada, SI salchicha con tocino, tomate, cebolla cruda, cebolla asada (con chile morron), catsup, aderezo especial, mostaza, queso amarillo, chorizo",
    only: "Only Hotdog $10",
    combo: "Combo Hot-dog $12 (incluye papas y soda)",
    price: 10,
    category: "Entradas",
    tags: ["fresco"],
    spicy: false,
    vegan: true,
    icon: "🥗",
    img: supremo,
  },
  {
    id: "Hot-dog Embarazado",
    name: "Hot-dog Embarazado",
    description:
      "Hot-dog con pan grande, salchica de asar con salchicha y quedo dentro envuelta en tocino, tomate, cebolla cruda, cebolla asada (con chile morron), catsup, aderezo especial, mostaza, queso amarillo, chorizo",
    only: "Only Hotdog $8",
    combo: "Combo Hot-dog $10 (incluye papas y soda)",
    price: 8,
    category: "Entradas",
    tags: ["confort"],
    spicy: false,
    vegan: true,
    icon: "🎃",
    img: Embarazado,
  },
  {
    id: "Chilidogo",
    name: "Chilidogo",
    description:
      "Hot-dog con pan grande, salchica dentro de un chile envuelto en tocino, tomate, cebolla cruda, cebolla asada (con chile morron), catsup, aderezo especial, mostaza, queso amarillo, chorizo",
    only: "Only Hotdog $8",
    combo: "Combo Hot-dog $10 (incluye papas y soda)",
    price: 8,
    category: "Platos fuertes",
    tags: ["popular"],
    spicy: false,
    vegan: false,
    icon: "🍔",
    img: Chilidogo,
  },
  {
    id: "Toritos",
    name: "Toritos",
    description:
      "Chiles gueros, rellenos de filadelfia, queso mozarella y envueltos en tocino",
    only: "Only Torito $2.50",
    combo: "Combo 3 x $7",
    price: 2.5,
    category: "Platos fuertes",
    tags: ["mexicano"],
    spicy: true,
    vegan: false,
    icon: "🌮",
    img: Toritos,
  },
  {
    id: "Elote Entero",
    name: "Elote Entero",
    description: "Albahaca fresca, piñones, aceite de oliva y toque de limón.",
    price: 8,
    category: "Platos fuertes",
    tags: ["italiano"],
    spicy: false,
    vegan: true,
    icon: "🍝",
    img: Elote,
    no: true,
  },
  // {
  //   id: "Esquite Mediano",
  //   name: "Esquite Mediano",
  //   description:
  //     "Delicioso elote en vaso mediano, con mayonesa, queso en polvo (cotija), mantequilla, limon, picante en polvo, picante de la casa, salsa valentina, chips a elegir (hot cheetos, ruffles, doritos)",
  //   price: 8,
  //   category: "Bebidas",
  //   tags: ["salado"],
  //   spicy: false,
  //   vegan: false,
  //   icon: "🥤",
  //   img: Esquite,
  //   no: true,
  // },
  {
    id: "Esquite Grande",
    name: "Esquite Grande",
    description:
      "Delicioso elote en vaso, con mayonesa, queso en polvo (cotija), mantequilla, limon, picante en polvo, picante de la casa, salsa valentina, chips a elegir (hot cheetos, ruffles, doritos)",
    price: 7,
    category: "Comida",
    tags: ["salado"],
    spicy: false,
    vegan: false,
    icon: "🥤",
    img: Esquite,
    no: true,
  },
  {
    id: "Pepsi",
    name: "Pepsi",
    description: "Refrescante Pepsi.",
    price: 8,
    category: "Bebidas",
    tags: ["refrescante"],
    spicy: false,
    vegan: true,
    icon: "🍋",
    img: Pepsi,
    no: true,
  },
  {
    id: "Squirt",
    name: "Squirt",
    description: "Refrescante Squirt.",
    price: 8,
    category: "Bebidas",
    tags: ["refrescante"],
    spicy: false,
    vegan: true,
    icon: "🍋",
    img: Squirt,
    no: true,
  },
  {
    id: "Coca-cola",
    name: "Coca-Cola",
    description: "Refrescante refresco de coca.",
    price: 8,
    category: "Bebidas",
    tags: ["refrescante"],
    spicy: false,
    vegan: true,
    icon: "🍋",
    img: Coca,
    no: true,
  },
  {
    id: "Jarritos",
    name: "Jarrito Mandarina",
    description: "Refrescante jarrito de mandarina.",
    price: 8,
    category: "Bebidas",
    tags: ["refrescante"],
    spicy: false,
    vegan: true,
    icon: "🍋",
    img: Naranja,
    no: true,
  },
  {
    id: "Jarrito",
    name: "Jarrito Piña",
    description: "Refrescante jarrito de piña.",
    price: 8,
    category: "Bebidas",
    tags: ["refrescante"],
    spicy: false,
    vegan: true,
    icon: "🍋",
    img: Pina,
    no: true,
  },
  {
    id: "Sidral",
    name: "Sidral Manzana",
    description: "Refrescante sidral de manzana",
    price: 8,
    category: "Postres",
    tags: ["dulce"],
    spicy: false,
    vegan: false,
    icon: "🍫",
    img: Sidral,
    no: true,
  },
  {
    id: "Mangoyada",
    name: "Mangoyada",
    description:
      "Deliciosa mangoyada estilo Ciudad de Mexico, hecho en licuadora con textura suave, se sirve con chamoy, miguelito y palito de dulce de tamarindo",
    price: 5,
    category: "Postres",
    tags: ["fresco"],
    spicy: false,
    vegan: false,
    icon: "🍨",
    img: Mangoyada,
    no: true,
  },
  {
    id: "Fresada",
    name: "Fresada",
    description:
      "Deliciosa fresada estilo Ciudad de Mexico, hecho en licuadora con textura suave, se sirve con chamoy, miguelito y palito de dulce de tamarindo",
    price: 5,
    category: "Postres",
    tags: ["fresco"],
    spicy: false,
    vegan: false,
    icon: "🍨",
    img: Fresada,
    no: true,
  },
  {
    id: "Cerezada",
    name: "Cerezada",
    description:
      "Deliciosa cerezada estilo Ciudad de Mexico, hecho en licuadora con textura suave, se sirve con chamoy, miguelito y palito de dulce de tamarindo",
    price: 5,
    category: "Postres",
    tags: ["fresco"],
    spicy: false,
    vegan: false,
    icon: "🍨",
    img: Cerezada,
    no: true,
  },
];

const CATEGORIES = [
  { key: "Todos", icon: <Utensils size={16} /> },
  { key: "Desayunos", icon: <Search size={16} /> },
  { key: "Entradas", icon: <Leaf size={16} /> },
  { key: "Platos fuertes", icon: <Flame size={16} /> },
  { key: "Postres", icon: <IceCream2 size={16} /> },
  { key: "Bebidas", icon: <CupSoda size={16} /> },
];

const chip = { hidden: { opacity: 0, y: -10 }, show: { opacity: 1, y: 0 } };
const cardVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1 },
};
const floaty = {
  animate: (i) => ({
    y: [0, -10, 0],
    rotate: [0, 6, 0],
    transition: { duration: 3 + i * 0.2, repeat: Infinity, ease: "easeInOut" },
  }),
};

function Price({ value }) {
  return <span className="price">${value.toFixed(0)}</span>;
}
function Tag({ children }) {
  return <Badge>{children}</Badge>;
}

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [onlyVegan, setOnlyVegan] = useState(false);
  const [onlySpicy, setOnlySpicy] = useState(false);
  const [cart, setCart] = useState([]);

  const filtered = useMemo(() => {
    return MENU.filter((item) => {
      const matchesCategory =
        category === "Todos" || item.category === category;
      const matchesQuery = `${item.name} ${item.description}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesVegan = !onlyVegan || item.vegan;
      const matchesSpicy = !onlySpicy || item.spicy;
      return matchesCategory && matchesQuery && matchesVegan && matchesSpicy;
    });
  }, [query, category, onlyVegan, onlySpicy]);

  const addToCart = (id) => setCart((prev) => [...prev, id]);

  return (
    <div className="page">
      {/* Fondo animado con figuritas */}
      <div className="bg-decor">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={floaty}
            animate="animate"
            className="decor-item"
            style={{ left: `${(i * 13) % 100}%`, top: `${(i * 7) % 100}%` }}
          >
            <motion.div
              className="decor-square"
              style={{
                background:
                  i % 3 === 0
                    ? "linear-gradient(135deg, #FDE68A, #FCA5A5)"
                    : i % 3 === 1
                    ? "linear-gradient(135deg, #A7F3D0, #93C5FD)"
                    : "linear-gradient(135deg, #FDBA74, #FDE68A)",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Encabezado */}
      <header className="container header">
        <div className="header-row">
          <div className="brand">
            <motion.div initial={{ rotate: -8 }} animate={{ rotate: 0 }}>
              <Utensils size={32} />
            </motion.div>
            <h1 className="title">
              Hotdog<span className="accent">Kiza</span>
            </h1>
          </div>
          {/* <Button>Orden ({cart.length})</Button> */}
        </div>
        {/* <p className="sub">
          Un menú colorido y lleno de energía. Filtra por categoría, busca tus
          favoritos y agrega platillos a tu orden. ✨
        </p> */}

        {/* Controles */}
        {/* <div className="controls">
          <div className="search-wrap">
            <Search className="search-icon" size={16} />
            <input
              placeholder="Buscar platillos o ingredientes..."
              className="input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="filters">
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setOnlyVegan((v) => !v)}
              className={`chip ${onlyVegan ? "chip-on chip-veg" : ""}`}
            >
              <Leaf size={16} /> Vegano
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setOnlySpicy((v) => !v)}
              className={`chip ${onlySpicy ? "chip-on chip-spicy" : ""}`}
            >
              <Flame size={16} /> Picante
            </motion.button>
          </div>
        </div> */}

        {/* Categorías */}
        {/* <motion.div initial="hidden" animate="show" className="cats">
          {CATEGORIES.map((c, i) => (
            <motion.button
              key={c.key}
              variants={chip}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCategory(c.key)}
              className={`chip ${category === c.key ? "chip-cat-on" : ""}`}
            >
              {c.icon}
              {c.key}
            </motion.button>
          ))}
        </motion.div> */}
      </header>

      {/* Grid de productos */}
      <main className="container main">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="empty"
            >
              No encontramos platillos con esos filtros. Prueba quitando alguno.
              🍽️
            </motion.div>
          ) : (
            <motion.div layout className="grid">
              {filtered.map((item, idx) => (
                <motion.div
                  layout
                  key={item.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="show"
                  transition={{ delay: idx * 0.04 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <span className="column">
                          <img src={item.img} className="img-product"></img>
                          <span>{item.name}</span>
                          {/* <Price value={item.price} /> */}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="desc">{item.description}</p>
                      {!item.no && (
                        <>
                          <p className="desc">{item.only}</p>
                          <p className="desc">{item.combo}</p>
                        </>
                      )}

                      {item.no && <p className="desc">Precio: {item.price}</p>}
                      {/* <div className="tags">
                        {item.tags.map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                        {item.vegan && <Tag>vegano</Tag>}
                        {item.spicy && <Badge variant="danger">picante</Badge>}
                      </div> */}
                      {/* <div className="actions">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => addToCart(item.id)}
                          className="btn-gradient"
                        >
                          Agregar
                        </motion.button>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="idx"
                        >
                          #{idx + 1}
                        </motion.span>
                      </div> */}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer alegre */}
      <footer className="footer">
        <div className="container footer-row">
          <div className="footer-left">
            <Utensils size={16} />
            <span>
              © {new Date().getFullYear()} Saborcito Feliz — hecho con amor y
              muchas ganas de comer.
            </span>
          </div>
          <div className="footer-right">
            <span className="muted">Sigue nuestro mood:</span>
            <div className="moods">
              {["🍍", "🍓", "🌶️", "🥑", "🍋"].map((e, i) => (
                <motion.span
                  key={i}
                  whileHover={{ y: -2 }}
                  className="mood-item"
                >
                  {e}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
