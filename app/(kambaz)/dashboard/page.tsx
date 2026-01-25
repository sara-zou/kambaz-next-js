import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />

      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course"> 
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/music.png" width={200} height={150} alt="reactjs" />
            <div>
              <h5> MUSC1235 Fundamentals of Western Music Theory </h5>
              <p className="wd-dashboard-course-title">
                Learn basics of Western music theory
              </p>
              <button> Go </button>
            </div>
          </Link>
          </div>

        <div className="wd-dashboard-course"> 
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/systems.jpeg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS3650 Computer Systems </h5>
              <p className="wd-dashboard-course-title">
                Learn coding in Assembly and C
              </p>
              <button> Go </button>
            </div>
        </Link>
        </div>

      
        <div className="wd-dashboard-course"> 
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/databases.jpeg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS3200 Introduction to Databases</h5>
              <p className="wd-dashboard-course-title">
                SQL and datatbases
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course"> 
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/biology.jpeg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> BIO1111 General Biology 1</h5>
              <p className="wd-dashboard-course-title">
                Fundamentals of biology
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course"> 
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/cybersecurity.jpeg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CY2550 Foundations of Cybersecurity </h5>
              <p className="wd-dashboard-course-title">
                Basics of cybersecurity
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course"> 
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/hci.jpeg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS2500 Human-Computer Interaction </h5>
              <p className="wd-dashboard-course-title">
                UX/UI designs
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
);}
