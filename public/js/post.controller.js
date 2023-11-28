
function PostCreate() {
  var ejsFilePath = '/page/post/post.create.ejs';
  var root = document.getElementById('root');
    fetch(ejsFilePath)
        .then(response => response.text())
        .then(data => {
            const renderedHtml = ejs.render(data, { titlePage: 'Thêm post'});
            root.innerHTML = renderedHtml;
        })
        .catch(error => console.error('Error fetching EJS file:', error));
}
  async function submitPostForm(event, method) {
    event.preventDefault();
    var postId = "";
    var postTitle = document.getElementById("postTitle").value;
    var postBackground = document.getElementById("postBackground").files[0];
    var postDate = document.getElementById("postDate").value;
    var postAuthor = document.getElementById("postAuthor").value;
    const formData = new FormData();
    formData.append("title", postTitle);
    formData.append("date", postDate);
    formData.append("author", postAuthor);
    if (postBackground) formData.append("background", postBackground);
    if (method === "PUT") {
      postId = document.getElementById("postId").value;
    }
  
    try {
      const response = await axios({
        method: method,
        url: "http://jul2nd.ddns.net/post/" + postId,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("Success:", response.data);
      if (method === "POST") {
        closeCreatePopup();
        PostList();
        alert("Thêm post thành công");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  