import algoliasearch from "algoliasearch";
const client = algoliasearch("0AH9TW5KFL", process.env.ID);

const index = client.initIndex("pets");

export { index };
