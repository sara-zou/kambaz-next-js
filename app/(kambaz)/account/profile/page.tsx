import Link from "next/link";
import { Button } from "react-bootstrap";
import FormControl from "react-bootstrap/esm/FormControl";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h1>Profile</h1>
      <FormControl id="wd-username"
             placeholder="alice"
             className="mb-2"/>
      <FormControl id="wd-username"
             defaultValue="123"
             className="mb-2"/>
      <FormControl id="wd-username"
             defaultValue="Alice"
             className="mb-2"/>
      <FormControl id="wd-username"
             defaultValue="Wonderland"
             className="mb-2"/>
      <FormControl id="wd-username"
             defaultValue="mm/dd/yyyy"
             className="mb-2"/>
      <FormControl id="wd-username"
             defaultValue="alice@wonderland.com"
             className="mb-2"/>
      <FormControl id="wd-username"
             defaultValue="User"
             className="mb-2"/>
      <Button variant="danger" size="lg" id="wd-collapse-all">
     Sign out
     </Button>
    </div>
);}
