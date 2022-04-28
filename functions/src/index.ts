import { ApolloServer, gql } from "apollo-server-cloud-functions";
import * as functions from "firebase-functions";
import { RESTDataSource } from "apollo-datasource-rest";

const typeDefs = gql`
  type Place {
    name: String!
    state: String!
  }

  type Query {
    findPlaces(countryCode: String!, zipCode: String!): [Place!]!
  }
`;
class ZippoAPI extends RESTDataSource {
  baseURL = "https://api.zippopotam.us";
  getPlace(countryCode: string, zipCode: string) {
    return this.get<{
      places: [
        {
          ["place name"]: string;
          state: string;
        }
      ];
    }>(`/${countryCode}/${zipCode}`);
  }
}

const resolvers = {
  Query: {
    findPlaces: async (
      _: any,
      { countryCode, zipCode }: { countryCode: string; zipCode: string },
      { dataSources: { zippoAPI } }: { dataSources: { zippoAPI: ZippoAPI } }
    ) => {
      const response = await zippoAPI.getPlace(countryCode, zipCode);
      return response.places.map((place) => ({
        name: place["place name"],
        state: place.state,
      }));
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      zippoAPI: new ZippoAPI(),
    };
  },
});

const handler = server.createHandler();

// Have to cast to any as although the createHandler call will return a function with req, res args TS throws a wobbly
exports.graphql = functions.https.onRequest(handler as any);
