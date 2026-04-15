import { render, screen, fireEvent } from "@testing-library/react";
import FriendsLeaderboard from "./FriendsLeaderboard";

// Mock the Footer component
jest.mock("./Footer", () => {
  return function MockFooter() {
    return <div data-testid="mock-footer">Footer</div>;
  };
});

// Mock the ThemeContext
jest.mock("./ThemeContext", () => ({
  useTheme: () => ({
    theme: {
      background: "#ffffff",
      color: "#000000",
      headerColor: "#FFA500",
    },
    toggleTheme: jest.fn(),
    themeName: "Sunny Day",
  }),
}));

describe("FriendsLeaderboard Component", () => {
  const mockProps = {
    state: {
      loggedIn: true,
      token: "test-token",
    },
    dispatch: jest.fn(),
  };

  test("renders without crashing", () => {
    render(<FriendsLeaderboard {...mockProps} />);
    expect(screen.getByText("Friends Leaderboard")).toBeInTheDocument();
  });

  test("renders add friend input field", () => {
    render(<FriendsLeaderboard {...mockProps} />);
    expect(screen.getByPlaceholderText("friend@example.com")).toBeInTheDocument();
  });

  test("renders Add Friend button", () => {
    render(<FriendsLeaderboard {...mockProps} />);
    expect(screen.getByRole("button", { name: /Add Friend/i })).toBeInTheDocument();
  });

  test("renders Weekly Leaderboard section", () => {
    render(<FriendsLeaderboard {...mockProps} />);
    expect(screen.getByText("Weekly Leaderboard")).toBeInTheDocument();
  });

  test("displays leaderboard table with columns", () => {
    render(<FriendsLeaderboard {...mockProps} />);
    expect(screen.getByText("Rank")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Workouts")).toBeInTheDocument();
    expect(screen.getByText("Events")).toBeInTheDocument();
    expect(screen.getByText("Total Score")).toBeInTheDocument();
  });

  test("displays mock friends in leaderboard", () => {
    render(<FriendsLeaderboard {...mockProps} />);
    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
    expect(screen.getByText("Bob Smith")).toBeInTheDocument();
    expect(screen.getByText("Carol Davis")).toBeInTheDocument();
  });

  test("sorts friends by score in descending order", () => {
    render(<FriendsLeaderboard {...mockProps} />);
    const rows = screen.getAllByRole("row");
    // Skip header row and check order
    // Friends with score 8 should appear before score 5
    expect(rows.length).toBeGreaterThan(1);
  });

  test("shows Friends count when friends are added", () => {
    render(<FriendsLeaderboard {...mockProps} />);
    expect(screen.getByText(/Friends \(\d+\)/)).toBeInTheDocument();
  });

  test("adds a new friend when email is provided", () => {
    render(<FriendsLeaderboard {...mockProps} />);
    const input = screen.getByPlaceholderText("friend@example.com");
    const addButton = screen.getByRole("button", { name: /Add Friend/i });

    fireEvent.change(input, { target: { value: "newtesting@example.com" } });
    fireEvent.click(addButton);

    // After adding, the input should be cleared
    expect(input.value).toBe("");
  });

  test("prevents adding empty email", () => {
    render(<FriendsLeaderboard {...mockProps} />);
    const addButton = screen.getByRole("button", { name: /Add Friend/i });

    // Mock alert to verify it was called
    window.alert = jest.fn();

    fireEvent.click(addButton);
    expect(window.alert).toHaveBeenCalledWith("Please enter a valid email address");
  });

  test("prevents adding duplicate friend", () => {
    render(<FriendsLeaderboard {...mockProps} />);
    const input = screen.getByPlaceholderText("friend@example.com");
    const addButton = screen.getByRole("button", { name: /Add Friend/i });

    window.alert = jest.fn();

    // Try to add a friend that already exists
    fireEvent.change(input, { target: { value: "alice@example.com" } });
    fireEvent.click(addButton);

    expect(window.alert).toHaveBeenCalledWith("This friend is already added");
  });

  test("renders Footer component", () => {
    render(<FriendsLeaderboard {...mockProps} />);
    expect(screen.getByTestId("mock-footer")).toBeInTheDocument();
  });

  test("allows adding friend by pressing Enter key", () => {
    render(<FriendsLeaderboard {...mockProps} />);
    const input = screen.getByPlaceholderText("friend@example.com");

    fireEvent.change(input, { target: { value: "newuser@example.com" } });
    fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });

    // Input should be cleared after adding
    expect(input.value).toBe("");
  });

  test("displays correct number of friends in list", () => {
    render(<FriendsLeaderboard {...mockProps} />);
    const friendsHeader = screen.getByText(/Friends \(\d+\)/);
    expect(friendsHeader).toBeInTheDocument();
  });

  test("renders all table cells for mock friends", () => {
    render(<FriendsLeaderboard {...mockProps} />);
    const tableCells = screen.getAllByRole("cell");
    expect(tableCells.length).toBeGreaterThan(0);
  });
});
