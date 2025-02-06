# 🏆 Desafio Backend - NestJS + GraphQL + TypeORM

## Pré-requisitos para executar a aplicação:
 - [Node.js](https://nodejs.org/pt)
 - De acordo com seu sistema operacional:
   - [Docker Desktop - Windows](https://docs.docker.com/desktop/setup/install/windows-install/)
   - [Docker Desktop - Mac](https://docs.docker.com/desktop/setup/install/mac-install/)
   - [Docker Desktop - Linux](https://docs.docker.com/desktop/setup/install/linux/)

## Instalação das dependências

Considerando que você já tenha o Node e o Docker instalado, no diretório raiz do projeto, execute:
```bash
$ npm install
```

Para executar a aplicação em modo de desenvolvimento:

```bash
$ docker-compose up
```
## Para executar os testes

Únitarios
```bash
$ npm run test:unit
```


## Rodei a aplicação, e agora?
Você pode acessar o playground do GraphQL através da rota: `localhost:3000/graphql`

Nele você encontrará os Schemas da API e uma documentação dos resolvers que podem ser usados

![Ilustração do playground](./docs/playground-graphql.png)

#  Exemplo de requisições
## Todas as rotas exigem autenticação, com exceção da rota de criar usuário e login. No playground terá um campo de Http Headers. O token de autorização deve estar no seguinte formato:
```
{
  "Authorization": "Bearer aquivaiotoken"
}
```
## Criação de usuário
```graphql
mutation {
  createUser(
    createUserInput: {
      name: "Teste"
      email: "teste@gmail.com"
      password: "Teste123"
    }
  ) {
    message
    data {
      id
    }
  }
}
```

## Login
```graphql
mutation {
  login(loginInput: { email: "teste@gmail.com", password: "Teste123" }) {
    token
    userId
  }
}
```

## Retornar dados do usuário pelo e-mail (Inclui endereços e compras)
```graphql
query {
  getUserByEmail(email: "teste@gmail.com") {
    id
    email
    name
    addresses {
      id
      street
      number
      zipCode
      city
      state
    }
    purchases {
      totalAmount
      purchaseDate
    }
  }
}
```

## Listar todos os usuários cadastrados (Não foi implementada paginação)
```graphql
query {
  getUsers {
    id
    email
  }
}
```

## Editar um usuário
```graphql
mutation {
  updateUser(
    updateUserInput: {
      id: "2f80892a-8e4e-4555-99f7-49db0a809359"
      data: { name: "Teste 1231232" }
    }
  ) {
    message
  }
}
```

## Deletar um usuário
```graphql
mutation {
  deleteUser(deleteUserInput: { id: "2f80892a-8e4e-4555-99f7-49db0a809359" }) {
    message
  }
}
```

## Cadastrar um endereço associado a um usuário
```graphql
mutation {
  createAddress(
    createAddressInput: {
      street: "RUA"
      number: 130
      zipCode: "08552-340"
      city: "Poá"
      state: "São Paulo"
      userId: "2caadca2-192a-4e55-8494-03c06eaecc59"
    }
  ) {
    message
    data {
      id
    }
  }
}
```

## Retornar lista de endereços de um usuário
```graphql
query {
  getAddressesByUserId(userId: "d36e5399-c905-4651-bec2-ef6c55cd0d18") {
    street
    number
    zipCode
    city
    state
  }
}
```

## Editar um endereço  (No exemplo, alteramos o nome da rua, mas todos os campos são editaveis)
```graphql
mutation {
  updateAddress(
    updateAddressInput: {
      id: "98a760dd-6d43-439a-9197-e00db2e84a43"
      data: { street: "Teste 1231232" }
    }
  ) {
    message
  }
}
```

## Deletar um endereço
```graphql
mutation {
  deleteAddress(
    deleteAddressInput: { id: "98a760dd-6d43-439a-9197-e00db2e84a43" }
  ) {
    message
  }
}
```

## Cadastrar uma compra
```graphql
mutation {
  createPurchase(
    createPurchaseInput: {
      totalAmount: "199.90"
      userId: "d36e5399-c905-4651-bec2-ef6c55cd0d18"
    }
  ) {
    message
    data {
      id
    }
  }
}
```

## Retornar compras de um usuário
```graphql
query {
  getPurchasesByUserId(userId: "d36e5399-c905-4651-bec2-ef6c55cd0d18") {
    totalAmount
    purchaseDate
    id
  }
}
```

## Deletar uma compra
```graphql
mutation {
  deletePurchase(
    deletePurchaseInput: { id: "398f6c4c-ec68-4bab-9e18-a36732443797" }
  ) {
    message
  }
}
```





