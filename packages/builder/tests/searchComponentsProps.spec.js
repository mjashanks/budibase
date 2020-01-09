import {
    searchAllComponents, 
    getExactComponent,
    getAncestorProps
} from "../src/userInterface/pagesParsing/searchComponents";
import { screens } from "./testData";

describe("searchAllComponents", () => {

    it("should match derived component by name", () => {

        const results = searchAllComponents(
            screens(),
            "password"
        );

        expect(results.length).toBe(1);
        expect(results[0].name).toBe("common/PasswordBox");

    });

    it("should match derived component by tag", () => {

        const results = searchAllComponents(
            screens(),
            "mask"
        );

        expect(results.length).toBe(1);
        expect(results[0].name).toBe("common/PasswordBox");

    });

    it("should match component if ancestor matches", () => {

        const results = searchAllComponents(
            screens(),
            "smalltext"
        );

        expect(results.length).toBe(2);

    });

});

describe("getExactComponent", () => {
    it("should get component by name", () => {
        const result = getExactComponent(
            screens(),
            "common/SmallTextbox"
        )

        expect(result).toBeDefined();
        expect(result.name).toBe("common/SmallTextbox");
    });

    it("should return nothing when no result (should not fail)", () => {
        const result = getExactComponent(
            screens(),
            "bla/bla/bla"
        )

        expect(result).not.toBeDefined();
    });

});

describe("getAncestorProps", () => {

    it("should return props of root component", () => {

        const result = getAncestorProps(
            screens(),
            "budibase-components/TextBox"   
        );

        expect(result).toEqual([
            screens()[0].props
        ]);

    });

    it("should return props of all ancestors and current component, in order", () => {

        const components = screens();

        const result = getAncestorProps(
            components,
            "common/PasswordBox"   
        );

        expect(result).toEqual([
            components[0].props,
            {...components[4].props},
            {...components[5].props}
        ]);

    });

})


