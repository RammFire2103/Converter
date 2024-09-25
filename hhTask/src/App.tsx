import CurrancyCard from "./modules/currancyCard.tsx";
import Changer from "./svg/Changer.tsx";
import "./App.css";

import { useEffect, useState } from "react";

// const BASE_URL = "http://localhost:5000";

function App() {
  const [curCurrance, setCurrency] = useState<string>("RUB");
  const [curCurranceConverted, setCurrencyConverted] = useState<string>("USD");
  const [curRate, setCurRate] = useState<number>(90);
  const [fieldCurrancy, setFieldCurrency] = useState<number>(0);
  const [fieldCurrancyConverted, setFieldCurrancyConverted] =
    useState<number>(0);
  const [target, setTarget] = useState<string>("Amount");

  useEffect(() => {
    getRate(curCurrance, curCurranceConverted).then((res) => {
      setCurRate(res);
    });
    setTarget("Amount");
  }, [curCurrance, curCurranceConverted]);

  useEffect(() => {
    if (target === "Amount") {
      setFieldCurrancyConverted(+(fieldCurrancy * curRate).toFixed(6));
    } else {
      setFieldCurrency(+(fieldCurrancyConverted / curRate).toFixed(6));
    }
  }, [fieldCurrancy, fieldCurrancyConverted, target, curRate]);

  async function getRate(curCurrance: string, curCurranceConverted: string) {
    const resp = await fetch(`http://localhost:5000/getRate`, {
      headers: {
        Amount: curCurrance,
        ConvertedAmount: curCurranceConverted,
      },
    });

    return await resp.json();
  }

  async function getCurrentCurrency(latitude: number, longitude: number) {
    const resp = await fetch(`http://localhost:5000/getCurrentCurrency`, {
      headers: {
        latitude: latitude.toString(),
        longitude: longitude.toString(),
      },
    });

    return await resp.json();
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          getCurrentCurrency(
            position.coords.latitude,
            position.coords.longitude
          ).then((res) => {
            setCurrency(res);
          });
        },
        function (error) {
          console.log(error.message); // выводит сообщение об ошибке
        }
      );
    }
  }, []);

  return (
    <>
      <div className="container">
        <CurrancyCard
          type="Amount"
          initialCurrency={curCurrance}
          setCurrency={setCurrency}
          fieldCurrancy={fieldCurrancy}
          setFieldCurrency={setFieldCurrency}
          setTarget={setTarget}
        />
        <Changer
          curCurrance={curCurrance}
          curCurranceConverted={curCurranceConverted}
          setCurrency={setCurrency}
          setCurrencyConverted={setCurrencyConverted}
        />
        <CurrancyCard
          type="Converted Amount"
          initialCurrency={curCurranceConverted}
          setCurrency={setCurrencyConverted}
          fieldCurrancy={fieldCurrancyConverted}
          setFieldCurrency={setFieldCurrancyConverted}
          setTarget={setTarget}
        />
      </div>
    </>
  );
}

export default App;
