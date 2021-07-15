export type ArticleListItemDto = Readonly<{
    id: string;
    title: string;
}>;

export type ArticleListDto = Readonly<{
    total: number;
    articles: Array<ArticleListItemDto>;
}>;

export function createArticleItemDto(props: any): ArticleListItemDto {
    return Object.freeze({
        id: props.id,
        title: props.title
    });
}

export function createArticleListDto(props: any[], total: number): ArticleListDto {
    return Object.freeze({
        total,
        articles: props.map(elm => createArticleItemDto(elm))
    });
}