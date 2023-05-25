'use client'

import React, { useState } from 'react';

export default function FileInput({ input }) {
    const [urlFile, setUrlFile] = useState()

    const onSelectedFile = (event, setValue) => {
        const selectedFile = event.target.files;
        if (selectedFile.length === 0) {
            setUrlFile(null);
            setValue(null);
            return;
        }
        setUrlFile(URL.createObjectURL(selectedFile[0]));
        setValue(selectedFile[0])
    };

    return (
        <div className="w-full mb-4">
            <label className={labelClassName}>{input.label}</label>
            <input
                key={input.name}
                onChange={(e) =>
                    onSelectedFile(e, input.setValue)
                }
                label={input.label}
                name={input.name}
                type={input.type}
                errorMessage={input.errorMessage}
                placeholder={input.placeholder}
                // required={input.required}
                encType="multipart/form-data"
                className={input.className}
            />

            {urlFile ? (
                <img src={urlFile} alt={input.name} className="imgInput" />
            ) : input.value !== "" ? (
                <img
                    src={`${process.env.NEXT_PUBLIC_API}/uploads/${input.value}`}
                    alt={input.name}
                    className="imgInput"
                />
            ) : null}


            <span>{input.errorMessage}</span>
        </div>
    );
};

