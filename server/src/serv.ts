import express, { json, response } from "express";
import cors from "cors";
import exchangeRates from "exchange-rates-api";
import dictionary from "./dictionary";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const port = 5000;
app.get("/getCurrencies", (request, response) => {
  response.send(JSON.stringify(exchangeRates.currencies));
});

async function getLocation(latitude: number, longitude: number) {
  const resp = await fetch(
    `https://geocode-maps.yandex.ru/1.x/?apikey=ad4882d5-0d4c-46c5-ae31-b8335a476103&geocode=${longitude},${latitude}&format=json`
  );

  return await resp.json();
}

async function getRates(Amount: string, ConvertedAmount: string) {
  const resp = await fetch(`https://open.er-api.com/v6/latest/${Amount}`);
  const ans = await resp.json();
  return ans.rates[ConvertedAmount];
}

app.get("/getRate", (request, response) => {
  if (request.headers.amount && request.headers.convertedamount) {
    if (
      typeof request.headers.amount === "string" &&
      typeof request.headers.convertedamount === "string"
    ) {
      getRates(request.headers.amount, request.headers.convertedamount).then(
        (res) => {
          response.send(JSON.stringify(res));
        }
      );
    }
  } else {
    response.send(JSON.stringify(90));
  }
});

app.get("/getCurrentCurrency", async (request, response) => {
  let respBody: string = "USD";
  if (request.headers.latitude && request.headers.longitude) {
    getLocation(+request.headers.latitude, +request.headers.longitude)
      .then((res) => {
        const country: string =
          res.response.GeoObjectCollection.featureMember[0].GeoObject
            .metaDataProperty.GeocoderMetaData.Address.Components[0].name;
        dictionary.forEach((item, key) => {
          if (key.indexOf(country) !== -1) {
            respBody = item;
            return;
          }
        });
      })
      .then(() => {
        response.send(JSON.stringify(respBody));
      });
  }
});

app.listen(port, () => console.log(`Running on port ${port}`));
