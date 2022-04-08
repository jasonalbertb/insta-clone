export const ROUTE_PARAMS = {
    POSTID : ":postId"
}

const PROFILE_ROUTE = '/p/:userId';
const PROFILE = (id)=>{
    return PROFILE_ROUTE.replace(":userId", id);
}
 

const COMMENT_POSTS_ROUTE = `/posts/${ROUTE_PARAMS.POSTID}/comments`;
const COMMENT_POSTS = (postId)=>{
    return COMMENT_POSTS_ROUTE.replace(ROUTE_PARAMS.POSTID, postId);
}

const MSG_CONVO_ROUTE = "/direct/t/:id";
const MSG_CONVO = (id)=>{
    return MSG_CONVO_ROUTE.replace(":id", id);
}

const FOLLOWING_PAGE_ROUTE = "/:profileId/following/"
const FOLLOWING_PAGE = (profileId)=>{
    return FOLLOWING_PAGE_ROUTE.replace(":profileId", profileId);
}

const FOLLOWER_PAGE_ROUTE = "/:profileId/followers/"
const FOLLOWER_PAGE = (profileId)=>{
    return FOLLOWER_PAGE_ROUTE.replace(":profileId", profileId);
}

export const ROUTES = {
    DASHBOARD : '/',
    LOGIN : '/accounts/login',
    SIGN_UP : '/accounts/sign-up',
    PROFILE,
    PROFILE_ROUTE,
    NOT_FOUND : '/not-found',
    EXPLORE : "/explore/people",
    ERROR : "/error-page",
    COMMENT_POSTS_ROUTE,
    COMMENT_POSTS,
    CREATE_STYLE : "/create/style",
    ACC_EDIT:"/accounts/edit",
    UPLOAD_DP:  "/accounts/edit/upload-dp",
    MESSENGER: "/direct/inbox/",
    MSG_CONVO_ROUTE,
    MSG_CONVO,
    FOLLOWING_PAGE_ROUTE,
    FOLLOWING_PAGE,
    FOLLOWER_PAGE_ROUTE,
    FOLLOWER_PAGE
}
