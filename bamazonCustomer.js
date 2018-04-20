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
                // console.log("Your item: " + results.item_id[i])
                updateQuantity(results[i]);
            }

        }
    })})};

    function updateQuantity(chosenProduct) {
        var query = connection.query("SELECT * FROM products", function(err, result) {
        if (err) throw err;
        console.log("--------------------------------------------");
        console.log("Your item: " + JSON.stringify(chosenProduct.product_name));
        console.log("The price: $" + JSON.stringify(chosenProduct.price));
        console.log("In stock: " + JSON.stringify(chosenProduct.stock_quantity));
        console.log("--------------------------------------------");
        newQuantity = chosenProduct.stock_quantity - chosenQuantity;
        if (chosenQuantity <= chosenProduct.stock_quantity) {
            // bid was high enough, so update db, let the user know, and start over
         console.log("You can totally buy this!");
        "UPDATE products SET ? WHERE ?",
            [
                {
                    item_id: chosenItem
                  },
                  {
                    stock_quantity: newQuantity
                  }
            ],
            function(error, res) {
                console.log(res.affectedRows + " Songs updated!\n");
                console.log(error);
                if (error) throw err}
                console.log("--------------------------------------------");
                console.log("You just spent $" + (chosenQuantity * chosenProduct.price) + " on " + chosenQuantity + " " + chosenProduct.product_name +"(s) !");
                console.log("--------------------------------------------");
                console.log("Thanks for shopping at Shane's Bamazon! See you next time!")
                console.log("--------------------------------------------");
                connection.end();       
         }
          else {
            // bid wasn't high enough, so apologize and start over
            console.log("I'm sorry, we'll have to order more...");
            afterConnection();
           
          }
        });
    };

  