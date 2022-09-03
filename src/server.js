import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
// import { Logger } from "./Middleware/LogEvent";
// import ErrorHandler from "./Middleware/ErrorHandler";
import path from "path"
const __dirname = path.resolve();
import cors from "cors";
const PORT = process.env.PORT || 3500;
const HOST_NAME = process.env.HOST_NAME || "localhost";
const typeDefs = gql`
  type Query {
    hello: String!
    cats: [Cat!]!
  }
  type Cat {
    id: ID!
    name: String!
  }
  type Mutation {
    createCat(name: String!): Cat!
  }
`;
const resolvers = {
  Query: {
    hello: () => "hi",
    cats: () => Cat.find(),
  },
  Mutation: {
    createCat: async (_, { name }) => {
      const kitty = new Cat({ name });
      await kitty.save();
      return kitty;
    },
  },
};
const startServer = async () => {
  const app = express();
  // app.use(Logger);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  const whitelist = [
    "https://www.yoursite.com",
    "http://127.0.0.1:5500",
    "http://localhost:3500",
  ];
  //Cors option
  const corsOptions = {
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    optionsSuccessStatus: 200,
  };
  //Cors option
  app.use(cors(corsOptions));
  app.use(express.urlencoded({ extended: false }));

  // built-in middleware for json
  app.use(express.json());

  //serve static files
  app.use(express.static(path.join(__dirname, "/public")));
  // app.use(ErrorHandler);
  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
};

startServer();
