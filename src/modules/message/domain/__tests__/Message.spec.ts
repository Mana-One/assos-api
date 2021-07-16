import { UniqueId } from '../../../../core/domain';
import { Message } from '../index';


describe('Message Entity', () => {
    describe('creation', () => {
        const props = {
            senderId: new UniqueId('a sender id'),
            roomId: new UniqueId('a room id'),
            content: 'some content',
            publicationDate: new Date('2020-07-15')
        };
        const uid = new UniqueId('a message id');

        it('should return a Message instance', () => {
            const res = Message.create(props, uid);
            expect(res.success).toBe(true);

            const message = res.getValue();
            expect(message instanceof Message).toBe(true);
            expect(message.getId().equals(uid)).toBe(true);
            expect(message.getSenderId().equals(props.senderId)).toBe(true);
            expect(message.getRoomId().equals(props.roomId)).toBe(true);
            expect(message.getContent()).toBe(props.content);
            expect(message.getPublicationDate().getTime()).toBe(props.publicationDate.getTime());
        })

        it('should return a Message instance when  passing no id', () => {
            const res = Message.create(props, uid);
            expect(res.success).toBe(true);

            const message = res.getValue();
            expect(message instanceof Message).toBe(true);
            expect(message.getId()).toBeTruthy();
            expect(message.getSenderId().equals(props.senderId)).toBe(true);
            expect(message.getRoomId().equals(props.roomId)).toBe(true);
            expect(message.getContent()).toBe(props.content);
            expect(message.getPublicationDate().getTime()).toBe(props.publicationDate.getTime());
        })

        it('should fail when passsing empty content', () => {
            const res = Message.create({
                ...props,
                content: ''
            }, uid);
            expect(res.success).toBe(false);
            expect(res.getValue()).toBe('Invalid content');
        })
    })
})