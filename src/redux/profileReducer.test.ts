import {addPostAC, deletePostAC, profileReducer} from "./profileReducer";
import {ProfileType} from "../components/Profile/ProfileContainer";

type PostType = {
    id: string
    post: string
    like: string
}

type StartStateType = {
    posts: PostType[]
    newPostText: string
    profile: null | ProfileType
    status: string
}

let startState: StartStateType;

beforeEach(() => {
    startState = {
        posts: [
            {id: "1", post: "Hi how are you", like: '10 likes'},
            {id: "2", post: "my first post", like: '5 likes'}
        ],
        newPostText: '',
        profile: null as null | ProfileType,
        status: '',
    }
})

test('new post should be added', () => {
    let action = addPostAC('new post')

    let newState = profileReducer(startState, action)

    expect(newState.posts.length).toBe(3)
    expect(newState.posts[2].post).toBe('new post')

})

test('post should be deleted', () => {
    let action = deletePostAC('1')

    let newState = profileReducer(startState, action)

    expect(newState.posts.length).toBe(1)

})

test('post should not be deleted if id is incorrect', () => {
    let action = deletePostAC('4')

    let newState = profileReducer(startState, action)

    expect(newState.posts.length).toBe(2)

})
