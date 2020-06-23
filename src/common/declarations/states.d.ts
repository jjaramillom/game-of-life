type GameState = {
	generation: number;
	board: Board; //[rows][columns]
	boardSize: BoardSize;
	running: boolean;
};

type UIState = {
	clicked: boolean;
	color: string;
};

type State = {
	ui: UIState;
	game: GameState;
};
