## Installation

Install NVM

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
source ~/.bashrc
```

Install node

```
nvm install --lts
nvm alias default lts/*
nvm use lts/*
npm install npm -g
```

Install node-modules:

```
npm install || yarn
```

## Running project

Run backend server for CORS policy:

```
npm run node
```

Run development server with live reload:

```
npm run serve || yarn serve
```

## Set environment variables

- Copy .env.example to .env
- Set the required data
