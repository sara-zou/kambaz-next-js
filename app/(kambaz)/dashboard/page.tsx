import Link from "next/link";
import Image from "next/image";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from "react-bootstrap";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />

      <div id="wd-dashboard-courses">
        
      <Row xs={1} md={5} className="g-4">
   
        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
          <Link href="/courses/1234/home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
            <CardBody>
            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</CardTitle>
            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
              Full Stack software developer</CardText>
            <Button variant="primary">Go</Button>
            </CardBody>
          </Link>
          </Card>
        </Col>

        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
          <Link href="/courses/1234/home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/music.png" width="100%" height={160}/>
            <CardBody>
            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">MUSC1235 Fundamentals of Western Music Theory</CardTitle>
            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
            Learn basics of Western music theory</CardText>
            <Button variant="primary">Go</Button>
            </CardBody>
          </Link>
          </Card>
        </Col>

        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
          <Link href="/courses/1234/home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/systems.jpeg" width="100%" height={160}/>
            <CardBody>
            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS3650 Computer Systems</CardTitle>
            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
            Learn coding in Assembly and C</CardText>
            <Button variant="primary">Go</Button>
            </CardBody>
          </Link>
          </Card>
        </Col>

        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
          <Link href="/courses/1234/home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/biology.jpeg" width="100%" height={160}/>
            <CardBody>
            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">BIO1111 General Biology 1</CardTitle>
            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
            Fundamentals of biology</CardText>
            <Button variant="primary">Go</Button>
            </CardBody>
          </Link>
          </Card>
        </Col>

        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
          <Link href="/courses/1234/home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/cybersecurity.jpeg" width="100%" height={160}/>
            <CardBody>
            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CY2550 Foundations of Cybersecurity</CardTitle>
            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
            Basics of cybersecurity</CardText>
            <Button variant="primary">Go</Button>
            </CardBody>
          </Link>
          </Card>
        </Col>

        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
          <Link href="/courses/1234/home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/hci.jpeg" width="100%" height={160}/>
            <CardBody>
            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS2500 Human-Computer Interaction</CardTitle>
            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
            UX/UI designs</CardText>
            <Button variant="primary">Go</Button>
            </CardBody>
          </Link>
          </Card>
        </Col>

        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
          <Link href="/courses/1234/home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/technvalues.png" width="100%" height={160}/>
            <CardBody>
            <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">PHIL1145 Technology and Human values</CardTitle>
            <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
            Morals in relation to technology</CardText>
            <Button variant="primary">Go</Button>
            </CardBody>
          </Link>
          </Card>
        </Col>
        </Row>
      </div>
    </div>
);}
