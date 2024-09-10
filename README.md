Desafio JackExperts Front

Este projeto é uma aplicação front-end desenvolvida em React para gerenciar tarefas.

Tecnologias Utilizadas
React: Biblioteca para construção de interfaces de usuário.
Styled-Components: Biblioteca para estilização de componentes utilizando CSS-in-JS.
Framer Motion: Biblioteca para animações em React.
React Router DOM: Biblioteca para gerenciamento de rotas na aplicação.
React Toastify: Biblioteca para notificações.
Axios: Cliente HTTP para realizar requisições API.
Date-fns: Biblioteca para manipulação de datas.
React Awesome Reveal: Biblioteca para animações de entrada.
Swiper: Biblioteca para sliders/carrosséis.


- Instalação e Execução

Para rodar este projeto localmente, siga os passos abaixo:

Clone o Repositório

git clone https://github.com/seu-usuario/desafio-jackexperts-front.git
Navegue até o Diretório do Projeto


cd desafio-jackexperts-front



Instale as Dependências

Utilize o npm ou yarn para instalar as dependências do projeto:

npm install
ou
yarn install

Inicie o Servidor de Desenvolvimento

npm start
ou
yarn start

A aplicação estará disponível em http://localhost:3000.



Construir o Projeto para Produção

npm run build
ou


yarn build
Isso criará uma versão otimizada da aplicação na pasta build.



Rodar Testes

Para executar os testes, utilize:

npm run test
ou
yarn test




- Estrutura do Projeto

O projeto é estruturado da seguinte forma:

src/: Diretório principal contendo o código-fonte da aplicação.

components/: Componentes reutilizáveis da aplicação.

context/: Contextos para gerenciamento de estado global.

pages/: Páginas da aplicação.

services/: Serviços para comunicação com APIs.

styles/: Arquivos de estilização globais.

App.js: Componente principal da aplicação.

index.js: Ponto de entrada da aplicação.



- Decisões durante o Desenvolvimento e Elaboração do projeto

Styled-Components: Escolhi o Styled-Components para uma abordagem moderna de estilização, permitindo o uso de CSS-in-JS para manter os estilos coesos com seus componentes. Esta abordagem facilita a manutenção e a escalabilidade dos estilos, além de promover um melhor encapsulamento e uma maior clareza no código.

Framer Motion e React Awesome Reveal: Utilizei essas bibliotecas para implementar animações de forma simples e eficiente, melhorando a experiência do usuário.

React Router DOM: Escolhi esta biblioteca para gerenciar as rotas da aplicação, permitindo a navegação entre diferentes páginas sem recarregar a página.

Axios: Utilizei o Axios para realizar requisições HTTP à API. Sua simplicidade e flexibilidade o tornaram ideal para lidar com chamadas de API.

React Toastify: Para notificações e alertas, escolhi o React Toastify devido à sua fácil integração e configuração.

Date-fns: Optei por esta biblioteca para manipulação de datas devido à sua simplicidade e imutabilidade.

Swiper: Utilizei o Swiper para criar sliders/carrosséis, proporcionando uma interface interativa e visualmente atraente.

