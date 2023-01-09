import axios from "axios";

export function getSearchResults(username, API_URL) {
    var templateResult = {
        username: 'tedy_99',
        friend: true,
        user_profile_pic: 'https://i.ibb.co/bBSLPRC/DSC-6238.jpg',
    }

    var templateResultNot = {
        username: 'tedy_99',
        friend: false,
        user_profile_pic: 'https://i.ibb.co/bBSLPRC/DSC-6238.jpg',
    }

    return [templateResult, templateResultNot, templateResult, templateResult, templateResultNot, templateResult, templateResult];

    // return (axios({
    //     method: "get",
    //     url: `${API_URL}/price/${token}`,
    // })
    //     .then((response) => {
    //         return (response.data);
    //     })
    //     .catch((response) => {
    //         try {
    //             show({ message: response, type: "error" });
    //         } catch (e) {
    //             console.log("Response token-data: ", response);
    //         }
    //     }));
}

export function getComments(user_id, API_URL) {
    return (axios.get(
        `${API_URL}/get-comments-for-post/${user_id}`)
        .then((response) => {
            return response.data;
        })
        .catch((response) => {
            try {
                show({ message: response, type: "error" });
            } catch (e) {
                console.log("Response get comments: ", response);
            }
        }));
}

export function deleteComment(comment_id, API_URL) {
    return (axios.delete(
        `${API_URL}/delete-comment/${comment_id}`)
        .then((response) => {
            return response.data;
        })
        .catch((response) => {
            try {
                show({ message: response, type: "error" });
            } catch (e) {
                console.log("Response delete comment: ", response);
            }
        }));
}

export function getProfile(user_id, API_URL) {
    return (axios.get(
        `${API_URL}/user-profile/${user_id}`)
        .then((response) => {
            return response.data;
        })
        .catch((response) => {
            try {
                show({ message: response, type: "error" });
            } catch (e) {
                console.log("Response get profile: ", response);
            }
        }));
}

export function getAchivements(API_URL) {
    return (axios.get(
        `${API_URL}/prs`)
        .then((response) => {
            return response.data;
        })
        .catch((response) => {
            try {
                show({ message: response, type: "error" });
            } catch (e) {
                console.log("Response get profile: ", response);
            }
        }));
}

export function getPRdetails(pr_id, API_URL) {
    return (axios.get(
        `${API_URL}/pr/${pr_id}`)
        .then((response) => {
            return response.data;
        })
        .catch((response) => {
            try {
                show({ message: response, type: "error" });
            } catch (e) {
                console.log("Response pr details: ", response);
            }
        }));
}

export function getRequests(API_URL) {
    var templateResult = {
        id: 4,
        username: 'tedy_99',
        picture: 'https://i.ibb.co/bBSLPRC/DSC-6238.jpg',
    }

    return [templateResult, templateResult, templateResult, templateResult, templateResult];
}

export function getFeedPosts(user_id, API_URL) {
    return (axios.get(
        `${API_URL}/user-feed/${user_id}`)
        .then((response) => {
            return response.data;
        })
        .catch((response) => {
            try {
                show({ message: response, type: "error" });
            } catch (e) {
                console.log("Response get feed: ", response);
            }
        }));
}

export function uploadPost(formData, API_URL) {
    axios.post(
        `${API_URL}/add-post`,
        formData,
        {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {

        })
        .catch((response) => {
            try {
                show({ message: response, type: "error" });
            } catch (e) {
                console.log("Response upload post: ", response);
            }
        });
}

export function addComment(formData, API_URL) {
    axios.post(
        `${API_URL}/add-comment`,
        formData,
        {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {

        })
        .catch((response) => {
            try {
                show({ message: response, type: "error" });
            } catch (e) {
                console.log("Response add comment: ", response);
            }
        });
}

export function sendFriendRequest(formData, API_URL) {
    axios.post(
        `${API_URL}/send-friend-request`,
        formData,
        {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            return response.data;
        })
        .catch((response) => {
            try {
                show({ message: response, type: "error" });
            } catch (e) {
                console.log("Response friend req: ", response);
            }
        });
}

export function updateProfile(formData, API_URL) {
    axios.put(
        `${API_URL}/update-user`,
        formData)
        .then((response) => {
        })
        .catch((response) => {
            try {
                show({ message: response, type: "error" });
            } catch (e) {
                console.log("Response update profile: ", response);
            }
        });
}

export function hypePost(post_id, API_URL) {
    axios.post(
        `${API_URL}/hype/${post_id}`,
        {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            return response.data;
        })
        .catch((response) => {
            try {
                show({ message: response, type: "error" });
            } catch (e) {
                console.log("Response hype post: ", response);
            }
        });
}

export function unhypePost(post_id, API_URL) {
    axios.post(
        `${API_URL}/unhype/${post_id}`,
        {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            return response.data;
        })
        .catch((response) => {
            try {
                show({ message: response, type: "error" });
            } catch (e) {
                console.log("Response unhype post: ", response);
            }
        });
}