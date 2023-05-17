import {IPhoto} from "./Photo";

export interface IAlbum {
    id: string,
    title: string
    photos: IPhoto[] | null,
    userId: string,
    mainPhotoUrl: string
}

export function CreateAlbum(id: string, title: string, userId: string, mainPhotoUrl: string, photos = null): IAlbum {
    return {
        id,
        title,
        userId,
        mainPhotoUrl,
        photos
    }
}

export interface IAlbumPreview {
    id: string,
    title: string,
    mainPhotoUrl: string
}

export function createAlbumPreview(id: string, title: string, mainPhotoUrl: string): IAlbumPreview {
    return {
        id,
        title,
        mainPhotoUrl
    }
}