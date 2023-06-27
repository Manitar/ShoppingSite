How to run the app:

Open 2 seperate terminals.
In terminal 1, navigate to client directory.
In terminal 2, navigate to server directory.

In both:
```
npm install
```


Terminal 1 (client directory):

Run the client:
```
http-server -c-1
```

Terminal 2 (server directory):

Run the server:
```
npm run start
```

Now, type in localhost:8080 in your browser.

Link to diagram:
https://lucid.app/lucidchart/be27e600-d172-41bd-a65c-a8ff2fe4462a/edit?viewport_loc=-611%2C-365%2C3156%2C1440%2C0_0&invitationId=inv_f7fe434d-5478-4aae-9d15-d0e9866c33d3

If we choose to run with Docker instead:

Navigate with 2 terminals to the root folder (The folder which contains the server and the client folder).

Terminal 1:
```
docker run -p 8080:80 angular-app
```

Terminal 2:
```
docker run -p 5000:5000 my-node-app
```


