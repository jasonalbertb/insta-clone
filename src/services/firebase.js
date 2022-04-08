
import {getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
    arrayRemove,arrayUnion, 
    getFirestore, doc,
    updateDoc , setDoc, getDoc,addDoc, 
    collection, getDocs,
    query, where,
    FieldPath, documentId, limit,
    Timestamp,deleteDoc, orderBy
} from "firebase/firestore";
import {PICS} from "../constants/pics";

export const createUser = async ({email, password, fullname, username, profilePic=PICS.defaultUser})=>{
    try {
        //username exists
        const db = getFirestore();
        const docRef = doc(db, "usernames", username);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            throw new Error("Username already exists!");
        }
        const auth = getAuth();
        const cred = await createUserWithEmailAndPassword(auth,email, password);
        if (!cred || !cred.user || !cred.user.uid) {
            throw new Error("Invalid Credentials");
        } 
        await setDoc (doc(db, "profiles", cred.user.uid),{
            fullname,
            username,
            profilePic,
            followers : [],
            following : []
        });
        await setDoc(doc(db, "usernames", username), {});
    } catch (error) {
        throw error;
    }
}

export const updateLikePost = async (postId, userId)=>{
    
    const db = getFirestore();
    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {  
        throw new Error("Post does not exist");
    }
    const docRef2 = doc(db, "profiles", userId);
    const docSnap2 = await getDoc(docRef2);
    if (!docSnap2.exists()) {  
        throw new Error("User does not exist");
    }   
    await updateDoc(docRef,
        {likes : 
            docSnap.data().likes.includes(userId)?
                arrayRemove(userId):
                arrayUnion(userId)
        } 
    )
}

export const getUserDataByUserId = async(id)=>{
    const db = getFirestore();
    const docRef = doc(db, "profiles", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    }else{
        return null;
    }
} 

export const getCurrentUserData = async()=>{
    const uid = getAuth().currentUser && getAuth().currentUser.uid;
    if (uid) {
        const data = await getUserDataByUserId(uid);
        return data;
    }else{
        return null;
    }
}

export const createPost = async ({content, caption, postedBy})=>{
    try {
        if (!content || !content.length) {
            throw new Error("No Content Posted");
        }
        const db = getFirestore();
        await addDoc(collection(db, "posts"), {
            content,
            caption,
            comments: [],
            likes: [],
            postedBy,
            createdAt : Timestamp.now()
        });
    } catch (error) {
        throw(error)
    }
}

export const getSuggestedFollowers = async(exceptions)=>{
    const db = getFirestore();

    const q = query(
        collection(db, "profiles"), 
        where(documentId(FieldPath), "not-in",exceptions),
        limit(5)
    );
    const querySnapshot = await getDocs(q);
    const followers = [];
    querySnapshot.forEach((doc) => {
        followers.push(doc.id);
    });
    return followers;
}

const docExist = async (col, id)=>{

    const db = getFirestore();
    const docRef = doc(db, col , id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        throw new Error(`Doc ${id} in ${col} does not exist!`)
    }
}

export const addCommentToPost = async({postId, comment, commentBy, likes=[]})=>{
    await docExist("posts", postId);
    await docExist("profiles", commentBy);
    const db = getFirestore();
    await addDoc(collection(db, "comments"), {
        postId,
        comment,
        commentBy,
        likes, 
        createdAt : Timestamp.now()
    });
}

export const updateCommentLikes = async({commentId, userId})=>{
    await docExist("profiles", userId);

    const db = getFirestore();
    const docRef = doc(db, "comments", commentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists) {
        await updateDoc(docRef, {
            likes : docSnap.data().likes.includes(userId)? arrayRemove(userId) : arrayUnion(userId)
        });
    } 
}   

export const updateProfilePic = async (pic)=>{
    if (!pic) {
        throw new Error("Invalid Picture"); 
    }
    const uid = getAuth().currentUser.uid;
    if (!uid) {
        throw new Error("Invalid Credentials");
    }
    const db = getFirestore();
    const docRef = doc(db, "profiles", uid);

    await updateDoc(docRef, {
        profilePic : pic
    });
    await updateProfile( getAuth().currentUser, {
        photoURL : pic
    })
}


export const deletePost = async(postId)=>{
    const db = getFirestore();
    await deleteDoc(doc(db, "posts", postId));
}

export const getAllChatTo = async ()=>{
    const {uid} = getAuth().currentUser;
    const db = getFirestore();
    const allChatRefs = collection(db, "chats", uid, "to");
    const q = query(allChatRefs, orderBy("recent", "desc"));
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push(doc.id);
    });
    return data;
}

export const getUserdataByUsername = async (username)=>{ 
    const db = getFirestore();
    const profilesRef = collection(db, "profiles");
    const q = query(profilesRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({id: doc.id, ...doc.data()})
    });
    if (data.length > 1) {
        throw new Error("Duplicate data");
    }else if (data.length === 1 ) {
        return data[0]
    }else{
        return null;
    }
}

export const getPostIdsByUserId = async (id)=>{
    const db = getFirestore();
    const q = query(
        collection(db, "posts"), 
        where("postedBy", "==", id),
        orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const arr = [];
    querySnapshot.forEach((doc) => {
      arr.push( doc.id);
    });
    return arr;
}


export const sendMessageTo = async(id, msg)=>{
    try {
        const {uid} = getAuth().currentUser;
        await docExist("profiles", id);
        const db = getFirestore();
        // =============sender=================
        const chatSentByRef = ["chats", uid, "to", id];
        await setDoc(doc(db, "chats", uid), {}, { merge: true });
        await setDoc(doc(db, ...chatSentByRef), {recent: Timestamp.now()}, { merge: true });
        const sentByMsgsCol = collection(db, ...chatSentByRef, "messages");
        await addDoc (sentByMsgsCol, {
            timestamp: Timestamp.now(), 
            content : msg,
            by: uid
        });
        //================sent to =================
        const chatSentToRef = ["chats", id, "to", uid];
        await setDoc(doc(db, "chats", id), {}, { merge: true });
        await setDoc(doc(db, ...chatSentToRef), {recent: Timestamp.now()}, { merge: true });
        const sentToMsgsCol = collection(db, ...chatSentToRef, "messages");
        await addDoc (sentToMsgsCol, {
            timestamp: Timestamp.now(), 
            content : msg,
            by: uid
        });
    } catch (error) {
        console.log(error);
        throw(error)
    }
}

export const updateFollow = async (profileId, follow)=>{
    const db = getFirestore();
    const userId = getAuth().currentUser.uid;
    const currentUserRef = doc(db, "profiles", userId);
    await updateDoc(currentUserRef, {
        following: follow==="follow"?  arrayUnion(profileId) : arrayRemove(profileId)
    });
    const docProfileRef = doc(db, "profiles", profileId);
    await updateDoc(docProfileRef, {
        followers: follow==="follow"?  arrayUnion(userId) : arrayRemove(userId)
    });
}
