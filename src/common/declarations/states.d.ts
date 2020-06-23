type GameState = {
	generation: number;
	board: Board; //[rows][columns]
};

type UIState = {
	clicked: boolean;
	color: string;
};

type State = {
	ui: UIState;
	game: GameState;
};
