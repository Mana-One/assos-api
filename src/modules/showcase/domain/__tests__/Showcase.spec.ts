import { Showcase } from '../Showcase';


describe('Showcase DTO', () => {
    it('should return a valid dto', () => {
        const props = {
            id: 'a showcase id',
            name: 'a showcase name',
            email: 'asso@yahoo.com',
            bannerUrl: 'a showcase url',
            presentation: 'a presentation url'
        };

        const result = Showcase.create(props);
        expect(result.success).toBe(true);

        const dto = result.getValue();
        expect(dto.id).toBe(props.id);
        expect(dto.name).toBe(props.name);
        expect(dto.email).toBe(props.email);
        expect(dto.bannerUrl).toBe(props.bannerUrl);
        expect(dto.presentation).toBe(props.presentation);
    });
})