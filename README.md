This is Backend Code For Auction-App Which Uses Node/Express.js and Socket.io For Real Time Notifications.

This Is the Api Which is Deploy on Render = https://auction-server-q9au.onrender.com

1. Api When User Register

- Post Request, With This Field : userName, email, password, role(if not given it will automatically choose User),  
  Register Api =  https://auction-server-q9au.onrender.com/auth/register
  
2. Api When User Logged In

-  Post Request, With This Field : email, password
login Api = https://auction-server-q9au.onrender.com/auth/register

*** Auction Items Api And All This Api Require Token *****

3. Post Request To Add Item By User

- Post Request With This Field : name, description, starting_price, image_url , other filed will auto filled 
- AddItem Api : https://auction-server-q9au.onrender.com/auctionItem/addItem
  
4. Get Reuest To Fetch All Item With Pagination . So, Page query required

- Get Item Api : https://auction-server-q9au.onrender.com/auctionItem/getItems?page=1

5.  Patch Request To Update Item :  name, description, starting_price, current_price, end_time , image_url

- Patch Item Api : https://auction-server-q9au.onrender.com/auctionItem/updateItems/:id
- here id is Item Id

6. Post Request To Search Item with "name" query

- Post request Api : https://auction-server-q9au.onrender.com/auctionItem/searchItem?name=a
- here name filed is item name
  
7. delete Request To  Delete The Item Item Id Required here as req.body

- Delete Item Api : https://auction-server-q9au.onrender.com/auctionItem/deleteItem

  **** This Biding Api And This Api required Token 

8. Post Request For Bidding on Item with this field : item_id, user_id, bid_amount

- Post Item Bid :  https://auction-server-q9au.onrender.com/bid/bidItem

9. Post Request For Notification When User Bid To Notify all Client Who This Item

- Post Request Api : https://auction-server-q9au.onrender.com/bid/bidNotifications

Conclusion : Here I have Created All This Api And This My First Time Writing ReadMe File For My Code , I Hope My Explanation Is Good Also I have Test The Api's Using Thunder Client
- And Also To Check If Socket.io is working I have Created A temperory Frontend and test the Api . so For Example Whenever User Add Item It Will Notify All Clients That Item is Being Added in real time.
- Same Goes For Bid Also.
- Also I Can Create This FullStack Application , using MERN Stack.
- In The task It Says Use (PostgreSQL or MySQL) databse but here i Have Use MonogoDb.
- And If There Is Let Me Know, Thank You.
