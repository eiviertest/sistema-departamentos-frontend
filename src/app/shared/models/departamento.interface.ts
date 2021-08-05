//Estructura de lo que se va enviar
export interface Departamento {
    descripcion: string;
    planta: number;
    fechaCreacion: Date;
    cveEncargado: number;
}

//Estructura de lo que se va recibir
export interface DepartamentoResponse {
    message: string;
    token: string;
    cveDepa: string;
    descripcion: string;
    planta: number;
    fechaConstruccion: Date;
    cveEncargado: number;
}