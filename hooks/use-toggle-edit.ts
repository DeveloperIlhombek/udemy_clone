'use client'

import { useState } from 'react'

function useToggleEdit() {
	const [state, setState] = useState(false)

	const onToggle = () => setState(prev => !prev)

	return { state, onToggle }
}

export default useToggleEdit
