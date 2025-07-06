export interface IDemandWithAccentuation {
    'ID da demanda': number;
    Fornecedor: string;
    Status: string;
    'Município de origem': string;
    Origem: string;
    'Município de destino': string;
    Destino: string;
    'Código do item': string;
    EAN: string;
    'Código do pedido': string;
    'Valor Unitário': number;
    Setor: string;
    Produto: string;
    'Unidade de medida': string;
    'Data de criação': string;
    'Observação/Fornecedor': string;
    Quantidade: number;
    'Data sugerida de entrega pelo fornecedor': string;
    'Reserva de slot?': string;
    'Data efetiva da entrega': string;
    Observação: string;
    'Tipo de Demanda': string;
}

export interface IDemand {
    id: number;
    fornecedor: string;
    status: string;
    municipio_origem: string;
    origem: string;
    municipio_destino: string;
    destino: string;
    codigo_item: string;
    ean: string;
    codigo_pedido: string;
    valor_unitario: number;
    setor: string;
    produto: string;
    unidade_medida: string;
    data_criacao: string;
    observacao_fornecedor: string;
    quantidade: number;
    data_sugerida_entrega_pelo_fornecedor: string;
    reserva_slot: string;
    data_entrega: string;
    observacao: string;
    tipo_demanda: string;
}

export interface WorkerXlsxResponse {
    alert?: boolean;
    message: string;
    totalDemands?: number;
    time?: string;
    data?: IDemand[];
    progress?: {
        current: number;
        total: number;
        percentage: number;
    };
    batch?: {
        size: number;
        items: Array<{
            id: string;
            status: string;
        }>;
    };
    executionTime?: {
        milliseconds: number;
        seconds: number;
    };
    completed?: boolean;
}
