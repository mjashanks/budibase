import { 
    getInstanceProps,
    getComponentInfo 
} from "../src/userInterface/pagesParsing/createProps";
import {
    keys, some
} from "lodash/fp";
import { screens } from "./testData";



describe("getComponentInfo", () => {

    it("should return default props for root component", () => {
        const result = getComponentInfo(
            screens(), 
            "budibase-components/TextBox");

        expect(result.errors).toEqual([]);
        expect(result.fullProps).toEqual({
            _component: "budibase-components/TextBox",
            size: "",
            isPassword: false,
            placeholder: "",
            label:""
        });
    });

    it("getInstanceProps should set supplied props on top of default props", () => {
        const result = getInstanceProps(
            getComponentInfo(
                screens(), 
                "budibase-components/TextBox"),
            {size:"small"});

        expect(result).toEqual({
            _component: "budibase-components/TextBox",
            size: "small",
            isPassword: false,
            placeholder: "",
            label:""
        });
        
    });

    it("should return correct props for derived component", () => {
        const result = getComponentInfo(
            screens(), 
            "common/SmallTextbox");

        expect(result.errors).toEqual([]);
        expect(result.fullProps).toEqual({
            _component: "common/SmallTextbox",
            size: "small",
            isPassword: false,
            placeholder: "",
            label:""
        });
    });

    it("should return correct props for twice derived component", () => {
        const result = getComponentInfo(
            screens(), 
            "common/PasswordBox");

        expect(result.errors).toEqual([]);
        expect(result.fullProps).toEqual({
            _component: "common/PasswordBox",
            size: "small",
            isPassword: true,
            placeholder: "",
            label:""
        });
    });


    it("should list unset props as those that are only defined in root", () => {
        const result = getComponentInfo(
            screens(), 
            "common/PasswordBox");

        expect(result.unsetProps).toEqual([
            "placeholder", "label"]);
    });

})