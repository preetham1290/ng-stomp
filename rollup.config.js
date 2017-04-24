export default {
	entry: 'dist/index.js',
	dest: 'dist/bundles/ng2-stomp.umd.js',
	sourceMap: false,
	format: 'umd',
	moduleName: 'ng2-stomp',
	globals: {
		'@angular/core': 'ng.core',
		'rxjs/Observable': 'Rx'
	}
}
