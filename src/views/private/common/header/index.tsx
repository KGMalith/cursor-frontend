import React,{useState,useEffect} from 'react';
import { Image, Dropdown, Card, Badge, Container } from 'react-bootstrap';
import './header.scss';
import {ExternalLink} from 'react-feather';
import { NavLink } from 'react-router-dom';
import {logout } from '../../../../services/utils/auth';
import { useNavigate } from 'react-router-dom';
import { useWindowSize } from 'usehooks-ts'
import {useDispatch,useSelector} from 'react-redux';
import {setEmailAction,setImageAction,setUserFirstNameAction,setUserLastNameAction,userSelector} from '../../../../redux/userSlice';


function HeaderTopBar() {
    const [state,setState] = useState({
        is_navbar_clicked: false
    });
    const [userImage,setUserImage] = useState('');
    const navigate = useNavigate();
    const { width } = useWindowSize()
    const dispatch = useDispatch();
    const {first_name,last_name,email,image} = useSelector(userSelector);

    const dropdownSelect = async(e:string) => {
        if (e === '1') {
            navigate("/app/profile");
        }
        if (e === '2') {
            dispatch(setEmailAction(null));
            dispatch(setImageAction(null));
            dispatch(setUserFirstNameAction(null));
            dispatch(setUserLastNameAction(null));
            await logout();
            navigate("/");
        }
    }

    function navBarClicked(){
        setState({ is_navbar_clicked: !(state.is_navbar_clicked) })
    }

    useEffect(() => {
        if (width > 991) {
            setState({ is_navbar_clicked: false });
        }
    }, [width])

    useEffect(() => {
    let imageUrl = image;
      let path = imageUrl?imageUrl:'/images/dummy-avatar.png';
      setUserImage(path);
    }, [image])

    return (
        <header className="header-bar">
            <Container>
                <div className="header-box">
                    <div className="header-toggler ms-3 d-md-down-none me-auto">
                        <Image src='/images/inner-logo.png' alt='logo' />
                    </div>
                    <div className="header-nav px-3">
                        {state.is_navbar_clicked === true ?
                            <nav className="navbar order-last order-lg-0 navbar-mobile d-lg-none">
                                <ul>
                                    <li><NavLink to="/app/home" className={({ isActive })=>isActive?"nav-link active":"nav-link"}>Home</NavLink></li>
                                </ul>
                                <i className={state.is_navbar_clicked === true ? "bi bi-x mobile-nav-toggle" : "bi bi-list mobile-nav-toggle ms-3"} onClick={navBarClicked}></i>
                            </nav>
                            :
                            <ul className='header-inner-nav me-5 d-none d-lg-flex'>
                                <li className="mx-2">
                                    <NavLink to="/app/home" className={({ isActive })=>isActive?"active-main-nav":"default-main-nav"}>
                                        <div className="nav-item-container">
                                            <span>Home</span>
                                        </div>
                                    </NavLink>
                                </li>
                            </ul>

                        }
                        <div className="mx-2">
                            <Dropdown
                                align="end"
                                onSelect={(e) => dropdownSelect(e?e:'')}
                            >
                                <Dropdown.Toggle id="dropdown-basic" className="dropdown-btn">
                                    <div className="avatar">
                                        <Image src={userImage} className="avatar-image" />
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="user-dropdown">
                                    <Card>
                                        <Card.Body className="header-card-body">
                                            <div className="dropdown-user-profile">
                                                <div className="avatar me-3">
                                                    <Image src={userImage} alt='logo' className="avatar-image"/>
                                                </div>
                                                <div>
                                                    <p className="user-name">{first_name+' '+last_name}</p>
                                                </div>
                                            </div>
                                            <Dropdown.Divider className="dropdown-divider" />
                                            <Dropdown.Item eventKey="1" className="user-dropdown-item">
                                                <span className="user-dropdown-labels me-2">Your profile</span>
                                                <ExternalLink strokeWidth={1} width={14} height={14} color='#3F4249' style={{marginTop:'-7px'}}/>
                                            </Dropdown.Item>
                                            <Dropdown.Divider className="dropdown-divider" />
                                            <Dropdown.Item className="user-dropdown-item" eventKey="2">
                                                <span className="user-dropdown-labels" style={{ color: '#EA5C5C', fontWeight:'var(--app-medium-weight)'}}>Sign out</span>
                                            </Dropdown.Item>
                                        </Card.Body>
                                    </Card>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <i className={state.is_navbar_clicked === true ? "bi bi-x mobile-nav-toggle" : "bi bi-list mobile-nav-toggle ms-3"} onClick={navBarClicked}></i>
                    </div>
                </div>
            </Container>
        </header>
    )
}

export default HeaderTopBar
