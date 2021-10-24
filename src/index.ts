import hljs from "highlight.js"
import lox from "./lox"

import "highlight.js/styles/androidstudio.css"

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
		super(name); // call the super class constructor and pass in the name parameter
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
	const updateClassName = (e : HTMLElement, className : string) => {
		let n = e.cloneNode(true) as HTMLElement;
		n.classList.add(className);
		return n;
	}
	
	const updateInnerHTML = (e : HTMLElement, innerHTML : string) => {
		let n = e.cloneNode(true) as HTMLElement;
		n.innerHTML = innerHTML;
		return n;
	};
	
	const classHljs = (e : HTMLElement) => updateClassName(e, "hljs")
	const addCode = (e : HTMLElement) => updateInnerHTML(e, hljs.highlight(snippet.code, {language: snippet.language}).value);
	const mkEl = <K extends keyof HTMLElementTagNameMap>(tagName: K): HTMLElement => document.createElement(tagName);
	
	const pre = mkEl("pre")
	const code = addCode(classHljs(mkEl("code")))
	
	body.appendChild(pre).appendChild(code);
})

export {}