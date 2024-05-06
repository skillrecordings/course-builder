import { defineConfig } from 'tsup'

export default defineConfig({
	entry: [
		'src/pricing/**/*',
		'src/path-to-purchase/**/*',
		'src/purchase-transfer/**/*',
		'src/client.ts',
		'src/index.ts',
	],
	sourcemap: true,
	clean: true,
	dts: true,
	format: ['cjs', 'esm'],
	external: ['react', 'react-dom', 'next'],
	injectStyle: false,
})
