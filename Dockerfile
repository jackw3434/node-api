FROM node:9

WORKDIR /var/www/

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD npm run dev


# Command to run in docker terminal
# docker run --name nms-container -it --rm -v /Users/Jack/development/NMS/NMS-API:/var/www/ -p 8080:8080 nms:v1.0.5       

# FROM node:9

# WORKDIR /var/www/

# RUN if [ "$NODE_ENV" = "development" ]; \
# 	then npm install;  \
# 	else npm install --only=production; \
# 	fi

# EXPOSE 8080

# CMD npm run dev

# Development command:
# docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Production command:
# docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
