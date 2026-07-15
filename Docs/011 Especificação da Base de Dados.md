# 011 — Especificação da Base de Dados

**Portal Emli O'Mago**

**Versão:** 1.0  
**Status:** Vigente

---

# 1. Objetivo

Este documento define a arquitetura da base de dados utilizada pelo Portal Emli O'Mago, especificando a organização dos arquivos JSON, os relacionamentos entre eles, os identificadores permanentes, os contratos estruturais e as regras para evolução da base de dados.

A base de dados constitui a fonte única de verdade do Portal e deve ser compartilhada integralmente pelas implementações HTML e Unity.

---

# 2. Princípios

A base de dados deve obedecer aos seguintes princípios:

- arquitetura orientada a dados;
- independência da implementação;
- baixo acoplamento;
- reutilização máxima;
- compatibilidade entre HTML e Unity;
- extensibilidade;
- versionamento independente do código;
- simplicidade.

Nenhuma regra de negócio deve depender exclusivamente do código quando puder ser representada pelos dados.

---

# 3. Organização Geral

A base é composta exclusivamente por arquivos JSON organizados por responsabilidade.

Cada arquivo deve possuir finalidade única e bem definida.

Os dados devem ser estruturados de forma que novos conteúdos possam ser adicionados sem necessidade de alterações no código da aplicação.

---

# 4. Tipos de Arquivos

Os arquivos JSON classificam-se em:

| Tipo                | Finalidade                            |
| ------------------- | ------------------------------------- |
| Configuração        | Configurações globais do Portal       |
| Conteúdo            | Dados de cada conteúdo individual     |
| Índices             | Localização e descoberta de conteúdos |
| Relacionamentos     | Ligações entre conteúdos              |
| Internacionalização | Traduções                             |
| Layout              | Configuração visual baseada em dados  |
| Metadados           | Informações auxiliares                |

Novos tipos podem ser adicionados mantendo compatibilidade com esta arquitetura.

---

# 5. Estrutura Geral dos Arquivos

Todo arquivo JSON deve possuir, quando aplicável:

- identificador;
- versão do schema;
- versão dos dados;
- tipo;
- metadados;
- conteúdo;
- relacionamentos.

Campos opcionais podem ser omitidos.

Campos desconhecidos devem ser ignorados pelas implementações.

---

# 6. Identificador Permanente

Todo conteúdo deve possuir um identificador permanente (ID).

O ID:

- nunca deve ser reutilizado;
- nunca deve mudar após publicação;
- independe do idioma;
- independe do título;
- independe da URL.

O ID constitui a identidade oficial do conteúdo.

---

# 7. Slug

O slug existe apenas para legibilidade das URLs.

Não deve ser utilizado para relacionamentos internos.

Pode ser alterado sem comprometer a identidade do conteúdo.

---

# 8. Relacionamentos

Todo relacionamento entre conteúdos deve utilizar IDs permanentes.

Relacionamentos nunca devem depender:

- do nome;
- da posição no diretório;
- da URL;
- do slug.

Relacionamentos podem ocorrer entre quaisquer tipos de conteúdo.

---

# 9. Índices

Os índices têm como finalidade localizar conteúdos rapidamente.

Eles não substituem os arquivos de conteúdo.

Podem existir índices específicos para:

- categorias;
- projetos;
- coleções;
- séries;
- tags;
- pesquisa;
- recomendações.

---

# 10. Schemas

Cada tipo de arquivo deve possuir um schema próprio.

Os schemas definem:

- campos obrigatórios;
- campos opcionais;
- tipos de dados;
- restrições;
- valores permitidos.

A validação dos arquivos deve ser realizada com base nesses schemas.

---

# 11. Extensibilidade

Novos tipos de conteúdo podem ser adicionados sem alterar:

- a arquitetura;
- os componentes;
- a navegação;
- as páginas.

Basta que:

- possuam schema próprio;
- utilizem IDs permanentes;
- respeitem os contratos definidos.

---

# 12. Referências

Arquivos devem referenciar outros conteúdos exclusivamente por ID.

Duplicação de dados deve ser evitada.

Informações compartilhadas devem existir em um único local.

---

# 13. Integridade

A base deve garantir:

- inexistência de IDs duplicados;
- inexistência de referências inválidas;
- schemas válidos;
- compatibilidade entre versões.

---

# 14. Responsabilidades

A base de dados é responsável por definir:

- conteúdos;
- relacionamentos;
- layouts;
- ordenação;
- organização lógica;
- metadados;
- internacionalização.

A aplicação é responsável apenas por interpretar esses dados.

---

# 15. Evolução

A evolução da base deve preservar compatibilidade sempre que possível.

Alterações incompatíveis exigem nova versão de schema.

Novos campos podem ser adicionados sem afetar implementações anteriores, desde que permaneçam opcionais.

---

# 16. Responsabilidades deste Documento

Este documento define:

- arquitetura da base de dados;
- organização dos arquivos;
- contratos estruturais;
- relacionamentos;
- IDs permanentes;
- schemas;
- regras de evolução da base de dados.
