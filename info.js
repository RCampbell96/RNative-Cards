import {createStackNavigator, createAppContainer} from 'react-navigation';

const MainNavigator = createStackNavigator({
    Home: {screen: HomeScreen},
    PeopleList: {screen: PeopleList}
});

const info = createAppContainer(MainNavigator);

export default info;