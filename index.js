require("dotenv").config()

const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const express = require("express")
const expressJwt = require("express-jwt")
const cors = require("cors")
//import ApolloServer
const { ApolloServer } = require("apollo-server-express")
//import typedefs and resolvers
const Resolvers = require("./resolvers")
const TypeDefs = require("./schema")

mongoose.Promise = global.Promise

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(success => {
    console.log('Success Mongodb connection')
  }).catch(err => {
    console.log('Error Mongodb connection')
  });

  var app = express()
  app.use(bodyParser.json())
  app.use("*", cors())

  // JWT
  app.use(
      expressJwt({
          secret: "SUPER_SECRET",
          algorithms: ["HS256"],
          credentialsRequired: false,
      })
  );

  // Apollo
  const server = new ApolloServer({
    typeDefs: TypeDefs.typeDefs,
    resolvers: Resolvers.resolvers,
    context: ({ req }) => {
        const user = req.user || null;
        return user;
  },
});

//Add Express app as middleware to Apollo Server
server.applyMiddleware({ app })

app.listen(3000, () => {
    console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
});
