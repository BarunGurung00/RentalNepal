import carImg from "../pics/image.png";
import { IoArrowForwardCircle } from "react-icons/io5";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Components/nav";
import SearchBox from "../Components/SearchBox";


export default function Home(){

    const [query,setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) =>{
        if (e.key === "Enter" && query.trim()) {
            navigate(`/search?query=${encodeURIComponent(query)}`);
        }
    }
    return(

 <div className="App" style={{ position:"relative", margin: "0", boxSizing: "border-box"}}>

      {/* Header Section */}
      <Nav></Nav>

      {/* Main section */}
      <main>
        <div style={{ position: "relative", height: "95vh"}}>
          <div style={{ position: "absolute", top: "0", left: "0", right: "0", bottom: "0", background: "linear-gradient(rgb(24, 121, 202), rgba(0, 0, 0, 0))"}}></div>
          <img src={carImg} alt="Car" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          {/* Content Section */}
          <div style={{ position: "absolute", top: "25px", width: "100%", textAlign: "center", zIndex: 1 }}>
            <h1 style={{ color: "white", margin: "0" }}>Rent a car that fits you</h1>
          </div>
          <div style={{position: "absolute", top: "20%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1, width: "100%"}}>
            <SearchBox />
            {/* <input type="text" placeholder="Search..." style={{ width: "450px", border: "2px solid gray", borderRadius: "13px", outline: "none", padding: "5px" }} value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleSearch} /> */}
          </div>
        </div>
      </main>


      {/* Footer Section */}
      <footer style={{absolute:"absolute", bottom:"0"}}>
        <div style={{height:"30vh", color:"white", padding:"0px"}}>
            <div style={{width:"100%",color:"black", height:"50%", display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}> 
                <div style={{width:"50%", height:"50%", display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                   <div>
                        <h3>HEARD ENOUGH -</h3>
                   </div>
                   <div>
                        <h1>Contach us</h1>
                   </div>
                </div>
               <div>
                    <IoArrowForwardCircle style={{backgroundColor:"rgb(153, 182, 48)", borderRadius:'200px', color:'black', }} size={30}/>
               </div>
            </div>
            <div style={{width:"100%",backgroundColor:"black", height:"50%", display:"flex", flexDirection:"row", justifyContent:"space-between", alightItems:"center"}}>
                <div>
                    <h1>@The Platform for Rentals</h1>
                </div>
                <div>
                    <h3>About us</h3>
                    <p style={{maxWidth:'150px', fontSize:"0.7rem"}}><span style={{textDecoration:"underline"}}>barungurung00@gmail.com</span> <br/> +977-9701524115 <br/> We are rental platform for any kind of automobils</p>
                </div>
                <div>
                    <h3>Services</h3>
                    <div style={{display:"flex", flexDirection:"column", gap:"1px", justifyContent:"center"}}>
                        <div>Car Rental</div>
                        <div>Car Sales</div>
                        <div>Car Service</div>
                        <div>Airport Pickup/DropOff</div>
                    </div>
                </div>
                <div>
                    <h3>Social Media</h3>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                      <IoLogoLinkedin />
                      <FaSquareFacebook />
                      <FaTwitter />
                    </div>
                </div>
            </div>     
        </div>
      </footer>
 </div>
    
    );
}