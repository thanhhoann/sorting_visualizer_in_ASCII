"use strict";
const React = require("react");
const { useState, useEffect } = require("react");
const { useInput, useApp, useFocus, Text, Box } = require("ink");

const items = [{ label: "a" }, { label: "b" }, { label: "c" }];

const Focus = () => {
	const [content, setContent] = useState("");

	return (
		<Box flexDirection="column" padding={1}>
			<Box marginBottom={1}></Box>
			{items.map((item, index) => (
				<Item
					key={index}
					label={item.label}
					getFocusedItem={(e) => setContent(e)}
				/>
			))}
			<Text>You chose {content}</Text>
		</Box>
	);
};

const Item = ({ label, getFocusedItem }) => {
	const { exit } = useApp();
	const { isFocused } = useFocus();
	useInput((input, key) => {
		if (input === "q") {
			exit();
		}

		if (key.return) {
			isFocused && getFocusedItem(label);
		}
	});

	return (
		<Box borderStyle="round" borderColor={isFocused ? "green" : "white"}>
			<Text>{label}</Text>
		</Box>
	);
};

module.exports = Focus;
