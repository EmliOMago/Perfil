# 012 — Versionamento e Publicação

**Portal Emli O'Mago**

**Versão:** 1.0  
**Status:** Vigente

---

# 1. Objetivo

Este documento define a política de versionamento da base de dados do Portal Emli O'Mago, os critérios de compatibilidade entre versões, a organização do repositório de dados e o processo oficial de publicação.

O objetivo é permitir a evolução contínua da base de dados sem comprometer a estabilidade das páginas e experiências HTML5.

---

# 2. Princípios

O versionamento deve seguir os princípios de:

- compatibilidade retroativa sempre que possível;
- evolução incremental;
- rastreabilidade;
- simplicidade;
- independência entre código e dados;
- previsibilidade.

A atualização dos dados não deve exigir, necessariamente, atualização da aplicação.

---

# 3. Tipos de Versionamento

A base de dados utiliza dois níveis independentes de versionamento.

| Tipo             | Finalidade                                   |
| ---------------- | -------------------------------------------- |
| Versão do Schema | Define a estrutura esperada do arquivo JSON  |
| Versão dos Dados | Identifica alterações no conteúdo do arquivo |

Esses dois controles devem evoluir de forma independente.

---

# 4. Versionamento do Schema

A versão do schema representa alterações estruturais.

Exemplos:

- inclusão de novos campos obrigatórios;
- alteração de tipos de dados;
- remoção de campos;
- mudanças incompatíveis.

Alterações incompatíveis exigem nova versão do schema.

---

# 5. Versionamento dos Dados

A versão dos dados identifica alterações de conteúdo.

Exemplos:

- inclusão de novos conteúdos;
- correções de textos;
- atualização de imagens;
- novos relacionamentos;
- alterações de metadados.

Essas mudanças não alteram o schema.

---

# 6. Compatibilidade

As implementações devem:

- aceitar campos desconhecidos;
- ignorar propriedades não utilizadas;
- utilizar valores padrão quando apropriado.

A remoção de campos deve ocorrer apenas após período adequado de transição.

---

# 7. Política de Depreciação

Campos antigos podem ser marcados como obsoletos.

Durante o período de transição:

- continuam válidos;
- permanecem documentados;
- não devem receber novas funcionalidades.

Ao final da depreciação podem ser removidos mediante nova versão de schema.

---

# 8. Organização do Repositório

Todos os arquivos de dados oficiais devem ser publicados no repositório destinado exclusivamente aos arquivos compartilhados do ecossistema.

A organização física deve separar os conteúdos por responsabilidade, evitando dependências entre diretórios.

A estrutura física do repositório não deve ser utilizada como regra de negócio.

---

# 9. Publicação

A publicação de alterações deve seguir a seguinte sequência:

1. atualização dos arquivos locais;
2. validação dos schemas;
3. validação das referências;
4. validação dos identificadores;
5. publicação no repositório;
6. disponibilização automática aos clientes.

Arquivos inválidos não devem ser publicados.

---

A publicação da interface e das experiências usa os arquivos estáticos do GitHub Pages. Cada revisão publicada deve manter módulos, recursos e dados com versões compatíveis e caminhos que funcionem a partir do subdiretório do repositório.

# 10. Integridade

Antes da publicação devem ser verificados:

- unicidade dos IDs;
- consistência dos relacionamentos;
- existência dos recursos referenciados;
- conformidade com os schemas;
- consistência das versões.

---

# 11. Histórico

O histórico de alterações deve permanecer registrado pelo sistema de controle de versão do repositório.

Não é necessário que cada arquivo mantenha internamente um histórico completo de modificações.

---

# 12. Atualizações

A atualização dos dados pode ocorrer independentemente da publicação de novas versões da aplicação.

As implementações devem ser capazes de consumir automaticamente os dados compatíveis disponibilizados no repositório.

---

# 13. Reversão

Caso uma publicação apresente inconsistências, deve ser possível restaurar uma versão anterior do repositório.

A reversão deve preservar a integridade entre todos os arquivos relacionados.

---

# 14. Inclusão de Novos Tipos de Conteúdo

A criação de um novo tipo de conteúdo deve exigir apenas:

- definição de um novo schema;
- documentação correspondente;
- inclusão nos índices apropriados;
- publicação dos novos arquivos.

Não devem ser necessárias alterações estruturais na arquitetura existente.

---

# 15. Responsabilidades deste Documento

Este documento define:

- política de versionamento;
- versionamento de schemas;
- versionamento dos dados;
- compatibilidade;
- depreciação;
- organização do repositório;
- processo de publicação;
- validações obrigatórias;
- política de atualização.
