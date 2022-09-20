import { createContext } from 'react'

const userContext = createContext(null);

export const UserProvider = userContext.Provider;
export default userContext;