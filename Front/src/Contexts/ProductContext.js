import {createContext} from "react";

export const ProductContext = createContext(null);

export const ProductProvider = ProductContext.Provider;
export const ProductConsumer = ProductContext.Consumer;
export default ProductContext;
