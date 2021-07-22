import { ShowcaseList } from "../ShowcaseList";

describe('Showcase List DTO', () => {
    it('should create a valid dto', () => {
        const elm0 = {
            id: 'a showcase id',
            name: 'a showcase name'
        };
        const props = [elm0];

        const result = ShowcaseList.create(props, 1);
        expect(result.success).toBe(true);

        const list = result.getValue();
        expect(list.total).toBe(props.length);
        expect(list.showcases[0]).toEqual(elm0);
    })
})