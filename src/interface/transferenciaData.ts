export interface ApiResponse {
    content: TransferenciaData[],
    totalPages: number
}

export interface TransferenciaData {
    id?: number,
    dataTransferencia: string,
    valor: number,
    tipo: string,
    nomeOperadorTransacao: string,
    contaId: number
}