"use strict";
const React = require("react");
const { useState, useEffect } = require("react");
const { useInput, useApp, useFocus, Text, Box } = require("ink");
const importJsx = require("import-jsx");

const Focus = importJsx("./components/Focus");
const BurbleSort = importJsx("./components/BurbleSort");

const App = () => {
	return (
		<>
			<BurbleSort />
		</>
	);
};

module.exports = App;
