export interface BlogModel {
    postId: number,
    title: string,
    banner: string,
    summary: string,
    totalReadingTime: number,
    content: string,
    users: {
        avatar: string
    }
}
