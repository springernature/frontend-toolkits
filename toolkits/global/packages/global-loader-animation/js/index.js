class CssLoader {
	constructor(yCoord = '50%') {
		this.loader = {};
		this.yCoord = yCoord;
		this.create();
	}

	create() {
		const loader = document.createElement('div');
		loader.innerHTML = '<div></div><div></div>';
		loader.className = 'c-loader-animation';
		loader.style.top = this.yCoord;
		this.loader = loader;
	}

	add() {
		document.body.appendChild(this.loader);
	}

	remove() {
		document.body.removeChild(this.loader);
	}
}

export default CssLoader;
