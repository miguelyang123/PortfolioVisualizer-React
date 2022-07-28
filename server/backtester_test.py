import json
import backtester

with open('./data/portfolios.json') as f:
    portfolios = json.load(f)
    # print(portfolios)

backtester.run_backtest(
    start='2022-06-01', end='2022-06-30', portfolios=portfolios)
