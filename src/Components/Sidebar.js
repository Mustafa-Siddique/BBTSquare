import React, {useState, useEffect} from "react";
import {isMobile} from 'react-device-detect';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import logo from '../assets/images/logo-text.png'
import { FaGem, FaList, FaCode, FaSuitcase, FaTelegramPlane, FaTwitter, FaTiktok, FaInstagram } from "react-icons/fa";
import { SiCrowdsource} from "react-icons/si";
import { BsFillFileEarmarkLockFill} from "react-icons/bs";
import {MdOutlineCastForEducation} from 'react-icons/md'
import {GiWolfTrap, GiNewShoot, GiBugleCall, GiPayMoney} from 'react-icons/gi'
import {HiOutlineDocumentText} from 'react-icons/hi'
import {Link} from 'react-router-dom'

export default function Sidebar(props) {

  const [isCollapse, setIsCollapse] = useState(false)

    const toggleCollapse = () => {
      setIsCollapse(!isCollapse)
      console.log("Clicked")
    }

    useEffect(() => {
      if (isMobile) {
        toggleCollapse()
      }
    }, [props.lg])
    

  return (
    <ProSidebar collapsed={isCollapse}>
      <SidebarHeader>
        <div id="pro-sidebar-brand" onClick={() => setIsCollapse(!isCollapse)}><img src={logo} alt="" /></div>
          <a href="www.boobytrap.live" style={isCollapse === false ? {display:"block"} : {display:"none"}} target="_blank" className="fs-6 text-secondary fw-normal ms-4">Back to Main Site</a>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="square">
          <MenuItem active={window.location.pathname.includes("/safehaven") ? true : false} icon={<FaGem fontSize={20} />}><Link id="pro-sidebar-link" to="/safehaven">SAFE HAVEN</Link></MenuItem>
          <MenuItem active={window.location.pathname.includes("/boobytrap") ? true : false} icon={<GiWolfTrap fontSize={25} />}><Link id="pro-sidebar-link" to="/boobytrap">BOOBYTRAP</Link></MenuItem>
          <MenuItem active={window.location.pathname.includes("/ongoing") ? true : false} icon={<FaList />}><Link id="pro-sidebar-link" to="/ongoing">DYOR PROJECTS</Link></MenuItem>
          <MenuItem active={window.location.pathname.includes("/upcoming") ? true : false} icon={<GiNewShoot fontSize={20} />}><Link id="pro-sidebar-link" to="/upcoming">UPCOMING PROJECTS</Link></MenuItem>
          <MenuItem active={window.location.pathname.includes("/developers") ? true : false} icon={<FaCode fontSize={20} />}><Link id="pro-sidebar-link" to="/developers">DEVELOPERS</Link></MenuItem>
          <MenuItem active={window.location.pathname.includes("/influencers") ? true : false} icon={<SiCrowdsource fontSize={20} />}><Link id="pro-sidebar-link" to="/influencers">INFLUENCERS</Link></MenuItem>
          <MenuItem active={window.location.pathname.includes("/promoters") ? true : false} icon={<GiBugleCall fontSize={20} />}><Link id="pro-sidebar-link" to="/promoters">AMA/CALL CHANNELS</Link></MenuItem>
          <MenuItem icon={<FaSuitcase fontSize={20} />}><Link id="pro-sidebar-link" to="/comingsoon">OTHER SERVICES</Link></MenuItem>
          <MenuItem active={window.location.href.includes("square.boobytrap") ? true : false} icon={<GiPayMoney fontSize={20} />}><Link id="pro-sidebar-link" to="/comingsoon">BBT SQUARE</Link></MenuItem>
          <MenuItem icon={<BsFillFileEarmarkLockFill fontSize={20} />}><Link id="pro-sidebar-link" to="/comingsoon">INSURANCE DAO</Link></MenuItem>
          <MenuItem icon={<MdOutlineCastForEducation fontSize={20} />}><Link id="pro-sidebar-link" to="/comingsoon">IEP</Link></MenuItem>
          <MenuItem active={window.location.pathname.includes("/docs") ? true : false} icon={<HiOutlineDocumentText fontSize={20} />}><Link id="pro-sidebar-link" to="/docs">DOCS</Link></MenuItem>
        </Menu>
        {/* <Menu iconShape="circle">
          <SubMenu
            suffix={<span className="badge yellow">3</span>}
            title="With Suffix"
          >
            <MenuItem> 1 </MenuItem>
            <MenuItem> 2 </MenuItem>
            <MenuItem> 3 </MenuItem>
          </SubMenu>
        </Menu> */}
      </SidebarContent>
      <SidebarFooter style={isCollapse === false ? {display:"block"} : {display:"none"}}>
        <div className="pro-sidebar-social mt-1">
          <a href="https://twitter.com/BoobyTrapBsc" target = "_blank" rel="noreferrer"><FaTwitter/></a>
          <a href="http://tiktok.com/@boobytrapbsc" target = "_blank" rel="noreferrer"><FaTiktok/></a>
          <a href="https://t.me/boobytrapbsc" target = "_blank" rel="noreferrer"><FaTelegramPlane/></a>
          <a href="https://instagram.com/boobytrap_bsc" target = "_blank" rel="noreferrer"><FaInstagram/></a>
        </div>
        <p className="fs-6 text-center mt-2 mb-0">E-mail: <a href="mailto:info@boobytrap.live" target = "_blank" rel="noreferrer">info@boobytrap.live</a></p>
        <p className="fs-6 text-center mb-0">&copy; BoobyTrap All Rights Reserved</p>
      </SidebarFooter>
    </ProSidebar>
  );
}