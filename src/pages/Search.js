import Nav from "../Components/nav";
import { MdChevronRight } from "react-icons/md";

export default function Search() {
  
  return (
    <div>
      <Nav></Nav>
      
      {/* Div that holds details of the booking; Location, date and Edit option */}
      <div>
        <div style={{width: "90%", height:"70px", border: "2px solid orange", margin: "auto", marginTop: "20px", borderRadius:"10px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px"}}>  
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
             <div> From </div>
             <MdChevronRight style={{fontSize:"25px"}}/>
             <div> To </div>
          </div>
          <div>
            <button style={{backgroundColor:"#228B22", color:"white", borderRadius:"5px", width:"50px", height:"30px", border:"none"}}>Edit</button>
          </div>
        </div>
      </div>

    </div>
  );
}
