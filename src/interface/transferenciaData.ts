export interface ApiResponse {
    content: TransferenciaData[],
    pageable: {
        totalPages: number
    }
}

export interface TransferenciaData {
    id?: number,
    dataTransferencia: string,
    valor: number,
    tipo: string,
    nomeOperadorTransacao: string,
    contaId: number
}