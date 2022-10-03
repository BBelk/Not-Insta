const DeletePost = async (event) =>{
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete posts');
    }
  }
};
var el = document.querySelector('#delete-post'); 
if(el){
el.addEventListener('click', DeletePost);
}

const DeleteComment = async (event) =>{
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const postId = event.target.getAttribute('post-id');
    const response = await fetch(`/api/comment/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace(`/post/${postId}`);
    } else {
      alert('Failed to delete comment');
    }
  }
};
var dl = document.querySelectorAll('#delete-comment');
dl.forEach(function (newDl) {
newDl.addEventListener('click', DeleteComment);
});