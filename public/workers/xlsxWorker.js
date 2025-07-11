importScripts('https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/shim.min.js');
importScripts('https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js');
importScripts('DemandGroupingFactory.js');

self.onmessage = async (event) => {
    self.postMessage({
        alert: true,
        message: 'Iniciando o processamento do arquivo',
    });

    await delay(1000);

    const fileBuffer = event.data;
    const workbook = XLSX.read(fileBuffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    console.log('workbook:', workbook);

    const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: '' });
    const data = jsonData.map((item) => item);
    const demands = DemandGroupingFactory.groupPedidosByDemanda(data);
    console.log(demands);

    self.postMessage({
        alert: true,
        message: `Iniciando envio de ${demands.length} demandas`,
        progress: {
            current: 0,
            total: demands.length,
            percentage: 0,
        },
        errors: {
            count: 0,
            success: 0,
        },
    });

    await delay(2000);

    console.log('Iniciando medição de tempo de execução');
    const inicio = performance.now();

    const processResult = await simulateApiRequest(demands);

    const fim = performance.now();
    const tempoMs = fim - inicio;
    const tempoSegundos = tempoMs / 1000;

    console.log(`Tempo de execução: ${tempoSegundos.toFixed(2)} s`);
    console.log('Demandas não processadas:', processResult.demandsDataWithError);

    self.postMessage({
        alert: true,
        message: 'Processamento finalizado!',
        totalDemands: demands.length,
        time: new Date().toISOString(),
        data: {
            all: demands,
            success: processResult.demandsDataWithSuccess,
            errors: processResult.demandsDataWithError,
        },
        completed: true,
        processResult,
        hasErrors: processResult.hasErrors,
        errors: {
            count: processResult.demandsWithError,
            success: processResult.demandsSuccess,
        },
        executionTime: {
            milliseconds: tempoMs,
            seconds: tempoSegundos,
        },
        progress: {
            current: processResult.totalDemands,
            total: processResult.totalDemands,
            percentage: 100,
        },
    });
};

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function processarComDelay({ data, delayTimeMs = 50 }) {
    for (const item of data) {
        console.log(`Processando pedido ${item.id}:`);
        self.postMessage({
            alert: true,
            message: `Processando pedido ${item.id}:`,
            item,
        });

        await delay(delayTimeMs);
    }
}

async function simulateApiRequest(data) {
    const totalDemands = data.length;
    let demandsSent = 0;
    let demandsDataWithError = [];
    let demandsDataWithSuccess = [];
    let demandsWithError = 0;
    let demandsSuccess = 0;

    // Simular envio em lotes menores para melhor visualização do progresso
    const batchSize = Math.max(1, Math.ceil(totalDemands / 20)); // Máximo 20 atualizações de progresso

    for (let i = 0; i < totalDemands; i += batchSize) {
        const batch = data.slice(i, i + batchSize);

        // Simular tempo de envio do lote - mais realista com variação
        const baseDelay = 300;
        const variableDelay = Math.random() * 700; // 300ms a 1s por lote
        await delay(baseDelay + variableDelay);

        // Simular erros aleatórios (5-15% de chance de erro por item)
        const batchResults = batch.map((item, index) => {
            const hasError = Math.random() < 0.9; // 10% de chance de erro
            const itemId = item.id || item['ID da demanda'] || `item-${i + index + 1}`;

            if (hasError) {
                demandsWithError++;
                demandsDataWithError.push(item);
                return {
                    id: itemId,
                    status: 'erro',
                    error: getRandomError(),
                };
            } else {
                demandsSuccess++;
                demandsDataWithSuccess.push(item);

                return {
                    id: itemId,
                    status: 'enviado',
                };
            }
        });

        demandsSent += batch.length;
        const percentage = Math.round((demandsSent / totalDemands) * 100);

        // Preparar informações do lote para exibição (primeiros 3 itens)
        const batchInfo = batchResults.slice(0, 3);

        const statusMessage = `Processando: ${demandsSent}/${totalDemands}`;

        self.postMessage({
            alert: true,
            message: statusMessage,
            progress: {
                current: demandsSent,
                total: totalDemands,
                percentage: percentage,
            },
            batch: {
                size: batch.length,
                items: batchInfo,
                errors: batchResults.filter((item) => item.status === 'erro'),
            },
            errors: {
                count: demandsWithError,
                success: demandsSuccess,
            },
        });
    }

    // Simular delay final de confirmação
    await delay(800);

    // Retornar os resultados para serem usados pela função principal
    return {
        totalDemands,
        demandsSuccess,
        demandsDataWithSuccess,
        demandsWithError,
        demandsDataWithError,
        hasErrors: demandsWithError > 0,
        successRate: ((demandsSuccess / totalDemands) * 100).toFixed(1),
    };
}

function getRandomError() {
    const errors = [
        'Erro de conexão com o servidor',
        'Dados inválidos na demanda',
        'Timeout na requisição',
        'Fornecedor não encontrado',
        'Produto indisponível',
        'Erro de validação de dados',
        'Limite de requisições excedido',
        'Erro interno do servidor',
    ];
    return errors[Math.floor(Math.random() * errors.length)];
}
