//import data from "../data/ticker24hr.json" assert { type: "json" };
const asset = "USDT";
let watchList;
const getTicker = async (_req, res) => {
  const uri = 'https://api.binance.com/api/v3/ticker/24hr';
  try {
    const response = await fetch(uri);
    const data = await response.json();

		// * filter data to quoteAsset USDT and empty values
		// *************************************************
    const filterAsset = data.filter((item) => item.symbol.endsWith(asset));
    const filterZero = filterAsset.filter((item) => {
      return item.count != 0;
    });
    const filterOut = filterZero.filter(
      (item) => !item.symbol.includes("DOWN" && "UP" && "BEAR" && "BULL")
		);
		
		// * sort object of data a-b-c
		// ***************************
    function sortArray(x, y) {
      return x.symbol.localeCompare(y.symbol);
    }
		let sortedAbc = filterOut.sort(sortArray);
		
		// * object destructuring for symbol, price, volume
		// ************************************************
    watchList = sortedAbc.map(({ symbol, lastPrice, quoteVolume }) => {
			// * compact number format
			// ***********************
      const format = new Intl.NumberFormat("en", { notation: "compact" });
      quoteVolume = format.format(quoteVolume);
      return { symbol, lastPrice, quoteVolume };
    });
    res.status(200).json(watchList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export { watchList, getTicker };
