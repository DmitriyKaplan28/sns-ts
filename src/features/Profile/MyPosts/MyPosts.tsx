import React from "react";
import classes from "./MyPosts.module.css";
import {Post, PostPropsType} from "./Post/Post";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {
	maxLengthCreator,
	requiredField
} from "../../../common/utils/validators/validators";
import {TextArea} from "../../../common/components/FormControls/FormControls";

type MyPostsType = {
	posts: PostPropsType[]
	newPostText: string
	addPost: (newPostText: string) => void
	updateNewPostText: (newText: string) => void
}

type FormDataType = {
	newPostText: string
}

export const MyPosts = React.memo((props: MyPostsType) => {

	const postsElements = props?.posts?.map((post) =>
		<Post post={post.post} like={post.like}/>
	);

	const addPost = (formData: FormDataType) => {
		props.addPost(formData.newPostText);
	};

	return (

		<div className={classes.postsBlock}>
			<h3>My posts</h3>
			<div>
				<AddPostReduxForm onSubmit={addPost}/>
			</div>
			<div className={classes.post}>
				{postsElements}
			</div>
		</div>
	);
});

const maxLength10 = maxLengthCreator(10);

const AddPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<Field placeholder={"Enter your post"}
				   name={"newPostText"}
				   component={TextArea}
				   validate={[requiredField, maxLength10]}
			/>
			<button>Add Post</button>
		</form>);
};

const AddPostReduxForm = reduxForm<FormDataType>({form: "addPostForm"})(AddPostForm);