'use client'

import React from 'react'

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function SingleSelect({ input, isMulti }) {

    return (
        <div style={{ width: "100%", marginLeft: "auto", marginRight: "auto" }}>
            <label style={{ textAlign: "center", width: "100%" }}>{input.label}</label>
            <Select
                closeMenuOnSelect={isMulti ? false : true}
                components={animatedComponents}
                options={input.options}
                className={input.className}
                isClearable
                isMulti={isMulti ? true : false}
                value={isMulti ?
                    input.value.map(item => input.options.find(option => option.value === item))
                    :
                    input.options.find(option => option.value == input.value)}
                onChange={(e) => {
                    if (isMulti) {
                        if (e === null) {
                            input.setValue([])
                        } else {
                            input.setValue(e.map(item => item.value))
                        }
                    } else {
                        if (e === null) {
                            input.setValue("")
                        } else {
                            input.setValue(e.value)
                        }
                    }
                }}
            />
        </div>
    )
}
