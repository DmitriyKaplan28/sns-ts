import TestRenderer from 'react-test-renderer';
import {
    ProfileStatusFunctional
} from "./ProfileStatusFunctional";


describe("ProfileStatus component", () => {
    test("span should be displayed", () => {
        const testRenderer = TestRenderer.create(<ProfileStatusFunctional
            status="test status" updateUserStatus={() => {
        }}/>);
        const testInstance = testRenderer.root;

        expect(testInstance.findByType("span"));
    });
    test("input should not be displayed", () => {
        const testRenderer = TestRenderer.create(<ProfileStatusFunctional
            status="test status" updateUserStatus={() => {
        }}/>);
        const testInstance = testRenderer.root;

        expect(() => {
            testInstance.findByType("input")
        }).toThrow();
    });
    test("status is correct", () => {
        const testRenderer = TestRenderer.create(<ProfileStatusFunctional
            status="test status" updateUserStatus={() => {
        }}/>);
        const testInstance = testRenderer.root;
        expect(testInstance.findByType("span").children[0]).toBe("test status");
    });
    test("input should be displayed in edit mode", () => {
        const testRenderer = TestRenderer.create(<ProfileStatusFunctional
            status="test status" updateUserStatus={() => {
        }}/>);
        const testInstance = testRenderer.root;
        let span = testInstance.findByType("span")
        span.props.onDoubleClick();
        expect(testInstance.findByType("input"));
    })
})