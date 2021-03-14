import React, { Component } from 'react'
import { Card, Icon } from 'react-native-elements'
import {
  FlatList,
  Image,
  ImageBackground,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 45,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: '#FFF',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
  econtainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 25,
  },
  emailColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  emailIcon: {
    color: 'gray',
    fontSize: 30,
  },
  emailNameColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  emailNameText: {
    color: 'gray',
    fontSize: 14,
    fontWeight: '200',
  },
  emailRow: {
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  emailText: {
    fontSize: 16,
  },
  iconRow: {
    flex: 2,
    justifyContent: 'center',
  },
})

class Contact extends Component {
  renderHeader = () => {
    const {
      avatar,
      avatarBackground,
      name,
      address: { city, state },
    } = this.props

    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{uri: avatarBackground}}
        >
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={{uri: avatar}}
            />
            <Text style={styles.userNameText}>{name}</Text>
            <View style={styles.userAddressRow}>
              <View>
                <Icon
                  name="place"
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  {city}, {state}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }

  renderList = () => {
      const {
        projects,
        tools,
        skills,
        ratings,
        bio
      } = this.props

      return (
        <View>
          <View style={[styles.econtainer, styles.emailContainer]}>
            <View style={styles.iconRow}>
                <Icon
                  name="happy-outline"
                  type="ionicon"
                  underlayColor="transparent"
                  iconStyle={styles.emailIcon}
                />
            </View>
            <View style={styles.emailRow}>
              <View style={styles.emailColumn}>
                <Text style={styles.emailText}>{bio}</Text>
              </View>
              <View style={styles.emailNameColumn}>
                  <Text style={styles.emailNameText}>Bio</Text>
              </View>
            </View>
          </View>
          <View style={[styles.econtainer, styles.emailContainer]}>
            <View style={styles.iconRow}>
                <Icon
                  name="hammer-outline"
                  type="ionicon"
                  underlayColor="transparent"
                  iconStyle={styles.emailIcon}
                />
            </View>
            <View style={styles.emailRow}>
              <View style={styles.emailColumn}>
                <Text style={styles.emailText}>{tools}</Text>
              </View>
              <View style={styles.emailNameColumn}>
                  <Text style={styles.emailNameText}>Equipment</Text>
              </View>
            </View>
          </View>
          <View style={[styles.econtainer, styles.emailContainer]}>
            <View style={styles.iconRow}>
                <Icon
                  name="hand-right-outline"
                  type="ionicon"
                  underlayColor="transparent"
                  iconStyle={styles.emailIcon}
                />
            </View>
            <View style={styles.emailRow}>
              <View style={styles.emailColumn}>
                <Text style={styles.emailText}>{skills}</Text>
              </View>
              <View style={styles.emailNameColumn}>
                  <Text style={styles.emailNameText}>Skills</Text>
              </View>
            </View>
          </View>
          <View style={[styles.econtainer, styles.emailContainer]}>
            <View style={styles.iconRow}>
                <Icon
                  name="star-outline"
                  type="ionicon"
                  underlayColor="transparent"
                  iconStyle={styles.emailIcon}
                />
            </View>
            <View style={styles.emailRow}>
              <View style={styles.emailColumn}>
                <Text style={styles.emailText}>{ratings.stars}</Text>
              </View>
              <View style={styles.emailNameColumn}>
                  <Text style={styles.emailNameText}>Rating</Text>
              </View>
            </View>
          </View>
          <View style={[styles.econtainer, styles.emailContainer]}>
            <View style={styles.iconRow}>
                <Icon
                  name="cube-outline"
                  type="ionicon"
                  underlayColor="transparent"
                  iconStyle={styles.emailIcon}
                />
            </View>
            <View style={styles.emailRow}>
              <View style={styles.emailColumn}>
                <Text style={styles.emailText}>{projects}</Text>
              </View>
              <View style={styles.emailNameColumn}>
                  <Text style={styles.emailNameText}>Projects</Text>
              </View>
            </View>
          </View>
        </View>
    )
  }

  render() {
    return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {this.renderHeader()}
            {this.renderList()}
          </Card>
        </View>
      </ScrollView>
    )
  }
}

export default Contact
