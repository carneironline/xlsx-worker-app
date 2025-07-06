// Importar a biblioteca XLSX
importScripts('/workers/xlsx.full.min.js');

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
        self.postMessage({
            alert: true,
            message: 'Processamento concluído',
            totalDemands: data.length,
            time: new Date().toISOString(),
            data: data,
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

function measureExecutionTime(func) {
    console.log('Iniciando medição de tempo de execução');
    const inicio = performance.now();
    func();
    const fim = performance.now();
    const tempoMs = fim - inicio;
    const tempoSegundos = tempoMs / 1000;

    console.log(`Tempo de execução: ${tempoSegundos.toFixed(2)} s`);
}
