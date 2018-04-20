var inquirer = require("inquirer");
var mysql = require("mysql");
var chosenQuantity;
var chosenItem;
var newQuantity;

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : 'root',
  database : 'bamazon_db'
});

connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log("Welcome to the Shane's Bamazon");
  afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
    //   console.log(res);
      for (i=0; i<res.length; i++) {
        console.log("--------------------------------------------");
          console.log("Product id: " + res[i].item_id);
          console.log("Product Name: " + res[i].product_name);
          console.log("Product Price: " + res[i].price);
          console.log("Product Department: " + res[i].department_name);
          console.log("--------------------------------------------");
      }
      buyItem();
    });
  }
  
  function buyItem() {
    inquirer.prompt([
      
        {
            type: "input",
            message: "Enter the product number you'd like to buy",
            name: "itemId"
        },
        {
            type: "input",
            message: "How many would you like?",
            name: "quantity"
        }
    ]).then(function(answer) {
        connection.query("SELECT * FROM products", function(err, results, fields) {
            if (err) throw err;
        chosenQuantity = parseInt(answer.quantity);
        chosenItem = parseInt(answer.itemId);
        console.log("Your prod choice: " + chosenItem);
        console.log("Your num choice: " + chosenQuantity);
        for(var i=0; i < results.length; i++) {
            if (chosenItem === results[i].item_id) {
                updateQuantity(results[i]);
            }

        }
    })})};
  
    function updateQuantity(chosenProduct) {
        var query = connection.query("SELECT * FROM products", function(err, result) {
        if (err) {throw err;}
        console.log("--------------------------------------------");
        console.log("Your item: " + JSON.stringify(chosenProduct.product_name));
        console.log("The price: $" + JSON.stringify(chosenProduct.price));
        console.log("In stock: " + JSON.stringify(chosenProduct.stock_quantity));
        console.log("--------------------------------------------");
        newQuantity = chosenProduct.stock_quantity - chosenQuantity;
        if (chosenQuantity <= chosenProduct.stock_quantity) {
        console.log("You can totally buy this!");
        connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [newQuantity,chosenItem],
          function(error, res) {
            if (error) throw err
            console.log("--------------------------------------------");
            console.log("You just spent $" + (chosenQuantity * chosenProduct.price) + " on " + chosenQuantity + " " + chosenProduct.product_name +"(s) !");
            console.log("--------------------------------------------");
            console.log("Thanks for shopping at Shane's Bamazon! See you next time!")
            console.log("--------------------------------------------");
            connection.end();
           })
         }else {
            console.log("I'm sorry, we'll have to order more...");
            afterConnection();
         }
        });
      }















    // function updateQuantity(chosenProduct) {
    //     var query = connection.query("SELECT * FROM products", function(err, result) {


    //     if (err) throw err;
    //     console.log("--------------------------------------------");
    //     console.log("Your item: " + JSON.stringify(chosenProduct.product_name));
    //     console.log("The price: $" + JSON.stringify(chosenProduct.price));
    //     console.log("In stock: " + JSON.stringify(chosenProduct.stock_quantity));
    //     console.log("--------------------------------------------");
    //     newQuantity = chosenProduct.stock_quantity - chosenQuantity;


    //     else if (chosenQuantity <= chosenProduct.stock_quantity) {
    //      console.log("You can totally buy this!");
            
    //      connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?",
    //      [newQuantity, chosenItem],
    //         function(error, res) {
    //             console.log(res.affectedRows + " Songs updated!\n");
    //             console.log(error);
    //             if (error) throw err
    //         }
    //             console.log("--------------------------------------------");
    //             console.log("You just spent $" + (chosenQuantity * chosenProduct.price) + " on " + chosenQuantity + " " + chosenProduct.product_name +"(s) !");
    //             console.log("--------------------------------------------");
    //             console.log("Thanks for shopping at Shane's Bamazon! See you next time!")
    //             console.log("--------------------------------------------");
    //             console.log(newQuantity);
    //             connection.end();       
    //     )}
    //       else if {
    //         console.log("I'm sorry, we'll have to order more...");
    //         afterConnection();
           
    //       })}
    //     ;
    

  