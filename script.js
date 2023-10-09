const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

function createPost() {
    const userId = document.querySelector('input[placeholder="userId"]').value;
    const title = document.querySelector('input[placeholder="title"]').value;
    const body = document.querySelector('input[placeholder="body"]').value;

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            body: body,
            userId: userId,
        }),
    })
        .then(response => response.json())
        .then(data => console.log('Created:', data))
        .catch(error => console.error('Error creating post:', error));
}

function getPosts() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const postList = document.getElementById('postList');
            postList.innerHTML = '';

            data.forEach(post => {
                const listItem = document.createElement('li');

                const userIdPara = document.createElement('p');
                userIdPara.textContent = 'User ID: ' + post.userId;

                const idPara = document.createElement('p');
                idPara.textContent = 'ID: ' + post.id;

                const titlePara = document.createElement('p');
                titlePara.textContent = 'Title: ' + post.title;

                const bodyPara = document.createElement('p');
                bodyPara.textContent = 'Body: ' + post.body;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => deletePost(post.id));

                listItem.appendChild(userIdPara);
                listItem.appendChild(idPara);
                listItem.appendChild(titlePara);
                listItem.appendChild(bodyPara);
                listItem.appendChild(deleteButton);

                postList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error getting posts:', error));
}

function updatePost() {
    fetch(`${apiUrl}/1`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: 'updated userId',
            id: 'updated id',
            title: 'Updated Post',
            body: 'This is the updated body of the post.',
        }),
    })
        .then(response => response.json())
        .then(data => console.log('Updated:', data))
        .catch(error => console.error('Error updating post:', error));
}

function deletePost(postId) {
    if (postId) {
        fetch(`${apiUrl}/${postId}`)
            .then(response => response.json())
            .then(postData => {
                console.log('Post to be deleted:', postData);

                return fetch(`${apiUrl}/${postId}`, {
                    method: 'DELETE',
                });
            })
            .then(response => {
                if (response.ok) {
                    console.log('Deleted successfully');
                } else {
                    console.error('Error deleting post. Server response:', response.statusText);
                }

                getPosts();
            })
            .catch(error => console.error('Error fetching or deleting post:', error));
    } else {
        console.error('Please enter a valid ID to delete a post.');
    }
}