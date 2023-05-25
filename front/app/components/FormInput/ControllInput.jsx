"use client";

import React, { useEffect, useState } from "react";
import FileInput from "./FileInput";
import TextInput from "./TextInput";
import Select from "./Select";

import styles from "../../styles";

export default function ControllInput({ allInput, sendData }) {
  const [valide, setValide] = useState([]);
  const [pass, setPass] = useState(false);

  function startVerify() {
    setPass(true);
    if (valide.length === 0) {
      sendData();
    } else {
      console.log("pas ok register", valide);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {allInput.map((input, index) => {
        switch (input.nametype) {
          case "input":
            return (
              <TextInput
                input={input}
                key={index}
                valide={valide}
                setValide={setValide}
                pass={pass}
              />
            );
          case "file":
            return <FileInput input={input} key={index} />;
          case "singleSelect":
            return <Select input={input} key={index} />;
          case "multiSelect":
            return <Select input={input} key={index} isMulti={true} />;
          case "date":
          //ajout d'input de date

          //ne rien mettre en dessous du custom
          case "custom":
            return input.component;
          default:
            break;
        }
      })}
      <div className="flex items-center justify-center mt-4 w-full">
        <button
          onClick={() => startVerify()}
          className={`${styles.button} font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
