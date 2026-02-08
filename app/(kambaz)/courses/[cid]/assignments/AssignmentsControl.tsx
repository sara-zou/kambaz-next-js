import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormControl, InputGroup } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "../modules/GreenCheckmark";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { FaMagnifyingGlass } from "react-icons/fa6";
export default function AssignmentsControls() {
 return (
   <div id="wd-modules-controls" className="text-nowrap">
     <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-module-btn">
       <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
       Assignment
     </Button>
     <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-collapse-all">
     <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
     Group
     </Button>
     <InputGroup className="me-1 float-start" >
    <InputGroupText><FaMagnifyingGlass /></InputGroupText>
    <FormControl type="email" placeholder="Search..." />
  </InputGroup>

   </div>
);}
