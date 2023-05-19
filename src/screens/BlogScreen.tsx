import { View, Text, Image, StyleSheet, Platform, ScrollView } from 'react-native'
import { SharedContextModel } from '../models/typescript/sharedContext';
import { SharedContext } from '../store/context/SharedContext';
import React, { useContext, useRef, useState } from 'react'
import HTMLView from 'react-native-htmlview';
import { height_screen } from '../utilities/dimensions';
import { fonts } from '../utilities/fonts';

interface BlogDetailParamsModel {
    route: {
        params: {
            postId: number
        }
    }
}
const BlogScreen = (props: BlogDetailParamsModel) => {
    const currentContext: SharedContextModel = useContext(SharedContext)

    const { blogs } = currentContext
    const { postId } = props?.route.params

    const [currentBlog, setCurrentBlog] = useState(blogs.find((item) => item.postId === postId))

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.container}>
                <Image resizeMode='stretch' style={styles.banner} source={{ uri: currentBlog?.banner }} />
                <View style={styles.insideContainer}>
                    <Text style={styles.title}>{currentBlog?.title}</Text>
                    <Text style={styles.readingTime}>Total reading time: {currentBlog?.totalReadingTime} min</Text>
                    <HTMLView
                        //@ts-ignore
                        value={currentBlog?.content}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    insideContainer: {
        padding: 8
    },
    banner: {
        height: Platform.OS == 'ios' ? height_screen * .30 : height_screen * .35,
        width: '100%',
        alignSelf: 'center',
    },
    title: {
        fontFamily: fonts.PoppinsBold,
        fontSize: 24,
        color: 'black',
        marginBottom: 4,
        paddingHorizontal: 8
    },
    readingTime: {
        fontSize: 12,
        fontFamily: fonts.PoppinsRegular,
        color: 'black',
        marginVertical: Platform.OS == 'ios' ? 8 : 4,
        alignSelf: 'flex-end'
    }
});

export default BlogScreen