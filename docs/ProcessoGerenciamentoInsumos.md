### 3.3.2 Processo de Gerenciamento de Insumos

O Gerenciamento de Insumos é um processo que permite o produtor rural ter total controle sobre o estoque de sementes, agrotóxicos, fertilizantes e produtos gerados pela colheita. 

![Processo de Gerenciamento de Insumos](images/ModelagemProcessoInsumosCorrigido03.jpg "Modelo BPMN do Processo de Gerenciamento de Insumos.")



#### Detalhamento das atividades

**Consultar Produtos**

_Permite verificar informações de um produto e realizar ações como cadastrar, editar, excluir, adicionar e consumir insumos._
| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Tipo | Caixa de Texto    |   |                   |
| Nome | Caixa de Texto   |   |                   |
| Imagem | Imagem   |   |                   |
| Quantidade Estoque | Número   |   |                   |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---      |
| Adicionar Quantidade            | Direciona para o modal Adicionar Quantidade   | default  |
| Consumir Produto            | Direciona para o modal Consumir Produto    | default  |
| Cadastrar Produto            | Direciona para o modal Cadastrar Novo Insumo   | default  |
| Ver Histórico Consumo            | Abre os históricos de consumo na própria tela   | default  |

**Cadastrar Novo Insumo**

_Permite que o usuário possa cadastrar um insumo e suas informações._
| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Tipo | Seleção única    |    |                   |
| Nome | Caixa de texto   |   |                   |
| Quantidade Estoque | Número                  |  Maior ou igual a 0              |     0              |
| Instruções de Manejo   | Área de texto   |     |                   |
| Quantidade Mínima | Número | Maior ou igual 0 | 0        | 
| Imagem (URL) | Caixa de texto |      |       |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Salvar Produto | Salva o produto e volta para a tela Consultar Produtos  | default |                 
| Cancelar           | Encerrar o processo de cadastro e volta para a tela Consultar Produtos    |   cancel        |


**Excluir Insumo Existente**

_Remove um insumo do sistema, com opção de confirmar ou cancelar._
| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Nome | Caixa de texto |           |                   |
| Tipo | Caixa de texto    |   |                   |
| Quantidade Estoque | Número                  |  Maior ou igual a 0              |     0              |
| Instruções de Manejo   | Área de texto   |     |                   |
| Quantidade Mínima | Número | Maior ou igual 0 | 0        | 
| Imagem | Imagem |      |       |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |



**Editar Insumo Existente**

_Modifica as informações de um insumo já cadastrado._
| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Tipo  | Seleção única    |    |                   |
| Nome  | Caixa de texto   |   |                   |
| Quantidade em Estoque | Número                 |  Maior ou igual 0              |                   |
| Instruções de Manejo   | Área de texto   |  |                   |
| Quantidade Mínima | Número | Maior ou igual 0 |         | 
| Imagem (URL) | Caixa de texto |      |       |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Salvar  | Atualizar o insumo com as novas informações e volta para a tela de Consultar Produtos   | default |
| Cancelar               | Encerrrar o processo sem salvar as alterações e volta para a tela de Consultar Produtos    | cancel           |


**Consumir Produto**

_Registra o consumo de um insumo e atualiza o estoque._
| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Nome  | Caixa de texto   |     |                   |
| Quantidade Estoque  | Número   |     |                   |
| Quantidade Consumida | Número                 |  Deve ser maior que 0 e menor ou igual ao estoque disponível             |                   |
| Data de Consumo  | Data   |    |                   |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Consumir  | Registrar a quantidade consumida e atualizar o estoque, e volta para a tela de Consultar Produtos  | default |
| Cancelar               | Encerrrar o processo sem registar o consumo, e volta para a tela de Consultar Produtos     | cancel           |

**Adicionar Quantidade**

_Registra uma quantidade para ser acrescentada ao estoque atual do insumo._
| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Nome  | Caixa de texto   |     |                   |
| Quantidade para Adicionar  | Número   |     |                   |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Adicionar  | Adiciona a quantidade ao estoque e atualiza o estoque, e volta para a tela de Consultar Produtos   | default |
| Cancelar               | Encerrrar o processo sem registrar a adição, e volta para a tela de Consultar Produtos     | cancel |

**Consultar Histórico de Consumo**

_Permite verificar informações do histórico de consumo dos produtos._
| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Nome  | Caixa de texto   |     |                   |
| Data de Consumo  | Data   |     |                   |
| Quantidade Consumida  | Número   |     |                   |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |

**Consultar Gráficos**

_Permite verificar tipos de gráficos relacionados aos produtos e seus tipos._
| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Nome  | Caixa de texto   |     |                   |
| Tipo  | Data   |     |                   |
| Quantidade Estoque  | Número   |     |                   |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Estoque Total                  | Abre o gráfico geral de todos os produtos                            | default            |
| Estoque Por Categoria                 | Abre o gráfico de cada tipo de produto                            | default            |


