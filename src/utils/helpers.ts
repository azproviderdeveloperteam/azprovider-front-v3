
import Cookies from "js-cookie";

export const getJWT = (from?: string) => {
    const jwt = Cookies.get('cookieToken');

    return jwt
}