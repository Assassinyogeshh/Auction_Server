This is Backend Code For Auction-App Which Uses Node/Express.js and Socket.io For Real Time Notifications.

1. Api When User Register

- Post Request, With This Field : userName, email, password, role(if not given it will automatically choose User),  
  Register Api =  http://localhost:3000/auth/register
  
2. Api When User Logged In

-  Post Request, With This Field : email, password
login Api = http://localhost:3000/auth/register

*** Auction Items Api And All This Api Require Token *****

4. Post Request To Add Item By User

- Post Request With This Field : name, description, starting_price, image_url , other filed will auto filled 
- AddItem Api : http://localhost:3000/auctionItem/addItem
  
5. Get Reuest To Fetch All Item With Pagination . So, Page query required

- Get Item Api : http://localhost:3000/auctionItem/getItems?page=1

6.  Patch Request To Update Item :  name, description, starting_price, current_price, end_time , image_url

- Patch Item Api : http://localhost:3000/auctionItem/updateItems/:id
- here id is Item Id

7. Post Request To Search Item with "name" query

- Post request Api : http://localhost:3000/auctionItem/searchItem?name=a
- here name filed is item name
  
8. delete Request To  Delete The Item Item Id Required here as req.body

- Delete Item Api : http://localhost:3000/auctionItem/deleteItem

  **** This Biding Api And This Api required Token 

9. Post Request For Bidding on Item with this field : item_id, user_id, bid_amount

- Post Item Bid :  http://localhost:3000/bid/bidItem

10. Post Request For Notification When User Bid To Notify all Client Who This Item

- Post Request Api : http://localhost:3000/bid/bidNotifications

Conclusion : Here I have Created All This Api And This My First Time Writing ReadMe File For My Code , I Hope My Explanation Is Good Also I have Test The Api's Using Thunder Client
- And Also To Check If Socket.io is working I have Created A temperory Frontend and test the Api . so For Example Whenever User Add Item It Will Notify All Clients That Item is Being Added in real time.
- Same Goes For Bid Also.
- Also I Can Create This FullStack Application , using MERN Stack.
- In The task It Says Use (PostgreSQL or MySQL) databse but here i Have Use MonogoDb.
- And If There Is Let Me Know, Thank You.
