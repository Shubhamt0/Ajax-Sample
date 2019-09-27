var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');



var products = [
{
    id: 1,
    name: 'laptop'
},
{
    id: 2,
    name: 'microwave'
}
];

var currentId = 2;



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'views')));

//app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/products', function(req, res) {
    res.send({ products: products });
});

app.post('/products', function(req, res) {
    var productName = req.body.name;
    currentId++;

    products.push({
        id: currentId,
        name: productName
    });

    res.send('Successfully created product!');
});

app.put('/products/:id', function(req, res) {
    var id = req.params.id;
    var newName = req.body.newName;

    var found = false;

    products.forEach(function(product, index) {
        if (!found && product.id === Number(id)) {
            product.name = newName;
        }
    });

    res.send('Succesfully updated product!');
});

app.delete('/products/:id', function(req, res) {
    var id = req.params.id;

    var found = false;

    products.forEach(function(product, index) {
        if (!found && product.id === Number(id)) {
            products.splice(index, 1);
        }
    });

    res.send('Successfully deleted product!');
});

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});

