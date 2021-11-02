const path = require("path")
const fs = require("fs/promises")
const hljs = require("highlight.js").default
const lox = require("../../../dist/cjs/lox.cjs")

hljs.registerLanguage("lox", lox)

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
		language: "js",
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
]

/** @see [source](https://stackoverflow.com/a/65615651/9564132) */
async function isExists(path) {
	try {
		await fs.access(path);
		return true;
	} catch {
		return false;
	}
};

/** @see [source](https://stackoverflow.com/a/65615651/9564132) */
async function writeFile(filePath, data) {
	try {
		const dirname = path.dirname(filePath);
		const exist = await isExists(dirname);
		if (!exist) {
			await fs.mkdir(dirname, { recursive: true });
		}

		await fs.writeFile(filePath, data, 'utf8');
	} catch (err) {
		throw new Error(err);
	}
}

snippets.map(async (snippet) => await writeFile(
	`out/${snippet.language}.html`,
	hljs.highlight(snippet.language, snippet.code).value
))