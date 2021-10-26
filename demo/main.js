import "./node_modules/highlight.js/styles/androidstudio.css";
import hljs from "highlight.js"
import lox from "../dist/mjs/lox.js"

hljs.registerLanguage("lox", lox);

let snippets = [
	{
		language: "lox",
		code: `class Animal {
	init(name) {
		this.name = name;
	}
	
	speak(.lo) {
		print this.name + " makes a noise.";
	}
}

class Dog < Animal {
	init(name) {
		// call the super class constructor and pass in the name parameter
		super.init(name);
	}
	
	speak() {
		print this.name + " barks.";
	}
}

var d = Dog("Mitzie");
d.speak(); // Mitzie barks.
`
	}, {
		language: "javascript",
		code: `class Animal {
	constructor(name) {
		this.name = name;
	}
	
	speak() {
		console.log(\`\${this.name} makes a noise.\`);
	}
}

class Dog extends Animal {
	constructor(name) {
		// call the super class constructor and pass in the name parameter
		super(name);
	}
	
	speak() {
		console.log(\`\${this.name} barks.\`);
	}
}

let d = new Dog('Mitzie');
d.speak(); // Mitzie barks.
`
	}
];

const body = document.getElementsByTagName("body")[0];

snippets.forEach((snippet) => {
	const updateClassName = (e, className) => {
		let n = e.cloneNode(true);
		n.classList.add(className);
		return n;
	}
	
	const updateInnerHTML = (e, innerHTML) => {
		let n = e.cloneNode(true);
		n.innerHTML = innerHTML;
		return n;
	};
	
	const classHljs = (e) => updateClassName(e, "hljs")
	const addCode = (e) => updateInnerHTML(e, hljs.highlight(snippet.code, {language: snippet.language}).value);
	const mkEl = (tagName) => document.createElement(tagName);
	
	const pre = mkEl("pre")
	const code = classHljs(addCode(mkEl("code")))
	
	body.appendChild(pre).appendChild(code);
})