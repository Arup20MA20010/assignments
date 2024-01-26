import { CardProps } from "../types/cardTypes";
import { useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { isCardUpdatedAtom } from "../store/atom/isCardUpdated";

export function CardForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [socials, setSocials] = useState<string[]>([]);
  const setIsCardUpdated = useSetRecoilState(isCardUpdatedAtom);
  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    axios
      .post<CardProps>("http://localhost:3000/api/addCards", {
        name,
        description,
        interest: interests,
        socials,
      })
      .then((res) => {
        console.log(res);
        setIsCardUpdated((prevState) => !prevState);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="interest separated by commas"
          onChange={(e) => {
            setInterests(
              (e.target.value as string)
                .split(",")
                .map((interest) => interest.trim()),
            );
          }}
        />
        <input
          type="text"
          placeholder="socials separated by commas"
          onChange={(e) => {
            setSocials(
              (e.target.value as string)
                .split(",")
                .map((social) => social.trim()),
            );
          }}
        />
        <button>Add</button>
      </form>
    </div>
  );
}
