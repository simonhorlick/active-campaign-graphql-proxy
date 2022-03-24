# Active Campaign GraphQL proxy

This application proxies requests to active campaign so that this can be used as a remote data source in hasura.

## Getting started

Start the server:

```bash
AC_URL=https://admiraldigital1643338630.api-us1.com AC_KEY=XXX node index.js
```

Try this example query:

```bash
curl -H 'Content-Type: application/json' -d '{"operationName":"QueryLists","variables":{"limit":5,"offset":0},"query":"query QueryLists($offset: Int!, $limit: Int!) {\n    lists(offset: $offset, limit: $limit) {\n      meta {\n        total\n      }\n      lists {\n        id\n        stringid\n        userid\n        name\n      }\n    }\n  }\n"}' http://localhost:4000
```
