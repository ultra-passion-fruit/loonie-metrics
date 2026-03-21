# loonie-metrics

**loonier-metrics** is a webpage that displays macroeconomics data about the Canadian economy in an appealing dashboard format.

### Data Request Flow

General workflow to find data on StatsCan:
1. Call getCubeMetadata and print response to console
2. Inspect response and find 'dimensions' attribute
3. Look *carefully* for the **memberID** in the member arrays inside 
4. That memberID will go in the "coordinate" for the row you are trying to select.

For example:

CPI Table: https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1810000501

coordinate : "2.2.0.0.0.0.0.0.0.0"

Note: Must have 10 digits the coordinate.

selects the first region "Canada" for the first row "All Items". Basically, index starts at 2 ig?

See `script.js` for code examples.

### Development System Functionality

Running Instruction:

To get Express backend running, call the following:
`npx nodemon index.js`

This will start running on `port 3001`.

Then, get the client server running with Vite:
`npx vite`

This will start running on `port 5173` usually, unless it's busy. You can kill a leftover session with `npx kill-port ####` where the hashes are the port number. 

Note: It automatically looks for the file called index.html

#### Express Server

Serves as backend server that communicates with StatsCan. Communicates server-to-server to retrieve information.

Requests are made from frontend javascript to express server. Axios post requests are passed from express server requesting data from StatsCan. Gets data and passes back to frontend application, which displays on webpage.

The express server is shown in `index.js`.

### TO-DO

In-code changes:
- [ ] Replace vite proxy code with Express

General things:
- [ ] CPI All-products (month-to-month / 12-month) *add note about that 12-month
  - [X] Current CPI 
- [ ] GDP
  - [ ] Real GPD
  - [ ] Real GDP per Capita
- [ ] Unemployment Rate
  - [ ] The Beveridge Curve
- [ ] Interest Rate
- [ ] Exchange Rate USD

Additional:
- [ ] Labour Force Survey

