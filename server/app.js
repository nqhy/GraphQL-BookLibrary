const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./schema/schema')
const app = express();

mongoose.connect("mongodb://zekiptg:Zeki123456@ds261616.mlab.com:61616/gql-ziik", {useNewUrlParser: true})

mongoose.connection.once('open', () => {
  console.log('connected to databse')
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))

app.listen(3000, () => {
  console.log("Now listening requests on port 3000")
})
