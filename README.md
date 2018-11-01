# Dog snack calculator

A request for a small AngularJS web app.

## The task
To calculate the required number of snacks needed for dog walks based on altitude.
*All console logs and comments can be viewed on the develop branch of this repo.

## App setup
- Ensure that Node.js and NPM is installed respectively.
- In the command line, run npm install to install all of the listed devDependencies.
```
npm install
```
- Once installed, run bower install to install all AngularJS dependencies into the App.
```
bower install
```
- Depending on your operating system, run the required server script file in the root to start the app on port 6801.

## The rules/logic:
Below is dummy data representing the coordinates of a location (longitude, latitude and altitude respectively);
```route = [
            [1, 1, 10],
            [4, 7, 0],
            [7, 18, 6],
            [10, 12, 15],
            [8, 10,  8]
          ];
```

Total snacks required - 5
- To go from **1, 1, 10 to 4, 7, 0 stores up 10 snacks** worth of uphill walking
- To go from **4, 7, 0 to 7, 18, 6 will leave 4 snacks** worth of uphill walking
- To go from **7, 18, 6 to 10, 12, 15 only requires 5 snacks**, as 4 snacks worth was stored
- To go from **10, 12, 15 to 8, 10, 8 requires no additional snacks and stores 7 snacks** worth of uphill walking
