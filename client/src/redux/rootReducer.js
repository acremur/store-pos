const initialState = {
    loading: false,
    cartItems: [],
    collapsed: false
}

export const rootReducer = (state=initialState, action) => {
    switch (action.type) {

        case 'addToCart': return {
            ...state,
            cartItems: [ ...state.cartItems, action.payload ]
        }

        case 'deleteFromcart': return {
            ...state,
            cartItems: state.cartItems.filter(item => item._id !== action.payload._id)
        } 

        case 'emptyCart': return {
            ...state,
            cartItems: []
        }

        case 'updateCart': return {
            ...state,
            cartItems: state.cartItems.map(item => (
                item._id === action.payload._id
                ? { ...item, quantity: action.payload.quantity }
                : item
            ))
        }

        case 'showLoading': return {
            ...state,
            loading: true
        }
        
        case 'hideLoading': return {
            ...state,
            loading: false
        }

        case 'collapse': return {
            ...state,
            collapsed: true
        }
        
        default: return state
    }
}