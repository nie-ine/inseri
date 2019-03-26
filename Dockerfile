FROM teracy/angular-cli as builder

COPY . ./nieOS

WORKDIR ./nieOS

RUN rm -R ./backend/.settings || true

RUN npm install --global yarn

RUN chown -R node:node .
USER node

# RUN npm install --save bcrypt-nodejs
RUN yarn --no-lockfile

ENV PATH="$PATH:node_modules/@angular/cli/bin"

RUN ng build --prod --optimization=false
