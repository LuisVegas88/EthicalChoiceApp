import {createContext} from "react";

export const UserContext = createContext(null);

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;

export default UserContext;