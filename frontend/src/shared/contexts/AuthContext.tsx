import { createContext, useCallback, useState, useContext, useMemo, useEffect } from 'react';
import { AuthService } from '../services/api';


interface IAuthContextData {
    isAuthenticated: boolean;
    logout: () => void;
    login: (email: string, password: string) => Promise<string | void>;
}

interface IAuthProviderProps {
    children: React.ReactNode
}


const AuthContext = createContext({} as IAuthContextData);


export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string>();

    useEffect(() => {
        const accessToken = localStorage.getItem('@dpApiAccess');

        if(accessToken){
            setAccessToken(JSON.parse(accessToken));
        }
        else{
            setAccessToken(undefined);
            localStorage.clear();
        }
    }, []);

    const handleLogin = useCallback(async (email: string, password: string) => {
        const result = await AuthService.auth(email, password);
        if (result instanceof Error){
            return result.message;
        }
        else{
            localStorage.setItem('@dpApiAccess', JSON.stringify(result.accessToken));
            setAccessToken(result);
        }

    }, []);

    const handleLogout = useCallback(() => {
        localStorage.removeItem('@dpApiAccess');
        setAccessToken(undefined);
    }, []);

    const handleIsAuthenticated = useMemo(() => !!accessToken, [accessToken]);

    return (
        <AuthContext.Provider value={{ isAuthenticated: handleIsAuthenticated, login: handleLogin, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);