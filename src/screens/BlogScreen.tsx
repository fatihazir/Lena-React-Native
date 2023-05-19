import { View, Text } from 'react-native'
import { SharedContextModel } from '../models/typescript/sharedContext';
import { SharedContext } from '../store/context/SharedContext';
import React, { useContext, useEffect, useState } from 'react'

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
        <View>
            <Text>BlogScreen {currentBlog?.title}</Text>
        </View>
    )
}

export default BlogScreen