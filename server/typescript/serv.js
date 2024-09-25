"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const exchange_rates_api_1 = __importDefault(require("exchange-rates-api"));
const dictionary_1 = __importDefault(require("./dictionary"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
}));
const port = 5000;
app.get("/getCurrencies", (request, response) => {
    response.send(JSON.stringify(exchange_rates_api_1.default.currencies));
});
function getLocation(latitude, longitude) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=ad4882d5-0d4c-46c5-ae31-b8335a476103&geocode=${longitude},${latitude}&format=json`);
        return yield resp.json();
    });
}
function getRates(Amount, ConvertedAmount) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield fetch(`https://open.er-api.com/v6/latest/${Amount}`);
        const ans = yield resp.json();
        return ans.rates[ConvertedAmount];
    });
}
app.get("/getRate", (request, response) => {
    if (request.headers.amount && request.headers.convertedamount) {
        if (typeof request.headers.amount === "string" &&
            typeof request.headers.convertedamount === "string") {
            getRates(request.headers.amount, request.headers.convertedamount).then((res) => {
                response.send(JSON.stringify(res));
            });
        }
    }
    else {
        response.send(JSON.stringify(90));
    }
});
app.get("/getCurrentCurrency", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let respBody = "USD";
    if (request.headers.latitude && request.headers.longitude) {
        getLocation(+request.headers.latitude, +request.headers.longitude)
            .then((res) => {
            const country = res.response.GeoObjectCollection.featureMember[0].GeoObject
                .metaDataProperty.GeocoderMetaData.Address.Components[0].name;
            dictionary_1.default.forEach((item, key) => {
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
}));
app.listen(port, () => console.log(`Running on port ${port}`));
