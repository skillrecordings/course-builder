import * as React from 'react'
import { redo as redoHandle } from '@codemirror/commands'

import { ICommand } from '.'

export const redo: ICommand = {
	name: 'redo',
	keyCommand: 'redo',
	button: { 'aria-label': 'redo text' },
	icon: (
		<svg viewBox="0 0 512 512" height="14" width="14">
			<path
				fill="currentColor"
				d="M58.79,439.13A16,16,0,0,1,48,424c0-73.1,14.68-131.56,43.65-173.77,35-51,90.21-78.46,164.35-81.87V88a16,16,0,0,1,27.05-11.57l176,168a16,16,0,0,1,0,23.14l-176,168A16,16,0,0,1,256,424V344.23c-45,1.36-79,8.65-106.07,22.64-29.25,15.12-50.46,37.71-73.32,67a16,16,0,0,1-17.82,5.28Z"
			/>
		</svg>
	),
	execute: ({ state, view }) => {
		if (!state || !view) return
		redoHandle(view)
	},
}
