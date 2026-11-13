import { useState } from "react"

const EMPTY_FORM: GuitarFormValues = { name: '', description: '', price: '', image: '' }

// imágenes disponibles en /public/img
const IMAGES = Array.from({ length: 12 }, (_, i) => `guitarra_${String(i + 1).padStart(2, '0')}`)

// Validaciones del cliente (antes de hacer la petición)
function validate(values: GuitarFormValues): GuitarFormErrors {
    const errors: GuitarFormErrors = {}

    if (values.name.trim() === '') errors.name = 'El nombre es obligatorio'
    if (values.description.trim() === '') errors.description = 'La descripción es obligatoria'
    if (values.image === '') errors.image = 'Selecciona una imagen'

    if (values.price.trim() === '') {
        errors.price = 'El precio es obligatorio'
    } else if (Number.isNaN(Number(values.price))) {
        errors.price = 'El precio debe ser un número'
    } else if (Number(values.price) <= 0) {
        errors.price = 'El precio debe ser mayor a 0'
    }

    return errors
}

export default function GuitarForm({ addGuitar }: GuitarFormProps) {
    const [values, setValues] = useState(EMPTY_FORM)
    const [errors, setErrors] = useState<GuitarFormErrors>({})
    const [serverError, setServerError] = useState('')
    const [success, setSuccess] = useState('')
    const [saving, setSaving] = useState(false)

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setValues({ ...values, [e.target.name]: e.target.value })
        setSuccess('')
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setServerError('')
        setSuccess('')

        const newErrors = validate(values)
        setErrors(newErrors)
        if (Object.keys(newErrors).length > 0) return

        setSaving(true)
        try {
            await addGuitar({
                name: values.name.trim(),
                description: values.description.trim(),
                image: values.image,
                price: Number(values.price)
            })
            setValues(EMPTY_FORM)
            setSuccess('Guitarra guardada correctamente')
        } catch (error) {
            setServerError(error instanceof Error ? error.message : 'Error al guardar')
        } finally {
            setSaving(false)
        }
    }

    return (
        <form className="guitar-form" onSubmit={handleSubmit} noValidate>
            <h3 className="text-center mb-4">Agregar nueva guitarra</h3>

            <label htmlFor="name">Nombre</label>
            <input id="name" name="name" type="text" value={values.name} onChange={handleChange} />
            {errors.name && <p className="form-error">{errors.name}</p>}

            <label htmlFor="description">Descripción</label>
            <textarea id="description" name="description" rows={3} value={values.description} onChange={handleChange} />
            {errors.description && <p className="form-error">{errors.description}</p>}

            <label htmlFor="price">Precio</label>
            <input id="price" name="price" type="number" step="0.01" value={values.price} onChange={handleChange} />
            {errors.price && <p className="form-error">{errors.price}</p>}

            <label htmlFor="image">Imagen</label>
            <select id="image" name="image" value={values.image} onChange={handleChange}>
                <option value="">-- Selecciona una imagen --</option>
                {IMAGES.map(image => (
                    <option key={image} value={image}>{image}</option>
                ))}
            </select>
            {errors.image && <p className="form-error">{errors.image}</p>}

            {serverError && <p className="form-error">{serverError}</p>}
            {success && <p className="form-success">{success}</p>}

            <button type="submit" className="btn btn-dark w-100 mt-3" disabled={saving}>
                {saving ? 'Guardando...' : 'Guardar guitarra'}
            </button>
        </form>
    )
}
