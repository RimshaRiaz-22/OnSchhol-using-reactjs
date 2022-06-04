import React,{useState,useEffect} from 'react'
import image from './Images/logo.png'
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import SettingsIcon from '@mui/icons-material/Settings';
import List from '@mui/material/List';
import { makeStyles } from '@material-ui/core/styles'
// import {  useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material';
import Swal from 'sweetalert2'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import LogoutIcon from '@mui/icons-material/Logout';
import { Grid } from '@material-ui/core';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Dashboard from './Dashboard';
import Bookmarks from './Bookmarks';
import LearningPaths from './LearningPaths';
import Logout from './Logout';
import Notes from './Notes';
import LegalInfo from './LegalInfo';
import StudyPlanner from './StudyPlanner';
import Performance from './Performance';
import Videos from './Videos';
import ClassIcon from '@mui/icons-material/Class';
import AllCourses from './AllCourses';
import { useNavigate } from 'react-router-dom'
import url from './url';
import axios from 'axios'
import MyCourseJoin from './MyCourseJoin'

const drawerWidth = 240;
const logoStyle = {
    width: '93%',
    height: '190%',
    marginTop: '-14px'
}
const useStyles = makeStyles({
    BackGround: {
        // backgroundColor: '#181821',
        // color: 'white',
        borderBottom: ' 1px solid #262635',
        paddingLeft: '65px'

    }, BackGroundMain: {
        backgroundColor: '#f5f5f5'

    }, iconColor: {
        color: '#6c7073'
    }, iconColorMenu: {
        color: 'white'

    }, searchinput: {
        display: 'flex',
        flexDirection: 'row-reverse',

    }, appicons: {
        display: 'flex',
        flexDirection: 'row-reverse',

    },
    Header: {
        textAlign: 'center',
        fontSize: '20px',
        fontWeight: '500',
        height: '30px',
        margin: '18px auto',
        display: 'block',
        color: '#83d8ae'
    }, ListStyle1: {
        marginTop: '-10px'
    }, listStyle: {
        // backgroundColor: '#1f1f2b',
        // color: 'white',
        height: '100%'
    }, account: {
        marginTop: '10px'
    }
})
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));
// Search 
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));
const MarginTop = {
    marginTop: "70px",
    padding: '10px',
    overflow: 'hidden'
}
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);
const AppBarStream = (props) => {
    const headers = {
        'Content-Type': 'application/json'
    }
    let navigate = useNavigate();
    console.log('appbar session')
    console.log(props.data);

    const classes = useStyles();
    const theme = useTheme();

    const [open, setOpen] = React.useState(false);


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    // let navigate = useNavigate();
    // False set show to view profile page 
    const [show, setShow] = React.useState(false);
    const [show1, setShow1] = React.useState(false);
    const [show2, setShow2] = React.useState(false);
    const [show3, setShow3] = React.useState(false);
    const [show4, setShow4] = React.useState(false);
    const [show5, setShow5] = React.useState(false);
    const [show6, setShow6] = React.useState(false);
    const [show7, setShow7] = React.useState(false);
    const [show8, setShow8] = React.useState(false);
    const [show9, setShow9] = React.useState(false);
    const [show10, setShow10] = React.useState(true);

         // Logout Admin Profile
         const logout = () => {
            console.log('Logout');
            axios.put(`${url}user/logout`, {
                _id: props.data
            }, { headers }).then(response => {
                console.log(response);
                console.log('Logout Successfull');
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Logout Successfull',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/')
            })
                .catch(err => {
                    console.log(err)
                })
        };

    return (
        <>
            {/* AppBar  */}
            <AppBar position="fixed" open={open}>
                <Toolbar className={classes.BackGround}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon className={classes.iconColorMenu} />

                    </IconButton>
                    <div>OnSchool</div>

                    {/* Search  */}
                    <Grid container className={classes.searchinput}>
                        <Grid item >
                            <AccountCircle className={classes.account} />
                        </Grid>
                        <Grid item >
                            <Search className={classes.searchinput}>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search></Grid>
                    </Grid>


                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader >
                    <div className={classes.Header} onClick={() => {
                        setShow(false);
                        setShow1(false);
                        setShow2(false)
                        setShow3(false);
                        setShow4(false);
                        setShow5(false);
                        setShow6(false);
                        setShow7(false);
                        setShow8(false);
                        setShow9(false);
                        setShow10(false);
                    }}>
                        <Avatar src={image} variant="square" style={logoStyle} ></Avatar>
                        {/* <img */}

                    </div>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon className={classes.iconColor} /> : <ChevronRightIcon className={classes.iconColor} />}
                    </IconButton>
                </DrawerHeader>

                <List className={classes.listStyle}>

                    <ListItem disablePadding className={classes.ListStyle1}>
                        <ListItemButton onClick={() => {
                            setShow(true);
                            setShow1(false);
                            setShow2(false)
                            setShow3(false);
                            setShow4(false);
                            setShow5(false);
                            setShow6(false);
                            setShow7(false);
                            setShow8(false);
                            setShow9(false);
                            setShow10(false);

                        }} >
                            <ListItemIcon>
                                <HomeIcon className={classes.iconColor} />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding className={classes.ListStyle1}>
                        <ListItemButton onClick={() => {
                            setShow(false);
                            setShow1(true);
                            setShow2(false);
                            setShow3(false);
                            setShow4(false);
                            setShow5(false);
                            setShow6(false);
                            setShow7(false);
                            setShow8(false);
                            setShow9(false);
                            setShow10(false);


                        }}>
                            <ListItemIcon>
                                <AssignmentIcon className={classes.iconColor} />

                            </ListItemIcon>
                            <ListItemText primary="Study Planner" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding className={classes.ListStyle1}>
                        <ListItemButton onClick={() => {
                            setShow(false);
                            setShow1(false);
                            setShow2(false)
                            setShow3(false);
                            setShow4(false);
                            setShow5(false);
                            setShow6(false);
                            setShow7(false);
                            setShow8(false);
                            setShow9(true);
                            setShow10(false);

                        }} >
                            <ListItemIcon>
                                <ClassIcon className={classes.iconColor} />
                            </ListItemIcon>
                            <ListItemText primary="Classes" />
                        </ListItemButton>
                    </ListItem>




                    <ListItem disablePadding className={classes.ListStyle1}>
                        <ListItemButton onClick={() => {
                            setShow(false);
                            setShow1(false);
                            setShow2(true)
                            setShow3(false);
                            setShow4(false);
                            setShow5(false);
                            setShow6(false);
                            setShow7(false);
                            setShow8(false);
                            setShow9(false);
                            setShow10(false);

                        }} >
                            <ListItemIcon>
                                <VideoLibraryIcon className={classes.iconColor} />
                            </ListItemIcon>
                            <ListItemText primary="Videos" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding className={classes.ListStyle1}>
                        <ListItemButton onClick={() => {
                            setShow(false);
                            setShow1(false);
                            setShow2(false)
                            setShow3(true);
                            setShow4(false);
                            setShow5(false);
                            setShow6(false);
                            setShow7(false);
                            setShow8(false);
                            setShow9(false);
                            setShow10(false);

                        }}>
                            <ListItemIcon>
                                <ListAltIcon className={classes.iconColor} />
                            </ListItemIcon>
                            <ListItemText primary="Learning Paths" />
                        </ListItemButton>
                    </ListItem>

                    {/* <ListItem disablePadding className={classes.ListStyle1}>
                        <ListItemButton onClick={() => {
                            setShow(false);
                            setShow1(false);
                            setShow2(false)
                            setShow3(false);
                            setShow4(true);
                            setShow5(false);
                            setShow6(false);
                            setShow7(false);
                            setShow8(false);
                            setShow9(false);
                            setShow10(false);

                        }} >
                            <ListItemIcon>
                                <BookmarksIcon className={classes.iconColor} />
                            </ListItemIcon>
                            <ListItemText primary="Archieved" />
                        </ListItemButton>
                    </ListItem> */}

                    <ListItem disablePadding className={classes.ListStyle1}>
                        <ListItemButton onClick={() => {
                            setShow(false);
                            setShow1(false);
                            setShow2(false);
                            setShow3(false);
                            setShow4(false);
                            setShow5(true);
                            setShow6(false);
                            setShow7(false);
                            setShow8(false);
                            setShow9(false);
                            setShow10(false);


                        }}>
                            <ListItemIcon>
                                <StickyNote2Icon className={classes.iconColor} />
                            </ListItemIcon>
                            <ListItemText primary="Notes" />
                        </ListItemButton>
                    </ListItem>



                    <ListItem disablePadding className={classes.ListStyle1}>
                        <ListItemButton onClick={() => {
                            setShow(false);
                            setShow1(false);
                            setShow2(false)
                            setShow3(false);
                            setShow4(false);
                            setShow5(false);
                            setShow6(true);
                            setShow7(false);
                            setShow8(false);
                            setShow9(false);
                            setShow10(false);


                        }}>
                            <ListItemIcon>
                                <InsertChartIcon className={classes.iconColor} />
                            </ListItemIcon>
                            <ListItemText primary="Performance" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding className={classes.ListStyle1}>
                        <ListItemButton onClick={() => {
                            setShow(false);
                            setShow1(false);
                            setShow2(false)
                            setShow3(false);
                            setShow4(false);
                            setShow5(false);
                            setShow6(false);
                            setShow7(true);
                            setShow8(false);
                            setShow9(false);
                            setShow10(false);

                        }}>
                            <ListItemIcon>
                                <SettingsIcon className={classes.iconColor} />
                            </ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding className={classes.ListStyle1}>
                        <ListItemButton onClick={() => {
                            setShow(false);
                            setShow1(false);
                            setShow2(false)
                            setShow3(false);
                            setShow4(false);
                            setShow5(false);
                            setShow6(false);
                            setShow7(false);
                            setShow8(true);
                            setShow9(false);
                            setShow10(false);

                        }}>
                            <ListItemIcon>
                                <LogoutIcon className={classes.iconColor} />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>

                </List>

            </Drawer>
            <Main open={open} style={MarginTop} className={classes.BackGroundMain}>
                {/* <ProfileData/> */}
                {show ? <Dashboard /> : null}
                {show1 ? <StudyPlanner /> : null}
                {show2 ? <Videos /> : null}
                {show3 ? <LearningPaths /> : null}
                {show4 ? < Bookmarks /> : null}
                {show5 ? < Notes /> : null}
                {show6 ? <Performance /> : null}
                {show7 ? <LegalInfo /> : null}
                {show8 ? < Logout /> : null}
                {show9 ? < AllCourses /> : null}
                {show10 ? < MyCourseJoin data={props.data} /> : null}


            </Main>
        </>
    )
}

export default AppBarStream