import Navigation from "../../components/Navigation";
import PicturePreviewItem from "../../components/PicturePreviewItem";
import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Modal} from "@mui/material";
import {nanoid} from "nanoid";
import {getDownloadURL, listAll, ref, uploadBytes, deleteObject} from "firebase/storage";
import {auth, storage} from "../../firebase";
import {createPhoto, IPhoto} from "../../types/Photo";
import {imageNameParser} from "../../utils";

//params.albumId
function SingleAlbumPage() {
    const params = useParams();
    const navigate = useNavigate();
    const albumNameEndpoint = "My animals album";

    const [photos, setPhotos] = useState<IPhoto[]>([]);

    const [newTitle, setNewTitle] = useState<string>("");
    const [newImage, setNewImage] = useState<File | null>();

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function handleEditClick() {

    }

    const handleAddPhoto = () => {
        if (newImage == null || newTitle === "") return
        const idGenerator = nanoid(5);
        const imageRef = ref(storage, `photos/${auth.currentUser?.uid}/${params.albumId}/${newTitle + "-" + idGenerator}`)
        // @ts-ignore
        uploadBytes(imageRef, newImage).then(() => {
            getDownloadURL(imageRef).then((url) => {
                setOpen(false);
                const createdPhoto = createPhoto(idGenerator, newTitle, url);
                setPhotos((prev) => [...prev, createdPhoto]);
            }).catch(error => console.log(error))
        }).catch(error => console.log(error))
    }

    const getAllPhotos = () => {
        const imagesRef = ref(storage, `photos/${auth.currentUser?.uid}/${params.albumId}/`)
        listAll(imagesRef).then((res) => {
            res.items.forEach((item) => {
                const itemParsed = imageNameParser(item.name)
                getDownloadURL(item).then((url) => {
                    const createdPhoto = createPhoto(itemParsed[1], itemParsed[0], url)
                    setPhotos((prev) => [...prev, createdPhoto]);
                })
            })
        })
    }
    useEffect(() => {
        getAllPhotos();
    }, [])

    function handleDeleteClick() {
        const deletePhotosRef = ref(storage, `photos/${auth.currentUser?.uid}/${params.albumId}`)
        const deleteAlbumRef = ref(storage, `albums/${auth.currentUser?.uid}`)
        deleteObject(deletePhotosRef).then(() => {
            deleteObject(deleteAlbumRef)
        }).then(() => navigate(-1));
    }

    return (
        <>
            <Navigation/>
            <div className={"p-10 custom-bg-vanilla"}>
                <h1 className={"text-center text-5xl font-semibold"}>{albumNameEndpoint}</h1>
                <button onClick={handleOpen} className={"button-primary text-xl font-semibold mx-2"}>Add</button>
                <button onClick={handleEditClick} className={"button-primary text-xl font-semibold mx-2"}>Edit</button>
                <button onClick={handleDeleteClick} className={"button-primary text-xl font-semibold mx-2"}>Delete
                </button>
                <div className={"pt-10"}>
                    {photos?.map(item => (
                        <PicturePreviewItem key={item.id} imgUrl={item.imageUrl} title={item.title}/>
                    ))}
                </div>
            </div>
            <Modal open={open}
                   onClose={handleClose}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description"
                   className={"flex justify-center items-center"}>
                <div className={"bg-white rounded-2xl w-[400px] p-8"}>
                    <h1 className={"text-2xl font-semibold text-center mb-4"}>Title:</h1>
                    <input value={newTitle} onChange={(event) => {
                        if (event.target.value) {
                            setNewTitle(event.target.value.trim())
                        }
                    }} placeholder={"My friend in Paris"} className={"border-2 border-gray-500 p-2 w-full"}
                           type="text"/>
                    <h1 className={"text-2xl font-semibold text-center mb-4"}>Add photo</h1>
                    <input onChange={(event) => {
                        if (event.target.files) {
                            setNewImage(event.target.files[0])
                        }
                    }} className={"border-2 border-gray-500 p-2 w-full"}
                           type="file"
                           accept={".jpg, .png, .webp"}
                           multiple={false}/>
                    <button onClick={handleAddPhoto}
                            className={"button-primary mt-5 mx-auto block text-2xl font-semibold"}>Create
                    </button>
                </div>
            </Modal>
        </>
    );
}

export default SingleAlbumPage;