import React, { Suspense } from 'react'
import {useGlobalContext} from "./context/globalContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import {ReactLoader2} from "./components/ReactLoader2";
import {ROUTES} from "./constants/routes";
import {ProtectedRoute} from "./helpers/ProtectedRoute";
//hooks
import {useFirebaseInit} from "./hooks/useFirebaseInit";
import {useAuthChanged} from "./hooks/useAuthChanged";

const Login = React.lazy(()=> import("./pages/Login"));
const Dashboard = React.lazy(()=> import("./pages/Dashboard"));
const Signup = React.lazy(()=> import("./pages/Signup"));
const Profile = React.lazy(()=> import("./pages/Profile"));
const CreateStyle  = React.lazy(()=>import("./pages/CreateStyle"));
const Explore = React.lazy(()=> import("./pages/Explore"));
const PostComment = React.lazy(()=> import("./pages/PostComment"));
const AccountEdit = React.lazy(()=>import("./pages/AccountEdit"))
const ChangeDisplayPic = React.lazy(()=> import("./pages/ChangeDisplayPic"));
const Messenger = React.lazy(()=>import("./pages/Messenger"));
const MsgrConvo = React.lazy(()=>import("./pages/MsgrConvo"));
const FollowingPage = React.lazy(()=>import("./pages/FollowingPage"));
const FollowerPage = React.lazy(()=>import("./pages/FollowerPage"));
const NotFound = React.lazy(()=> import("./pages/NotFound"));
const Error = React.lazy(()=> import("./pages/Error"));

export const App =  ()=> {
  const { user, isLoading, isFirebaseInitialized} = useGlobalContext();
  
  useFirebaseInit();
  useAuthChanged();
  
  if (!isFirebaseInitialized || isLoading) {
    return <ReactLoader2 />;
  }

  return (
    <Suspense fallback={<ReactLoader2 />}>
      <BrowserRouter>
        <Routes>
            <Route path='/'>
              <Route path={ROUTES.LOGIN} element={user? <Navigate to={ROUTES.DASHBOARD}/>:  <Login />} />
              <Route path={ROUTES.SIGN_UP} element={user? <Navigate to={ROUTES.DASHBOARD}/>: <Signup />}/>

              <Route element={<ProtectedRoute user={user}/>}>
                <Route index element={<Dashboard />} />
                <Route path={ROUTES.PROFILE_ROUTE} element={ <Profile />  } />
                <Route path={ROUTES.FOLLOWING_PAGE_ROUTE} element={< FollowingPage />}/>
                <Route path={ROUTES.FOLLOWER_PAGE_ROUTE} element={<FollowerPage />}/>
                <Route path={ROUTES.EXPLORE} element={ <Explore /> } />
                <Route path={ROUTES.COMMENT_POSTS_ROUTE}element={ <PostComment /> }/>
                <Route path={ROUTES.CREATE_STYLE} element={ <CreateStyle /> }/>
                <Route path={ROUTES.ACC_EDIT} element={ <AccountEdit /> }/>
                <Route path={ROUTES.UPLOAD_DP} element={ <ChangeDisplayPic /> }/>
                <Route path={ROUTES.MESSENGER} element={ <Messenger /> }/>
                <Route path={ROUTES.MSG_CONVO_ROUTE} element={ <MsgrConvo /> }/>
              </Route>

              <Route path={ROUTES.ERROR} element={<Error />} />
              <Route path='*' element={<NotFound />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}