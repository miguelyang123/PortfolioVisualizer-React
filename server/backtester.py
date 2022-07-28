import sys
import json
import bt
# import matplotlib.pyplot as plt


def set_backtest(prices, strategy_name, weight):
    strategy = bt.Strategy(strategy_name, [
        bt.algos.RunYearly(),
        bt.algos.SelectAll(),
        bt.algos.WeighSpecified(**weight),
        bt.algos.Rebalance()])
    backtest = bt.Backtest(strategy, prices, initial_capital=1000000.0)
    return backtest


# This is the main function exposed to node.js
def run_backtest(start, end, portfolios):
    # 1. Perform data cleaning for portfolios
    #   a. Extract tickers
    #   b. Prepare allocations with modified (see note below) ticker as key
    # 2. Fetch prices
    # 3. Set backtests and run backtests
    # 4. Return results, which are converted to JSON, for the following:
    #   a. A timeseries representing the performance of the portfolios
    #   b. A DataTable representing the key stats of the portfolios

    allocations = []
    tickers = []
    for i in range(len(portfolios)):
        assets = {}
        for j in range(len(portfolios[i]["assets"])):
            ticker = portfolios[i]["assets"][j]["ticker"]
            # Data cleaning for the ticker,
            # which is converted to lower case and any equal sign (=) is removed
            assets[ticker.lower().replace(
                "=", "")] = portfolios[i]["assets"][j]["allocation"]
            if ticker not in tickers:
                tickers.append(ticker)
        allocations.append(assets)

    prices = bt.get(tickers, start=start, end=end)

    backtests = []
    for i in range(len(portfolios)):
        t = set_backtest(prices, portfolios[i]["name"], allocations[i])
        backtests.append(t)

    res = bt.run(backtests[0], backtests[1], backtests[2])
    resPrices = res.prices
    # res.plot(figsize=(11, 6), grid=True, title='Portfolio Growth')
    print(resPrices.to_json(orient='split', date_format='iso'))
    sys.stdout.flush()


if __name__ == '__main__':
    start = sys.argv[1]
    end = sys.argv[2]
    portfolios_string = sys.argv[3]
    portfolios = json.loads(portfolios_string)
    run_backtest(start, end, portfolios)
