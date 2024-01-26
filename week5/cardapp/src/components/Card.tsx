import axios from "axios";
import { CardWithId } from "../App";
import { useSetRecoilState } from "recoil";
import { isCardUpdatedAtom } from "../store/atom/isCardUpdated";
export interface CardProps {
  name: string;
  description: string;
  interests?: string[];
  interest?: string[];
  socials: string[];
}

export const Card: React.FC<CardWithId> = (props) => {
  const { _id, name, description, interest: interests, socials } = props;
  const setIsCardUpdated = useSetRecoilState(isCardUpdatedAtom);
  return (
    <div className="border-2 min-w-fit w-[30vw] h-[40vh] m-4 p-3 rounded-lg shadow-sate-600 ">
      <div className="text-2xl font-serif font-bold m-2">{name}</div>
      <div className="m-2 text-slate-500 text-lg">{description}</div>
      <h1 className="ml-2 m-3 font-serif font-bold text-lg">Interests</h1>
      <ul className="m-2 text-slate-500 text-base mb-1">
        {(interests as string[]).map((interest, index) => (
          <li key={index}>{interest}</li>
        ))}
      </ul>
      {socials.map((social, index) => (
        <button
          key={index}
          className="bg-blue-500  text-white p-2 m-2 rounded-lg shadow-black"
        >
          {social}
        </button>
      ))}
      <button
        className="bg-red-600 m-2 p-2 text-white rounded-lg shadow-black"
        onClick={() => {
          axios
            .delete(`http://localhost:3000/api/deleteCard?id=${_id}`)
            .then(() => setIsCardUpdated((prevState) => !prevState));
        }}
      >
        Delete
      </button>
    </div>
  );
};
