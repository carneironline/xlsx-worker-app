# XLSX Worker App

Um projeto Next.js desenvolvido para testar e demonstrar o uso de Web Workers para processamento de arquivos Excel (.xlsx) de forma assíncrona, sem bloquear a interface do usuário.

## 📋 Sobre o Projeto

Esta aplicação foi criada como um teste de conceito para processamento de planilhas Excel utilizando Web Workers. O objetivo é demonstrar como processar grandes volumes de dados em arquivos XLSX sem travamento da interface, mantendo a responsividade da aplicação.

## 🚀 Tecnologias Utilizadas

-   **Next.js 15.3.5** - Framework React com App Router
-   **React 19** - Biblioteca para interface do usuário
-   **TypeScript** - Linguagem de programação tipada
-   **Tailwind CSS 4** - Framework CSS para estilização
-   **Radix UI** - Componentes de interface acessíveis
-   **XLSX 0.18.5** - Biblioteca para leitura de arquivos Excel
-   **Web Workers** - Para processamento assíncrono em background

## 🎯 Funcionalidades

-   ✅ **Upload de arquivos XLSX** através de interface intuitiva
-   ✅ **Processamento assíncrono** usando Web Workers
-   ✅ **Interface responsiva** que não trava durante o processamento
-   ✅ **Sistema de alertas** para feedback em tempo real
-   ✅ **Medição de performance** do processamento
-   ✅ **Tratamento de dados** com tipagem TypeScript

## 🏗️ Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── page.tsx           # Página principal
│   └── layout.tsx         # Layout base
├── components/            # Componentes React
│   ├── import-xlsx-card/  # Componente principal de upload
│   ├── ui/               # Componentes de interface (shadcn/ui)
│   └── layout/           # Componentes de layout
├── workers/              # Web Workers
│   └── xlsxWorker/       # Worker para processamento XLSX
│       ├── xlsxWorker.ts # Lógica do worker
│       └── types.ts      # Tipos TypeScript
├── store/                # Gerenciamento de estado
│   └── AlertContext.tsx  # Context para alertas
└── lib/                  # Utilitários
    └── utils.ts          # Funções auxiliares
```

## 🔧 Como o Worker Funciona

O Web Worker (`xlsxWorker.ts`) é responsável por:

1. **Receber o arquivo** via `postMessage()`
2. **Ler o arquivo XLSX** usando a biblioteca `xlsx`
3. **Converter para JSON** com tipagem TypeScript
4. **Processar os dados** (simulação com delay)
5. **Enviar feedback** para a interface principal
6. **Retornar dados processados** ou erros

### Fluxo de Processamento

```typescript
// 1. Arquivo é enviado para o worker
workerRef.current.postMessage(arrayBuffer);

// 2. Worker processa e envia updates
self.postMessage({
    alert: true,
    message: 'Processando os dados do arquivo',
});

// 3. Interface recebe feedback em tempo real
workerRef.current.onmessage = (event) => {
    const data: WorkerXlsxResponse = event.data;
    // Atualiza UI sem travamento
};
```

## 🚀 Como Executar

### Pré-requisitos

-   Node.js (versão 18 ou superior)
-   npm, yarn ou pnpm

### Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd xlsx-worker-app
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Execute o projeto em modo de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. Acesse `http://localhost:3000` no seu navegador

### Scripts Disponíveis

-   `npm run dev` - Executa em modo desenvolvimento com Turbopack
-   `npm run build` - Gera build de produção
-   `npm run start` - Executa build de produção
-   `npm run lint` - Executa verificação de código

## 📁 Formato de Arquivo Esperado

O worker está configurado para processar planilhas com as seguintes colunas (estrutura de demandas):

```typescript
interface IDemand {
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
```

## 🎨 Interface

A aplicação utiliza:

-   **Componentes Radix UI** para acessibilidade
-   **Tailwind CSS** para estilização moderna
-   **Sistema de alertas** contextual
-   **Design responsivo** e intuitivo

## 🔧 Customização

### Modificar o Worker

Para adaptar o worker para outros tipos de dados:

1. Edite `src/workers/xlsxWorker/types.ts` com sua interface
2. Modifique `src/workers/xlsxWorker/xlsxWorker.ts` conforme necessário
3. Atualize os componentes que consomem os dados

### Adicionar Processamento Customizado

O worker inclui funções auxiliares como:

-   `processarComDelay()` - Para processamento item por item
-   `measureExecutionTime()` - Para medição de performance
-   `delay()` - Para simulação de operações assíncronas

## 📊 Performance

O projeto inclui medição de tempo de execução e permite:

-   Processamento de arquivos grandes sem travamento da UI
-   Feedback em tempo real do progresso
-   Tratamento de erros gracioso
-   Cancelamento de operações (implementação disponível)

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto é um teste de conceito e está disponível para uso educacional e de demonstração.

## 🔗 Recursos Úteis

-   [Next.js Documentation](https://nextjs.org/docs)
-   [Web Workers MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
-   [XLSX Library](https://sheetjs.com/)
-   [Radix UI](https://www.radix-ui.com/)
-   [Tailwind CSS](https://tailwindcss.com/)

---

**Nota**: Este projeto foi desenvolvido para fins de teste e demonstração do uso de Web Workers com processamento de arquivos XLSX em aplicações Next.js.
