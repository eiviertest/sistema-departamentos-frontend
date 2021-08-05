//Estructura de lo que se va enviar
export interface User{
    username: string;
    password: string;
}

//Estructura de lo que se va recibir
export interface UserResponse{
    message: string;
    token: string;
    cveUsuario: string;
    username: string;
}