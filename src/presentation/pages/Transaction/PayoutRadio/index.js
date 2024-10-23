import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Payout = ()=>{
    
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
      };

      const handleGoClick = () => {
        if (selectedOption === "prefundtransactions") {
          navigate("/PrefundTransactions");
        } else if (selectedOption === "payouttransactions") {
          navigate("/Payouttransactions");
        } else if (selectedOption === "fundtransfer"){
          navigate("/Fund Transfer")
        } else if (selectedOption === "wallettransactions"){
            navigate("/WalletTransactions")
        }
      };
    

    return(
        <div>
        <div
        style={{
          width: "45%",
          backgroundColor: "white",
          borderRadius: "20px",
          margin: "150px 0px 0px 250px",
          boxShadow: "1px 2px 3px 4px #d9d9d9",
          padding: "20px"
        }}
      >
        <div style={{marginBottom:10, fontWeight: "bold"}}> Select</div>
        <div style={{display:"flex", flexDirection:"column",marginLeft:30}}>
        <div style={{marginBottom:20}}>
        <label>
        <input 
        type="radio"
        value="prefundtransactions"
        checked={selectedOption === "prefundtransactions"}
        onChange={handleOptionChange}
         />Prefund Transactions
         </label>
         </div>
         <div style={{marginBottom:20}}>
        <label>
        <input 
        type="radio"
        value="payouttransactions"
        checked={selectedOption === "payouttransactions"}
        onChange={handleOptionChange}
         />Payout Transactions
         </label>
         </div>
         <div style={{marginBottom:20}}>
        <label>
        <input 
        type="radio"
        value="fundtransfer"
        checked={selectedOption === "fundtransfer"}
        onChange={handleOptionChange}
         />Fund Transfer
         </label>
         </div>
         <div style={{marginBottom:20}}>
        <label>
        <input 
        type="radio"
        value="wallettransactions"
        checked={selectedOption === "wallettransactions"}
        onChange={handleOptionChange}
         />Wallet Transactions
         </label>
         </div>
        </div>
        <div style={{display:"flex",justifyContent:"center"}}>
        <button
            type="button"
            onClick={handleGoClick}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              borderRadius: "5px",
              cursor: "pointer",
              border: "none",
            }}
          >
            Go
          </button>
          </div>
        </div>
        </div>
    )
}

export default Payout;