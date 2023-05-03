import algoliasearch from "algoliasearch";
const client = algoliasearch("AH1LWMKMDG", process.env.ID);
const index = client.initIndex("pets");

export { index };
