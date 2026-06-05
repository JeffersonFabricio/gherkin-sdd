# A ESPECIFICAÇÃO. Esta é a fonte de verdade do comportamento.
# Regras: comportamento (não implementação) · linguagem do domínio ·
# um cenário = um comportamento observável · cubra erros e bordas.
# Marque o que faltar definir com:  # TODO(clarify): ...

@v1
Funcionalidade: <nome da funcionalidade>
  Para que <benefício / por quê>
  Como <papel / persona>
  Eu quero <capacidade>

  Contexto:
    Dado que <pré-condição comum a todos os cenários>

  @critico
  Cenário: <caminho feliz — um comportamento observável>
    Dado que <estado inicial em termos do domínio>
    Quando <ação do usuário/sistema>
    Então <resultado observável>

  Cenário: <regra de borda / erro>
    Dado que <condição de borda>
    Quando <ação>
    Então <comportamento esperado para o caso de erro>

  # Use Esquema do Cenário para variações de dados em vez de copiar cenários.
  Esquema do Cenário: <regra com variações>
    Dado que <estado com <parametro>>
    Quando <ação>
    Então <resultado com <esperado>>

    Exemplos:
      | parametro | esperado |
      | valor A   | saída A  |
      | valor B   | saída B  |
