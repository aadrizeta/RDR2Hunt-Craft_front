import React, { useEffect } from 'react';
import {Animated, Image, View, ScrollView, TouchableOpacity} from "react-native";
import stylesHome from "./StylesHome";
import HomeContentBox from "../../components/HomeContentBox";
import HomeContentBoxReversed from "../../components/HomeContentBoxReversed";
import {useNavigation} from "@react-navigation/native";
import {DrawerNavigationProp} from "@react-navigation/drawer";
import {RootStackParamList} from "../../../../App";

type HomeScreenNavigationProp = DrawerNavigationProp<RootStackParamList, 'DrawerNavigator'>;

function Home(){
    const navigation = useNavigation<HomeScreenNavigationProp>()
    return (
      <View style={stylesHome.main}>
          <View style={stylesHome.header}>
              <TouchableOpacity
                  onPress={()=> navigation.openDrawer()}
              >
                  <Image source={require('../../../../assets/icons/menu.png')} style={stylesHome.menuIcon}/>
              </TouchableOpacity>
              <Image source={require('../../../../assets/icons/appLogo.png')} style={stylesHome.appIcon}/>
              <Image source={require('../../../../assets/icons/icon.png')} style={stylesHome.userIcon}/>
          </View>
          <ScrollView contentContainerStyle={stylesHome.scrollContainer}>
              <HomeContentBox
                  imageSource={require('../../../../assets/pictures/arrow.png')}
                  title="The Ultimate Hunting Guide"
                  description="Your go-to companion for everything related to the trapper in Red Dead Redemption 2.
                  Discover craftable items, manage materials, and track your favorite outfits in one place."
              />
              <HomeContentBoxReversed
                  imageSource={require('../../../../assets/pictures/crafting.png')}
                  title="Craftable Items"
                  description="Browse a complete list of craftable items available at the trapper, including hats, vests, gloves, and more."
              />
              <HomeContentBox
                  imageSource={require('../../../../assets/pictures/hunting.png')}
                  title="Required Materials"
                  description="All you need to know to craft each item, including rare pelts and special components."
              />
              <HomeContentBoxReversed
                  imageSource={require('../../../../assets/pictures/trapper.jpg')}
                  title="Trapper Outfits"
                  description="Explore all trapper outfits in Red Dead Redemption 2 and see what it takes to complete each set."
              />
              <HomeContentBox
                  imageSource={require('../../../../assets/pictures/favorites.png')}
                  title="Favorites"
                  description="Mark your favorite outfits and items to easily track your personal collection and goals."
              />
          </ScrollView>

      </View>
    );
}
export default Home;
