import React from 'react';
import {Link} from "react-router-dom";

interface IAlbumItemProps {
    title: string,
    imgURL: string,
    link: string | number
}

function AlbumPreviewItem({title, imgURL, link}: IAlbumItemProps) {


    return (
            <Link to={"albums/" + link} className={"custom-bg-red w-[400px] h-[300px] rounded-2xl hover:cursor-pointer"}>
                <img className={"object-cover w-full h-[250px]"} src={imgURL} alt="Hi"/>
                <p className={"text-white font-semibold text-2xl p-2 text-center"}>{title}</p>
            </Link>
    );
}

export default AlbumPreviewItem;