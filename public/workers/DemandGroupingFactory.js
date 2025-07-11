class DemandGroupingFactory {
    static groupPedidosByDemanda(pedidosData) {
        const demandas = []
        const demandasAgrupadas = {};

        pedidosData.forEach((pedido, index) => {
            try {
                const demandaId = pedido['id'];
                
                if (!demandasAgrupadas[demandaId]) {
                    demandasAgrupadas[demandaId] = {
                        demandaId: demandaId,
                        fornecedor: pedido.Fornecedor || pedido.fornecedor || 'Não informado',
                        totalPedidos: 0,
                        pedidos: [],
                        criadoEm: new Date()
                    };
                }

                demandasAgrupadas[demandaId].pedidos.push(pedido);
                demandasAgrupadas[demandaId].totalPedidos++;
            } catch (error) {
                console.warn(`Erro ao processar pedido ${index}:`, error.message);
            }
        });

        Object.keys(demandasAgrupadas).forEach(demandaId => {
            const demanda = demandasAgrupadas[demandaId];
            demandas.push(demanda)

        });

        return demandas;
    }  
}

