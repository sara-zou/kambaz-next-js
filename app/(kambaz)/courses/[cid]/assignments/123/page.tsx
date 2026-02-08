import { Button, Col, Container, FormCheck, FormLabel, FormSelect, Row } from "react-bootstrap";
import FormControl from "react-bootstrap/esm/FormControl";

export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <FormLabel>Assignment Name</FormLabel>
        <FormControl type="name" defaultValue="A1" />
        <FormControl type="descriptions" style={{ height: "200px" }}
        defaultValue="The assignment is available online,
        submit a link to the landing page of your web application." />
        <div className="float-end">
          <Row>
       <Col sm={10}>
       <FormLabel column sm={2}> Points </FormLabel>
           <FormControl type="points" defaultValue="100"/>
       </Col>
       </Row>
                
       <Row>
       <Col sm={10}>
       <FormLabel column sm={2}> Assignment Group </FormLabel>
       <FormSelect>
                    <option value="0" defaultChecked>Assignments</option>
                    <option value="1">Quizzes</option>
                    <option value="2">Exams</option>
                </FormSelect>
       </Col>
       </Row>

       <Row>
       <Col sm={10}>
       <FormLabel column sm={2}> Display Grades as </FormLabel>
       <FormSelect>
                    <option value="0" defaultChecked>Assignments</option>
                    <option value="1">Quizzes</option>
                    <option value="2">Exams</option>
                </FormSelect>
       </Col>
       </Row>

       <Row>
       <Col sm={10}>
       <FormLabel column sm={2}> Submission Type </FormLabel>
       <FormSelect>
                    <option value="0" defaultChecked>Online</option>
                    <option value="1">Paper</option>
                </FormSelect>
                <FormLabel column sm={2}> Online Entry Options </FormLabel>
                <FormCheck type="switch" defaultChecked={false} label="Text Entry"/>
                <FormCheck type="switch" defaultChecked={true}  label="Website URL"/>
                <FormCheck type="switch" defaultChecked={false} label="Media Recordings"/>
                <FormCheck type="switch" defaultChecked={false} label="Student Annotions"/>
                <FormCheck type="switch" defaultChecked={false} label="File Uploads"/>

       </Col>
       </Row>

       <FormLabel column sm={2}> Assign to </FormLabel>
       <FormControl type="assignedTo" defaultValue="Everyone"/>
       
       <Row>
        <Col column sm={2}>
        <FormLabel column sm={2}> Due </FormLabel>
        <FormControl type="dueDate" defaultValue="05/13/2024"/>
        </Col>
       </Row>

       <Row>
        <Col column sm={2}>
        <FormLabel column sm={2}> Available From </FormLabel>
        <FormControl type="dueDate" defaultValue="05/06/2024"/>
        </Col>
       </Row>

       <Row>
        <Col column sm={2}>
        <FormLabel column sm={2}> Until </FormLabel>
        <FormControl type="dueDate"/>
        </Col>
       </Row>
       <Button variant="danger" size="lg" className="me-1 float-end" id="wd-collapse-all">
     Save
     </Button>
       <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-collapse-all">
     Cancel
     </Button>
        </div>
        <br />
      </div>
  );}
  