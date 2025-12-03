import { View, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

// Icons
import HomeIcon from "../assets/home.svg";
import SearchIcon from "../assets/search.svg";
import SavedIcon from "../assets/saved.svg";
import ProfileIcon from "../assets/profile.svg";

const Footer = ({ changePage }) => {
  return (
    <View style={styles.footer}>
      <View style={styles.iconsView}>
        <TouchableOpacity onPress={() => changePage("home")}>
          <HomeIcon style={styles.iconSvg} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => changePage("search")}>
          <SearchIcon style={styles.iconSvg} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => changePage("saved")}>
          <SavedIcon style={styles.iconSvg} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => changePage("profile")}>
          <ProfileIcon style={styles.iconSvg} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#e6e6e6",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  iconsView: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: width,
  },
  iconSvg: {
    width: 36,
    height: 24,
  },
});

export default Footer;
