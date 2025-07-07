# XLSX Worker App

Um projeto Next.js avançado desenvolvido para demonstrar o uso de Web Workers para processamento de arquivos Excel (.xlsx) de forma assíncrona, com simulação de erros, relatórios detalhados e feedback em tempo real, sem bloquear a interface do usuário.

## 🌐 Demo Online

**Visualize o projeto em produção:** [https://xlsx-worker-app.vercel.app](https://xlsx-worker-app.vercel.app)

## 📋 Sobre o Projeto

Esta aplicação foi criada como um teste de conceito avançado para processamento de planilhas Excel utilizando Web Workers. O objetivo é demonstrar como processar grandes volumes de dados em arquivos XLSX com simulação realista de cenários de produção, incluindo tratamento de erros, métricas de performance e feedback detalhado, mantendo a responsividade da aplicação.

## 🚀 Tecnologias Utilizadas

-   **Next.js 15.3.5** - Framework React com App Router
-   **React 19** - Biblioteca para interface do usuário
-   **TypeScript** - Linguagem de programação tipada
-   **Tailwind CSS** - Framework CSS para estilização moderna
-   **Radix UI** - Componentes de interface acessíveis
-   **XLSX (SheetJS)** - Biblioteca para leitura de arquivos Excel via CDN
-   **Web Workers** - Para processamento assíncrono em background
-   **Lucide React** - Ícones modernos e acessíveis

## 🎯 Funcionalidades Avançadas

### ✅ **Processamento de Arquivos**

-   **Upload de arquivos XLSX** através de interface intuitiva
-   **Processamento assíncrono** usando Web Workers sem travamento da UI
-   **Leitura automática** da primeira planilha do arquivo
-   **Conversão para JSON** com tipagem TypeScript completa

### ✅ **Simulação Realista de Produção**

-   **Simulação de erros** com 10% de taxa configurável
-   **8 tipos diferentes de erros** simulados (conexão, timeout, validação, etc.)
-   **Processamento em lotes** para otimização de performance
-   **Tempos de resposta variáveis** (300ms a 1s por lote)

### ✅ **Feedback em Tempo Real**

-   **Barra de progresso** animada com porcentagem
-   **Contadores em tempo real** de sucessos e erros
-   **Indicadores visuais** coloridos (verde/vermelho)
-   **Progresso por lote** com informações detalhadas

### ✅ **Relatórios Detalhados**

-   **Relatório final estruturado** com 6 linhas de estatísticas:
    -   📊 Total processado
    -   ✅ Sucessos
    -   ❌ Erros
    -   📈 Taxa de sucesso
    -   ⏱️ Tempo de execução
-   **Medição de performance** com precisão de milissegundos
-   **Cálculo automático** de taxas de sucesso

### ✅ **Interface Moderna**

-   **Sistema de alertas** contextual com animações
-   **Design responsivo** otimizado para mobile e desktop
-   **Tipografia clara** com renderização de quebras de linha
-   **Navegação intuitiva** entre páginas

## 🏗️ Estrutura do Projeto

```
xlsx-worker-app2/
├── public/
│   └── workers/
│       ├── xlsx.full.min.js    # Biblioteca XLSX via CDN
│       └── xlsxWorker.js       # Web Worker para processamento
├── src/
│   ├── app/                    # App Router do Next.js
│   │   ├── page.tsx           # Página principal
│   │   ├── layout.tsx         # Layout base
│   │   └── usuarios/          # Página de usuários (demo)
│   ├── components/            # Componentes React
│   │   ├── AlertComponent.tsx # Componente de alertas avançado
│   │   ├── import-xlsx-card/  # Componente principal de upload
│   │   ├── ui/               # Componentes shadcn/ui
│   │   └── layout/           # Componentes de layout
│   ├── store/                # Gerenciamento de estado
│   │   └── AlertContext.tsx  # Context para alertas
│   ├── types/                # Tipos TypeScript
│   │   └── workers.ts        # Interfaces do worker
│   └── lib/                  # Utilitários
│       └── utils.ts          # Funções auxiliares
├── components.json           # Configuração shadcn/ui
├── eslint.config.mjs        # Configuração ESLint
├── next.config.ts           # Configuração Next.js
├── postcss.config.mjs       # Configuração PostCSS
├── tailwind.config.ts       # Configuração Tailwind
└── tsconfig.json           # Configuração TypeScript
```

## 🔧 Como o Worker Funciona

O Web Worker (`xlsxWorker.js`) implementa um fluxo completo de processamento:

### **Etapas do Processamento:**

1. **Inicialização** - Carrega biblioteca XLSX via CDN
2. **Recebimento** - Recebe arquivo via `postMessage()`
3. **Leitura** - Processa arquivo XLSX usando SheetJS
4. **Conversão** - Converte para JSON com tipagem TypeScript
5. **Simulação** - Simula envio ao backend com erros realistas
6. **Progresso** - Envia atualizações em tempo real
7. **Relatório** - Gera estatísticas detalhadas finais

### **Funcionalidades Avançadas do Worker:**

-   **Simulação de erros** com 8 tipos diferentes de mensagens
-   **Processamento em lotes** otimizado (máximo 20 atualizações)
-   **Medição de tempo** de execução completa
-   **Feedback granular** por lote processado
-   **Cálculos automáticos** de taxas de sucesso
-   **Tratamento robusto** de diferentes formatos de dados

### **Fluxo de Processamento Detalhado**

```typescript
// 1. Arquivo é enviado para o worker
workerRef.current.postMessage(arrayBuffer);

// 2. Worker processa com feedback em tempo real
self.postMessage({
    alert: true,
    message: 'Processando: 50/100 (50%) | ✅ 45 | ❌ 5',
    progress: { current: 50, total: 100, percentage: 50 },
    errors: { count: 5, success: 45 },
});

// 3. Interface recebe atualizações sem travamento
workerRef.current.onmessage = (event) => {
    const data: WorkerXlsxResponse = event.data;
    // Atualiza barra de progresso, contadores e alertas
};

// 4. Relatório final detalhado
const finalMessage = `Processamento finalizado!
📊 Total processado: 100
✅ Sucesso: 90
❌ Erros: 10
📈 Taxa de sucesso: 90.0%
⏱️ Tempo total: 12.45s`;
```

## 🎨 **Componentes de Interface**

### **AlertComponent.tsx**

-   **Alertas contextuais** com tipos success/error/info
-   **Barra de progresso** animada com CSS transitions
-   **Contadores visuais** com indicadores coloridos
-   **Renderização de quebras de linha** para relatórios
-   **Botão de fechamento** com ícone X interativo

### **ImportXlsxCard.tsx**

-   **Input de arquivo** estilizado para XLSX
-   **Integração com worker** via postMessage
-   **Gerenciamento de estado** do upload
-   **Limpeza automática** após processamento

### **Contexto Global**

-   **AlertContext** para gerenciamento de estado dos alertas
-   **Tipagem completa** com TypeScript
-   **Providers** configurados no layout raiz

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

## 📁 **Formato de Arquivo Suportado**

O worker aceita arquivos XLSX e está otimizado para processar planilhas com qualquer estrutura. O sistema é flexível e funciona com:

### **Estrutura de Exemplo (Demandas):**

```typescript
interface IDemandWithAccentuation {
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
```

### **Formato Interno Normalizado:**

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

**Nota:** O sistema é flexível e pode processar planilhas com diferentes estruturas, adaptando automaticamente os nomes das colunas.

## 🎨 **Interface e Experiência do Usuário**

### **Design System**

-   **Componentes Radix UI** para acessibilidade e padrões modernos
-   **Tailwind CSS** para estilização responsiva e consistente
-   **Sistema de alertas** contextual com animações suaves
-   **Tipografia clara** com hierarquia bem definida
-   **Cores semânticas** (verde para sucesso, vermelho para erro)

### **Responsividade**

-   **Layout adaptativo** para desktop, tablet e mobile
-   **Alertas posicionados** de forma inteligente por dispositivo
-   **Componentes flexíveis** que se ajustam ao conteúdo
-   **Performance otimizada** em diferentes resoluções

### **Acessibilidade**

-   **Componentes semânticos** do Radix UI
-   **Contraste adequado** para textos e ícones
-   **Navegação por teclado** em todos os elementos interativos
-   **Indicadores visuais** claros para diferentes estados

## 🔧 **Customização e Extensibilidade**

### **Modificar Tipos de Erro**

```javascript
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
    // Adicione seus próprios tipos de erro aqui
    return errors[Math.floor(Math.random() * errors.length)];
}
```

### **Ajustar Taxa de Erro**

```javascript
// Linha 115 do xlsxWorker.js
const hasError = Math.random() < 0.1; // 10% de chance de erro
// Altere 0.1 para sua taxa desejada (0.05 = 5%, 0.2 = 20%)
```

### **Personalizar Processamento**

O worker inclui funções auxiliares reutilizáveis:

-   `delay(ms)` - Para simulação de latência
-   `simulateApiRequest(data)` - Para processamento customizado
-   `getRandomError()` - Para tipos de erro personalizados

### **Adaptar para Outros Formatos**

Para processar diferentes tipos de planilhas:

1. Modifique as interfaces em `src/types/workers.ts`
2. Ajuste a lógica de mapeamento no worker
3. Atualize os componentes de exibição conforme necessário

## 📊 **Performance e Métricas**

### **Otimizações Implementadas**

-   **Processamento em lotes** para reduzir overhead de comunicação
-   **Máximo 20 atualizações** de progresso para UX otimizada
-   **Delays variáveis** (300ms-1s) para simulação realista
-   **Web Workers** para processamento não-bloqueante
-   **Lazy loading** de componentes quando necessário

### **Métricas Coletadas**

-   **Tempo de execução** total com precisão de milissegundos
-   **Taxa de sucesso** calculada automaticamente
-   **Contadores em tempo real** de sucessos e erros
-   **Progresso percentual** com atualizações suaves
-   **Estatísticas por lote** para debugging

### **Capacidades**

-   ✅ **Processamento de arquivos grandes** sem travamento da UI
-   ✅ **Feedback em tempo real** do progresso
-   ✅ **Tratamento robusto de erros** com mensagens descritivas
-   ✅ **Cancelamento de operações** (estrutura preparada)
-   ✅ **Recuperação automática** de estados de erro

## 🚀 **Deploy e Produção**

### **Deploy no Vercel**

O projeto está configurado para deploy automático no Vercel:

1. **Build otimizado** com Next.js 15.3.5
2. **Análise de bundle** para otimização de tamanho
3. **Compressão automática** de assets
4. **Edge runtime** para performance global

### **Estrutura de Build**

```
Route (app)                 Size    First Load JS
┌ ○ /                    1.98 kB       112 kB
├ ○ /_not-found           977 B        102 kB
└ ○ /usuarios             136 B        101 kB
+ First Load JS shared                 101 kB
```

### **Configurações de Produção**

-   **ESLint** configurado para catch de erros
-   **TypeScript** strict mode habilitado
-   **Tailwind** com purge para CSS otimizado
-   **Componentes** tree-shakeable para bundle mínimo

## 🤝 **Contribuindo**

### **Como Contribuir**

1. **Fork** o repositório
2. **Clone** seu fork localmente
3. **Crie uma branch** para sua feature (`git checkout -b feature/NovaFuncionalidade`)
4. **Desenvolva** seguindo os padrões do projeto
5. **Teste** suas mudanças com `npm run build`
6. **Commit** suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
7. **Push** para sua branch (`git push origin feature/NovaFuncionalidade`)
8. **Abra um Pull Request** com descrição detalhada

### **Padrões de Código**

-   **TypeScript** strict mode
-   **ESLint** para linting
-   **Prettier** para formatação (configuração incluída)
-   **Conventional Commits** para mensagens de commit
-   **Componentes funcionais** com hooks

### **Estrutura de Commits**

```
feat: nova funcionalidade
fix: correção de bug
docs: atualização de documentação
style: mudanças de formatação
refactor: refatoração de código
test: adição de testes
chore: tarefas de manutenção
```

## 🧪 **Possíveis Melhorias Futuras**

### **Funcionalidades Planejadas**

-   [ ] **Suporte a múltiplos arquivos** simultâneos
-   [ ] **Validação de schema** customizável
-   [ ] **Export de relatórios** em PDF/CSV
-   [ ] **Histórico de processamentos** com localStorage
-   [ ] **Configurações de usuário** persistentes
-   [ ] **Temas dark/light** mode
-   [ ] **Internacionalização** (i18n)

### **Otimizações Técnicas**

-   [ ] **Service Worker** para cache offline
-   [ ] **Streaming** para arquivos muito grandes
-   [ ] **WebAssembly** para processamento ultra-rápido
-   [ ] **IndexedDB** para storage local
-   [ ] **PWA** com manifest e service worker

## 📝 **Licença**

Este projeto é um **teste de conceito** e está disponível para:

-   ✅ **Uso educacional** e aprendizado
-   ✅ **Demonstração** de tecnologias
-   ✅ **Referência** para implementações similares
-   ✅ **Contribuições** da comunidade

## 🔗 **Recursos e Referências**

### **Documentação Oficial**

-   [Next.js 15 Documentation](https://nextjs.org/docs)
-   [React 19 Documentation](https://react.dev/)
-   [Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
-   [SheetJS XLSX Library](https://sheetjs.com/)
-   [Radix UI Components](https://www.radix-ui.com/)
-   [Tailwind CSS](https://tailwindcss.com/)

### **Recursos Utilizados**

-   [Lucide Icons](https://lucide.dev/) - Ícones modernos
-   [shadcn/ui](https://ui.shadcn.com/) - Sistema de componentes
-   [Vercel](https://vercel.com/) - Plataforma de deploy
-   [TypeScript](https://www.typescriptlang.org/) - Tipagem estática

---

## 🎯 **Conclusão**

Este projeto demonstra uma implementação completa e profissional de processamento de arquivos XLSX usando Web Workers em Next.js, incluindo:

-   ⚡ **Performance otimizada** com processamento não-bloqueante
-   🎨 **Interface moderna** e responsiva
-   📊 **Métricas detalhadas** e relatórios completos
-   🛡️ **Tratamento robusto** de erros e casos extremos
-   🔧 **Código extensível** e bem documentado

**Visualize funcionando:** [https://xlsx-worker-app.vercel.app](https://xlsx-worker-app.vercel.app)

---

_Desenvolvido como demonstração avançada de Web Workers com React/Next.js para processamento de arquivos em produção._
