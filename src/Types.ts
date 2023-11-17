export type Message = { message: string, translation: string|null, sender: Sender }
export type Sender = 'left' | 'right'