# 014 — Convenções Gerais da Arquitetura

**Portal Emli O'Mago**

**Versão:** 1.0  
**Status:** Vigente

---

# 1. Objetivo

Este documento consolida as convenções gerais da arquitetura do Portal Emli O'Mago que são compartilhadas por toda a documentação técnica e por todas as implementações oficiais.

Seu objetivo é estabelecer regras permanentes para nomenclatura, internacionalização, organização da base de dados, contratos entre implementações e evolução do sistema.

---

# 2. Princípios

Todas as implementações devem preservar os seguintes princípios:

- documentação como fonte de verdade;
- arquitetura orientada a dados;
- baixo acoplamento;
- reutilização máxima;
- simplicidade;
- evolução incremental;
- compatibilidade entre plataformas;
- independência entre dados e implementação.

Nenhuma implementação oficial pode criar regras que contrariem esta documentação.

---

# 3. Convenções de Nomenclatura

Toda a base de dados deve utilizar nomenclatura consistente.

Os identificadores técnicos devem:

- utilizar apenas caracteres ASCII;
- evitar espaços;
- evitar acentos;
- evitar caracteres especiais;
- permanecer estáveis ao longo do tempo.

Os títulos apresentados ao usuário não possuem essas restrições.

---

# 4. Organização Lógica

A organização física dos arquivos não constitui regra de negócio.

A localização de um arquivo dentro do repositório não deve ser utilizada para determinar:

- categoria;
- relacionamento;
- hierarquia;
- tipo de conteúdo;
- navegação.

Essas informações pertencem exclusivamente aos dados.

---

# 5. Internacionalização

A arquitetura deve suportar múltiplos idiomas desde sua concepção.

Todo texto apresentado ao usuário deve ser passível de tradução.

Devem permanecer independentes do idioma:

- identificadores;
- relacionamentos;
- URLs permanentes;
- schemas;
- estrutura da base de dados.

---

# 6. Idioma

O idioma constitui a única preferência permanente obrigatória do Portal.

A implementação deve:

- restaurar automaticamente o último idioma utilizado;
- utilizar um idioma padrão quando necessário;
- permitir futura expansão para novos idiomas sem alterações estruturais.

---

# 7. Conteúdo Localizado

Sempre que um conteúdo possuir tradução disponível, ela deve ser utilizada.

Na ausência de tradução, deve ser utilizada a versão padrão do conteúdo.

A ausência de tradução não deve impedir a navegação.

---

# 8. Contrato entre HTML e Unity

As implementações HTML e Unity compartilham exatamente a mesma base de dados.

Consequentemente:

- interpretam os mesmos arquivos JSON;
- utilizam os mesmos identificadores;
- respeitam os mesmos schemas;
- seguem as mesmas regras funcionais;
- preservam comportamento equivalente.

As diferenças entre implementações devem limitar-se exclusivamente aos aspectos internos da tecnologia utilizada.

---

# 9. Compatibilidade

Toda evolução da arquitetura deve preservar compatibilidade sempre que possível.

Novas funcionalidades devem ser adicionadas por extensão da arquitetura existente.

Alterações incompatíveis somente devem ocorrer quando tecnicamente inevitáveis e mediante atualização do schema correspondente.

---

# 10. Inclusão de Novos Tipos de Conteúdo

Novos tipos de conteúdo devem exigir apenas:

- definição de um novo schema;
- criação dos respectivos arquivos;
- documentação do novo tipo;
- publicação dos dados.

Não devem ser necessárias alterações:

- na arquitetura geral;
- na navegação;
- nos componentes existentes;
- nas páginas já definidas.

---

# 11. Ciclo de Vida do Conteúdo

Todo conteúdo percorre, conceitualmente, as seguintes etapas:

1. criação;
2. validação;
3. publicação;
4. disponibilização ao Portal;
5. atualização quando necessário;
6. eventual descontinuação.

A remoção de um conteúdo não implica reutilização de seu identificador permanente.

---

# 12. Extensibilidade

Toda nova funcionalidade deve priorizar:

- reutilização de componentes existentes;
- reutilização dos mecanismos de navegação;
- reutilização dos contratos de dados;
- reutilização da infraestrutura existente.

Duplicações arquiteturais devem ser evitadas.

---

# 13. Glossário

| Termo          | Definição                                                            |
| -------------- | -------------------------------------------------------------------- |
| Base de Dados  | Conjunto oficial de arquivos JSON compartilhados entre HTML e Unity. |
| Conteúdo       | Qualquer entidade navegável do Portal.                               |
| Schema         | Especificação estrutural de um tipo de arquivo JSON.                 |
| ID Permanente  | Identificador único e imutável de um conteúdo.                       |
| Slug           | Texto utilizado exclusivamente para tornar a URL legível.            |
| Layout         | Forma de apresentação definida pelos dados.                          |
| Componente     | Elemento reutilizável da interface oficial.                          |
| Relacionamento | Associação lógica entre conteúdos por meio de IDs permanentes.       |

---

# 14. Evolução da Documentação

Esta documentação constitui a referência oficial da arquitetura.

Qualquer alteração arquitetural deve ser realizada nesta documentação antes de sua implementação.

Em caso de divergência entre implementação e documentação, a documentação deve ser considerada a fonte de verdade.

---

# 15. Hierarquia Normativa

Os documentos da arquitetura possuem a seguinte ordem de precedência:

1. Princípios Arquiteturais;
2. Especificação da Base de Dados;
3. Versionamento e Publicação;
4. Carregamento e Desempenho;
5. Especificação das Páginas;
6. Componentes da Interface;
7. Navegação e Rotas;
8. Especificação Funcional.

Em caso de conflito, prevalece o documento de maior precedência.

---

# 16. Responsabilidades deste Documento

Este documento define:

- convenções gerais da arquitetura;
- nomenclatura;
- internacionalização;
- contratos entre HTML e Unity;
- organização lógica da base de dados;
- ciclo de vida do conteúdo;
- extensibilidade;
- glossário técnico;
- precedência documental.
