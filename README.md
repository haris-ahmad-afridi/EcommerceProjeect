###                                                 Ecommerce Website Backend Portion



### Script for running this Project
Open this project in your compiler/interepter and run following codes in terminal (open terminal in "MernProject" repository)
     `npm install`
   after this run the following scrpit
     `npm run dev`
   After this your project would start running.
  Note: You must have `nodemon` installed in your system.


  ### Api's Made in this project
This Project contain 4 types of Api's

### 1.Product Api's:
     for creating a new Product (only by admin, Post Request)
  `http://localhost:4000/api/v1/admin/products/new`
     
     for getting all products (Get Request)
   `http://localhost:4000/api/v1/products/`

     for getting details about single product (the last parameter is product's ID, Get Requests)
   `http://localhost:4000/api/v1/product/64cbde3bac00123060c1f7f4`

     for updating a product (only by admin, the last parameter is product's ID and it require some queries in Url Like name,email Put Request)
  `http://localhost:4000/api/v1/admin/products/64ba1156e8a28ff715ff53c6`

      for deleting a new Product (only by admin, Post Request)
  `http://localhost:4000/api/v1/admin/products/64ba1156e8a28ff715ff53c6`   

### 2.User Authentications and Authorizations

    for registering a user (Post Request) Note: All users by default would be "user". For making a user "admin" go to database and convert roles="user" to roles="admin"
  `http://localhost:4000/api/v1/register`

    for user login (Post Request)
  `http://localhost:4000/api/v1/login`

    for user logout (Post Request)
  `http://localhost:4000/api/v1/logout`
  
    for password forgot (Post Request)
  `http://localhost:4000/api/v1/password/forgot`

    for password reset (Put Request, the last parameter is user id)
  `http://localhost:4000/api/v1/password/reset/d353614be738df77c033b794e9def6d677662f18`
    

### 3.User Details

   for details about a user (user own details, GET Request, user must be logged in)
    `http://localhost:4000/api/v1/me`

   for updating password by user (Put request)
    `http://localhost:4000/api/v1/password/update`
 
   for updating email and name by user (Put request)
     `http://localhost:4000/api/v1/me/update`   

  for getting all users inforamtion by admin (Get request)
    `http://localhost:4000/api/v1/admin/users`

  for getting inforamtion of a specific user by admin (Get request, the last parameter is user id)
    `http://localhost:4000/api/v1/admin/user/64c6432ac8fc0b72edcc35c9`

  making a user "admin" by admin (Put request, the last parameter is user id)
    `http://localhost:4000/api/v1/admin/user/64c6439803b118c69e5cc126`

   for deleting a user by admin (Delete request, the last parameter is user id)
    `http://localhost:4000/api/v1/admin/user/64c6439803b118c69e5cc126`


### 4.Product Reviwe

   for creating a review about a product (Post Request, )
    `http://localhost:4000/api/v1/review`

  for getting all reviews about a product (Get Request, The lasturl query is ID of product of which we want all reviews)
    `http://localhost:4000/api/v1/reviews?id=64d0e4d92b984358254f2197`

  for deleting a review about a product (Delete Request, The last url query is Product id)
    `http://localhost:4000/api/v1/reviews?productId=64d0e4d92b984358254f2197`


### 5.Order Api

  for making an order (Post request)
   `http://localhost:4000/api/v1/order/new`

  for getting information of a single order (Get request,the last parameter is user id)
   `http://localhost:4000/api/v1/order/64d39246d868e1c1a766c250`

   for getting all orders placed by me(Get request)
   `http://localhost:4000/api/v1/orders/me`

   for getting all orders placed by admin(Get request)
   `http://localhost:4000/api/v1/admin/orders`

   for updating status of an order placed, by admin(Put request, The last parameter is id of order placed)
   `http://localhost:4000/api/v1/admin/order/64d39246d868e1c1a766c250`

     for deleting an order  by admin(Deleting request, The last parameter is id of order placed)
   `http://localhost:4000/api/v1/admin/order/64d39246d868e1c1a766c250`