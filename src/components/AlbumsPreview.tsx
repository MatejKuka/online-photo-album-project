import AlbumPreviewItem from "./AlbumPreviewItem";
import {Modal} from "@mui/material";
import {useEffect, useState} from "react";
import {getDownloadURL, ref, uploadBytes, listAll} from "firebase/storage";
import {auth, storage} from "../firebase";
import {nanoid} from "nanoid";
import {imageNameParser} from "../utils";
import {createAlbumPreview, IAlbumPreview} from "../types/Album";

function AlbumsPreview() {

    const [open, setOpen] = useState(false);
    const [newTitle, setNewTitle] = useState<string>("");
    const [newImage, setNewImage] = useState<File | null>();
    const [albums, setAlbums] = useState<IAlbumPreview[]>([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCreateAlbum = () => {
        if (newImage == null || newTitle === "") return
        const idGenerator = nanoid(5);
        const imageRef = ref(storage, `albums/${auth.currentUser?.uid}/${newTitle + "-" + idGenerator}`)
        // @ts-ignore
        uploadBytes(imageRef, newImage).then(() => {
            getDownloadURL(imageRef).then((url) => {
                setOpen(false);
                const createdAlbum = createAlbumPreview(idGenerator, newTitle, url);
                setAlbums((prev) => [...prev, createdAlbum]);
            }).catch(error => console.log(error))
        }).catch(error => console.log(error))
    }

    const getAllAlbums = () => {
        const imagesRef = ref(storage, `albums/${auth.currentUser?.uid}/`)
        listAll(imagesRef).then((res) => {
            res.items.forEach((item) => {
                const itemParsed = imageNameParser(item.name)
                getDownloadURL(item).then((url) => {
                    const createdAlbum = createAlbumPreview(itemParsed[1], itemParsed[0], url)
                    setAlbums((prev) => [...prev, createdAlbum]);
                })
            })
        })
    }

    useEffect(() => {
        getAllAlbums();
    }, [])

    return (
        <div className={"p-10"}>
            <h1 className={"text-center text-5xl font-semibold"}>You have {albums.length} albums totally!</h1>
            <button onClick={handleOpen} className={"button-primary text-2xl font-semibold mx-auto"}>New</button>
            <div className={"flex justify-center gap-4 mt-10 flex-wrap"}>
                {albums?.map((item) => (
                    <AlbumPreviewItem key={item.id} imgURL={item.mainPhotoUrl} title={item.title} link={item.id}/>
                ))}
            </div>
            <Modal open={open}
                   onClose={handleClose}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description"
                   className={"flex justify-center items-center"}>
                <div className={"bg-white rounded-2xl w-[400px] p-8"}>
                    <h1 className={"text-2xl font-semibold text-center mb-4"}>Create New Album</h1>
                    <p className={"mb-2"}>Title:</p>
                    <input value={newTitle} onChange={(event) => {
                        if (event.target.value) {
                            setNewTitle(event.target.value.trim())
                        }
                    }} className={"border-2 border-gray-500 p-2 w-full"} type="text" placeholder={"My Holiday 2022"}/>
                    <p className={"my-2"}>Choose picture of your album:</p>
                    <input onChange={(event) => {
                        if (event.target.files) {
                            setNewImage(event.target.files[0])
                        }
                    }} className={"border-2 border-gray-500 p-2 w-full"}
                           type="file"
                           accept={".jpg, .webp, .png"}
                           multiple={false}/>
                    <button onClick={handleCreateAlbum}
                            className={"button-primary mt-5 mx-auto block text-2xl font-semibold"}>Create
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default AlbumsPreview;