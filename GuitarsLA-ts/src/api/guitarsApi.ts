// Dirección de la API (se configura en el archivo .env)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

// GET: trae todas las guitarras de la base de datos
export async function getGuitars(): Promise<Guitar[]> {
    const response = await fetch(`${API_URL}/guitars`)
    if (!response.ok) {
        throw new Error('No se pudo obtener el catálogo')
    }
    return response.json()
}

// POST: registra una guitarra nueva
export async function createGuitar(guitar: NewGuitar): Promise<Guitar> {
    const response = await fetch(`${API_URL}/guitars`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(guitar)
    })
    const data = await response.json()

    if (!response.ok) {
        // el backend responde { errors: [...] }
        const errors: string[] = data.errors ?? ['No se pudo guardar la guitarra']
        throw new Error(errors.join(', '))
    }
    return data
}
