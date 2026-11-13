import { useState, useEffect } from "react"
import { getGuitars, createGuitar } from "../api/guitarsApi"

// Maneja el catálogo que viene de la API (lectura y creación)
export const useGuitars = () => {
    const [guitars, setGuitars] = useState<Guitar[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        getGuitars()
            .then(setGuitars)
            .catch(() => setError('No se pudo cargar el catálogo. Revisa que el servidor esté encendido.'))
            .finally(() => setLoading(false))
    }, [])

    async function addGuitar(newGuitar: NewGuitar) {
        const saved = await createGuitar(newGuitar)
        setGuitars(prev => [...prev, saved])
    }

    return {
        guitars,
        loading,
        error,
        addGuitar
    }
}
