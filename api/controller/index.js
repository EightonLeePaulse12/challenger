const express = require("express");
const bodyParser = require("body-parser");
const routes = express.Router();
// Import all model's objects
const { users } = require("../model");
const { books } = require("../model");
const { bookAuthors } = require("../model");
const { orders } = require("../model");

// ============ User's router ==============

routes.get("/users", (req, res) => {
  users.fetchUsers(req, res);
});
routes.get("/user/:id", (req, res) => {
  users.fetchUser(req, res);
});
routes.post("/register", bodyParser.json(), (req, res) => {
  users.register(req, res);
});
routes.patch("/user/:id", bodyParser.json(), (req, res) => {
  users.updateUser(req, res);
});
routes.delete("/user/:id", (req, res) => {
  users.deleteUser(req, res);
});
routes.post("/login", bodyParser.json(), (req, res) => {
  users.login(req, res);
});

// ============ Books' router ==============
routes.get("/books", (req, res) => {
  books.fetchBooks(req, res);
});
routes.get("/book/:bookID", (req, res) => {
  books.fetchBook(req, res);
});
routes.post("/book", bodyParser.json(), (req, res) => {
  books.addBook(req, res);
});
routes.patch("/book/:bookID", bodyParser.json(), (req, res) => {
  books.updateBook(req, res);
});
routes.delete("/book/:bookID", (req, res) => {
  books.removeBook(req, res);
});

// ============ Books' router ==============
routes.get("/bookauthors", (req, res) => {
  bookAuthors.fetchAuthors(req, res);
});
routes.get("/bookauthor/:id", (req, res) => {
  bookAuthors.fetchAuthor(req, res);
});
routes.post("/bookauthor", bodyParser.json(), (req, res) => {
  bookAuthors.addAuthor(req, res);
});
routes.patch("/bookauthor/:id", bodyParser.json(), (req, res) => {
  bookAuthors.updateAuthor(req, res);
});
routes.delete("/bookauthor/:id", (req, res) => {
  bookAuthors.removeAuthor(req, res);
});

// ============ Orders' router ==============
routes.get("/orders", (req, res) => {
  orders.fetchOrders(req, res);
});
routes.get("/order/:orderID", (req, res) => {
  orders.fetchOrder(req, res);
});
routes.post(
  "/addOrder/:orderID/:userID/:bookID",
  bodyParser.json(),
  (req, res) => {
    orders.insertOrder(req, res);
  }
);
routes.patch("/order/:orderID", bodyParser.json(), (req, res) => {
  orders.updateOrder(req, res);
});
routes.delete("/order/:orderID", (req, res) => {
  orders.removeOrder(req, res);
});

module.exports = {
  express,
  routes,
};
