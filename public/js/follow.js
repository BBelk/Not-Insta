const followButtonHandler = async (event) => {
  console.log(event.target);

  const url = window.location.href;
  const strs = url.split('user/');
  const id = strs.at(-1);
  console.log(id);

  const response = await fetch(`/api/users/${id}/follow/toggle`, {
    method: 'PUT',
  });
  const data = await response.json();
  console.log(data);
  if (response.ok) {
    document.location.reload();
  } else {
    alert('Failed to follow properly');
  }
};

document
  .querySelector('#follow-btn')
  .addEventListener('click', followButtonHandler);









