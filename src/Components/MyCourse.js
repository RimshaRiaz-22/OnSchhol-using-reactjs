import React, { useState, useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core';
import Box from '@mui/material/Box';
import welcome from './Images/welcome.jpg'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ArchiveIcon from '@mui/icons-material/Archive';
import SettingsIcon from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@material-ui/core/styles'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import pdfImg from './Images/download.png'

import TextareaAutosize from '@mui/material/TextareaAutosize';
import { styled } from '@mui/material/styles';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import url from './url'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import Swal from 'sweetalert2'
import { Event } from '@material-ui/icons';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ClassIcon from '@mui/icons-material/Class';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import ListItemButton from '@mui/material/ListItemButton';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { Document, Page } from 'react-pdf';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles({
    cardCenter: {
        margin: '20px'
    }, cardCenter1: {
        margin: '20px',
    }, imgCourse: {
        width: '100%',
        height: '100%',
        borderRadius: '50%'
    }, margincard: {
        marginBottom: '10px'

    }, marginBtn: {
        marginBottom: '20px',
        marginTop: '20px'

    }, due: {
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: '14px'
    }, btn: {
        width: '100%',
        marginBottom: '10px',
        marginTop: '10px'
    }, btnB: {
        width: '100%'
    }, marginstyle: {
        marginTop: '20px'
    }, ImgStyle: {
        width: '70px',
        // height:'50px',
        borderRadius: '10px'

    }

})
// Dialog 
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const welcomeStyle = {
    width: '100%',

}
const hrStyle = {
    width: '100%'
}
const textStyle = {
    fontSize: '12px',
    fontWeight: '500'
}
const GridBackground = {
    backgroundColor: '#f5f5f5'
}
const Input = styled('input')({
    display: 'none',
});
function MyCourse(props) {
    // const { state } = useLocation();
    console.log('props.data')

    console.log(props.data)
    // Get all Courses
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [title, setTitle] = useState([]);
    const [classId, setClassId] = useState([]);
    const [description, setDescription] = useState([]);
    const [ownerId, setOwnerId] = useState([]);
    const [enrolledStud, setEnrolledStud] = useState([]);

    const ClassIdData = props.data;
    const getAllData = () => {
        axios.get(`${url}class/get`, {
            params: {
                _id: props.data
            }
        })
            .then((response) => {
                const allData = response.data;
                console.log(allData);
                setData(allData);
                setTitle(allData.name);
                setClassId(allData.classId);
                setDescription(allData.description);
                setclassDescriptionUpdate(allData.description)
                setclassTitleUpdate(allData.name)
                setEnrolledStud(allData.enrolledStudents.length);

                axios.get(`${url}user/get`, {
                    params: {
                        _id: allData.owner
                    }
                })
                    .then((response) => {
                        const allData1 = response.data;
                        console.log(allData1);
                        setOwnerId(allData1.name);
                    })
                    .catch(error => console.error(`Error:${error}`));
                setLoading(true)

            })
            .catch(error => console.error(`Error:${error}`));
    }
    useEffect(() => {
        getAllData();
        getAllAssignment();
        getAllStream();
        getAllQuiz();
        getAllEnrollData();
        getAllVideo();

    }, []);

    const [value1, setValue1] = React.useState(null);
    const [value2, setValue2] = React.useState(new Date());


    const [show, setShow] = React.useState(true);
    const [showUpload, setShowUpload] = React.useState(false);
    const [showNews, setShowNews] = React.useState(true);
    const [showSol, setShowSol] = React.useState(false);
    const [showSolQuiz, setShowSolQuiz] = React.useState(false);
    

    const [showUploadAssign, setshowUploadAssign] = React.useState(false);
    const [showUploadQuiz, setshowUploadQuiz] = React.useState(false);
    const [showUploadLink, setshowUploadLink] = React.useState(false);
    const [showUploadUpdate, setshowUploadUpdate] = React.useState(false);
    const [showViewAssignment, setshowViewAssignment] = React.useState(false);
    const [showViewQuiz, setshowViewQuiz] = React.useState(false);





    const classes = useStyles();
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const viewLec = () => {
        setShow(false);
        setShowNews(false)

    }
    const backtocourse = () => {
        setShow(true);

    }
    const headers = {
        'Content-Type': 'application/json'
    }
    // People 
    // Class Students

    // Settings 
    // Class Update 
    const [classTitleUpdate, setclassTitleUpdate] = useState("");
    const [classDescriptionUpdate, setclassDescriptionUpdate] = useState("");
    const classUpdate = () => {

        axios.put(`${url}class/update`, {
            _id: ClassIdData,
            name: classTitleUpdate,
            description: setclassTitleUpdate,
        }, { headers }).then(response => {
            console.log(response)
            // setData([...data, response.data]);

            let timerInterval
            Swal.fire({
                title: 'Class Updated Successfully',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                    //   Refresh 
                    axios.get(`${url}class/get`, {
                        params: {
                            _id: props.data
                        }
                    })
                        .then((response) => {
                            const allData = response.data;
                            console.log(allData);
                            setData(allData);
                            setTitle(allData.name);
                            setClassId(allData.classId);
                            setDescription(allData.description);
                            setclassDescriptionUpdate(allData.description)
                            setclassTitleUpdate(allData.name)

                            setEnrolledStud(allData.enrolledStudents.length);
                            axios.get(`${url}user/get`, {
                                params: {
                                    _id: allData.owner
                                }
                            })
                                .then((response) => {
                                    const allData1 = response.data;
                                    console.log(allData1);
                                    setOwnerId(allData1.name);
                                })
                                .catch(error => console.error(`Error:${error}`));




                            setLoading(true)

                        })
                        .catch(error => console.error(`Error:${error}`));
                }
            })
        })
            .catch(err => {
                console.log(err)
            })


    }
    // Upload 
    const [createTitle, setcreateTitle] = useState("");
    const [createDescription, setcreateDescription] = useState("");
    // Assignment upload 
    const [AssignTitle, setAssignTitle] = useState("");
    const [file, setfile] = useState([]);
    const [dueDate, setDueDate] = useState(new Date());
    const [number, setNumber] = useState("");
    // Add 
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (event) => {
        console.log('changehandle')
        console.log(event);
        setSelectedFile(event);
        console.log(selectedFile)

        const formData = new FormData();

        formData.append('file', selectedFile);
        axios.post(`${url}upload-file`,
            formData).then(response => {
                console.log(response.data)
            })
        // fetch(
        //     `${url}upload-file`,
        //     {
        //         method: 'POST',
        //         body: formData,
        //     }
        // )
        //     .then((response) => response.json())
        //     .then((result) => {
        //         console.log('Success:', result);
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });

    }
    const assignUpload = () => {

        axios.post(`${url}assignment-question/create`, {
            class: ClassIdData,
            filePath: selectedFile1,
            name: AssignTitle,
            dueDate: dueDate,
            numbers: number,
        }, { headers }).then(response => {
            console.log(response)
            // setData([...data, response.data]);

            let timerInterval
            Swal.fire({
                title: 'Assignment Uploaded Successfully',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
            })
        })
            .catch(err => {
                console.log(err)
            })


    }
    // Quiz 
    // Assignment upload 
    const [QuizTitle, setQuizTitle] = useState("");
    const [dueDateQuiz, setDueDateQuiz] = useState(new Date());
    const [numberQuiz, setNumberQuiz] = useState("");

    const changeHandlerQuiz = (event) => {


    }
    const QuizUpload = () => {
        // const formData = new FormData();
        // formData.append('file', file);
        // axios.post(`${url}upload-file`,
        //     formData).then(response => {
        //         console.log(response.data)
        // setfile(response.data);
        axios.post(`${url}quiz-question/create`, {
            class: ClassIdData,
            filePath: selectedFileQuiz,
            name: QuizTitle,
            dueDate: dueDateQuiz,
            numbers: numberQuiz,
        }, { headers }).then(response => {
            console.log(response)
            // setData([...data, response.data]);

            let timerInterval
            Swal.fire({
                title: 'Quiz Uploaded Successfully',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
            })
        })
            .catch(err => {
                console.log(err)
            })


    }
    // Stream 
    const [streamTitle, setstreamTitle] = useState("");
    const [streamDetails, setstreamDetails] = useState("");
    const [dateStream, setdateStream] = useState(new Date());
    const streamUpload = () => {

        axios.post(`${url}stream/create`, {
            class: ClassIdData,
            title: streamTitle,
            name: AssignTitle,
            details: streamDetails,
            date: dateStream,
        }, { headers }).then(response => {
            console.log(response)
            // setData([...data, response.data]);
            setstreamTitle("")
            setstreamDetails("")


            let timerInterval
            Swal.fire({
                title: 'Stream Created Successfully',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
            })
        })
            .catch(err => {
                console.log(err)
            })


    }
    // Assignments-Get
    const [AssignData, setAssignData] = useState([]);
    const getAllAssignment = () => {
        axios.get(`${url}assignment-question/get-class-assignments`, {
            params: {
                _id: ClassIdData
            }
        })
            .then((response) => {
                const allData = response.data;
                console.log(allData);
                setAssignData(response.data);
                console.log('assignment data');
                console.log(AssignData);
                // setData(allData);
                // setTitle(allData.name);
                // setClassId(allData.classId);
                // setDescription(allData.description);

                // setEnrolledStud(allData.enrolledStudents.length);
                setLoading(true)

            })
            .catch(error => console.error(`Error:${error}`));
    }
    // Sol Assignment 
    // Sol 
    // Alert 
    const [AssignDataSol, setAssignDataSol] = useState([]);

    const solAssignData = (id) => {
        console.log(id)
        axios.get(`${url}assignment-solution/get-assignment-sols`, {
            params: {
                assignment: id
            }
        })
            .then((response) => {
                const allData = response.data;
                console.log(allData);
                // setAssignData(response.data);
                setAssignDataSol(response.data)
                console.log(AssignDataSol)
                console.log('assignment data Sol');
                setShowSol(true);

                setLoading(true)

            })
            .catch(error => console.error(`Error:${error}`));
    }
      // Sol Quiz 
    // Sol 
    // Alert 
    const [QuizDataSol, setQuizDataSol] = useState([]);

    const solQuizData = (id) => {
        console.log(id)
        axios.get(`${url}quiz-solution/get-quiz-sols`, {
            params: {
                quiz: id
            }
        })
            .then((response) => {
                const allData = response.data;
                console.log(allData);
                // setAssignData(response.data);
                setQuizDataSol(response.data)
                console.log(AssignDataSol)
                console.log('assignment data Sol');
                setShowSolQuiz(true);

                setLoading(true)

            })
            .catch(error => console.error(`Error:${error}`));
    }
    // Delete Assignment 
    // Delete 
    // Alert 
    const deleteData = (id) => {
        console.log('deleting phone no')
        console.log(id);
        axios.delete(`${url}assignment-question/delete`, {
            data: {
                _id: id
            }
        }, { headers })
            .then(res => {
                console.log(res);
                console.log(res.data);
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: {
                        backgroundColor: '#4CAF50', /* Green */
                        border: 'none',
                        color: 'white',
                        padding: '15px 32px',
                        textAlign: 'center',
                        textDecoration: 'none',
                        display: 'inline-block',
                        fontSize: '16px'
                    }
                })

                swalWithBootstrapButtons.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'No, cancel!',
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        swalWithBootstrapButtons.fire(
                            'Deleted!',
                            'Assignment has been deleted.',
                            'success'
                        )
                        //    refresh componenet 
                        getAllAssignment();

                        // window.location.reload(false);
                    } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        swalWithBootstrapButtons.fire(
                            'Cancelled',
                            'Assignment is safe :)',
                            'error'
                        )
                    }
                })
                // setOpen1(true);
            }).catch(err => {
                console.log(err)
            })
    }
    // Delete Quiz 
    // Delete 
    // Alert 
    const deleteDataQuiz = (id) => {
        console.log('deleting phone no')
        console.log(id);
        axios.delete(`${url}quiz-question/delete`, {
            data: {
                _id: id
            }
        }, { headers })
            .then(res => {
                console.log(res);
                console.log(res.data);
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: {
                        backgroundColor: '#4CAF50', /* Green */
                        border: 'none',
                        color: 'white',
                        padding: '15px 32px',
                        textAlign: 'center',
                        textDecoration: 'none',
                        display: 'inline-block',
                        fontSize: '16px'
                    }
                })

                swalWithBootstrapButtons.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'No, cancel!',
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        swalWithBootstrapButtons.fire(
                            'Deleted!',
                            'Quiz has been deleted.',
                            'success'
                        )
                        //    refresh componenet 
                        getAllQuiz();

                        // window.location.reload(false);
                    } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        swalWithBootstrapButtons.fire(
                            'Cancelled',
                            'Quiz is safe :)',
                            'error'
                        )
                    }
                })
                // setOpen1(true);
            }).catch(err => {
                console.log(err)
            })
    }
    let navigate = useNavigate();

    // View Update Assignment 
    const [viewAssignName, setViewAssignName] = useState();
    const [viewAssignDue, setViewAssignDue] = useState();
    const [viewAssignFilePath, setViewAssignFilePath] = useState();
    const [viewAssignNumbers, setViewAssignNumbers] = useState();
    const [viewAssignId, setViewAssignId] = useState();

    const viewAssignment = async (idData) => {
        console.log(idData)
        setShowNews(false);
        setshowViewAssignment(true);
        getAssignment(idData);

    }
    // View Assignment Pdf 
    const viewPdf = () => {
        let timerInterval
        Swal.fire({
            title: 'Opening Pdf',
            html: 'Please wait !',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        })
        navigate('/pdf'
            ,
            {
                state: {
                    link: viewAssignFilePath
                }
            }
        );
    }
    // Dialog 
    const [openAssignSol, setOpenAssignSol] = React.useState(false);
    const [openQuizSol, setOpenQuizSol] = React.useState(false);


    const handleClickOpenAssignSol = () => {
        setOpenAssignSol(true);
    };
    const handleCloseAssignSol = () => {
        // POst Request 
        axios.put(`${url}assignment-solution/grade`, {
            marks: studDataMarks,
            _id: studDataAssignSolId,
        }, { headers }).then(response => {
            console.log(response)
            setstudDataMarks(response.data.marks)
            setOpenAssignSol(false);
            // Clear Dta 


            let timerInterval
            Swal.fire({
                title: 'Saved Successfully',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }

            })

        })
            .catch(err => {
                console.log(err)
            })
        setOpenAssignSol(false);
    };
    const handleCloseQuizSol = () => {
        // POst Request 
        axios.put(`${url}quiz-solution/grade`, {
            marks: studDataMarksQuiz,
            _id: studDataQuizSolId,
        }, { headers }).then(response => {
            console.log(response)
            setstudDataMarksQuiz(response.data.marks)
            setOpenQuizSol(false);
            // Clear Dta 


            let timerInterval
            Swal.fire({
                title: 'Saved Successfully',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }

            })

        })
            .catch(err => {
                console.log(err)
            })
        setOpenAssignSol(false);
    };
    const [studData, setstudData] = useState([]);
    const [studDataPath, setstudDataPath] = useState([]);
    const [studDataSubDate, setstudDataSubDate] = useState([]);
    const [studDataMarks, setstudDataMarks] = useState([]);
    const [studDataAssignName, setstudDataAssignName] = useState([]);
    const [studDataAssignSolId, setstudDataAssignSolId] = useState([]);




    // >getAssignmentSol(row.path,row.submissionTime,row.marks,row.marks,row.submittedBy)
    const getAssignmentSol = async (solId, assignment, path, submissionTime, marks, submittedBy) => {
        setstudDataPath(path);
        setstudDataSubDate(submissionTime);
        setstudDataMarks(marks)
        setstudDataAssignSolId(solId)
        // Get Assignment 
        await axios.get(`${url}assignment-question/get`, {
            params: {
                _id: assignment
            }
        }, { headers }).then(response => {
            console.log('response')
            console.log(response.data);
            setstudDataAssignName(response.data.name)

        })
            .catch(err => {
                console.log(err)
            })
        // Get User 

        await axios.get(`${url}user/get`, {
            params: {
                _id: submittedBy
            }
        })
            .then((response) => {
                console.log(response);
                setstudData(response.data.name)
                setOpenAssignSol(true);




            }).catch(error => console.error(`Error:${error}`));
    }
    // Quiz 
    const [studDataQuiz, setstudDataQuiz] = useState([]);
    const [studDataPathQuiz, setstudDataPathQuiz] = useState([]);
    const [studDataSubDateQuiz, setstudDataSubDateQuiz] = useState([]);
    const [studDataMarksQuiz, setstudDataMarksQuiz] = useState([]);
    const [studDataQuizName, setstudDataQuizName] = useState([]);
    const [studDataQuizSolId, setstudDataQuizSolId] = useState([]);




    // >getAssignmentSol(row.path,row.submissionTime,row.marks,row.marks,row.submittedBy)
    const getQuizSol = async (solId, assignment, path, submissionTime, marks, submittedBy) => {
        setstudDataPathQuiz(path);
        setstudDataSubDateQuiz(submissionTime);
        setstudDataMarksQuiz(marks)
        setstudDataQuizSolId(solId)
        // Get Assignment 
        await axios.get(`${url}quiz-question/get`, {
            params: {
                _id: assignment
            }
        }, { headers }).then(response => {
            console.log('response')
            console.log(response.data);
            setstudDataQuizName(response.data.name)

        })
            .catch(err => {
                console.log(err)
            })
        // Get User 

        await axios.get(`${url}user/get`, {
            params: {
                _id: submittedBy
            }
        })
            .then((response) => {
                console.log(response);
                setstudDataQuiz(response.data.name)
                setOpenQuizSol(true);




            }).catch(error => console.error(`Error:${error}`));
    }
    //  Update Assignment 
    const assignUpdate = async () => {
        await axios.put(`${url}assignment-question/update`, {
            _id: viewAssignId,
            filePath: viewAssignFilePath,
            dueDate: viewAssignDue,
            numbers: viewAssignNumbers,
            name: viewAssignName,
        }, { headers }).then(response => {
            console.log(response)
            setshowViewAssignment(false);


            let timerInterval
            Swal.fire({
                title: 'Updated Assignment Successfully',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
                getAllAssignment();
            })
                .catch(err => {
                    console.log(err)
                })
        })
    }
    // Get Assignment 
    const getAssignment = async (idData) => {
        await axios.get(`${url}assignment-question/get`, {
            params: {
                _id: idData
            }
        }, { headers }).then(response => {
            console.log('response')
            console.log(response.data);
            setViewAssignId(response.data._id)
            setViewAssignDue(response.data.dueDate)
            setViewAssignFilePath(response.data.filePath)
            setViewAssignNumbers(response.data.numbers)
            setViewAssignName(response.data.name)
        })
            .catch(err => {
                console.log(err)
            })
    }
    // Get Quiz
    const [viewQuizName, setViewQuizName] = useState();
    const [viewQuizDue, setViewQuizDue] = useState();
    const [viewQuizFilePath, setViewQuizFilePath] = useState();
    const [viewQuizNumbers, setViewQuizNumbers] = useState();
    const [viewQuizId, setViewQuizId] = useState();

    const viewQuiz = async (idData) => {
        console.log(idData)
        setShowNews(false);
        setshowViewQuiz(true);
        getQuiz(idData);

    }
    // Get Quiz 
    const getQuiz = async (idData) => {
        await axios.get(`${url}quiz-question/get`, {
            params: {
                _id: idData
            }
        }, { headers }).then(response => {
            console.log('response')
            console.log(response.data);
            setViewQuizId(response.data._id)
            setViewQuizDue(response.data.dueDate)
            setViewQuizFilePath(response.data.filePath)
            setViewQuizNumbers(response.data.numbers)
            setViewQuizName(response.data.name)
        })
            .catch(err => {
                console.log(err)
            })
    }
    //  Update Quiz 
    const QuizUpdate = async () => {
        await axios.put(`${url}quiz-question/update`, {
            _id: viewQuizId,
            filePath: viewQuizFilePath,
            dueDate: viewQuizDue,
            numbers: viewQuizNumbers,
            name: viewQuizName,
        }, { headers }).then(response => {
            console.log(response)
            setshowViewQuiz(false);


            let timerInterval
            Swal.fire({
                title: 'Updated Quiz Successfully',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
                getAllQuiz();
            })
                .catch(err => {
                    console.log(err)
                })
        })
    }
    // Quiz-Get
    const [QuizData, setQuizData] = useState([]);
    const getAllQuiz = () => {
        axios.get(`${url}quiz-question/get-class-quizzes`, {
            params: {
                _id: ClassIdData
            }
        })
            .then((response) => {
                const allData = response.data;
                console.log(allData);
                setQuizData(response.data);
                console.log('assignment data');
                console.log(QuizData);
                // setData(allData);
                // setTitle(allData.name);
                // setClassId(allData.classId);
                // setDescription(allData.description);

                // setEnrolledStud(allData.enrolledStudents.length);
                setLoading(true)

            })
            .catch(error => console.error(`Error:${error}`));
    }

    // Stream-Get
    const [StreamData, setStreamData] = useState([]);
    const getAllStream = () => {
        axios.get(`${url}stream/get-class-streams`, {
            params: {
                _id: ClassIdData
            }
        })
            .then((response) => {
                const allData = response.data;
                console.log(allData);
                setStreamData(response.data);
                console.log('assignment data');
                console.log(StreamData);
                setLoading(true)

            })
            .catch(error => console.error(`Error:${error}`));
    }
    // Video Get 
    // Stream-Get
    const [VideoData, setVideoData] = useState([]);
    const getAllVideo = () => {
        axios.get(`${url}class-video/get-class-videos`, {
            params: {
                _id: ClassIdData
            }
        })
            .then((response) => {
                // const allData = response.data;
                // console.log(allData);
                setVideoData(response.data);
                console.log('Video data');
                console.log(VideoData);
                // setData(allData);
                // setTitle(allData.name);
                // setClassId(allData.classId);
                // setDescription(allData.description);

                // setEnrolledStud(allData.enrolledStudents.length);
                setLoading(true)

            })
            .catch(error => console.error(`Error:${error}`));
    }
    //  Get Enrolled Students 
    const [enrolledStudData, setEnrolledStudData] = useState([]);
    const getAllEnrollData = () => {
        axios.get(`${url}class/get-enrolled-students`, {
            params: {
                _id: ClassIdData
            }
        })
            .then((response) => {
                const allData = response.data;
                console.log(allData);
                setEnrolledStudData(response.data);
                console.log('Enroll student Data');
                console.log(enrolledStudData);
                setLoading(true)

            })
            .catch(error => console.error(`Error:${error}`));
    }
    // File Upload 

    const [selectedFile1, setSelectedFile1] = useState('')
    const onFileChange = (e) => {
        console.log(e)
        const formData = new FormData();
        formData.append(
            "file",
            e,
        );

        // Details of the uploaded file 
        //   console.log(selectedFile1); 

        // Request made to the backend api 
        // Send formData object 
        axios.post(`${url}upload-file`, formData,
            { headers }).then(response => {
                console.log(response.data.file)
                setSelectedFile1(response.data.file)

            })

    }
    // Assignment update file 
    const onFileChangeUpdate = (e) => {
        console.log(e)
        const formData = new FormData();
        formData.append(
            "file",
            e,
        );

        // Details of the uploaded file 
        //   console.log(selectedFile1); 

        // Request made to the backend api 
        // Send formData object 
        axios.post(`${url}upload-file`, formData,
            { headers }).then(response => {
                console.log(response.data.file)
                setViewAssignFilePath(response.data.file)

            })

    }
    // Quiz update file 
    const onFileChangeQuizUpdate = (e) => {
        console.log(e)
        const formData = new FormData();
        formData.append(
            "file",
            e,
        );

        // Details of the uploaded file 
        //   console.log(selectedFile1); 

        // Request made to the backend api 
        // Send formData object 
        axios.post(`${url}upload-file`, formData,
            { headers }).then(response => {
                console.log(response.data.file)
                setViewQuizFilePath(response.data.file)

            })

    }
    const [selectedFileQuiz, setSelectedFileQuiz] = useState('')
    const onFileChangeQuiz = (e) => {
        console.log(e)
        const formData = new FormData();
        formData.append(
            "file",
            e,
        );

        // Details of the uploaded file 
        //   console.log(selectedFile1); 

        // Request made to the backend api 
        // Send formData object 
        axios.post(`${url}upload-file`, formData,
            { headers }).then(response => {
                console.log(response.data.file)
                setSelectedFileQuiz(response.data.file)

            })

    }

    //    Video 
    const [selectedFileVideoPath, setSelectedFileVideoPath] = useState('')
    const [selectedFileVideoduration, setSelectedFileVideoDuration] = useState('')

    const onFileChangeVideo = (e) => {
        console.log(e)
        const formData = new FormData();
        formData.append(
            "video",
            e,
        );

        // Details of the uploaded file 
        //   console.log(selectedFile1); 

        // Request made to the backend api 
        // Send formData object 
        axios.post(`${url}upload-video`, formData,
            { headers }).then(response => {
                console.log(response.data)
                setSelectedFileVideoPath(response.data.path)
                setSelectedFileVideoDuration(response.data.duration)

            })

    }
    const VideoUpload = () => {

        axios.post(`${url}class-video/create`, {
            class: ClassIdData,
            path: selectedFileVideoPath,
            duration: selectedFileVideoduration,

        }, { headers }).then(response => {
            console.log(response.data)
            // setData([...data, response.data]);

            let timerInterval
            Swal.fire({
                title: 'Video Lecture Uploaded Successfully',
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                    const b = Swal.getHtmlContainer().querySelector('b')
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft()
                    }, 100)
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log('I was closed by the timer')
                }
            })
        })
            .catch(err => {
                console.log(err)
            })

    }

    return (
        <div>
            <Grid container spacing={2} style={GridBackground}>

                <Grid item xs={12} md={3}>
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            padding: '10px',
                            backgroundColor: '#232323',
                            color: '#fff',

                        }}
                    //   #f5f5f5
                    >
                        <Grid container spacing={2} >

                            <Grid item xs={12} md={12}>
                                <img src={welcome} style={welcomeStyle} />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Typography variant='h5'>
                                    Course Title:{title}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <span style={textStyle}>
                                    Total Enrolled Students:{enrolledStud}
                                </span>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <span style={textStyle}>
                                    Course Code:{classId}
                                </span>
                            </Grid>
                            {/* <Grid item xs={12} md={12}>
                                <BookmarkBorderIcon />
                                <ArchiveIcon />
                            </Grid> */}
                            <hr style={hrStyle}></hr>
                            <Grid item xs={12} md={12}>
                                <Typography variant='h6'>Description</Typography>

                            </Grid>
                            <Grid item xs={12} md={12}>
                                <span style={textStyle}>{description} </span>

                            </Grid>
                            <hr style={hrStyle}></hr>
                            <Grid item xs={12} md={12}>
                                <span style={textStyle}>Tutor </span>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Grid container spacing={2}>

                                    <Grid item xs={10} md={10}>
                                        <Typography variant='h6'>{ownerId}</Typography>
                                    </Grid>
                                    <Grid item xs={2} md={2}>
                                        < SettingsIcon />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Box>
                </Grid>




                {show ?
                    <>
                        <Grid item xs={12} md={6} >
                            <Grid container spacing={2}>

                                <Grid item xs={12} md={12}>
                                    <Card sx={{ minWidth: 275 }} className={classes.cardCenter}>
                                        <CardContent>
                                            <Grid container spacing={2}>
                                                <Grid item xs={8} md={8}>
                                                    <Typography variant='h6' className={classes.cardCenter}>
                                                        {title}</Typography>



                                                </Grid>
                                                <Grid item xs={4} md={4}>
                                                    <img src={welcome} className={classes.imgCourse} />


                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <TabContext value={value}>
                                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                                                <Tab label="Playlist" value="1" />
                                                                <Tab label="Assignments" value="5" />
                                                                <Tab label="Quizes" value="6" />
                                                                <Tab label="Classwork" value="2" />
                                                                <Tab label="People" value="3" />
                                                                <Tab label="Settings" value="4" />
                                                            </TabList>
                                                        </Box>
                                                        {/* Stream */}
                                                        <TabPanel value="1" style={GridBackground}>
                                                            {/* Assignment  api*/}
                                                            {/* {loading && VideoData.map((row) => ( */}
                                                            <Card sx={{ minWidth: 275 }} className={classes.margincard}>
                                                                <CardContent>
                                                                    <Grid container spacing={2}>
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                {/* <Grid item xs={1} md={1}>
                                                                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> 
                                                                            </Grid> */}
                                                                                <Grid item xs={12} md={12}>
                                                                                    <Typography variant='h6'>Playlist</Typography>
                                                                                </Grid>

                                                                                <Grid item xs={10} md={10}>
                                                                                    {VideoData.map((datavid, idx) => (
                                                                                        <>
                                                                                            <video width="400" controls>
                                                                                                <source src={`${url}${datavid.path}`} type="video/mp4" />
                                                                                                <source src={`${url}${datavid.path}`} type="video/ogg" />
                                                                                                Your browser does not support HTML video.
                                                                                            </video>
                                                                                            <br />
                                                                                        </>
                                                                                    ))}
                                                                                </Grid>

                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>

                                                                </CardContent>
                                                            </Card>
                                                            {/* // ))} */}

                                                        </TabPanel>
                                                        {/* Assignment  */}
                                                        <TabPanel value="5" style={GridBackground}>
                                                            {/* Assignment  api*/}

                                                            {/* Assignment  api*/}
                                                            {loading && AssignData.map((row) => (
                                                                <Card sx={{ minWidth: 275 }} className={classes.margincard}>
                                                                    <CardContent>
                                                                        <Grid container spacing={2}>
                                                                            <Grid item xs={12} md={12}>
                                                                                <Grid container spacing={2}>
                                                                                    {/* <Grid item xs={1} md={1}>
                                                                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> 
                                                                            </Grid> */}
                                                                                    <Grid item xs={10} md={10}>
                                                                                        <Typography variant='h6'>Assignments</Typography>
                                                                                    </Grid>
                                                                                    <Grid item xs={2} md={2}>
                                                                                        <Typography variant='h6' className={classes.due}>Marks:{row.numbers}</Typography>
                                                                                    </Grid>

                                                                                    <Grid item xs={10} md={10}>
                                                                                        {row.name}
                                                                                    </Grid>

                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>

                                                                    </CardContent>
                                                                    <CardActions>
                                                                        <Grid item xs={2} md={2}>
                                                                            <Button size="small"
                                                                                onClick={() => {
                                                                                    viewAssignment(row._id)
                                                                                }}
                                                                            >View</Button>
                                                                        </Grid>
                                                                        <Grid item xs={2} md={2}>
                                                                            <Button size="small"
                                                                                onClick={() => {
                                                                                    console.log(row._id)
                                                                                    deleteData(row._id)
                                                                                }}
                                                                            >Delete</Button>
                                                                        </Grid>
                                                                        <Grid item xs={2} md={2}>
                                                                            <Button size="small"
                                                                                onClick={() => {
                                                                                    console.log(row._id)
                                                                                    solAssignData(row._id)
                                                                                }}
                                                                            >Solutions</Button>
                                                                        </Grid>
                                                                        <Grid item xs={6} md={6}>
                                                                            Due Date:{row.dueDate}
                                                                        </Grid>


                                                                    </CardActions>
                                                                </Card>
                                                            ))}


                                                        </TabPanel>
                                                        {/* Quiz  */}
                                                        <TabPanel value="6" style={GridBackground}>
                                                            {/* Quiz  api*/}

                                                            {loading && QuizData.map((row) => (
                                                                <Card sx={{ minWidth: 275 }} className={classes.margincard}>
                                                                    <CardContent>
                                                                        <Grid container spacing={2}>
                                                                            <Grid item xs={12} md={12}>
                                                                                <Grid container spacing={2}>
                                                                                    {/* <Grid item xs={1} md={1}>
                                                                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> 
                                                                            </Grid> */}
                                                                                    <Grid item xs={10} md={10}>
                                                                                        <Typography variant='h6'>Quiz</Typography>
                                                                                    </Grid>
                                                                                    <Grid item xs={2} md={2}>
                                                                                        <Typography variant='h6' className={classes.due}>Marks:{row.numbers}</Typography>
                                                                                    </Grid>

                                                                                    <Grid item xs={10} md={10}>
                                                                                        {row.name}
                                                                                    </Grid>

                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>

                                                                    </CardContent>
                                                                    <CardActions>
                                                                        <Grid item xs={2} md={2}>
                                                                            <Button size="small"
                                                                                onClick={() => {
                                                                                    viewQuiz(row._id)
                                                                                }}
                                                                            >View</Button>
                                                                        </Grid>
                                                                        <Grid item xs={2} md={2}>
                                                                            <Button size="small"
                                                                                onClick={() => {
                                                                                    console.log(row._id)
                                                                                    deleteDataQuiz(row._id)
                                                                                }}
                                                                            >Delete</Button>
                                                                        </Grid>
                                                                        <Grid item xs={2} md={2}>
                                                                            <Button size="small"
                                                                                onClick={() => {
                                                                                    console.log(row._id)
                                                                                    solQuizData(row._id)
                                                                                }}
                                                                            >Solutions</Button>
                                                                        </Grid>
                                                                        <Grid item xs={6} md={6}>
                                                                            Due Date:{row.dueDate}
                                                                        </Grid>


                                                                    </CardActions>
                                                                </Card>
                                                            ))}

                                                        </TabPanel>
                                                        {/* Classwork  */}

                                                        <TabPanel value="2" style={GridBackground}>
                                                            <Card sx={{ minWidth: 275 }} className={classes.margincard}>
                                                                <CardContent>
                                                                    <Grid container spacing={2}>
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={12}>
                                                                                    <Typography variant='h5'>
                                                                                        Upload Classwork
                                                                                    </Typography>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={12}>
                                                                                    <Grid container spacing={2}>
                                                                                        <Grid item xs={4} md={4}>
                                                                                            <Button variant="contained" className={classes.btnB} onClick={() => {
                                                                                                setShowUpload(true);
                                                                                                setshowUploadAssign(false);
                                                                                                setshowUploadQuiz(false);
                                                                                                setshowUploadLink(false);
                                                                                                setshowUploadUpdate(false);
                                                                                                setShowNews(false)
                                                                                                setShowSol(false)
                                                                                                setOpenAssignSol(false);

                                                                                            }}>Stream</Button>
                                                                                        </Grid>
                                                                                        <Grid item xs={4} md={4}>
                                                                                            <Button variant="contained" className={classes.btnB} onClick={() => {
                                                                                                setShowUpload(false);
                                                                                                setshowUploadAssign(true);
                                                                                                setshowUploadQuiz(false);
                                                                                                setshowUploadLink(false);
                                                                                                setshowUploadUpdate(false);
                                                                                                setShowNews(false)
                                                                                                setShowSol(false)
                                                                                                setOpenAssignSol(false);

                                                                                            }}>Assignment</Button>
                                                                                        </Grid>
                                                                                        <Grid item xs={4} md={4}>
                                                                                            <Button variant="contained" className={classes.btnB} onClick={() => {
                                                                                                setShowUpload(false);
                                                                                                setshowUploadAssign(false);
                                                                                                setshowUploadQuiz(true);
                                                                                                setshowUploadLink(false);
                                                                                                setshowUploadUpdate(false);
                                                                                                setShowNews(false)
                                                                                                setShowSol(false)
                                                                                                setOpenAssignSol(false);

                                                                                            }}>Quiz</Button>

                                                                                        </Grid>
                                                                                        <Grid item xs={4} md={4}>
                                                                                            <Button variant="contained" className={classes.btnB} onClick={() => {
                                                                                                setShowUpload(false);
                                                                                                setshowUploadAssign(false);
                                                                                                setshowUploadQuiz(false);
                                                                                                setshowUploadLink(true);
                                                                                                setshowUploadUpdate(false);
                                                                                                setShowNews(false)
                                                                                                setShowSol(false)
                                                                                                setOpenAssignSol(false);

                                                                                            }}>Video</Button>
                                                                                        </Grid>

                                                                                    </Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </CardContent>
                                                            </Card>

                                                        </TabPanel>
                                                        {/* Enrolled students  */}
                                                        <TabPanel value="3">
                                                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                                {loading && enrolledStudData.map((row) => (
                                                                    <>
                                                                        <ListItem>
                                                                            <ListItemAvatar>
                                                                                <Avatar>
                                                                                    S
                                                                                </Avatar>
                                                                            </ListItemAvatar>
                                                                            <ListItemText primary={row.name} secondary={row.email} />
                                                                        </ListItem>

                                                                        <Divider variant="inset" component="li" />
                                                                    </>
                                                                ))}
                                                            </List>

                                                        </TabPanel>
                                                        <TabPanel value="4">
                                                            <Card sx={{ minWidth: 275 }} className={classes.margincard}>
                                                                <CardContent>
                                                                    <Grid container spacing={2}>
                                                                        <Grid item xs={12} md={12}>
                                                                            <Grid container spacing={2}>
                                                                                <Grid item xs={12} md={12}>
                                                                                    <Typography variant='h5'>
                                                                                        Update Class
                                                                                    </Typography>
                                                                                </Grid>
                                                                                <Grid item xs={12} md={12}>
                                                                                    <Grid container spacing={2}>
                                                                                        <Grid item xs={12} md={12}>
                                                                                            <TextField className={classes.btn} id="filled-basic" label="Enter Title" variant="filled"
                                                                                                value={classTitleUpdate} onChange={
                                                                                                    (e) => setclassTitleUpdate(e.target.value)
                                                                                                } />
                                                                                        </Grid>
                                                                                        <Grid item xs={12} md={12}>

                                                                                            <TextareaAutosize
                                                                                                className={classes.btn}
                                                                                                aria-label="minimum height"
                                                                                                minRows={3}
                                                                                                placeholder="Enter Description"
                                                                                                value={classDescriptionUpdate}
                                                                                                onChange={
                                                                                                    (e) => setclassDescriptionUpdate(e.target.value)
                                                                                                }

                                                                                            />
                                                                                        </Grid>
                                                                                        <Grid item xs={12} md={12}>
                                                                                            <Button variant="contained" className={classes.btn} color='primary' component="span"
                                                                                                onClick={classUpdate} >
                                                                                                Submit
                                                                                            </Button>
                                                                                        </Grid>
                                                                                    </Grid>





                                                                                </Grid>

                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>

                                                                </CardContent>

                                                            </Card>
                                                        </TabPanel>
                                                    </TabContext>

                                                </Grid>
                                            </Grid>

                                        </CardContent>

                                    </Card></Grid>
                            </Grid>
                        </Grid>

                    </>
                    :

                    <>
                        {/* // View  */}
                        <Grid item xs={12} md={7} >
                            <Grid container spacing={2}>


                                <Grid item xs={12} md={12}>
                                    <Card sx={{ minWidth: 275 }} className={classes.cardCenter}>
                                        <CardContent>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={12}>
                                                    <Button onClick={() => {
                                                        backtocourse()
                                                    }}>Back</Button>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Typography variant='h6' className={classes.cardCenter}>
                                                        Title</Typography>



                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Typography variant='h6' className={classes.cardCenter}>
                                                        Description</Typography>



                                                </Grid>


                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={2} ></Grid>
                    </>
                }
                <Grid item xs={12} md={3} >

                    {showUpload ?
                        <>
                            {/* <Grid container spacing={2}> */}


                            {/* <Grid item xs={12} md={12}> */}
                            <Card sx={{ minWidth: 275 }} className={classes.cardCenter1}>
                                <CardContent>
                                    <Grid container >
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='h6' > Upload Material</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <TextField className={classes.btn} id="filled-basic" label="Enter Title" variant="filled"
                                                value={streamTitle} onChange={
                                                    (e) => setstreamTitle(e.target.value)
                                                } />
                                        </Grid>
                                        <Grid item xs={12} md={12}>

                                            <TextareaAutosize
                                                className={classes.btn}
                                                aria-label="minimum height"
                                                minRows={3}
                                                placeholder="Enter Details"
                                                value={streamDetails}
                                                onChange={
                                                    (e) => setstreamDetails(e.target.value)
                                                }

                                            />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Button variant="contained" className={classes.btn} color='primary' component="span"
                                                onClick={streamUpload} >
                                                Submit
                                            </Button>
                                        </Grid>




                                    </Grid>
                                </CardContent>
                            </Card>
                            {/* </Grid> */}
                            {/* </Grid> */}

                        </>

                        :
                        null}

                    {showNews ?
                        <>
                            {/* <Grid container spacing={2}> */}


                            {/* <Grid item xs={12} md={12}> */}
                            <Card sx={{ minWidth: 275 }} className={classes.cardCenter1}>
                                <CardContent>
                                    <Grid container >
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='h6' > Latest Updates</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                                {loading && StreamData.map((row) => (
                                                    <>
                                                        <ListItem>
                                                            <ListItemText primary={row.title} secondary={row.details} />

                                                        </ListItem>

                                                        <Divider variant="inset" component="li" />
                                                    </>
                                                ))}
                                            </List>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                            {/* </Grid> */}
                            {/* </Grid> */}

                        </>

                        :
                        null}


                    {showUploadAssign ?
                        <>
                            {/* <Grid container spacing={2}> */}


                            {/* <Grid item xs={12} md={12}> */}
                            <Card sx={{ minWidth: 275 }} className={classes.cardCenter1}>
                                <CardContent>
                                    <Grid container >
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='h6' > Upload Assignment</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            <TextField className={classes.btn} id="filled-basic" label="Enter Title" variant="filled"
                                                value={AssignTitle} onChange={
                                                    (e) => setAssignTitle(e.target.value)
                                                } />
                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            Upload File
                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>


                                            <input type="file" onChange={(e) => onFileChange(e.target.files[0])} />

                                            {/* {this.fileData()}  */}

                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='h6' style={{ color: 'blue', fontSize: '11px' }} > Please Select pdf file </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            Select Due Date
                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DateTimePicker
                                                    renderInput={(props) => <TextField {...props} />}
                                                    label="Due Date"
                                                    value={dueDate}
                                                    onChange={(newValue) => {
                                                        setDueDate(newValue);
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        </Grid>


                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            <div className={classes.TextStyle}>
                                                Enter Total Marks:
                                            </div>

                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            <TextField className={classes.btn} id="filled-basic" variant="filled"
                                                value={number} onChange={
                                                    (e) => setNumber(e.target.value)
                                                } />
                                        </Grid>
                                     
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            <Button variant="contained" className={classes.btn} color='primary' onClick={assignUpload} component="span" >
                                                Upload
                                            </Button>
                                        </Grid>




                                    </Grid>
                                </CardContent>
                            </Card>

                        </>

                        :
                        null}
                    {/* Comemnt  */}
                    {showSol ?
                        <>
                            <Card sx={{ minWidth: 275 }} className={classes.cardCenter1}>
                                <CardContent>
                                    {/* {loading && viewAssign.map((row) => ( */}
                                    <Grid container >
                                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                            {loading && AssignDataSol.map((row) => (
                                                <>

                                                    <ListItem disablePadding>
                                                        <ListItemButton onClick={() => getAssignmentSol(row._id, row.assignment, row.path, row.submissionTime, row.marks, row.submittedBy)}>
                                                            <ListItemText primary={row.path} />
                                                        </ListItemButton>
                                                    </ListItem>
                                                    <Divider variant="inset" component="li" />
                                                </>
                                            ))}


                                        </List>
                                        {/* Dialog  */}
                                        <BootstrapDialog
                                            onClose={() => setOpenAssignSol(false)}
                                            aria-labelledby="customized-dialog-title"
                                            open={openAssignSol}
                                        >
                                            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseAssignSol}>
                                                Title:{studDataAssignName}
                                            </BootstrapDialogTitle>
                                            <DialogContent dividers>
                                                <Button className={classes.btnAssign} component="span"
                                                    // studDataPath
                                                    onClick={viewPdf} >
                                                    {/* <img src=<pdfImg/> */}
                                                    <img className={classes.ImgStyle} src={pdfImg} />
                                                </Button>

                                                <Typography gutterBottom>
                                                    Submitted By: {studData}
                                                </Typography>
                                                <Typography gutterBottom>
                                                    Submission Date/Time: {studDataSubDate}
                                                </Typography>
                                                <TextField id="outlined-basic" label="Marks" value={studDataMarks} onChange={
                                                    (e) => setstudDataMarks(e.target.value)
                                                } variant="outlined" />
                                            </DialogContent>
                                            <DialogActions>
                                                <Button autoFocus onClick={handleCloseAssignSol}>
                                                    Save changes
                                                </Button>
                                            </DialogActions>
                                        </BootstrapDialog>



                                    </Grid>

                                </CardContent>
                            </Card>

                        </>

                        :
                        null}
                         {showSolQuiz ?
                        <>
                            <Card sx={{ minWidth: 275 }} className={classes.cardCenter1}>
                                <CardContent>
                                    {/* {loading && viewAssign.map((row) => ( */}
                                    <Grid container >
                                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                            {loading && QuizDataSol.map((row) => (
                                                <>

                                                    <ListItem disablePadding>
                                                        <ListItemButton onClick={() => getQuizSol(row._id, row.assignment, row.path, row.submissionTime, row.marks, row.submittedBy)}>
                                                            <ListItemText primary={row.path} />
                                                        </ListItemButton>
                                                    </ListItem>
                                                    <Divider variant="inset" component="li" />
                                                </>
                                            ))}


                                        </List>
                                        {/* Dialog  */}
                                        <BootstrapDialog
                                            onClose={() => setOpenQuizSol(false)}
                                            aria-labelledby="customized-dialog-title"
                                            open={openQuizSol}
                                        >
                                            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseQuizSol}>
                                                Title:{studDataQuizName}
                                            </BootstrapDialogTitle>
                                            <DialogContent dividers>
                                                <Button className={classes.btnAssign} component="span"
                                                    // studDataPath
                                                    onClick={viewPdf} >
                                                    {/* <img src=<pdfImg/> */}
                                                    <img className={classes.ImgStyle} src={pdfImg} />
                                                </Button>

                                                <Typography gutterBottom>
                                                    Submitted By: {studDataQuiz}
                                                </Typography>
                                                <Typography gutterBottom>
                                                    Submission Date/Time: {studDataSubDateQuiz}
                                                </Typography>
                                                <TextField id="outlined-basic" label="Marks" value={studDataMarksQuiz} onChange={
                                                    (e) => setstudDataMarksQuiz(e.target.value)
                                                } variant="outlined" />
                                            </DialogContent>
                                            <DialogActions>
                                                <Button autoFocus onClick={handleCloseQuizSol}>
                                                    Save changes
                                                </Button>
                                            </DialogActions>
                                        </BootstrapDialog>



                                    </Grid>

                                </CardContent>
                            </Card>

                        </>

                        :
                        null}

                    {showViewAssignment ?
                        <>
                            {/* <Grid container spacing={2}> */}


                            {/* <Grid item xs={12} md={12}> */}
                            <Card sx={{ minWidth: 275 }} className={classes.cardCenter1}>
                                <CardContent>
                                    {/* {loading && viewAssign.map((row) => ( */}
                                    <Grid container >
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='h6' > Assignment</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            <div className={classes.TextStyle}>
                                                Enter Title:
                                            </div>

                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            <TextField className={classes.btn} id="filled-basic" variant="filled"
                                                value={viewAssignName} onChange={
                                                    (e) => setViewAssignName(e.target.value)
                                                } />
                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            Assignment File
                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>

                                            <Button variant="contained" className={classes.btn} color='primary' component="span"
                                                onClick={viewPdf} >
                                                Open Pdf
                                            </Button>
                                            <input type="file" onChange={(e) => onFileChangeUpdate(e.target.files[0])} />

                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            Select Due Date
                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DateTimePicker
                                                    renderInput={(props) => <TextField {...props} />}
                                                    label="Due Date"
                                                    value={viewAssignDue}
                                                    onChange={(newValue) => {
                                                        setViewAssignDue(newValue);
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        </Grid>


                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            <div className={classes.TextStyle}>
                                                Enter Total Marks:
                                            </div>

                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>

                                            <TextField className={classes.btn} id="filled-basic" variant="filled"
                                                value={viewAssignNumbers} onChange={
                                                    (e) => setViewAssignNumbers(e.target.value)
                                                } />
                                        </Grid>

                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            <Button variant="contained" className={classes.btn} color='primary' onClick={assignUpdate} component="span" >
                                                Update
                                            </Button>
                                        </Grid>




                                    </Grid>

                                </CardContent>
                            </Card>
                            {/* </Grid> */}
                            {/* </Grid> */}

                        </>

                        : null}

                    {showViewQuiz ?
                        <>
                            {/* <Grid container spacing={2}> */}


                            {/* <Grid item xs={12} md={12}> */}
                            <Card sx={{ minWidth: 275 }} className={classes.cardCenter1}>
                                <CardContent>
                                    {/* {loading && viewAssign.map((row) => ( */}
                                    <Grid container >
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='h6' > Quiz</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            <div className={classes.TextStyle}>
                                                Enter Title:
                                            </div>

                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            <TextField className={classes.btn} id="filled-basic" variant="filled"
                                                value={viewQuizName} onChange={
                                                    (e) => setViewQuizName(e.target.value)
                                                } />
                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            Quiz File
                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>

                                            {/* <iframe src="https://people.engr.tamu.edu/choe/choe/courses/12summer/315/lectures/kwon-android01.pdf" width="100%" height="500px">
                                        </iframe> */}
                                            <Button variant="contained" className={classes.btn} color='primary' component="span"
                                                onClick={viewPdf} >
                                                Open Pdf
                                            </Button>
                                            <input type="file" onChange={(e) => onFileChangeQuizUpdate(e.target.files[0])} />

                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            Select Due Date
                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DateTimePicker
                                                    renderInput={(props) => <TextField {...props} />}
                                                    label="Due Date"
                                                    value={viewQuizDue}
                                                    onChange={(newValue) => {
                                                        setViewQuizDue(newValue);
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        </Grid>


                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            <div className={classes.TextStyle}>
                                                Enter Total Marks:
                                            </div>

                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>

                                            <TextField className={classes.btn} id="filled-basic" variant="filled"
                                                value={viewQuizNumbers} onChange={
                                                    (e) => setViewQuizNumbers(e.target.value)
                                                } />
                                        </Grid>

                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            <Button variant="contained" className={classes.btn} color='primary' onClick={QuizUpdate} component="span" >
                                                Update
                                            </Button>
                                        </Grid>




                                    </Grid>

                                </CardContent>
                            </Card>
                            {/* </Grid> */}
                            {/* </Grid> */}

                        </>

                        : null}
                    {showUploadQuiz ?
                        <>
                            {/* <Grid container spacing={2}> */}


                            {/* <Grid item xs={12} md={12}> */}
                            <Card sx={{ minWidth: 275 }} className={classes.cardCenter1}>
                                <CardContent>
                                    <Grid container >
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='h6' > Upload Quiz</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            <TextField className={classes.btn} id="filled-basic" label="Enter Title" variant="filled"
                                                value={QuizTitle} onChange={
                                                    (e) => setQuizTitle(e.target.value)
                                                } />
                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            Upload File
                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>

                                            <input type="file" onChange={(e) => onFileChangeQuiz(e.target.files[0])} />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='h6' style={{ color: 'blue', fontSize: '11px' }} > Please Select pdf file </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            Select Due Date
                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DateTimePicker
                                                    renderInput={(props) => <TextField {...props} />}
                                                    label="Due Date"
                                                    value={dueDateQuiz}
                                                    onChange={(newValue) => {
                                                        setDueDateQuiz(newValue);
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        </Grid>


                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            <div className={classes.TextStyle}>
                                                Enter Total Marks:
                                            </div>

                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            {/* <input type="text" name="location" className={classes.inputStyle} placeholder="Enter Total Marks"
                              value={number}
                              onChange={(e) => setNumber(e.target.value)
                              }
                            /> */}
                                            <TextField className={classes.btn} id="filled-basic" label="Enter Marks" variant="filled"
                                                value={numberQuiz} onChange={
                                                    (e) => setNumberQuiz(e.target.value)
                                                } />
                                        </Grid>
                                        <Grid item xs={12} md={12} className={classes.marginstyle}>
                                            <Button variant="contained" className={classes.btn} color='primary' onClick={QuizUpload} component="span" >
                                                Upload
                                            </Button>
                                        </Grid>



                                    </Grid>
                                </CardContent>
                            </Card>
                            {/* </Grid> */}
                            {/* </Grid> */}

                        </>

                        : null}
                    {showUploadUpdate ?
                        <>
                            {/* <Grid container spacing={2}> */}


                            {/* <Grid item xs={12} md={12}> */}
                            <Card sx={{ minWidth: 275 }} className={classes.cardCenter1}>
                                <CardContent>
                                    <Grid container >
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='h6' > News and Event</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <TextField className={classes.btn} id="filled-basic" label="Enter Title" variant="filled"
                                                value={createTitle} onChange={
                                                    (e) => setcreateTitle(e.target.value)
                                                } />
                                        </Grid>
                                        <Grid item xs={12} md={12}>

                                            <TextareaAutosize
                                                className={classes.btn}
                                                aria-label="minimum height"
                                                minRows={3}
                                                placeholder="Enter Description"
                                                value={createDescription}
                                                onChange={
                                                    (e) => setcreateDescription(e.target.value)
                                                }

                                            />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <label htmlFor="contained-button-file">
                                                <Input accept="file/*" id="icon-button-file" type="file" />
                                                <IconButton color="primary" aria-label="upload picture" component="span">
                                                    <AttachFileIcon /><Typography>Attach File</Typography>
                                                </IconButton>

                                            </label>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Button variant="contained" className={classes.btn} color='primary' component="span" >
                                                Submit
                                            </Button>
                                        </Grid>




                                    </Grid>
                                </CardContent>
                            </Card>
                            {/* </Grid> */}
                            {/* </Grid> */}

                        </>

                        : null}
                    {showUploadLink ?
                        <>
                            {/* <Grid container spacing={2}> */}


                            {/* <Grid item xs={12} md={12}> */}
                            <Card sx={{ minWidth: 275 }} className={classes.cardCenter1}>
                                <CardContent>
                                    <Grid container >
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='h6' > Upload Video Lecture</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Typography variant='h6' style={{ color: 'blue', fontSize: '11px' }} > Please Select mp4 file </Typography>
                                        </Grid>
                                        {/* <Grid item xs={12} md={12}> */}
                                        <Grid item xs={12} md={12} className={classes.marginBtn}>

                                            <input type="file" onChange={(e) => onFileChangeVideo(e.target.files[0])} />
                                        </Grid>
                                        {/* </Grid> */}

                                        <Grid item xs={12} md={12}>
                                            <Button variant="contained" className={classes.btn} color='primary'
                                                onClick={VideoUpload} component="span" >
                                                Upload
                                            </Button>
                                        </Grid>




                                    </Grid>
                                </CardContent>
                            </Card>
                            {/* </Grid> */}
                            {/* </Grid> */}

                        </>

                        : null}
                </Grid>

            </Grid>
        </div>
    )
}

export default MyCourse