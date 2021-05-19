import { ValueObject } from "../ValueObject";

describe("ValueObject", () => {
    interface Props {
        key: string;
    }

    class VOImpl extends ValueObject<Props> {
        constructor(props: Props){
            super(props);
        }

        getValue(): string {
            return this.props.key;
        }
    }

    describe("equals", () => {
        it("should return true if the names are the same object", () => {
            const vo = new VOImpl({ key: "name" });
            const check = vo.equals(vo);
            expect(check).toBe(true);
        })

        it("should return true if the names have the same values", () => {
            const vo = new VOImpl({ key: "name" });
            const vo2 = new VOImpl({ key: "name" });
            const check = vo.equals(vo2);
            expect(check).toBe(true);
        })

        it("should return false if the names have different values", () => {
            const vo = new VOImpl({ key: "name" });
            const vo2 = new VOImpl({ key: "name2" });
            const check = vo.equals(vo2);
            expect(check).toBe(false);
        })

        it("should return false if comparing with undefined", () => {
            const vo = new VOImpl({ key: "name" });
            const check = vo.equals(undefined);
            expect(check).toBe(false);
        })
    })
})