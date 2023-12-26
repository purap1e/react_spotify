import React from 'react'

const SearchInput = ({value, onChange}) => {

    return (
        <input value={value} onChange={(e) => onChange(e.target.value)}>

        </input>
    )
}

export default SearchInput