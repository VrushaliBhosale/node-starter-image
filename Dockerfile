FROM node:12.18.1

# Create working directory
WORKDIR /src

# Copy the package json file into root directory
COPY ["package.json", "package-lock.json*", "./"]

# get all node packages installed
RUN npm install
RUN npm install tsc -g
RUN tsc

# Copry the working dev files into the image 
COPY . .
EXPOSE 8000
CMD [ "node", "./build/index.js" ]
