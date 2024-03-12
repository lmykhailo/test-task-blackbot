import { useEffect, useState } from "react";
import "./App.css";
import useExchange from "./hooks/useExchange";

function App() {
  const [ethAmount, setEthAmount] = useState<number>(0);
  const [usdtAmount, setUsdtAmount] = useState<number>(0);
  const [buyOrSell, setBuyOrSell] = useState<string>("buy");
  const { exchangeRate } = useExchange();

  const calculateUsdtAmount = (ethAmount: number) => {
    if (ethAmount > 0 && exchangeRate) {
      return Number(
        (
          ethAmount *
          (buyOrSell === "buy" ? exchangeRate.ask : exchangeRate.bid)
        ).toFixed(5)
      );
    }
    return 0;
  };

  useEffect(() => {
    const amount = calculateUsdtAmount(ethAmount);
    setUsdtAmount(amount);
  }, [ethAmount, buyOrSell, exchangeRate]);

  return (
    <div className="App">
      <label>ETH Amount:</label>
      <input
        name="ethAmount"
        type="number"
        placeholder="Enter ETH Amount"
        onChange={(e) => setEthAmount(Number(e.target.value))}
      ></input>

      <div
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setBuyOrSell(e.target.value)
        }
      >
        <input type="radio" value="buy" checked={buyOrSell === "buy"} /> Buy
        <input type="radio" value="sell" checked={buyOrSell === "sell"} /> Sell
      </div>

      <label>
        {buyOrSell === "buy" ? "You need to pay:" : "You will receive:"}
      </label>

      <input
        name="usdtAmount"
        type="number"
        disabled={true}
        placeholder="USDT Amount needed"
        value={usdtAmount}
      ></input>
    </div>
  );
}

export default App;
