import Guitar from "./components/Guitar"
import GuitarForm from "./components/GuitarForm"
import Header from "./components/Header"
import { useCart } from "./hooks/useCart"
import { useGuitars } from "./hooks/useGuitars"

function App() {
    const { cart,
        addToCart,
        decreaseQuantity,
        increaseQuantity,
        removeFromCart,
        clearCart,
        isEmpty,
        cartTotal } = useCart();

    // el catálogo ahora viene de la API (PostgreSQL)
    const { guitars, loading, error, addGuitar } = useGuitars();

    return (
        <>
            <Header
                cart={cart}
                decreaseQuantity={decreaseQuantity}
                increaseQuantity={increaseQuantity}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                isEmpty={isEmpty}
                cartTotal={cartTotal}
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                {loading && <p className="text-center mt-5">Cargando guitarras...</p>}
                {error && <p className="form-error text-center mt-5">{error}</p>}
                {!loading && !error && guitars.length === 0 && (
                    <p className="text-center mt-5">Todavía no hay guitarras registradas</p>
                )}

                <div className="row mt-5">
                    {guitars.map((guitar) => (
                        <Guitar
                            key={guitar.id}
                            guitar={guitar}
                            addToCart={addToCart}
                        />
                    ))}
                </div>

                <GuitarForm addGuitar={addGuitar} />
            </main>

            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
                </div>
            </footer>
        </>
    )
}

export default App
