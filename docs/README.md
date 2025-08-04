# G-AGRO


**Guilherme de Almeida Rocha Vieira, guilhermearv3@gmail.com**

**Lucas Gonçalves Dolabela, lucasdolabela7@gmail.com**

**Felipe Augusto Pereira de Sousa, felipeaps0918@gmail.com**

**Marcos de Oliveira Antunes, pereiraantunesmarcos@gmail.com**

**Gabriel Reis, bielreis222gabriel@gmail.com**

**Gustavo Ignacio Moreira da Silva, gustavo20014@hotmail.com.br**

**Enzo Casaes Figueiró, enzocasais0802@gmail.com**

---

Professores:

**Aline Norberta de Brito**

**Eveline Alonso Veloso**

**Juliana Amaral Baroni de Carvalho**

---

_Curso de Engenharia de Software_

_Instituto de Informática e Ciências Exatas – Pontifícia Universidade Católica de Minas Gerais (PUC MINAS), Belo Horizonte – MG – Brasil_

---

_**Resumo**. 

Esse projeto surgiu como uma iniciativa para auxiliar pequenos e médios produtores no gerenciamento de sua propriedade. Dessa forma, nasceu a G-AGRO, um software de gerenciamento agrícola, voltado para esse público-alvo, visando otimizar processos como plantio, colheita, terreno, cultura e gestão de insumos. Todos esses processos promovem uma administração eficiente e sustentável das propriedades rurais, buscando atingir as metas estabelecidas pela ODS-2 ( Fome zero e Agricultura Sustentável). Tendo em vista a disparidade no acesso às tecnologias entre grandes produtores e pequenos agricultures, o sistema busca oferecer uma solução acessível, simples e intuitva para facilitar o gerenciamento das propriedades e aumentar a competitividade desses produtores. 
Portanto, entre as principais funcionalides, temos: planejamento de plantio e colheita, controle de insumos e estoque, gerenciamento de culturas, além de ferramentas adicionais, tais como calendário para visualização de lembretes e eventos. 
Por tais motivos, a G-AGRO se destaca como uma ferramenta inovadora, contribuindo para a produtividade e sustentabilidade no setor agrícola. 

---


## 1. Introdução

Será apresentado um inovador software de gerenciamento de fazendas, projetado para otimizar a organização e o controle da produção rural. Com essa ferramenta, o produtor rural pode ter consigo todas as informações essenciais da sua fazenda em um único lugar, acessível de forma prática e intuitiva diretamente pelo aplicativo, garantindo uma gestão mais eficiente e informada.

### 1.1 Contextualização

No cenário global atual, a agricultura desempenha um papel crucial na garantia da segurança alimentar e no suporte às economias. Com a crescente demanda por alimentos e a pressão por práticas mais sustentáveis, o setor agrícola enfrenta desafios complexos, exigindo eficiência operacional e inovações tecnológicas para manter sua relevância e desenvolvimento. De acordo com a Organização das Nações Unidas para Alimentação e Agricultura (FAO), a produção agrícola global precisará aumentar em 70% até 2050 para atender à demanda crescente, impulsionada pelo crescimento populacional (Referência [1.1]). Este aumento significativo na produção destaca a urgência de otimizar práticas agrícolas e adotar novas tecnologias para atender a essas necessidades futuras.

Nesse contexto, a capacidade de adotar e integrar inovações tecnológicas torna-se fundamental. No entanto, a realidade mostra que as disparidades nas capacidades tecnológicas e gerenciais entre diferentes portes de produtores são marcantes. De maneira geral, os grandes produtores conseguem aproveitar as ferramentas mais avançadas do mercado, o que lhes proporciona uma vantagem significativa na condução de suas operações. Por outro lado, os agricultores de médio e pequeno porte enfrentam dificuldades consideráveis, especialmente no que diz respeito à gestão e monitoramento de suas propriedades. 

De acordo com Vieira e Gasques (2020) - (Referência [1.2]), uma análise baseada no Censo Agropecuário de 2017 revelou que as desigualdades socioeconômicas entre agricultores de médio e pequeno porte e os grandes produtores são marcantes. Os grandes produtores têm uma adoção muito mais avançada de tecnologias, enquanto os produtores menores enfrentam dificuldades significativas para incorporar essas inovações. Essa disparidade ressalta a necessidade urgente de uma solução que permita um acesso mais equitativo às tecnologias, visando melhorar a eficiência e a sustentabilidade das operações dos pequenos e médios produtores.

Por essa razão, neste trabalho, vamos nos concentrar em desenvolver soluções tecnológicas que capacitem esses pequenos e médios produtores a superar os desafios mencionados. Nossa proposta é criar um software de gestão integrado que permita a esses produtores otimizar a administração de suas propriedades, melhorando o planejamento de colheitas, a previsão de resultados e promovendo uma gestão mais eficiente dos recursos disponíveis. Nosso objetivo é fornecer uma ferramenta que não apenas melhore a competitividade desses produtores no mercado, mas que também contribua significativamente para o aumento sustentável da produção agrícola global, atendendo à crescente demanda por alimentos até 2050.

[How to feed the world in 2050](https://www.fao.org/fileadmin/templates/wsfs/docs/expert_paper/How_to_Feed_the_World_in_2050.pdf)
[Agricultura familiar no Brasil: evidências a partir do Censo Agropecuário de 2017](https://www.anpec.org.br/sul/2024/submissao/files_I/i4-001e61d45a9e32544c5225e464b7f449.pdf)

### 1.2 Problema

Pensando nesse cenário, os produtores tem uma grande dificuldade de gerenciar seus recursos, o que leva a um menor aproveitamento na produção, gerando menos lucro. Essa falta de gerenciamento provoca inúmeras complicações, tanto para o proprietário como para o meio ambiente, visto que gastam mais recursos do que o necessário ou manejam o solo indevidamente, os quais refletem no rendimento final do plantio. 

Como exemplo, podemos falar de um pequeno produtor de grãos no Vale do Jequitinhonha, o qual possui todos os maquinários necessários para realizar o plantio e a colheita, mas não tem o controle de seus gastos e ganhos, como a quantidade de fertilizante que foi gasto para cobrir o seu plantio, a quantia de água gasta em todo o período de desenvolvimento da planta e a quantidade aproximada de sacas que conseguiu colher por hectare plantado. Dessa forma, o produtor deixa de maximizar seu lucro, uma vez que não tem a certeza de quanto foi gasto para estipular o preço para venda.

### 1.3 Objetivo geral

Desenvolver um sistema automatizado voltado para a agricultura, visando a otimização dos processos de gestão no setor agrícola. O sistema permitirá monitorar e gerenciar de forma eficiente o uso de recursos como fertilizantes, sementes ou defensivos agrícolas, promovendo uma agricultura mais sustentável e com menor impacto ambiental. Adicionalmente, o software auxiliará na organização do plantio e da colheita, e no cadastro de todas as culturas do produtor, contribuindo para uma produção agrícola mais equilibrada e responsável.

#### 1.3.1 Objetivos específicos

Processo de Plantio:
* Planejamento do calendário de plantio.
* Recomendações de ações, como irrigação ou aplicação de defensivos.

Processo de Colheita:
* Planejamento do calendário de colheita
* Controle da quantidade de sacas colhidas. 
  
Gerenciamento de Culturas:
* Cadastro de culturas agrícolas e suas informações do produtor.
* Controle da área do terreno (hectares).

Gerenciamento de Insumos (Sementes e Fertilizantes):
* Controle do uso de insumos como sementes e fertilizantes, evitando excessos e desperdícios.
* Registro detalhado da aplicação de fertilizantes e defensivos.
* Controle do estoque dos insumos.

### 1.4 Justificativas

O desenvolvimento de um Sistema de Gerenciamento Agropecuário foi motivado por ser essencial pela significativa contribuição do agronegócio para a economia do Brasil. O setor agropecuário desempenha um papel fundamental não apenas para o abastecimento alimentar, mas também para geração de riqueza, sendo responsável por 49% de todas as exportações do Brasil, segundo o Ministério da Agricultura e Pecuária (Referência [1.3]).
Entretanto, há uma grande disparidade na gestão de recursos entre os grandes produtores e os médios e pequenos produtores. Isso acontece, uma vez que os grandes produtores dispõem de tecnologia avançada para otimizar a eficiência e produtividade, enquanto os médios e pequenos proprietários enfrentam dificuldades no que tange ao gerenciamento de recursos. 
Por fim, devido à crescente demanda por alimentos e produtos agropecuários, tornou-se fundamental buscar aumentar a produtividade de forma sustentável, exigindo um gerenciamento cada vez mais preciso. Dessa forma, nosso sistema é capaz de auxiliar tanto os médios quando pequenos proprietários, assim como apoia a sustentabilidade do agronegócio.

Referências: 

[Ministério da Agricultura e Pecuária](https://www.gov.br/agricultura/pt-br/assuntos/noticias/exportacoes-do-agronegocio-fecham-2023-com-us-166-55-bilhoes-em-vendas)

## 2. Participantes do processo

Produtor Rural: O principal responsável pela produção, toma decisões sobre o cultivo e manejo, responsável pela execução geral das atividades e pela gestão da fazenda. Predominantemente composto por homens entre 25 a 60 anos. Educação pode variar bastante, mas marcado por conhecimentos passsados de geração em geração.

Funcionários: Desempenham papéis operacionais cruciais que garantem o sucesso das atividades diárias. Geralmente, esses trabalhadores têm entre 20 e 60 anos e possuem uma variedade de formações, desde a educação básica até cursos técnicos relacionados à agricultura. Esses profissionais são a base das operações agrícolas, e sua eficiência é diretamente ligada à produtividade da agricultura.

Consultor Agronômico: Traz um nível de especialização estratégica à gestão agrícola. Geralmente com idades entre 35 e 60 anos, esses profissionais possuem formação superior, muitas vezes com pós-graduações em agronomia ou áreas afins. Eles fornecem suporte especializado ao Produtor Rural e ao Gerente de Fazenda, analisando dados, recomendando práticas agrícolas e otimizando o uso de recursos.

## 3. Modelagem do processo de negócio

### 3.1. Análise da situação atual

Atualmente, diversos pequenos e médios produtores ainda realizam o gerenciamento de seus recursos e insumos de forma manual, utilizando planilhas ou registros físicos para monitorar seu estoque e maquinário, incluindo informações essenciais para maior eficiência e lucro. Embora existam sistemas de gerenciamento agrícola, como o da Tarken (Referência [1.5]), que oferecem ferramentas avançadas, eles são direcionados principalmente para grandes propriedades e focam em áreas como vendas e crédito, não atendendo plenamente às necessidades operacionais de fazendas menores.

Soluções como a AgroHub (Referência [1.6]) são eficazes para o planejamento e gestão de agricultura em grandes operações, mas seu custo e complexidade limitam o uso por pequenos agricultores. Nesse quesito, é comum que produtores que praticam a agricultura familiar, os quais não possuem precisão e eficácia no planejamento de plantio e colheita por métodos tradicionais, o que pode gerar ineficiências e dificuldades no controle de sacas produzidas, como se basear na intuição ou memória para realizar essas atividades. 

Nosso software vem para preencher essa lacuna, oferecendo uma solução simples e acessível que foca no planejamento do plantio e colheita, controle do uso de insumos e das culturas agrícolas, substituindo processos manuais por uma ferramenta eficiente e adaptada à realidade dos pequenos e médios produtores.


### 3.2. Descrição geral da proposta de solução

A proposta de solução consiste na criação de um sistema automatizado de gestão de fazendas, projetado para atender às necessidades específicas tanto dos pequenos quanto dos médios produtores rurais. Esse software procura otimizar os processos de gestão agrícola, entregando uma forma centralizada e de fácil acesso para monitorar e gerenciar recursos como insumos e maquinários.

No entanto, existem alguns desafios a serem enfrentados que podem comprometer o bom funcionamento do sistema. Entre essas adversidades, o acesso à tecnologia e a acessibilidade dos usuários são aspectos a serem considerados para facilitar a interação entre o software e o cliente. Ademais, é fundamental a flexibilidade do sistema em relação às práticas agrícolas, haja vista que essas dependem de uma variedade de fatores, tais como o tamanho da propriedade, tipos de culturas utilizadas e as práticas de manejo.

Por essas razões, o desenvolvimento do nosso software visa a criação de interfaces simples e intuitivas, as quais os produtores rurais possam ter um uso mais eficaz das ferramentas de gestão, ampliando, dessa forma, a acessibilidade dos usuários e contribuindo para o aumento da competitividade e do lucro desses agricultores. Por fim, objetivamos abranger as mais diversas práticas agrícolas para atender todos os produtores e tipos de cultura, de modo a tornar o software flexivel, a fim de promover a gestão de qualquer cenário que um agricultor possa ter em sua propriedade. 

Enquanto isso, no que tange a novas oportunidades de melhorias, podemos citar a integração com tecnologias emergentes, de modo que o produtor rural tenha cada vez mais acesso a ferramentas capazes de transformar a forma de gerenciar suas operações. Além, da automação de processos, que permite a execução das tarefas, antes realizadas manualmente, de forma mais eficiente, como controlar o estoque de sementes e fertilizantes.

Por tais motivos, dividimos nosso software em quatro processos principais, os quais podemos citar: 

Processo de Plantio: A ideia principal desse processo passa por ordenar e centralizar o plantio de um agricultor. Dessa forma, será possível planejar o calendário a partir das datas de plantio e das prováveis datas de colheita.

será possível realizar o cadastro de culturas e suas especificações, o controle do terreno, que serão registrados no Banco de Dados. Além disso, será possível

Processo de Gerenciamento de Insumos: Neste processo, nosso foco é no gerenciamento de produtos agrícolas. Nesse contexto, o usuário será capaz de realizar distintas ações, tais como: 
* Cadastrar insumos: Nessa etapa, o agricultor poderá inserir as informações do produto, o tipo e suas especificações, que será registrado no Banco de Dados. 
* Visualizar insumos: Nessa parte, o produtor rural poderá verificar os produtos em estoque e assim, determinar uma quantidade mínima armazenada para que ele seja avisado sobre a necessidade de repor o estoque.
* Utilizar insumos: Essa parte estará diretamente relacionada com os processos de Plantio e Colheita, uma vez que, ao utilizar o insumo nesses processos, ele será reduzido no estoque. 

Processo de Gerenciamento de Culturas: Nesse processo, o agricultorar terá total controle sobre suas culturas agrícolas, podendo realizar o cadastro de cada cultura e suas especificações, bem como alocar o terreno que será ocupado por ela.

Processo de Colheita: Nesse último processo, a ideia é oferecer o monitoramento dos recursos utilizados na colheita e a quantidade de sacas produzidas em uma lavoura.


### 3.3. Modelagem dos processos

[Processo de Plantio](ProcessoPlantio.md "Detalhamento do Processo 1.")

[Processo de Gerenciamento de Insumos](ProcessoGerenciamentoInsumos.md "Detalhamento do Processo 2.")

[Processo de Gerenciamento de Cultura](ProcessoGerenciamentoCultura.md "Detalhamento do Processo 3.")

[Processo de Colheita](ProcessoColheita.md "Detalhamento do Processo 4.")

## 4. Projeto da solução

_O documento a seguir apresenta o detalhamento do projeto da solução. São apresentadas duas seções que descrevem, respectivamente: modelo relacional e tecnologias._

[Projeto da solução](solution-design.md "Detalhamento do projeto da solução: modelo relacional e tecnologias.")


## 5. Indicadores de desempenho

_O documento a seguir apresenta os indicadores de desempenho dos processos._

[Indicadores de desempenho dos processos](performance-indicators.md)


## 6. Interface do sistema

_A sessão a seguir apresenta a descrição do produto de software desenvolvido._ 

[Documentação da interface do sistema](interface.md)

## 7. Conclusão

Ao longo do trabalho, cada etapa do desenvolvimento foi fundamental para nosso aprendizado, desde a análise de requisitos, que nos permitiu compreender as necessidades específicas do setor agrícola, até a implementação das funcionalidades, onde consolidamos nossa visão prática e técnica sobre o projeto. Durante esse processo, enfrentamos desafios, como problemas na comunicação e no trabalho em equipe, e a criação de uma interface amigável e completa. Esses obstáculos, embora desafiadores, foram essenciais para expandir nosso conhecimento e nos preparar para lidar com problemas semelhantes em projetos futuros.

Apesar de o sistema ainda não ter sido amplamente testado em um ambiente real, os resultados alcançados durante o desenvolvimento demonstram que é possível atender aos requisitos definidos inicialmente.

O projeto demonstra, portanto, grande potencial para impactar positivamente a gestão rural, fornecendo uma solução que equilibra simplicidade, funcionalidade e acessibilidade, contribuindo não apenas para a competitividade dos produtores no mercado, mas também para o crescimento sustentável da agricultura.

Seguem as observações pessoais:

Felipe Augusto - Gostei muito de trabalhar neste projeto, especialmente por abordar um tema tão relevante como a gestão agrícola. No entanto, a carga das tarefas acabou recaindo sobre poucos integrantes do grupo, o que exigiu mais esforço de alguns. Apesar disso, considero que essa experiência foi muito enriquecedora, pois consegui expandir significativamente meu conhecimento, especialmente na área de frontend, além de aprender sobre outras etapas do desenvolvimento de software.

Guilherme Vieira - O Trabalho Interdisciplinar foi um projeto de suma importância para fixarmos os conteúdos aprendidos durante o semestre. Durante o projeto, pude desenvolver tanto habilidades técnicas, como a implementação de um banco de dados, a integração com o front-end, novas ferramentas, tais como o React, quanto habilidades interpessoais. Fui escolhido para ser o líder do grupo, o que me possibilitou desenvolver habilidades de liderança, comunicação, trabalho em equipe, proatividade e pragmaticidade.
Porém, nem tudo ocorreu como esperávamos. A falta de interesse de alguns membros do grupo gerou uma sobrecarga de tarefa em poucos integrantes, tornando o trabalho mais exaustivo. Apesar disso, foi uma experiência enriquecedora e única. 

Enzo Casaes - Gostei de desenvolver essa aplicação e foi uma otima oportunidade de colocar todos os conhecimentos em prática, além de buscar aprender novas tecnologias para ampliar nosso portfólio e faciliatar na hora de implementar nossa solução. Foi bastante gratificante o resultado que obtemos, gostei muito de desenvolver sobre esse tema que move o Brasil. Teve alguns apesares dentro do grupo em si, mas depois de algumas reuniões o grupo fluiu bem.

Gabriel Reis -  Foi uma vivência valiosa e desafiadora. Neste processo, adquiri os princípios básicos do desenvolvimento front-end, utilizando linguagens como HTML, CSS e JavaScript para desenvolver interfaces atrativas e eficientes. Também me aprofundei no back-end, compreendendo o processamento e a integração de dados, o que expandiu meu entendimento sobre a operação de sistemas completos. Ademais, tive a chance de utilizar o React, o que me possibilitou criar componentes reutilizáveis e compreender mais profundamente o conceito de estados e props.
Essa jornada me ofereceu não só competências técnicas, mas também competências de solução de problemas e organização, fundamentais para converter conceitos em uma plataforma útil e eficiente. O aprendizado foi contínuo, e cada obstáculo vencido aumentou minha confiança e me preparou para futuros projetos.


Marcos Antunes - Participar deste projeto foi uma experiência muito interessante, principalmente por ser focado na agricultura, um tema tão importante para o Brasil. Foi legal poder aprender mais sobre como a tecnologia pode ajudar nesse setor. Além disso, tive a chance de melhorar minhas habilidades em ferramentas novas e entender melhor como integrar o frontend com o backend e o banco de dados. Foi uma experiência que me ajudou bastante e que com certeza vai contribuir para o meu aprendizado e para o meu futuro profissional.

Lucas Dolabela - Participar de um projeto tão importante como esse foi enriquecedor, embora eu tenha ficado frustrado por muitas vezes não ter conseguido contribuir como esperado. Aprendi bastante nesse projeto, com cada integrante do grupo me dando o devido apoio. Creio que, com essa experiência, consegui adquirir um aprendizado maior, tanto na programação quanto em todo esse universo agrícola, que é tão importante para o mundo e, em especial, para o Brasil. Gostaria de agradecer a cada membro do grupo por ajudar a esclarecer nossas dúvidas. Cada um foi importante de uma maneira única.

Gustavo Ignacio - Participar deste projeto foi desafiador e, ao mesmo tempo, muito enriquecedor. Embora eu não tenha conseguido contribuir tanto para o trabalho em equipe quanto gostaria, essa experiência foi fundamental para o meu aprendizado. Pude desenvolver habilidades técnicas importantes como aprender a utilizar um pouco mais o react e sobre a implementação de backend com banco de dados e frontend, entender melhor o processo de desenvolvimento de sistemas e refletir sobre como posso melhorar minha colaboração em futuros projetos. Apesar das dificuldades, considero este trabalho uma experiência valiosa, que certamente contribuiu para o meu crescimento pessoal e acadêmico e agradeço a todos os integrantes, principalmente o Guilherme, Felipe e Enzo por me ajudarem em momentos de dúvidas sobre o projeto.

# REFERÊNCIAS

_Verifique no link abaixo como devem ser as referências no padrão ABNT:_

http://portal.pucminas.br/imagedb/documento/DOC_DSC_NOME_ARQUI20160217102425.pdf

**[1.1]** - _ORGANIZAÇÃO DAS NAÇÕES UNIDAS PARA ALIMENTAÇÃO E AGRICULTURA. **How to feed the world in 2050**. Rome: FAO, 2009. Disponível em: https://www.fao.org/fileadmin/templates/wsfs/docs/expert_paper/How_to_Feed_the_World_in_2050.pdf._

**[1.2]** - _RIBEIRO, Tomás; CUNHA, Marina. **Agricultura familiar no Brasil: evidências a partir do Censo Agropecuário de 2017**. 2020. Disponível em: https://www.anpec.org.br/sul/2024/submissao/files_I/i4-001e61d45a9e32544c5225e464b7f449.pdf_

**[1.3]** - _BRASIL. Ministério da Agricultura e Pecuária. **Exportações do agronegócio fecham 2023 com US$ 166,55 bilhões em vendas**. Disponível em: https://www.gov.br/agricultura/pt-br/assuntos/noticias/exportacoes-do-agronegocio-fecham-2023-com-us-166-55-bilhoes-em-vendas._

**[1.4]** - _EMPRESA BRASILEIRA DE PESQUISA AGROPECUÁRIA. **A agricultura brasileira**. Disponível em: https://www.embrapa.br/vii-plano-diretor/a-agricultura-brasileira#:~:text=%C3%89%20um%20dos%20setores%20que,...%2C%202020._

**[1.5]** - Tarken. Disponível em: https://www.tarken.com.br

**[1.6]** - AgroHub. Disponível em: https://agrohub.com.br/?gad_source=1&gclid=Cj0KCQjwiuC2BhDSARIsALOVfBJBVdf-NBJbRz5F8weQOwNN_kMxGrm7Lmopa30j4rmusiWTxmw5YLMaAs8PEALw_wcB



# APÊNDICES


_Atualizar os links e adicionar novos links para que a estrutura do código esteja corretamente documentada._


## Apêndice A - Código fonte

[Código do front-end](../G-AGRO/src/frontend) -- repositório do código do front-end

[Código do back-end](../G-AGRO/src/backend)  -- repositório do código do back-end


## Apêndice B - Apresentação final


[Slides da apresentação final](presentations/)


[Vídeo da apresentação final](video/)






