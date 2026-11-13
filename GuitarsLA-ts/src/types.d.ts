

type Guitar={
         id: number;
    name: string;
    image: string;
    description: string;
    price: number;
    }
      type CartItem= Guitar&{
           quantity:number;

    }

    type GuitarProps={
    guitar:Guitar,
    addToCart:((item:Guitar)=>void )
}

type CartProp={
cart: CartItem[],
        decreaseQuantity: (item: number) => void,
        increaseQuantity: (item: number) => void,
        removeFromCart: (item: number) => void,
        clearCart: () => void,
        isEmpty: boolean,
        cartTotal: number

}

// Guitarra nueva (todavía sin id, lo asigna la base de datos)
type NewGuitar = Omit<Guitar, 'id'>

// Valores del formulario: los inputs siempre devuelven texto
type GuitarFormValues = {
    name: string;
    description: string;
    price: string;
    image: string;
}

type GuitarFormErrors = Partial<Record<keyof GuitarFormValues, string>>

type GuitarFormProps = {
    addGuitar: (guitar: NewGuitar) => Promise<void>;
}
