import React from "react";
import TestRenderer from "react-test-renderer";
import {
	ProfileStatus
} from "./ProfileStatus";


describe("ProfileStatus component", () => {
	test("span should be displayed", () => {
		const testRenderer = TestRenderer.create(<ProfileStatus
			status="test status" updateUserStatus={() => {
			}}/>);
		const testInstance = testRenderer.root;

		expect(testInstance.findByType("span"));
	});
	test("input should not be displayed", () => {
		const testRenderer = TestRenderer.create(<ProfileStatus
			status="test status" updateUserStatus={() => {
			}}/>);
		const testInstance = testRenderer.root;

		expect(() => {
			testInstance.findByType("input");
		}).toThrow();
	});
	test("status is correct", () => {
		const testRenderer = TestRenderer.create(<ProfileStatus
			status="test status" updateUserStatus={() => {
			}}/>);
		const testInstance = testRenderer.root;
		expect(testInstance.findByType("span").children[0]).toBe("test status");
	});
	test("input should be displayed in edit mode", () => {
		const testRenderer = TestRenderer.create(<ProfileStatus
			status="test status" updateUserStatus={() => {
			}}/>);
		const testInstance = testRenderer.root;
		const span = testInstance.findByType("span");
		span.props.onDoubleClick();
		expect(testInstance.findByType("input"));
	});
});