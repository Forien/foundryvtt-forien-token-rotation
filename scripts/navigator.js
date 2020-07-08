ForienTokenRotation.SceneNavBar = class {
  static async generateBar() {
    console.log('generateBar');
    let navBar = document.createElement('div');
    navBar.id = "scene-navigation";
    navBar.style = 'z-index: 70; position: fixed; top: 60px; height: auto; min-height: 50px; min-width: 150px; left: 120px; background-color: #bbb';
    navBar.innerHTML = '<a id="scene-nav-toggle" class="nav-item"><i class="fas fa-caret-up"></i></a>';

    await document.body.appendChild(navBar);

    console.log({navBar});
    $('.scene.nav-item').on('dragstart',  function (event) {
      console.log('dragstart');
      console.log(event.target);
      event.dataTransfer.setData('text/plain', event.target.data['scene-id']);
    });
    $('#scene-navigation').on('dragover',  function (event) {
      event.preventDefault();
    });
    $('#scene-navigation').on('drop',  function (event, b, c, d) {
      console.log(event);
      console.log(event.originalEvent.dataTransfer.id);
      console.log(event.target.id);
      return;
      let id = event.dataTransfer.getData('text');

      const draggableElement = document.getElementById(id);
      const dropzone = event.target;

      dropzone.appendChild(draggableElement);

      event
        .dataTransfer
        .clearData();
    });
  }
};
