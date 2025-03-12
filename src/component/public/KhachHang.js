import { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const CartContext = createContext();
export {CartContext}

export default () => {
    const [cart,setcart] = useState([]); 
    const navigate=useNavigate();
    if(localStorage.getItem("token")==null||localStorage.getItem("role")!="khachhang"){
        navigate("/login")
    }
    useEffect(()=>{
        setcart(JSON.parse(localStorage.getItem("cart")))
    },[])
    useEffect(()=>{
        localStorage.setItem("cart",JSON.stringify(cart))
    },[cart])
    return (
        <CartContext.Provider value={{cart,setcart}}>
            <div>
                <Outlet />
                <div style={{
                    position: "fixed",
                    bottom: "200px",
                    right: "20px",
                    width: "50px",
                    height: "50px",
                }}>
                    <img 
                        src="https://cdn-icons-png.flaticon.com/128/12306/12306467.png" 
                        alt="Cart" 
                        style={{ width: "100%", height: "100%" }}
                        onClick={()=>{
                            navigate("/khachhang/checkout")
                        }}
                    />
                    {cart?.length > 0 && (
                        <span style={{
                            position: "absolute",
                            cursor:"pointer",
                            top: "0",
                            right: "0",
                            background: "red",
                            color: "white",
                            borderRadius: "50%",
                            width: "20px",
                            height: "20px",
                            fontSize: "12px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontWeight: "bold",
                        }}>
                            {cart?.length}
                        </span>
                    )}
                </div>
            </div>
        </CartContext.Provider>
    );
};
