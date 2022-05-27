
   
import tokenService from "./tokenService";
const BASE_URL = '/api'

export function addComment(postId){
    return fetch(`${BASE_URL}/posts/${postId}/comments`, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => {
        if (res.ok) return res.json()
        throw new Error("Can not comment, please try again later.")
    })
}
export function removeComment(commentId){
    return fetch(`${BASE_URL}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
            'Autherization': 'Bearer' + tokenService.getToken()
        }
    }).then(res => {
        if(res.ok) return res.json()
        throw new Error("Can not delete comment, make sure youre logged in.")
    })
}