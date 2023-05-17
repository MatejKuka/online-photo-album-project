import {Link, useNavigate} from "react-router-dom"
import {
    Container,
    Typography,
    Box,
    Grid,
    Checkbox,
    FormControlLabel,
    TextField,
    CssBaseline,
    Button,
    Avatar
} from '@mui/material';
import React from "react";
import {UserAuth} from "../context/AuthContext";
import toast, {Toaster} from 'react-hot-toast';


function SignUpPage() {
    const {signUpUser, updateUserDisplayName} = UserAuth();
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data.get("firstName"));
        signUpUser(data.get('email') + "", data.get('password') + "")
            .then((userCredential) => {
                updateUserDisplayName(data.get("firstName")+"");
                console.log(userCredential);
                navigate("/user/" + userCredential.user.uid);
            }).catch((error) => {
            toast(error.code);
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
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}>Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link className={"text-blue-500 hover:cursor-pointer underline"} to="/sign-in">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default SignUpPage;