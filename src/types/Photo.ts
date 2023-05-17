export interface IPhoto {
    id: string,
    title: string,
    imageUrl: string
}

export function createPhoto(id: string, title: string, imageUrl: string): IPhoto {
    return {
        id,
        title,
        imageUrl
    }
}