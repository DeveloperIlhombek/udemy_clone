export interface ICourse {
	_id: string
	title: string
	description: string
	learning: string
	requirements: string
	level: string
	category: string
	language: string
	oldPrice: number
	currentPrice: number
	previewImage: string
	published: boolean
	slug: string
	tags: string
}

export interface ISection {
	_id: string
	title: string
	position: number
	course: string
}
