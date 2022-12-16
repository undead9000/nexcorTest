function fetchAllPosts() {
  return fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then(response => response.json())
    .catch(() => { alert('Unable to get posts')});
}

function fetchMyPosts(userId: number) {
  return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(response => response.json())
    .catch(() => { alert('Unable to get my posts')});
}

function fetchPost(postId: number) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(response => response.json())
    .catch(() => { alert('Unable to open posts')});
}

function updatePost(postId: number, title: string, body: string) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      title: title,
      body: body,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .catch(() => { alert('Can\'t update post. Please, try again later')});
}

function fetchUser(userId: number) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => response.json())
    .catch(() => { alert('Unable to open user profile')});
}

function fetchComments(postId: number) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then(response => response.json())
    .catch(() => { alert('Can\'t show comments list')});
}

function addComment(postId: number, title: string, body: string, email: string) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify({
      name: title,
      body: body,
      email: email
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .catch(() => { alert('Can\'t add comment. Please, try again later')});
}

export {fetchAllPosts, fetchMyPosts, fetchPost, updatePost, fetchUser, fetchComments, addComment}