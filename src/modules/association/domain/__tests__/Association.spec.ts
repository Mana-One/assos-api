import { UniqueId } from "../../../../core/domain";
import { UserEmail } from "../../../../shared/domain";
import { Association } from "../Association";

describe("Association entity", () => {
    describe("creation", () => {
        const props = {
            name: "associaiton name",
            email: UserEmail.create("assos@yahoo.com").getValue(),
            bannerUrl: "a banner url",
            presentation: "a presentation",
            storeReference: "a store reference"
        };
        const uid = new UniqueId("an association id");

        it("should return an Associaiton instance", () => {
            const result = Association.create(props, uid);
            expect(result.success).toBe(true);
            const asso = result.getValue();
            expect(asso.getId().equals(uid)).toBe(true);
            expect(asso.getName()).toBe(props.name);
            expect(asso.getBannerUrl()).toBe(props.bannerUrl);
            expect(asso.getPresentation()).toBe(props.presentation);
            expect(asso.getStoreReference()).toBe(props.storeReference);
        })

        it("should return an Associaiton instance without passing an id", () => {
            const result = Association.create(props);
            expect(result.success).toBe(true);
            const asso = result.getValue();
            expect(asso.getId()).toBeTruthy();
            expect(asso.getName()).toBe(props.name);
            expect(asso.getBannerUrl()).toBe(props.bannerUrl);
            expect(asso.getPresentation()).toBe(props.presentation);
            expect(asso.getStoreReference()).toBe(props.storeReference);
        })

        it("should fail when passing an empty name", () => {
            const result = Association.create({ 
                ...props,
                name: ""
            }, uid);
            expect(result.success).toBe(false);
            expect(result.getValue()).toBe("Invalid name");
        })

        it("should fail when passing an empty bannerUrl", () => {
            const result = Association.create({ 
                ...props,
                bannerUrl: ""
            }, uid);
            expect(result.success).toBe(false);
            expect(result.getValue()).toBe("Invalid bannerUrl");
        })

        it("should fail when passing an empty presentation", () => {
            const result = Association.create({ 
                ...props,
                presentation: ""
            }, uid);
            expect(result.success).toBe(false);
            expect(result.getValue()).toBe("Invalid presentation");
        })

        it("should fail when passing an empty storeReference", () => {
            const result = Association.create({ 
                ...props,
                storeReference: ""
            }, uid);
            expect(result.success).toBe(false);
            expect(result.getValue()).toBe("Invalid storeReference");
        })
    })
})