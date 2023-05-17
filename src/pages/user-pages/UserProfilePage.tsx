import {Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {auth, storage} from "../../firebase";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
// @ts-ignore
import BlankPhoto from "../../assets/blank-profile.webp"
import {UserAuth} from "../../context/AuthContext";

//params.userId
function UserProfilePage() {
    const [imageUpload, setImageUpload] = useState<File | null>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);

    const navigate = useNavigate();
    const {updateUserDisplayName} = UserAuth();

    const placeholderName = "Rock Johnson";
    const placeholderPassword = "Password";
    const handleGoBackClick = () => navigate(-1);

    const handleSaveChangePhoto = () => {
        const imageRef = ref(storage, `avatars/${auth.currentUser?.uid}`)
        // @ts-ignore
        uploadBytes(imageRef, imageUpload).then(() => {
            getDownloadURL(imageRef).then((url) => {
                setProfileImage(url)
            }).catch(error => console.log(error))
        }).catch(error => console.log(error))
    }

    useEffect(() => {
        const imageRef = ref(storage, `avatars/${auth.currentUser?.uid}`)
        getDownloadURL(imageRef)
            .then((url) => {
                setProfileImage(url)
            }).catch(error => console.log(error))
    }, [])

    return (
        <>
            <div className={"custom-bg-vanilla p-10"}>
                <img className={"mx-auto w-[400px] h-[400px] object-cover rounded-full"}
                     src={profileImage ? profileImage : BlankPhoto}
                     alt="Profile Photo"/>
                <div className={"mx-auto w-[1000px] py-10"}>
                    <Grid container>
                        <Grid item md={6}>
                            <p className={"text-3xl text-center"}>Change profile photo:</p>
                            <p className={"text-3xl my-4 text-center"}>Name:</p>
                            <p className={"text-3xl text-center"}>Password:</p>
                        </Grid>
                        <Grid item md={6}>
                            <input onChange={(event) => {
                                if (event.target.files) {
                                    setImageUpload(event.target.files[0])
                                }
                            }} type="file" accept={".jpg, .png, .webp"} multiple={false}/>
                            <input placeholder={placeholderName}
                                   className={"p-2 my-4 border-gray-500 border-2 w-5/6"}
                                   type="text"/>
                            <br/>
                            <input placeholder={placeholderPassword}
                                   className={" p-2 border-gray-500 border-2 w-5/6"}
                                   type="text"/>
                        </Grid>
                    </Grid>
                    <button onClick={handleSaveChangePhoto}
                            className={"button-primary font-semibold text-3xl mx-auto block mt-8"}>Save
                    </button>
                    <button onClick={handleGoBackClick}
                            className={"button-primary font-semibold text-3xl mx-auto block mt-8"}>Go back
                    </button>
                </div>
            </div>
        </>
    );
}

export default UserProfilePage;