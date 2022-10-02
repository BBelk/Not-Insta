const imageUploadEl = document.querySelector('#image');
const captionEl = document.querySelector('#body-post');

imageUploadEl.addEventListener('change', async (event) => {
  const newCaption = captionEl.value;
  // console.log(newCaption);
  // return;
  const file = event.target.files[0];
  const formData = new FormData();
  // const formData = newCaption;
  // console.log(JSON.parse(JSON.stringify(formData)));
  // console.log(formData);
  // return;
  const config = { withCredentials: true };
  formData.append('file', file);
  const item = await axios.post(`/api/upload/${newCaption}`, formData, config);
  if (item) {
    let newId = item.data.id;
    window.location.replace(`/post/${newId}`);
  }
});