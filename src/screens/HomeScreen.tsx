import React, { useCallback, useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, RefreshControl } from 'react-native'
import { UseNavigationModel } from '../models/typescript/navigation';
import { useNavigation } from '@react-navigation/native';
import { SharedContextModel } from '../models/typescript/sharedContext';
import { SharedContext } from '../store/context/SharedContext';
import apibase from '../utilities/apibase';
import { links } from '../utilities/apibase/links';
import ErrorModal from '../components/alertModal';
import { fonts } from '../utilities/fonts';
import { height_screen, width_screen } from '../utilities/dimensions';
import { BlogModel } from '../models/typescript/blog';
import { routes } from '../utilities/routes';


const HomeScreen = () => {
    const navigation: UseNavigationModel = useNavigation();

    const currentContext: SharedContextModel = useContext(SharedContext)
    const { setShowGlobalLoading, setShowOverlay, setBlogs, blogs } = currentContext

    const [showErrorModal, setShowErrorModal] = useState<boolean>(false)
    const [errorModalAlertText, setErrorModalAlertText] = useState<string>("")
    const [page, setPage] = useState<number>(1)
    const [totalCount, setTotalCount] = useState<number>(0)
    const [refreshing, setRefreshing] = React.useState(false);

    let blogCountPerFetch = 10

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        page == 1 ? GetData(page) : setPage(1)
    }, []);

    function GetData(currentPage: number) {
        setShowOverlay(true)
        setShowGlobalLoading(true)

        let paramsUrl = links.blogs + `?page=${currentPage}&count=${blogCountPerFetch}`

        apibase.Get({
            url: paramsUrl,
            successFunction: (res: any) => {
                setTotalCount(res.totalCount)
                if (currentPage == 1) {
                    setPage(1)
                    setBlogs(res.result)
                } else {
                    //@ts-ignore
                    setBlogs((prevBlogs) => prevBlogs.concat(res.result))

                    // bu şekilde de implemente edilebilir. Can be implemented as shown as well
                    // let prevBlogs = blogs
                    // let newArr = prevBlogs?.concat(res.result)
                    // setBlogs(newArr)
                }
                setShowOverlay(false)
                setShowGlobalLoading(false)
                setRefreshing(false)
            },
            errorFunction: (res: any) => {
                setErrorModalAlertText(res)
                setShowGlobalLoading(false)
                setShowErrorModal(true)
                setRefreshing(false)
            },
            exceptionFunction: (ex: any) => {
                setErrorModalAlertText(ex)
                setShowGlobalLoading(false)
                setShowErrorModal(true)
                setRefreshing(false)
            }
        })
    }

    useEffect(() => {
        GetData(page)
    }, [page])

    function OnBlogPressed(blog: BlogModel) {
        navigation.navigate(routes.BlogScreen, { postId: blog.postId })
    }

    function OnEndReached() {
        if ((page * blogCountPerFetch) < totalCount) {
            setPage((prevPage) => prevPage + 1)
        }
    }

    interface RenderItemModel {
        item: BlogModel,
        index: number
    }

    const renderItem = (eachItem: RenderItemModel) => (
        <TouchableOpacity onPress={() => OnBlogPressed(eachItem.item)} key={eachItem.item.postId} style={styles.eachBlogContainer}>
            <>
                <Image resizeMode='stretch' style={styles.thumbnail} source={{ uri: eachItem.item.banner }} />
                <Text numberOfLines={1} style={styles.title}>{eachItem.item.title}</Text>
                <Text style={styles.readingTime}>Total reading time: {eachItem.item.totalReadingTime} min</Text>
            </>

            {/* <View style={styles.platformAndReleaseSection}>
                <Text style={styles.platform}>{eachItem.item.platform}</Text>
                <Text style={styles.date}>Release date: {eachItem.item.release_date}</Text>
            </View> */}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <ErrorModal
                text={errorModalAlertText}
                show={showErrorModal}
                onSuccess={() => { currentContext.setShowOverlay(false), setShowErrorModal(false) }}
            />
            <Text style={styles.blogsFoundText}>{totalCount} / {blogs?.length} blogs </Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={blogs}
                renderItem={renderItem}
                keyExtractor={item => item.postId.toString()}
                initialNumToRender={5}
                maxToRenderPerBatch={10}
                windowSize={20}
                onEndReachedThreshold={0.5}
                onEndReached={OnEndReached}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: width_screen * .02
    },
    eachBlogContainer: {
        width: '100%',
        backgroundColor: 'white',
        height: height_screen * .3,
        marginBottom: 12,
        borderBottomWidth: 0.5,
        borderLeftWidth: 0.5,
        borderRadius: 20,
        elevation: 5,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        paddingBottom: 12,
    },
    thumbnail: {
        height: '60%',
        width: '100%',
        alignSelf: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    title: {
        fontFamily: fonts.PoppinsBold,
        fontSize: 24,
        color: 'black',
        marginBottom: 4,
        paddingHorizontal: 8
    },
    readingTime: {
        fontSize: 16,
        color: 'black',
        paddingHorizontal: 8,
        alignSelf: 'flex-end'
    },
    blogsFoundText: {
        fontFamily: fonts.PoppinsBold,
        color: '#adadad',
        fontSize: 14,
        textAlign: 'right',
        paddingBottom: 8
    },
});

export default HomeScreen