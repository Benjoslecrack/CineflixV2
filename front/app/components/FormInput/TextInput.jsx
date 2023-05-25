'use client'

import React, { useState, useEffect } from "react";


const TextInput = ({ input, valide, setValide, pass }) => {
  const [message, setMessage] = useState("")


  useEffect(() => {
    if (input.validation) {
      setValide(precValide => (precValide.includes(input.name) ? [...precValide] : [...precValide, input.name]))
    }
  }, [])

  useEffect(() => {
    verifyOnChange(input.value)
  }, [input.value, pass])


  const isValidEmail = (email) => {
    // Expression régulière pour vérifier si l'e-mail est valide
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  function filter(condition) {
    console.log("condition:", condition)
    if (!condition) {
      setValide(precValide => (precValide.includes(input.name) ? [...precValide] : [...precValide, input.name]))
    } else {
      setValide(precValide => (precValide.filter((item) => item !== input.name)))
    }
  }

  const verifyOnChange = (value) => {
    console.log("input validation", input.validation, "value", value, "input.name", input.name)
    if (input.validation && input.validation.includes("required")) {
      setMessage("Ce champ est obligatoire.")
      filter(value !== "")
    }
    if (input.validation && input.validation.includes("email")) {
      setMessage("It should be a valid email address!")
      filter(isValidEmail(value))
    }
    console.log("valide", valide);
  }


  return (
    <div className="w-full mb-4">
      <label className={input.labelClassName}>{input.label}</label>
      <input
        key={input.name}
        onChange={(e) => {
          verifyOnChange(e.target.value)
          input.setValue(e.target.value)
        }}
        label={input.label}
        name={input.name}
        type={input.type}
        placeholder={input.placeholder}
        value={input.value}
        className={input.className}
        min={input.min}
        step={input.step}
      />
      {valide.includes(input.name) && message !== "" && pass && <div style={{ color: "red", padding: "5px" }} >{message}</div>
      }
    </div>
  );
};
export default TextInput;