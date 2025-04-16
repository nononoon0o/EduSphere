import { StyleSheet } from "react-native";

const SearchStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#1E1E1E",
  },
  searchInput: {
    backgroundColor: "#1E1E1E",
    width: "70%",
    height: 50,
    color: "white",
    marginTop: 30,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  tabButton: (isSelected) => ({
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
    borderTopWidth: isSelected ? 2 : 1,
    borderBottomWidth: isSelected ? 0 : 1,
    borderLeftWidth: isSelected ? 0 : 1,
    borderRightWidth: isSelected ? 0 : 1,
    borderColor: isSelected ? "#0097FB" : "white",
    backgroundColor: isSelected ? "#1E1E1E" : "#292929",
  }),
  recentSearchItem: {
    padding: 10,
    flexDirection: "row",
    borderBottomColor: "#AEAEAE",
    borderBottomWidth: 2,
  },
  searchTerm: {
    color: "white",
    marginLeft: 10,
    width: "73%",
  },
  searchDate: {
    color: "#C5C5C5",
    marginLeft: 10,
  },
  deleteIcon: {
    marginLeft: 5,
  },
});

export default SearchStyles;
