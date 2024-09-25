import AUD from "../assets/flags/AUD.png";
import BGN from "../assets/flags/BGN.png";
import BRL from "../assets/flags/BRL.png";
import CAD from "../assets/flags/CAD.png";
import CHF from "../assets/flags/CHF.png";
import CNY from "../assets/flags/CNY.png";
import CZK from "../assets/flags/CZK.png";
import DKK from "../assets/flags/DKK.png";
import EUR from "../assets/flags/EUR.png";
import GBP from "../assets/flags/GBP.png";
import HKD from "../assets/flags/HKD.png";
import HRK from "../assets/flags/HRK.png";
import HUF from "../assets/flags/HUF.png";
import ISK from "../assets/flags/ISK.png";
import JPY from "../assets/flags/JPY.png";
import KRW from "../assets/flags/KRW.png";
import MXN from "../assets/flags/MXN.png";
import MYR from "../assets/flags/MYR.png";
import NOK from "../assets/flags/NOK.png";
import NZD from "../assets/flags/NZD.png";
import PHP from "../assets/flags/PHP.png";
import PLN from "../assets/flags/PLN.png";
import RON from "../assets/flags/RON.png";
import RUB from "../assets/flags/RUB.png";
import SEK from "../assets/flags/SEK.png";
import SGD from "../assets/flags/SGD.png";
import THB from "../assets/flags/THB.png";
import USD from "../assets/flags/USD.png";
import IDR from "../assets/flags/IDR.png";
import INR from "../assets/flags/INR.png";
import ILS from "../assets/flags/ILS.png";
import ZAR from "../assets/flags/ZAR.png";
import TRY from "../assets/flags/TRY.png";

interface images {
  [key: string]: string;
}

const curranciesImages: images = {
  AUD: AUD,
  BGN: BGN,
  BRL: BRL,
  CAD: CAD,
  CHF: CHF,
  CNY: CNY,
  CZK: CZK,
  DKK: DKK,
  EUR: EUR,
  SEK: SEK,
  SGD: SGD,
  THB: THB,
  USD: USD,
  RUB: RUB,
  RON: RON,
  PLN: PLN,
  PHP: PHP,
  NZD: NZD,
  NOK: NOK,
  MYR: MYR,
  MXN: MXN,
  KRW: KRW,
  ISK: ISK,
  JPY: JPY,
  HUF: HUF,
  HRK: HRK,
  HKD: HKD,
  GBP: GBP,
  IDR: IDR,
  ILS: ILS,
  INR: INR,
  ZAR: ZAR,
  TRY: TRY,
};

export default curranciesImages;
