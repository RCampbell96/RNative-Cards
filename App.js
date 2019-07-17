import React from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  Button
} from "react-native";
import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';

export default class Source extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Source Listing",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { textAlign: "center", flex: 1 }
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: []
    };
  }
  componentDidMount() {
    fetch("https://ghibliapi.herokuapp.com/locations")
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error => console.log(error)) //to catch the errors if any
  }
  FlatListItemSeparator = () => {
    return (
      <View style={{
        height: .5,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      />
    );
  }

  renderItem = (data) =>
    <TouchableOpacity style={styles.list}>
      <Text style={styles.lightText}>{data.item.name}</Text>
      <Text style={styles.lightText}>{data.item.climate}</Text>
      <Text style={styles.lightText}>{data.item.terrain}</Text>
      </TouchableOpacity>

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
      
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={item => this.renderItem(item)}

          keyExtractor={item => item.id.toString()}
        />
      </View>
    )
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  list: {
    paddingVertical: 4,
    margin: 5,
    backgroundColor: "#fff"
  }
});