---
description: Cria ou atualiza a constituição do projeto (princípios específicos que estendem o playbook specherkin).
---

# /constitution

Você vai estabelecer (ou revisar) a **constituição** deste projeto em
`.specherkin/constitution.md`. Ela estende o playbook specherkin (SDD, Gherkin,
KISS, YAGNI) com as regras específicas deste projeto.

## Entrada
Argumento livre do usuário (`$ARGUMENTS`): contexto do projeto, restrições,
preferências de stack, convenções. Pode estar vazio — então pergunte.

## Faça
1. Leia `.specherkin/constitution.md` se já existir. Não jogue fora o que está lá;
   evolua.
2. Confirme/colete os pontos abaixo. Faça **apenas** as perguntas cujas respostas
   ainda não conhece (YAGNI também vale para perguntas):
   - Domínio e objetivo do produto em uma frase.
   - Língua da spec/Gherkin e da comunicação.
   - Stack mandatória ou proibida (linguagem, framework, banco, etc.).
   - Convenções de teste (qual runner roda os cenários Gherkin? ex: Cucumber,
     Behave, pytest-bdd, SpecFlow, Jest+cucumber).
   - Restrições não-negociáveis (segurança, compliance, performance).
3. Escreva `.specherkin/constitution.md` curto e acionável. Cada regra deve ser
   verificável. Sem encheção de linguiça — KISS aplica-se ao próprio documento.
4. Reafirme os 4 princípios no topo e registre como eles se aplicam **neste** projeto.

## Saída
- `.specherkin/constitution.md` atualizado.
- Resumo em 3-5 linhas do que mudou e por quê.

## Não faça
- Não invente regras que ninguém pediu (YAGNI).
- Não defina arquitetura aqui — isso é trabalho do `/plan`.
