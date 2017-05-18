/*NOTE: All response from API Call will contain the following structure
/*
{
"status": "success",=====> will contain either 'success' or 'failure'
"code": 200,======> status code Ex:404,500,200
"data": {},====>>requested data
"error": ""====>>if any errors
}
*/


/*Global Variables Section*/

//Declare your Global Variables inside this block

/*End of Global Variables*/

// A $(document).ready() block.
$(document).ready(function () {

    //Write any code you want executed in a $(document).ready() block here

});

//Get List of Products from the database
function getProducts() {

    /***
    Write your code for fetching the list of product from the database
    
    Using AJAX call the webservice http://localhost:3000/products in GET method
    It will return an Array of objects as follows
    
    {
    [
    {
    "_id" : "57b6fabb977a336f514e73ef",
    "price" : 200,
    "description" : "Great pictures make all the difference. That’s why there’s the new Moto G Plus, 4th Gen. It gives you a 16 MP camera with laser focus and a whole lot more, so you can say goodbye to blurry photos and missed shots. Instantly unlock your phone using your unique fingerprint as a passcode. Get up to 6 hours of power in just 15 minutes of charging, along with an all-day battery. And get the speed you need now and in the future with a powerful octa-core processor.",
    "category" : "Smartphones",
    "name" : "Moto G Plus, 4th Gen (Black, 32 GB)",
    "productImg" : {
    "fileName" : "57b6fabb977a336f514e73ef_Product.png",
    "filePath" : "./public/images/Product/57b6fabb977a336f514e73ef_Product.png",
    "fileType" : "png"
    },
    {
    //Next Product and so on
    }
    ]
    }

    Using jQuery
    Iterate through this response array and dynamically create the products list
    using JavaScript DOM and innerHTML.
    ***/
}

//Initial call to populate the Products list the first time the page loads
getProducts("");


/*
 
Write a generic click even capture code block 
to capture the click events of all the buttons in the HTML page

If the button is remove
-----------------------
Popup an alert message to confirm the delete
if confirmed
Call the API
http://localhost:3000/product/<id>
with method = DELETE
replace <id> with the _id in the product object

Show the success/failure message in a message div with the corresponding color green/red


If the button is add
-----------------------
Using jQuery Validate the form
All fields are mandatory.
Call the API
http://localhost:3000/product
with method=POST
For this call data should be in following structure
{
name:'',
category:'',
description:'',
price:''
}

Show the success/failure messages in a message div with the corresponding color green/red
Reset the form and set the mode to Add

 
If the button is edit
---------------------
Change the Form to Edit Mode
Populate the details of the product in the form
 
 
If the button is Update
-----------------------
Using jQuery Validate the form
All fields are mandatory.
Call the API
http://localhost:3000/product/:id    
with method=PUT
replace <id> with the _id in the product object
For this call data should be in following structure
{
name:'',
category:'',
description:'',
price:''
}

Show the success/failure messages in a message div with the corresponding color green/red
Reset the Form
Set the Form back to Add mode

if the button is Cancel
-----------------------
Reset the form
Set the mode to Add

*/

/*Remove Product*/
function removeProduct(id) {

    //write your code here to remove the product and call when remove button clicked

}

/*Update Product*/
function editProduct(id) {

    //write your code here to update the product and call when update button clicked

}

function createProduct(id) {

    //write your code here to create  the product and call when add button clicked

}


/* 
//Code Block for Drag and Drop Filter

//Write your code here for making the Category List
Using jQuery
From the products list, create a list of unique categories
Display each category as an individual button, dynamically creating the required HTML Code

    
//Write your code here for filtering the products list on Drop 
Using jQuery
Show the category button with a font-awesome times icon to its right in the filter list
A category should appear only once in the filter list
Filter the products list with, products belonging to the selected categories only


//Write your code to remove a category from the filter list
Using jQuery
When the user clicks on the x icon
Remove the category button from the filter list
Filter the products list with, products belonging to the selected categories only

*/


//Code block for Free Text Search
$(document).ready(function () {
    $("#searchText").keyup(function () {

        /*Write your code here for the Free Text Search
        When the user types text in the search input box. 
        As he types the text filter the products list
        Matching the following fields
        - Name
        - Description
        - Category
        - Price
            
        The search string maybe present in any one of the fields
        anywhere in the content

        */

        $("#searchBtn").click();

    });

});

//Code block for Image Upload
/// <reference path="../../images/Product/591ad10b292c80a81d511f47_Product.png" />

/*
//Write your Code here for the Image Upload Feature
Make the product image clickable in the getProducts() method.
When the user clicks on the product image
Open the file selector window
Display the selected image as a preview in the product tile
    
//Image Upload
When the user clicks Upload
Using AJAX
Update the product image using the following api call
Call the api
http://localhost:3000/product/id/ProductImg
method=PUT
the data for this call should be as FormData
eg:
var formData = new FormData();
formData.append('file', file, file.name);
    
Refresh the products list to show the new image
*/


var count = 0;
var image_id;
var image_name;
var fd = new FormData();

var ProductServer = (function () {          //ProductServer Begin
    var videourl = 'http://localhost:3000';

    var getProducts = function () { //To get all products
        return $.ajax(videourl + "/products");
    }; //End

    var getProduct = function (id) { //To get product by id
        return $.ajax(videourl + "/product/" + id,
            {
                dataType: "json"
            }

            );
    }; //End

    var removeProduct = function (product) { //Remove product by id
        return $.ajax(videourl + "/product/" + product._id, {
            type: "DELETE",
            data: product,
            dataType: "json"
        });
        $("#msgDiv").show();
        $("#msgLbel").text("Successfully Removed");
    }; //End

    var createProduct = function (product) { //Create product
        //debugger
        return $.ajax(videourl + "/product", {
            type: "POST",
            data: product,
            dataType: "json"
        });
    }; //End

    var updateProduct = function (product) { //Update product by id
        return $.ajax(videourl + "/product/" + product._id, {
            type: "PUT",
            data: product,
            dataType: "json"
        });
    }; //End

    var uploadProductImage = function (product) { //Update product Image by id
        return $.ajax(videourl + "/product/" + product._id + "/ProductImg", {
            type: "PUT",
            data: fd,
            processData: false,
            contentType: false
        });
    }; //End

    return {
        getProducts: getProducts,
        removeProduct: removeProduct,
        createProduct: createProduct,
        getProduct: getProduct,
        updateProduct: updateProduct,
        uploadProductImage: uploadProductImage
    };
} ()); //ProductServer End

(function () {      //Main function Begin

    var global_id;
    var templeates = {};

    var compileTemplates = function () {    //To Compile templates to html
        templeates.prodTable = Handlebars.compile($("#productTable").html());
        templeates.prodEdit = Handlebars.compile($("#editProds").html());
        templeates.prodCategories = Handlebars.compile($("#prodCtgs").html());
    }; //End

    var showAllProds = function (data) {    //To Bind Data to Compiled html
        var output = templeates.prodTable({ product: data.data });
        var ctgoutput = templeates.prodCategories({ product: data.data });
        $("#productTableOutput").html(output);
        $('#showAllCategories').html(ctgoutput);
    }; //End

    var editProd = function (data) {    //To Fill Fields in Edit form
        var output = templeates.prodEdit({ product: data.data });
        $("#productEditOutput").html(output);
    }; //End

    var refreshProds = function (msg) {     //To show all products and Display messages
        ProductServer.getProducts().done(showAllProds);
        if (msg == "Please Fill all Fields" || msg == "Product Successfully Saved") {
            $('#formValidate').html(msg).css("display", "inline");
        }
        if (msg == "Successfully Updated" || msg == "Please Fill all Fields edit") {
            $('#editformValidate').html(msg).css("display", "inline");
        }
        if (msg == "Image Successfully Updated") {
            $('#msgDiv').css("display", "inline");
            $('#msgLbl').html(msg).css("display", "inline");
        }
    }; //End

    var wireEvents = function () {  //wireEvents Start
        var id;
        //product image upload Begin
        $(document).on("click", "img", function () {        //To open a fileupload on image click
            image_id = getId(this);
            onclick = $('#imgupload').trigger('click');
            return false;
        }); //End

        $(document).on("click", "#btnUpload", function () {    //To upload a selected image
            var test = getId(this);
            var type = image_name.split('.');
            var product = {
                "_id": test,
                "productImg":
                        { "fileName": image_name,
                            "filePath": "../images/Product/" + image_name,
                            "fileType": type[1]
                        }
            };
            ProductServer.uploadProductImage(product).done(refreshProds("Image Successfully Updated"));
//            var newImageName = "../images/Product/"+test+"_Product";
//            $("#"+test).attr("src",newImageName);11
        }); //End

        //product image upload End

        //Product Search start
        $(document).on("click", "#searchBtn", function () {
            var text = $('#searchText').val().toLowerCase();
            $('#productList #getId h2').each(function () {
                var test = $(this).text().toLowerCase();
                if (test.indexOf(text) == -1) {
                    $(this).parent().parent().parent().hide();
                }
                else {
                    $(this).parent().parent().parent().show();
                }
            });

        }); //End

        $(document).on("click", "#removeBtn", function () {      //To open remove dialogue
            $('#myModal').modal('show');
            global_id = getId(this);
        }); //End

        $(document).on("click", "#modalRemoveBtn", function () {  //To remove product from list
            var id = global_id;
            var product = { "_id": id };
            ProductServer.removeProduct(product).done(refreshProds);
            $('#myModal').modal('hide');
            return false;
        }); //End

        $(document).on("click", "#editBtn", function () {      //To Fill fields in Edit form
            $('#productFormOutput').replaceWith('<div id="productEditOutput"></div>');
            var id = getId(this);
            global_id = id;
            //var product = { "_id": id };
            ProductServer.getProduct(id).done(editProd);
            return false;
        }); //End

        $(document).on("click", "#cancelBtn", function () {    //To clear all fields in Create Form
            var name = $('#name').val('');
            var desc = $('#description').val('');
            var ctg = $('#category').val('');
            var price = $('#price').val('');
        }); //End

        $(document).on("click", "#cancelEditBtn", function () { //To clear all fields in Edit form
            var name = $('#edit_name').val('');
            var desc = $('#edit_description').val('');
            var ctg = $('#edit_category').val('');
            var price = $('#edit_price').val('');
        }); //End

        $(document).on("click", "#submitBtn", function () {    //To submit form to create product 

            var name = $('#name').val();
            var desc = $('#description').val();
            var ctg = $('#category').val();
            var price = parseInt($('#price').val(), 10);

            //Form validation begin
            if (name == '' || desc == '' || ctg == '' || (price == '' && price != 0)) {

                refreshProds("Please Fill all Fields");

                return;
            }
            //Form validation end

            var product = {
                "price": price,
                "description": desc,
                "category": ctg,
                "name": name
            };
            ProductServer.createProduct(product).done(refreshProds("Product Successfully Saved")); //create API call

        }); //End

        $(document).on("click", "#submitEditBtn", function () {     //To submit form to edited product

            var name = $('#edit_name').val();
            var desc = $('#edit_description').val();
            var ctg = $('#edit_category').val();
            var price = parseInt($('#edit_price').val(), 10);

            //Form validation begin
            if (name == '' || desc == '' || ctg == '' || (price == '' && price != 0)) {
                refreshProds("Please Fill all Fields edit");
                return;
            }
            //Form validation end
            var product = {
                "_id": global_id,
                "price": price,
                "description": desc,
                "category": ctg,
                "name": name
            };
            ProductServer.updateProduct(product).done(refreshProds("Successfully Updated")); //Edit API call
        }); //End

    }; //wireEvents End

    var getId = function (element) {           //To get the id of product binded in div
        return $(element).parents("#getId").attr("data-id");
    }; //End

    $(function () {         //To Invoke Functions Begin
        wireEvents();
        compileTemplates();
        refreshProds("");
    });//End

} ()); //Main function End

//Drag and Drop Categories Start
function allowDropBtn(ev) {     //ondragover in div
    ev.preventDefault();
} //End

function dragBtn(ev) {          //ondragstart function Begin
    ev.dataTransfer.setData("btn", ev.target.id);
} //End

function dropBtn(ev) {  //ondrop begin
    ev.preventDefault();
    var test = ev;
    var data = ev.dataTransfer.getData("btn");
    var btnCopy = document.getElementById(data).cloneNode(true);
    btnCopy.id = data + "_ctg";
    var spanId = data + "_span";
    ev.target.appendChild(btnCopy);
    $('#' + data + "_ctg").parent().append('<span id=' + spanId + ' class="glyphicon glyphicon-remove-sign"></span>');
    ctgSearch();
} //End

$(document).on("click", "span", function () {   //To close button on filter
    var btn = $(this).attr('id');
    var arr = [];
    arr = btn.split('_');
    btnRemove = arr[0] + '_ctg';
    $('#' + btnRemove).remove();
    $('#' + btn).remove();
    ctgSearch();
}); //End

function ctgSearch() {          //Category Search Begin
    var dict = {};

    if ($('#categoryFilter button').length == 0) {
        $('#productList').children().show();
    }
    $('#categoryFilter button').each(function () {
        var buttonTxt = $(this).text().toLowerCase();
        dict[buttonTxt] = "false";
    });
    //var searchCtg = data.toLowerCase();
    $('#categoryFilter button').each(function () {
        var searchCtg = $(this).text().toLowerCase();
        $('#productList #getId label').each(function () {
            var test = $(this).text().toLowerCase();
            if (test.indexOf(searchCtg) == -1) {
                if (dict[test] == "true") {
                    return;
                }
                $(this).parent().parent().parent().hide();
            }
            else {
                $(this).parent().parent().parent().show();
                dict[searchCtg] = "true";

            }
        }); //Each End
    }); //Each end
} //End
//Drag and Drop Categories End

//Load file from fileUpload to Img
var loadFile = function (event) {
    var output = document.getElementById(image_id);
    image_name = event.target.files[0].name;
    output.src = URL.createObjectURL(event.target.files[0]);
    fd.append('file', event.target.files[0], image_name); //Append as formData like Json
};

//Load file from fileUpload to Img End