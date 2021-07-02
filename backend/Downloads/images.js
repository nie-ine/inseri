function setNewImage(path, desc, link, link_text, xPos, yPos) {
  var img_node = document.getElementById("image");
  var link_node = document.getElementById("image_link");
  var info_node = document.getElementById("image_info");
  img_node.onload = scrollImage(xPos, yPos);
  alert(path);
  img_node.src = path;
  img_node.alt = desc;
  link_node.href = link;
  link_node.innerHTML = link_text;
  info_node.innerHTML = desc;
  info_node.appendChild(link_node);
}

function scrollImage(xPos, yPos) {
  document.getElementById("image_area").scrollTo(xPos, yPos);
}

function openPopUpImage(path) {
  window.open(path, '_blank', 'width=750, height=900');
}
