import React from "react";
import "./layout.css";

const Table = ({ children }) => {

  const tableStyles = {
    height: '100vh',
    width: '100%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: "url('table.jpg')",

  }

  return (
    <div style={tableStyles}>
        {children}
    </div>
  )
}

export default Table
