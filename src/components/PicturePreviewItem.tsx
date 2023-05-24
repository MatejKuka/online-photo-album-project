import {Grid} from "@mui/material";

interface IPicturePreviewItemProps {
    title: string,
    imgUrl: string,
}

function PicturePreviewItem({title, imgUrl}: IPicturePreviewItemProps) {

    return (
        <div className={"custom-bg-brown w-full w-[1500px] p-6 my-4 mx-auto rounded-2xl relative"}>
            <Grid container>
                <Grid item md={6}>
                    <img className={"max-w-[500px] max-h-[600px] mx-auto"} src={imgUrl} alt=""/>
                </Grid>
                <Grid item md={6} className={"flex justify-center items-center"}>
                    <h2 className={"text-5xl font-semibold"}>{title}</h2>
                </Grid>
            </Grid>
        </div>
    );
}

export default PicturePreviewItem;