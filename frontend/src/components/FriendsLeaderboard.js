import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Grid,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RemoveIcon from "@mui/icons-material/Close";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Footer from "./Footer";
import headerImage from "../images/header.webp";
import { useTheme } from "./ThemeContext";

// Mock data for initial state
const mockFriends = [
  {
    friendId: "1",
    email: "alice@example.com",
    name: "Alice Johnson",
    workoutsThisWeek: 5,
    eventsThisWeek: 3,
    score: 8,
  },
  {
    friendId: "2",
    email: "bob@example.com",
    name: "Bob Smith",
    workoutsThisWeek: 3,
    eventsThisWeek: 2,
    score: 5,
  },
  {
    friendId: "3",
    email: "carol@example.com",
    name: "Carol Davis",
    workoutsThisWeek: 7,
    eventsThisWeek: 1,
    score: 8,
  },
  {
    friendId: "4",
    email: "david@example.com",
    name: "David Wilson",
    workoutsThisWeek: 4,
    eventsThisWeek: 4,
    score: 8,
  },
];

function FriendsLeaderboard(props) {
  const { theme } = useTheme();
  const [friends, setFriends] = useState(mockFriends);
  const [newFriendEmail, setNewFriendEmail] = useState("");
  const [sortedFriends, setSortedFriends] = useState([]);

  // Sort friends by score (descending) when friends list changes
  useEffect(() => {
    const sorted = [...friends].sort((a, b) => b.score - a.score);
    setSortedFriends(sorted);
  }, [friends]);

  // Handle adding a new friend
  const handleAddFriend = () => {
    if (!newFriendEmail.trim()) {
      alert("Please enter a valid email address");
      return;
    }

    // Check if friend already exists
    if (friends.some((friend) => friend.email === newFriendEmail)) {
      alert("This friend is already added");
      setNewFriendEmail("");
      return;
    }

    // Create new friend object with mock data
    const newFriend = {
      friendId: String(Date.now()), // Simple ID generation
      email: newFriendEmail,
      name: newFriendEmail.split("@")[0], // Extract name from email
      workoutsThisWeek: Math.floor(Math.random() * 8),
      eventsThisWeek: Math.floor(Math.random() * 5),
      score: 0, // Will be calculated below
    };

    // Calculate score
    newFriend.score = newFriend.workoutsThisWeek + newFriend.eventsThisWeek;

    setFriends([...friends, newFriend]);
    setNewFriendEmail("");
  };

  // Handle removing a friend
  const handleRemoveFriend = (friendId) => {
    setFriends(friends.filter((friend) => friend.friendId !== friendId));
  };

  // Handle Enter key press in input field
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddFriend();
    }
  };

  return (
    <>
      <Container maxWidth={false} sx={{ width: "90%" }}>
        {/* Header Section with Background Image */}
        <Box
          sx={{
            marginTop: "10px",
            backgroundImage: `url(${headerImage})`,
            backgroundSize: "55%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            padding: "100px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <EmojiEventsIcon sx={{ fontSize: 40, color: theme.headerColor }} />
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                color: theme.color,
                fontWeight: "bold",
                margin: 0,
              }}
            >
              <strong>Friends Leaderboard</strong>
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              color: theme.color,
              marginTop: 1,
            }}
          >
            Compete with friends and track weekly fitness activity
          </Typography>
        </Box>

        {/* Main Content Section */}
        <Box sx={{ marginTop: "2rem", marginBottom: "2rem" }}>
          <Grid container spacing={3}>
            {/* Add Friend Card */}
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  backgroundColor: "rgba(255, 165, 0, 0.05)",
                  borderRadius: "8px",
                  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
                  height: "100%",
                }}
              >
                <CardHeader
                  title="Add a Friend"
                  sx={{
                    backgroundColor: theme.headerColor,
                    color: theme.background === "#ffffff" ? "#000000" : "#ffffff",
                  }}
                />
                <CardContent>
                  <TextField
                    fullWidth
                    label="Friend's Email"
                    placeholder="friend@example.com"
                    value={newFriendEmail}
                    onChange={(e) => setNewFriendEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    variant="outlined"
                    size="small"
                    sx={{ marginBottom: "1rem" }}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<PersonAddIcon />}
                    onClick={handleAddFriend}
                    sx={{
                      backgroundColor: theme.headerColor,
                      color: theme.background === "#ffffff" ? "#000000" : "#ffffff",
                      "&:hover": {
                        opacity: 0.9,
                      },
                    }}
                  >
                    Add Friend
                  </Button>
                </CardContent>
              </Card>

              {/* Friends List Card */}
              {friends.length > 0 && (
                <Card
                  sx={{
                    marginTop: "2rem",
                    backgroundColor: "rgba(255, 165, 0, 0.05)",
                    borderRadius: "8px",
                    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <CardHeader
                    title={`Friends (${friends.length})`}
                    sx={{
                      backgroundColor: theme.headerColor,
                      color: theme.background === "#ffffff" ? "#000000" : "#ffffff",
                    }}
                  />
                  <CardContent sx={{ padding: 0 }}>
                    <Box
                      sx={{
                        maxHeight: "350px",
                        overflowY: "auto",
                        padding: "16px",
                        "&::-webkit-scrollbar": {
                          width: "8px",
                        },
                        "&::-webkit-scrollbar-track": {
                          backgroundColor: "rgba(0, 0, 0, 0.05)",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          backgroundColor: theme.headerColor,
                          borderRadius: "4px",
                          "&:hover": {
                            backgroundColor: theme.headerColor,
                            opacity: 0.8,
                          },
                        },
                      }}
                    >
                      {friends.map((friend) => (
                        <Box
                          key={friend.friendId}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "10px",
                            paddingBottom: "10px",
                            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                            "&:last-child": {
                              border: "none",
                              marginBottom: 0,
                            },
                          }}
                        >
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Avatar
                              sx={{
                                backgroundColor: theme.headerColor,
                                width: 32,
                                height: 32,
                                fontSize: "0.75rem",
                              }}
                            >
                              {friend.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {friend.name}
                              </Typography>
                              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                {friend.email}
                              </Typography>
                            </Box>
                          </Box>
                          <Button
                            size="small"
                            startIcon={<RemoveIcon />}
                            onClick={() => handleRemoveFriend(friend.friendId)}
                            sx={{
                              color: "#d32f2f",
                              "&:hover": {
                                backgroundColor: "rgba(211, 47, 47, 0.1)",
                              },
                            }}
                          />
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              )}
            </Grid>

            {/* Leaderboard Card */}
            <Grid item xs={12} md={8}>
              <Card
                sx={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <CardHeader
                  title="Weekly Leaderboard"
                  sx={{
                    backgroundColor: theme.headerColor,
                    color: theme.background === "#ffffff" ? "#000000" : "#ffffff",
                  }}
                  subheader="This Week's Activity Rankings"
                  subheaderTypographyProps={{
                    sx: {
                      color: theme.background === "#ffffff" ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.7)",
                    },
                  }}
                />
                <CardContent sx={{ padding: 0 }}>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
                          <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            Rank
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                          <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            Workouts
                          </TableCell>
                          <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            Events
                          </TableCell>
                          <TableCell align="center" sx={{ fontWeight: "bold" }}>
                            Total Score
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sortedFriends.length > 0 ? (
                          sortedFriends.map((friend, index) => (
                            <TableRow
                              key={friend.friendId}
                              sx={{
                                backgroundColor:
                                  index === 0
                                    ? "rgba(255, 193, 7, 0.1)"
                                    : index === 1
                                    ? "rgba(192, 192, 192, 0.1)"
                                    : index === 2
                                    ? "rgba(205, 127, 50, 0.1)"
                                    : "white",
                                "&:hover": {
                                  backgroundColor: "rgba(0, 0, 0, 0.03)",
                                },
                              }}
                            >
                              <TableCell align="center">
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  {index === 0 && (
                                    <Typography
                                      variant="h6"
                                      sx={{
                                        fontWeight: "bold",
                                        color: "#FFD700",
                                        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                                      }}
                                    >
                                      🥇
                                    </Typography>
                                  )}
                                  {index === 1 && (
                                    <Typography
                                      variant="h6"
                                      sx={{
                                        fontWeight: "bold",
                                        color: "#C0C0C0",
                                        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                                      }}
                                    >
                                      🥈
                                    </Typography>
                                  )}
                                  {index === 2 && (
                                    <Typography
                                      variant="h6"
                                      sx={{
                                        fontWeight: "bold",
                                        color: "#CD7F32",
                                        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                                      }}
                                    >
                                      🥉
                                    </Typography>
                                  )}
                                  {index > 2 && (
                                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                                      #{index + 1}
                                    </Typography>
                                  )}
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                  <Avatar
                                    sx={{
                                      backgroundColor: theme.headerColor,
                                      width: 36,
                                      height: 36,
                                      fontSize: "0.9rem",
                                    }}
                                  >
                                    {friend.name.charAt(0).toUpperCase()}
                                  </Avatar>
                                  <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                      {friend.name}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                      {friend.email}
                                    </Typography>
                                  </Box>
                                </Box>
                              </TableCell>
                              <TableCell align="center">
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {friend.workoutsThisWeek}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {friend.eventsThisWeek}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontWeight: "bold",
                                    color: theme.headerColor,
                                    fontSize: "1.1rem",
                                  }}
                                >
                                  {friend.score}
                                </Typography>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} align="center" sx={{ padding: "2rem" }}>
                              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                No friends added yet. Add a friend to start competing!
                              </Typography>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Footer />
    </>
  );
}

export default FriendsLeaderboard;
