import { UniqueId } from '../../../../core/domain';
import { Article } from '../index';


describe('Article Entity', () => {
    describe('create', () =>{
        const props = {
            title: 'a title',
            content: 'some content',
            publicationDate: new Date(),
            associationId: new UniqueId('an association id')
        };
        const uid = new UniqueId('an article id');

        it('should return an Article instance', () => {
            const result = Article.create(props, uid);
            expect(result.success).toBe(true);

            const article = result.getValue();
            expect(article instanceof Article).toBe(true);
            expect(article.getId().equals(uid)).toBe(true);
            expect(article.getTitle()).toBe(props.title);
            expect(article.getContent()).toBe(props.content);
            expect(article.getPublicationDate().getTime()).toBe(props.publicationDate.getTime());
            expect(article.getAssociationId().equals(props.associationId)).toBe(true);
        })

        it('should return an Article instance when creating without an existing id', () => {
            const result = Article.create(props);
            expect(result.success).toBe(true);
    
            const article = result.getValue();
            expect(article instanceof Article).toBe(true);
            expect(article.getId()).toBeTruthy();
            expect(article.getTitle()).toBe(props.title);
            expect(article.getContent()).toBe(props.content);
            expect(article.getPublicationDate().getTime()).toBe(props.publicationDate.getTime());
            expect(article.getAssociationId().equals(props.associationId)).toBe(true);        
        })

        it('should fail when passing an empty title', () => {
            const result = Article.create({
                ...props,
                title: ''
            }, uid);
            expect(result.success).toBe(false);
            expect(result.getValue()).toBe('Invalid title');
        })

        it('should fail when passing an empty content', () => {
            const result = Article.create({
                ...props,
                content: ''
            }, uid);
            expect(result.success).toBe(false);
            expect(result.getValue()).toBe('Invalid content');
        })
    })
})