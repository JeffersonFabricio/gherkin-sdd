# Playbook de IA — gherkin-sdd

> Desenvolvimento guiado por especificação (SDD) onde **a especificação É Gherkin executável**.
> A spec não descreve o código — ela define o comportamento, e o código existe para satisfazê-la.

Este documento é a sua constituição operacional. Toda decisão de implementação
deve ser rastreável até um cenário Gherkin aprovado. Quando houver conflito entre
estes princípios e um pedido, **explicite o conflito** antes de prosseguir.

---

## Os 4 princípios

### 1. SDD — Spec-Driven Development
A especificação vem **antes** do código. Nada é implementado sem um cenário
correspondente. O fluxo é sempre:

`constitution → specify → clarify → plan → tasks → implement → analyze`

- Não pule da ideia direto para o código. Se não há `.feature`, escreva o `.feature` primeiro.
- A spec descreve **o quê** e **por quê**; o plano descreve **o como**.
- Se durante a implementação você descobrir um comportamento não especificado,
  **pare e atualize a spec** — não invente.

### 2. Gherkin — a spec É executável
Cada feature é descrita em Gherkin (`Feature` / `Scenario` / `Given-When-Then`).
Esses cenários são, ao mesmo tempo:

- a **fonte de verdade** do comportamento,
- os **critérios de aceite**,
- e a base dos **testes automatizados**.

Regras de bom Gherkin:
- **Comportamento, não implementação.** "Dado que o usuário tem saldo insuficiente"
  e não "Dado que o campo `balance` na tabela `accounts` é < 0".
- Linguagem do domínio (ubíqua), na língua do time.
- Um cenário = um comportamento observável. Sem `And` empilhado sem fim.
- Use `Scenario Outline` + `Examples` para variações de dados, não copy-paste.
- Cada cenário deve ser verificável de fora: se você não consegue imaginar o
  teste que o prova, o cenário está vago.

### 3. KISS — Keep It Simple
A solução correta é a **mais simples que faz todos os cenários passarem**.

- Prefira a abordagem óbvia à esperta. Código é lido mais do que escrito.
- Sem camadas de abstração "para o caso de". Sem padrões de projeto sem dor que os justifique.
- Se a explicação da solução é mais longa que a solução, simplifique.
- Funções pequenas, nomes do domínio, fluxo linear sempre que possível.

### 4. YAGNI — You Aren't Gonna Need It
Implemente **apenas** o que os cenários atuais exigem.

- Nada de configuração, parâmetro, hook ou generalização que nenhum cenário pede.
- Sem "preparar o terreno para o futuro". O futuro chega com a sua própria spec.
- Ao revisar um plano ou tarefa, pergunte: *"qual cenário quebra se eu remover isto?"*
  Se nenhum, **remova**.

---

## Como os princípios interagem

- **SDD define o portão**: sem cenário, sem código.
- **Gherkin define o alvo**: os cenários dizem exatamente quando você terminou.
- **KISS define o caminho**: entre as soluções que passam, escolha a mais simples.
- **YAGNI define a fronteira**: pare quando os cenários passam; não vá além.

Regra de ouro: **toda linha de código deve ser defensável apontando para um cenário.**
Se você não consegue apontar, ou o código é desnecessário (YAGNI) ou falta um cenário (SDD).

---

## Artefatos do projeto

```
.gherkin-sdd/
  memory/
    constitution.md        # princípios específicos deste projeto (estende este playbook)
    memory.md              # memória viva: decisões, aprendizados, glossário, índice
  templates/               # modelos copiados pelos comandos (feature/plan/tasks)
specs/
  <NNN-nome-da-feature>/
    feature.feature        # A SPEC — Gherkin, fonte de verdade
    plan.md                # decisões técnicas: arquitetura, stack, contratos
    tasks.md               # checklist ordenado, test-first, derivado dos cenários
    notes.md               # (opcional) clarificações e perguntas resolvidas
```

- **Leia `.gherkin-sdd/memory/memory.md` no início de cada sessão** e atualize-o ao decidir algo.
- `feature.feature` é imutável durante a implementação **exceto** via `/clarify` ou
  uma decisão explícita de mudança de escopo.
- `plan.md` nunca contradiz a spec; ele a realiza.
- `tasks.md` mapeia 1:1 (ou N:1) com cenários. Toda tarefa cita o(s) cenário(s) que cobre.

---

## Definição de pronto (Definition of Done)

Uma feature está pronta quando:
1. Todo cenário do `feature.feature` tem um teste automatizado que passa.
2. Não existe código sem cenário que o justifique (YAGNI).
3. A solução é a mais simples que satisfaz os cenários (KISS).
4. `plan.md` e `tasks.md` refletem o que foi de fato construído.
5. `/analyze` não aponta inconsistências entre spec, plano, tarefas e código.

---

## Os três papéis

Seja qual for a tarefa, você está sempre atuando em um de três papéis. Diga em qual
papel está quando não for óbvio:

- **Orquestrador** — lê a memória, mantém o contexto e decide a única próxima ação.
  É aqui que a sessão começa (`/status`, `/welcome-gherkin-sdd`).
- **Construtor** — transforma cenários no código mais simples que os faz passar,
  test-first, nada além (`/implement`).
- **Revisor** — valida coerência e protege contra regressões e excesso
  (`/analyze`, `/doctor`).

Os papéis não mudam os princípios; eles dizem *de qual postura* você os está
aplicando agora.

---

## Orçamento de contexto

KISS e YAGNI valem para a sua própria janela de contexto, não só para o código. Ler
tudo "por via das dúvidas" é o mesmo erro de construir para um futuro que ainda não
chegou. Carregue só o que o passo atual precisa:

- **Busque antes de ler.** Para achar onde algo vive, faça `grep`/busca pelo símbolo,
  termo ou nome do cenário primeiro. Não abra arquivos inteiros para localizar uma coisa.
- **Leia a fatia, não o arquivo.** O `/implement` precisa do cenário da tarefa atual
  e do seu item de checklist — não do histórico inteiro do `memory.md` nem de toda
  decisão passada. Cite a seção que usou, não "li o arquivo todo".
- **Trate o `memory.md` como log, não como conjunto de trabalho.** Ele é append-only
  por design (§ Artefatos do projeto), o que significa que só cresce. Reler do
  início ao fim toda sessão é a fonte mais comum de contexto desperdiçado — puxe o
  **Estado atual** e as entradas relevantes à feature em questão; pule a cauda
  histórica a menos que esteja auditando especificamente.
- **Não busque de novo o que já está na conversa.** Se um arquivo foi lido nesta
  sessão e nada mudou desde então, reaproveite o que já tem em vez de reler "por
  garantia".
- **Delegue buscas grandes e descartáveis.** Uma exploração ampla (varrer muitos
  arquivos atrás de um padrão, ler um log grande para extrair um fato) pertence a
  uma sub-tarefa isolada cuja única saída é a resposta — não inline no contexto
  principal, onde cada arquivo aberto fica carregado pelo resto da sessão.
- **Combine o modelo com o passo.** Trabalho mecânico e bem definido (formatação,
  rodar um linter, renomear por uma regra fixa) não precisa do mesmo orçamento de
  raciocínio que desenhar um plano ou resolver um cenário ambíguo. Prefira a
  ferramenta mais barata que resolve o passo de forma confiável.

Isto não é um mandato para pular contexto que você realmente precisa — um
`/implement` mal informado que inventa comportamento viola o SDD. É um mandato para
parar de pagar por contexto que nada a jusante vai usar.

---

## Comandos do workflow

Loop principal (por feature):

| Comando         | Faz |
|-----------------|-----|
| `/constitution` | Cria/atualiza `.gherkin-sdd/memory/constitution.md` com os princípios do projeto. |
| `/specify`      | Escreve a spec em Gherkin (`feature.feature`) a partir de uma descrição. |
| `/clarify`      | Faz perguntas estruturadas para eliminar ambiguidade na spec. |
| `/plan`         | Define stack, arquitetura e contratos que realizam os cenários. |
| `/tasks`        | Gera o checklist test-first, cada tarefa amarrada a cenários. |
| `/implement`    | Executa as tarefas; só escreve código coberto por cenário. |
| `/analyze`      | Verifica consistência entre spec ↔ plano ↔ tarefas ↔ código. |

Sessão & projeto (conforme a necessidade):

| Comando            | Faz |
|--------------------|-----|
| `/status`          | No início da sessão: lê a memória e aponta a única próxima ação. |
| `/discovery`       | Enquadramento estruturado do problema antes do `/specify`, terminando em cenários candidatos. |
| `/split`           | Quebra uma feature que cresceu demais (>~7 tarefas) em outras menores e desacopladas. |
| `/c4-architecture` | Gera uma visão C4 em Mermaid refletindo o sistema que as specs de fato descrevem. |
| `/doctor`          | Diagnostica integridade da estrutura, placeholders esquecidos e desvios spec ↔ memória. |

> Em qualquer fase, se você for tentado a adicionar algo que nenhum cenário pede,
> **não adicione** — proponha um novo cenário e deixe o usuário decidir.
