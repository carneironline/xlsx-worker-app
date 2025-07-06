importScripts('https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/shim.min.js');
importScripts('https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js');

self.onmessage = async (event) => {
    self.postMessage({
        alert: true,
        message: 'Iniciando o processamento do arquivo',
    });

    await delay(2000);

    measureExecutionTime(async () => {
        const fileBuffer = event.data;
        const workbook = XLSX.read(fileBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        console.log('workbook:', workbook);

        self.postMessage({
            alert: true,
            message: 'Processando os dados do arquivo',
        });
        const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: '' });
        const data = jsonData.map((item) => item);

        await delay(3000);

        // Simulação de envio das demandas ao backend
        await simularEnvioBackend(data);

        self.postMessage({
            alert: true,
            message: 'Processamento concluído',
            totalDemands: data.length,
            time: new Date().toISOString(),
            data: data,
            completed: true,
        });
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

async function measureExecutionTime(func) {
    console.log('Iniciando medição de tempo de execução');
    const inicio = performance.now();
    await func();
    const fim = performance.now();
    const tempoMs = fim - inicio;
    const tempoSegundos = tempoMs / 1000;

    console.log(`Tempo de execução: ${tempoSegundos.toFixed(2)} s`);

    self.postMessage({
        alert: true,
        message: `Tempo total de execução: ${tempoSegundos.toFixed(2)}s`,
        executionTime: {
            milliseconds: tempoMs,
            seconds: tempoSegundos,
        },
    });
}

async function simularEnvioBackend(data) {
    const totalDemands = data.length;
    let demandsSent = 0;
    let demandsWithError = 0;
    let demandsSuccess = 0;

    self.postMessage({
        alert: true,
        message: `Iniciando envio de ${totalDemands} demandas`,
        progress: {
            current: 0,
            total: totalDemands,
            percentage: 0,
        },
        errors: {
            count: 0,
            success: 0,
        },
    });

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
            const hasError = Math.random() < 0.1; // 10% de chance de erro
            const itemId = item.id || item['ID da demanda'] || `item-${i + index + 1}`;

            if (hasError) {
                demandsWithError++;
                return {
                    id: itemId,
                    status: 'erro',
                    error: getRandomError(),
                };
            } else {
                demandsSuccess++;
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

        const statusMessage = `Processando: ${demandsSent}/${totalDemands} (${percentage}%) | ✅ ${demandsSuccess} | ❌ ${demandsWithError}`;

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

    // Determinar o tipo de conclusão baseado nos erros
    const hasErrors = demandsWithError > 0;
    const successRate = ((demandsSuccess / totalDemands) * 100).toFixed(1);

    self.postMessage({
        alert: true,
        message: hasErrors
            ? `Processamento concluído com ${demandsWithError} erro(s). Taxa de sucesso: ${successRate}%`
            : `Todas as ${totalDemands} demandas foram enviadas com sucesso!`,
        progress: {
            current: totalDemands,
            total: totalDemands,
            percentage: 100,
        },
        errors: {
            count: demandsWithError,
            success: demandsSuccess,
        },
        completed: true,
        hasErrors: hasErrors,
    });
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
