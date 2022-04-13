import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from '@mui/icons-material';
import {ToDoListsList} from "../features/ToDoListsList/ToDoListsList";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {Route, Routes} from "react-router-dom";
import {Auth} from "../features/Auth/Auth";
import {initializeApp} from "./reducers/app-reducer";
import {logOut} from "../features/Auth/reducers/auth-reducer";


type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const dispatch = useDispatch();
    const isInitialised = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized);
    const status = useSelector<AppRootStateType>(state => state.app.status);
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn);

    useEffect(() => {
        dispatch(initializeApp());
    }, []);

    const logOutHandler = useCallback( () => {
        dispatch(logOut());
    }, [])

    if (!isInitialised) {
        return (
            <div style={{marginTop: '200px', textAlign: 'center'}}>
                <CircularProgress color="secondary" />
            </div>
        );
    }
    return (
        <div>
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={logOutHandler}>Log out</Button>}
                </Toolbar>
            </AppBar>
            <div style={{height: '4px'}}>
                {status === 'loading' && <LinearProgress color={"secondary"}/>}
            </div>
            <Container>
                <Routes>
                    <Route path={'/'} element={<ToDoListsList demo={demo}/>}/>
                    <Route path={'/login'} element={<Auth/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
