# Use a imagem Node.js como base
FROM node:18

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos do projeto para o contêiner
COPY . .

# Instale o Next.js
RUN npm install -g next@13.4.19

# Instale as dependências do projeto
RUN npm install

# Exponha a porta em que o servidor Next.js será executado
EXPOSE 3000

# Inicie o servidor Next.js no modo de desenvolvimento
CMD ["npm", "run", "dev"]
