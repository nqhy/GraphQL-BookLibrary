const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

const schema = require('./schema/schema')
const app = express();

// allow cross-origin requests
app.use(cors())

// Mongoose Config
mongoose.connect("mongodb://zekiptg:Zeki123456@ds261616.mlab.com:61616/gql-ziik", {useNewUrlParser: true})

mongoose.connection.once('open', () => {
  console.log('connected to databse')
})

//GraphQl end point
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))

app.listen(8000, () => {
  console.log("Now listening requests on port 8000")
})
