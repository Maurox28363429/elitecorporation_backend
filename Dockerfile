# Usa la imagen base de Node.js 19
FROM node:19

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al directorio de trabajo
COPY . .

# Expone el puerto en el que se ejecuta el backend
EXPOSE 3000

# Define el comando para iniciar el backend
CMD [ "npm", "start" ]