import {Avatar, Menu, MenuItem} from "@mui/material";
import {useState, MouseEvent, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import {UserAuth} from "../context/AuthContext";
import {getDownloadURL, ref} from "firebase/storage";
import {auth, storage} from "../firebase";

function Navigation() {
    const {logOutUser, user} = UserAuth();
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const params = useParams();
    const navigate = useNavigate();

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const imageRef = ref(storage, `avatars/${auth.currentUser?.uid}`)
        getDownloadURL(imageRef)
            .then((url) => {
                setProfileImage(url)
            }).catch(error => console.log(error))
    }, [])

    const handleClickProfile = () => {
        navigate(`/user/${params.userId}/profile`);
    }

    const handleClickLogout = () => {
        logOutUser().then(r => console.log("logged out"));
    }

    function handleClickHomepage() {
        navigate(`/user/${params.userId}`);
    }

    return (
        <nav className={"custom-bg-green p-4 flex justify-between"}>
            <p onClick={handleClickHomepage} className={"text-3xl font-bold hover:cursor-pointer"}>OPAP</p>
            <div className={"flex"}>
                <p className={"text-xl"}>{user?.displayName}</p>
                <span onClick={handleClick} className={"hover:cursor-pointer"}>
                    <Avatar alt="Rock Johnson" src={profileImage ? profileImage : undefined}/>
                </span>
            </div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}>
                <MenuItem onClick={handleClickProfile}>Profile</MenuItem>
                <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
            </Menu>
        </nav>
    );
}

export default Navigation;