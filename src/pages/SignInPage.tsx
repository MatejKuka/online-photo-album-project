import {Link, useNavigate} from "react-router-dom"
import {
    Typography,
    Container,
    Box,
    Grid,
    Button,
    Avatar,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox
} from '@mui/material';
import React from "react";
import {UserAuth} from "../context/AuthContext";
import toast, {Toaster} from 'react-hot-toast';

function SignInPage() {
    const {signInUser} = UserAuth();
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        signInUser(data.get('email') + "", data.get('password') + "")
            .then((userCredential) => {
                console.log(userCredential);
                navigate("/user/" + userCredential.user.uid);
            }).catch(error => {
            toast.error(error.code);
        })
    };

    return (
        <Container component="main" maxWidth="xs">
            <div><Toaster/></div>
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        value={"test2@test.com"}
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        value={"testtest"}
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >Sign In
                    </Button>
                    <Link className={"text-blue-500 hover:cursor-pointer underline"} to="/sign-up">
                        {"Don't have an account? Sign Up"}
                    </Link>

                </Box>
            </Box>
        </Container>
    );
}

export default SignInPage;