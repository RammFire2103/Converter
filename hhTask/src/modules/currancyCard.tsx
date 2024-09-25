import { useState } from "react";

import DropDown from "./DropDown";

import currenciesImages from "./CurrencyImage";

import svgArrow from "../assets/arrow-down-svgrepo-com.svg";

import "./currancyCard.css";

type CurrancyCardProps = {
  type: string;
  initialCurrency: string;
  setCurrency: (a: string) => void;
  fieldCurrancy: number;
  setFieldCurrency: (a: number) => void;
  setTarget: (a: string) => void;
};

function CurrancyCard({
  type,
  initialCurrency,
  setCurrency,
  fieldCurrancy,
  setFieldCurrency,
  setTarget,
}: CurrancyCardProps) {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  function isInputEvent(
    event: React.FormEvent<HTMLInputElement>
  ): event is React.FormEvent<HTMLInputElement> & { target: HTMLInputElement } {
    return event.target instanceof HTMLInputElement;
  }

  function checkValue(event: React.FormEvent<HTMLInputElement>) {
    if (isInputEvent(event)) {
      setTarget(type);
      setFieldCurrency(+event.target.value);
    }
  }

  function showDropdownMenu() {
    setShowDropdown(!showDropdown);
  }

  return (
    <div className="currency-container">
      <div className="image-container">
        <img src={currenciesImages[initialCurrency]}></img>
      </div>
      <div className="dropdown-container">
        <div className="current-currancy" onClick={showDropdownMenu}>
          <div>{initialCurrency}</div>
          <img src={svgArrow} alt="arrow" height={24} width={24} />
        </div>
        <DropDown
          showDropdown={showDropdown}
          setCurrency={setCurrency}
        ></DropDown>
      </div>
      <form>
        <input
          type="number"
          min="0.00"
          max="10000.00"
          step="0.01"
          value={fieldCurrancy}
          onInput={(e) => {
            checkValue(e);
          }}
        />
      </form>
    </div>
  );
}

export default CurrancyCard;
