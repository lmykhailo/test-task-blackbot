import { throttle } from "lodash";
import { useEffect, useState } from "react";

interface IExchangeRate {
  bid: number;
  ask: number;
}

const useExchange = () => {
  const [exchangeRate, setExchangeRate] = useState<IExchangeRate | null>(null);

  //WebSocket connection to Binance to get exchange rate
  useEffect(() => {
    const binanceWsUrl = "wss://fstream.binance.com/ws/ethusdt@bookTicker";

    const connection = new WebSocket(binanceWsUrl);

    //Throttling the exchange rate to improve performance of the app
    const throttleExchangeRate = throttle((rate: IExchangeRate) => {
      console.log(rate);
      setExchangeRate(rate);
    }, 1000);

    //Handling the message with exchange rates received from WebSocket
    const handleWebSocketMessage = (event: MessageEvent) => {
      const messageData = JSON.parse(event.data);
      throttleExchangeRate({
        bid: Number(messageData.b),
        ask: Number(messageData.a),
      });
    };

    connection.onmessage = handleWebSocketMessage;

    //Clean-up function
    return () => {
      connection.close();
    };
  }, []);
  return { exchangeRate };
};

export default useExchange;
