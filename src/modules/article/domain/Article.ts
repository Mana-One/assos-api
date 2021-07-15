import { Entity, UniqueId } from "../../../core/domain";
import { Guard, Result } from "../../../core/logic";


interface ArticleProps {
    title: string;
    content: string;
    publicationDate: Date;
    associationId: UniqueId;
}

interface EditArticleInfoPops {
    title?: string;
    content?: string;
}

export class Article extends Entity<ArticleProps> {
    getId(): UniqueId {
        return this._id;
    }

    getTitle(): string {
        return this.props.title;
    }

    getContent(): string {
        return this.props.content;
    }

    getPublicationDate(): Date {
        return this.props.publicationDate;
    }

    getAssociationId(): UniqueId {
        return this.props.associationId
    }

    editInfo(props: EditArticleInfoPops): Result<void> {
        if(props.title !== undefined){
            if(props.title.length === 0){
                return Result.ko('Invalid title');
            }
            this.props.title = props.title;
        }

        if(props.content !== undefined){
            if(props.content.length === 0){
                return Result.ko('Invalid content');
            }
            this.props.content = props.content;
        }

        return Result.ok();
    }

    static create(props: ArticleProps, id?: UniqueId): Result<Article> {
        const guard = Guard.bulkAgainstNullOrUndefined([
            { key: 'title', value: props.title },
            { key: 'content', value: props.content },
            { key: 'publicationDate', value: props.publicationDate },
            { key: 'associationId', value: props.associationId }
        ]);
        if(!guard.success){
            return Result.ko<Article>(guard.message);
        }

        if(props.title.length === 0){
            return Result.ko<Article>('Invalid title');
        }

        if(props.content.length === 0){
            return Result.ko<Article>('Invalid content');
        }

        return Result.ok<Article>(new Article(props, id));
    }
}