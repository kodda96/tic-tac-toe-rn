import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gamestate: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
    };
  }

  componentDidMount() {
    this.initGame();
  }

  getWinner() {
    const NUM_TILES = 3;
    var arr = this.state.gamestate;
    var sum;
    for (var i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }

      for (var i = 0; i < NUM_TILES; i++) {
        sum = arr[0][i] + arr[1][i] + arr[2][i];
        if (sum == 3) {
          return 1;
        } else if (sum == -3) {
          return -1;
        }
      }

      sum = arr[0][0] + arr[1][1] + arr[2][2];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }

      sum = arr[2][0] + arr[1][1] + arr[0][2];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }

      return 0;
    }
  }

  initGame() {
    this.setState({
      gamestate: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
    });
  }

  newGame() {
    this.initGame();
  }

  onTilePress = (row, col) => {
    var value = this.state.gamestate[row][col];
    if (value !== 0) {
      return;
    }

    var currentPlayer = this.state.currentPlayer;

    var arr = this.state.gamestate.slice();
    arr[row][col] = currentPlayer;
    this.setState({ gamestate: arr });

    var nextPlayer = currentPlayer == 1 ? -1 : 1;
    this.setState({ currentPlayer: nextPlayer });

    var winner = this.getWinner();
    if (winner == 1) {
      Alert.alert("Player 1 is the winner");
      this.initGame();
    } else if (winner == -1) {
      Alert.alert("Player 2 is the winner");
      this.initGame();
    }
  };

  newGame = () => {
    this.initGame();
  };

  renderIcon = (row, col) => {
    var value = this.state.gamestate[row][col];
    switch (value) {
      case 1:
        return <Icon name="close" style={styles.tileX} />;
      case -1:
        return <Icon name="circle-outline" style={styles.tileO} />;
      default:
        return <View />;
    }
  };

  render() {
    return (
      <ImageBackground
        style={styles.board}
        source={require("./assets/board.jpg")}
      >
        <View style={styles.container}>
          <View>
            <Text style={styles.heading}>Tic Tac Toe</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => this.onTilePress(0, 0)}
              style={styles.title}
            >
              {this.renderIcon(0, 0)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(0, 1)}
              style={styles.title}
            >
              {this.renderIcon(0, 1)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onilePress(0, 2)}
              style={styles.title}
            >
              {this.renderIcon(0, 2)}
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => this.onTilePress(1, 0)}
              style={styles.title}
            >
              {this.renderIcon(1, 0)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(1, 1)}
              style={styles.title}
            >
              {this.renderIcon(1, 1)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(1, 2)}
              style={styles.title}
            >
              {this.renderIcon(1, 2)}
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => this.onTilePress(2, 0)}
              style={styles.title}
            >
              {this.renderIcon(2, 0)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(2, 1)}
              style={styles.title}
            >
              {this.renderIcon(2, 1)}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.onTilePress(2, 2)}
              style={styles.title}
            >
              {this.renderIcon(2, 2)}
            </TouchableOpacity>
          </View>

          <View style={styles.button}>
            <Button title="New Game" onPress={this.newGame} />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  heading: {
    fontSize: 30,
    marginBottom: 100,
    color: "blue",
  },

  title: {
    borderWidth: 1,
    width: 100,
    height: 100,
  },
  tileX: {
    color: "red",
    fontSize: 60,
    textAlign: "center",
    marginTop: 20,
  },
  tileO: {
    color: "green",
    fontSize: 60,
    textAlign: "center",
    marginTop: 20,
  },

  board: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },

  button: {
    marginTop: 40,
    width: 100,
  },
});
