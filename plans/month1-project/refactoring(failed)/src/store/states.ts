export type State = {
	isLoggedIn?: 'true' | 'false';
	auth?: 'read' | 'orange' | 'plum' | 'all';
} & Record<string, string>;

export const states: State = {
	isLoggedIn: 'false',
	auth: 'read',
};
