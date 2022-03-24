const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const { getData } = require("./helpers");

const typeDefs = gql`
  type Meta {
    total: String
  }

  type Links {
    contactGoalLists: String
    user: String
    addressLists: String
  }

  type List {
    stringid: String
    userid: String
    name: String
    cdate: String
    p_use_tracking: String
    p_use_analytics_read: String
    p_use_analytics_link: String
    p_use_twitter: String
    p_use_facebook: String
    p_embed_image: String
    p_use_captcha: String
    send_last_broadcast: String
    private: String
    analytics_domains: String
    analytics_source: String
    analytics_ua: String
    twitter_token: String
    twitter_token_secret: String
    facebook_session: String
    carboncopy: String
    subscription_notify: String
    unsubscription_notify: String
    require_name: String
    get_unsubscribe_reason: String
    to_name: String
    optinoptout: String
    sender_name: String
    sender_addr1: String
    sender_addr2: String
    sender_city: String
    sender_state: String
    sender_zip: String
    sender_country: String
    sender_phone: String
    sender_url: String
    sender_reminder: String
    fulladdress: String
    optinmessageid: String
    optoutconf: String
    deletestamp: String
    udate: String
    created_timestamp: String
    updated_timestamp: String
    created_by: String
    updated_by: String
    id: String
    user: String
    links: Links
  }

  type Lists {
    meta: Meta
    lists: [List]
  }

  type Query {
    lists(limit: Int, offset: Int): Lists
  }
`;

const resolvers = {
  Query: {
    lists: async (_, params) => {
      console.log(`got request lists(${JSON.stringify(params)})`);

      let searchParams = new URLSearchParams(params);

      const headers = {
        Accept: "application/json",
        "Api-Token": process.env.AC_KEY,
      };

      return await getData(
        process.env.AC_URL + "/api/3/lists" + "?" + searchParams.toString(),
        headers
      );
    },
  },
};

const schema = new ApolloServer({
  typeDefs,
  resolvers,
});

schema.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`schema ready at ${url}`);
});
