import React from 'react'

const Metric = ({title, value}) => {
    return (
        <>
        <div style={{padding: "10px", width: '50%'}}>
            <p style={{fontSize: "15px",color: "#a09c9c"}}>
                {title}
            </p>
            <p style={{fontSize: "18px", color: "white"}}>
                {value}
            </p>
        </div>
        </>
    )
}

export default Metric;