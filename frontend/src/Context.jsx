import { createContext,useContext, useReducer,  } from "react"
import Api from "/Api/Api"


export const ProductContext = ({children}) => {

    let data = {state, dispatch}
    return (
        <ProductStates.Provider value={data}>
            {children}
        </ProductStates.Provider>
    )
}


export default ProductContext

export const useProductStates = () => useContext(ProductStates)