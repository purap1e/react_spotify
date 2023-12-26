import React from 'react'

const SearchInput = ({value, onChange}) => {

    return (
        <input className="search-input" value={value} onChange={(e) => onChange(e.target.value)} placeholder="Что хочешь послушать?">

        </input>
    )
}

export default SearchInput