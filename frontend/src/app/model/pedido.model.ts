export interface Pedido {
    id_pedido: number;
    cod_PECA_DATASUL: number;
    nome_peca: string;
    part_number: string;
    ordem_servico: number;
    fabricante: string;
    data_pedidos: Date;
    data_fechamento: Date;
    usuarios_abertura: string;
    usuarios_fechamento: string;
    status: string;
    selecionado?: boolean;
  }
  