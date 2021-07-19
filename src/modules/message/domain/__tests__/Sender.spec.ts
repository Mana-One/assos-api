import { UniqueId } from '../../../../core/domain';
import { Role } from '../../../../shared/domain';
import { Sender } from '../Sender';

describe('Sender Entity', () => {
    describe('creation', ()=> {
        const props = {
            username: 'a name',
            role: Role.DONATOR
        };
        const uid = new UniqueId('a sender id');

        it('should return a Sender instance', () => {
            const res = Sender.create(props, uid);
            expect(res.success).toBe(true);

            const sender = res.getValue();
            expect(sender instanceof Sender).toBe(true);
            expect(sender.getId().equals(uid)).toBe(true);
            expect(sender.getName()).toBe(props.username);
            expect(sender.getRole()).toBe(props.role);
        })

        it('should return a Sender instance even without an id', () => {
            const res = Sender.create(props);
            expect(res.success).toBe(true);

            const sender = res.getValue();
            expect(sender instanceof Sender).toBe(true);
            expect(sender.getId()).toBeTruthy();
            expect(sender.getName()).toBe(props.username);
            expect(sender.getRole()).toBe(props.role);
        })

        it('should fail when passing an empty name', () => {
            const res = Sender.create({
                ...props,
                username: ''
            }, uid);
            expect(res.success).toBe(false);
            expect(res.getValue()).toBe('Invalid name');
        })
    })
})