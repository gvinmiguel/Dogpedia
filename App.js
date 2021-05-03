import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useEffect, Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground,
         SafeAreaView, Dimensions, Animated, findNodeHandle, Image,
         FlatList, ScrollView, Button, TextInput, Header, Form,} from 'react-native';
import { Transition, Transitioning, Extrapolate } from 'react-native-reanimated';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import aboutus from './menudata/aboutus';
import aboutdog from './menudata/aboutdg';
import services from './menudata/services';
import medical from './menudata/medical';
import contact from './menudata/contact';
import gallery from './menudata/gallery';
import medbg from './assets/medbg.jpg';
import dogService from './assets/dogTreatment.jpg'
import team from './menudata/team';
import data from './TeamData';


const Stack = createStackNavigator();
const { width, height } = Dimensions.get('window', 'screen');

/* For the Products Module */ 

/* For the Products Module */

/* For the Gallery Module */

const gallerydata = [
  'https://cutewallpaper.org/21/dog-phone-wallpaper/Golden-Retriever-Dog-Phone-Wallpaper-Lockscreen-HD-4K-.jpg',
  'https://1.bp.blogspot.com/-z7MmKCZ9aoU/XqrEMKUPt3I/AAAAAAAAOrw/LgcqLLK7rfku7V5lH4h6QyWo44LEBjIkgCLcBGAsYHQ/w1080/amoled-phone-wallpaper.png',
  'https://www.mordeo.org/files/uploads/2019/01/Swiss-Shepherd-4K-Ultra-HD-Mobile-Wallpaper-950x1689.jpg',
  'https://wallpapercave.com/wp/wp2629977.jpg',
  'https://bestwallpapers.net/wp-content/uploads/2020/02/Dog-HD-Wallpapers-For-Phone-Best-Wallpapers.jpg',
  'https://i.pinimg.com/originals/d2/68/c3/d268c3ae26b3610aeb81d6897b2169b5.jpg',
  'https://mfiles.alphacoders.com/712/712204.jpg',
  'https://www.wallpapertip.com/wmimgs/35-357981_golden-retriever-dog-phone-wallpaper-hd.jpg',
  'https://res.instawallpaper.com/1440x2960-wallpapers/download/Rescue-Dog-40450.jpg',
  'https://mfiles.alphacoders.com/742/742864.jpg',
  'https://s2.best-wallpaper.net/wallpaper/iphone/1806/Dog-look-up-black-background_iphone_640x1136.jpg',
  'https://s2.best-wallpaper.net/wallpaper/iphone/1906/Black-dog-front-view-silk-darkness_iphone_1242x2688.jpg',
  'https://r1.ilikewallpaper.net/iphone-wallpapers/download/7469/Cute-Pomeranian-Dog-iphone-wallpaper-ilikewallpaper_com.jpg',
  'https://wallpaperaccess.com/full/3146217.jpg',
  'https://bestwallpapers.net/wp-content/uploads/2020/02/Dog-Wallpapers-Free-Download-for-Phone-Best-Wallpapers.jpg'
];

const imageW = width * 0.7;
const imageH = imageW * 1.54;
/* For the Gallery Module */

/* For the Team Module */


const TICKER_HEIGHT = 40;
const LOGO_WIDTH = 220;
const LOGO_HEIGHT = 40;
const CIRCLE_SIZE = width * 0.6;
const DOT_SIZE = 40;

const Item = ({ imageUri, heading, description, scrollX, index }) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const opacityInputRange = [
    (index - 0.4) * width,
    index * width,
    (index + 0.4) * width,
  ];
  const translateXHeading = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.1, 0, -width * 0.1],
  });
  const translateXDescription = scrollX.interpolate({
    inputRange,
    outputRange: [width, 0, -width],
  });
  const opacity = scrollX.interpolate({
    inputRange: opacityInputRange,
    outputRange: [0, 1, 0],
  });
  const imageScale = scrollX.interpolate({
    inputRange,
    outputRange: [0.2, 1, 0.2],
  });
  return (
    <View style={teamstyles.itemStyle}>
      <Animated.Image
        source={imageUri}
        style={[
          teamstyles.imageStyle,
          {
            transform: [{ scale: imageScale }],
          },
        ]}
      />
      <View style={teamstyles.textContainer}>
        <Animated.Text
          style={[
            teamstyles.heading,
            {
              opacity,
              transform: [{ translateX: translateXHeading }],
            },
          ]}
        >
          {heading}
        </Animated.Text>
        <Animated.Text
          style={[
            teamstyles.description,
            {
              opacity,
              transform: [{ translateX: translateXDescription }],
            },
          ]}
        >
          {description}
        </Animated.Text>
      </View>
    </View>
  );
};

const Circle = ({ scrollX }) => {
  return (
    <View style={[StyleSheet.absoluteFillObject, teamstyles.circleContainer]}>
      {data.map((p, index) => {
        const inputRange = [
          (index - 0.55) * width,
          index * width,
          (index + 0.55) * width,
        ];
        return (
          <Animated.View
            key={index}
            style={[
              teamstyles.circle,
              {
                backgroundColor: p.color,
                opacity: scrollX.interpolate({
                  inputRange,
                  outputRange: [0, 0.1, 0],
                }),
                transform: [
                  {
                    scale: scrollX.interpolate({
                      inputRange,
                      outputRange: [0, 1, 0],
                    }),
                  },
                ],
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const Ticker = ({ scrollX }) => {
  return (
    <View style={teamstyles.tickerContainer}>
      <Animated.View
        style={{
          transform: [
            {
              translateY: scrollX.interpolate({
                inputRange: [-width * 2, -width, 0, width, width * 2],
                outputRange: [
                  TICKER_HEIGHT * 2,
                  TICKER_HEIGHT,
                  0,
                  -TICKER_HEIGHT,
                  -TICKER_HEIGHT * 2,
                ],
              }),
            },
          ],
        }}
      >
        {data.map(({ type }, index) => {
          return (
            <Text key={index} style={teamstyles.ticker}>
              {type}
            </Text>
          );
        })}
      </Animated.View>
    </View>
  );
};

const Pagination = ({ scrollX }) => {
  const translateX = scrollX.interpolate({
    inputRange: data.map((_, i) => i * width),
    outputRange: data.map((_, i) => i * 40),
  });

  return (
    <View style={teamstyles.pagination}>
      <Animated.View
        style={[
          teamstyles.paginationIndicator,
          {
            position: 'absolute',
            backgroundColor: 'rgba(166, 162, 162, 0.4)',
            transform: [{ translateX }],
          },
        ]}
      />
      {data.map((item) => {
        return (
          <View key={item.key} style={teamstyles.paginationDotContainer}>
            <View
              style={[teamstyles.paginationDot, { backgroundColor: item.color }]}
            />
          </View>
        );
      })}
    </View>
  );
};

/* For the Team Module */

/* For the Home */
const bgs = ['#32a88b', '#7243e0', '#9fd962', '#e8bd72'];
const homedata = [
  {
    "key": "3571572",
    "title": "Welcome to DogPedia App",
    "description": "We have prepared for you an easy-to-use application, You'll love it, we are very sure!",
    "image": "https://www.freepnglogos.com/uploads/dog-png/bow-wow-gourmet-dog-treats-are-healthy-natural-low-4.png",
  },
  {
    "key": "3571747",
    "title": "You need information?",
    "description": "You can access our app filled with information about Dogs! Be sure to have them ready in your head.",
    "image": "http://assets.stickpng.com/thumbs/585bb5b2cb11b227491c32a2.png",
  },
  {
    "key": "3571680",
    "title": "Entertainment, you say?",
    "description": "Don't you worry, we also prepared an entertainment section just for you!",
    "image": "https://i2.wp.com/freepngimages.com/wp-content/uploads/2015/10/white-fluffy-dog-image.png?fit=425%2C522",
  },
  {
    "key": "3571603",
    "title": "We are here to communicate!",
    "description": "Our services offers you an online consultation for what you need to know!",
    "image": "https://freepngimg.com/thumb/puppy/33728-6-puppy-transparent-image.png",
  }
]

const Indicator = ({ scrollX }) => { 
  return ( <View style={{ position: 'absolute', bottom: 100, flexDirection: 'row'}}>
    {homedata.map((_, i) => {
       const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
       const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0.8, 1.4, 0.8],
        Extrapolate: 'clamp',
      });
       const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0.4, 1, 0.4],
        Extrapolate: 'clamp',
      });
      return ( <Animated.View
      key={`indicator-${i}`}
      style={{
      height: 10,
      width: 10,
      borderRadius: 5,
      backgroundColor: '#fff',
      opacity,
      margin: 10,
      transform: [
        {
          scale,
        },
      ]
      }}/>
     );
    })}
  </View>
  );
};

const Backdrop = ({scrollX}) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_,i) => i * width),
    outputRange: bgs.map((bg) => bg),
  });
  return (
    <Animated.View
    style={[
      StyleSheet.absoluteFillObject,
      {
        backgroundColor,
      }
    ]}/>
  );
}

const Square = ({scrollX}) => {
  const YOLO = Animated.modulo(Animated.divide(
    Animated.modulo(scrollX, width),
    new Animated.Value(width)),
    1
  );

  const rotate = YOLO.interpolate({
    inputRange: [0, .5, 1],
    outputRange: ['35deg','-35deg','35deg']
  });
  const translateX = YOLO.interpolate({
    inputRange: [0, .5, 1],
    outputRange: [0, -height, 0],
  });
  return (
    <Animated.View
    style={{
      width: height,
      height: height,
      backgroundColor: '#fff',
      borderRadius: 86,
      position: 'absolute',
      top: -height * 0.6,
      left: -height * 0.34,
      transform: [
        {
        rotate,
        },
        {
          translateX,
        }
    ]
    }}
    />
  )
}
/* For the Home */

/* For the Menu */
const transition = (
  <Transition.Together>
    <Transition.In type='fade' durationMs={50}/>
    <Transition.Change/>
    <Transition.Out type='fade' durationMs={50}/>
  </Transition.Together>
)
/* For the Menu */

function HomeScreen({navigation}) {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
   
     <View style={hstyles.container}>
      <StatusBar hidden />
    <Backdrop scrollX={scrollX}/>
    <Square scrollX={scrollX}/>
    <Animated.FlatList
    data={homedata}
    keyExtractor={(item) => item.key}
    horizontal
    scrollEventThrottle={32}
    onScroll={Animated.event(
      [{nativeEvent: {contentOffset: { x: scrollX } } }],
      {useNativeDriver: false}
    )}
    contentContainerStyle={{ paddingBottom: 100}}
    showHorizontalScrollIndicator={false}
    pagingEnabled
    renderItem={({item}) => {
      return (
        <View style={{ width, alignItems: 'center', padding: 20}}>
          <View style={{flex: 0.7, justifyContent:'center'}}>
          <Image source={{uri: item.image}}
                 style={{
                   width: width / 2,
                   height: width / 2,
                   resizeMode: 'contain',
                 }}
        />
         </View>
            <View style={{flex: 0.3}}>
              <Text style={{
                fontWeight: 'bold', 
                fontSize: 26, 
                marginBottom: 10,
                color: 'white'}}>{item.title}</Text>
              <Text style={{ fontWeight: '300', color: 'white', marginBottom: 40}}>{item.description}</Text>
              <TouchableOpacity 
                style ={{
                    height: 40,
                    width: '100%',
                    borderRadius: 5,
                    backgroundColor: '#5a60a3',
                }}>
            <Button
            onPress={() => navigation.navigate('Menu')}
            title="Let's get started!"
            color='#6f7294'
            accessibilityLabel="Learn more about this button"
            
          /> 
          </TouchableOpacity>
          </View>
        </View>
      );
    }}
 />
 <Indicator scrollX={scrollX} />
    </View>
  );
}

function MenuScreen({navigation}) {
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const ref = React.useRef();

  return (
    <Transitioning.View 
      ref={ref}
      transition = {transition}
      style = {styles.container}>
      <StatusBar hidden />
      {aboutus.map(({ bgImage, color, category, subCategories}, index) => {
        
        return ( 
        <TouchableOpacity 
        key={category} 
        onPress={() =>  {
          ref.current.animateNextTransition();
          setCurrentIndex(index === currentIndex ? null : index);
          navigation.navigate("Aboutus")
        }} 
        style ={styles.cardContainer}
        activeOpacity={0.9}>
        <View style={[styles.card]}>    
        <ImageBackground style = {styles.menubg} source = {bgImage}>
            <Text style = {[styles.heading, { color }]}>{category}</Text>
          {index === currentIndex && (  
            <View style={styles.subCategoriesList}> 
            {subCategories.map((subCategory) => (
                  <Text key={subCategory} style={[styles.body, {color}]}>{subCategory}</Text>
                ))}
            </View>
          )}
        </ImageBackground>
        </View>
        </TouchableOpacity>
        );
      })}
       {aboutdog.map(({ bgImage, color, category, subCategories}, index) => {
        
        return ( 
        <TouchableOpacity 
        key={category} 
        onPress={() =>  {
          ref.current.animateNextTransition();
          setCurrentIndex(index === currentIndex ? null : index);
          navigation.navigate("Aboutdogs")
        }} 
        style ={styles.cardContainer}
        activeOpacity={0.9}>
        <View style={[styles.card]}>    
        <ImageBackground style = {styles.menubg} source = {bgImage}>
            <Text style = {[styles.heading, { color }]}>{category}</Text>
          {index === currentIndex && (  
            <View style={styles.subCategoriesList}> 
            {subCategories.map((subCategory) => (
                  <Text key={subCategory} style={[styles.body, {color}]}>{subCategory}</Text>
                ))}
            </View>
          )}
        </ImageBackground>
        </View>
        </TouchableOpacity>
        );
      })}
       {services.map(({ bgImage, color, category, subCategories}, index) => {
        
        return ( 
        <TouchableOpacity 
        key={category} 
        onPress={() =>  {
          ref.current.animateNextTransition();
          setCurrentIndex(index === currentIndex ? null : index);
          navigation.navigate("Services")
        }} 
        style ={styles.cardContainer}
        activeOpacity={0.9}>
        <View style={[styles.card]}>    
        <ImageBackground style = {styles.menubg} source = {bgImage}>
            <Text style = {[styles.heading, { color }]}>{category}</Text>
          {index === currentIndex && (  
            <View style={styles.subCategoriesList}> 
            {subCategories.map((subCategory) => (
                  <Text key={subCategory} style={[styles.body, {color}]}>{subCategory}</Text>
                ))}
            </View>
          )}
        </ImageBackground>
        </View>
        </TouchableOpacity>
        );
      })}
      {medical.map(({ bgImage, color, category, subCategories}, index) => {
        
        return ( 
        <TouchableOpacity 
        key={category} 
        onPress={() =>  {
          ref.current.animateNextTransition();
          setCurrentIndex(index === currentIndex ? null : index);
          navigation.navigate("Medical")
        }} 
        style ={styles.cardContainer}
        activeOpacity={0.9}>
        <View style={[styles.card]}>    
        <ImageBackground style = {styles.menubg} source = {bgImage}>
            <Text style = {[styles.heading, { color }]}>{category}</Text>
          {index === currentIndex && (  
            <View style={styles.subCategoriesList}> 
            {subCategories.map((subCategory) => (
                  <Text key={subCategory} style={[styles.body, {color}]}>{subCategory}</Text>
                ))}
            </View>
          )}
        </ImageBackground>
        </View>
        </TouchableOpacity>
        );
      })}
      {contact.map(({ bgImage, color, category, subCategories}, index) => {
        
        return ( 
        <TouchableOpacity 
        key={category} 
        onPress={() =>  {
          ref.current.animateNextTransition();
          setCurrentIndex(index === currentIndex ? null : index);
          navigation.navigate("Contact")
        }} 
        style ={styles.cardContainer}
        activeOpacity={0.9}>
        <View style={[styles.card]}>    
        <ImageBackground style = {styles.menubg} source = {bgImage}>
            <Text style = {[styles.heading, { color }]}>{category}</Text>
          {index === currentIndex && (  
            <View style={styles.subCategoriesList}> 
            {subCategories.map((subCategory) => (
                  <Text key={subCategory} style={[styles.body, {color}]}>{subCategory}</Text>
                ))}
            </View>
          )}
        </ImageBackground>
        </View>
        </TouchableOpacity>
        );
      })}
      {gallery.map(({ bgImage, color, category, subCategories}, index) => {
        
        return ( 
        <TouchableOpacity 
        key={category} 
        onPress={() =>  {
          ref.current.animateNextTransition();
          setCurrentIndex(index === currentIndex ? null : index);
          navigation.navigate("Gallery")
        }} 
        style ={styles.cardContainer}
        activeOpacity={0.9}>
        <View style={[styles.card]}>    
        <ImageBackground style = {styles.menubg} source = {bgImage}>
            <Text style = {[styles.heading, { color }]}>{category}</Text>
          {index === currentIndex && (  
            <View style={styles.subCategoriesList}> 
            {subCategories.map((subCategory) => (
                  <Text key={subCategory} style={[styles.body, {color}]}>{subCategory}</Text>
                ))}
            </View>
          )}
        </ImageBackground>
        </View>
        </TouchableOpacity>
        );
      })}
      {team.map(({ bgImage, color, category, subCategories}, index) => {
        
        return ( 
        <TouchableOpacity 
        key={category} 
        onPress={() =>  {
          ref.current.animateNextTransition();
          setCurrentIndex(index === currentIndex ? null : index);
          navigation.navigate("Team")
        }} 
        style ={styles.cardContainer}
        activeOpacity={0.9}>
        <View style={[styles.card]}>    
        <ImageBackground style = {styles.menubg} source = {bgImage}>
            <Text style = {[styles.heading, { color }]}>{category}</Text>
          {index === currentIndex && (  
            <View style={styles.subCategoriesList}> 
            {subCategories.map((subCategory) => (
                  <Text key={subCategory} style={[styles.body, {color}]}>{subCategory}</Text>
                ))}
            </View>
          )}
        </ImageBackground>
        </View>
        </TouchableOpacity>
        );
      })}
    </Transitioning.View> 
  );
}



/* The Sceens this is where we input our contributions of screen modules */
function AboutusScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
        
      <ImageBackground
        style={{flex: 1}}

        source={{
          uri:
            'https://img5.goodfon.com/wallpaper/nbig/b/c9/sobaka-labrador-osheinik-chernyi-fon-pios.jpg',
        }} 
      >
        <View style = {aboutstyles.backCover}>
        <View style={aboutstyles.container}>
          <Text style={aboutstyles.titleStyle}>
           About Us 
          </Text>
          <View style={aboutstyles.centerContentStyle}>
          
            <Text style={aboutstyles.TextStyle}>
            Established in 2021, ‘DocPedia’, is the biggest strength pet retailer of administrations and answers for the lifetime needs of pets.
             At ‘DocPedia’ , we cherish pets, and we trust pets improve us as individuals. Consistently with each association, ‘DocPedia’ ‘s 
             enthusiastic partners help convey pet guardians closer to their pets so they can live progressively satisfied lives. This vision impacts all that we
              improve the situation our clients, the manner in which we bolster our partners, and how we offer back to our networks.
            </Text>
            
            <Text style={aboutstyles.TextStyle}>
            We utilize around 56,000 partners and work in excess of 1,650 pet stores in the Philippines, Japan and South Korea just as more than 200 in-store 
            ‘DocPedia’ PetsHotel puppy and feline boarding offices. ‘DocPedia’ gives a wide scope of competitively estimated pet sustenance and 
            items and offers one of a kind pet administrations including preparing, pet prepping, boarding, ‘Organization Name’ Doggie Day Camp and in-store pet receptions.
            </Text>
            
            
          </View>
        </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

function AboutDogScreen({navigation}) {
  return (
    <ScrollView>
    <SafeAreaView style={styles.container}>
        
    <ImageBackground
      style={{flex: 1}}

      source={{
        uri:
          'https://img5.goodfon.com/wallpaper/nbig/b/c9/sobaka-labrador-osheinik-chernyi-fon-pios.jpg',
      }} 
    >
      <View style = {aboutstyles.backCover}>
      <View style={aboutstyles.container}>
        <Text style={aboutstyles.titleStyle}>
         About Dogs 
        </Text>
        <View style={aboutstyles.centerContentStyle}>
        
          <Text style={aboutstyles.TextStyle}>
          Domestic dogs are mostly kept as pets,
          though many breeds are capable of surviving on their own,
          whether it’s in a forest or on city streets.
          A third of all households worldwide have a dog, 
          according to a 2016 consumer insights study. 
          This makes the domestic dog the most popular pet on the planet.
          </Text>
          
          <Text style={{color: 'white'}}>Dog Breeds</Text>

          <Text style={aboutstyles.TextStyle}>
          The Affenpinscher: loyal, curious, and famously amusing; 
          this almost-human toy dog is fearless out of all proportion to his size. 
          As with all great comedians, it’s the Affenpinscher’s apparent seriousness of purpose that makes his antics all the more amusing.
          </Text>

          <Text style={aboutstyles.TextStyle}>
          These sleek and racy, lean but muscular hounds work dusk to dawn in pursuit of the wily raccoon. 
          The sight of the American English Coonhound tearing through the moonlit woods, all sinew and determination, bawling their lusty night music, is coon-hunter heaven.
          </Text>

          <Text style={aboutstyles.TextStyle}>
          Intelligence is one of the American Leopard Hound's very best attributes. 
          The breed is loving and affectionate toward their family and they are extremely protective of children. American Leopards are one of the oldest tree dog breeds in the U.S. 
          and have extremely strong tracking abilities, often able to track prey for miles.
          </Text>
          
          <Text style={aboutstyles.TextStyle}>
          An archetypic water dog of France,
          the Barbet is a rustic breed of medium size and balanced proportions who appears in artwork as early as the 16th century.
          In profile, the Barbet is slightly rectangular with a substantial head and long, sweeping tail. 
          He has a long, dense covering of curly hair and a distinctive beard. An agile athlete, the Barbet has been used primarily to locate, flush, and retrieve birds. 
          He has a cheerful disposition and is very social and loyal.
          </Text>

          <Text style={aboutstyles.TextStyle}>
          Big, powerful, and built for hard work, 
          the Bernese Mountain Dog is also strikingly beautiful and blessed with a sweet, 
          affectionate nature. Berners are generally placid but are always up for a romp with the owner, whom they live to please.
          </Text>

          <Text style={aboutstyles.TextStyle}>
          The Chihuahua is a tiny dog with a huge personality. 
          A national symbol of Mexico, these alert and amusing "purse dogs" stand among the oldest breeds of the Americas,
          with a lineage going back to the ancient kingdoms of pre-Columbian times.
          </Text>

          <Text style={aboutstyles.TextStyle}>
          Generally considered dogkind’s finest all-purpose worker, 
          the German Shepherd Dog is a large, agile, muscular dog of noble character and high intelligence. 
          Loyal, confident, courageous, and steady, the German Shepherd is truly a dog lover’s delight.
          </Text>

          <Text style={aboutstyles.TextStyle}>
          Generally considered dogkind’s finest all-purpose worker, 
          the German Shepherd Dog is a large, agile, muscular dog of noble character and high intelligence. 
          Loyal, confident, courageous, and steady, the German Shepherd is truly a dog lover’s delight.
          </Text>

          <Text style={aboutstyles.TextStyle}>
          The sweet-faced, lovable Labrador Retriever is America’s most popular dog breed. 
          Labs are friendly, outgoing, and high-spirited companions who have more than enough 
          affection to go around for a family looking for a medium-to-large dog.
          </Text>

          <Text style={aboutstyles.TextStyle}>
          The Rottweiler is a robust working breed of great strength descended from the mastiffs of the Roman legions. 
          A gentle playmate and protector within the family circle, the Rottie observes the outside world with a self-assured aloofness.
          </Text>

          <Text style={aboutstyles.TextStyle}>
          The Golden Retriever, an exuberant Scottish gundog of great beauty, stands among America’s most popular dog breeds. 
          They are serious workers at hunting and field work, as guides for the blind, and in search-and-rescue, enjoy obedience and other competitive events, 
          and have an endearing love of life when not at work.  
          </Text>
          <Button
            onPress={() => navigation.navigate('Aboutdog2')}
            title="More Information"
            color='#6f7294'
            accessibilityLabel="Learn more about this button"
            
          /> 
        </View>
      </View>
      </View>
    </ImageBackground>
  </SafeAreaView>
  </ScrollView>
);
};

function AboutDog2Screen({navigation}) {
  return (
    <ScrollView>
    <ImageBackground
    style={{flex: 1}}

    source={{
      uri:
        'https://i.pinimg.com/originals/16/51/a7/1651a7e049cf443edc1cffe560600e0f.jpg',
    }}
  >
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 40, }}>
    <Text style={adstyles.title}>About Dogs</Text>
      <Image source={{uri: 'https://www.ancarevet.com/sites/default/files/styles/large/public/labrador-retriever-dog-breed-info.jpg?itok=-Z_ky5J6'}}
       style={adstyles.Pic} />
      <Text style={adstyles.Name}> Labrador Retriever</Text>
       <Text style={adstyles.Desc}> The Labrador Retriever, often abbreviated to Labrador, is a breed of retriever-gun dog from the United Kingdom that was developed from imported Canadian fishing dogs. The Labrador is one of the most popular dog breeds in a number of countries in the world, particularly in the Western world</Text>
      <Image source={{uri: 'https://cdn.buttercms.com/YJo7nqkkQzuvPJdYYDcn'}}
       style={adstyles.Pic} />
       <Text style={adstyles.Name}>German Shepherds</Text>
      <Text style={adstyles.Desc}> The German Shepherd is a breed of medium to large-sized working dog that originated in Germany. According to the FCI, the breed's English language name is German Shepherd Dog.</Text>
      <Image source={{uri: 'https://hips.hearstapps.com/ghk.h-cdn.co/assets/16/08/gettyimages-147786673.jpg?crop=0.666xw:1.00xh;0.128xw,0&resize=768:*'}}
       style={adstyles.Pic} />
       <Text style={adstyles.Name}>Golden Retrievers</Text>
      <Text style={adstyles.Desc}> The Golden Retriever is a medium-large gun dog that was bred to retrieve shot waterfowl, such as ducks and upland game birds, during hunting and shooting parties. The name "retriever" refers to the breed's ability to retrieve shot game undamaged due to their soft mouth</Text>
      <Image source={{uri: 'https://hips.hearstapps.com/ghk.h-cdn.co/assets/16/08/gettyimages-149263578.jpg?crop=0.661xw:0.992xh;0.211xw,0&resize=768:*'}}
       style={adstyles.Pic} />
       <Text style={adstyles.Name}>French Bulldogs</Text>
       <Text style={adstyles.Desc}> The French Bulldog is a breed of domestic dog, bred to be companion dogs. The breed is the result of a cross between Toy Bulldogs imported from England, and local ratters in Paris, France, in the 1800s. They are stocky, compact dogs with a friendly, mild-mannered temperament.</Text>
      <Image source={{uri: 'https://hips.hearstapps.com/ghk.h-cdn.co/assets/16/08/gettyimages-540833297.jpg?crop=0.652xw:0.979xh;0.138xw,0&resize=768:*'}}
        style={adstyles.Pic} />
       <Text style={adstyles.Name}>Bulldogs</Text>
       <Text style={adstyles.Desc}> The German Shepherd is a breed of medium to large-sized working dog that originated in Germany. According to the FCI, the breed's English language name is German Shepherd Dog.</Text>
      <Image source={{uri: 'https://hips.hearstapps.com/ghk.h-cdn.co/assets/16/08/gettyimages-462376265.jpg?crop=1.00xw:0.668xh;0,0.00115xh&resize=768:*'}}
       style={adstyles.Pic} />
       <Text style={adstyles.Name}>Beagles</Text>
       <Text style={adstyles.Desc}> The beagle is a breed of small hound that is similar in appearance to the much larger foxhound. The beagle is a scent hound, developed primarily for hunting hare.</Text>
       <Image source={{uri: 'https://hips.hearstapps.com/ghk.h-cdn.co/assets/18/01/1515086973-standard-poodle.jpg?crop=1.00xw:0.734xh;0,0.234xh&resize=768:*'}}
       style={adstyles.Pic} />
       <Text style={adstyles.Name}>Poodles</Text>
       <Text style={adstyles.Desc}> The Poodle, called the Pudel in German and the Caniche in French, is a breed of water dog. The breed is dived into four varieties based on size, the Standard Poodle, Medium Poodle, Miniature Poodle and Toy Poodle, although the Medium Poodle variety is not universally recognised.</Text>
       <Image source={{uri: 'https://hips.hearstapps.com/ghk.h-cdn.co/assets/18/01/1515102470-rottweiler.jpg?crop=0.706xw:1.00xh;0,0&resize=768:*'}}
       style={adstyles.Pic} />
       <Text style={adstyles.Name}>Rottweilers</Text>
       <Text style={adstyles.Desc}> The Rottweiler is a breed of domestic dog, regarded as medium-to-large or large. The dogs were known in German as Rottweiler Metzgerhund, meaning Rottweil butchers' dogs, because their main use was to herd livestock and pull carts laden with butchered meat to market. </Text>
       <Image source={{uri: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-staring-in-countryside-royalty-free-image-580095408-1553112843.jpg?crop=0.957xw:0.957xh;0.0398xw,0.0433xh&resize=768:*'}}
       style={adstyles.Pic} />
       <Text style={adstyles.Name}>German Shorthaired Pointers</Text>
       <Text style={adstyles.Desc}> The German Shorthaired Pointer is a medium to large sized breed of dog developed in the 19th century in Germany for hunting. </Text>
       <Image source={{uri: 'https://hips.hearstapps.com/ghk.h-cdn.co/assets/17/29/yorkie-yorkshire-terrier.jpg?crop=0.998xw:0.669xh;0,0.174xh&resize=768:*'}}
       style={adstyles.Pic} />
       <Text style={adstyles.Name}>Yorkshire Terriers</Text>
       <Text style={adstyles.Desc}>The Yorkshire Terrier is one of the smallest dog breed of terrier type, and of any dog breed. The breed developed during the 19th century in Yorkshire, England. Ideally its maximum size is 7 pounds. </Text>
    </View>
    </ImageBackground>
    </ScrollView>
  );
};

function ServicesScreen({navigation}) {
  return (
      <SafeAreaView style={servstyles.containerService}>
        <ImageBackground source={dogService} style={servstyles.imageService}>
        <ScrollView style={servstyles.scrollViewService}>
          <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:50, }}>Services</Text>
          <View style={{ borderBottomColor: '#000000', borderBottomWidth: 1, paddingTop:13, marginBottom:13,
          marginHorizontal:10, borderStyle: 'dotted'}}></View>
          <Text style={{backgroundColor:'e6e6e6', color:'#f53155', fontSize:20, 
          marginHorizontal:20, padding:18, borderRadius: 30,}}>
            "We connect you to professionals that can help you near your neighborhood and give
            proven advice and treatments for the health of your Best Buddies!"
          </Text>
          <Text style={servstyles.textService}>
          {"\n\n"}
          <Text style={servstyles.textHeadService}>Dog Illness Advisory</Text>
            {"\n\n"}
  Our services provide Dog Owners advisory on dog illnesses along with 
  symptoms both visible and invisible that the owner can observe. 
            {"\n\n"}
            <Text style={servstyles.textHeadService}>Veterinarian Professional Service</Text>
            {"\n\n"}
  Our Services provide locations of veterinarian clinics near the home owners location 
  for any dog illnesses that require a professional veterinarian to handle. 
            {"\n\n"}
            <Text style={servstyles.textHeadService}>Home Treatment Remedies</Text>
            {"\n\n"}
  Our Services include home remedies that the pet owner can mix as a safe and alternative
  option for cheap and easy medicine for ailing pet dogs. 
            {"\n\n"}
            <Text style={servstyles.textHeadService}>Dog Grooming</Text>
            {"\n\n"}
  Our Services provide instructions to home owners steps they can take in
  keeping their pet dogs fit and healthy to strengthen their immunity to illnesses. 
          </Text>
        </ScrollView>
        </ImageBackground>
      </SafeAreaView>
  );
};

function MedicalScreen({navigation}) {
  return (
    <ScrollView>
       <SafeAreaView style={styles.container}>
       <ImageBackground source={medbg} style={{height: '100%', width: '100%', resizeMode:'cover'}}>
        <View style = {aboutstyles.backCover}>
        <View style={aboutstyles.container}>
        <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:40, }}>  Canine parvo virus Information   {"\n"}</Text>
     
          <View style={aboutstyles.centerContentStyle}> 
            <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:30, }}>Canine parvovirus{"\n"}{"\n"}</Text>
  
  <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}> Parvo is caused by the canine parvovirus type 2. The virus is very contagious and attacks the gastrointestinal system, 
  causing fever, vomiting and severe, often bloody, diarrhea. It is spread by direct contact between dogs as well as by contaminated stool, surfaces, bowls, collars, leashes, equipment, and the hands and clothing of people. It can also survive
   in the soil for years, making the virus hard to kill. Treating parvo can be very expensive and many dogs die from parvo despite
   intensive treatment.   {"\n"}{"\n"} </Text>
   <Text style={{textAlign: 'center', color:'white', fontSize:20, }}>Fortunately, there is a vaccine for parvo. It is considered a "core" vaccine and is recommended for every dog. {"\n"}{"\n"} </Text>
  <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:40, }}>Treatment{"\n"}{"\n"}</Text>
  <Text style={{textAlign: 'center', color:'white', fontSize:20, }}>Dogs that develop the disease tend to show symptoms of the illness within 3 to 7 days. The major symptoms of Parvo include: 
  {"\n"}{"\n"}
  
  severe, bloody diarrhea
  {"\n"}{"\n"}
   lethargy
   {"\n"}{"\n"}
  anorexia
  {"\n"}{"\n"}
  Fever
  {"\n"}{"\n"}
   vomiting
   {"\n"}{"\n"}
  severe weight loss
  {"\n"}{"\n"}
  dehydration
  {"\n"}{"\n"}
  red, inflamed tissue around the eyes and mouth
  {"\n"}{"\n"}
  rapid heart beat
  {"\n"}{"\n"}
  pain or discomfort
  {"\n"}{"\n"}
  low body temperature
  {"\n"}{"\n"}
  </Text>
  <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:40, }}>Cause{"\n"}{"\n"}</Text>
  <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>There are a variety of risk factors for Parvo, but the virus is most commonly 
  transmitted either by direct contact with an infected dog, or indirectly, by the fecal-oral route.
   There is evidence that the virus can live in ground soil for up to a year.{"\n"}{"\n"}</Text>
   <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:40, }}>   Treatment{"\n"}{"\n"}</Text>
   <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>Goals of parvo treatment include keeping the pet hydrated, controlling nausea and vomiting, preventing secondary bacterial infections 
  and controlling abdominal pain. Hospitalization is needed so medications and fluids can be given through injections. Parvo pets have a
   very difficult time keeping oral medications, food and water down so successful home treatment is extremely difficult to achieve. 
   Pets can be hospitalized up to 7 days in some cases but in most cases 3-5 days. The survival rate for hospitalized parvo dogs is approximately 90%.
    Pets are able to go home when they are hydrated, no longer vomiting and are eating willingly. Pets with parvo can continue to shed the disease for up to a month after recovery so it is important to keep them away from public places and other pets during this time.
   They should get vaccinated for parvo about 3-4 weeks after treatment is complete.{"\n"}{"\n"}</Text>
            <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:40, }}>Videos about parvo{"\n"}</Text>       
            <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>https://www.youtube.com/watch?v=VaNk0p6ayaQ{"\n"}{"\n"}</Text>         
            <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:40, }}>Recommended Article {"\n"}</Text>
            <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>https://emergencyvetsusa.com/how-to-treat-parvo-at-home/</Text>
        <View style={aboutstyles.container}>
          <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:40, }}>Distemper information</Text>
          <View style={aboutstyles.centerContentStyle}>
            <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:40, }}>Canine Distemper{"\n"}{"\n"}</Text>
            <Text style={{textAlign: 'left', color:'#4ab5f7', fontSize:40, }}>What Is Canine Distemper?{"\n"}</Text>
            <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
  Canine distemper should sound familiar to you if your dog is up-to-date on his vaccinations. Veterinarians consider the distemper 
  vaccine to be a core vaccination, along with the parvovirus, canine adenovirus, and rabies vaccines.
  {"\n"}
  The disease is highly contagious and potentially lethal. A paramyxovirus causes distemper in dogs, and it is closely related to
   the measles and rinderpest viruses. It causes severe illness in the host by attacking multiple body systems, 
  resulting in a widespread infection that is difficult to treat.  
  {"\n"}{"\n"}
   Fortunately, there is an effective vaccine to protect your dog from this deadly disease.
   The canine distemper vaccine is considered a "core" vaccine and is recommended for every dog.
   {"\n"}{"\n"}
  </Text>
   <Text style={{textAlign: 'left', color:'#4ab5f7', fontSize:40, }}>    How Is Canine Distemper Spread?{"\n"}{"\n"}</Text>
   <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
  There are three ways dogs can get canine distemper:
  {"\n"}
  Through direct contact with an infected animal or object
  {"\n"}
  Through airborne exposure
  {"\n"}
  Through the placenta
  {"\n"}{"\n"}
  Canine distemper is spread through direct contact or airborne exposure, rather like the common cold in humans. 
  When an infected dog or wild animal coughs, sneezes, or barks, he releases aerosol droplets into the environment, 
  infecting nearby animals and surfaces, like food and water bowls.
  {"\n"}{"\n"}
  The good news is that the virus does not last long in the environment and can be destroyed by most disinfectants. 
  The bad news is that distemper-infected dogs can shed the virus for up to several months, putting dogs around them at risk.
  {"\n"}{"\n"}
   Dogs are not the only animals that can get distemper. Wild animals like raccoons, foxes, wolves, coyotes, skunks, ferrets,
    and mink can also get distemper. This means that an outbreak of distemper in the local wildlife population can put dogs at risk for catching 
   the disease even if they do not come into contact with other dogs.
   {"\n"}{"\n"}
  Bitches can also spread the virus through the placenta to their puppies, which is one of the reasons
   why it is important to fully vaccinate any dog you plan to breed.
   {"\n"}{"\n"}
  </Text>
  <Text style={{textAlign: 'left', color:'#4ab5f7', fontSize:40, }}> 
  What Are the Symptoms of Canine Distemper?
  {"\n"}
          {"\n"}       
          </Text>
          <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
   Distemper dogs experience a wide range of symptoms depending on how advanced the disease is in their bodies. 
   Once a dog becomes infected, the virus initially replicates in the lymphatic tissue of the respiratory tract
    before moving on to infect the rest of the dog’s lymphatic tissue, the respiratory tract, the GI tract, the urogenital epithelium,
    the central nervous system, and optic nerves. This results in two stages of symptoms.
    {"\n"}{"\n"}
  </Text>
  <Text style={{textAlign: 'left', color:'#4ab5f7', fontSize:40, }}> 
  Stage One:   
  {"\n"}{"\n"}   
  </Text>
  <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
  The first symptom of distemper in dogs is usually watery to pus-like discharge from his eyes, followed by fever, 
  loss of appetite, and clear nasal discharge. Most dogs develop a fever approximately 3-to-6 days after being infected, 
  but the initial symptoms depend on the severity of the case and how the patient reacts to it. 
  In general, the symptoms associated with distemper in dogs during the first stages of infection are:
  {"\n"}{"\n"}
  Fever
  {"\n"}
  Clear nasal discharge
  {"\n"}
  Purulent eye discharge
  {"\n"}
  Lethargy
  {"\n"}
  Anorexia
  {"\n"}
  Coughing
  {"\n"}
  Vomiting
  {"\n"}
  Diarrhea
  {"\n"}
  Pustular dermatitis (rarely)
  {"\n"}
  Inflammation of the brain and spinal cord
  {"\n"}{"\n"}
  If a dog infected with distemper survives the acute stage of the illness, he may also develop hyperkeratosis of
   the paw pads and nose, which gives distemper the nickname “hard pad disease.” 
  This distemper symptom causes the pads of a dog’s feet to harden and enlarge and is uncomfortable.
  {"\n"}{"\n"}
  One of the other risks associated with distemper in dogs is a secondary bacterial infection that attacks when a dog’s immune system is compromised by the distemper virus. 
  Secondary bacterial infections can cause respiratory and GI symptoms, including:
  {"\n"}{"\n"}
  Vomiting
  {"\n"}
  Diarrhea
  {"\n"}
  Difficulty breathing
  {"\n"}
  Change in respiratory rate
  {"\n"}
  Pneumonia
  {"\n"}
  </Text>
  <Text style={{textAlign: 'left', color:'#4ab5f7', fontSize:40, }}> 
  Stage Two:
  </Text>
  <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
          {"\n"}
  Head tilt
  {"\n"}
  Circling
  {"\n"}
  Partial or full paralysis
  {"\n"}
  Seizures
  {"\n"}
  Nystagmus (repetitive eye movements)
  {"\n"}
  Muscle twitching
  {"\n"}
  Convulsions with increased salivation and chewing motions
  {"\n"}
  Death
  {"\n"}{"\n"}
  </Text>
  <Text style={{textAlign: 'left', color:'#4ab5f7', fontSize:40, }}> 
   What Dogs Are Most at Risk for Distemper?
  {"\n"}{"\n"}
  </Text>
  <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
   Distemper is a risk to all dogs, but unvaccinated dogs and puppies under four months old are particularly susceptible to canine distemper. 
   If your puppy shows any symptoms of distemper, call your vet immediately.
   {"\n"}{"\n"}
   </Text>
  <Text style={{textAlign: 'left', color:'#4ab5f7', fontSize:40, }}> 
   How to Treat Canine Distemper
   {"\n"}{"\n"}
  </Text>
  <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
  There is no cure for canine distemper. Veterinarians diagnose distemper through a combination of clinical signs and diagnostic tests,
   or through a postmortem necropsy. Once diagnosed, care is purely supportive. Veterinarians treat the diarrhea, vomiting, and neurological 
   symptoms, prevent dehydration, and try to prevent secondary infections. Most vets recommend that dogs be hospitalized and separated from 
   other dogs to prevent the spread of infection.
   {"\n"}{"\n"}
  The survival rate and length of infection depend on the strain of the virus and on the strength of the dog’s immune system. Some cases resolve as quickly as 10 days. 
  Other cases may exhibit neurological symptoms for weeks and even months afterward.
  {"\n"}{"\n"}
  </Text>
  <Text style={{textAlign: 'left', color:'#4ab5f7', fontSize:40, }}> 
  Preventing Canine Distemper
  {"\n"}{"\n"}
          </Text>
          <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
          Canine distemper is entirely preventable. There are several things you can do to prevent distemper in dogs:
          {"\n"}{"\n"}
          Make sure your puppy gets the full series of distemper vaccinations
          {"\n"}
          Keep distemper vaccinations up-to-date throughout your dog’s life and avoid any gaps in vaccinations
          {"\n"}
          Keep your dog away from infected animals and wildlife
          {"\n"}
          Vaccinate pet ferrets for distemper
          {"\n"}
          Be careful socializing your puppy or unvaccinated dog, especially in areas where dogs
          {"\n"}
          congregate, like dog parks, classes, and doggy day care
          {"\n"}
          </Text>
          <Text style={{textAlign: 'left', color:'#4ab5f7', fontSize:40, }}> 
            Videos about distemper
            {"\n"}
            </Text>
  <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
  https://www.youtube.com/watch?v=5FUQaXpysHg
  {"\n"} {"\n"}
  Recommended Article 
  {"\n"}
  https://pets.webmd.com/dogs/canine-distemper#1
  {"\n"} {"\n"}
  </Text>
       <View style = {medstyles.backCover}>
        <View style={medstyles.container}>
        <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:40, }}> 
          Canine influenza ("canine flu" or "dog flu") information
          </Text>
          <View style={medstyles.centerContentStyle}> 
            <Text style={{textAlign: 'left', color:'#4ab5f7', fontSize:40, }}> 
            Canine influenza ("canine flu" or "dog flu")
            {"\n"} {"\n"}
          </Text>
  <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
  Dog flu, or canine influenza virus, is an infectious respiratory disease caused by an influenza A virus, similar to the viral strains that cause influenza in people. There are two known 
  strains of dog flu found in the United States:
  {"\n"} {"\n"}
  H3N8
  {"\n"}
  H3N2
  {"\n"} {"\n"}
   The H3N8 strain actually originated in horses. The virus jumped from horses to dogs, becoming a canine influenza virus around 2004, 
   when the first outbreaks affected racing Greyhounds at a track in Florida.
   {"\n"} {"\n"}
  H3N2, on the other hand, originated in Asia, where scientists believe it jumped from birds to dogs. H3N2 is the virus responsible for the 2015 and 2016 outbreaks 
  of canine influenza in the Midwest and continues to spread throughout the United States.
  {"\n"} {"\n"}
  </Text>
  <Text style={{textAlign: 'left', color:'#4ab5f7', fontSize:40, }}> 
  How Is Canine Influenza Spread?
  {"\n"}{"\n"}    
          </Text>  
          <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
          Like human forms of influenza, dog flu is airborne. Respiratory secretions escape into the environment in the form of coughing, 
          barking, and sneezing, where they are then inhaled by a new canine host. The dog flu also spreads through contaminated objects and environments, 
          like water bowls, collars, and kennel surfaces, or through contact with people who have had direct contact with an infected dog.
          {"\n"}{"\n"}
  Crowded areas like kennels, grooming parlors, day care centers, and dog parks are breeding grounds for diseases like canine influenza. 
  The close proximity of the dogs means that a barking, coughing, or sneezing dog can easily infect canines around him.
   This is made more dangerous by the fact that dogs are most contagious during the incubation period before they start exhibiting symptoms.
   {"\n"}{"\n"}
  </Text>
  <Text style={{textAlign: 'left', color:'#4ab5f7', fontSize:40, }}> 
  How Long Are Dogs Infected With Dog Flu Contagious?
  {"\n"}{"\n"}
          </Text>
   <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
   The incubation period of canine influenza is approximately 2-to-4 days from initial exposure to the dog flu virus. 
   Viral shedding starts to decrease after the fourth day, but dogs with H3N8 remain contagious for up to 10 days after exposure, and dogs with H3N2 remain contagious for up to 26 days. 
   Most vets recommend isolating dogs with H3N2 for at least 21 days to reduce the risk of transmission.
   {"\n"}
  Almost all dogs that come into contact with the disease will contract it, but not all dogs that become infected show symptoms of the virus. 
  About 20-25 percent of dogs infected are asymptomatic, but these dogs can still spread the disease. If one of your canine companions catches 
  the flu, but the other seems unaffected, remember that he could still have the virus. 
  Talk to your vet about quarantine procedures for all dogs in your household.
  {"\n"}
  </Text>
  <Text style={{textAlign: 'left', color:'#4ab5f7', fontSize:40, }}> 
  What Are the Symptoms of Dog Flu? 
  {"\n"} 
          </Text>
          <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
   So, how do you know if your pup has dog flu? There are several symptoms all owners should be aware of. Dog flu cases range from mild to severe and, 
   unlike human influenzas, are not seasonal. Keep an eye out for the following symptoms year-round:
   {"\n"}{"\n"}
  Coughing (both moist and dry)
  {"\n"}
  Sneezing
  {"\n"}
  Nasal discharge
  {"\n"}
  Purulent nasal discharge
  {"\n"}
  Runny eyes
  {"\n"}
  Fever
  {"\n"}
  Lethargy
  {"\n"}
  Difficulty breathing
  {"\n"}{"\n"}
  Dog flu symptoms resemble kennel cough symptoms, which is also an illness you should
   talk to your veterinarian about as soon as you notice symptoms.
   {"\n"}{"\n"}
  Most cases of dog flu are mild, but severe cases do occur. In those instances, dogs develop pneumonia, difficulty breathing, and a high fever.
   Luckily, the mortality rate is relatively low, with less than 10 percent of dog flu cases resulting in fatalities.
   {"\n"}{"\n"}
   </Text>
   <Text style={{textAlign: 'left', color:'#4ab5f7', fontSize:40, }}> 
  Treating Dog Flu
  {"\n"}
          {"\n"}
          </Text>
          <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
  The canine influenza virus requires the attention of a veterinarian. 
  In some states, vets are required to report cases of canine influenza to the government to help monitor the spread of the disease.
  {"\n"}{"\n"}
  There is no cure for dog flu. Treatment is supportive, and your veterinarian can advise you on the best ways to keep your dog comfortable during his illness and recovery. Some dogs may require supportive care, such as fluids, to aid their recovery, as well as nonsteroidal anti-inflammatory medications to reduce fevers. 
  Your vet will help you come up with a nutritional plan and may prescribe antibiotics to treat secondary bacterial infections.
  {"\n"}{"\n"}
  Your vet will also inform you about appropriate quarantine procedures to prevent the spread of dog flu, depending on the strain of the virus your dog contracts, 
  and can give you information about disinfectant solutions to use in your home to help kill the virus.
  {"\n"}{"\n"}
  Call your vet ahead of time to let her know that your dog is showing symptoms of a respiratory infection. Both kennel cough and dog flu are highly contagious, and your vet may request that you keep your dog outside 
  until your appointment time to prevent the risk of transmission to other patients in the waiting room.
  {"\n"}{"\n"}
  </Text>
  <Text style={{textAlign: 'left', color:'#4ab5f7', fontSize:40, }}> 
  Preventing Dog Flu
  {"\n"}
          {"\n"}  
          </Text>
          <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
  The best way to prevent your dog from contracting dog flu is to keep him away from public places or kennels with recently reported cases. If you come into contact with a dog that you suspect has dog flu or has recently been exposed to it, wash your hands, arms, and clothing before touching your own dog. 
  This will reduce the risk of transmission from you to your dog.
  {"\n"}
  {"\n"}
  There are vaccines available for both the H3N8 and H3N2 strains of canine influenza. Your vet may recommend the vaccine based on your lifestyle. For instance, if you live in an area with a high incidence of dog flu or if your dog regularly spends time in kennels or travels to shows around the country, then he could be at an increased risk of contracting canine 
  influenza and your vet may recommend the vaccine as a precaution.
  {"\n"}{"\n"}
  </Text>
          <Text style={{textAlign: 'left', color:'#4ab5f7', fontSize:40, }}> 
            Videos about Canine Influenza
            {"\n"}{"\n"}
            </Text>
            <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
            https://www.youtube.com/watch?v=EItJbx5Rc9w
            {"\n"}{"\n"}
  Recommended Article 
  {"\n"}
  https://todaysveterinarypractice.com/canine-influenza-new-strains-and-treatment/
  {"\n"}{"\n"}
  </Text>
       <View style = {medstyles.backCover}>
        <View style={medstyles.container}>
        <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:40, }}> 
          External parasites information
          </Text>
          <View style={medstyles.centerContentStyle}>
            <Text style={medstyles.TextStyle}>   
            <Text style={medstyles.titleStyle}>
            External parasites
            {"\n"}{"\n"}
          </Text>
          <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
  At some point in their lives, many pets experience discomfort caused by external parasites such as fleas,
   ticks, or mites on their skin or in their ears.
   {"\n"}{"\n"}
  These parasites can be extremely irritating to pets and can cause serious skin problems or even carry disease. Modern medicines make treatment, control, 
  and prevention of many external parasites much easier than in the past.
  {"\n"}{"\n"}
  </Text>
  <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:40, }}> 
  Fleas
  {"\n"}
          </Text>
          <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
  Fleas thrive when the weather is warm and humid. Depending on your climate, fleas may be a seasonal or year-round problem. 
  Your pet can pick up fleas wherever an infestation exists, often in areas frequented by other cats and dogs. Adult fleas are 
  dark brown, no bigger than a sesame seed, and able to move rapidly over your pet’s skin.
  {"\n"}{"\n"}
  Once the flea becomes an adult, it spends virtually all of its time on your pet. Female fleas begin laying eggs within
   24 hours of selecting your pet as a host, producing up to 50 eggs each day. These eggs fall from your pet onto the floor or 
   furniture, including your pet’s bed, or onto any other indoor or outdoor area where your pet happens to go. Tiny, worm-like 
   larvae hatch from the eggs and burrow into carpets, under furniture, or into soil before spinning a cocoon. The cocooned flea 
   pupae can lie dormant (inactive) for weeks before emerging as adults that are ready to infest (or re-infest) your pet. The result
    is a flea life cycle of anywhere from 12 days to 6 months, depending on environmental factors such as temperature and humidity.
    {"\n"}{"\n"}
    </Text>
    <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:40, }}> 
   Diagnosis, risks and consequences
   {"\n"}{"\n"}
          </Text> 
          <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
  You may not know that your pet has fleas until their number increases to the point that your pet is obviously uncomfortable. 
  Signs of flea problems range from mild redness to severe scratching that can lead to open sores and skin infections (“hot spots”).
   One of the first things you may notice on a pet with fleas is “flea dirt”—the black flea droppings left on your pet’s coat. 
  You may not actually see the fleas themselves, but they can still be on your pet and in the environment.
  {"\n"}{"\n"}
  Fleas bite animals and suck their blood; young or small pets with heavy flea infestations may become anemic. 
  Some pets can develop an allergy to flea saliva that may result in more severe irritation and scratching; these 
  pets can become severely itchy from just one or two flea bites. Also, pets can become infected with certain types 
  of tapeworms if they ingest fleas carrying tapeworm eggs (a pet using its teeth to scratch the flea bites often eats the fleas). 
  In areas with moderate to severe flea infestations, people may also be bitten by fleas. 
  While fleas are capable of transmitting several infectious diseases to pets and people, this is rare.
  {"\n"}{"\n"}
  </Text>
  <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:40, }}> 
  Treatment and control
  {"\n"}{"\n"}
          </Text>
          <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
          Your veterinarian will recommend an appropriate flea control plan for your pet based on your needs,
           your pet’s needs and the severity of the flea infestation.
           {"\n"}{"\n"}
  Pets at risk for fleas should be treated during the flea season with an appropriate preventive. 
  Your veterinarian can recommend a product most suitable for your pet.
  {"\n"}{"\n"}
  Your veterinarian will recommend an appropriate flea control plan for your pet based on your needs, 
  your pet’s needs and the severity of the flea infestation.
  {"\n"}{"\n"}
  Because much of the flea’s life cycle is spent off of your pet, treating only your pet will not eliminate the problem.
   If you kill the adult fleas and do not kill the eggs, larvae and pupae, your pet will become re-infested when these fleas
    become adults and the cycle will start all over again. Therefore, in addition to treating your pet, reduce the flea population 
    in your house by thoroughly cleaning your pet’s sleeping quarters and vacuuming floors and furniture that your pet comes in contact with frequently. 
  Careful and regular vacuuming/cleaning of the pet’s living area helps to remove and kill flea eggs, larvae, and pupae.
  {"\n"}{"\n"}
  You may be advised to treat your house with insecticides to kill the fleas; consult with your veterinarian about products 
  safe for use around pets and children. Flea larvae are more resistant than adult fleas to insecticides. With moderate and 
  severe flea infestations, you may also be advised to treat your yard. 
  Your veterinarian can recommend an appropriate course of action and suggest ways to prevent future flea infestations.
  {"\n"}{"\n"}
  </Text>
  <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:40, }}> 
  Ticks
  {"\n"}{"\n"}
          </Text>
          <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
          Tick basics
          {"\n"}{"\n"}
   Ticks are commonly found in wooded areas, brush, shrubs and wild undergrowth, and any animal 
   (or human, for that matter) that enters these environments is at risk of becoming a tick’s host. 
   Immature ticks often feed on small, wild animals found in forests, prairies, and brush. Adult ticks 
   seek larger hosts like dogs and cats which venture into these habitats. Tick exposure may be seasonal, 
   depending on geographic location. There are many different species of ticks that can affect dogs and cats.
   {"\n"}
  Ticks are capable of spreading serious infectious diseases.
  {"\n"}
  </Text>
  <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:40, }}> 
  Diagnosis, risks and consequences
  {"\n"}{"\n"}   
          </Text>
          <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
          Ticks are most often found around your dog’s neck, in the ears, in the folds between the legs and the body, 
          and between the toes, but they can be found anywhere on the body and are usually easily seen or felt. Cats may 
          have ticks on their neck or face. Tick bites can cause skin irritation and heavy infestations can cause anemia in pets.
           An adult female tick can ingest up to 100 times her weight in blood! Ticks are capable of spreading serious infectious diseases
            (such as Lyme disease, Rocky Mountain Spotted Fever, and others) to the pets and the people on which they feed. 
          They can also cause tick paralysis. Disease risk varies by geographic area and tick species.
          {"\n"}{"\n"}
  </Text>
  <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:40, }}> 
  Treatment and control
  {"\n"}{"\n"}      
          </Text> 
          <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
   Prompt removal of ticks is very important because it lessens the chance of disease transmission from the tick to your pet. 
   Remove ticks by carefully using tweezers to firmly grip the tick as close to the pet’s skin as possible and gently and steadily
    pulling the tick free without twisting it or crushing the tick during removal. Crushing, twisting or jerking the tick out of the 
    skin while its head is still buried could result in leaving the tick’s mouth parts in your pet’s skin; this can cause a reaction 
    and may become infected. After removing the tick, crush it while avoiding contact with tick fluids that can carry disease. Do not 
    attempt to smother the tick with alcohol or petroleum jelly, or apply a hot match to it, 
   as this may cause the tick to regurgitate saliva into the wound and increase the risk of disease if the tick is infected.
   {"\n"}{"\n"}
  Pets at risk for ticks should be treated during the tick season with an appropriate preventive. 
  Your veterinarian can recommend a product best suited to your pet’s needs. Owners who take their 
  pets to tick-prone areas during camping, sporting, or hiking trips should examine their pets for 
  ticks immediately upon returning home and remove them from their pets. If your pet picks up ticks
   in your backyard, trimming bushes and removing brush may reduce your pet’s exposure and risk of infestation. And, 
  if you find ticks on your pet, don’t forget to check yourself for ticks, too!
  {"\n"}{"\n"}
  </Text>
  <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:40, }}> 
  Ear mites
  {"\n"}{"\n"}    
          </Text>
          <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
  Ear mites are common in young cats and dogs, and generally confine themselves to the ears and surrounding area.
   Mites are tiny and individual mites may be seen only with the aid of a microscope.
   Your pet can pick up ear mites by close contact with an infested pet or its bedding.
   {"\n"}{"\n"}
  </Text>
  <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:40, }}> 
  Diagnosis, risks and consequences
  {"\n"}{"\n"}  
          </Text>      
          <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
  Ear mites can cause intense irritation of the ear canal. Signs of ear mite infestation include excessive 
  head shaking and scratching of the ears. Your pet may scratch to the point that he/she creates bleeding 
  sores around his/her ears. Excessive scratching can also cause breakage of blood vessels in the earflap, 
  causing the formation of a pocket of blood (an aural hematoma) that may require surgery. A brown or black 
  ear discharge is common with ear mite infections, and secondary infections with bacteria or yeast can occur. 
  A swab of the discharge is usually examined under a microscope to confirm the presence of ear mites.
  {"\n"}{"\n"}
  </Text>
  <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:40, }}> 
  Treatment and control
  {"\n"}{"\n"}
          </Text>
          <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
  Treatment of ear mites involves thorough ear cleaning and medication. Your veterinarian can recommend an effective treatment plan.
  </Text>
  {"\n"}
  <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:40, }}> 
  Sarcoptic mange mites
  {"\n"}{"\n"}
          </Text>
          <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
  Sarcoptic mange mite basics
  {"\n"}{"\n"}
  Microscopic sarcoptic mange mites cause sarcoptic mange, also known as scabies. Sarcoptic mange can 
  affect dogs of all ages and sizes, during any time of the year. Sarcoptic mange mites are highly contagious to 
  other dogs and may be passed by close contact with infested animals, bedding, or grooming tools.
  {"\n"}{"\n"}
  </Text>
  <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:40, }}> 
  Diagnosis, risks and consequences
  {"\n"}{"\n"}
          </Text>
          <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
  Sarcoptic mange mites burrow through the top layer of the dog’s skin and cause intense itching. 
  Clinical signs include generalized hair loss, a skin rash, and crusting. Skin infections may develop secondary to the intense irritation.
   People who come in close contact with an affected dog may develop a skin rash and should see their physician. 
  Sarcoptic mange is usually confirmed by taking a skin scraping and examining it under a microscope.
  {"\n"}{"\n"}
  </Text>
  <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:40, }}> 
  Diagnosis, risks and consequences
  {"\n"}{"\n"}      
          </Text>
          <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
  Your vet will also inform you about appropriate quarantine procedures to prevent the spread of dog flu, depending on the strain of the virus your dog contracts, 
  and can give you information about disinfectant solutions to use in your home to help kill the virus.
  {"\n"}{"\n"}
  Call your vet ahead of time to let her know that your dog is showing symptoms of a respiratory infection. Both kennel cough and dog flu are highly contagious, and your vet may request that you keep your dog outside 
  until your appointment time to prevent the risk of transmission to other patients in the waiting room.
  {"\n"}{"\n"}
  </Text>
  <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:40, }}> 
  Treatment and control
  {"\n"}{"\n"}    
          </Text> 
          <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
  Dogs with sarcoptic mange require medication to kill the mites and additional treatment to soothe the skin and resolve related infections. 
  Cleaning and treatment of the dog’s environment is also necessary.
  {"\n"}{"\n"}
  </Text>
  <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:40, }}> 
  Demodectic mange mites 
  {"\n"}{"\n"}
          </Text>
  <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:40, }}> 
  Demodectic mange mite basics
  {"\n"}{"\n"}      
          </Text>         
          <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
  Demodectic mange caused by demodectic mange mites is mainly a problem in dogs. Demodectic mange mites are microscopic and not
   highly contagious. In general, 
  demodex mites are not spread to other animals or across species. A mother dog, however, may pass the mites to her puppies.
  {"\n"}{"\n"}
  </Text>
  <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:40, }}> 
  Diagnosis, risks and consequences
  {"\n"}{"\n"}        
          </Text>      
          <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
  Localized demodectic mange tends to appear in young dogs (usually less than 6 months old) as patches of scaly skin and redness around the eyes and mouth and, perhaps, the legs and trunk. Itching is not common with this type of mite 
  infestation unless a secondary infection has occurred. Unlike other types of mange, demodectic mange may signal an underlying medical condition, and your pet’s overall health should be carefully evaluated. Less commonly, young and old dogs experience a 
  more severe form of demodectic mange (generalized demodecosis) and can exhibit widespread patches of redness, hair loss, and scaly, 
  thickened skin Dogs with demodecosis can develop secondary bacterial infections which require additional treatment.
  {"\n"}{"\n"}
  Cats are rarely infected with demodex mites, and the cat demodex mite is not the same as the dog demodex mite. Affected cats develop hair loss, crusts and scaly skin around the face, neck and eyelids, and may excessively groom the areas. They may also be more itchy than dogs affected by demodex.
  {"\n"}{"\n"}
  Demodectic mange is usually confirmed by taking a skin scraping and examining it under a microscope.
  {"\n"}{"\n"}
  </Text>
  <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:40, }}> 
  Treatment and control
  {"\n"}{"\n"}        
          </Text>
          <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
        Your veterinarian will discuss treatment options with you. Treatment of dogs with localized demodectic mange generally results in favorable outcomes.
           Generalized demodecosis is more difficult to treat, and aggressive, extended treatment may be necessary.
           {"\n"}{"\n"}
           </Text>
           <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:40, }}> 
           Important points
           {"\n"}{"\n"}
          </Text>
          <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
  Look for fleas, ticks, and coat abnormalities any time you groom your dog or cat or when you return home from areas that are likely to have higher numbers of these parasites.
  {"\n"}
  Consult your veterinarian if your pet excessively scratches, chews, or licks his/her coat, or persistently shakes his/her head or scratches his/her ears.
  {"\n"}
  Prompt treatment of parasites lessens your pet’s discomfort, decreases the chances of disease transmission, and may reduce the degree of home infestation.
  {"\n"}
  Discuss the health of all family pets with your veterinarian when one pet becomes infested. Some parasites cycle among pets, making control of infestations difficult unless other pets are considered. Consult your veterinarian before beginning treatment.
  {"\n"}
  Tell your veterinarian if you have attempted any parasite remedies, as this may impact your veterinarian’s recommendation.
  Always follow label directions carefully when using flea and tick preventives.
  Be especially careful when applying insecticides to cats, as cats are particularly sensitive to these products. Never use a product that is not approved for cats because the results could be lethal.
  Leave treatment to the experts. Your veterinarian offers technical expertise and can assist you in identifying products that are most likely to effectively and safely control your pet’s parasite problem.
  </Text>
          </Text>
          <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:40, }}> 
  Videos about External parasites
            </Text>
            <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
  https://www.youtube.com/watch?v=WWh3gVdfu68
  </Text>
  <Text style={{textAlign: 'center', color:'#4ab5f7', fontSize:40, }}>
  Recommended Article 
  </Text>
  <Text style={{textAlign: 'auto', color:'white', fontSize:20, }}>
  https://www.valcaronanimalhospital.com/external-parasites.pml
  </Text>
          </View>
        </View>
        </View>  
          </View>
        </View>
        </View>    
          </View>
        </View>
        </View>
          </View>        
        </View>
        </ImageBackground>
    </SafeAreaView>
    </ScrollView>
  );
}

function ContactScreen({navigation}) {
  return (
    <View style={cstyles.container}>

    <ImageBackground source={require('./assets/bg1.jpg')} style={cstyles.image}/>
      
        <Image style={cstyles.pic1}       
            source={require('./assets/pic1.png')}
          />

      <View style={cstyles.cont} >
      <TextInput
            placeholder="Name"
            onChangeText={(Text) =>{this.setState({name: text})}} 
            style={cstyles.TextInput} placeholder="Enter Full Name"/>

      <TextInput
            placeholder="Mobile:"
            onChangeText={(Text) =>{this.setState({name: text})}} 
            style={cstyles.TextInput}/>

      <TextInput
            onChangeText={(Text) =>{this.setState({name: text})}} 
            style={cstyles.TextInput} placeholder="Subject"/> 
            
      <TextInput
          multiline={true}
          placeholder="Type your message"
          numberOfLines={10}
           onChangeText={(text) => this.setState({text})}
           style={cstyles.Textarea}/>  

      
      <Button style={cstyles.bot} title="Submit" onPress={() =>{this.submit()}}/>
       </View>
      <StatusBar style="auto" />
    </View>
  );
};

function GalleryScreen({navigation}) {
  const scrollX = React.useRef(new Animated.Value(0)).current;
   
    return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            <StatusBar hidden />
            <View style={[StyleSheet.absoluteFillObject]}>
              {gallerydata.map((image, index) => {
                const inputRange = [
                  (index - 1) * width,
                  index * width,
                  (index + 1) * width
                ]
                const opacity = scrollX.interpolate({
                  inputRange,
                  outputRange: [0, 1, 0]
                })
                return <Animated.Image 
                  key={`image-${index}`}
                  source={{uri: image}}
                  style={[
                    StyleSheet.absoluteFillObject,
                    {
                      opacity
                    }
                  ]}
                  blurRadius={50}
                />
              })}
            </View>
            <Animated.FlatList 
              data={gallerydata}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                { useNativeDriver: true}
              )}
              keyExtractor={(_, index) => index.toString()}
              horizontal
              pagingEnabled
              renderItem={({item}) => {
                return <View style={{width, justifyContent: 'center', alignItems:'center',
                                     shadowColor: '#000',
                                     shadowOpacity: .5,
                                     shadowOffset: {
                                       width: 0,
                                       height: 0,
                                     },
                                     shadowRadius: 20
                                     }}>
                    <Image source={{uri: item}} style={{
                      width: imageW,
                      height: imageH,
                      resizeMode: 'cover',
                      borderRadius: 16
                    }}/>
                  </View>
              }}
            />
        </View>
    );
};

function TeamScreen({navigation}) {
  const _scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView style={teamstyles.container}>
      <StatusBar hidden />
      <Circle scrollX={_scrollX} />
      <Image
        style={teamstyles.logo}
        source={require('./assets/docpetdia.png')}
      />
      <Animated.FlatList
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        horizontal
        keyExtractor={(item) => item.key}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: _scrollX } } }],
          { useNativeDriver: true }
        )}
        data={data}
        renderItem={({ item, index }) => (
          <Item {...item} index={index} scrollX={_scrollX} />
        )}
      />
      <Pagination scrollX={_scrollX} />
      <Ticker scrollX={_scrollX} />
    </SafeAreaView>
  );
}

/* The Sceens this is where we input our contributions of screen modules */

export default function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator >
      <Stack.Screen name="Home" component={HomeScreen}  options={{
          title: 'DogPedia',
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        <Stack.Screen name="Menu" component={MenuScreen}  options={{
          title: 'DogPedia',
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        <Stack.Screen name="Aboutus" component = {AboutusScreen}  options={{
          title: 'About our App',
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        <Stack.Screen name="Aboutdogs" component = {AboutDogScreen} options={{
          title: 'Information about Dogs',
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        <Stack.Screen name="Aboutdog2" component = {AboutDog2Screen} options={{
          title: 'Information about Dogs',
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        <Stack.Screen name="Services" component = {ServicesScreen} options={{
          title: 'Our Services',
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        <Stack.Screen name="Medical" component = {MedicalScreen} options={{
          title: 'Medical Recommendations',
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        <Stack.Screen name="Contact" component = {ContactScreen} options={{
          title: 'Contact Us',
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
         <Stack.Screen name="Gallery" component = {GalleryScreen} options={{
          title: 'Dog Gallery',
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
          <Stack.Screen name="Team" component = {TeamScreen} options={{
          title: 'The Developer Team',
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
   
  );
}

/* Home Module design */
const hstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
/* Home Module design */

/* Menu Module design */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  menubg: {
    width: '100%',
    height: '100%',
  },
  cardContainer: {
    flexGrow: 1,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 38,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -2,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.65)',
    textShadowOffset: {width: -1, height: 0.5},
    textShadowRadius: 5
  },
  body: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.65)',
    textShadowOffset: {width: -1, height: 0.5},
    textShadowRadius: 5,
  },
  subCategoriesList: {
    marginTop: 20,
  }
});

/* Menu Module design */

/* About Us Module design */
const aboutstyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 30,
    color: 'white',
  },
  TextStyle: {
    fontSize: 16,
    color: 'white',
    paddingLeft: 12,
    letterSpacing: 2,
  },
  backCover: {
    height: '100%',
    backgroundColor: 'rgba(14, 12, 12, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/* About Us Module design */

/* Products Module design */
const pstyles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor:"#E6E6E6",
  },
  listContainer:{
    alignItems:'center'
  },
  separator: {
    marginTop: 10,
  },
  
  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor:"white",
    flexBasis: '47%',
    marginHorizontal: 5,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage:{
    flex: 1,
    height: 150,
    width: null,
  },
  
  title:{
    fontSize:16,
    flex:1,
  },
  price:{
    fontSize:16,
    color: "red",
    marginTop: 5
  },
  buyNow:{
    color: "purple",
  },
  icon: {
    width:25,
    height:25,
  },

  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  socialBarButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});  
/* Products Module design */

/* Team Module design */
const teamstyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    position: 'relative',
  },
  
  itemStyle: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: width * 0.75,
    height: width * 0.75,
    resizeMode: 'contain',
    flex: 1,
  },
  textContainer: {
    alignItems: 'flex-start',
    alignSelf: 'flex-end',
    flex: 0.55,
  },
  heading: {
    color: '#444',
    textTransform: 'uppercase',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 10,
  },
  description: {
    color: '#ccc',
    fontWeight: '600',
    textAlign: 'left',
    width: width * 0.75,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
  },

  circleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: 'absolute',
    top: '20%',
  },
  ticker: {
    textTransform: 'uppercase',
    fontSize: TICKER_HEIGHT,
    lineHeight: TICKER_HEIGHT,
    fontWeight: '800',
    color: '#222',
  },
  tickerContainer: {
    height: TICKER_HEIGHT,
    overflow: 'hidden',
    position: 'absolute',
    top: 40,
    left: 20,
  },
  pagination: {
    position: 'absolute',
    right: 20,
    bottom: 40,
    flexDirection: 'row',
    height: DOT_SIZE,
  },
  paginationDot: {
    width: DOT_SIZE * 0.3,
    height: DOT_SIZE * 0.3,
    borderRadius: DOT_SIZE * 0.15,
  },
  paginationDotContainer: {
    width: DOT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationIndicator: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 2,
    borderColor: '#eee',
    position: 'absolute',
  },
  logo: {
    opacity: 0.9,
    height: LOGO_HEIGHT,
    width: LOGO_WIDTH,
    resizeMode: 'contain',
    position: 'absolute',
    left: 10,
    bottom: 10,
    transform: [
      { translateX: -LOGO_WIDTH / 2 },
      { translateY: -LOGO_HEIGHT / 2 },
      { rotateZ: '-90deg' },
      { translateX: LOGO_WIDTH / 2 },
      { translateY: LOGO_HEIGHT / 2 },
    ],
  },
});

/* Team Module design */

const adstyles = StyleSheet.create({
  
  title: {
    fontWeight: 'bold',
    fontSize :24,
     color: '#dcdcdc',
  },
  Name: {
    fontSize :20, 
    color: 'white', 
    paddingLeft: 12,
    letterSpacing: 1,
  },
  Pic: {
    width: 250,
     height: 200
  },
  Desc: {
    fontSize :16, 
    color: 'white', 
    textAlign: 'center',
    paddingLeft: 12,
    paddingRight: 12,
  },
});

const servstyles = StyleSheet.create({
  containerService: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  imageService: {
    opacity:.9,
    paddingBottom:100,
  },
  textService:{
    backgroundColor:'#ebe4e4',
    borderRadius: 30,
    opacity:.8,
    marginHorizontal:20,
    fontSize:14,
    fontWeight:'bold',
    paddingHorizontal:10,
    paddingBottom:40,
    color:'#000000',
  },
  textHeadService:{
    textAlign: 'center', 
    color:'#0777d9', 
    fontSize:20, 
  },
  imageService: {
    width: '100%',
    height: '100%'
  },
});

const cstyles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
    
  },


  cont: {
    backgroundColor: 'rgba(0,0,0,0.5)	',
    marginLeft:25,
    marginRight:25,
    marginTop:-30,
    marginBottom:20,
    padding: 20,  
    borderRadius: 5,
    shadowColor: "#000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    
  
  },

  TextInput:{
 
    padding: 10,
    margin: 10,
    backgroundColor: '#F2F3F4',
    

  },
  Textarea:{
    padding: 10,
    paddingBottom: 20,
    margin: 10,    
    backgroundColor: '#F2F3F4'
    

  },
  
  bot:{
  width: 100,
  height: 30,
    

  },

  pic1:{
    justifyContent: 'center',
    height: 200,
    width: 400,
    

  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    height: 800,
  },

});

const medstyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  titleStyle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 30,
    color: 'white',
  },
  TextStyle: {
    fontSize: 16,
    color: 'white',
    paddingLeft: 12,
    letterSpacing: 2,
  },

  backCover: {
    height: '100%',
    backgroundColor: 'rgba(14, 12, 12, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  medCover: {
    backgroundColor: 'rgba(202,231,245,0.2)',
    width: '90%',
    height: '90%',
    borderRadius: 25,
  },
  medrow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: 'center',
    justifyContent: 'center',
  },
  parv: {
    height: 50,
    width: 50,

  },
  dis: {
    height: 50,
    width: 50,

  },
  flu: {
    height: 50,
    width: 50,

  },
  ext: {
    height: 50,
    width: 50,

  },
});