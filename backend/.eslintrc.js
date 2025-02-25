module.exports = {
	'env': {
		'commonjs': true,
		'es6': true,
		'node': true
	},
	'extends': 'eslint:recommended',
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parserOptions': {
		'ecmaVersion': 2018
	},
	'rules': {
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single',
			{
				"allowTemplateLiterals": true
			}
		],
		'semi': [
			'error',
			'always'
		],
		'no-unused-vars': ['error', {
			'vars': 'local',
			'args': 'none',
			'ignoreRestSiblings': false,
			'caughtErrors': 'none'
		}]
	}
};