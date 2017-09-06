import "reflect-metadata";

module.exports = () => require(`./${process.env.NODE_ENV}.env.js`);