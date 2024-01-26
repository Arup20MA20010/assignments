import { useEffect, useState } from "react";
import { type CardProps, Card } from "./components/Card";
import axios from "axios";
import { CardForm } from "./components/CardForm";
import { isCardUpdatedAtom } from "./store/atom/isCardUpdated.ts";
import { useRecoilValue } from "recoil";
export interface CardWithId extends CardProps {
  _id: string;
}
function App() {
  const [cards, setCards] = useState<CardWithId[] | []>([]);
  const isCardUpdated = useRecoilValue(isCardUpdatedAtom);
  useEffect(() => {
    axios
      .get<CardWithId[]>("http://localhost:3000/api/showCards")
      .then((res) => {
        console.log(res.data);
        setCards(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isCardUpdated]);
  return (
    <div className="flex flex-col w-screen">
      {cards.map((card: CardWithId, index: number) => (
        <Card key={index} {...card} />
      ))}
      <CardForm />
    </div>
  );
}

export default App;
