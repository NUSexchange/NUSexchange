import React from "react";
import styles from "./UniversityCard.module.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {useDispatch} from "react-redux";
import {removeUniversity} from "../../../actions";
import { makeStyles } from '@material-ui/core/styles';
import createPdf from "../../../pdfCreator"
import {useSelector} from "react-redux";
import Modal from '@material-ui/core/Modal';
import FormModal from "../FormModal/FormModal";
  

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        display : 'flex',
        flexDirection : 'column',
        alignItems: 'center',
        justifyContent: "space-evenly",
        position: 'absolute',
        // width: "90%",
        // height: "90%",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
        '& .MuiButtonBase-root': {
            margin: theme.spacing(1),
            width: '25ch',
        }
    }
}));

const UniversityCard = (props) => {

    const savedDetails = useSelector(store => store.pdfDetails);
    const dispatch = useDispatch();

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div  style={modalStyle} className={classes.paper}>
            <FormModal university = {props.university}/>
        </div>
    );

    return (
        <React.Fragment>
            <Card>
                <Card.Body>
                    {console.log()}
                    <Card.Title>{props.university["University"]}</Card.Title>
                    <Card.Text>{props.location}</Card.Text>
                    <Card.Text>{props.nusModuleInfo.map(mod => mod + " ")}</Card.Text>
                    <Card.Text>Modules mappable: {" " + props.nusModuleInfo.length}</Card.Text>
                </Card.Body>
                <Card.Footer>
                    <div className = {styles.buttons}>
                        <Button variant="success" onClick = {handleOpen}>Generate Form</Button>
                        <Button variant="danger" onClick = {() => dispatch(removeUniversity(props.id))}>Remove</Button>
                    </div>
                </Card.Footer>
            </Card>
            <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    >
                    {body}
            </Modal>
        </React.Fragment>
    )
}

export default UniversityCard;



