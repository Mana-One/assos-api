export type ArticleDto = Readonly<{
    id: string;
    title: string;
    content: string;
    publicationDate: Date
}>;

export function createArticleDto(props: any): ArticleDto {
    return Object.freeze({
        id: props.id,
        title: props.title,
        content: props.content,
        publicationDate: new Date(props.publicationDate)
    });
}