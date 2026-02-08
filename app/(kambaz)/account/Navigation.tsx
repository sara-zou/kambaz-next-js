import Link from "next/link";
export default function AccountNavigation() {
 return (
   <div id="wd-account-navigation">
     <Link href="signin" className="wd-account-navigation-link-selected"> Signin </Link> <br />
     <Link href="signup" className="wd-account-navigation-link"> Signup </Link> <br />
     <Link href="profile" className="wd-account-navigation-link"> Profile </Link> <br />
   </div>
);}
