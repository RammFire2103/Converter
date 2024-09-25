import { useEffect, useState } from "react";

interface currancies {
  [key: string]: string;
}

interface DropDownProps {
  showDropdown: boolean;
  setCurrency: (a: string) => void;
}

function DropDown({ showDropdown, setCurrency }: DropDownProps) {
  async function getCurrencies<T>(): Promise<T> {
    const response = await fetch("http://localhost:5000/getCurrencies");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return (await response.json()) as T;
  }

  const [currancies, setCurrancies] = useState<currancies>({
    RUB: "RUB",
    USD: "USD",
  });

  useEffect(() => {
    getCurrencies<currancies>().then((res) => {
      setCurrancies(res);
    });

    const elem = document.querySelector(".drop-down");
    if (elem) {
      const wheelEvent = new WheelEvent("mousewheel", { deltaX: 50 });
      elem.dispatchEvent(wheelEvent);
    }
  }, []);

  function onScroll(e: React.WheelEvent<HTMLDivElement>) {
    if (e.currentTarget instanceof HTMLDivElement) {
      e.deltaY = 0;
    }
  }

  return (
    <div
      className={showDropdown ? "drop-down show" : "drop-down"}
      onWheel={(e) => onScroll(e)}
    >
      {Object.values(currancies).map((item: string, i: number) => (
        <button
          key={i}
          onClick={() => {
            setCurrency(item);
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default DropDown;
