# Use uma imagem base Node.js leve, como o Alpine Linux
FROM node:18-alpine AS builder

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instale as dependências de produção
RUN npm ci --production

# Copie todo o código-fonte para o contêiner (exceto os arquivos na .dockerignore)
COPY . .

# Execute o comando 'npm run build' para criar uma versão otimizada da aplicação Next.js
RUN npm run build

# Etapa de construção concluída, agora começamos com uma imagem mais leve
FROM node:18-alpine

# Defina o diretório de trabalho novamente
WORKDIR /app
RUN mkdir ./.next
# Copie apenas os arquivos necessários da etapa anterior (builder)
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Exponha a porta em que o servidor Next.js será executado
EXPOSE 3000

# Configure a variável de ambiente NODE_ENV para 'production'
ENV NODE_ENV=production

# Execute o comando 'npm start' para iniciar a aplicação em produção
CMD ["npm", "start"]
