# loonie-metrics

loonier metrics is a webpage that displays macroeconomics data about the Canadian economy.

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



In-progress datapoints:
- [ ] CPI All-products (month-to-month / 12-month) *add note about that 12-month
  - [X] Current CPI 
  - [ ] 
- [ ] Real GDP
- [ ] Unemployment Rate
- [ ] Interest Rate
- [ ] Exchange Rate USD

Additional:
- [ ] Labour Force Survey
- [ ] 
