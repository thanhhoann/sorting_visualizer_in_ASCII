"use strict";
const React = require("react");
const { useState, useEffect } = require("react");
const { useInput, useApp, useFocus, Text, Box } = require("ink");
const BigText = require("ink-big-text");

const items = [{ label: "a" }, { label: "b" }, { label: "c" }];
const no_blocks = 40;
const speed = 10;
const blocks = [];

const BurbleSort = () => {
	const [i, setI] = useState(0);
	const [j, setJ] = useState(0);
	const { exit } = useApp();

	const [isRunning, setIsRunning] = useState(false);

	useInput((input, key) => {
		if (input === "q") {
			exit();
		}
	});

	const generateRandomBlocks = () => {
		for (let i = 0; i < no_blocks; i++) {
			let block = {
				height: Math.round(Math.random() * 20) + 10,
				content: "",
			};

			let s = "";
			let temp = block.height;
			while (temp--) {
				s += "*";
			}

			block.content = s;
			blocks.push(block);
		}
	};

	useEffect(() => {
		generateRandomBlocks();
		setIsRunning(true);
		const timer = setInterval(() => {
			setJ((prev) => prev + 1);
		}, speed);

		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		if (blocks[j].height > blocks[i].height) {
			let temp = blocks[i];
			blocks[i] = blocks[j];
			blocks[j] = temp;
		}

		if (j == blocks.length - 1) {
			if (j == i + 1) setJ(i);
			else setJ(i + 1);
			setI((prev) => prev + 1);
		}

		if (i == blocks.length - 1) {
			setI(0);
			setJ(0);
			setIsRunning(false);
		}
	}, [j]);

	return (
		<Box flexDirection="column" alignItems="center">
			<Box flexDirection="row">
				{blocks.map((block, index) => (
					<Box
						margin="1"
						key={index}
						height={block.height}
						width="1"
						alignItems="center"
					>
						<Text
							bold
							color={
								(i == index || j == index) && isRunning == true
									? "green"
									: "white"
							}
						>
							{block.content}
						</Text>
					</Box>
				))}
			</Box>
		</Box>
	);
};

module.exports = BurbleSort;
