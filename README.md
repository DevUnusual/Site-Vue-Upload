# 🚀 Site Vue Upload

Este é um projeto de estudo focado em aprofundar os conhecimentos em Vue.js, Vuetify e Node.js, implementando um sistema completo de upload e download de arquivos.

A aplicação permite que o usuário envie arquivos grandes de forma eficiente através da técnica de **chunking** (divisão do arquivo em partes menores). A interface, construída com Vuetify, oferece uma experiência de usuário clara e informativa, com uma barra de progresso animada e um stepper que detalha cada etapa do processo. O backend consiste em um servidor simples em Node.js com Express, responsável por receber os chunks, remontar o arquivo original e disponibilizá-lo para download.

## ✨ Funcionalidades Principais

* **Upload de Arquivos em Chunks:** Envio de arquivos robusto que divide o arquivo em partes, ideal para arquivos grandes e conexões instáveis.
* **Barra de Progresso Animada:** Feedback visual em tempo real do progresso do upload.
* **Stepper de Status (`v-stepper`):** Acompanhamento visual das etapas do processo:
    1.  **Enviando:** O arquivo está sendo enviado em partes para o servidor.
    2.  **Processando:** O servidor está juntando as partes para recriar o arquivo original.
    3.  **Concluído:** O upload foi finalizado com sucesso.
* **Ícone Customizado:** Exemplo de como personalizar o componente `v-file-upload` do Vuetify para se adequar ao design do projeto.
* **Download de Arquivos:** Após a conclusão do upload, um card de download é exibido, permitindo que o usuário baixe o arquivo diretamente do servidor.
* **Backend com Node.js:** Servidor simples e eficiente usando Express e Multer para gerenciar os uploads.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

* **Frontend:**
    * [Vue.js](https://vuejs.org/)
    * [Vuetify](https://vuetifyjs.com/en/)
    * [Vite](https://vitejs.dev/)
* **Backend:**
    * [Node.js](https://nodejs.org/en)
    * [Express](https://expressjs.com/pt-br/)
    * [Multer](https://github.com/expressjs/multer) para manipulação de `multipart/form-data`.
    * [CORS](https://github.com/expressjs/cors) para permitir requisições entre diferentes origens (frontend e backend).

## ⚙️ Como Executar o Projeto

Para rodar este projeto localmente, siga os passos abaixo.

### Pré-requisitos

* Certifique-se de ter o [Node.js](https://nodejs.org/en/download/) (versão 16 ou superior) instalado em sua máquina.

### 1. Backend (Servidor)

Primeiro, vamos iniciar o servidor que irá receber os arquivos.

```bash
# 1. Clone o repositório (se ainda não o fez)
git clone [<URL_DO_REPOSITORIO>](https://github.com/DevUnusual/Site-Vue-Upload)

# 2. Navegue para a pasta do projeto
cd site-vue-upload

# 3. Instale as dependências do servidor
npm install

# 4. Inicie o servidor
node server.js
```

O servidor estará em execução em `http://localhost:3000`.

### 2. Frontend (Cliente Vue)

Com o backend rodando, abra um **novo terminal** e inicie a aplicação Vue.

```bash
# 1. Navegue para a pasta do projeto (se não estiver nela)
cd site-vue-upload

# 2. Instale as dependências do cliente
npm install

# 3. Execute o servidor de desenvolvimento
npm run dev
```

Abra seu navegador e acesse a URL fornecida pelo Vite (geralmente `http://localhost:5173`).

## 📁 Estrutura do Projeto

```
.
├── src/
│   ├── components/
│   │   ├── FileUploader.vue     # Componente principal com a lógica de upload e UI
│   │   └── icons/
│   │       └── GenericFileIcon.vue # Ícone SVG customizado para o input
│   ├── App.vue                  # Componente raiz da aplicação
│   └── main.js                  # Ponto de entrada do Vue e configuração do Vuetify
├── index.html                   # Arquivo HTML principal
├── package.json
└── server.js                    # Lógica do backend (Node.js/Express)
